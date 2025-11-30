import { Clock, Flag, Link2, MessageCircle } from "lucide-react";

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
}: TaskCardProps) {
  return (
    <div className="flex flex-col gap-[17px] rounded-[17px] bg-white p-[15px_13px] shadow-[0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex-1 text-[15.5px] font-medium leading-normal text-[#3E3A36]">
          {title}
        </h3>
        <button className="flex h-4 w-4 items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M8 8.66666C8.36819 8.66666 8.66667 8.36818 8.66667 7.99999C8.66667 7.63181 8.36819 7.33333 8 7.33333C7.63181 7.33333 7.33333 7.63181 7.33333 7.99999C7.33333 8.36818 7.63181 8.66666 8 8.66666Z"
                stroke="#959595"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13.3333C8.36819 13.3333 8.66667 13.0349 8.66667 12.6667C8.66667 12.2985 8.36819 12 8 12C7.63181 12 7.33333 12.2985 7.33333 12.6667C7.33333 13.0349 7.63181 13.3333 8 13.3333Z"
                stroke="#959595"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4.00001C8.36819 4.00001 8.66667 3.70153 8.66667 3.33334C8.66667 2.96515 8.36819 2.66667 8 2.66667C7.63181 2.66667 7.33333 2.96515 7.33333 3.33334C7.33333 3.70153 7.63181 4.00001 8 4.00001Z"
                stroke="#959595"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center gap-[5px]">
          <Flag
            className="h-[14px] w-[14px] stroke-[#959595]"
            strokeWidth={1.25}
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

      <div className="h-[1.2px] w-full bg-[#959595] opacity-[0.29]"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <div className="flex items-center gap-[3px]">
            <MessageCircle
              className="h-[14px] w-[14px] stroke-[#959595]"
              strokeWidth={1.25}
            />
            <span className="text-[13.5px] font-medium text-[#959595]">
              {comments}
            </span>
          </div>
          <div className="flex items-center gap-[3px]">
            <Link2
              className="h-[14px] w-[14px] stroke-[#959595]"
              strokeWidth={1.25}
            />
            <span className="text-[13.5px] font-medium text-[#959595]">
              {links}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[3px]">
          <Clock
            className="h-[14px] w-[14px] stroke-[#959595]"
            strokeWidth={1.25}
          />
          <span className="text-[13.5px] font-medium text-[#959595]">
            {timeRemaining}
          </span>
        </div>
      </div>
    </div>
  );
}
