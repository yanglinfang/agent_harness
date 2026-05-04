# ADR 0004: Schema as Source of Truth

## Status

Accepted — 2026-05-03

## Context

`agent-harness` is a polyglot system: the frontend is TypeScript, the desktop shell is Rust, and the backend is Python. All three sides handle the same trace event envelope and the same payload shapes. Concretely:

- The Python backend constructs events and persists them.
- The TypeScript frontend renders events in the timeline and run review UIs.
- The Rust shell may need to consume a subset of events for native integration (notifications, badges).
- A future replay engine, eval store, and signed trace bundle tooling will all consume the same events.

If each language defines its own representation of a trace event, the three definitions will drift. Drift in a trace schema is especially harmful because trace data is supposed to be the single source of truth for runtime correctness, audit, and replay.

We need a single source of truth for:

- Trace event envelope and payload shapes
- Run metadata
- Permission decision shape
- Tool call request/response shape
- Workspace diff shape
- Model call shape
- Validation shape
- Apply / discard shapes

## Decision

We will use **JSON Schema (Draft 2020-12)** as the source of truth for all cross-language data shapes.

Schemas live in `schemas/v0.1/` versioned by minor product version. Each event payload has its own schema file under `schemas/v0.1/payloads/`. The trace event envelope and run metadata are top-level schemas.

We will generate language-specific types from JSON Schema:

- **TypeScript**: `frontend/src/generated/trace.ts` via `json-schema-to-typescript` (or equivalent).
- **Python**: `backend/generated/trace_models.py` via `datamodel-code-generator` producing Pydantic v2 models.
- **Rust**: `src-tauri/src/generated/trace.rs` via `typify` or `schemafy`. If toolchain issues block Rust codegen in sprint 0, we will hand-write Rust structs against the schema and add a CI check to detect drift; this fallback is allowed only for v0.1.

Generated files are committed to the repository, not produced at build time. CI verifies that running codegen against the current `schemas/` produces no diff against the committed generated files. A PR that changes `schemas/` without regenerating fails CI.

Schema versioning rules:

- Each schema file carries a `$id` containing the version path: `https://agent-harness.dev/schemas/v0.1/...`.
- Each event envelope carries a `schema_version` field.
- **Breaking changes** (renaming fields, changing types, removing fields) require a new minor version directory: `schemas/v0.2/`. A migration tool must be provided.
- **Non-breaking changes** (adding optional fields) bump the patch version: `0.1.0` → `0.1.1`. The same schema directory is reused.
- Validation occurs at two boundaries:
  1. Before writing an event to the trace store (backend internal validation).
  2. Before exporting a trace bundle (export-time validation).

The frontend trusts events from the backend without re-validating, since the backend is the only writer. Generated TypeScript types are used at compile time only.

## Alternatives Considered

### A. Hand-written types per language

- **Pros**: No build pipeline; each side controls its own shape.
- **Cons**: Drift is inevitable; bugs at the boundary are hard to detect; expensive to refactor.

### B. Protocol Buffers as source of truth

- **Pros**: Strong typing; battle-tested; language plugins exist for all three languages; binary encoding is efficient.
- **Cons**: Less human-readable than JSON; trace events are stored as JSON in SQLite anyway; adds a build dependency; weaker schema evolution story for nullable/optional fields than JSON Schema; trace bundles are JSON-shaped by design.

### C. OpenAPI / TypeSpec for end-to-end definition

- **Pros**: Defines API and data shapes together.
- **Cons**: Overkill for our IPC needs; trace events are not REST resources; OpenAPI codegen quality varies by language; harder to use for validation at storage boundary.

### D. Pydantic models in Python as source of truth, generate other languages from them

- **Pros**: One language defines models; Pydantic is excellent for validation.
- **Cons**: Pydantic-to-other-language codegen is less mature than JSON Schema codegen; couples the design of all three sides to Python's expressiveness; JSON Schema export from Pydantic loses some fidelity on complex unions.

### E. TypeScript Zod schemas as source of truth

- **Pros**: Excellent ergonomics in TypeScript.
- **Cons**: Codegen to other languages is immature; the backend (which writes events) would not be the canonical owner of the shapes; storage validation in Python becomes a dependency on a TS-defined schema.

## Consequences

### Positive

- One source of truth for data shapes across three languages.
- Schema changes are diff-reviewable in PR.
- Validation at the storage boundary catches malformed events before they corrupt the trace.
- New consumers (replay engine, eval store, third-party tools) can use the same schemas.
- JSON Schema is human-readable and tool-friendly; the schemas themselves are documentation.

### Negative

- Three codegen toolchains to maintain. Rust codegen is the highest risk because the JSON Schema → Rust ecosystem is the least mature of the three.
- Generated files are committed, which means PRs touching schemas have larger diffs.
- A schema change rebuilds generated types in three languages; CI must run all three.
- Schema migrations across versions are a deliberate engineering activity, not a casual change.
- We accept the JSON Schema feature subset that all three codegen tools handle reliably. Exotic features (tuple types, complex `oneOf`, recursive schemas) may need to be avoided or worked around.

### Neutral

- JSON Schema dialect: Draft 2020-12.
- Codegen invocation: `make schemas` regenerates all three language outputs.
- The schemas themselves (the JSON files) are part of the public API of `agent-harness` once published. Changes follow the versioning rules above.
- A `schemas/CHANGELOG.md` records every change to the schema directory.

## References

- Round 6 schema draft (envelope, payloads)
- Round 7 collapse: JSON Schema as source of truth
- ADR 0003: Trace Storage (SQLite stores `payload_json` validated against these schemas)
- JSON Schema Draft 2020-12: https://json-schema.org/draft/2020-12/schema

## Revision History

| Date       | Author | Change        |
| ---------- | ------ | ------------- |
| 2026-05-03 | Nova   | Initial draft |
