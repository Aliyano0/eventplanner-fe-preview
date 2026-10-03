---
title: State and Storage
tags: [state, localStorage, hydration]
---

# State and Storage

Part of [[00-Home]]. Related: [[Server-vs-Client-Components]], [[PRD-Alignment]].

Everything is still **local-only** (no backend yet). Screens keep UI state in `useState`; a few values
persist in the browser's `localStorage` so the planner survives a reload.

## Keys

| Key | Written by | Read by | Meaning |
| --- | --- | --- | --- |
| `ep_visited` | `HomePage` (guest / sign-up / sign-in) | `HomePage` | the welcome dialog has been completed |
| `ep_user` | `HomePage` sign-up | — (not read yet) | `{ fullName, email, city }` |
| `eventplan_budget` | `PlannerSetupPage`, `DashboardPage`, `BudgetPage` | `DashboardPage`, `BudgetPage` | total budget, integer string |
| `eventplan_currency` | `PlannerSetupPage` | `DashboardPage` | `PKR` \| `USD` \| `GBP` |
| `eventplan_date` | `PlannerSetupPage` | `DashboardPage` | `YYYY-MM-DD` |
| `eventplan_guests` | `PlannerSetupPage` | `DashboardPage` | guest count, string |
| `eventplan_setup_complete` | `PlannerSetupPage` | `DashboardPage` | suppresses the "Set Your Budget" dialog |

Guests, tasks, expenses, venues etc. are in-memory sample data (`lib/data.ts` and inside each view) and reset
on reload, exactly as before.

## `useStoredValue` / `setStoredValue` (`src/hooks/use-local-storage.ts`)

```ts
const visited = useStoredValue("ep_visited"); // undefined → null → string
setStoredValue("ep_visited", "true");
```

| Return | Meaning |
| --- | --- |
| `undefined` | server render **and hydration** — storage isn't readable yet |
| `null` | key not set |
| `string` | stored value |

It is built on `useSyncExternalStore`, so:

- the server HTML and the first client render are identical (no hydration mismatch);
- the browser value takes over immediately after hydration;
- `setStoredValue` re-renders every subscriber in the tab, and the native `storage` event keeps other tabs in sync;
- blocked storage (strict privacy mode) degrades to "not set" instead of throwing.

Screens treat `undefined` as "don't show anything that depends on storage yet". That reproduces what the
Vite app did (it also rendered its first frame before reading storage), e.g. the welcome dialog only opens
once `visited === null`.

Unit tests: `src/hooks/use-local-storage.test.tsx` (including a server-render check).

## Why not Zustand yet

PRD §2.1 names Zustand for client/UI state. Nothing here needs a shared store yet — values are either
screen-local or one of the keys above. When My Planner is wired to the API (PRD F4) the per-event draft state is
the natural first Zustand store; see [[Follow-ups]].
