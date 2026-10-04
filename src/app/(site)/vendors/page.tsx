import type { Metadata } from "next";
import VendorsPage from "@/views/VendorsPage";

export const metadata: Metadata = {
  title: "Vendors",
};

export default function Page() {
  return <VendorsPage />;
}
