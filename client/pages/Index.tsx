import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Sidebar } from "@/components/Sidebar";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskCard } from "@/components/TaskCard";

interface Task {
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

interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
  tasks: Task[];
}

export default function Index() {
  const filters = ["All", "Work", "Planning", "Chores", "Social"];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "not-started",
      title: "Not Started",
      count: 4,
      color: "#FF5454",
      tasks: [
        {
          id: "task-1",
          title: "Go to the store",
          dueDate: "02 Nov 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [
            { name: "Planning", variant: "planning" as const },
            { name: "Chores", variant: "chores" as const },
          ],
          comments: 2,
          links: 5,
          timeRemaining: "3 days",
        },
        {
          id: "task-2",
          title: "Create draft for group project",
          dueDate: "03 Nov 2025",
          description:
            "This is super important! Plan and execute! Need to get a good score on this.",
          tags: [
            { name: "Work", variant: "work" as const },
            { name: "Planning", variant: "planning" as const },
          ],
          comments: 4,
          links: 1,
          timeRemaining: "4 days",
        },
        {
          id: "task-3",
          title: "Buy gift for Mom",
          dueDate: "10 Dec 2025",
          description: "She wants a new pair of earings.",
          tags: [{ name: "Social", variant: "social" as const }],
          comments: 1,
          links: 0,
          timeRemaining: "12 days",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      count: 3,
      color: "#058DFD",
      tasks: [
        {
          id: "task-4",
          title: "Create home page",
          dueDate: "01 Nov 2025",
          description: "Js vs ts. Message Andy about benefits of each.",
          tags: [{ name: "Work", variant: "work" as const }],
          comments: 0,
          links: 0,
          timeRemaining: "2 days",
        },
        {
          id: "task-5",
          title: "Create workout schedule for January",
          dueDate: "02 Nov 2025",
          description: "Yoga classes have a sale going on in December.",
          tags: [
            { name: "Health", variant: "health" as const },
            { name: "Planning", variant: "planning" as const },
          ],
          comments: 0,
          links: 1,
          timeRemaining: "10 days",
        },
        {
          id: "task-6",
          title: "Workout with Leslie",
          dueDate: "09 Nov 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [{ name: "Health", variant: "health" as const }],
          comments: 5,
          links: 0,
          timeRemaining: "1 days",
        },
      ],
    },
    {
      id: "complete",
      title: "Complete",
      count: 3,
      color: "#3FBC66",
      tasks: [
        {
          id: "task-7",
          title: "Message Andy",
          dueDate: "01 Nov 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [{ name: "Work", variant: "work" as const }],
          comments: 15,
          links: 0,
          timeRemaining: "0 days",
        },
        {
          id: "task-8",
          title: "Pick up honey ham",
          dueDate: "18 Nov 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [
            { name: "Planning", variant: "planning" as const },
            { name: "Chores", variant: "chores" as const },
          ],
          comments: 1,
          links: 1,
          timeRemaining: "0 days",
        },
        {
          id: "task-9",
          title: "Plan Australia vacation",
          dueDate: "05 Dec 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [
            { name: "Social", variant: "social" as const },
            { name: "Planning", variant: "planning" as const },
          ],
          comments: 24,
          links: 10,
          timeRemaining: "13 days",
        },
      ],
    },
    {
      id: "on-hold",
      title: "On Hold",
      count: 1,
      color: "#B2B2B2",
      tasks: [
        {
          id: "task-10",
          title: "Deep clean fridge",
          dueDate: "20 Oct 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [{ name: "Chores", variant: "chores" as const }],
          comments: 0,
          links: 0,
          timeRemaining: "Past due",
        },
      ],
    },
  ]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const targetColumnId = over.id as string;

    if (taskId.startsWith("task-") && targetColumnId) {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        let taskToMove: Task | null = null;
        let sourceColumnIndex = -1;

        for (let i = 0; i < newColumns.length; i++) {
          const taskIndex = newColumns[i].tasks.findIndex(
            (t) => t.id === taskId,
          );

          if (taskIndex !== -1) {
            taskToMove = newColumns[i].tasks[taskIndex];
            sourceColumnIndex = i;
            newColumns[i].tasks = newColumns[i].tasks.filter(
              (t) => t.id !== taskId,
            );
            newColumns[i].count = newColumns[i].tasks.length;
          }
        }

        if (taskToMove) {
          const targetColumnIndex = newColumns.findIndex(
            (c) => c.id === targetColumnId,
          );
          if (targetColumnIndex !== -1) {
            newColumns[targetColumnIndex].tasks.unshift(taskToMove);
            newColumns[targetColumnIndex].count =
              newColumns[targetColumnIndex].tasks.length;
          }
        }

        return newColumns;
      });
    }
  };

  const activeTask = activeId
    ? columns.flatMap((col) => col.tasks).find((task) => task.id === activeId)
    : null;

  // Filter mapping
  const filterToVariant: Record<
    string,
    "work" | "planning" | "chores" | "social" | "health" | null
  > = {
    All: null,
    Work: "work",
    Planning: "planning",
    Chores: "chores",
    Social: "social",
  };

  // Filter columns based on selected filter
  const filteredColumns = columns.map((column) => {
    if (selectedFilter === "All") {
      return {
        ...column,
        tasks: column.tasks,
        count: column.tasks.length,
      };
    }

    const filterVariant = filterToVariant[selectedFilter];
    const filteredTasks = column.tasks.filter((task) =>
      task.tags.some((tag) => tag.variant === filterVariant),
    );

    return {
      ...column,
      tasks: filteredTasks,
      count: filteredTasks.length,
    };
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen w-full bg-white">
        <Sidebar />

        <div className="flex flex-1 flex-col gap-[10px] bg-[#F7F6F6] p-[9px_8px] overflow-hidden min-h-0">
          <div className="flex flex-1 flex-col gap-[30px] rounded-2xl bg-white p-[35px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)] overflow-auto min-h-0">
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <h1 className="text-[20px] font-semibold text-[hsl(var(--blue-black))]">
                    Task Board
                  </h1>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button className="flex h-[30px] items-center gap-[6px] rounded-[9px] bg-white px-0 py-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
                    <span className="rounded-[7px] px-[10px] py-[1px] text-[14px] font-medium text-[hsl(var(--blue-black))]">
                      Share +
                    </span>
                  </button>
                  <button className="flex h-[30px] items-center gap-[6px] rounded-[9px] bg-[hsl(var(--blue-black))] px-0 py-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
                    <span className="rounded-[7px] px-[10px] py-[1px] text-[14px] font-medium text-white">
                      New Task +
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex h-9 items-center w-fit gap-[6px] rounded-[9px] bg-white p-[5px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex h-[27px] items-center justify-center gap-[10px] rounded-[7px] px-[10px] transition-colors ${
                      selectedFilter === filter ? "bg-[#ECEBEB]" : ""
                    }`}
                  >
                    <span className="text-[13px] font-medium text-[hsl(var(--blue-black))]">
                      {filter}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-[14px] pb-4">
              {filteredColumns.map((column) => (
                <TaskColumn key={column.id} {...column} columnId={column.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.12),0_8px_16px_-4px_rgba(0,0,0,0.08)]">
            <TaskCard {...activeTask} taskId={activeTask.id} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
