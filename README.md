# EventPlan — Frontend

Event-planning marketplace web app for the Pakistani market (customers plan events; venue owners list venues).

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (Radix) · Vitest

This project was migrated from a Lovable-generated React + Vite app to Next.js with every screen unchanged —
see [`docs/Vite-to-Next-Migration.md`](docs/Vite-to-Next-Migration.md).

## Quick start

Node ≥ 20.9 is required (on this machine it lives in WSL — run commands from a WSL shell).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server (Turbopack) |
| `npm run build` / `npm run start` | production build / serve it |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `next typegen && tsc --noEmit` |
| `npm test` | Vitest |

## Project layout

```
src/app/        routes (thin page.tsx files), layout, providers, globals.css
src/views/      the screens
src/components/ TopBar, BottomNav, ui/ (shadcn kit)
src/hooks/      use-local-storage, use-mobile, use-toast
src/lib/        sample data, formatting, utils
docs/           documentation vault (start at docs/00-Home.md)
```

## Documentation

All project documentation lives in [`docs/`](docs/00-Home.md) as an Obsidian-style vault:
[Architecture](docs/Architecture.md) · [Routing map](docs/Routing-Map.md) ·
[Dev guide](docs/Dev-Guide.md) · [Verification report](docs/Verification-Report.md) ·
[Follow-ups](docs/Follow-ups.md)

> Next.js 16 ships version-matched docs in `node_modules/next/dist/docs/`; see `AGENTS.md`.
