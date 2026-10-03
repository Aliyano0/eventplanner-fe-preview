"use client";

import { useState, useRef } from "react";
import { Edit2, TrendingDown, BarChart3, Plus, Check, X, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { budgetCategories as initialCategories } from "@/lib/data";
import { setStoredValue, useStoredValue } from "@/hooks/use-local-storage";
import { formatNumber } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
}

type CatExpenses = Record<string, Expense[]>;

const DEFAULT_BUDGET = 100000;

const BudgetPage = () => {
  // localStorage only exists in the browser: the server render and hydration use the default,
  // then the saved budget (if any) takes over.
  const savedBudget = useStoredValue("eventplan_budget");
  const totalBudget = savedBudget ? Number(savedBudget) : DEFAULT_BUDGET;
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");
  const [categories] = useState(initialCategories);
  const budgetInputRef = useRef<HTMLInputElement>(null);

  // Expense modal state
  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<CatExpenses>(() => {
    // Seed initial expenses from category spent data
    const initial: CatExpenses = {};
    initialCategories.forEach((cat) => {
      if (cat.spent > 0) {
        initial[cat.name] = [
          {
            id: crypto.randomUUID(),
            name: "Expense",
            amount: cat.spent,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          },
        ];
      } else {
        initial[cat.name] = [];
      }
    });
    return initial;
  });

  // Add expense form
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // Edit expense
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const getCatSpent = (catName: string) =>
    (expenses[catName] || []).reduce((sum, e) => sum + e.amount, 0);

  const totalSpent = categories.reduce((sum, c) => sum + getCatSpent(c.name), 0);
  const remaining = totalBudget - totalSpent;

  const startEditBudget = () => {
    setBudgetInput(String(totalBudget));
    setIsEditingBudget(true);
    setTimeout(() => budgetInputRef.current?.focus(), 50);
  };

  const saveBudget = () => {
    const amount = Number(budgetInput.replace(/[^0-9]/g, ""));
    if (amount > 0) {
      setStoredValue("eventplan_budget", String(amount));
    }
    setIsEditingBudget(false);
  };

  const selectedCat = selectedCatIdx !== null ? categories[selectedCatIdx] : null;
  const selectedExpenses = selectedCat ? expenses[selectedCat.name] || [] : [];
  const selectedSpent = selectedCat ? getCatSpent(selectedCat.name) : 0;

  const addExpense = () => {
    if (!selectedCat || !newName.trim() || !newAmount.trim()) return;
    const amount = Number(newAmount.replace(/[^0-9]/g, "")) || 0;
    if (amount <= 0) return;
    setExpenses((prev) => ({
      ...prev,
      [selectedCat.name]: [
        ...(prev[selectedCat.name] || []),
        {
          id: crypto.randomUUID(),
          name: newName.trim(),
          amount,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        },
      ],
    }));
    setNewName("");
    setNewAmount("");
    setIsAdding(false);
  };

  const deleteExpense = (expId: string) => {
    if (!selectedCat) return;
    setExpenses((prev) => ({
      ...prev,
      [selectedCat.name]: (prev[selectedCat.name] || []).filter((e) => e.id !== expId),
    }));
  };

  const startEditExpense = (exp: Expense) => {
    setEditingExpId(exp.id);
    setEditName(exp.name);
    setEditAmount(String(exp.amount));
  };

  const saveEditExpense = () => {
    if (!selectedCat || !editingExpId) return;
    const amount = Number(editAmount.replace(/[^0-9]/g, "")) || 0;
    setExpenses((prev) => ({
      ...prev,
      [selectedCat.name]: (prev[selectedCat.name] || []).map((e) =>
        e.id === editingExpId ? { ...e, name: editName.trim() || e.name, amount } : e
      ),
    }));
    setEditingExpId(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Budget" />

      <div className="px-4 pt-4 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Budget</h2>
            <p className="text-sm text-muted-foreground">Track your spending</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Cur: PKR</span>
          </div>
        </div>

        {/* Budget header card */}
        <div className="bg-primary rounded-2xl p-5 mb-4 text-primary-foreground">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm opacity-80">Total Budget</p>
            <button onClick={startEditBudget} className="opacity-60 hover:opacity-100 transition-opacity">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          {isEditingBudget ? (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold">Rs</span>
              <input
                ref={budgetInputRef}
                type="text"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveBudget()}
                className="flex-1 bg-primary-foreground/20 text-primary-foreground text-2xl font-bold rounded-lg px-3 py-1 outline-hidden placeholder:text-primary-foreground/40"
                placeholder="100,000"
              />
              <button onClick={saveBudget} className="p-1.5 bg-primary-foreground/20 rounded-full hover:bg-primary-foreground/30">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => setIsEditingBudget(false)} className="p-1.5 bg-primary-foreground/20 rounded-full hover:bg-primary-foreground/30">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-3xl font-bold mb-3">Rs {formatNumber(totalBudget)}</p>
          )}
          <div className="h-1.5 bg-primary-foreground/20 rounded-full mb-3">
            <div
              className="h-full bg-primary-foreground/60 rounded-full"
              style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="opacity-70">Spent</p>
              <p className="font-semibold">Rs {formatNumber(totalSpent)}</p>
            </div>
            <div className="text-right">
              <p className="opacity-70">Remaining</p>
              <p className={`font-semibold ${remaining < 0 ? "text-destructive-foreground" : ""}`}>
                Rs {formatNumber(remaining)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <TrendingDown className="w-5 h-5 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">Under Budget</p>
            <p className="font-semibold text-success">Rs {remaining > 0 ? formatNumber(remaining) : 0}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <BarChart3 className="w-5 h-5 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">Categories</p>
            <p className="font-semibold text-foreground">{categories.length}</p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mb-3">Budget Breakdown</h3>
        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const spent = getCatSpent(cat.name);
            const pctOfTotal = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCatIdx(idx);
                  setIsAdding(false);
                  setEditingExpId(null);
                }}
                className="w-full text-left bg-card rounded-xl border border-border p-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                    <span className="font-medium text-sm text-foreground">{cat.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {pctOfTotal.toFixed(1)}% of budget
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-lg font-bold text-foreground">
                    Rs {formatNumber(spent)}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.min(pctOfTotal, 100)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Expense Detail Modal */}
      <Dialog
        open={selectedCatIdx !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCatIdx(null);
            setIsAdding(false);
            setEditingExpId(null);
          }
        }}
      >
        <DialogContent className="max-w-md p-5">
          {selectedCat && (
            <>
              <div className="mb-1">
                <h2 className="text-2xl font-bold text-foreground">{selectedCat.name}</h2>
                <p className="text-sm text-muted-foreground">Rs {formatNumber(selectedSpent)} spent</p>
              </div>

              {/* Progress bar of total budget */}
              <div className="h-2 bg-muted rounded-full mb-4">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.min(totalBudget > 0 ? (selectedSpent / totalBudget) * 100 : 0, 100)}%`,
                  }}
                />
              </div>

              {/* Add Expense Button */}
              {!isAdding ? (
                <Button
                  onClick={() => setIsAdding(true)}
                  className="w-full mb-4"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Expense
                </Button>
              ) : (
                <div className="bg-muted/50 rounded-xl p-3 mb-4 space-y-2">
                  <Input
                    placeholder="Expense name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                  />
                  <Input
                    placeholder="Amount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addExpense()}
                  />
                  <div className="flex gap-2">
                    <Button onClick={addExpense} size="sm" className="flex-1">
                      Save
                    </Button>
                    <Button onClick={() => setIsAdding(false)} size="sm" variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Expenses List */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedExpenses.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No expenses yet</p>
                )}
                {selectedExpenses.map((exp) => (
                  <div key={exp.id} className="bg-muted/30 rounded-xl p-3 border border-border">
                    {editingExpId === exp.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                        />
                        <Input
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEditExpense()}
                        />
                        <div className="flex gap-2">
                          <Button onClick={saveEditExpense} size="sm" className="flex-1">
                            Save
                          </Button>
                          <Button onClick={() => setEditingExpId(null)} size="sm" variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground">{exp.name}</p>
                            <p className="text-xs text-muted-foreground">{exp.date}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">Rs {formatNumber(exp.amount)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEditExpense(exp)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
                          </Button>
                          <Button
                            onClick={() => deleteExpense(exp.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default BudgetPage;
