import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { Task } from "@/data/types";

const tagVariants: Array<"work" | "planning" | "chores" | "social" | "health"> =
  ["work", "planning", "chores", "social", "health"];

const tagLabels: Record<string, string> = {
  work: "Work",
  planning: "Planning",
  chores: "Chores",
  social: "Social",
  health: "Health",
};

const tagStyles = {
  work: "bg-[hsl(var(--tag-work-bg))] text-[hsl(var(--tag-work-text))]",
  planning:
    "bg-[hsl(var(--tag-planning-bg))] text-[hsl(var(--tag-planning-text))]",
  chores: "bg-[hsl(var(--tag-chores-bg))] text-[hsl(var(--tag-chores-text))]",
  social: "bg-[hsl(var(--tag-social-bg))] text-[hsl(var(--tag-social-text))]",
  health: "bg-[hsl(var(--tag-health-bg))] text-[hsl(var(--tag-health-text))]",
};

export default function AddTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<
    Array<"work" | "planning" | "chores" | "social" | "health">
  >([]);

  const handleToggleTag = (
    variant: "work" | "planning" | "chores" | "social" | "health",
  ) => {
    setSelectedTags((prev) =>
      prev.includes(variant)
        ? prev.filter((tag) => tag !== variant)
        : [...prev, variant],
    );
  };

  const calculateTimeRemaining = (dateString: string): string => {
    if (!dateString) return "";
    const due = new Date(dateString);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past due";
    if (diffDays === 0) return "0 days";
    if (diffDays === 1) return "1 day";
    return `${diffDays} days`;
  };

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !dueDate) {
      alert("Please fill in all required fields (Title and Due Date)");
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "",
      dueDate: formatDateForDisplay(dueDate),
      tags: selectedTags.map((variant) => ({
        name: tagLabels[variant],
        variant,
      })),
      comments: 0,
      links: 0,
      timeRemaining: calculateTimeRemaining(dueDate),
    };

    // Store in localStorage for now (can be replaced with API call later)
    const existingTasks = localStorage.getItem("tasks");
    const tasks = existingTasks ? JSON.parse(existingTasks) : [];
    tasks.push({ ...newTask, columnId: "not-started" });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    navigate("/");
  };

  return (
    <div className="flex flex-1 flex-col gap-[10px] bg-[#F7F6F6] p-[9px_8px] overflow-hidden min-h-0">
      <div className="flex flex-1 flex-col gap-[30px] rounded-2xl bg-white p-[35px] shadow-overlay overflow-auto min-h-0">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-semibold text-[hsl(var(--blue-black))]">
            Add New Task
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] hover:bg-[#F7F6F6] transition-colors"
          >
            <IconX className="h-5 w-5 stroke-[#959595]" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <div className="grid grid-cols-[90px_1fr] gap-4 items-center py-6">
            <label
              htmlFor="title"
              className="text-[14px] font-medium text-[hsl(var(--blue-black))]"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-[60%] rounded-[9px] shadow-overlay border-[#E5E5E5] bg-white px-4 py-2 text-[14px] font-normal text-[hsl(var(--blue-black))] placeholder:text-[hsl(var(--med-grey))] focus:border-[hsl(var(--blue-black))] focus:outline-none transition-colors"
              required
            />
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

          <div className="grid grid-cols-[90px_1fr] gap-4 items-start py-6">
            <label
              htmlFor="description"
              className="text-[14px] font-medium text-[hsl(var(--blue-black))]"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-[60%] rounded-[9px] shadow-overlay border-[#E5E5E5] bg-white px-4 py-2 text-[14px] font-normal text-[hsl(var(--blue-black))] placeholder:text-[hsl(var(--med-grey))] focus:border-[hsl(var(--blue-black))] focus:outline-none transition-colors resize-none"
            />
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

          {/* Due Date Section */}
          <div className="grid grid-cols-[90px_1fr] gap-4 items-center py-6">
            <label
              htmlFor="dueDate"
              className="text-[14px] font-medium text-[hsl(var(--blue-black))]"
            >
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-[60%] rounded-[9px] shadow-overlay border-[#E5E5E5] bg-white px-4 py-2 text-[14px] font-normal text-[hsl(var(--blue-black))] focus:border-[hsl(var(--blue-black))] focus:outline-none transition-colors"
              required
            />
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

          {/* Tags Section */}
          <div className="grid grid-cols-[90px_1fr] gap-4 items-center py-6">
            <label className="text-[14px] font-medium text-[hsl(var(--blue-black))]">
              Tags
            </label>
            <div className="w-[60%] flex flex-wrap gap-2">
              {tagVariants.map((variant) => {
                const isSelected = selectedTags.includes(variant);
                return (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => handleToggleTag(variant)}
                    className={`rounded-[5.5px] px-[5.5px] py-[3.5px] text-[12.5px] font-medium transition-opacity ${
                      isSelected
                        ? tagStyles[variant]
                        : "bg-[#F7F6F6] text-[hsl(var(--med-grey))] hover:opacity-70"
                    }`}
                  >
                    {tagLabels[variant]}
                  </button>
                );
              })}
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

          <div className="flex items-center justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-[9px] border-2 border-[#E5E5E5] bg-white px-6 py-2 text-[14px] font-medium text-[hsl(var(--blue-black))] hover:bg-[#F7F6F6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[9px] bg-[hsl(var(--blue-black))] px-6 py-2 text-[14px] font-medium text-white hover:opacity-90 transition-opacity shadow-overlay"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
