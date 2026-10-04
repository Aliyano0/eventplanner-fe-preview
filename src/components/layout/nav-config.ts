import {
  Building2,
  CheckSquare,
  DollarSign,
  Home,
  Image,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Sparkles,
  Store,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { eventTypes } from "@/lib/data";

/**
 * Single source of truth for navigation: the desktop header, the mobile drawer, the planner tabs,
 * the bottom nav and the footer all read from here, so a route is added or renamed in one place.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Used by the bottom nav; the desktop header shows text only. */
  icon: LucideIcon;
  /** Returns true when the current pathname belongs to this item (drives the active style). */
  isActive: (pathname: string) => boolean;
}

/** Routes that make up the "My Planner" area (they share the planner tabs / bottom nav). */
export const PLANNER_PATHS = ["/dashboard", "/moodboard", "/budget", "/guests", "/tasks", "/book"] as const;

const startsWithPath = (pathname: string, base: string) => pathname === base || pathname.startsWith(`${base}/`);

export const isPlannerPath = (pathname: string) =>
  PLANNER_PATHS.some((path) => startsWithPath(pathname, path)) || startsWithPath(pathname, "/planner-setup");

/** Primary site navigation (desktop header, and the first four tabs of the site-wide bottom nav). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home, isActive: (p) => p === "/" || startsWithPath(p, "/services") },
  { label: "Venues", href: "/venues", icon: Building2, isActive: (p) => startsWithPath(p, "/venues") },
  { label: "Vendors", href: "/vendors", icon: Users, isActive: (p) => startsWithPath(p, "/vendors") },
  { label: "My Planner", href: "/dashboard", icon: LayoutDashboard, isActive: isPlannerPath },
];

export interface PlannerTab {
  href: string;
  /** Label on the desktop tab bar. */
  label: string;
  /** Shorter label on the phone bottom nav. */
  shortLabel: string;
  icon: LucideIcon;
  /**
   * Whether the phone / tablet bottom nav shows this tab. The bottom nav is the menu button plus five tabs, so a tab
   * that doesn't fit lives in the menu drawer instead (see `drawerNavFor`). The desktop tab bar shows all six.
   */
  inBottomNav: boolean;
}

/** Tabs of the planner area: bottom nav on phones and tablets (minus `inBottomNav: false`), tab bar from `lg` up. */
export const plannerTabs: PlannerTab[] = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: Home, inBottomNav: true },
  { href: "/moodboard", label: "Moodboard", shortLabel: "Moodboard", icon: Image, inBottomNav: false },
  { href: "/budget", label: "Budget", shortLabel: "Budget", icon: DollarSign, inBottomNav: true },
  { href: "/guests", label: "Guests", shortLabel: "Guests", icon: Users, inBottomNav: true },
  { href: "/tasks", label: "Tasks", shortLabel: "Tasks", icon: CheckSquare, inBottomNav: true },
  { href: "/book", label: "Book for Me", shortLabel: "Book for Me", icon: Sparkles, inBottomNav: true },
];

/** Multi-step flows that own the bottom of the screen with their own actions: no bottom nav there. */
const BOTTOM_NAV_HIDDEN_PATHS = ["/planner-setup", "/venue-registration"] as const;

export interface BottomTab {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export interface BottomNavConfig {
  /** `planner` on the planner screens, `site` everywhere else. */
  kind: "planner" | "site";
  /** Accessible name of the `<nav>`. */
  label: string;
  /** The tabs after the menu button (which is always first and is not part of this list). */
  tabs: BottomTab[];
}

/**
 * What the app-style bottom nav (phones and tablets) shows for a path, or `null` when it is hidden. The nav is always
 * "menu button + tabs":
 * - planner screens: five planner tabs (Home, Budget, Guests, Tasks, Book for Me — Moodboard is in the menu);
 * - every other page: four site tabs (Home, Venues, Vendors, My Planner — List Venue is in the menu);
 * - the planner setup wizard and venue registration form: none (the menu button moves to the top bar there).
 */
export function bottomNavFor(pathname: string): BottomNavConfig | null {
  if (BOTTOM_NAV_HIDDEN_PATHS.some((base) => startsWithPath(pathname, base))) return null;

  if (PLANNER_PATHS.some((base) => startsWithPath(pathname, base))) {
    return {
      kind: "planner",
      label: "My Planner",
      tabs: plannerTabs
        .filter((tab) => tab.inBottomNav)
        .map((tab) => ({ href: tab.href, label: tab.shortLabel, icon: tab.icon, active: pathname === tab.href })),
    };
  }

  return {
    kind: "site",
    label: "Main",
    tabs: mainNav.map((item) => ({
      href: item.href,
      label: item.label,
      icon: item.icon,
      active: item.isActive(pathname),
    })),
  };
}

export interface DrawerItem {
  label: string;
  /** `#…` entries are placeholders without a route yet: they only close the drawer. */
  path: string;
  icon: LucideIcon;
}

const drawerItems = {
  home: { label: "Home", icon: Home, path: "/" },
  venues: { label: "Venues", icon: Building2, path: "/venues" },
  vendors: { label: "Vendors", icon: Users, path: "/vendors" },
  dashboard: { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  newEvent: { label: "New Event", icon: PlusCircle, path: "/planner-setup/wedding" },
  listVenue: { label: "List Your Venue", icon: Store, path: "/manage-venue" },
  profile: { label: "Profile", icon: User, path: "#profile" },
  settings: { label: "Settings", icon: Settings, path: "#settings" },
} satisfies Record<string, DrawerItem>;

/**
 * Entries of the menu drawer for a path: every destination **except the ones that are already tabs of the bottom nav on
 * that page**, so the same link is never offered twice.
 * - site pages: New Event, List Your Venue, Profile, Settings;
 * - planner screens: the planner tab that didn't fit the bottom nav (Moodboard), then the way back out — the site home
 *   (named "EventPlan Home", since the bottom nav's "Home" tab is the dashboard here), Venues, Vendors — and the rest;
 * - the setup wizard and venue form (no bottom nav): everything.
 */
export function drawerNavFor(pathname: string): DrawerItem[] {
  const bottom = bottomNavFor(pathname);
  const inPlanner = bottom?.kind === "planner";

  const overflowedPlannerTabs: DrawerItem[] = inPlanner
    ? plannerTabs.filter((tab) => !tab.inBottomNav).map((tab) => ({ label: tab.label, icon: tab.icon, path: tab.href }))
    : [];

  const candidates: DrawerItem[] = [
    ...overflowedPlannerTabs,
    inPlanner ? { ...drawerItems.home, label: "EventPlan Home" } : drawerItems.home,
    drawerItems.venues,
    drawerItems.vendors,
    drawerItems.dashboard,
    drawerItems.newEvent,
    drawerItems.listVenue,
    drawerItems.profile,
    drawerItems.settings,
  ];

  const inBottomNav = new Set(bottom?.tabs.map((tab) => tab.href));
  return candidates.filter((item) => !inBottomNav.has(item.path));
}

/** Page title shown in the phone header (matches each route's `metadata.title`). */
const titles: [prefix: string, title: string][] = [
  ["/services", "Services"],
  ["/venues", "Venues"],
  ["/vendors", "Vendors"],
  ["/planner-setup", "Planner Setup"],
  ["/dashboard", "Dashboard"],
  ["/moodboard", "Moodboard"],
  ["/budget", "Budget"],
  ["/guests", "Guest List"],
  ["/tasks", "Tasks"],
  ["/book", "Book for Me"],
  ["/manage-venue", "Manage My Venue"],
  ["/venue-registration", "Venue Registration"],
  ["/about", "About"],
  ["/terms", "Terms & Conditions"],
  ["/cookie-policy", "Cookie Policy"],
];

export const BRAND_NAME = "EventPlan";

export const titleFor = (pathname: string) =>
  titles.find(([prefix]) => startsWithPath(pathname, prefix))?.[1] ?? BRAND_NAME;

/** Company and legal pages (footer). The text comes from the client's documentation, see `src/content`. */
export const companyLinks = [
  { label: "About EventPlan", href: "/about" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

/** "Plan an event" links in the footer, one per event type. */
export const eventLinks = eventTypes.map((event) => ({ label: event.name, href: `/services/${event.id}` }));
