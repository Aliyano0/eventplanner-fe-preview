"use client";

import type { ReactNode } from "react";
import { NavDrawerProvider } from "@/components/layout/NavDrawer";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Client-side providers shared by every route. Kept as a single client
 * boundary so the root layout itself can stay a Server Component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NavDrawerProvider>{children}</NavDrawerProvider>
    </TooltipProvider>
  );
}
