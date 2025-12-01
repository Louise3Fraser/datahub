import { Column } from "./types";

export const defaultColumns: Column[] = [
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
        description:
          "Pick up groceries for the week. Need fresh produce, dairy products, and pantry staples.",
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
        description:
          "Morning jog at the park. Bring water bottle and check the weather forecast beforehand.",
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
        description:
          "Follow up on the project proposal discussion. Ask about timeline and next steps.",
        tags: [{ name: "Work", variant: "work" as const }],
        comments: 15,
        links: 0,
        timeRemaining: "0 days",
      },
      {
        id: "task-8",
        title: "Pick up honey ham",
        dueDate: "18 Nov 2025",
        description:
          "Order from the deli counter. Pre-order to ensure availability for the family gathering.",
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
        description:
          "Research flights, accommodations, and activities. Create itinerary for Sydney, Melbourne, and Great Barrier Reef visit.",
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
        description:
          "Remove all items, clean shelves and drawers. Check expiration dates and organize contents properly.",
        tags: [{ name: "Chores", variant: "chores" as const }],
        comments: 0,
        links: 0,
        timeRemaining: "Past due",
      },
    ],
  },
];
