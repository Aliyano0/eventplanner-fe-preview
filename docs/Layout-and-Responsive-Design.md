---
title: Layout and Responsive Design
tags: [layout, responsive, header, footer, ux]
---

# Layout and Responsive Design

Part of [[00-Home]]. Related: [[Architecture]], [[Routing-Map]], [[Design-System]], [[Verification-Report]].

The original app was designed as a phone app: single narrow columns, a sticky top bar and a bottom nav on the planner
screens, no site-wide header or footer. It now behaves like a responsive web app. **Phones and tablets keep that
app-style shell** (sticky top bar + sticky bottom nav); laptops and desktops get a real header with navigation links, wider
containers, multi-column grids and a footer.

## Breakpoints

Tailwind defaults. The shell switches between the **app shell** (phones and tablets) and the **desktop shell** at
**`lg` (1024px)**. Page content has its own, earlier breakpoints (`sm`, `md`) for grids.

| Name | Min width | Typical device | Shell | What changes |
| --- | --- | --- | --- | --- |
| (base) | 0 | phones (320–639) | app | top bar = page title + search; bottom nav (tabs + ☰ menu in its right corner); single column |
| `sm` | 640px | large phones | app | wider gutters (24px), 2-column grids start (venues, vendors) |
| `md` | 768px | tablets | app | top bar = **logo** + Sign In / Sign Up; bottom nav is larger; 2-column pages |
| `lg` | 1024px | laptops, tablets in landscape | **desktop** | **header with nav links + planner tab bar replace the bottom nav and the menu**; 3–4 column grids, gutters 32px |
| `xl` / `2xl` | 1280 / 1536px | desktops | desktop | content stays centered at its max width |

Why `lg` and not `md`: at 768px the desktop header (logo, four links, Sign In, Sign Up) plus the planner tab row left
almost no room ("Book for Me" ended 24px from the edge), and tablets are touch devices where a bottom nav is easier to
reach. The switch is the `lg:` / `md:` classes in `SiteHeader`, `PlannerNav` and `BottomNav` (and the planner layout).

## The app shell

```
phones / tablets (< lg)                          laptops / desktops (≥ lg)
┌ SiteHeader (sticky) ───────────────────────┐   ┌ SiteHeader (sticky) ─────────────────────────────────┐
│ <md : Page title                     🔍    │   │ ✦ EventPlan  Home Venues Vendors My Planner          │
│ md  : ✦ EventPlan       [Sign In][Sign Up] │   │                [List your venue][Sign In][Sign Up]   │
├ <main> ────────────────────────────────────┤   ├ PlannerNav (planner pages only, sticky) ─────────────┤
│ page content, inside a Container           │   │ Dashboard Moodboard Budget Guests Tasks Book for Me  │
├ SiteFooter ────────────────────────────────┤   ├ <main> ──────────────────────────────────────────────┤
│ brand · links · © year                     │   │ page content, inside a Container                     │
├ BottomNav (sticky, last element) ──────────┤   ├ SiteFooter ──────────────────────────────────────────┘
│ tab · tab · tab · tab · tab   ☰ Menu       │   (no bottom nav, no menu button)
└────────────────────────────────────────────┘
```

| Component | File | Notes |
| --- | --- | --- |
| `SiteHeader` | `components/layout/SiteHeader.tsx` | client; phones = page title + search; tablets = logo + Sign In / Sign Up (mock); `lg+` = logo, links with `aria-current`, "List your venue", Sign In / Sign Up. Has a menu button (right end) **only on pages with no bottom nav** |
| `NavDrawer` | `components/layout/NavDrawer.tsx` | the menu drawer + its open state (`NavDrawerProvider` in `app/providers.tsx`, `useNavDrawer()`); slides in **from the right**; entries from `drawerNavFor(pathname)` (below); on phones also Sign In / Sign Up buttons (tablets have them in the bar) |
| `AuthButtons` | `components/layout/AuthButtons.tsx` | **mock** Sign In / Sign Up (inline in the header from `md`, stacked in the phone drawer); a click shows a "coming soon" message |
| `PlannerNav` | `components/layout/PlannerNav.tsx` | `lg+` tab bar for the six planner screens, sticky below the header |
| `BottomNav` | `components/layout/BottomNav.tsx` | `< lg`, rendered once from the root layout: the tabs from `bottomNavFor(pathname)` followed by the **menu button in the right corner** (below) |
| `SiteFooter` | `components/layout/SiteFooter.tsx` | server component |
| `Container` | `components/layout/Container.tsx` | the only place page width and gutters are defined |
| `BackLink` | `components/layout/BackLink.tsx` | "← Back to …" |
| `nav-config.ts` | `components/layout/nav-config.ts` | one list drives header, drawer, tabs, bottom nav and footer; also the phone page-title map and `bottomNavFor` |

Layouts decide the chrome (`app/layout.tsx`, `app/(site)/layout.tsx`, `app/(planner)/layout.tsx`); **pages never
render a header, footer or bottom nav themselves.**

### The bottom nav

`BottomNav` is the last element of the page and `position: sticky; bottom: 0`: it stays at the bottom of the screen
while the page scrolls and, at the end of a page, sits *below* the footer — it never covers content, so no spacer or
`pb-*` is needed. `bottomNavFor(pathname)` in `nav-config.ts` decides what it shows (unit-tested in
`nav-config.test.ts`):

The bar is always **tabs + ☰ Menu in the right corner** (the menu takes one slot, so each set has one tab fewer than
before; the dropped tab is in the menu, so nothing became unreachable):

| Where | Tabs (then ☰ Menu) | Moved into the menu |
| --- | --- | --- |
| Planner screens (`/dashboard`, `/moodboard`, `/budget`, `/guests`, `/tasks`, `/book`) | Home (Dashboard) · Budget · Guests · Tasks · Book for Me | Moodboard |
| Every other page (Home, Services, Venues, Vendors, Manage Venue, legal pages, 404) | Home · Venues · Vendors · My Planner | List Venue (it is "List Your Venue" in the menu) |
| `/planner-setup/*`, `/venue-registration` | none — the ☰ button is at the right end of the **top bar** instead | — |

Which tab was dropped is one flag: `inBottomNav: false` on a `plannerTabs` entry, or leaving an item out of `mainNav`.
The desktop planner tab row still shows all six.

### The menu drawer

`NavDrawer` opens from the menu button (bottom nav, or the top bar on the pages without one) and slides in **from the
right**, matching the button's corner. **It never repeats a link that the bottom nav shows on the same page:**
`drawerNavFor(pathname)` takes every destination and removes the bottom-nav tabs of that page, so demoted tabs and
everything else land here automatically.

| Where | Menu entries |
| --- | --- |
| Site pages | New Event · List Your Venue · Profile\* · Settings\* |
| Planner screens | Moodboard · **EventPlan Home** (`/`, named so because the bottom nav's "Home" is the dashboard) · Venues · Vendors · New Event · List Your Venue · Profile\* · Settings\* |
| Setup wizard, venue form (no bottom nav) | Home · Venues · Vendors · Dashboard · New Event · List Your Venue · Profile\* · Settings\* |

(\* placeholders without a route yet, as in the original; they just close the drawer.) `nav-config.test.ts` asserts the
no-repeat rule for every route kind, and that every destination stays reachable from the bottom nav or the menu.

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
6. Don't add `pb-24` to clear the bottom nav; it is in the page flow (sticky) and never overlaps content. A new route
   that should have no bottom nav (a focused flow) is added to `BOTTOM_NAV_HIDDEN_PATHS` in `nav-config.ts`.
7. Verify at 320, 375, 768, 1023, 1024, 1280 (and 1536) — see the check below.

## What was verified

See [[Verification-Report]] for the original-vs-migrated comparison. For this layout work a separate responsive
check opens every route at 320 / 375 / 768 / 1023 / 1024 / 1280 / 1536px and asserts: no horizontal overflow, header and
footer present, exactly one `<h1>`, the footer below the content, the right chrome for the width (app shell below
1024px: bottom nav with the menu button in its right corner — except on the setup wizard and venue form, where the menu button is in the top bar — and on tablets the logo and Sign In in the
bar; desktop shell from 1024px: header links, planner tab row, no bottom nav), the bottom nav docking below the footer
at the end of the page, and no console errors. Results are recorded in [[Verification-Report]].

## Decisions and notes

- **Footer content.** Only real links are shown. The client documentation contains no contact details (email, phone,
  social), so none are shown. The **COMPANY** column links the About, Terms & Conditions and Cookie Policy pages built from
  the client PDF — see [[Legal-Pages]].
- **Header actions.** *Sign In* and *Sign Up* are **UI mocks** (`AuthButtons`): authentication isn't built, so a click
  shows a "coming soon" message. They appear in the header from `md` (tablets and desktop); the phone header stays
  compact and has them in the menu drawer. *List your venue* (→ `/manage-venue`) is a desktop-header button (`lg+`); on
  phones and tablets it is the **List Your Venue** entry of the menu drawer. The welcome dialog on Home
  is still a separate local prototype.
- **Search icon.** The phone top bar keeps the original inert search icon; it is hidden from `md` because it does nothing.
- **Menu placement (decision).** The hamburger moved from the top-left of the original top bar to the bottom nav's right corner (thumb reach on phones and tablets), and the drawer slides in from the right to match. The original top-left button is gone except on pages without a bottom nav. Moodboard (planner) and List Venue (site) gave up their bottom-nav slot to the menu button; to swap which tab moves, flip `inBottomNav` / edit `mainNav` in `nav-config.ts`.
- **Tablet shell (decision).** Tablets (768–1023px) use the app shell, not the desktop header — see *Why `lg` and not
  `md`* above. If the client prefers the desktop header on tablets, change the `lg:` classes in `SiteHeader`,
  `PlannerNav` and `BottomNav` back to `md:`.
- **Fixes made while making pages responsive** (all pre-existing in the original app):
  - Budget "edit total" input overflowed a 375px screen → `min-w-0`.
  - Guests filter chips overflowed ≤ 380px → `flex-wrap`.
  - Dashboard "25 DAYS" badge rendered on one line (its `<br>` has no effect in a flex container) → stacked.
  - The drawer heading now uses `SheetTitle`/`SheetDescription`, which removes Radix's missing-title accessibility warning.
- **Tagline.** "Crafted with care for your special moments" moved from the bottom of the Home page into the footer.
