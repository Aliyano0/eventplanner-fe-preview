import type { Metadata } from "next";
import TermsPage from "@/views/TermsPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you access or use EventPlan: accounts, vendors and customers, enquiries, reviews and more.",
};

export default function Page() {
  return <TermsPage />;
}
