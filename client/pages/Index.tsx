import { Sidebar } from "@/components/Sidebar";
import { TaskColumn } from "@/components/TaskColumn";

export default function Index() {
  const filters = ["All", "Work", "Planning", "Chores", "Social"];

  const columns = [
    {
      title: "Not Started",
      count: 4,
      color: "#FF5454",
      tasks: [
        {
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
      title: "In Progress",
      count: 3,
      color: "#058DFD",
      tasks: [
        {
          title: "Create home page",
          dueDate: "01 Nov 2025",
          description: "Js vs ts. Message Andy about benefits of each.",
          tags: [{ name: "Work", variant: "work" as const }],
          comments: 0,
          links: 0,
          timeRemaining: "2 days",
        },
        {
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
      title: "Complete",
      count: 3,
      color: "#3FBC66",
      tasks: [
        {
          title: "Message Andy",
          dueDate: "01 Nov 2025",
          description: "Remember to get milk and eggs for the cake.",
          tags: [{ name: "Work", variant: "work" as const }],
          comments: 15,
          links: 0,
          timeRemaining: "0 days",
        },
        {
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
      title: "On Hold",
      count: 1,
      color: "#B2B2B2",
      tasks: [
        {
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
  ];

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />

      <div className="flex flex-1 flex-col gap-[10px] overflow-auto bg-[#F7F6F6] p-[9px_8px]">
        <div className="flex flex-1 flex-col gap-[30px] rounded-2xl bg-white p-[35px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
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

            <div className="flex h-9 items-center gap-[6px] rounded-[9px] bg-white p-[5px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  className={`flex h-[27px] items-center justify-center gap-[10px] rounded-[7px] px-[10px] ${
                    index === 0 ? "bg-[#ECEBEB]" : ""
                  }`}
                >
                  <span className="text-[13px] font-medium text-[hsl(var(--blue-black))]">
                    {filter}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-[14px] overflow-x-auto pb-4">
            {columns.map((column, index) => (
              <TaskColumn key={index} {...column} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
