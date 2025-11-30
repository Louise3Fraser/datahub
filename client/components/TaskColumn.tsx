import { TaskCard } from "./TaskCard";

interface Task {
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

interface TaskColumnProps {
  title: string;
  count: number;
  color: string;
  tasks: Task[];
}

export function TaskColumn({ title, count, color, tasks }: TaskColumnProps) {
  return (
    <div className="flex w-full min-w-[280px] max-w-[318px] flex-col gap-[17px] rounded-[23px] bg-[#F7F6F6] p-[19px_12px_12px_12px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between px-[10px]">
        <div className="flex items-center gap-[10px]">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <h2 className="text-[15px] font-semibold leading-normal text-[hsl(var(--blue-black))]">
            {title}
          </h2>
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[hsl(var(--light-grey))]">
          <span className="text-[13px] font-medium text-white">{count}</span>
        </div>
      </div>

      <div className="flex flex-col gap-[8.5px]">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
}
