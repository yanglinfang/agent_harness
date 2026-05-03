# Collaboration Loop

Target operating model:

1. Claude Code writes focused implementation changes in VS Code.
2. Codex reviews diffs, runs checks, and performs git commits.
3. Claude Code starts local instances and opens the Web UI.
4. Codex app performs user testing from the Web UI and sends feedback.
5. Repeat until localhost has a running product flow.

Rules:

- API keys stay local and are never pasted into web chats.
- Coding mode changes must keep General Agent Workspace as the primary product.
- Every feature should expose its trust surface: tool calls, permissions, memory,
  trace, and model route.
