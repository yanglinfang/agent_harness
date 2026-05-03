# TASK-003: Trace Event Store Stub

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Create a minimal trace event model and in-memory store that can later become
SQLite-backed.

## Context Files

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- `src/persistence/CLAUDE.md`
- `docs/architecture.md`

## In Scope

- Add trace event fields needed for audit:
  - `runId`
  - monotonic `sequence`
  - event `kind`
  - timestamp
  - label
  - detail
  - status
  - optional `prevHash`
  - optional `hash`
- Implement a Python in-memory list for a single active run.
- Return ordered trace from `GET /runs/active/trace`.
- Document the future SQLite migration point.

## Out of Scope

- No cryptographic guarantee yet.
- No SQLite implementation yet.
- No replay implementation.

## Expected Files To Edit

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- Optional `docs/decisions/0002-trace-store.md`

## Acceptance Criteria

- Trace events have stable IDs and sequence order.
- Web UI can render trace events from the API or existing mock fallback.
- `pnpm typecheck` passes.
- Runtime health and trace endpoints work.

## Handoff To Codex Review

Ask Codex to check event naming, future SQLite compatibility, and whether the
hash fields are clearly marked as placeholders.
