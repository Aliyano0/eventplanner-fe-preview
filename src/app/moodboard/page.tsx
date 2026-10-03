import type { Metadata } from "next";
import MoodboardPage from "@/views/MoodboardPage";

export const metadata: Metadata = {
  title: "Moodboard",
};

export default function Page() {
  return <MoodboardPage />;
}
