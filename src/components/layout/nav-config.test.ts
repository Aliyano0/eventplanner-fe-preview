import { describe, expect, it } from "vitest";
import { bottomNavFor, drawerNavFor, plannerTabs } from "./nav-config";

const activeLabels = (pathname: string) =>
  bottomNavFor(pathname)
    ?.tabs.filter((tab) => tab.active)
    .map((tab) => tab.label);

const drawerLabels = (pathname: string) => drawerNavFor(pathname).map((item) => item.label);

describe("bottomNavFor — planner screens", () => {
  it("shows five planner tabs (the menu button is added by the component, Moodboard lives in the menu)", () => {
    const config = bottomNavFor("/dashboard");
    expect(config?.kind).toBe("planner");
    expect(config?.label).toBe("My Planner");
    expect(config?.tabs.map((tab) => tab.label)).toEqual(["Home", "Budget", "Guests", "Tasks", "Book for Me"]);
    expect(config?.tabs.map((tab) => tab.href)).toEqual(["/dashboard", "/budget", "/guests", "/tasks", "/book"]);
  });

  it.each([
    ["/dashboard", "Home"],
    ["/budget", "Budget"],
    ["/guests", "Guests"],
    ["/tasks", "Tasks"],
    ["/book", "Book for Me"],
  ])("marks only the current tab active on %s", (pathname, label) => {
    expect(activeLabels(pathname)).toEqual([label]);
  });

  it("still shows the planner nav on Moodboard, with no tab active (it is reached from the menu)", () => {
    expect(bottomNavFor("/moodboard")?.kind).toBe("planner");
    expect(activeLabels("/moodboard")).toEqual([]);
  });

  it("keeps all six planner tabs for the desktop tab bar", () => {
    expect(plannerTabs.map((tab) => tab.label)).toEqual([
      "Dashboard",
      "Moodboard",
      "Budget",
      "Guests",
      "Tasks",
      "Book for Me",
    ]);
  });
});

describe("bottomNavFor — site pages", () => {
  it("shows four site tabs (List Venue lives in the menu)", () => {
    const config = bottomNavFor("/venues");
    expect(config?.kind).toBe("site");
    expect(config?.label).toBe("Main");
    expect(config?.tabs.map((tab) => tab.label)).toEqual(["Home", "Venues", "Vendors", "My Planner"]);
    expect(config?.tabs.map((tab) => tab.href)).toEqual(["/", "/venues", "/vendors", "/dashboard"]);
  });

  it.each([
    ["/", "Home"],
    ["/services/wedding", "Home"],
    ["/venues", "Venues"],
    ["/vendors", "Vendors"],
  ])("marks only the matching tab active on %s", (pathname, label) => {
    expect(activeLabels(pathname)).toEqual([label]);
  });

  it.each(["/about", "/terms", "/cookie-policy", "/manage-venue", "/no-such-page"])(
    "has no active tab on %s",
    (pathname) => {
      expect(bottomNavFor(pathname)).not.toBeNull();
      expect(activeLabels(pathname)).toEqual([]);
    },
  );

  it("does not treat a path that merely starts with a planner route as a planner screen", () => {
    expect(bottomNavFor("/budgeting")?.kind).toBe("site");
    expect(bottomNavFor("/tasks-archive")?.kind).toBe("site");
  });
});

describe("bottomNavFor — flows without a bottom nav", () => {
  it.each(["/planner-setup/wedding", "/planner-setup/birthday", "/venue-registration"])("is hidden on %s", (pathname) => {
    expect(bottomNavFor(pathname)).toBeNull();
  });
});

describe("drawerNavFor", () => {
  it("on site pages lists only what the bottom nav does not", () => {
    expect(drawerLabels("/venues")).toEqual(["New Event", "List Your Venue", "Profile", "Settings"]);
    expect(drawerLabels("/")).toEqual(["New Event", "List Your Venue", "Profile", "Settings"]);
  });

  it("on planner screens leads with the tab that did not fit (Moodboard) and the way back out", () => {
    expect(drawerLabels("/budget")).toEqual([
      "Moodboard",
      "EventPlan Home",
      "Venues",
      "Vendors",
      "New Event",
      "List Your Venue",
      "Profile",
      "Settings",
    ]);
    expect(drawerNavFor("/budget").find((item) => item.label === "EventPlan Home")?.path).toBe("/");
  });

  it("on pages without a bottom nav lists everything", () => {
    const everything = ["Home", "Venues", "Vendors", "Dashboard", "New Event", "List Your Venue", "Profile", "Settings"];
    expect(drawerLabels("/planner-setup/wedding")).toEqual(everything);
    expect(drawerLabels("/venue-registration")).toEqual(everything);
  });

  it.each([
    "/",
    "/services/wedding",
    "/venues",
    "/vendors",
    "/manage-venue",
    "/about",
    "/terms",
    "/cookie-policy",
    "/no-such-page",
    "/dashboard",
    "/moodboard",
    "/budget",
    "/guests",
    "/tasks",
    "/book",
    "/planner-setup/wedding",
    "/venue-registration",
  ])("never repeats a bottom-nav destination in the drawer on %s", (pathname) => {
    const bottomHrefs = new Set(bottomNavFor(pathname)?.tabs.map((tab) => tab.href));
    const drawerPaths = drawerNavFor(pathname).map((item) => item.path);

    for (const path of drawerPaths) expect(bottomHrefs.has(path)).toBe(false);
    expect(new Set(drawerPaths).size).toBe(drawerPaths.length);
  });

  it("keeps every destination reachable: a bottom-nav tab or a drawer entry (the menu covers what was demoted)", () => {
    const reachable = (pathname: string) =>
      new Set([
        ...(bottomNavFor(pathname)?.tabs.map((tab) => tab.href) ?? []),
        ...drawerNavFor(pathname).map((item) => item.path),
      ]);

    // from a planner screen: all six planner screens + site pages
    for (const href of ["/dashboard", "/moodboard", "/budget", "/guests", "/tasks", "/book", "/", "/venues", "/vendors", "/manage-venue"]) {
      expect(reachable("/budget").has(href)).toBe(true);
    }
    // from a site page: the site pages, the dashboard (via My Planner), List Your Venue and New Event
    for (const href of ["/", "/venues", "/vendors", "/dashboard", "/manage-venue", "/planner-setup/wedding"]) {
      expect(reachable("/venues").has(href)).toBe(true);
    }
  });
});
