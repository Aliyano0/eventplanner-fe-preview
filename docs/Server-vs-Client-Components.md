---
title: Server vs Client Components
tags: [nextjs, rendering, performance]
---

# Server vs Client Components

Part of [[00-Home]]. Related: [[Routing-Map]], [[State-and-Storage]].

PRD §16.2 asks for *Server Components where useful* and *minimal unnecessary client JavaScript* (see
[[PRD-Alignment]]). The rule used here: **a file is a Client Component only if it needs state, effects,
event handlers that aren't plain navigation, or browser APIs.**

## What is a Server Component

| File | Why it can stay on the server |
| --- | --- |
| `app/layout.tsx` | static shell + metadata |
| `app/**/page.tsx` | read `params`, export `metadata`, render a view |
| `views/ServicesPage` | pure markup + `<Link>`s (was buttons with `navigate()`) |
| `views/VendorsPage` | static list (the search box and buttons are inert UI, as in the original) |
| `views/BookForMePage` | static markup |
| `views/ManageVenuePage` | static markup + a `Button asChild` wrapping a `<Link>` |
| `app/(site)/layout.tsx`, `app/(planner)/layout.tsx` | compose `<main>`, footer and the client nav components |
| `components/layout/SiteFooter`, `Container`, `BackLink`, `nav-config` | static markup and links |
| `components/legal/*`, `views/AboutPage`, `TermsPage`, `CookiePolicyPage` | static text rendered from `src/content` (the table of contents uses native `<details>` and anchors, no JS) |

## What is a Client Component (`"use client"`)

| File | Reason |
| --- | --- |
| `app/providers.tsx` | Radix `TooltipProvider`, toast/Sonner state |
| `app/not-found.tsx` | `usePathname()` to log the missing path |
| `components/layout/SiteHeader.tsx` | `usePathname()` for the title and active link, `useNavDrawer()` for the menu button shown on pages without a bottom nav |
| `components/layout/NavDrawer.tsx` | drawer open/close state (context provider) and the Radix sheet; `usePathname()` to pick the menu entries |
| `components/layout/AuthButtons.tsx` | click handlers (mock Sign In / Sign Up show a toast) |
| `components/layout/PlannerNav.tsx`, `components/layout/BottomNav.tsx` | `usePathname()` for the active tab; `BottomNav` also opens the drawer |
| `views/HomePage`, `DashboardPage`, `BudgetPage`, `GuestsPage`, `TasksPage`, `MoodboardPage`, `VenuesPage`, `PlannerSetupPage`, `VenueRegistrationPage` | `useState`, dialogs, forms, `localStorage` |
| shadcn files using hooks/context (`form`, `sidebar`, `carousel`, `chart`, `toaster`, `sonner`, `input-otp`, `toggle-group`, `calendar`, `use-toast`) | marked `"use client"` at the top |

Radix primitives already carry their own client boundary, so purely presentational shadcn wrappers
(`button`, `card`, `separator`, …) can be imported from either side.

## Rules of thumb for new code

1. Start as a Server Component. Add `"use client"` at the **lowest** component that needs it.
2. Pass data down as props (`ServicesPage eventType={…}`); don't re-read `params` in client code.
3. Never read `window` / `localStorage` during render — use [[State-and-Storage]].
4. `params` is a **Promise** in Next 16: `const { eventType } = await params` in the page file.
5. Plain navigation → `<Link>`. Navigation after logic → `useRouter().push`.

## Hydration safety

Every Client Component is rendered on the server too. Anything that differs between server and browser
causes a hydration mismatch, so these are normalised:

- **Browser storage** → `useStoredValue` returns `undefined` on the server and during hydration.
- **Number formatting** → `formatNumber` pins `en-US` (`lib/format.ts`); a bare `toLocaleString()` would use
  the server's locale on the server and the visitor's in the browser.
- **Dates** → task deadlines are `YYYY-MM-DD` strings (parsed as UTC), so they are formatted with
  `timeZone: "UTC"`; otherwise visitors west of UTC saw the previous day (see [[Follow-ups]]).
