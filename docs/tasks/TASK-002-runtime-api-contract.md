# TASK-002: Runtime API Contract

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Define the first local runtime API contract between the web UI and Python
runtime without implementing full agent execution.

## Context Files

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/web/src/data.ts`
- `docs/architecture.md`
- `src/api/CLAUDE.md`

## In Scope

- Add protocol types for:
  - runtime health
  - run summary
  - trace event list
  - permission request
- Extend Python runtime with JSON endpoints:
  - `GET /health`
  - `GET /runs/active`
  - `GET /runs/active/trace`
- Keep endpoint data static for now.
- Add a small web API client wrapper.

## Out of Scope

- No real model calls.
- No real filesystem tool execution.
- No API key usage.
- No persistent database.

## Expected Files To Edit

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/web/src/api/`
- Optional `apps/web/src/data.ts`

## Acceptance Criteria

- `pnpm typecheck` passes.
- Python runtime starts locally.
- `curl -s http://127.0.0.1:8787/health` returns JSON.
- New endpoints return static JSON matching protocol types.
- No secret values are read or printed.

## Handoff To Codex Review

Ask Codex to check that protocol and Python JSON shapes are consistent and that
the UI API client is not tightly coupled to mock data.
