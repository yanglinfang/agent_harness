# Agent Harness Task Board

This folder is the handoff layer for the multi-agent coding loop.

The Codex app agent is the scheduler. It should avoid implementing feature code
unless a task is blocked and the user explicitly asks it to intervene. Primary
implementation should happen in VS Code through:

- Claude Code: implementation agent.
- Codex in VS Code: review, checks, git hygiene, and check-ins.
- Claude Design: product and interaction iteration.

## Operating Loop

1. Scheduler selects the next task from `CURRENT_SPRINT.md`.
2. Scheduler sends the task file to Claude Code in VS Code.
3. Claude Code edits code and reports changed files plus checks.
4. Codex in VS Code reviews the diff, runs checks, and commits.
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
