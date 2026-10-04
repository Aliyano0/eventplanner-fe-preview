import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";

/** Public pages: page content + site footer (the header lives in the root layout). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
