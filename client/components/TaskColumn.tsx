import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { Task } from "@/data/types";

interface TaskColumnProps {
  title: string;
  count: number;
  color: string;
  tasks: Task[];
  columnId: string;
  isOver?: boolean;
}

export function TaskColumn({
  title,
  count,
  color,
  tasks,
  columnId,
  isOver = false,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 h-fit min-w-[280px] flex-col gap-[17px] rounded-[15px] border-2 p-[15px_5px_12px_5px] shadow-overlay transition-[background-color,border-color] duration-300 ease-out ${
        isOver
          ? "border-blue-500/25 bg-blue-50/70"
          : "border-transparent bg-[#F7F6F6]"
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

      <SortableContext
        id={columnId}
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* min-height keeps empty columns a comfortable drop target */}
        <div className="flex min-h-[60px] flex-col gap-[10px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} taskId={task.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
