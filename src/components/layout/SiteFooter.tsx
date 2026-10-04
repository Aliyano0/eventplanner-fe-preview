import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { BRAND_NAME, companyLinks, eventLinks } from "./nav-config";

const columns = [
  { title: "PLAN AN EVENT", links: eventLinks },
  {
    title: "EXPLORE",
    links: [
      { label: "Venues", href: "/venues" },
      { label: "Vendors", href: "/vendors" },
      { label: "My Planner", href: "/dashboard" },
    ],
  },
  {
    title: "FOR VENUE OWNERS",
    links: [
      { label: "How it works", href: "/manage-venue" },
      { label: "Register your venue", href: "/venue-registration" },
    ],
  },
  { title: "COMPANY", links: companyLinks },
];

interface SiteFooterProps {
  className?: string;
}

/** Site-wide footer: brand, link columns and copyright. Server component (no client JS). */
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer className={cn("mt-12 border-t border-border bg-card", className)}>
      <Container size="wide" className="py-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 space-y-3 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </span>
              <span className="text-lg font-bold text-foreground">{BRAND_NAME}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Plan your perfect event or list your venue. Everything you need, in one place.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title.toLowerCase()}>
              <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>Crafted with care for your special moments</p>
        </div>
      </Container>
    </footer>
  );
}
