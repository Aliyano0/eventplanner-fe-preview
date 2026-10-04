"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthButtons } from "./AuthButtons";
import { Container } from "./Container";
import { useNavDrawer } from "./NavDrawer";
import { BRAND_NAME, bottomNavFor, mainNav, titleFor } from "./nav-config";

/**
 * Site-wide sticky header. Navigation below `lg` is the sticky `BottomNav` (tabs + the menu button in its right
 * corner), so the bar stays light there.
 *
 * - Phones (< md): compact bar — current page title, search (the app's original top bar).
 * - Tablets (md–lg): logo, Sign In / Sign Up.
 * - lg and up: logo, primary navigation with active state, "List your venue", Sign In / Sign Up.
 *
 * Pages without a bottom nav (the planner setup wizard, venue registration) get the menu button here instead,
 * at the right end of the bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { setOpen } = useNavDrawer();
  const menuInHeader = bottomNavFor(pathname) === null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xs">
      <Container size="wide" className="flex h-12 items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-3">
          {/* Phones: page title */}
          <span className="font-semibold text-foreground md:hidden">{titleFor(pathname)}</span>

          {/* Tablets and desktop: logo */}
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <span className="text-lg font-bold text-foreground">{BRAND_NAME}</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <Search className="h-5 w-5 text-muted-foreground md:hidden" />
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
            <Link href="/manage-venue">List your venue</Link>
          </Button>
          <AuthButtons className="hidden md:flex" />
          {menuInHeader && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              className="-mr-1 rounded-md p-1 transition-colors hover:bg-muted lg:hidden"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          )}
        </div>
      </Container>
    </header>
  );
}
