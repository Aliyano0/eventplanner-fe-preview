import type { Metadata } from "next";
import { Providers } from "@/app/providers";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
