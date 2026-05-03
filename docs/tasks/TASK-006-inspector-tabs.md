# TASK-006: Inspector Tabs for Agent Framework Capabilities

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Make the right inspector tabs switch between Memory, Tools, MCP, Skills,
Permissions, and Trace using typed static data.

## Context Files

- `apps/web/src/App.tsx`
- `apps/web/src/data.ts`
- `apps/web/src/styles.css`
- `packages/protocol/src/index.ts`

## In Scope

- Add selected inspector tab state.
- Render distinct content for:
  - Memory
  - Tools
  - MCP
  - Skills
  - Permissions
  - Trace
- Keep data static and typed.
- Make capabilities legible for normal users, not only developers.

## Out of Scope

- No real MCP connection.
- No real skill marketplace.
- No persistence.
- No settings page.

## Expected Files To Edit

- `apps/web/src/components/InspectorPanel.tsx`
- `apps/web/src/data.ts`
- `apps/web/src/styles.css`
- Optional protocol additions.

## Acceptance Criteria

- All six tabs are clickable.
- Active tab is visually clear.
- Each tab explains its capability through concrete state, not marketing text.
- `pnpm typecheck` passes.

## Handoff To Designer

Ask Designer to review whether the inspector is too developer-heavy for normal
users.
