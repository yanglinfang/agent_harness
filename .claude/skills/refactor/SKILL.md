# Refactor

Use this skill when reorganizing Agent Harness code.

## Rules

- Keep edits scoped to one layer unless the contract requires cross-layer work.
- Preserve the public protocol in `packages/protocol` unless migration notes are
  included.
- Do not move app code only to mirror a diagram. Move code when it improves the
  implementation boundary.
- Update nearby `CLAUDE.md`, docs, or runbooks when a module boundary changes.

## Preferred Flow

1. Identify the boundary being improved.
2. Make the smallest structural change.
3. Run typecheck/build.
4. Record follow-up work explicitly.
