import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centered page column with the app's gutters (16px on phones, 24px from `sm`, 32px from `lg`).
 *
 * - `narrow`  → 512px: single-column mobile-style content (wizard, tabs)
 * - `form`    → 768px: long forms
 * - `medium`  → 896px: lists and two-column pages
 * - `default` → 1152px: dashboards and card grids
 * - `wide`    → 1280px: header / footer
 */
const sizes = {
  narrow: "max-w-lg",
  form: "max-w-3xl",
  medium: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

interface ContainerProps {
  size?: keyof typeof sizes;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ size = "default", as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}>{children}</Tag>;
}
