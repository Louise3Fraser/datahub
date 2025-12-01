export interface Task {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  tags: Array<{
    name: string;
    variant: "work" | "planning" | "chores" | "social" | "health";
  }>;
  comments: number;
  links: number;
  timeRemaining: string;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
  tasks: Task[];
}
