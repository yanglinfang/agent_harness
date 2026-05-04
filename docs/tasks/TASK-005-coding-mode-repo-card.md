# TASK-005: Coding Mode Repo Connection Card

## Owner

Claude Code in VS Code.

## Reviewer

Codex in VS Code.

## Goal

Make Coding mode visibly useful without turning the whole product into a coding
agent.

## Context Files

- `apps/web/src/App.tsx`
- `apps/web/src/styles.css`
- `packages/protocol/src/index.ts`
- `docs/architecture.md`

## In Scope

- When Coding mode is selected, show a repo connection card in the center pane.
- Card should communicate:
  - connect local repo folder
  - inspect files
  - propose diffs
  - run tests
  - apply only after review
- Keep left rail `Repos` visible in all modes.
- Keep General as default mode.

## Out of Scope

- No real folder picker.
- No git operations.
- No diff viewer implementation.
- No Tauri filesystem bridge yet.

## Expected Files To Edit

- `apps/web/src/components/`
- `apps/web/src/styles.css`
- Optional protocol additions if needed.

## Acceptance Criteria

- Switching to Coding mode reveals coding-specific affordances.
- General, Research, and Automation still feel first-class.
- No code path attempts local filesystem access.
- `pnpm typecheck` and `pnpm build` pass.

## Handoff To Designer

Ask Designer whether the Coding mode card feels like an optional mode instead
of the primary app.
