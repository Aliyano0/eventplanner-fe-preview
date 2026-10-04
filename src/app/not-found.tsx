"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <>
      <main className="flex flex-1 items-center justify-center bg-muted px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <Link href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </Link>
        </div>
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
