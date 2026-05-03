# Hooks

Local automation hooks for Claude Code and adjacent agents.

Initial policy:

- Do not run destructive filesystem or git commands automatically.
- Do not transmit secrets or local env values to browser-based agents.
- Run `pnpm typecheck` before asking Codex to review code.
- Run `pnpm build` before handing UI work to user testing.

Future hooks can wrap these checks once the implementation stabilizes.
