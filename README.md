# Agent Harness

General-purpose local/cloud hybrid agent workspace for normal users.

Agent Harness combines a chat-first workspace with governed tool execution,
memory, MCP connections, skills, local workspace context, and an optional coding
mode for connected repositories.

## Product Shape

- General agent first: everyday tasks, research, writing, planning, files, apps,
  browser, and tool actions.
- Coding as one mode: connect a local repo, inspect files, propose diffs, run
  tests, and apply after review.
- Agent framework layer: MCP, skills marketplace, tool registry, memory,
  workspace sources, model routing, profiles, and policy.
- Trust layer: every tool call, permission decision, memory write, and model
  route is traceable and replayable.

## Repo Structure

```text
CLAUDE.md              Global Claude Code project context
.claude/              Agent settings, hooks, and reusable skills
apps/web/              React web UI for localhost product iteration
apps/desktop/          Tauri desktop shell scaffold
apps/runtime-python/   Python runtime stub for local tool execution
packages/protocol/     Shared TypeScript protocol/types
scripts/               Local developer helpers
docs/                  Architecture, decisions, and runbooks
tools/                 Agent prompts and deterministic helper scripts
src/                   Future core modules with local instructions
```

## Local Setup

```bash
pnpm install
pnpm dev
```

The web UI starts from `apps/web` and is the first surface for product testing.

To copy local API configuration from the existing `moltbot_clipai` repo without
printing secrets:

```bash
pnpm env:sync
```

This writes `.env.local` in this repo and keeps it ignored by git.
