import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";

interface Task {
  id?: string;
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
  columnId?: string;
  isOver?: boolean;
}

export function TaskColumn({
  title,
  count,
  color,
  tasks,
  columnId,
  isOver: isOverProp = false,
}: TaskColumnProps) {
  const { setNodeRef, isOver: isOverDnd } = useDroppable({
    id: columnId || `column-${Math.random()}`,
  });

  const isOver = isOverProp || isOverDnd;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 h-fit min-w-[280px] flex-col gap-[17px] rounded-[15px] p-[19px_12px_12px_12px] shadow-overlay transition-all ${
        isOver
          ? "border-2 border-blue-500/30 bg-blue-50"
          : "border-2 border-transparent bg-[#F7F6F6]"
      }`}
    >
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

      <div className="flex flex-col gap-[12px]">
        {tasks.map((task, index) => (
          <TaskCard key={task.id || index} {...task} taskId={task.id} />
        ))}
      </div>
    </div>
  );
}
