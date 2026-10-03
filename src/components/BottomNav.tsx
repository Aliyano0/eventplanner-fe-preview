"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Image, DollarSign, Users, CheckSquare, Sparkles } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/moodboard", label: "Moodboard", icon: Image },
  { path: "/budget", label: "Budget", icon: DollarSign },
  { path: "/guests", label: "Guests", icon: Users },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/book", label: "Book for Me", icon: Sparkles },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-center transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? "bg-primary text-primary-foreground" : ""}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
