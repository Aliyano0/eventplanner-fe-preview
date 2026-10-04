"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavFor } from "./nav-config";

/**
 * App-style tab bar for phones and tablets (below `lg`; the desktop header and planner tab bar replace it above).
 *
 * It is the last element of the page and `sticky bottom-0`: it stays at the bottom of the screen while scrolling and,
 * at the end of a page, sits below the footer — so it never covers content and no spacer is needed.
 * Planner screens show the original six planner tabs; other pages show the site-wide tabs; the setup wizard and
 * venue registration form show none (see `bottomNavFor`).
 */
const BottomNav = () => {
  const pathname = usePathname();
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
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-center transition-colors ${
                tab.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full ${tab.active ? "bg-primary text-primary-foreground" : ""}`}>
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
