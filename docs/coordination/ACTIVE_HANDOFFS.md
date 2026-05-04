# Active Coding Agent Handoffs

This file is the scheduler-owned handoff board for local VS Code agents.

## 2026-05-03 Handoff A: Claude Code Implements TASK-001

Paste this into the local Claude Code agent in VS Code:

```text
You are the local Claude Code implementation agent for Agent Harness.

Assignment: implement TASK-001 only.

Read first:
- CLAUDE.md
- docs/tasks/TASK-001-web-shell-routing.md
- docs/adr/0001-language-stack.md
- docs/coordination/roles.md
- apps/web/src/App.tsx
- apps/web/src/data.ts
- apps/web/src/styles.css
- packages/protocol/src/index.ts

Product invariant:
- Agent Harness is a general-purpose agent workspace for normal users.
- Coding is one optional mode, not the default product surface.
- General mode remains primary and default.

Implementation scope:
- Split the current single React screen into small components:
  - WorkspaceRail
  - AgentHeader
  - ModeSwitcher
  - CapabilityStrip
  - ConversationStream
  - ActivityDrawer
  - InspectorPanel
- Add React state for selected mode: General, Coding, Research, Automation.
- Keep visual behavior close to the current localhost UI.

Do not:
- Add backend calls.
- Add a routing library.
- Add persistence.
- Use or inspect API keys.
- Rebrand or rename the project.
- Expand the product into coding-only UX.

Expected files:
- apps/web/src/App.tsx
- apps/web/src/styles.css
- Optional: new files under apps/web/src/components/

Checks:
- Run pnpm typecheck.
- Run pnpm build.

When done:
- Stop after implementation.
- Do not commit.
- Report changed files, checks run, and any risk.
- Hand off to the local Codex coding agent for review and commit.
```

## 2026-05-03 Handoff B: Codex Coding Agent Review Gate

Paste this into the local Codex coding agent in VS Code after Claude Code
finishes TASK-001:

```text
You are the local Codex coding agent for Agent Harness.

Assignment: review and check in Claude Code's TASK-001 implementation.

Read first:
- CLAUDE.md
- docs/tasks/TASK-001-web-shell-routing.md
- docs/tasks/TASK-008-review-and-checkin.md
- docs/coordination/roles.md
- git diff

Review focus:
- General agent workspace remains primary.
- Coding is one optional mode, not the whole product.
- Component boundaries are simple and understandable.
- No backend/API/persistence scope leaked into TASK-001.
- No secrets or .env content are read, printed, staged, or committed.
- No unrelated files are changed.

Checks:
- Run pnpm typecheck.
- Run pnpm build.
- If checks fail, either fix narrowly within TASK-001 scope or hand back a clear failure report.

If acceptable:
- Commit one focused change.
- Commit message: Task 001: split web shell into mode-aware components

Report back to scheduler:
- Commit hash.
- Files changed.
- Checks run.
- Review findings or remaining risks.
```

