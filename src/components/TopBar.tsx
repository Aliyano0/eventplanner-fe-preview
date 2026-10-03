"use client";

import Link from "next/link";
import { Menu, Search, ArrowLeft, User, Home, PlusCircle, Settings, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface TopBarProps {
  title: string;
  backTo?: string;
  backLabel?: string;
  showMenu?: boolean;
}

const menuItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "New Event", icon: PlusCircle, path: "/planner-setup/wedding" },
  { label: "Profile", icon: User, path: "#profile" },
  { label: "Settings", icon: Settings, path: "#settings" },
];

const menuItemClassName =
  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-center text-sm font-medium text-foreground hover:bg-accent transition-colors";

const TopBar = ({ title, backTo, backLabel, showMenu = true }: TopBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 bg-card/80 backdrop-blur-xs border-b border-border z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          {showMenu && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-1 -ml-1 rounded-md hover:bg-muted transition-colors">
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-5 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">EventPlan</h2>
                  <p className="text-xs text-muted-foreground">Plan your perfect event</p>
                </div>
                <nav className="p-3 space-y-1">
                  {menuItems.map((item) =>
                    item.path.startsWith("#") ? (
                      // Placeholder entries (no route yet): just close the drawer.
                      <button key={item.label} onClick={() => setOpen(false)} className={menuItemClassName}>
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.path}
                        onClick={() => setOpen(false)}
                        className={menuItemClassName}
                      >
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        {item.label}
                      </Link>
                    ),
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          <h1 className="font-semibold text-foreground">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      {backTo && (
        <Link
          href={backTo}
          className="flex w-fit items-center gap-1 px-4 pb-2 text-center text-sm text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel || "Back"}
        </Link>
      )}
    </div>
  );
};

export default TopBar;
