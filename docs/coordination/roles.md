# Agent Roles

This project is coordinated through several agents with different visibility and
authority.

## Authority

- Lin: project owner and final arbiter.
- Codex app: global scheduler with visibility across browser windows, local repo,
  localhost UI, and coding-agent handoffs.

## Planning and Design

- Nova / Claude web chat: planning, detailed specification, ADR drafting, and
  architecture pressure testing.
- GPT Linx web chat: planning, detailed specification, and counter-review.
- Claude Designer web chat: product design and interaction iteration.

## Local Coding

- Local Claude Code agent in VS Code: implementation.
- Local Codex coding agent in VS Code: implementation, review, checks, commits,
  and git hygiene.

## Scheduler Rules

- The Codex app scheduler should not own feature implementation.
- The scheduler may update coordination docs, task cards, prompts, and handoff
  notes.
- The scheduler turns Nova/Linx/Designer outputs into local task files.
- Core specs and ADRs should be written by the planning agents, then imported by
  local coding agents.
- If agents disagree, Lin decides. The repo spec and ADRs are the baseline for
  arbitration.
