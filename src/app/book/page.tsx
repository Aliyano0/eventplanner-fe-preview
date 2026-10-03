import type { Metadata } from "next";
import BookForMePage from "@/views/BookForMePage";

export const metadata: Metadata = {
  title: "Book for Me",
};

export default function Page() {
  return <BookForMePage />;
}
