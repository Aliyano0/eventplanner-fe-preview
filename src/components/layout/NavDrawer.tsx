"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { AuthButtons } from "./AuthButtons";
import { BRAND_NAME, drawerNavFor } from "./nav-config";

const itemClassName =
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-center text-sm font-medium text-foreground hover:bg-accent transition-colors";

interface NavDrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NavDrawerContext = createContext<NavDrawerContextValue | null>(null);

/** Open / close the menu drawer from anywhere (the bottom nav's menu button, or the header on pages without a bottom nav). */
export function useNavDrawer() {
  const context = useContext(NavDrawerContext);
  if (!context) throw new Error("useNavDrawer must be used inside <NavDrawerProvider>");
  return context;
}

/** Holds the drawer's open state and renders the drawer once for the whole app. */
export function NavDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <NavDrawerContext.Provider value={value}>
      {children}
      <NavDrawer />
    </NavDrawerContext.Provider>
  );
}

/**
 * The menu drawer (phones and tablets), sliding in from the right to match the menu button in the bottom nav's right
 * corner. Its entries come from `drawerNavFor`, which leaves out whatever the bottom nav already shows on the current
 * page, so a link is never offered twice.
 */
function NavDrawer() {
  const pathname = usePathname();
  const { open, setOpen } = useNavDrawer();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-64 p-0">
        <div className="border-b border-border p-5">
          <SheetTitle className="text-lg font-bold text-foreground">{BRAND_NAME}</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">Plan your perfect event</SheetDescription>
        </div>
        <nav className="space-y-1 p-3" aria-label="Menu">
          {drawerNavFor(pathname).map((item) =>
            item.path.startsWith("#") ? (
              // Placeholder entries (no route yet): just close the drawer.
              <button key={item.label} onClick={close} className={itemClassName}>
                <item.icon className="h-5 w-5 text-muted-foreground" />
                {item.label}
              </button>
            ) : (
              <Link key={item.label} href={item.path} onClick={close} className={itemClassName}>
                <item.icon className="h-5 w-5 text-muted-foreground" />
                {item.label}
              </Link>
            ),
          )}
        </nav>
        {/* Tablets already show Sign In / Sign Up in the header bar */}
        <div className="border-t border-border p-3 md:hidden">
          <AuthButtons layout="stacked" onAction={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
