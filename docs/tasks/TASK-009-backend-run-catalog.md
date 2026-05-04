# TASK-009: Backend-Backed Run Catalog

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Move the current web shell from the static `apps/web/src/data.ts` import to a
backend-served run catalog. The Python runtime gains a small read-only catalog
of fixture runs; the web shell fetches and renders them with narrow loading,
error, empty, and not-found UX states.

This is a wiring slice. There is no new agent execution, no model provider, no
DB, no WebSocket, no permission engine, and no real diff/apply pipeline.

## Context Files

- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/runtime-python/agent_harness_runtime/fixtures/runs.json` (new)
- `apps/web/src/App.tsx`
- `apps/web/src/data.ts`
- `apps/web/src/components/`
- `packages/protocol/src/index.ts`
- `docs/tasks/TASK-002-runtime-api-contract.md`

## In Scope

### Backend

- Keep `GET /health`.
- Add `GET /runs` returning `{ "runs": RunSummary[] }`.
- Add `GET /runs/{run_id}` returning full `RunDetail` JSON or 404 with a JSON
  error body.
- Load runs from a fixture file under
  `apps/runtime-python/agent_harness_runtime/fixtures/runs.json`.
- Stay on the stdlib `http.server` pattern from the existing `/health` handler.
- Include permissive CORS headers so the Vite dev origin
  (`http://127.0.0.1:5173`) can fetch.

### Wire shape

Each run carries the fields needed by the current UI: `run_id`, `title`,
`intent`, `status`, `mode`, `model`, `updated_at`, `capabilities`, `workspace`,
`messages`, `activity`, `inspector`. `/runs` returns the slim summary subset
(`run_id`, `title`, `intent`, `status`, `mode`, `updated_at`).

### Frontend

- Remove production imports from `apps/web/src/data.ts`. The module may stay as
  a dev/reference fixture only.
- Fetch `/health` then `/runs` on app load.
- Select the first run by default.
- Fetch `/runs/{run_id}` when the selected run changes.
- Cache details in memory only for the session (no localStorage).
- Add small loading/error/empty/not-found states without changing the overall
  layout.

### UX states (from Designer notes)

- Loading runs: 5 flat-bar skeleton rows in the rail. No spinner. No layout
  shift.
- Backend unavailable: 32 px warning banner inside the rail with a Retry
  button and a last-tried timestamp; any cached rows stay dimmed below.
- Empty runs: centered "No runs yet" with a small disabled "New run" CTA. No
  illustration.
- Selected run: 2 px accent left edge + subtle filled background; row uses
  `aria-current="page"`.
- Detail loading: header/body skeleton bars matching real heights, no layout
  shift.
- Run not found: inline detail-region message that echoes the requested id and
  offers a "Back to runs" affordance.
- Capability badges: small outlined monospace chips on each catalog row for
  general / coding / research / automation; subordinate to status text.

## Out of Scope

- No `POST /runs`. No mutation endpoints.
- No DB, no SQLite, no on-disk write.
- No model provider, no API key handling, no `.env` reads inside this slice.
- No trace kernel, no permission engine, no tool runtime, no WebSocket, no
  diff/apply/discard, no Tauri filesystem bridge.

## Expected Files To Edit

- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/runtime-python/agent_harness_runtime/fixtures/runs.json` (new)
- `packages/protocol/src/index.ts`
- `apps/web/src/api/` (new)
- `apps/web/src/components/`
- `apps/web/src/App.tsx`
- `apps/web/src/styles.css`
- `apps/web/src/data.ts` (drop production import path; keep as reference)
- `docs/tasks/TASK-009-backend-run-catalog.md` (this file)

## Acceptance Criteria

- `pnpm typecheck` passes.
- `pnpm build` passes.
- Python smoke run shows:
  - `GET /health` → 200 JSON.
  - `GET /runs` → 200 JSON with non-empty `runs`.
  - `GET /runs/{known_id}` → 200 JSON with all expected fields.
  - `GET /runs/missing` → 404 JSON.
- Web app boots with the runtime up and renders the first run.
- Web app shows the rail-error banner when the runtime is down, with cached
  rows dimmed.
- No `.env` or secret value is read, printed, staged, or committed.

## Handoff To Codex Review

Ask Codex to confirm:

- Wire shape matches what the UI consumes.
- API client is not coupled to a single run shape; switching runs only re-fetches.
- Stdlib server is small, readable, and does not leak secrets.
- `data.ts` is no longer in the production render path.
- No layout regressions across loading/error/empty/not-found states.
