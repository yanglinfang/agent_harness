# ADR 0003: Trace Storage

## Status

Accepted — 2026-05-03

## Context

The Trace Kernel is the runtime correctness substrate of `agent-harness`. Every agent run emits an append-only sequence of structured events covering session lifecycle, model calls, plan generation, permission decisions, tool calls, workspace mutations, validation runs, human approvals, and apply/discard actions.

Events have heterogeneous payload shapes but share an envelope (event_id, run_id, seq, timestamp, event_type, schema_version, prev_hashes, event_hash, payload). Some payload fields are large (stdout, stderr, diffs, prompts, model outputs). Storing large blobs inline would bloat the event row size and degrade query performance.

Requirements:

- **Append performance**: trace writes must not block tool execution.
- **Per-run query**: timeline UI must read events for a given run_id ordered by seq, possibly paginated.
- **Cross-run query**: `/runs` list view must read summary fields for many runs efficiently.
- **Concurrent read while writing**: the UI may be viewing run A's timeline while run B is appending events.
- **Local-first**: no network dependencies; no external database; runs entirely on the user's machine.
- **Cross-platform**: same storage works on macOS, Linux, and Windows.
- **Schema migration**: the trace schema will evolve; we need a clear migration story.
- **Export and inspection**: users must be able to export a run's trace as a portable artifact (currently JSONL).
- **Tamper-evident integrity**: events form a hash chain (see ADR 0004 / Round 5–6 spec). Storage must not corrupt or reorder events.

## Decision

We will use a layered storage architecture:

1. **Primary store: SQLite** in WAL mode, with a single database file per installation at `.agent-harness/agent-harness.db` under the user's app data directory. SQLite holds:
   - `runs` table: one row per run with summary metadata.
   - `trace_events` table: one row per event with envelope fields and `payload_json` column.
   - `blobs` table: optional, used to store small artifact blobs inline by sha256.
   - `workspaces` table: shadow workspace handles and lifecycle state.
   - `approvals` table: human approval decisions cached per run.

2. **Artifact (blob) store: filesystem** under `.agent-harness/blobs/runs/run_<id>/` with subdirectories per artifact category (`stdout/`, `stderr/`, `diffs/`, `prompts/`, `model_outputs/`, `patches/`). Files are named by sha256 hash. Trace events reference blobs via `blob:<sha256>` URIs in their payload. The threshold for moving a value from inline payload to blob is 16KB; specific fields (stdout, stderr, diff, prompt, completion, patch) are always blobbed regardless of size.

3. **Export format: JSONL** generated on demand from SQLite via `agent-harness export <run_id>`. JSONL is for debugging, sharing, and future signed trace bundles. It is not a primary store and is not double-written.

We will not double-write to JSONL during normal operation. Two sources of truth would create a synchronization debt we do not want to carry.

## Alternatives Considered

### A. JSONL primary, SQLite as derived index

- **Pros**: Human-readable; trivially appendable; easy to grep; portable.
- **Cons**: Slow per-run timeline queries (must scan file); concurrent read/write requires file locking; filtering and aggregation across runs require building an external index anyway; rotating large JSONL files is painful.

### B. SQLite primary, JSONL also written on every append (double-write)

- **Pros**: Both queryability and human readability.
- **Cons**: Two sources of truth; synchronization bugs; 2x I/O; if they disagree, which wins? Adds permanent maintenance cost.

### C. SQLite primary, JSONL export on demand (this ADR)

- **Pros**: Fast queries; concurrent read/write via WAL; standard migration tooling; export when needed; one source of truth.
- **Cons**: Less human-readable at rest; users must run an export command to inspect raw events outside the app.

### D. Embedded document store (e.g., DuckDB, LMDB, RocksDB)

- **Pros**: Various performance and feature tradeoffs.
- **Cons**: Larger dependency footprint; less ubiquitous tooling; SQLite is sufficient and universally supported.

### E. Inline all payloads in SQLite (no blob store)

- **Pros**: One storage system to manage.
- **Cons**: Large stdout/diff/model output rows degrade page cache efficiency; database file grows quickly; no easy way to GC large artifacts independently.

## Consequences

### Positive

- Fast per-run timeline queries via `(run_id, seq)` index.
- Concurrent read while writing: WAL mode supports multiple readers and one writer without blocking.
- Cross-run summary queries (for `/runs` list) hit indexed columns on `runs` table.
- Schema migrations follow standard SQLite practices; migrations live in `backend/storage/migrations/NNNN_*.sql` and are applied on backend startup.
- Blob store can be GC'd independently when runs are deleted or when blob references are pruned.
- Export to JSONL is straightforward: `SELECT * FROM trace_events WHERE run_id = ? ORDER BY seq` and emit one line per row.

### Negative

- SQLite is not human-readable. Developers debugging without the app installed must use `sqlite3` CLI or run `agent-harness export`.
- Blob filesystem layout introduces directory-level GC complexity. We accept this debt and will write a `agent-harness gc` command in v0.2.
- WAL files (`-wal`, `-shm`) may surprise users browsing the data directory. Document this in `docs/storage.md`.
- A future signed trace bundle (Phase 2) must include both SQLite-derived events and referenced blobs. The export pipeline must handle this atomically.
- Backup is not a primary store concern in v0.1; users back up their `.agent-harness/` directory if they want.

### Neutral

- Database location: platform-specific app data directory (`%APPDATA%\\agent-harness` on Windows, `~/Library/Application Support/agent-harness` on macOS, `${XDG_DATA_HOME:-~/.local/share}/agent-harness` on Linux).
- Default trace retention: indefinite in v0.1. A retention setting may be added later but is not a v0.1 feature.
- Default telemetry: off. Trust-first product cannot silently collect data.

## References

- Round 6–7 discussion of storage shape
- Round 7 collapse: SQLite primary + blob store + JSONL export on demand
- ADR 0004: Schema Source of Truth (defines event envelope and payload schemas)
- SQLite WAL documentation: https://www.sqlite.org/wal.html

## Revision History

| Date       | Author | Change        |
| ---------- | ------ | ------------- |
| 2026-05-03 | Nova   | Initial draft |
