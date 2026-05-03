# TASK-008: Review and Check-in Gate

## Owner

Codex in VS Code.

## Reviewer

Scheduler in Codex app.

## Goal

Provide a repeatable gate after each Claude Code implementation task.

## Inputs

- Claude Code summary.
- Changed files.
- Test/check output.
- Relevant task file.

## Review Checklist

- Product scope still says general agent first.
- Coding remains one mode.
- No secrets committed.
- `.env` and `.env.local` remain ignored.
- Component boundaries are understandable.
- Protocol changes are reflected in runtime/UI usage.
- Checks pass:
  - `pnpm typecheck`
  - `pnpm build` when UI or protocol changed
  - runtime health when Python runtime changed

## Git Checklist

- Review `git diff`.
- Commit one focused task at a time.
- Commit message format:

```text
Task N: concise change summary
```

## Handoff Back To Scheduler

Report:

- Commit hash.
- Checks run.
- Files changed.
- Any risks or follow-up tasks.
