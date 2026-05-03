# Current Sprint: Localhost Agent Workspace v0.1

## Objective

Turn the scaffold into a running localhost product loop for a normal-user agent
workspace, with coding mode as one optional mode and trace/governance visible
across all modes.

## Agent Assignments

| Task | Owner | Reviewer | Status |
| --- | --- | --- | --- |
| `TASK-000-import-nova-adrs.md` | Local Codex coding agent | Scheduler + Lin | Done |
| `TASK-001-web-shell-routing.md` | Claude Code | Codex VS Code | In progress |
| `TASK-002-runtime-api-contract.md` | Claude Code | Codex VS Code | Ready |
| `TASK-003-trace-event-store.md` | Claude Code | Codex VS Code | Ready |
| `TASK-004-permission-engine-stub.md` | Claude Code | Codex VS Code | Ready |
| `TASK-005-coding-mode-repo-card.md` | Claude Code | Codex VS Code | Ready |
| `TASK-006-inspector-tabs.md` | Claude Code | Codex VS Code | Ready |
| `TASK-007-designer-ui-iteration.md` | Claude Design | Scheduler | Ready |
| `TASK-008-review-and-checkin.md` | Codex VS Code | Scheduler | Armed for TASK-001 |

## Recommended Order

1. `TASK-000-import-nova-adrs.md`
2. `TASK-001-web-shell-routing.md`
3. `TASK-002-runtime-api-contract.md`
4. `TASK-003-trace-event-store.md`
5. `TASK-004-permission-engine-stub.md`
6. `TASK-006-inspector-tabs.md`
7. `TASK-005-coding-mode-repo-card.md`
8. `TASK-007-designer-ui-iteration.md`
9. `TASK-008-review-and-checkin.md`

## Scheduler Notes

- Keep the web UI running at `http://127.0.0.1:5173/` during testing.
- Ask local Claude Code for small implementation patches, not broad rewrites.
- Ask local Codex coding agent to implement when assigned, review patches, run
  checks, and commit.
- Use Designer only for interaction/layout decisions, not code ownership.
- Treat Nova and GPT Linx as plan/spec/design agents. They do not see the local
  repo unless the scheduler pastes context.
