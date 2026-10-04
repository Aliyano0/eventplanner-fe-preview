import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "EventPlan is a digital platform designed to make event planning simpler, more organised and more accessible.",
};

export default function Page() {
  return <AboutPage />;
}
