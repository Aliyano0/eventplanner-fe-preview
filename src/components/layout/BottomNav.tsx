"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useNavDrawer } from "./NavDrawer";
import { bottomNavFor } from "./nav-config";

const itemClassName = (active: boolean) =>
  `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-center transition-colors ${
    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
  }`;

/**
 * App-style tab bar for phones and tablets (below `lg`; the desktop header and planner tab bar replace it above).
 * The tabs come first and the **menu button sits in the right corner**; it opens the drawer, which slides in from the
 * right and lists everything that is not already a tab here (see `drawerNavFor`).
 *
 * It is the last element of the page and `sticky bottom-0`: it stays at the bottom of the screen while scrolling and,
 * at the end of a page, sits below the footer — so it never covers content and no spacer is needed.
 * Planner screens show five planner tabs, other pages four site tabs; the setup wizard and venue registration form
 * show no bottom nav (their menu button is in the header) — see `bottomNavFor`.
 */
const BottomNav = () => {
  const pathname = usePathname();
  const { open, setOpen } = useNavDrawer();
  const config = bottomNavFor(pathname);

  if (!config) return null;

  return (
    <nav className="sticky bottom-0 z-50 border-t border-border bg-card lg:hidden" aria-label={config.label}>
      <div className="flex justify-around items-center py-2 max-w-lg md:max-w-2xl mx-auto">
        {config.tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={itemClassName(tab.active)}
            >
              <div className={`p-1.5 rounded-full ${tab.active ? "bg-primary text-primary-foreground" : ""}`}>
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={itemClassName(open)}
        >
          <div className={`p-1.5 rounded-full ${open ? "bg-primary text-primary-foreground" : ""}`}>
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-[10px] md:text-xs font-medium">Menu</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
