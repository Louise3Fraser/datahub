import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskCard } from "@/components/TaskCard";
import { Task, Column } from "@/data/types";
import { defaultColumns } from "@/data/defaultData";

export default function TaskBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const filters = ["All", "Work", "Planning", "Chores", "Social"];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [columns, setColumns] = useState<Column[]>(defaultColumns);

  // Load tasks from localStorage on mount and when navigating back
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((col) => {
          const columnTasks = tasks.filter(
            (task: Task & { columnId?: string }) => task.columnId === col.id,
          );
          // Merge with existing tasks, avoiding duplicates
          const existingTaskIds = new Set(col.tasks.map((t) => t.id));
          const newTasks = columnTasks.filter(
            (task: Task) => !existingTaskIds.has(task.id),
          );
          return {
            ...col,
            tasks: [...col.tasks, ...newTasks],
            count: col.tasks.length + newTasks.length,
          };
        });
        return updatedColumns;
      });
    }
  }, [location.pathname]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over && typeof over.id === "string") {
      // Only highlight if hovering over a column, not a task
      const isColumn = columns.some((col) => col.id === over.id);
      if (isColumn) {
        setOverColumnId(over.id);
      } else {
        // Find the column that contains this task
        const column = columns.find((col) =>
          col.tasks.some((task) => task.id === over.id),
        );
        if (column) {
          setOverColumnId(column.id);
        } else {
          setOverColumnId(null);
        }
      }
    } else {
      setOverColumnId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumnId(null);

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
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <>
        <div className="flex flex-1 flex-col gap-[10px] bg-[#F7F6F6] p-[9px_8px] overflow-hidden min-h-0">
          <div className="flex flex-1 flex-col gap-[30px] rounded-xl bg-white p-[35px] shadow-overlay overflow-auto min-h-0">
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <h1 className="text-[20px] font-semibold text-[hsl(var(--blue-black))]">
                    Task Board
                  </h1>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button className="flex h-[30px] items-center gap-[6px] rounded-[8px] bg-blue-black px-0 py-[3px] shadow-overlay">
                    <span className="rounded-[7px] px-[10px] py-[1px] text-[13.5px] font-normal text-[hsl(var(--blue-black))]">
                      Share +
                    </span>
                  </button>
                  <button
                    onClick={() => navigate("/add-task")}
                    className="flex h-[30px] items-center gap-[6px] rounded-[8px] bg-[var(--blue-black)] px-0 py-[3px] shadow-overlay hover:opacity-90 transition-opacity"
                  >
                    <span className="rounded-[7px] px-[10px] py-[1px] text-[13.5px] font-normal text-white">
                      New Task +
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative flex h-9 items-center w-fit gap-[6px] rounded-[9px] bg-white p-[3px] shadow-overlay">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className="relative flex h-[30px] items-center justify-center gap-[10px] rounded-[7px] px-[10px] transition-colors z-10"
                  >
                    {selectedFilter === filter && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 rounded-[7px] bg-[#F7F6F6]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative text-[13px] font-medium ${
                        selectedFilter === filter
                          ? "text-[hsl(var(--blue-black))]"
                          : "text-[hsl(var(--med-grey))]"
                      }`}
                    >
                      {filter}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-[14px] pb-4">
              {filteredColumns.map((column) => (
                <TaskColumn
                  key={column.id}
                  {...column}
                  columnId={column.id}
                  isOver={overColumnId === column.id}
                />
              ))}
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
      </>
    </DndContext>
  );
}
