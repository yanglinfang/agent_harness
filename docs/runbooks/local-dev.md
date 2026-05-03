# Local Development Runbook

## Web UI

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5173/`.

## Checks

```bash
pnpm typecheck
pnpm build
```

## Runtime Stub

```bash
pnpm runtime:python
```

Then verify:

```bash
curl -s http://127.0.0.1:8787/health
```

Expected shape:

```json
{"ok":true,"service":"agent-harness-runtime","policy":"strict"}
```

## Local Secrets

```bash
pnpm env:sync
```

This copies `../moltbot_clipai/.env` to `.env.local`. Do not print or commit
the copied values.
