# ADR 0002: Windows Execution Strategy

## Status

Accepted — 2026-05-03

## Context

On macOS and Linux, the `agent-harness` Python backend runs natively and the shadow workspace is created on the same filesystem as the user's repository, using `git worktree` or a temporary copy. Tool calls execute as native subprocesses.

On Windows, the situation is different:

- Many shell commands the agent may issue are POSIX-shaped (`grep`, `rg`, `find`, `bash` scripts, package managers).
- POSIX path semantics differ from Windows path semantics; agent-generated commands will frequently assume POSIX.
- True process isolation primitives are weaker on Windows than on Linux.
- WSL 2 provides a near-Linux execution environment, widely available on developer machines, with strong filesystem performance when files live inside the WSL filesystem.

We therefore need an explicit strategy for how the Windows version of `agent-harness` executes agent-issued commands.

Two extreme positions were considered and rejected:

- **Run the entire backend inside WSL.** Adds significant first-run friction, complicates path mapping for files visible in the Tauri app, makes IPC and logs harder to debug, and degrades the desktop experience.
- **Run everything natively on Windows.** Forces us to either rewrite agent-issued POSIX commands or ship our own POSIX shim layer; multiplies the surface area for cross-platform shell classifier rules; weakens isolation.

## Decision

On Windows, we will split control plane and execution plane:

- **Control plane**: the Python backend runs natively on Windows. It owns session orchestration, trace persistence, model calls, permission decisions, and IPC with the frontend.
- **Execution plane**: agent-issued shell commands and shadow workspace mutations execute inside WSL 2 via an `ExecutionAdapter` interface.

The shadow workspace lives inside the WSL filesystem (e.g., `/home/$USER/.agent-harness/workspaces/{workspace_id}`) for performance, not on `/mnt/c/...`. The user's real repository remains in its original location on the Windows filesystem.

Workspace creation copies the repo from the Windows filesystem into WSL using a POSIX archive pipe with blacklist exclusions (see ADR 0005). `.git` is preserved.

Path translation between Windows and WSL is centralized in the WSL adapter. No path conversion happens in business logic outside the adapter.

On macOS and Linux, the `ExecutionAdapter` has a native implementation that runs commands as subprocesses on the same filesystem as the repo. The shadow workspace is created via `git worktree` (preferred) or temporary copy (fallback).

## Alternatives Considered

### A. Backend entirely in WSL

- **Pros**: Single execution environment; no path translation; simpler shell semantics.
- **Cons**: Frontend ↔ backend IPC across the WSL boundary is fragile; filesystem watcher and log access from Windows side is awkward; first-run install requires WSL before any UI is usable; debugging across the boundary is painful.

### B. Native Windows backend, native Windows execution

- **Pros**: No WSL dependency; simpler distribution.
- **Cons**: Agent-issued POSIX commands fail or require translation; we must ship or shim a POSIX environment; shell classifier rules must support both Windows and POSIX command shapes; isolation is weaker.

### C. Lin's chosen split: native control plane + WSL execution plane (this ADR)

- **Pros**: Native desktop experience; POSIX execution where it matters; clear architectural boundary; WSL is a well-known dependency for Windows developers.
- **Cons**: Path translation logic; copy-in / diff-back overhead; WSL must be a documented prerequisite; first-run setup flow needed when WSL is missing.

### D. Containers (Docker Desktop)

- **Pros**: Strongest isolation; same image across OSes.
- **Cons**: Heavyweight install; Windows performance overhead; Docker Desktop licensing constraints for some users; violates v0.1 simplicity goal.

## Consequences

### Positive

- Native desktop experience preserved on Windows.
- POSIX-shaped agent commands execute in a POSIX environment without translation.
- Single shell classifier rule set across all platforms.
- Clear boundary makes the WSL adapter testable in isolation.
- WSL absence is detectable and surfaced to users via a status pill and onboarding panel rather than a silent failure.

### Negative

- A repo copy step is required at workspace creation, with size guard and blacklist (see ADR 0005). For very large repositories this is slow.
- Path translation must be implemented carefully; bugs here are high-impact.
- We accept WSL 2 as a hard prerequisite for the Windows version.
- Distro selection complexity: we recommend a default distro but must allow override.
- Diff-back from WSL to Windows requires reading patches across the WSL ↔ Windows filesystem boundary.

### Neutral

- v0.1 supports WSL 2 only. WSL 1 is explicitly unsupported.
- Default distro: Ubuntu (most common; configurable in Settings).
- WSL health states surfaced in UI: Ready / Needs Setup / Distro Unreachable / Path Mapping Failed / Execution Failed.
- The `ExecutionAdapter` interface is defined in `backend/execution/adapter.py` with two concrete implementations: `NativeAdapter` (macOS/Linux) and `WSLAdapter` (Windows).

## References

- Round 4–7 discussion of Windows execution strategy
- Round 7 collapse: "Windows native app/backend = control plane, WSL = execution plane"
- ADR 0005: Workspace Isolation Strategy
- Microsoft documentation: WSL 2 architecture, `wsl.exe` CLI

## Revision History

| Date       | Author | Change        |
| ---------- | ------ | ------------- |
| 2026-05-03 | Nova   | Initial draft |
