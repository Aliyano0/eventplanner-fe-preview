---
title: Layout and Responsive Design
tags: [layout, responsive, header, footer, ux]
---

# Layout and Responsive Design

Part of [[00-Home]]. Related: [[Architecture]], [[Routing-Map]], [[Design-System]], [[Verification-Report]].

The original app was designed as a phone app: single narrow columns, a per-page top bar and a fixed bottom nav, no
site-wide header or footer. It now behaves like a responsive web app. **The phone layout keeps the client's design
language and structure**; tablets and desktops get a real header, wider containers, multi-column grids and a footer.

## Breakpoints

Tailwind defaults. The shell switches between "phone" and "web" at **`md` (768px)**.

| Name | Min width | Typical device | What changes |
| --- | --- | --- | --- |
| (base) | 0 | phones (320–639) | drawer header, bottom nav (planner), single column |
| `sm` | 640px | large phones / small tablets | wider gutters (24px), 2-column grids start (venues, vendors) |
| `md` | 768px | tablets | **web header + planner tab bar replace drawer + bottom nav**, 2-column pages |
| `lg` | 1024px | laptops | 3–4 column grids, side-by-side summaries, gutters 32px |
| `xl` / `2xl` | 1280 / 1536px | desktops | content stays centered at its max width |

## The app shell

```
┌ SiteHeader (sticky) ─────────────────────────────────────────────┐
│ phone:  ☰  Page title                              🔍            │
│ md+  :  ✦ EventPlan   Home  Venues  Vendors  My Planner   [Sign In] [Sign Up]  (lg+: [List your venue]) │
├ PlannerNav (md+, planner pages only, sticky) ───────────────────┤
│ Dashboard  Moodboard  Budget  Guests  Tasks  Book for Me         │
├ <main> ──────────────────────────────────────────────────────────┤
│ page content, inside a Container                                  │
├ SiteFooter ──────────────────────────────────────────────────────┤
│ brand · Plan an event · Explore · For venue owners · Company · © year │
└ BottomNav (phones, planner pages only, fixed) ───────────────────┘
```

| Component | File | Notes |
| --- | --- | --- |
| `SiteHeader` | `components/layout/SiteHeader.tsx` | client; phone = the original top-bar look (drawer + page title); md+ = brand, links with `aria-current`, Sign In / Sign Up (mock), "List your venue" from `lg` |
| Drawer | inside `SiteHeader` | Home, Venues, Vendors, Dashboard, New Event, List Your Venue, Profile\*, Settings\* (\* placeholders, as before), then Sign In / Sign Up buttons |
| `AuthButtons` | `components/layout/AuthButtons.tsx` | **mock** Sign In / Sign Up (inline in the header from `md`, stacked in the drawer); a click shows a "coming soon" message |
| `PlannerNav` | `components/layout/PlannerNav.tsx` | md+ tab bar for the six planner screens, sticky below the header |
| `BottomNav` | `components/layout/BottomNav.tsx` | phones only (`md:hidden`), unchanged markup |
| `SiteFooter` | `components/layout/SiteFooter.tsx` | server component; the planner layout adds bottom padding on phones so the fixed bottom nav never covers it |
| `Container` | `components/layout/Container.tsx` | the only place page width and gutters are defined |
| `BackLink` | `components/layout/BackLink.tsx` | "← Back to …" |
| `nav-config.ts` | `components/layout/nav-config.ts` | one list drives header, drawer, tabs, bottom nav and footer; also the phone page-title map |

Layouts decide the chrome (`app/layout.tsx`, `app/(site)/layout.tsx`, `app/(planner)/layout.tsx`); **pages never
render a header, footer or bottom nav themselves.**

### Container sizes

| Size | Max width | Used by |
| --- | --- | --- |
| `narrow` | 512px | wizard, Home tab switcher, Services (single column) |
| `form` | 768px | venue-registration form |
| `medium` | 896px | Home content, Manage Venue |
| `default` | 1152px | dashboards, lists and card grids |
| `wide` | 1280px | header and footer |

Gutters are 16px, then 24px from `sm`, then 32px from `lg`.

## Page layouts

Phone = single column as before (a few items now wrap or shrink instead of overflowing). "md" and "lg" are the
breakpoints where the layout changes.

| Page | Phone | md (≥768) | lg (≥1024) |
| --- | --- | --- | --- |
| Home — planning tab | event list | 2 × 2 grid, taller hero with larger type | same, hero 416px |
| Home — venue tab | stacked cards | *How it works* + *Pricing* side by side, terms full width, centered button | same |
| Services | stacked rows | 3 cards in a row (vertical cards) | same, max 1024px |
| Venues | 1 column (2 from `sm`) | 2 columns | 3 columns |
| Vendors | 2 columns (3 from `sm`) | 3 columns | 4 columns |
| Planner setup | wizard card | more space above | same (card stays narrow) |
| Dashboard | 2 × 2 stats | 2 × 2 stats | 4 stats in a row |
| Moodboard | 2-column masonry | 3 columns | 4 columns |
| Budget | summary card, stat cards, 1-column list | 2-column breakdown | summary card + stats side by side, 3-column breakdown |
| Guests | list | 2-column cards, search capped to 448px | 3-column cards |
| Tasks | active then completed | same | active and completed side by side |
| Book for Me | 3 tiles | larger tiles | tiles capped at 768px |
| Manage Venue | stacked | two columns + full-width terms | same |
| Venue registration | single-column form | card widens to 768px, two-column field groups | same |
| 404 | centered message | same | same |

## Conventions for new pages

1. A page = a view in `src/views` wrapped in `<Container>`; its root is `<div className="bg-background">` (no `min-h-screen`
   — the layout makes `<main>` fill the viewport so the footer sits at the bottom).
2. Exactly **one `<h1>`** per page (visual size comes from classes, so semantics and style are independent).
3. Mobile first: write the phone layout, then add `sm:` / `md:` / `lg:` utilities. Use `grid` + `gap-*`.
4. Planner screens go in `app/(planner)/`; everything else in `app/(site)/`.
5. Never hard-code a link list in a component — add it to `nav-config.ts`.
6. Don't add `pb-24` to clear the bottom nav; the planner layout handles it.
7. Verify at 320, 375, 768, 1024, 1280 (and 1536) — see the check below.

## What was verified

See [[Verification-Report]] for the original-vs-migrated comparison. For this layout work a separate responsive
check opens every route at 320 / 375 / 768 / 1024 / 1280 / 1536px and asserts: no horizontal overflow, header and
footer present, exactly one `<h1>`, the footer below the content, the right chrome for the width (drawer + bottom nav on
phones; header links + planner tabs from `md`), and no console errors. Results are recorded in
[[Verification-Report]].

## Decisions and notes

- **Footer content.** Only real links are shown. The client documentation contains no contact details (email, phone,
  social), so none are shown. The **COMPANY** column links the About, Terms & Conditions and Cookie Policy pages built from
  the client PDF — see [[Legal-Pages]].
- **Header actions.** *Sign In* and *Sign Up* are **UI mocks** (`AuthButtons`): authentication isn't built, so a click
  shows a "coming soon" message. They appear from `md`; the phone header stays compact and has them in the drawer.
  *List your venue* (→ `/manage-venue`) is shown from `lg`, so the header fits at 768px. The welcome dialog on Home is
  still a separate local prototype.
- **Search icon.** The phone header keeps the original inert search icon; it is hidden from `md` because it does nothing.
- **Fixes made while making pages responsive** (all pre-existing in the original app):
  - Budget "edit total" input overflowed a 375px screen → `min-w-0`.
  - Guests filter chips overflowed ≤ 380px → `flex-wrap`.
  - Dashboard "25 DAYS" badge rendered on one line (its `<br>` has no effect in a flex container) → stacked.
  - The drawer heading now uses `SheetTitle`/`SheetDescription`, which removes Radix's missing-title accessibility warning.
- **Tagline.** "Crafted with care for your special moments" moved from the bottom of the Home page into the footer.
