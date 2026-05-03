# Persistence Module

This module will own local durable state.

## Responsibilities

- Trace event storage.
- Memory index metadata.
- Workspace and run metadata.
- Future SQLite migrations.

## Rules

- Keep event records append-only where possible.
- Never persist raw secrets.
- Prefer schemas that can be shared across TS, Python, and Rust.
