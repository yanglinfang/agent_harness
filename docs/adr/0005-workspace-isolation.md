# ADR 0005: Workspace Isolation Strategy

## Status

Accepted — 2026-05-03

## Context

The core safety property of `agent-harness` is that an agent run never modifies the user's real repository directly. All agent-issued writes happen in a shadow workspace; the user reviews the resulting diff and explicitly applies it (typically to a new branch) or discards the run.

The shadow workspace must satisfy:

- **Isolation by construction**: agent writes cannot escape the workspace and reach the real repo.
- **Cheap to create**: an agent run starts within seconds; multi-second copy times for moderately sized repos are acceptable but should not block the user for minutes.
- **Cross-platform**: macOS, Linux, and Windows.
- **Compatible with git tooling**: tools like `git status`, `git diff`, `git log`, and the `git_status` / `git_diff` first-class tools must work inside the workspace.
- **Cleanly diffable**: the system must be able to compute a unified diff between the workspace's final state and the snapshot it forked from.
- **Discardable**: the workspace can be deleted without side effects on the real repo.

This ADR is the first-version isolation strategy. It is explicitly a *trust UX* layer ("nothing touched my real repo until I said yes"), not a hardened security sandbox ("malicious code cannot escape"). True security isolation is out of scope for v0.1 and tracked as a Phase 2 concern.

## Decision

The shadow workspace strategy depends on platform:

### macOS / Linux (native)

Use **`git worktree`** as the primary mechanism, with **temporary copy** as a fallback for repositories that are not git repos or where worktree creation fails.

- A `git worktree add <workspace_path> <snapshot_ref>` creates a new working tree forked from the current HEAD, sharing the underlying git object store. Disk usage is minimal.
- The workspace lives under the user's app data directory: `<app_data>/agent-harness/workspaces/<workspace_id>/`.
- Snapshot reference is the HEAD SHA at workspace creation time.

If `git worktree` fails (e.g., bare repo, corrupt git state, non-git directory), fall back to temporary copy via the same archive pipe used on Windows (see below). This fallback is the only reason `TempCopyWorkspace` exists in v0.1; we do not maintain it as a first-class option.

### Windows (WSL execution plane, see ADR 0002)

Use a **POSIX archive pipe with blacklist exclusions** to copy the user's repo from the Windows filesystem into the WSL filesystem.

The implementation streams a tar archive from the source to the destination, applying exclude patterns. The conceptual command is:

```
tar -C <src> --exclude=node_modules --exclude=.venv ... -cf - . | tar -C <dst> -xf -
```

This is what we mean by "POSIX archive pipe with blacklist." It is a portable replacement for `cp -a + blacklist` (which is not standard POSIX and has no native exclude flag).

`.git` **is preserved**. Earlier discussion considered excluding `.git` to save space, but that breaks the `git_status` / `git_diff` first-class tools and the diff-back step. `.git` size is mitigated by the size guard described below.

The blacklist is the standard noise list:

```
node_modules
.venv
venv
__pycache__
dist
build
target
.next
.cache
.pytest_cache
.mypy_cache
.ruff_cache
coverage
.DS_Store
```

`.git` is **not** in the blacklist.

A **size guard** runs before copying:

- **Soft warning**: repo size > 500 MB or file count > 25,000 → user is warned but copy proceeds.
- **Hard prompt**: repo size > 1 GB or file count > 50,000 → user must explicitly confirm.

The shadow workspace lives at `/home/$USER/.agent-harness/workspaces/<workspace_id>` inside WSL.

### Path translation

Centralized in the WSL adapter. Business logic outside the adapter never converts between Windows and WSL paths. The adapter exposes path-translation utilities only for diagnostic and copy-back operations.

### Diff-back

When the user applies a run:

1. Inside the execution plane (WSL on Windows, native on macOS/Linux), generate a unified diff between the workspace and its snapshot ref:
   ```
   cd <workspace> && git add -A && git diff --staged <snapshot_ref> > <patch_file>
   ```
2. The patch is read by the control plane (across the WSL ↔ Windows boundary if applicable) and stored as a blob.
3. On the control plane, `git apply --3way <patch>` is invoked against the user's real repo, on a new branch named `agent-harness/run-<short_id>`, with no auto-commit.

Discard simply deletes the shadow workspace (and removes the worktree entry, if a worktree was used).

### What we are not doing in v0.1

- **No overlay filesystem.** Linux-only; not portable; requires elevated privileges.
- **No container-based sandbox.** Heavyweight; weakens first-run UX; deferred to Phase 2.
- **No WASM sandbox.** Cannot run real toolchains.
- **No `git clone --shared`.** Cross-filesystem hardlink behavior between Windows and WSL is unreliable; complicates the copy semantics.

## Alternatives Considered

### A. Native subprocess isolation only, no workspace copy

- **Pros**: Trivially fast.
- **Cons**: Provides no diff-first review; the agent operates on the real repo. Violates the core product promise.

### B. Container-based sandbox (Docker) on all platforms

- **Pros**: Strong isolation; uniform across OSes.
- **Cons**: Heavyweight install; degrades first-run UX; Docker Desktop licensing constraints; v0.1 simplicity goal violated. Tracked as a Phase 2 option.

### C. `git worktree` everywhere, including Windows

- **Pros**: Fast workspace creation; no copy.
- **Cons**: On Windows, the worktree would live on the Windows filesystem, but agent commands execute in WSL. Cross-filesystem `/mnt/c/...` access from WSL is significantly slower than native Linux filesystem access; large repos with many file operations become unusably slow.

### D. WSL-only on Windows, with `git worktree` inside WSL

- **Pros**: Fast worktree; native filesystem in execution plane.
- **Cons**: Requires the user's repo to also live inside WSL, which we cannot assume. Forcing repo migration is a non-starter.

### E. Copy-on-write filesystem features (APFS clonefile, btrfs subvolume snapshots, ReFS block cloning)

- **Pros**: Near-instantaneous copy on supported filesystems.
- **Cons**: Filesystem-specific; not portable; Windows ReFS is not the default; macOS APFS clonefile works but ties us to one filesystem feature. Worth revisiting in Phase 2.

## Consequences

### Positive

- macOS and Linux get fast workspace creation via git worktree, with disk usage proportional to changes only.
- Windows gets a portable copy strategy with explicit exclusions and size guards.
- `.git` is always present in the workspace, enabling git-aware tools and diff-back.
- Path translation is contained within the WSL adapter; the rest of the codebase is platform-agnostic.
- The diff-first review flow works identically across platforms.
- Discard is a simple filesystem delete; nothing else to clean up.

### Negative

- Windows workspace creation can be slow for large repos. Size guards mitigate but do not eliminate this.
- The fallback `TempCopyWorkspace` on macOS/Linux is a separate code path that must be tested even though it's rarely exercised.
- Diff-back across the WSL ↔ Windows boundary requires reading patches from a UNC path (`\\wsl$\<distro>\...`) or via `wsl.exe cat`. Both are reliable but add a small amount of complexity.
- We accept a "trust UX" level of isolation in v0.1. Malicious or buggy agent code could in principle write outside the workspace via path traversal, sudo escalation, or other escape hatches. Path containment in the Permission Engine and `sudo` hard deny mitigate the most obvious attacks, but this is not a security boundary.
- Repository copies inside WSL consume disk space proportional to repo size. Long-running installations should run a `agent-harness gc` periodically (Phase 2).

### Neutral

- Workspace ID format: `ws_<run_id_short>_<timestamp>`.
- Default cleanup policy: shadow workspaces are retained until the run is sealed and either applied or discarded. Sealed runs may keep the workspace for a configurable retention period (default: 7 days) to support replay-explain. This retention behavior is a v0.1 implementation detail subject to revision in Phase 2.
- Workspace creation events are first-class trace events: `workspace_snapshot_created`, `workspace_mutation_detected`, `workspace_diff_generated`.

## References

- Round 4–7 discussion of sandbox strategy
- Round 7 collapse: workspace strategy and `.git` preservation correction
- ADR 0002: Windows Execution Strategy
- ADR 0003: Trace Storage (workspaces and blobs persist alongside trace data)
- Git worktree documentation: https://git-scm.com/docs/git-worktree

## Revision History

| Date       | Author | Change        |
| ---------- | ------ | ------------- |
| 2026-05-03 | Nova   | Initial draft |
