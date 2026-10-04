import type { ReactNode } from "react";
import { PlannerNav } from "@/components/layout/PlannerNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * "My Planner" screens: the tab bar under the header from `lg` up. Below `lg` the same destinations are the
 * bottom nav, which lives in the root layout.
 */
export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PlannerNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
