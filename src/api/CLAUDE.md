# API Module

This module will own the local API boundary between UI, runtime, and desktop
shell.

## Responsibilities

- HTTP or IPC contracts for local runtime calls.
- Request/response validation.
- Permission-aware command dispatch.
- Stable client surface for `apps/web` and `apps/desktop`.

## Rules

- Protocol types should come from `packages/protocol`.
- Do not read secrets directly in UI-facing code.
- Every side-effecting API should produce trace and permission events.
