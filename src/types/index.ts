export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  /** Max 80 characters */
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee: string;
  status: TaskStatus;
}

export interface Column {
  id: string;
  title: string;
  status: TaskStatus;
}
