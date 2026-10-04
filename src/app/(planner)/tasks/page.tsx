import type { Metadata } from "next";
import TasksPage from "@/views/TasksPage";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function Page() {
  return <TasksPage />;
}
