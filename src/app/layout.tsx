import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import BottomNav from "@/components/layout/BottomNav";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const description = "Plan your perfect event or list your venue";

export const metadata: Metadata = {
  title: {
    default: "EventPlan",
    template: "%s | EventPlan",
  },
  description,
  openGraph: {
    title: "EventPlan",
    description,
    type: "website",
  },
};

/**
 * Root shell. The header and the app-style bottom nav (phones and tablets) are shared by every page; each route
 * group (`(site)`, `(planner)`) adds its own `<main>` and footer so the footer always sits below the content
 * (pushed to the bottom on short pages), with the bottom nav as the last element after it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <SiteHeader />
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
