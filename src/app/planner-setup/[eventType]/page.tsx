import type { Metadata } from "next";
import { eventTypes } from "@/lib/data";
import PlannerSetupPage from "@/views/PlannerSetupPage";

export const metadata: Metadata = {
  title: "Planner Setup",
};

export function generateStaticParams() {
  return eventTypes.map((event) => ({ eventType: event.id }));
}

export default async function Page({ params }: PageProps<"/planner-setup/[eventType]">) {
  const { eventType } = await params;
  return <PlannerSetupPage eventType={eventType} />;
}
