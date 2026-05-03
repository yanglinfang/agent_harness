# TASK-000: Import Nova ADR 0001-0005

## Owner

Local Codex coding agent in VS Code.

## Reviewer

Scheduler in Codex app, with Lin as final arbiter.

## Source

Nova / Claude web chat. Nova is drafting ADR 0001-0005 after Lin clarified the
agent roles.

## Goal

Import Nova's ADR files into `docs/adr/` without changing their technical
meaning.

## Context Files

- `docs/coordination/roles.md`
- `docs/adr/README.md`
- `docs/tasks/CURRENT_SPRINT.md`
- `CLAUDE.md`

## In Scope

- Create:
  - `docs/adr/0001-language-stack.md`
  - `docs/adr/0002-windows-execution-strategy.md`
  - `docs/adr/0003-trace-storage.md`
  - `docs/adr/0004-schema-source-of-truth.md`
  - `docs/adr/0005-workspace-isolation.md`
- Preserve Nova's ADR decisions.
- Normalize markdown formatting only.
- Note any conflicts with existing repo docs.

## Out of Scope

- Do not invent missing ADR content.
- Do not implement code from the ADRs.
- Do not rename the project.
- Do not move existing docs unless Lin or scheduler asks.

## Acceptance Criteria

- All five ADRs exist under `docs/adr/`.
- Each ADR has Status, Context, Decision, Alternatives Considered,
  Consequences, and References.
- `git diff --check` passes.
- Commit message: `Task 000: import Nova ADRs`.

## Handoff Back To Scheduler

Report:

- Commit hash.
- Which Nova source messages/artifacts were used.
- Any wording that needs Lin arbitration.
