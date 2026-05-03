# Architecture Decision Records

This folder will hold ADR 0001-0005 from Nova's Round 7 consolidation.

Nova owns the ADR content. The Codex app scheduler tracks the handoff. Local
coding agents import, format, review, and commit the ADR files.

Expected initial ADRs:

- `0001-language-stack.md`: Tauri + Rust + TS/React + Python.
- `0002-windows-execution-strategy.md`: native control plane + WSL execution plane.
- `0003-trace-storage.md`: SQLite primary + blob store + JSONL export.
- `0004-schema-source-of-truth.md`: JSON Schema + codegen.
- `0005-workspace-isolation.md`: git worktree native / tar pipe to WSL.

Use the template sections:

- Status
- Context
- Decision
- Alternatives Considered
- Consequences
- References
