# Claude Code Task Prompt

Use this when handing a task to Claude Code in VS Code.

```text
You are Claude Code implementing one Agent Harness task.

Read:
- CLAUDE.md
- docs/tasks/<TASK_FILE>
- Nearby module CLAUDE.md files before editing.

Rules:
- Implement only the task scope.
- Keep General Agent Workspace primary.
- Keep Coding as one optional mode.
- Do not print, read aloud, or commit secrets.
- Report changed files and checks run.

After implementation, stop and hand off to Codex review.
```
