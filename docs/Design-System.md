---
title: Design System
tags: [design-system, shadcn, tokens]
---

# Design System

Part of [[00-Home]]. Related: [[Tailwind-v4-Compatibility]], [[Server-vs-Client-Components]].

## Tokens

All design tokens are CSS variables in `src/app/globals.css` (`:root`), as **HSL channel triplets**
(`--primary: 330 25% 45%`). The `@theme` block maps them to Tailwind colour names with
`--color-primary: hsl(var(--primary))`, so utilities like `bg-primary`, `text-muted-foreground`,
`border-warning/30` all work, including opacity modifiers.

| Group | Tokens |
| --- | --- |
| Surface | `background`, `foreground`, `card`, `popover`, `muted`, `secondary`, `accent` (+ `-foreground`) |
| Brand / state | `primary`, `destructive`, `success`, `warning` (+ `-foreground`) |
| Form | `border`, `input`, `ring` |
| Shape | `--radius: 0.75rem` → `rounded-lg` = radius, `rounded-md` = radius−2px, `rounded-sm` = radius−4px |
| Sidebar | `sidebar-*` family (used by `components/ui/sidebar.tsx`) |

The palette is a warm neutral background with a dusty-rose primary (`330 25% 45%`). Values are unchanged from
the original project. Dark mode: the `dark` variant is wired (`@custom-variant dark`) but no `.dark` token set
is defined yet — the app is light-only, as before.

## Component kit (`src/components/ui`)

shadcn/ui components (style `default`, `rsc: true` in `components.json`), kept close
to upstream so they can be re-synced:

- Used by screens today: `button`, `input`, `label`, `textarea`, `select`, `checkbox`, `dialog`, `sheet`,
  `tabs`, `dropdown-menu`, `separator`, `sonner`, `toaster`, `tooltip`.
- Present but not yet used by any screen (kept for PRD F1 — "buttons, cards, dialogs, dropdowns, tabs,
  navigation"): accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, calendar, card,
  carousel, chart, collapsible, command, context-menu, drawer, form, hover-card, input-otp, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, sidebar, skeleton,
  slider, switch, table, toggle, toggle-group. (`toast` is used indirectly through `toaster`.)
- Files that use hooks/context start with `"use client"` — see [[Server-vs-Client-Components]].
- ESLint relaxes three React-Compiler-era rules for this folder only (`eslint.config.mjs`), because upstream
  patterns trip them.

## App components

| Component | Purpose |
| --- | --- |
| `layout/SiteHeader` | sticky header: phone = drawer button + page title; md+ = brand, nav links, Sign In / Sign Up (mock), "List your venue" from lg |
| `layout/AuthButtons` | mock Sign In / Sign Up buttons (header + drawer) |
| `layout/SiteFooter` | brand, link columns (plan an event, explore, venue owners, company/legal), copyright |
| `legal/LegalDocumentView` | shared layout for policy pages (title, table of contents, numbered sections) — [[Legal-Pages]] |
| `layout/PlannerNav` | planner tab bar (md and up) |
| `layout/BottomNav` | fixed 6-tab nav on phones: Home(Dashboard), Moodboard, Budget, Guests, Tasks, Book for Me |
| `layout/Container` | centered column with the app's gutters; sizes `narrow` / `form` / `medium` / `default` / `wide` |
| `layout/BackLink` | "← Back to …" link used on inner pages |

Full description of the shell and the per-page layouts: [[Layout-and-Responsive-Design]].

## Brand assets

| Asset | Where | Notes |
| --- | --- | --- |
| Site icon (favicon) | `src/app/icon.svg` | the header's `Sparkles` mark in white on the primary colour (`#8f5673` = `330 25% 45%`); Next.js links it automatically. **Placeholder** until the client supplies a final logo — replace the file (or add `favicon.ico` / `apple-icon.png` beside it) |
| Hero photo | `src/assets/hero-event.jpg` | stock photo used by the Home page |
| Wordmark | text "EventPlan" (`BRAND_NAME` in `nav-config.ts`) beside the `Sparkles` icon in the header and footer | no logo file yet |

The project carries no third-party platform branding: the original template's favicon and `placeholder.svg` were removed.

## Responsiveness

Screens are mobile-first: the phone layout is the base and `sm:` / `md:` / `lg:` utilities add columns and wider
containers. Widths and gutters come from `Container`, the chrome (header, footer, planner tabs, bottom nav) from the
route-group layouts. Breakpoints, per-page layouts and the rules for new pages are in
[[Layout-and-Responsive-Design]]; how it was checked is in [[Verification-Report]].
