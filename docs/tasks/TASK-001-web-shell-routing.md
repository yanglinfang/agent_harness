# TASK-001: Web Shell Routing and Layout Boundaries

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Turn the current single React screen into a maintainable web shell with clear
layout regions and mode selection state.

## Context Files

- `CLAUDE.md`
- `apps/web/src/App.tsx`
- `apps/web/src/data.ts`
- `apps/web/src/styles.css`
- `packages/protocol/src/index.ts`
- `docs/architecture.md`

## In Scope

- Split the current `App.tsx` into small components:
  - `WorkspaceRail`
  - `AgentHeader`
  - `ModeSwitcher`
  - `CapabilityStrip`
  - `ConversationStream`
  - `ActivityDrawer`
  - `InspectorPanel`
- Add React state for selected mode: General, Coding, Research, Automation.
- Keep General as the default and primary mode.
- Keep visual behavior close to the current localhost UI.

## Out of Scope

- No backend calls.
- No real routing library yet.
- No persistence.
- No design restyle beyond layout cleanup.

## Expected Files To Edit

- `apps/web/src/App.tsx`
- `apps/web/src/styles.css`
- Optional new files under `apps/web/src/components/`

## Acceptance Criteria

- `pnpm typecheck` passes.
- `pnpm build` passes.
- Localhost still shows the same major regions.
- Switching modes changes selected state visibly.
- Coding mode remains one mode, not the default product surface.

## Handoff To Codex Review

Ask Codex to check that component boundaries are simple and that no product scope
regression makes the app coding-first.
