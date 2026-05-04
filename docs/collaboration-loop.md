# Collaboration Loop

Target operating model:

1. Codex app scheduler selects a task from `docs/tasks/CURRENT_SPRINT.md`.
2. Nova and GPT Linx handle planning, detailed design, specs, and ADR drafts.
3. Claude Designer handles product design and interaction iteration.
4. Local Claude Code writes focused implementation changes in VS Code.
5. Local Codex coding agent writes assigned code, reviews diffs, runs checks,
   performs commits, and keeps git clean.
6. Codex app scheduler performs localhost user testing and sends feedback.
7. Lin arbitrates any disagreement across agents.
8. Repeat until localhost has a running product flow.

Rules:

- API keys stay local and are never pasted into web chats.
- Coding mode changes must keep General Agent Workspace as the primary product.
- Every feature should expose its trust surface: tool calls, permissions, memory,
  trace, and model route.
- The scheduler should avoid feature implementation. Its job is task breakdown,
  handoff, localhost user testing, feedback, and coordination.
- The scheduler can see every window; browser planning agents can only see their
  own conversation unless the scheduler pastes context.
