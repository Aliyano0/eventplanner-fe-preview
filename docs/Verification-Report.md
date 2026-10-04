---
title: Verification Report — Vite original vs Next.js 16
tags: [verification, qa, parity]
date: 2026-10-03
---

# Verification Report

Part of [[00-Home]]. Context: [[Vite-to-Next-Migration]], [[Tailwind-v4-Compatibility]]. Open items: [[Follow-ups]].

> **Scope note.** The original-vs-migrated comparison below describes the migration commit (`f62efa9`). The layouts were
> intentionally changed afterwards (header, footer, responsive grids), so that comparison no longer applies to today's
> screens. The checks for that later work are in [Responsive shell and layouts](#responsive-shell-and-layouts) at the
> end of this note.

**Requirement:** every page stays exactly as it was; no UI/UX breakage.
**Method:** run the *original* app and the *migrated* app side by side in the same headless Chromium and
compare them mechanically, rather than by eye.

## Result

| Check | Result |
| --- | --- |
| Structure + computed styles, 39 UI states × 2 viewports (**78 comparisons**) | ✅ **0 differences** |
| Pixel comparison of the 78 full-page screenshots | ✅ 73 identical; the other 5 explained below (none is a real difference) |
| Behaviour flows (real clicks, routing, `localStorage`, dialogs, toasts) | ✅ **20/20 pass on the migrated app, 20/20 on the original** |
| `next dev` console on 15 routes × 2 storage states (locale/timezone different from the server's) | ✅ 0 warnings, 0 hydration errors |
| `tsc --noEmit` (strict) · ESLint · Vitest · `next build` | ✅ clean · clean · 8/8 · 22 static pages |
| Clean checkout → `npm ci` from `package-lock.json` → all of the above | ✅ |

The numbers above come from a fresh copy of the project folder installed strictly from its lockfile, so they
describe what is on disk. Only `README.md` was edited afterwards.

## What was compared

- **Original:** the untouched original project, `vite build` + `vite preview`.
- **Migrated:** this project, `next build` + `next start`.
- **Viewports:** 375×812 (phone) and 1280×812 (desktop). Browser: headless Chromium (Playwright), `en-US`,
  timezone `Asia/Karachi`; remote Unsplash images are stubbed with a fixed PNG so layout can't vary with the network.
- **39 states** (each at both widths): every route and the 404; first visit vs returning visitor with saved
  data; welcome / sign-up / sign-in dialogs; "Set Your Budget" dialog; planner wizard steps 1–4; venue and guest
  filters; moodboard filter; budget edit mode, category dialog, add-expense form; guest add dialog, invite dialog,
  row menu; task add dialog, row menu, completed-list toggle; venue-registration form, open type select, amenity
  chips; top-bar drawer; "Manage My Venue" tab.
- **Structural snapshot:** for every element in DOM order — tag, own text, bounding box (±0.5px) and ~90 computed
  style properties (box model, flex/grid, typography, colours normalised to sRGB, shadows, radii, overflow,
  transform, opacity …). Any mismatch is reported.
- **Pixels:** `pixelmatch` (threshold 0.1) on full-page screenshots.
- **Behaviour:** 20 scripted flows run on both apps with real pointer/keyboard input: first visit, guest, sign-up,
  sign-in and Escape-dismiss; venue tab → registration; event → services → planner wizard → dashboard showing the saved
  budget/date/guests; wizard Back; unknown event slug; budget dialog save/dismiss; all six bottom-nav tabs and
  active state; drawer navigation; back links; filters; budget edit / add / edit / delete expense; guest add /
  search / filter / delete / invite; task add / complete / hide / date display; venue registration validation, toast,
  redirect and history Back; 404 and "Return to Home".

## The five screenshots that are not pixel-identical

| Screenshot | Pixels | Cause | Real difference? |
| --- | --- | --- | --- |
| `home-planning` @375, `home-venue-tab` @375 | 6 | hero photo is now served by the Next image optimizer (re-encoded JPEG) | no — sub-pixel colour noise on a photo |
| `dashboard-setup` @375 | 14 | anti-aliasing on the `$` icon's stem (v4 positions it with the `translate` property; same box) | no |
| `vr-select` @375 / @1280 | 4.3k / 4.6k | my full-page screenshot resizes the viewport, and Radix closes an open Select on resize; the original's dropdown had closed, the new one's had not | no — with a viewport-only screenshot and the dropdown open in both: **0 pixels differ** at both widths |

## Equivalent differences that the comparison allows

These appear in raw computed styles but not on screen, each justified by an identical bounding box:

| Allowed difference | Why it is equivalent |
| --- | --- |
| `<button>` → `<a>` for navigation (tag, `cursor`) | both are clickable with a pointer cursor; boxes and text are identical (classes `w-fit`/`text-center` added to match the old button sizing/alignment) |
| hero `<img>` positioned absolutely, `color: transparent` | `next/image` `fill`; the container and image box are identical |
| `rounded-full` as `calc(infinity * 1px)` instead of `9999px` | both fully round |
| `-translate-*` through the `translate` property (computed `transform: none`) | element boxes identical |
| gradient stops with explicit percentages; two extra transparent shadow layers; `outline-hidden` | same rendering |
| `margin-top` ↔ `margin-bottom` for `space-*` gaps | only skipped where the element box is identical |

## Defects the comparison caught (and fixed)

**Next.js conversion (Tailwind still v3 at that point)**

- Back links rendered as full-width blocks (old `<button class="flex">` shrink-wraps) → `w-fit`.
- Links no longer inherited the button's centred `text-align` → `text-center`.

**Tailwind v3 → v4** — the first v4 build showed **16,596** differences; each root cause was fixed and re-measured
(details in [[Tailwind-v4-Compatibility]]): default font stack, font-size/line-height pairing, `space-*` semantics
(label→input gap lost, dialog headers 6px short), palette colours, button cursor, placeholder colour, native
`<option>` padding, and the date input height (2px shorter). The upgrade tool also made one false-positive rename
(`variant: "outline"` → `"outline-solid"`), caught by the type-checker.

## Not covered — be aware

- **Hover, focus and active states** were not captured (only resting and opened states).
- **Chromium only.** Safari/WebKit and Firefox were not run (the date-input and native `<select>` fixes are
  Chromium-specific; v4 also raises the browser floor to Safari 16.4 / Chrome 111 / Firefox 128).
- **Two viewports** (375, 1280). Tablet widths and landscape phones were not captured, but all layouts are
  fluid/max-width based.
- **No real touch device** — the v4 `hover:` change on touch ([[Follow-ups]] #2) can't be observed in a desktop browser.
- The visual comparison ran with `en-US` + `Asia/Karachi`. The dev-mode console check used `en-GB` +
  `America/New_York` (to provoke any server/browser mismatch), but no pixel comparison was made in other locales or
  in timezones west of UTC — those are the two intentional deviations in [[Vite-to-Next-Migration]].
- The comparison tooling (Playwright, in WSL) is **not part of the repository**.

## Reproducing

The harness is a Playwright script that snapshots each scenario in both apps, a differ that reports mismatches
by cause, a pixel differ, and the 20-flow script. It lives outside the repo; see [[Follow-ups]] for the option to
add it as an `e2e/` suite. To re-run by hand: build both apps, serve them on two ports, run the snapshot script
against each, then diff.

---

## Responsive shell and layouts

Checks for the work described in [[Layout-and-Responsive-Design]] (site header, footer, planner tab bar, responsive
pages), run on a clean production build.

| Check | Result |
| --- | --- |
| **Responsive QA**: 15 routes × 6 widths (320, 375, 768, 1024, 1280, 1536) = 90 combinations. Each must have no horizontal overflow, a header and footer, exactly one `<h1>`, the footer below the content, the right chrome for the width (drawer + bottom nav below 768; header links + planner tabs from 768) and no console errors | ✅ **90/90** |
| **Behaviour flows** (real clicks): the 20 flows from the migration check, updated for the new chrome, plus 5 new ones — desktop header navigation and active state, desktop planner tabs, footer links, tablet 768, and the phone drawer / footer-not-covered-by-bottom-nav | ✅ **25/25** |
| **Phone layout vs the original app** (375px, all 39 states): every text-bearing element of the original must still exist with the same width, height and x position | ✅ 22/39 identical; the other 17 differ only by deliberate changes (below) |
| `next dev` console on 15 routes × 2 storage states (locale/timezone different from the server's) | ✅ 0 warnings, 0 hydration errors |
| `tsc --noEmit` (strict) · ESLint · Vitest · `next build` | ✅ clean · clean · 8/8 · 22 static pages |

### The 17 phone-layout differences (all intentional)

| States | What differs | Why |
| --- | --- | --- |
| Back links on Services, Venues, Vendors, Planner setup (9) | the link box is now `x=16` instead of a full-width `x=0` button with 16px inner padding | the 16px moved to the page container; the **text still starts at x=16** |
| Dashboard (2) | custom header gone; title now in the global header; "25 DAYS" badge stacked and moved into the title row | one header for the whole app |
| Guests (5, includes the above `Declined` chip) | the last filter chip wraps to a second line at 375px | the original row overflowed phones narrower than ~381px |
| Budget "edit total" (1) | bottom-nav items no longer stretch | the original page widened to 476px in edit mode (fixed with `min-w-0`) |

### Responsive findings fixed during the work

- Guests filter chips overflowed ≤ 380px (also in the original) → `flex-wrap`.
- Budget edit-mode input overflowed 375px (also in the original) → `min-w-0`.
- Dashboard countdown badge rendered `25DAYS` on one line (also in the original) → stacked.
- Planner footer was padded on phones so the fixed bottom nav never covered it (superseded: the bottom nav is now sticky in the page flow and needs no padding — see the last section).
- Stale route-type files left in `.next/dev` by an earlier dev run broke `tsc` after the routes moved into route groups
  (build artefact, not code; delete `.next` after moving routes).

### Not covered

- Screenshots were reviewed by eye for Home (phone + desktop, both tabs), Dashboard, Budget, Venues, Guests (768),
  Tasks, Services (1024), Planner setup and Venue registration. The remaining page/width combinations were checked
  by the automated assertions above, not visually.
- Hover, focus and active states; browsers other than Chromium; real touch devices.
- The 320px width is checked for overflow only; very small phones may still want copy tweaks.

---

## Legal pages and mock auth buttons

Checks for [[Legal-Pages]] and the Sign In / Sign Up buttons, run on a clean production build.

| Check | Result |
| --- | --- |
| **Text fidelity**: the rendered pages compared word for word with the text extracted from the client PDF (About, Terms, Cookie Policy) | ✅ 274 / 769 / 332 words — all identical |
| **Responsive QA**: now 18 routes × 6 widths (320–1536) = 108 combinations (no overflow, header + footer, one `<h1>`, right chrome for the width, no console errors) | ✅ **108/108** |
| **Behaviour flows**: the 25 earlier flows + 6 new — footer links open the three pages with the right headings/section counts; the Terms contents link jumps to its section; the phone contents disclosure; mock Sign In/Up on desktop, on a 768px tablet (no overflow, "List your venue" hidden below `lg`) and in the phone drawer | ✅ **31/31** |
| `next dev` console on 18 routes × 2 storage states (locale/timezone different from the server's) | ✅ 0 warnings, 0 hydration errors |
| `tsc --noEmit` · ESLint · Vitest · `next build` | ✅ clean · clean · 18/18 (adds legal-content structure + `RichText` tests) · 25 static pages |

Viewed by eye: Terms at 1280px and 375px, About at 768px (which also shows the header at its tightest width: brand, four
links, Sign In and Sign Up).

Not covered: the PDF check proves the *text* matches, not that the text is legally sufficient (see [[Legal-Pages]]);
hover/focus states; browsers other than Chromium; real devices. The earlier original-vs-migrated comparison was not
re-run (the layouts have intentionally changed since).

---

## App-style bottom nav on phones and tablets

Checks for the shell change described in [[Layout-and-Responsive-Design]]: the sticky bottom nav now appears on every page
below `lg` (1024px), tablets get a top bar with the logo, and the desktop header / planner tab row start at 1024px.
This **supersedes the breakpoint assumptions of the two earlier responsive sections** (they expected the desktop header
from 768px and a bottom nav on planner pages only). Run on a clean production build.

| Check | Result |
| --- | --- |
| **Responsive QA**: 18 routes × 7 widths (320, 375, 768, **1023**, 1024, 1280, 1536) = 126 combinations. Each: no horizontal overflow, header + footer, one `<h1>`, footer below content, correct chrome for the width (below 1024: menu button, bottom nav except on the setup wizard / venue form, logo + Sign In in the bar from 768; from 1024: header links, planner tab row, no bottom nav), the bottom nav **docked below the footer** at the end of the page, no console errors | ✅ **126/126** |
| **Behaviour flows**: the earlier flows (bottom-nav selectors and the tablet checks updated) + 5 new — site-wide bottom nav on a public page (tabs navigate, active tab follows, *My Planner* switches to the planner tabs); no bottom nav on the setup wizard and venue registration, site tabs on the 404; the nav stays pinned while scrolling and docks below the footer; tablet 768 top bar (logo → Home, Sign In, drawer without a duplicate auth block); the 1023 ↔ 1024 breakpoint | ✅ **36/36** |
| Unit tests for `bottomNavFor` (planner vs site vs hidden routes, active tab per route, `/budgeting` is not a planner route) | ✅ 21 new; Vitest **39/39** |
| `next dev` console on 18 routes × 2 storage states (locale/timezone different from the server's) | ✅ 0 warnings, 0 hydration errors |
| `tsc --noEmit` · ESLint · `next build` | ✅ clean · clean · 25 static pages |

Viewed by eye: Home, Dashboard (top and end of page), Venues and the setup wizard at 375px; Dashboard and Venues at 768px;
Dashboard at 1023px and 1024px; the 404 page at 375px.

Not covered: real touch devices and phone browser toolbars (the sticky bar was checked in desktop Chromium at phone
sizes), landscape phones (≥ 768px wide, so they get the tablet bar — about 106px of chrome on a 390px-tall screen), and
browsers other than Chromium.
