"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  /** `inline` = header row; `stacked` = full-width buttons (mobile drawer). */
  layout?: "inline" | "stacked";
  /** Called after a click (the drawer uses it to close itself). */
  onAction?: () => void;
  className?: string;
}

/**
 * Sign In / Sign Up buttons — UI mock only. Real authentication (NextAuth, PRD F3) is not built yet,
 * so a click just tells the visitor it's coming. Replace the handler with the real flow later.
 */
export function AuthButtons({ layout = "inline", onAction, className }: AuthButtonsProps) {
  const mock = (label: string) => () => {
    onAction?.();
    toast.info(`${label} is coming soon`);
  };
  const stacked = layout === "stacked";

  return (
    <div className={cn(stacked ? "space-y-2" : "flex items-center gap-2", className)}>
      <Button
        type="button"
        variant={stacked ? "outline" : "ghost"}
        size="sm"
        className={stacked ? "w-full" : undefined}
        onClick={mock("Sign in")}
      >
        Sign In
      </Button>
      <Button type="button" size="sm" className={stacked ? "w-full" : undefined} onClick={mock("Sign up")}>
        Sign Up
      </Button>
    </div>
  );
}
