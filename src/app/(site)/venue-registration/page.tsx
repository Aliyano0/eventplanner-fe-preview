import type { Metadata } from "next";
import VenueRegistrationPage from "@/views/VenueRegistrationPage";

export const metadata: Metadata = {
  title: "Venue Registration",
};

export default function Page() {
  return <VenueRegistrationPage />;
}
