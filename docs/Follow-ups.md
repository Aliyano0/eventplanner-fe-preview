---
title: Follow-ups and Open Decisions
tags: [todo, decisions]
---

# Follow-ups and Open Decisions

Part of [[00-Home]]. Anything here either needs your approval (it would change what users see) or is a
deliberate "not now". Context: [[Vite-to-Next-Migration]], [[Verification-Report]].

## Needs a decision (changes visible behaviour)

1. ~~Budget "edit total" overflows on a 375px phone~~ — **fixed** in the responsive layout work (`min-w-0` on the
   input; the Guests filter chips and the Dashboard countdown badge were fixed the same way). See
   [[Layout-and-Responsive-Design]].
2. **Touch hover behaviour.** Tailwind v4 applies `hover:` only on hover-capable devices, so a tapped button no
   longer keeps its hover colour. That is the better behaviour and is *not* reverted. For strict v3 parity add
   `@custom-variant hover (&:hover);` to `globals.css` ([[Tailwind-v4-Compatibility]]).
3. **Locale / timezone normalisation** (numbers `en-US`, task dates in UTC — [[Vite-to-Next-Migration]] #4, #5).
   Confirm you are happy with these; both were needed for server rendering.

## Header / footer follow-ups ([[Layout-and-Responsive-Design]])

- ~~About, Terms and Cookie Policy pages~~ — **built** from the client PDF and linked in the footer, verified word for
  word: [[Legal-Pages]]. Still open there: legal sign-off by the client, an effective date, a way to contact the company,
  and the three further policy texts in the same PDF (Vendor Guidelines, Review Guidelines, Marketplace Rules — the Terms
  refer to the Review Guidelines).
- **Cookie consent banner / Cookie Settings tool.** The Cookie Policy describes them (accept all, reject non-essential,
  manage preferences) but they don't exist; build them (and make sure no non-essential cookies load before consent) before
  publishing the policy.
- **Contact details / social links.** None appear in the client documents, so the footer has none. Send them when
  available.
- **Sign In / Sign Up buttons** are mocks (they show "coming soon"). Real authentication needs NextAuth + the backend auth
  endpoints (PRD F3); replace the handler in `components/layout/AuthButtons.tsx`. The welcome dialog on Home is a separate
  local prototype and could be wired to the same flow.
- **Active-link rules** in `nav-config.ts` treat `/services/*` as "Home" and the setup wizard as "My Planner"; adjust if
  the client's Figma navigation differs.
- **Figma.** The client's Figma is the visual source of truth (PRD §2) but was not available; the header, footer and
  desktop layouts follow the existing design language. Re-check against Figma when it is shared.
- Planner screens still show the same sample data on desktop; no new desktop-only content was invented.

## Known pre-existing issues (not introduced by the migration)

- **Accessibility:** Radix warns that some dialogs lack a `DialogTitle` (Budget category dialog)
  or `Description` (Guests/Tasks dialogs). The warnings are visible in the original app's console; Next's
  production build hides them but the markup is the same. Fix with `DialogTitle`/`SheetTitle` (visually hidden
  where the design has no heading).
- **Inert UI:** Vendors search and category tiles, Venues "More Filters" / "View Details", Moodboard upload and
  search, Book-for-Me service tiles, Profile/Settings drawer items do nothing — prototype only (PRD F2/F4).
- `ep_user` is stored by the sign-up dialog but never read.
- The venue registration terms say "10% commission", while the Home and Manage Venue pages say "15%". Content
  discrepancy from the original — worth confirming with the client.

## Technical debt / upgrades

- **Remove the v3-compat layer** in `globals.css` gradually as screens are rebuilt from Figma (PRD F1) — [[Tailwind-v4-Compatibility]].
- **`lucide-react`** is pinned to `0.462.0`; upgrading redraws some icons (check with the parity comparison first).
- **Vitest 3 → 5** clears the dev-only audit advisory — [[Dependencies]].
- `sonner@1`, `recharts@2`, `zod@3`, `date-fns@3`, `react-resizable-panels@2` have newer majors; none is needed now.
- Typed routes (`typedRoutes`) were not enabled; the navigation components use string paths from `nav-config.ts`.
- Remote images (`Moodboard`, `Venues`) are plain `<img>`; switch to `next/image` with `remotePatterns` once real
  media URLs and dimensions exist (PRD §13.6, F2).
- SEO (PRD F7): `metadataBase`, canonical URLs, sitemap, OG images, structured data.

## PRD stack items that arrive with their phase

Zustand (My Planner draft state), NextAuth/Auth.js (F3), Motion (animated flows), typed API client (needs backend) —
[[PRD-Alignment]], [[State-and-Storage]].

## Housekeeping

- **Nothing is committed yet.** The repository contains only the initial `LICENSE` commit (and `LICENSE` is
  deleted in the working tree); the whole original project was untracked. Suggest committing the migrated project as
  one baseline commit.
- **The original Vite source** was copied before any change to
  `C:\Users\H.H\AppData\Local\Temp\claude\C--eventplanner-marketplace-Frontend\fd493b1d-170c-41d3-8807-9cdb834a4d77\scratchpad\vite-original`
  (without `node_modules`). That is a temporary Claude session folder and may be cleaned up, so copy it somewhere
  permanent — or commit it to an `original-vite` branch — if you want to keep the client's original handy.
- The parity/behaviour test harness used for [[Verification-Report]] currently lives outside the repo. It can be
  added as an `e2e/` suite (Playwright) if you want it as a regression gate for future UI work.
- Keep this vault and `PROGRESS.md` (repo root) up to date with each feature, per the repo `CLAUDE.md`.
