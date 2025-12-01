import { useDraggable } from "@dnd-kit/core";
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

export function TaskCard({
  title,
  dueDate,
  description,
  tags,
  comments,
  links,
  timeRemaining,
  taskId,
  isOverlay = false,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: taskId || `task-${Math.random()}`,
      disabled: isOverlay,
    });

  const style = isOverlay
    ? {}
    : {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
      };

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      className={`flex flex-col gap-[17px] rounded-[17px] bg-white p-[15px_13px] shadow-[0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)] ${
        isOverlay ? "" : "cursor-grab active:cursor-grabbing touch-none"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex-1 text-[15.5px] font-medium leading-normal text-[#3E3A36]">
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
          <IconFlag
            className="h-[14px] w-[14px] stroke-[#959595]"
            strokeWidth={2.5}
          />
          <span className="text-[13.5px] font-medium text-[#959595]">
            {dueDate}
          </span>
        </div>

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

      <div className="w-full border-t-[1.2px] border-dashed border-[#959595] opacity-[0.29]"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <div className="flex items-center gap-[3px]">
            <IconMessageCircle
              className="h-[14px] w-[14px] stroke-[#959595]"
              strokeWidth={2.5}
            />
            <span className="text-[13.5px] font-medium text-[#959595]">
              {comments}
            </span>
          </div>
          <div className="flex items-center gap-[3px]">
            <IconLink
              className="h-[14px] w-[14px] stroke-[#959595]"
              strokeWidth={2.5}
            />
            <span className="text-[13.5px] font-medium text-[#959595]">
              {links}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[3px]">
          <IconClock
            className="h-[14px] w-[14px] stroke-[#959595]"
            strokeWidth={2.5}
          />
          <span className="text-[13.5px] font-medium text-[#959595]">
            {timeRemaining}
          </span>
        </div>
      </div>
    </div>
  );
}
