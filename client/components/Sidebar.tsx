import { Search } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

export function Sidebar() {
  const navItems: NavItem[] = [
    {
      id: "task-board",
      label: "Task Board",
      active: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip0)">
            <path
              d="M15 3.33333H5C4.07952 3.33333 3.33333 4.07952 3.33333 4.99999V15C3.33333 15.9205 4.07952 16.6667 5 16.6667H15C15.9205 16.6667 16.6667 15.9205 16.6667 15V4.99999C16.6667 4.07952 15.9205 3.33333 15 3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33333 10H16.6667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 3.33333V16.6667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip1)">
            <path
              d="M3.33333 3.33333H8.33333V8.33333H3.33333V3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.6667 3.33333H16.6667V8.33333H11.6667V3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33333 11.6667H8.33333V16.6667H3.33333V11.6667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1667 16.6667C15.5474 16.6667 16.6667 15.5474 16.6667 14.1667C16.6667 12.786 15.5474 11.6667 14.1667 11.6667C12.786 11.6667 11.6667 12.786 11.6667 14.1667C11.6667 15.5474 12.786 16.6667 14.1667 16.6667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip1">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: "table-view",
      label: "Table View",
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip2)">
            <path
              d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 4.99999V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V4.99999C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.83333 6.66667H14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.83333 10H14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.83333 13.3333H14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip2">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen w-[201px] flex-shrink-0 flex-col gap-5 bg-[#F7F6F6] p-[19px_15px_13px_15px]">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clipPath="url(#clip-logo)">
              <rect
                x="2"
                y="2"
                width="16"
                height="16"
                rx="8"
                fill="#363636"
                fillOpacity="0.81"
              />
              <path
                d="M10 16C11.4728 16 12.6667 13.3137 12.6667 10C12.6667 6.68629 11.4728 4 10 4C8.52724 4 7.33333 6.68629 7.33333 10C7.33333 13.3137 8.52724 16 10 16Z"
                stroke="#F4F4F4"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 10C4 11.4728 6.68629 12.6667 10 12.6667C13.3137 12.6667 16 11.4728 16 10C16 8.52724 13.3137 7.33333 10 7.33333C6.68629 7.33333 4 8.52724 4 10Z"
                stroke="#F4F4F4"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="9"
              stroke="#5A5A5A"
              strokeWidth="2"
            />
            <defs>
              <clipPath id="clip-logo">
                <rect x="2" y="2" width="16" height="16" rx="8" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <span className="text-[16.5px] font-medium text-[hsl(var(--blue-black))]">
            Datable
          </span>
          <button className="flex h-5 w-5 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip-collapse)">
                <path
                  d="M17 3.33333H6.99999C6.07952 3.33333 5.33333 4.07953 5.33333 5V15C5.33333 15.9205 6.07952 16.6667 6.99999 16.6667H17C17.9205 16.6667 18.6667 15.9205 18.6667 15V5C18.6667 4.07953 17.9205 3.33333 17 3.33333Z"
                  stroke="#626567"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 4L9.5 16"
                  stroke="#626567"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 8.33333L12.8333 10L14.5 11.6667"
                  stroke="#626567"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip-collapse">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex h-[29px] items-center gap-[6px] rounded-md bg-[rgba(210,207,207,0.29)] px-[10px]">
        <Search
          className="h-[14px] w-[14px] stroke-[#959595] opacity-50"
          strokeWidth={1.1}
        />
        <span className="text-[13px] font-normal text-[#959595] opacity-50">
          Search
        </span>
      </div>

      <div className="flex flex-col gap-[10px]">
        <span className="text-[13.5px] font-normal text-[hsl(var(--grey))]">
          Main
        </span>
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === "task-board" ? "/" : `/${item.id}`}
              className={`flex h-9 items-center gap-[6px] rounded-[9px] px-[14px_10px_10px_14px] ${
                item.active
                  ? "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]"
                  : ""
              }`}
            >
              <div
                className={`h-5 w-5 ${item.active ? "text-[hsl(var(--blue-black))]" : "text-[hsl(var(--med-grey))]"}`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[13px] font-medium ${
                  item.active
                    ? "text-[hsl(var(--blue-black))]"
                    : "text-[hsl(var(--med-grey))]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
