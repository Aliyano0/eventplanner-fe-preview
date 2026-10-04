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
| Language | TypeScript 5, `strict: true` | the original project had `strict: false` |
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
├─ public/                     static files (robots.txt)
├─ next.config.ts, postcss.config.mjs, eslint.config.mjs, tsconfig.json, vitest.config.mts
└─ src/
   ├─ app/                     routing layer ONLY: layouts, metadata, thin page.tsx files
   │  ├─ layout.tsx            root layout (server): html/body, providers, SiteHeader, BottomNav, metadata template
   │  ├─ providers.tsx         client providers: Tooltip, Toaster, Sonner
   │  ├─ globals.css           Tailwind v4 entry, design tokens, v3-compat layer
   │  ├─ not-found.tsx         404 (header from root layout + footer)
   │  ├─ icon.svg              site icon (favicon), see [[Design-System]]
   │  ├─ (site)/               public pages group: layout = <main> + SiteFooter
   │  └─ (planner)/            "My Planner" group: layout = PlannerNav (lg+) + <main> + SiteFooter
   │     └─ <route>/page.tsx   one per URL, see [[Routing-Map]]
   ├─ views/                   the screens (formerly src/pages in the original project)
   ├─ components/
   │  ├─ layout/               app shell: SiteHeader, SiteFooter, PlannerNav, BottomNav, NavDrawer (menu drawer + open state), AuthButtons, Container, BackLink, nav-config
   │  ├─ legal/                LegalDocumentView (shared policy-page layout), RichText
   │  └─ ui/                   shadcn kit
   ├─ content/                 long-form copy as data: about.ts, legal/{terms,cookie-policy}.ts — see [[Legal-Pages]]
   ├─ hooks/                   use-local-storage, use-mobile, use-toast
   ├─ lib/                     data (sample data), format, utils (cn)
   ├─ assets/                  hero-event.jpg (imported through next/image)
   └─ test/                    vitest setup
```

### Why `src/views` and not `src/pages`

In a Next.js project that has a `src/` folder, `src/pages` is treated as the **legacy Pages Router**.
The original project kept its screens in `src/pages`, so leaving them there would have created
accidental routes like `/BudgetPage`. They live in `src/views` instead; `src/app/**/page.tsx` files
import them. This also keeps `app/` free of UI code, so route files stay small and can export
`metadata`.

## App shell

Every page sits in the same shell — header on top, footer at the bottom — assembled by layouts rather than by
each page. Details, breakpoints and per-page layouts: [[Layout-and-Responsive-Design]].

```
RootLayout            <body class="flex min-h-screen flex-col">
 ├─ Providers           includes NavDrawerProvider: the menu drawer (slides in from the right) + its open state
 ├─ SiteHeader          sticky, all pages (menu button only where there is no bottom nav)
 ├─ (site) layout   or   (planner) layout
 │    ├─ [PlannerNav]     lg+ only, planner pages
 │    ├─ <main flex-1>    the page (a view inside Container)
 │    └─ SiteFooter
 └─ BottomNav           below lg only; sticky, last element; tabs per route (bottomNavFor) + menu button in the right corner
```

## Request lifecycle

1. Next matches the URL to `src/app/<route>/page.tsx` ([[Routing-Map]]).
2. The page (a Server Component) exports `metadata`, awaits `params` where needed, and renders a view.
3. Views that need state are Client Components (`"use client"`); they are server-rendered to HTML first
   and then hydrated. Static views (Services, Vendors, Book, Manage Venue) ship no page-level state JS.
4. Browser-only data (`localStorage`) is read through [[State-and-Storage]] so the server HTML and the
   first client render always agree.

## Import alias

`@/*` → `src/*` (same alias the original project used, so no import paths changed).
