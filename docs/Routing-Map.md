---
title: Routing Map
tags: [routing, nextjs]
---

# Routing Map

Part of [[00-Home]]. See [[Architecture]] for the folder layout and [[Server-vs-Client-Components]] for the
rendering column.

All 13 URLs from the Lovable `react-router` setup are preserved exactly.

| URL | Route file (`src/app/…`) | View (`src/views/…`) | View type | Rendering |
| --- | --- | --- | --- | --- |
| `/` | `page.tsx` | `HomePage` | client | static |
| `/services/[eventType]` | `services/[eventType]/page.tsx` | `ServicesPage` | **server** | SSG for `wedding`, `birthday`, `corporate`, `other`; any other slug renders on demand with the generic "Event" label (as before) |
| `/venues` | `venues/page.tsx` | `VenuesPage` | client | static |
| `/vendors` | `vendors/page.tsx` | `VendorsPage` | **server** | static |
| `/planner-setup/[eventType]` | `planner-setup/[eventType]/page.tsx` | `PlannerSetupPage` | client | SSG for the four known types, others on demand |
| `/dashboard` | `dashboard/page.tsx` | `DashboardPage` | client | static |
| `/moodboard` | `moodboard/page.tsx` | `MoodboardPage` | client | static |
| `/budget` | `budget/page.tsx` | `BudgetPage` | client | static |
| `/guests` | `guests/page.tsx` | `GuestsPage` | client | static |
| `/tasks` | `tasks/page.tsx` | `TasksPage` | client | static |
| `/book` | `book/page.tsx` | `BookForMePage` | **server** | static |
| `/manage-venue` | `manage-venue/page.tsx` | `ManageVenuePage` | **server** | static |
| `/venue-registration` | `venue-registration/page.tsx` | `VenueRegistrationPage` | client | static |
| `*` (anything else) | `not-found.tsx` | — | client | returns HTTP **404** |

## Behaviour that moved from react-router to Next

| react-router (Lovable) | Next.js 16 |
| --- | --- |
| `<BrowserRouter><Routes>…` in `App.tsx` | file-system routing under `src/app` |
| `useNavigate()` + `navigate("/x")` on a `<button>` | `<Link href="/x">` for plain navigation (crawlable, prefetched); `useRouter().push` where navigation follows logic (planner wizard, form submit) |
| `navigate(-1)` | `router.back()` |
| `useLocation().pathname` | `usePathname()` |
| `useParams()` | async `params` prop on the page, passed to the view as `eventType` |
| `<Route path="*">` | `not-found.tsx` |

## Page titles

The old `index.html` had one title ("Lovable App") for every URL. The root layout now sets
`title.template = "%s | EventPlan"` and each route adds its own name (`Budget | EventPlan`, …); the home
page uses `EventPlan`. Descriptions and Open Graph basics live in `src/app/layout.tsx`. Canonical URLs, sitemap
and OG images are PRD phase F7 — see [[PRD-Alignment]].

## Shared navigation

- `BottomNav` (`components/BottomNav.tsx`) — six tabs, active state from `usePathname()`.
- `TopBar` (`components/TopBar.tsx`) — drawer menu + optional back link (`backTo` / `backLabel`).

Related: [[Design-System]], [[Vite-to-Next-Migration]].
