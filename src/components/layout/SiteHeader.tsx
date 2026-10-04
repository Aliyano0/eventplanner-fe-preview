"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AuthButtons } from "./AuthButtons";
import { Container } from "./Container";
import { BRAND_NAME, drawerNav, mainNav, titleFor } from "./nav-config";

const drawerItemClassName =
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-center text-sm font-medium text-foreground hover:bg-accent transition-colors";

/**
 * Site-wide sticky header.
 *
 * - Phones (< md): compact bar — drawer button + current page title (the app's original top bar).
 * - md and up: brand, primary navigation with active state, and a "List your venue" action.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xs">
      <Container size="wide" className="flex h-12 items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-3">
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <button className="-ml-1 rounded-md p-1 transition-colors hover:bg-muted md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="border-b border-border p-5">
                <SheetTitle className="text-lg font-bold text-foreground">{BRAND_NAME}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">Plan your perfect event</SheetDescription>
              </div>
              <nav className="space-y-1 p-3" aria-label="Menu">
                {drawerNav.map((item) =>
                  item.path.startsWith("#") ? (
                    // Placeholder entries (no route yet): just close the drawer.
                    <button key={item.label} onClick={() => setDrawerOpen(false)} className={drawerItemClassName}>
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={drawerItemClassName}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="border-t border-border p-3">
                <AuthButtons layout="stacked" onAction={() => setDrawerOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Phones: page title */}
          <span className="font-semibold text-foreground md:hidden">{titleFor(pathname)}</span>

          {/* md and up: brand */}
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <span className="text-lg font-bold text-foreground">{BRAND_NAME}</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
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
        </div>
      </Container>
    </header>
  );
}
