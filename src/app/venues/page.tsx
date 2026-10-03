import type { Metadata } from "next";
import VenuesPage from "@/views/VenuesPage";

export const metadata: Metadata = {
  title: "Venues",
};

export default function Page() {
  return <VenuesPage />;
}
