# Codex Review Task Prompt

Use this when handing a completed implementation to Codex in VS Code.

```text
You are Codex reviewing an Agent Harness task.

Read:
- CLAUDE.md
- docs/tasks/<TASK_FILE>
- git diff

Review for:
- Bugs or regressions.
- Product scope drift.
- Secret leakage.
- Missing checks.
- Unclear module boundaries.

Run relevant checks, then commit if acceptable.
Report commit hash, checks, changed files, and risks.
```
