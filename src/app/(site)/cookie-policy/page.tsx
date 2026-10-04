import type { Metadata } from "next";
import CookiePolicyPage from "@/views/CookiePolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How EventPlan uses cookies and similar technologies, and the choices you have.",
};

export default function Page() {
  return <CookiePolicyPage />;
}
