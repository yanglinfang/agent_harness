# Claude Code Project Structure

## Project Overview

Agent Harness is a general-purpose local/cloud hybrid agent workspace for normal
users. It is not only a coding agent. The product starts from a chat-like
workspace where users can perform everyday tasks, research, writing, planning,
file work, browser/app automation, and tool actions. Coding is one optional mode
for connected repositories.

## Key Components

- `README.md`: product scope, local setup, and repo map.
- `apps/web`: React localhost UI for product iteration and user testing.
- `apps/desktop`: Tauri desktop shell scaffold.
- `apps/runtime-python`: local Python runtime stub for tool execution.
- `packages/protocol`: shared TypeScript protocol and event contracts.
- `docs`: architecture notes, decisions, and runbooks.
- `.claude/skills`: reusable Claude Code workflows.
- `.claude/hooks`: local automation hooks and policy notes.
- `tools`: scripts and prompts used by agents and maintainers.
- `src`: future core application modules with local instructions.

## Best Practices

- Keep the General Agent Workspace as the primary product surface.
- Treat Coding as one mode, not the whole product.
- Make trust visible: tool calls, permissions, memory writes, model routing, and
  trace events should be inspectable.
- Keep API keys local. Never paste secrets into browser chats or generated docs.
- Prefer small implementation slices with a matching check: typecheck, build,
  runtime health, or browser smoke test.
- Commit focused changes with readable messages.

## Getting Started

```bash
pnpm install
pnpm dev
```

The first UI target is `http://127.0.0.1:5173/`.

To copy local API configuration from the sibling repo without printing secrets:

```bash
pnpm env:sync
```

## Current Implementation Target

Build toward a running localhost product loop:

1. General Agent Workspace first screen.
2. Governed tool/runtime trace.
3. Optional coding mode with repo connection.
4. Permission and memory inspector.
5. Local Python runtime bridge.
6. Tauri desktop shell once Rust is available.
