import type { Metadata } from "next";
import BudgetPage from "@/views/BudgetPage";

export const metadata: Metadata = {
  title: "Budget",
};

export default function Page() {
  return <BudgetPage />;
}
