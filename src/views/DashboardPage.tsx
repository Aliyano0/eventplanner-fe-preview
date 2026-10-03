"use client";

import Link from "next/link";
import { useState } from "react";
import { DollarSign, CheckCircle, Users, CalendarDays, ArrowLeft, Sparkles, Menu } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { setStoredValue, useStoredValue } from "@/hooks/use-local-storage";
import { formatNumber } from "@/lib/format";
import { sampleTasks } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CURRENCY_SYMBOLS: Record<string, string> = { PKR: "Rs", USD: "$", GBP: "£" };

const DashboardPage = () => {
  const [budget, setBudget] = useState("");
  const [budgetDialogDismissed, setBudgetDialogDismissed] = useState(false);

  // Values saved by the planner-setup flow. Each is `undefined` on the server and during
  // hydration (so the defaults below render first), then the real browser value.
  const savedBudget = useStoredValue("eventplan_budget");
  const setupComplete = useStoredValue("eventplan_setup_complete");
  const savedDate = useStoredValue("eventplan_date");
  const savedGuests = useStoredValue("eventplan_guests");
  const savedCurrency = useStoredValue("eventplan_currency");

  const totalBudget = savedBudget ? Number(savedBudget) : null;
  const showBudgetSetup =
    savedBudget !== undefined && setupComplete !== undefined && !savedBudget && !setupComplete && !budgetDialogDismissed;
  const eventDate = savedDate
    ? new Date(savedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Dec 15, 2026";
  const guestCount = savedGuests || "400";
  const currencySymbol = (savedCurrency && CURRENCY_SYMBOLS[savedCurrency]) || "$";

  const handleSetBudget = () => {
    const amount = Number(budget.replace(/[^0-9]/g, ""));
    if (amount > 0) {
      setStoredValue("eventplan_budget", String(amount));
    }
  };

  const displayBudget = totalBudget
    ? `${currencySymbol} ${formatNumber(totalBudget)}`
    : `${currencySymbol} 0`;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Dialog open={showBudgetSetup} onOpenChange={(open) => setBudgetDialogDismissed(!open)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Set Your Budget</DialogTitle>
            <DialogDescription>
              How much are you planning to spend on your event? You can change this later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="e.g. 100,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="pl-8 text-lg"
                autoFocus
              />
            </div>
            <Button onClick={handleSetBudget} className="w-full">
              Set Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="sticky top-0 bg-card/80 backdrop-blur-xs border-b border-border z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Menu className="w-5 h-5" />
            <h1 className="font-semibold">Dashboard</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-bold">
            25<br/><span className="text-[8px]">DAYS</span>
          </div>
        </div>
      </div>

      <Link
        href="/services/wedding"
        className="flex w-fit items-center gap-1 px-4 pt-3 text-center text-sm text-primary hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Services
      </Link>

      <div className="px-4 pt-2 max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground">YOUR EVENT</p>
        <h2 className="text-2xl font-bold text-foreground mb-4">Dream Wedding</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <DollarSign className="w-8 h-8 text-primary p-1.5 bg-accent rounded-full mb-2" />
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">BUDGET USED</p>
            <p className="text-2xl font-bold text-foreground">{currencySymbol} 0</p>
            <p className="text-xs text-muted-foreground mt-1">0% of {displayBudget}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <CheckCircle className="w-8 h-8 text-success p-1.5 bg-accent rounded-full mb-2" />
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">TASKS DONE</p>
            <p className="text-2xl font-bold text-foreground">8/15</p>
            <div className="h-1.5 bg-muted rounded-full mt-2">
              <div className="h-full bg-success rounded-full" style={{ width: "53%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">53% complete</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <Users className="w-8 h-8 text-primary p-1.5 bg-accent rounded-full mb-2" />
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">GUEST LIST</p>
            <p className="text-2xl font-bold text-foreground">{guestCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Confirmed guests</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <CalendarDays className="w-8 h-8 text-primary p-1.5 bg-accent rounded-full mb-2" />
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">EVENT DATE</p>
            <p className="text-xl font-bold text-foreground">{eventDate}</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Upcoming Tasks</h3>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            {sampleTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3">
                {task.urgent && <div className="w-2 h-2 rounded-full bg-destructive mt-2" />}
                {!task.urgent && <div className="w-2 h-2 mt-2" />}
                <div>
                  <p className="text-sm font-medium text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
