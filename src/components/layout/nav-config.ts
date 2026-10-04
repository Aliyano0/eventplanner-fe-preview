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

export interface DrawerItem {
  label: string;
  /** `#…` entries are placeholders without a route yet: they only close the drawer. */
  path: string;
  icon: LucideIcon;
}

/** Entries of the mobile drawer. */
export const drawerNav: DrawerItem[] = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Venues", icon: Building2, path: "/venues" },
  { label: "Vendors", icon: Users, path: "/vendors" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "New Event", icon: PlusCircle, path: "/planner-setup/wedding" },
  { label: "List Your Venue", icon: Store, path: "/manage-venue" },
  { label: "Profile", icon: User, path: "#profile" },
  { label: "Settings", icon: Settings, path: "#settings" },
];

export interface PlannerTab {
  href: string;
  /** Label on the desktop tab bar. */
  label: string;
  /** Shorter label on the phone bottom nav. */
  shortLabel: string;
  icon: LucideIcon;
}

/** Tabs of the planner area: bottom nav on phones and tablets, tab bar from `lg` up. */
export const plannerTabs: PlannerTab[] = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: Home },
  { href: "/moodboard", label: "Moodboard", shortLabel: "Moodboard", icon: Image },
  { href: "/budget", label: "Budget", shortLabel: "Budget", icon: DollarSign },
  { href: "/guests", label: "Guests", shortLabel: "Guests", icon: Users },
  { href: "/tasks", label: "Tasks", shortLabel: "Tasks", icon: CheckSquare },
  { href: "/book", label: "Book for Me", shortLabel: "Book for Me", icon: Sparkles },
];

const listVenueNav: NavItem = {
  label: "List Venue",
  href: "/manage-venue",
  icon: Store,
  isActive: (p) => startsWithPath(p, "/manage-venue") || startsWithPath(p, "/venue-registration"),
};

/** Multi-step flows that own the bottom of the screen with their own actions: no bottom nav there. */
const BOTTOM_NAV_HIDDEN_PATHS = ["/planner-setup", "/venue-registration"] as const;

export interface BottomTab {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export interface BottomNavConfig {
  /** Accessible name of the `<nav>`. */
  label: string;
  tabs: BottomTab[];
}

/**
 * What the app-style bottom nav (phones and tablets) shows for a path, or `null` when it is hidden.
 * - planner screens: the six planner tabs (the original app's bottom nav);
 * - every other page: the site-wide tabs (Home, Venues, Vendors, My Planner, List Venue);
 * - the planner setup wizard and venue registration form: none.
 */
export function bottomNavFor(pathname: string): BottomNavConfig | null {
  if (BOTTOM_NAV_HIDDEN_PATHS.some((base) => startsWithPath(pathname, base))) return null;

  if (PLANNER_PATHS.some((base) => startsWithPath(pathname, base))) {
    return {
      label: "My Planner",
      tabs: plannerTabs.map((tab) => ({
        href: tab.href,
        label: tab.shortLabel,
        icon: tab.icon,
        active: pathname === tab.href,
      })),
    };
  }

  return {
    label: "Main",
    tabs: [...mainNav, listVenueNav].map((item) => ({
      href: item.href,
      label: item.label,
      icon: item.icon,
      active: item.isActive(pathname),
    })),
  };
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
