import type { Metadata } from "next";
import GuestsPage from "@/views/GuestsPage";

export const metadata: Metadata = {
  title: "Guest List",
};

export default function Page() {
  return <GuestsPage />;
}
