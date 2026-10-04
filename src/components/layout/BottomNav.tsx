"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { plannerTabs } from "./nav-config";

/** Fixed bottom tab bar for the planner screens on phones. From `md` up the `PlannerNav` tab bar replaces it. */
const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden" aria-label="My Planner">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {plannerTabs.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-center transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? "bg-primary text-primary-foreground" : ""}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
