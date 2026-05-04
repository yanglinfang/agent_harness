# TASK-007: Designer UI Iteration

## Owner

Claude Design.

## Reviewer

Scheduler in Codex app.

## Goal

Refine the Agent Workspace first screen based on the running localhost UI, not
only the previous static mockup.

## Context To Send

- Product is for normal users.
- General Agent Workspace is primary.
- Coding is one optional mode.
- Agent framework capabilities must be visible:
  - Memory
  - Tools
  - MCP
  - Skills
  - Permissions
  - Trace
- Trust layer must be visible:
  - tool calls
  - permission decisions
  - memory writes
  - model routing
  - trace events

## Designer Questions

1. Is the current first screen too dense for normal users?
2. Should trace/governance live in the bottom drawer, right inspector, or both?
3. How should Coding mode be represented without making the product feel coding-first?
4. What should the empty state look like before a user connects workspace sources?
5. What is the minimum first-run onboarding needed?

## Expected Output

- A short design critique.
- Concrete UI changes for the next coding task.
- Updated copy recommendations for first-run and permission prompts.

## Out of Scope

- Designer should not own implementation.
- Designer should not request secrets or local repo access.
