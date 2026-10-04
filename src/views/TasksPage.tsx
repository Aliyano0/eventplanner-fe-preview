"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Calendar, Flag, Plus, CheckCircle2, Circle, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  category: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  done: boolean;
  reminder?: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "Send save-the-date cards", category: "Invitations", date: "2026-04-25", priority: "High", done: false },
  { id: "2", title: "Finalize menu with caterer", category: "Catering", date: "2026-04-30", priority: "High", done: false },
  { id: "3", title: "Order wedding cake", category: "Catering", date: "2026-05-15", priority: "Medium", done: false },
  { id: "4", title: "Book transportation", category: "Logistics", date: "2026-05-01", priority: "Medium", done: false },
  { id: "5", title: "Create wedding playlist", category: "Entertainment", date: "2026-05-10", priority: "Low", done: false },
  { id: "6", title: "Book wedding venue", category: "Venue", date: "2026-04-20", priority: "High", done: true },
  { id: "7", title: "Choose wedding dress", category: "Attire", date: "2026-04-10", priority: "High", done: true },
  { id: "8", title: "Send engagement announcements", category: "Invitations", date: "2026-03-15", priority: "Medium", done: true },
];

const priorityColor: Record<string, string> = {
  High: "text-destructive",
  Medium: "text-amber-600",
  Low: "text-muted-foreground",
};

// Task deadlines are date-only strings (YYYY-MM-DD), which JS parses as UTC midnight.
// Formatting in UTC keeps the rendered day identical on the server and in every browser timezone.
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
};

interface TaskCardProps {
  task: Task;
  completed?: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, completed = false, onToggle, onEdit, onDelete }: TaskCardProps) => (
  <div className={`bg-card rounded-xl border border-border p-4 flex items-start gap-3 ${completed ? "opacity-60" : ""}`}>
    <button onClick={() => onToggle(task.id)} className="mt-0.5">
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Circle className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
    <div className="flex-1 min-w-0">
      <p className={`font-medium text-foreground ${completed ? "line-through" : ""}`}>{task.title}</p>
      <div className="flex items-center gap-3 mt-1 text-xs flex-wrap">
        {task.category && (
          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded">{task.category}</span>
        )}
        <span className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {formatDate(task.date)}
        </span>
        {!completed && (
          <span className={`flex items-center gap-1 ${priorityColor[task.priority]}`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
        )}
      </div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-muted transition-colors">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(task)}>
          <Pencil className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formPriority, setFormPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [formReminder, setFormReminder] = useState("");

  const activeTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);
  const progress = tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const openAdd = () => {
    setEditingTask(null);
    setFormTitle("");
    setFormCategory("");
    setFormDate("");
    setFormPriority("Medium");
    setFormReminder("");
    setShowDialog(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormCategory(task.category);
    setFormDate(task.date);
    setFormPriority(task.priority);
    setFormReminder(task.reminder || "");
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!formTitle.trim() || !formDate) return;
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? { ...t, title: formTitle, category: formCategory, date: formDate, priority: formPriority, reminder: formReminder || undefined }
            : t
        )
      );
    } else {
      const newTask: Task = {
        id: String(Date.now()),
        title: formTitle,
        category: formCategory,
        date: formDate,
        priority: formPriority,
        done: false,
        reminder: formReminder || undefined,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setShowDialog(false);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-background">
      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">TASK TITLE *</label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">CATEGORY</label>
              <Input
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="e.g., Venue, Catering, Decoration"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">DEADLINE *</label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">PRIORITY</label>
              <div className="flex gap-2 mt-1">
                {(["Low", "Medium", "High"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFormPriority(p)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${
                      formPriority === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-muted-foreground">REMINDER DATE</label>
              <Input
                type="date"
                value={formReminder}
                onChange={(e) => setFormReminder(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                {editingTask ? "Save Changes" : "Add Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Container className="space-y-5 pt-4 pb-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Tasks</h1>
            <p className="text-sm text-muted-foreground">
              {activeTasks.length} pending, {completedTasks.length} completed
            </p>
          </div>
          <button
            onClick={openAdd}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">Overall Progress</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {completedTasks.length} of {tasks.length} tasks completed
          </p>
        </div>

        {/* Active + completed tasks (side by side from lg) */}
        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
          {/* Active Tasks */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Active Tasks</h2>
            {activeTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={openEdit} onDelete={deleteTask} />
            ))}
          </div>

          {/* Completed Tasks */}
          <div className="space-y-3">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex items-center justify-between w-full"
            >
              <h2 className="font-semibold text-muted-foreground">
                Completed Tasks ({completedTasks.length})
              </h2>
              <span className="text-sm text-muted-foreground">
                {showCompleted ? "Hide" : "Show"}
              </span>
            </button>
            {showCompleted &&
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  completed
                  onToggle={toggleTask}
                  onEdit={openEdit}
                  onDelete={deleteTask}
                />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TasksPage;