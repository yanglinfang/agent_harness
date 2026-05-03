# Agent Harness Task Board

This folder is the handoff layer for the multi-agent coding loop.

The Codex app agent is the scheduler. It should avoid implementing feature code
unless a task is blocked and the user explicitly asks it to intervene. Primary
implementation should happen in VS Code through:

- Local Claude Code: implementation agent.
- Local Codex coding agent: implementation, review, checks, git hygiene, and
  check-ins.
- Claude Design: product and interaction iteration.
- Nova and GPT Linx: planning and detailed design/specification.

## Operating Loop

1. Scheduler selects the next task from `CURRENT_SPRINT.md`.
2. Scheduler sends the task file to the correct agent.
3. Planning agents return specs/designs; local coding agents edit code/docs.
4. Local Codex coding agent reviews diffs, runs checks, and commits.
5. Scheduler tests the localhost UI and writes feedback as a follow-up task.
6. Designer agent updates interaction guidance when UI feedback requires design.

## Task File Rules

Every task should include:

- Owner agent.
- Goal.
- Context files to read.
- In scope.
- Out of scope.
- Expected files to edit.
- Acceptance criteria.
- Handoff notes for the next agent.

Secrets and `.env` values must never be pasted into browser-based agents.
