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
  /** Returns true when the current pathname belongs to this item (drives the active style). */
  isActive: (pathname: string) => boolean;
}

/** Routes that make up the "My Planner" area (they share the planner tabs / bottom nav). */
export const PLANNER_PATHS = ["/dashboard", "/moodboard", "/budget", "/guests", "/tasks", "/book"] as const;

const startsWithPath = (pathname: string, base: string) => pathname === base || pathname.startsWith(`${base}/`);

export const isPlannerPath = (pathname: string) =>
  PLANNER_PATHS.some((path) => startsWithPath(pathname, path)) || startsWithPath(pathname, "/planner-setup");

/** Primary site navigation (desktop header). */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/", isActive: (p) => p === "/" || startsWithPath(p, "/services") },
  { label: "Venues", href: "/venues", isActive: (p) => startsWithPath(p, "/venues") },
  { label: "Vendors", href: "/vendors", isActive: (p) => startsWithPath(p, "/vendors") },
  { label: "My Planner", href: "/dashboard", isActive: isPlannerPath },
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

/** Tabs of the planner area: bottom nav on phones, tab bar from `md` up. */
export const plannerTabs: PlannerTab[] = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: Home },
  { href: "/moodboard", label: "Moodboard", shortLabel: "Moodboard", icon: Image },
  { href: "/budget", label: "Budget", shortLabel: "Budget", icon: DollarSign },
  { href: "/guests", label: "Guests", shortLabel: "Guests", icon: Users },
  { href: "/tasks", label: "Tasks", shortLabel: "Tasks", icon: CheckSquare },
  { href: "/book", label: "Book for Me", shortLabel: "Book for Me", icon: Sparkles },
];

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
