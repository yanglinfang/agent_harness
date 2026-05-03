# Release

Use this skill when preparing a demo, tag, or release branch.

## Checklist

- `pnpm typecheck`
- `pnpm build`
- Browser smoke test at `http://127.0.0.1:5173/`
- Runtime health check at `http://127.0.0.1:8787/health`
- Confirm `.env` and `.env.local` are ignored.
- Summarize product-visible changes and remaining risks.
