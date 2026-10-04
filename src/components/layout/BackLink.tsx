import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** "← Back to …" link used at the top of inner pages (shrink-wrapped so only the text is clickable). */
export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn("flex w-fit items-center gap-1 text-center text-sm text-primary hover:underline", className)}
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </Link>
  );
}
