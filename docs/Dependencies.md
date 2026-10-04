---
title: Dependencies
tags: [dependencies, packages]
---

# Dependencies

Part of [[00-Home]]. Related: [[Vite-to-Next-Migration]], [[Tailwind-v4-Compatibility]].

## Core

| Package | Version | Role |
| --- | --- | --- |
| `next` | 16.3.8 | framework (PRD baseline 16.3) |
| `react`, `react-dom` | 19.2.8 | pinned to what `create-next-app@16.3.8` generates |
| `typescript` | ^5 | `strict: true` |
| `tailwindcss`, `@tailwindcss/postcss` | ^4.3.3 | styling, see [[Tailwind-v4-Compatibility]] |
| `tailwindcss-animate` | ^1.0.7 | Radix open/close animations (`animate-in`, `fade-in-0`, …) |
| `tailwind-merge` | ^3.7 | needs v3 for Tailwind v4 class names |

## Kept as-is from the original project

Radix UI primitives (`@radix-ui/react-*`), `class-variance-authority`, `clsx`, `cmdk`, `date-fns@3`,
`embla-carousel-react`, `input-otp`, `react-hook-form`, `@hookform/resolvers`, `react-resizable-panels@2`,
`recharts@2`, `sonner@1`, `zod@3`, and `lucide-react` (**exactly `0.462.0`**: later versions redraw some icons, and
pixel parity was a requirement).

## Changed because React 19 / Next 16 / Tailwind v4 require it

| Package | From → To | Why |
| --- | --- | --- |
| `react`, `react-dom` | 18.3 → 19.2 | Next 16 App Router |
| `next-themes` | 0.3 → 0.4.6 | React 19 support (used by `sonner.tsx`) |
| `react-day-picker` | 8.10 → 9.14 | v8 doesn't support React 19; `components/ui/calendar.tsx` was ported to the v9 API |
| `vaul` | 0.9 → 1.1 | React 19 support (`drawer.tsx`) |
| `tailwindcss` | 3.4 → 4.3 | PRD baseline |
| `tailwind-merge` | 2.6 → 3.7 | Tailwind v4 class names |

## Removed

| Package | Reason |
| --- | --- |
| `vite`, `@vitejs/plugin-react-swc`, the editor tagger plugin | replaced by Next.js / Turbopack; the tagger was a dev-only editor plugin |
| `react-router-dom` | replaced by the App Router (`NavLink.tsx` was an unused wrapper and was deleted) |
| `@tanstack/react-query` | was mounted in `App.tsx` but never used; PRD routes reads through Server Components and a generated API client |
| `autoprefixer` | built into the v4 PostCSS plugin |
| `@playwright/test`, `playwright*.ts` | the config imported a package that was never installed, so e2e could not run; PRD §20.3 e2e is a later task |
| `@eslint/js`, `globals`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | `eslint-config-next` bundles the equivalents |
| `@tailwindcss/typography` | installed but never enabled |

## Added

`@testing-library/react` (React 19-compatible), `@types/react@19`, `@types/react-dom@19`, `eslint-config-next`.

## Candidates from the PRD, intentionally not added yet

Zustand, Motion, NextAuth/Auth.js, a generated typed API client — nothing in the current screens needs them;
they arrive with their PRD phases. See [[PRD-Alignment]].

## Install notes

- Node ≥ 20.9 is required by Next 16; this machine runs Node 24 inside WSL — see [[Dev-Guide]].
- **Security audit:** `npm audit --omit=dev` (what ships to users) reports **0 vulnerabilities**. The full tree
  reports 7, all in development tooling: the `eslint-config-next` → `fast-glob` → `micromatch` → `braces` chain
  (also present in a fresh `create-next-app`; npm's suggested "fix" is a downgrade to Next 14, so it is ignored)
  and Vitest's `@vitest/mocker` (a dev-server path-traversal advisory whose fix is Vitest 5, a major upgrade).
  Neither runs in production. Upgrading Vitest is listed in [[Follow-ups]].
- npm 11 may print an `allow-scripts` notice for `esbuild` / `unrs-resolver` install scripts; `next dev`,
  `next build`, `eslint` and `vitest` all work without approving them.
