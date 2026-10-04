import type { Metadata } from "next";
import ManageVenuePage from "@/views/ManageVenuePage";

export const metadata: Metadata = {
  title: "Manage My Venue",
};

export default function Page() {
  return <ManageVenuePage />;
}
