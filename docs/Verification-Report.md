---
title: Verification Report — Vite original vs Next.js 16
tags: [verification, qa, parity]
date: 2026-10-03
---

# Verification Report

Part of [[00-Home]]. Context: [[Vite-to-Next-Migration]], [[Tailwind-v4-Compatibility]]. Open items: [[Follow-ups]].

**Requirement:** every page stays exactly as it was; no UI/UX breakage.
**Method:** run the *original* Lovable app and the *migrated* app side by side in the same headless Chromium and
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

- **Original:** the untouched Lovable project, `vite build` + `vite preview`.
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
