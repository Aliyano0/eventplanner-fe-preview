import type { ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { PlannerNav } from "@/components/layout/PlannerNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * "My Planner" screens: tab bar on md and up, fixed bottom nav on phones. The footer gets extra bottom
 * padding on phones so the fixed bottom nav never covers its last line.
 */
export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PlannerNav />
      <main className="flex-1">{children}</main>
      <SiteFooter className="pb-20 md:pb-0" />
      <BottomNav />
    </>
  );
}
