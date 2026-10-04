import { describe, expect, it } from "vitest";
import { bottomNavFor } from "./nav-config";

const activeLabels = (pathname: string) =>
  bottomNavFor(pathname)
    ?.tabs.filter((tab) => tab.active)
    .map((tab) => tab.label);

describe("bottomNavFor — planner screens", () => {
  it("shows the six original planner tabs", () => {
    const config = bottomNavFor("/dashboard");
    expect(config?.label).toBe("My Planner");
    expect(config?.tabs.map((tab) => tab.label)).toEqual([
      "Home",
      "Moodboard",
      "Budget",
      "Guests",
      "Tasks",
      "Book for Me",
    ]);
    expect(config?.tabs.map((tab) => tab.href)).toEqual([
      "/dashboard",
      "/moodboard",
      "/budget",
      "/guests",
      "/tasks",
      "/book",
    ]);
  });

  it.each([
    ["/dashboard", "Home"],
    ["/moodboard", "Moodboard"],
    ["/budget", "Budget"],
    ["/guests", "Guests"],
    ["/tasks", "Tasks"],
    ["/book", "Book for Me"],
  ])("marks only the current tab active on %s", (pathname, label) => {
    expect(activeLabels(pathname)).toEqual([label]);
  });
});

describe("bottomNavFor — site pages", () => {
  it("shows the five site-wide tabs", () => {
    const config = bottomNavFor("/venues");
    expect(config?.label).toBe("Main");
    expect(config?.tabs.map((tab) => tab.label)).toEqual(["Home", "Venues", "Vendors", "My Planner", "List Venue"]);
    expect(config?.tabs.map((tab) => tab.href)).toEqual(["/", "/venues", "/vendors", "/dashboard", "/manage-venue"]);
  });

  it.each([
    ["/", "Home"],
    ["/services/wedding", "Home"],
    ["/venues", "Venues"],
    ["/vendors", "Vendors"],
    ["/manage-venue", "List Venue"],
  ])("marks only the matching tab active on %s", (pathname, label) => {
    expect(activeLabels(pathname)).toEqual([label]);
  });

  it.each(["/about", "/terms", "/cookie-policy", "/no-such-page"])("has no active tab on %s", (pathname) => {
    expect(bottomNavFor(pathname)).not.toBeNull();
    expect(activeLabels(pathname)).toEqual([]);
  });

  it("does not treat a path that merely starts with a planner route as a planner screen", () => {
    expect(bottomNavFor("/budgeting")?.label).toBe("Main");
    expect(bottomNavFor("/tasks-archive")?.label).toBe("Main");
  });
});

describe("bottomNavFor — flows without a bottom nav", () => {
  it.each(["/planner-setup/wedding", "/planner-setup/birthday", "/venue-registration"])("is hidden on %s", (pathname) => {
    expect(bottomNavFor(pathname)).toBeNull();
  });
});
