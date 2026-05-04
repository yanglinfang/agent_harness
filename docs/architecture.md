# Agent Harness Architecture

Agent Harness is a general agent workspace with a governed execution layer.

## Frontend

- `apps/web`: first product surface for localhost iteration.
- `apps/desktop`: Tauri shell scaffold for local desktop distribution.
- UI model: left workspace rail, central task stream, right capability inspector,
  bottom activity drawer.

## Runtime

- Python runtime owns local tool execution and OS-adjacent adapters.
- TypeScript packages define protocol, UI state, and future client SDKs.
- Rust/Tauri owns native desktop permissions, filesystem bridge, and packaging.

## Agent Framework

- Workspace sources: files, docs, repos, browser, apps.
- Modes: General, Coding, Research, Automation.
- Capabilities: tools, MCP, skills, memory, model routing, profiles.
- Trust layer: permission policy, trace events, audit export, replay, eval hooks.

## Coding Mode

Coding mode is optional and repo-scoped. The agent can inspect files, propose
diffs, run tests, and ask for review before applying changes.
