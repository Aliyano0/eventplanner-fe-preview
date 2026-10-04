import type { Metadata } from "next";
import HomePage from "@/views/HomePage";

export const metadata: Metadata = {
  title: { absolute: "EventPlan" },
};

export default function Page() {
  return <HomePage />;
}
