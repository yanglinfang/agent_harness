# ADR 0001: Language and Runtime Stack

## Status

Accepted — 2026-05-03

## Context

`agent-harness` is an open-source local-first agent runtime for traceable coding agents. The product surfaces are:

1. A native desktop application that runs on macOS, Linux, and Windows.
2. An agent execution control plane that orchestrates session lifecycle, tool calls, permission decisions, model calls, workspace mutations, and trace persistence.
3. An execution plane that runs agent-issued shell commands and tool calls in an isolated shadow workspace.

The stack must satisfy:

- **Cross-platform desktop distribution** (single binary preferable, small install footprint).
- **Strong native integration** for filesystem, process control, and OS-level isolation primitives.
- **A mature ecosystem for LLM agent tooling**, model providers, and JSON Schema codegen.
- **A frontend stack appropriate for a developer console** with diff viewers, timelines, and live streaming UI.
- **Compatibility with the team's coding agents** (local Claude Code agent and Codex coding agent), which are most productive in TypeScript/React, Python, and Rust.

We considered a single-language stack but rejected it: no single language covers desktop shell, native UI, agent ML/LLM ecosystem, and modern web frontend equally well.

## Decision

We will use a three-language stack:

1. **Tauri 2.x (Rust)** as the desktop application shell.
2. **TypeScript + React** as the frontend, rendered inside the Tauri webview.
3. **Python 3.12+** as the backend control plane, launched as a Tauri sidecar process.

Communication boundaries:

- Frontend ↔ Backend: HTTP/WebSocket on `localhost` (loopback only, port chosen at startup).
- Tauri shell ↔ Backend: process lifecycle management only (spawn, monitor, terminate). Tauri does not parse business data.
- Tauri shell ↔ Frontend: standard Tauri IPC, used only for native capabilities (filesystem picker, window management, secure config).

The Trace Kernel, Tool Runtime, Permission Engine, Workspace Runtime, Model Adapter, Session Orchestrator, and all storage live in Python. The frontend is a thin presentation layer.

## Alternatives Considered

### Electron + Node.js backend

- **Pros**: Single language (TypeScript) front-to-back; mature; large ecosystem.
- **Cons**: Larger install size; weaker LLM/ML ecosystem than Python; weaker native isolation primitives than Rust; team coding agents are stronger in Python for backend logic.

### Tauri + Rust backend (no Python)

- **Pros**: Smaller binary; one fewer language; strong typing end-to-end.
- **Cons**: Rust LLM client ecosystem is immature relative to Python; agent tool development cycles are slower in Rust; team coding agents are less productive in Rust for agent business logic.

### Pure Python with PyWebView or Toga

- **Pros**: Single language; faster prototyping.
- **Cons**: Inferior native integration; weaker desktop UX; no clear cross-platform distribution story; no strong webview component.

### Web-first PWA with no native shell

- **Pros**: Trivial deployment; no install.
- **Cons**: Cannot access local filesystem reliably; cannot spawn local processes; cannot run a sandboxed workspace on the user's machine; violates the local-first product principle.

## Consequences

### Positive

- Each language is used where it has the strongest ecosystem fit.
- Native desktop UX with reasonable binary size (Tauri).
- Python backend is straightforward for the team's coding agents to extend.
- TypeScript frontend has access to mature diff viewers (e.g., Monaco, react-diff-viewer) and component libraries.
- Strong typing across all three languages via JSON Schema codegen (see ADR 0004).

### Negative

- Three languages means three toolchains, three lint/format/test pipelines, three sets of CI matrix entries.
- Sidecar process management adds complexity: backend startup time affects perceived app launch time; backend crash recovery must be designed.
- IPC boundary between Rust shell and Python backend requires explicit protocol; we cannot share types directly.
- Python sidecar must be bundled with the app for distribution; embedding a Python interpreter increases binary size.

### Neutral

- Pinned versions: Rust stable (latest at sprint start), Tauri 2.x, Node 20 LTS, Python 3.12+. Specific versions recorded in `rust-toolchain.toml`, `.nvmrc`, `pyproject.toml`.
- Python distribution: we will use PyOxidizer or a bundled CPython for v0.1. Decision deferred to a sprint 1 ADR if needed.

## References

- Round 5 product direction (Lin): "Tauri (Rust shell) + TS/React 前端 + Python 后端"
- Round 7 collapse: language stack confirmed
- ADR 0002: Windows Execution Strategy
- ADR 0004: Schema Source of Truth

## Revision History

| Date       | Author | Change         |
| ---------- | ------ | -------------- |
| 2026-05-03 | Nova   | Initial draft  |
