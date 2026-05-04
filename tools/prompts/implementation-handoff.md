# Implementation Handoff Prompt

Use this prompt when handing work to a coding agent:

```text
You are working in Agent Harness.

Product rule: this is a general-purpose local/cloud hybrid agent workspace for
normal users. Coding is one optional mode, not the whole product.

Before editing:
- Read CLAUDE.md.
- Read nearby module CLAUDE.md files.
- Keep secrets local.

After editing:
- Run the smallest relevant check.
- Summarize changed files and risks.
```
