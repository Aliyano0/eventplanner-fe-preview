"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, DollarSign, Calendar, Users, CheckSquare, ChevronRight } from "lucide-react";

const currencies = [
  { code: "PKR", symbol: "Rs", label: "PKR" },
  { code: "USD", symbol: "$", label: "USD" },
  { code: "GBP", symbol: "£", label: "GBP" },
];

const steps = [
  { title: "Set Your Budget", description: "Enter your total event budget to start tracking expenses", icon: DollarSign },
  { title: "Pick Your Date", description: "Select your event date to plan your timeline", icon: Calendar },
  { title: "Guest Count", description: "Estimate the number of guests attending", icon: Users },
  { title: "All Set!", description: "Your planner is ready to use", icon: CheckSquare },
];

interface PlannerSetupPageProps {
  eventType: string;
}

const PlannerSetupPage = ({ eventType }: PlannerSetupPageProps) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [currency, setCurrency] = useState("PKR");

  const progress = ((step + 1) / steps.length) * 100;
  const current = steps[step];
  const Icon = current.icon;

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Persist setup data so Dashboard can load directly
      const amount = Number(budget) || 100000;
      localStorage.setItem("eventplan_budget", String(amount));
      localStorage.setItem("eventplan_currency", currency);
      localStorage.setItem("eventplan_date", date || "2026-12-15");
      localStorage.setItem("eventplan_guests", guests || "400");
      localStorage.setItem("eventplan_setup_complete", "true");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <button
        onClick={() => (step > 0 ? setStep(step - 1) : router.push(`/services/${eventType}`))}
        className="flex items-center gap-1 px-4 pt-4 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </button>

      <div className="px-4 pt-4 max-w-lg mx-auto w-full flex-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>STEP {step + 1} OF {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full mb-8">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{current.title}</h2>
              <p className="text-sm text-muted-foreground">{current.description}</p>
            </div>
          </div>

          {step === 0 && (
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">CURRENCY</label>
              <div className="flex gap-2 mt-2 mb-4">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${
                      currency === c.code
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {c.symbol} {c.label}
                  </button>
                ))}
              </div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">TOTAL BUDGET</label>
              <div className="flex items-center gap-2 mt-2 bg-muted rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {currencies.find((c) => c.code === currency)?.symbol}
                </span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0"
                  className="flex-1 bg-transparent text-lg font-medium text-foreground outline-hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Don&apos;t worry, you can adjust this later as your plans evolve.</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">EVENT DATE</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-2 bg-muted rounded-xl px-4 py-3 text-foreground outline-hidden"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">ESTIMATED GUESTS</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="0"
                className="w-full mt-2 bg-muted rounded-xl px-4 py-3 text-lg font-medium text-foreground outline-hidden"
              />
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">You&apos;re Ready to Plan!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Start managing your budget, tasks, guest list, and schedule all in one place.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold text-foreground">{currencies.find((c) => c.code === currency)?.symbol} {Number(budget || 100000).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold text-foreground">{date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Dec 15, 2026"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="font-semibold text-foreground">{guests || "400"} people</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"
          >
            {step === 3 ? "Start Planning" : "Continue"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlannerSetupPage;
