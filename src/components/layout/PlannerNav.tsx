"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { plannerTabs } from "./nav-config";

/**
 * Tab bar for the planner screens on lg and up. On phones and tablets the same destinations live in the sticky
 * `BottomNav`, so this bar is hidden below `lg`.
 */
export function PlannerNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 z-30 hidden border-b border-border bg-background/90 backdrop-blur-xs lg:block">
      <Container>
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="My Planner">
          {plannerTabs.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
