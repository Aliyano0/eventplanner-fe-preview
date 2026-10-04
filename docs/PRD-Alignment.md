---
title: PRD Alignment (Frontend)
tags: [prd, planning, frontend]
---

# PRD Alignment (Frontend)

Part of [[00-Home]]. Source: `marketplace-client-docs-and-proposals/Mindverse_Technologies_Event_Marketplace_PRD_LATEST.md`
§2 (Frontend Planning), §14.2 (Server Actions policy), §16.2 (Frontend performance), §21 (SEO).
The backend has not been started, so only the frontend stack is considered here.

## Stack baseline (PRD §2.1)

| PRD requirement | Status | Notes |
| --- | --- | --- |
| Next.js 16.3 | ✅ 16.3.8 | App Router, Turbopack |
| TypeScript | ✅ strict | |
| TailwindCSS v4 | ✅ 4.3.x | with a documented v3-parity layer — [[Tailwind-v4-Compatibility]] |
| Lucide React | ✅ | pinned `0.462.0` for pixel parity |
| Zod | ⏳ installed (3.25) | no screen validates through it yet |
| Motion | ⏳ not added | no animated screen needs it yet (Radix + tailwindcss-animate cover today's UI) |
| Zustand | ⏳ not added | no shared client state yet — [[State-and-Storage]] |
| NextAuth / Auth.js | ⏳ not added | PRD F3; needs the backend auth endpoints |
| Server Components for reads, Server Actions for mutations | ◐ foundation | static screens are Server Components; there is no data to read/mutate until the API exists — [[Server-vs-Client-Components]] |
| Typed API client from shared Zod/OpenAPI contracts | ⏳ | blocked on backend |
| Vercel (`sin1`) deployment | ⏳ | nothing in the code prevents it |

## Phases

| Phase | Scope | Where this codebase stands |
| --- | --- | --- |
| F1 Application shell & design system | layouts, tokens, form components, dialogs, tabs, nav | **Shell done**: App Router layout, providers, token system, shadcn kit, responsive header / footer / bottom nav. Figma-driven implementation and loading/empty/error states not started |
| F2 Public marketplace discovery | catalogues, search, filters, profiles | Prototype screens exist (Venues, Vendors) with sample data; no real data, search or profiles |
| F3 Customer event creation & auth conversion | draft → auth prompt → resume | Prototype planner setup + a local-only welcome/sign-up dialog |
| F4 My Planner | budget, guests, tasks, calendar, shortlist | Prototype Budget / Guests / Tasks / Moodboard / Dashboard screens, in-memory only |
| F5–F6 | dashboards, reviews, premium | not started |
| F7 SEO, performance | metadata, sitemap, robots, canonical, OG, responsive images | **Started**: title template + per-route titles, `robots.txt` kept, hero via `next/image`. Sitemap, canonical URLs, OG images, structured data not done |

## Constraints from the PRD that shaped this migration

- *Client Figma is the visual source of truth* → no redesign; the migration preserves the original UI exactly.
- *Minimal unnecessary client JavaScript* (§16.2) → Server Components where possible; unused React Query removed.
- *Browsers never call Express directly* (§14.2) → no client-side API plumbing was added.
- *Semantic/crawlable public pages* (§21) → navigation uses real `<a href>` links.

Related: [[Vite-to-Next-Migration]], [[Follow-ups]].
