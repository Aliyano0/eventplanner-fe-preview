---
title: Architecture
tags: [architecture, nextjs, frontend]
---

# Architecture

Part of [[00-Home]]. Next: [[Routing-Map]], [[Server-vs-Client-Components]].

## Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3.8**, App Router, Turbopack | PRD baseline is 16.3 — see [[PRD-Alignment]] |
| UI runtime | React 19.2 | required by Next 16 |
| Language | TypeScript 5, `strict: true` | the Lovable project had `strict: false` |
| Styling | **Tailwind CSS v4** + `tailwindcss-animate` | v3-parity layer: [[Tailwind-v4-Compatibility]] |
| Components | shadcn/ui (Radix primitives) | [[Design-System]] |
| Icons | `lucide-react` (pinned `0.462.0`) | pinned for pixel parity, see [[Follow-ups]] |
| Toasts | `sonner` + Radix toast | mounted once in `Providers` |
| Lint | ESLint 9 + `eslint-config-next` (core-web-vitals + typescript) | |
| Tests | Vitest + Testing Library (jsdom) | |

## Folder layout

```
Frontend/
├─ AGENTS.md, CLAUDE.md        agent rules (Next 16 ships its docs in node_modules/next/dist/docs)
├─ docs/                       this vault
├─ public/                     static files (robots.txt, placeholder.svg)
├─ next.config.ts, postcss.config.mjs, eslint.config.mjs, tsconfig.json, vitest.config.mts
└─ src/
   ├─ app/                     routing layer ONLY: layouts, metadata, thin page.tsx files
   │  ├─ layout.tsx            root layout (server) + metadata title template
   │  ├─ providers.tsx         client providers: Tooltip, Toaster, Sonner
   │  ├─ globals.css           Tailwind v4 entry, design tokens, v3-compat layer
   │  ├─ not-found.tsx         404 (client, logs the missing path like the old app)
   │  ├─ favicon.ico
   │  └─ <route>/page.tsx      one per URL, see [[Routing-Map]]
   ├─ views/                   the screens (formerly src/pages in the Lovable project)
   ├─ components/              TopBar, BottomNav + ui/ (shadcn kit)
   ├─ hooks/                   use-local-storage, use-mobile, use-toast
   ├─ lib/                     data (sample data), format, utils (cn)
   ├─ assets/                  hero-event.jpg (imported through next/image)
   └─ test/                    vitest setup
```

### Why `src/views` and not `src/pages`

In a Next.js project that has a `src/` folder, `src/pages` is treated as the **legacy Pages Router**.
The Lovable project kept its screens in `src/pages`, so leaving them there would have created
accidental routes like `/BudgetPage`. They live in `src/views` instead; `src/app/**/page.tsx` files
import them. This also keeps `app/` free of UI code, so route files stay small and can export
`metadata`.

## Request lifecycle

1. Next matches the URL to `src/app/<route>/page.tsx` ([[Routing-Map]]).
2. The page (a Server Component) exports `metadata`, awaits `params` where needed, and renders a view.
3. Views that need state are Client Components (`"use client"`); they are server-rendered to HTML first
   and then hydrated. Static views (Services, Vendors, Book, Manage Venue) ship no page-level state JS.
4. Browser-only data (`localStorage`) is read through [[State-and-Storage]] so the server HTML and the
   first client render always agree.

## Import alias

`@/*` → `src/*` (same alias the Lovable project used, so no import paths changed).
