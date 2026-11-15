import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  CollisionDetection,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskCard, SORT_TRANSITION } from "@/components/TaskCard";
import { Task, Column } from "@/data/types";
import { defaultColumns } from "@/data/defaultData";

const RESTING_SHADOW =
  "0 0px 0px 0px rgba(0,0,0,0), 0 0px 0px 0px rgba(0,0,0,0)";
const LIFTED_SHADOW =
  "0 6px 12px -4px rgba(0,0,0,0.14), 0 14px 28px -8px rgba(0,0,0,0.12)";

// On drop, glide the overlay into the card's slot while untilting and
// lowering it, so it lands instead of snapping.
const dropAnimation: DropAnimation = {
  duration: SORT_TRANSITION.duration,
  easing: SORT_TRANSITION.easing,
  sideEffects: (params) => {
    const tilt =
      params.dragOverlay.node.querySelector<HTMLElement>("[data-drag-tilt]");
    tilt?.animate(
      [
        {
          transform: getComputedStyle(tilt).transform,
          boxShadow: LIFTED_SHADOW,
        },
        { transform: "none", boxShadow: RESTING_SHADOW },
      ],
      {
        duration: SORT_TRANSITION.duration,
        easing: SORT_TRANSITION.easing,
        fill: "forwards",
      },
    );
    return defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0" } },
    })(params);
  },
};

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
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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

  // Snapshot so Escape / cancel can restore the board exactly.
  const columnsBeforeDrag = useRef<Column[] | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewColumn = useRef(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewColumn.current = false;
    });
  }, [columns]);

  const findColumnId = (id: UniqueIdentifier): string | null => {
    if (columns.some((col) => col.id === id)) return id as string;
    return (
      columns.find((col) => col.tasks.some((task) => task.id === id))?.id ??
      null
    );
  };

  // Pointer-first collision detection: find the column under the pointer,
  // then the closest card inside it. Avoids the jitter you get from plain
  // rect intersection when cards jump between columns.
  const collisionDetection: CollisionDetection = useCallback(
    (args) => {
      const pointerHits = pointerWithin(args);
      const hits =
        pointerHits.length > 0 ? pointerHits : rectIntersection(args);
      let overId = getFirstCollision(hits, "id");

      if (overId != null) {
        const column = columns.find((col) => col.id === overId);
        if (column && column.tasks.length > 0) {
          const taskIds = new Set<UniqueIdentifier>(
            column.tasks.map((t) => t.id),
          );
          overId =
            closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter((c) =>
                taskIds.has(c.id),
              ),
            })[0]?.id ?? overId;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }

      // Right after a card changes column the layout is still shifting;
      // stick with the last target so it doesn't flicker back.
      if (recentlyMovedToNewColumn.current) {
        lastOverId.current = args.active.id;
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [columns],
  );

  const handleDragStart = (event: DragStartEvent) => {
    columnsBeforeDrag.current = columns;
    setActiveId(event.active.id as string);
    setOverColumnId(findColumnId(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setOverColumnId(null);
      return;
    }

    const fromColumnId = findColumnId(active.id);
    const toColumnId = findColumnId(over.id);
    setOverColumnId(toColumnId);

    if (!fromColumnId || !toColumnId || fromColumnId === toColumnId) return;

    // Move the card into the hovered column *during* the drag so the
    // other cards smoothly make room for it.
    setColumns((prev) => {
      const from = prev.find((c) => c.id === fromColumnId);
      const to = prev.find((c) => c.id === toColumnId);
      const task = from?.tasks.find((t) => t.id === active.id);
      if (!from || !to || !task) return prev;

      let newIndex = to.tasks.length;
      if (over.id !== toColumnId) {
        const overIndex = to.tasks.findIndex((t) => t.id === over.id);
        const translated = active.rect.current.translated;
        const isBelowOver =
          translated != null &&
          translated.top > over.rect.top + over.rect.height / 2;
        newIndex = overIndex >= 0 ? overIndex + (isBelowOver ? 1 : 0) : 0;
      }

      recentlyMovedToNewColumn.current = true;

      return prev.map((col) => {
        if (col.id === fromColumnId) {
          const tasks = col.tasks.filter((t) => t.id !== active.id);
          return { ...col, tasks, count: tasks.length };
        }
        if (col.id === toColumnId) {
          const tasks = [
            ...col.tasks.slice(0, newIndex),
            task,
            ...col.tasks.slice(newIndex),
          ];
          return { ...col, tasks, count: tasks.length };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumnId(null);
    columnsBeforeDrag.current = null;

    if (!over) return;

    const columnId = findColumnId(active.id);
    if (!columnId || columnId !== findColumnId(over.id)) return;

    // Reorder within the column.
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;
        const oldIndex = col.tasks.findIndex((t) => t.id === active.id);
        const newIndex = col.tasks.findIndex((t) => t.id === over.id);
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return col;
        return { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) };
      }),
    );
  };

  const handleDragCancel = () => {
    if (columnsBeforeDrag.current) setColumns(columnsBeforeDrag.current);
    columnsBeforeDrag.current = null;
    setActiveId(null);
    setOverColumnId(null);
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
      onDragCancel={handleDragCancel}
      collisionDetection={collisionDetection}
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
        <DragOverlay dropAnimation={dropAnimation}>
          {activeTask ? (
            <motion.div
              data-drag-tilt
              className="cursor-grabbing rounded-[11px]"
              initial={{ rotate: 0, scale: 1, boxShadow: RESTING_SHADOW }}
              animate={{ rotate: 2, scale: 1.03, boxShadow: LIFTED_SHADOW }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <TaskCard {...activeTask} taskId={activeTask.id} isOverlay />
            </motion.div>
          ) : null}
        </DragOverlay>
      </>
    </DndContext>
  );
}
