import {
  useSortable,
  defaultAnimateLayoutChanges,
  type AnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconClock,
  IconFlag,
  IconLink,
  IconMessageCircle,
  IconDotsVertical,
} from "@tabler/icons-react";

interface Tag {
  name: string;
  variant: "work" | "planning" | "chores" | "social" | "health";
}

interface TaskCardProps {
  title: string;
  dueDate: string;
  description: string;
  tags: Tag[];
  comments: number;
  links: number;
  timeRemaining: string;
  taskId?: string;
  isOverlay?: boolean;
}

const tagStyles = {
  work: "bg-[hsl(var(--tag-work-bg))] text-[hsl(var(--tag-work-text))]",
  planning:
    "bg-[hsl(var(--tag-planning-bg))] text-[hsl(var(--tag-planning-text))]",
  chores: "bg-[hsl(var(--tag-chores-bg))] text-[hsl(var(--tag-chores-text))]",
  social: "bg-[hsl(var(--tag-social-bg))] text-[hsl(var(--tag-social-text))]",
  health: "bg-[hsl(var(--tag-health-bg))] text-[hsl(var(--tag-health-text))]",
};

// Keep animating after a drop so cards glide into their final slot
// instead of snapping.
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export const SORT_TRANSITION = {
  duration: 260,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
};

export function TaskCard(props: TaskCardProps) {
  if (props.isOverlay || !props.taskId) return <TaskCardView {...props} />;
  return <SortableTaskCard {...props} taskId={props.taskId} />;
}

function SortableTaskCard(props: TaskCardProps & { taskId: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.taskId,
    animateLayoutChanges,
    transition: SORT_TRANSITION,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...listeners}
      {...attributes}
      className="relative cursor-grab touch-none outline-none active:cursor-grabbing"
    >
      {/* While dragging, the original stays put as a soft placeholder;
          the DragOverlay is what follows the pointer. */}
      <div className={`${isDragging ? "opacity-0" : "opacity-100"}`}>
        <TaskCardView {...props} />
      </div>
      {isDragging && (
        <div className="absolute inset-0 rounded-[11px] border-2 border-dashed border-[#d9d6d3] bg-[#efedeb]" />
      )}
    </div>
  );
}

function TaskCardView({
  title,
  description,
  tags,
  comments,
  links,
  timeRemaining,
}: TaskCardProps) {
  return (
    <div>
      <div className="flex flex-col gap-[17px] rounded-[11px] bg-white p-[15px_13px] shadow-overlay ">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex-1 text-[15px] font-medium leading-normal text-[#3E3A36]">
            {title}
          </h3>
          <button className="flex h-4 w-4 items-center justify-center">
            <IconDotsVertical
              className="h-4 w-4 stroke-[#959595]"
              strokeWidth={2.5}
            />
          </button>
        </div>

        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[5px]">
            <p className="flex-1 text-[14px] font-normal leading-normal text-[hsl(var(--med-grey))]">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-[5px]">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`rounded-[5.5px] px-[5.5px] py-[3.5px] text-[12.5px] font-medium ${tagStyles[tag.variant]}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <svg className="w-full" height="2" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#959595"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.29"
          />
        </svg>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[9px]">
            <div className="flex items-center gap-[3px]">
              <IconMessageCircle
                className="h-[15.5px] w-[15.5px] stroke-[#959595]"
                strokeWidth={2.5}
              />
              <span className="text-[13.5px] font-medium text-[#959595]">
                {comments}
              </span>
            </div>
            <div className="flex items-center gap-[3px]">
              <IconLink
                className="h-[15.5px] w-[15.5px] stroke-[#959595]"
                strokeWidth={2.5}
              />
              <span className="text-[13.5px] font-medium text-[#959595]">
                {links}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[3px]">
            <IconClock
              className="h-[15.5px] w-[15.5px] stroke-[#959595]"
              strokeWidth={2.5}
            />
            <span className="text-[13.5px] font-medium text-[#959595]">
              {timeRemaining}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
