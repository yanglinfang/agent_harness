# Code Review

Use this skill when reviewing Agent Harness changes.

## Focus

- Product scope regressions: General Agent Workspace must remain primary.
- Trust regressions: tool calls, permissions, memory writes, model route, and
  trace should remain inspectable.
- Secret handling: `.env`, `.env.local`, API keys, tokens, and local credentials
  must not be committed or pasted into browser chats.
- Runtime boundaries: web UI, protocol, Python runtime, and Tauri shell should
  stay loosely coupled.
- Checks: prefer `pnpm typecheck`, `pnpm build`, Python runtime health, and
  browser smoke tests.

## Output

Lead with concrete findings, file paths, and suggested fixes. Keep summaries
brief.
