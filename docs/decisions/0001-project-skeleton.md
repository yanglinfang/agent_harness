# ADR 0001: Claude Code Friendly Project Skeleton

## Status

Accepted.

## Context

Agent Harness will be developed by multiple agents and humans. The repo needs a
clear structure that lets Claude Code, Codex, and future agents understand local
context without re-reading the entire codebase.

## Decision

Use a Claude Code friendly skeleton:

- Root `CLAUDE.md` for global project context and rules.
- `.claude/settings.json` for project-level agent settings.
- `.claude/skills/*/SKILL.md` for reusable workflows.
- `.claude/hooks` for automation policy and future hooks.
- `docs/decisions` for ADRs.
- `docs/runbooks` for repeatable local operations.
- Local `CLAUDE.md` files inside future core modules.

## Consequences

Agents get durable instructions close to the files they edit. The structure adds
some documentation overhead, but it should reduce coordination mistakes once
Claude Code and Codex are both active in VS Code.
