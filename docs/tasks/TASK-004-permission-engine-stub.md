# TASK-004: Permission Engine Stub

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Add a minimal permission policy model that can classify static tool requests and
surface approval-required states to the UI.

## Context Files

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/web/src/App.tsx`
- `docs/architecture.md`

## In Scope

- Add protocol types for permission requests and decisions.
- Define risk levels:
  - allow
  - approval-required
  - blocked
- Add static policy examples:
  - workspace read allowed
  - network fetch approval-required
  - secret read blocked
  - destructive shell blocked
- Surface one pending permission request in the UI.

## Out of Scope

- No real command execution.
- No browser permission prompts.
- No persisted policy editor.
- No user account or auth model.

## Expected Files To Edit

- `packages/protocol/src/index.ts`
- `apps/runtime-python/agent_harness_runtime/server.py`
- `apps/web/src/components/` or `apps/web/src/App.tsx`

## Acceptance Criteria

- Permission request shape is typed.
- UI shows a pending permission with allow/deny controls.
- Controls can remain non-functional for this task, but state should be ready
  for wiring.
- `pnpm typecheck` passes.

## Handoff To Codex Review

Ask Codex to check that permission policy is default-deny in wording and does
not imply real security before enforcement exists.
