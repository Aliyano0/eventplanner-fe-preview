---
title: Developer Guide
tags: [dev, setup, commands]
---

# Developer Guide

Part of [[00-Home]]. See [[Architecture]] for the layout and [[Dependencies]] for what is installed.

## Requirements

- **Node.js ≥ 20.9** (Next 16). On this machine Node 24 / npm 11 live **inside WSL**; there is no Node on the
  Windows PATH. Run every `npm`/`npx` command from a WSL shell.
- Nothing else: no environment variables or backend are needed yet.

## Commands

```bash
cd /mnt/c/eventplanner-marketplace/Frontend

npm install            # or: npm ci   (exact versions from package-lock.json)
npm run dev            # http://localhost:3000  (Turbopack)
npm run build          # production build, type-checks as part of the build
npm run start          # serve the production build
npm run lint           # ESLint (eslint-config-next: core-web-vitals + typescript)
npm run typecheck      # next typegen && tsc --noEmit
npm test               # vitest (jsdom)
npm run test:watch
```

### Tips for WSL on a Windows drive

- Installing and building on `/mnt/c/...` works but is noticeably slower than the WSL filesystem. If it
  bothers you, keep a clone under `~/` and push/pull with git.
- `node_modules` contains **Linux** native binaries (SWC, Tailwind's oxide engine). Don't mix: install and run from
  WSL only. If you later use Windows-native Node, delete `node_modules` and reinstall there.

## What `next dev` creates

`.next/`, `next-env.d.ts`, and it (re)writes the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`.
All but `AGENTS.md` are git-ignored; commit `AGENTS.md` so the tree stays clean. Next 16 also ships its own docs at
`node_modules/next/dist/docs/` — read the relevant guide before using an API you don't recognise (that is what
`AGENTS.md` asks agents to do).

## Adding a screen

1. Create the view in `src/views/<Name>Page.tsx` (Server Component unless it needs state — [[Server-vs-Client-Components]]).
2. Add `src/app/<url>/page.tsx` exporting `metadata` and rendering the view (copy any existing route file).
3. Link to it with `<Link href>`; add it to [[Routing-Map]].
4. Use design tokens, `flex`/`grid` + `gap`, mobile-first classes ([[Design-System]]).
5. Keep it responsive at 375px and 1280px — see [[Verification-Report]] for how that is checked.

## Adding a shadcn component

`components.json` is configured for Tailwind v4 (`rsc: true`). Add components with the shadcn CLI, then run the
parity comparison if the component will replace an existing screen element. New components may use the v4
defaults; only legacy markup needs [[Tailwind-v4-Compatibility]].

## Checks before a PR

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

Update [[Routing-Map]] / [[State-and-Storage]] when routes or storage keys change, and `PROGRESS.md` at the
repo root for PRD progress.
