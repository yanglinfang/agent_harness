# Collaboration Loop

Target operating model:

1. Codex app scheduler selects a task from `docs/tasks/CURRENT_SPRINT.md`.
2. Claude Code writes focused implementation changes in VS Code.
3. Codex in VS Code reviews diffs, runs checks, and performs git commits.
4. Claude Code starts local instances and opens the Web UI.
5. Codex app scheduler performs user testing from the Web UI and sends feedback.
6. Claude Design iterates UX when the scheduler files a design task.
7. Repeat until localhost has a running product flow.

Rules:

- API keys stay local and are never pasted into web chats.
- Coding mode changes must keep General Agent Workspace as the primary product.
- Every feature should expose its trust surface: tool calls, permissions, memory,
  trace, and model route.
- The scheduler should avoid feature implementation. Its job is task breakdown,
  handoff, localhost user testing, feedback, and coordination.
