import type { Metadata } from "next";
import { eventTypes } from "@/lib/data";
import ServicesPage from "@/views/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
};

// Pre-render the known event types; any other slug is still rendered on demand
// (the page falls back to a generic "Event" label, same as before the migration).
export function generateStaticParams() {
  return eventTypes.map((event) => ({ eventType: event.id }));
}

export default async function Page({ params }: PageProps<"/services/[eventType]">) {
  const { eventType } = await params;
  return <ServicesPage eventType={eventType} />;
}
