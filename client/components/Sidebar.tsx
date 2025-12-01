import { useState } from "react";
import {
  IconSearch,
  IconLayoutGrid,
  IconDashboard,
  IconTable,
  IconCircle,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

export function Sidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const allNavItems: NavItem[] = [
    {
      id: "task-board",
      label: "Task Board",
      active: location.pathname === "/",
      icon: <IconLayoutGrid className="h-5 w-5" />,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      active: location.pathname === "/dashboard",
      icon: <IconDashboard className="h-5 w-5" />,
    },
    {
      id: "table-view",
      label: "Table View",
      active: location.pathname === "/table-view",
      icon: <IconTable className="h-5 w-5" />,
    },
  ];

  const navItems = searchQuery
    ? allNavItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allNavItems;

  return (
    <motion.div
      className="flex h-screen flex-shrink-0 flex-col gap-5 bg-[#F7F6F6] p-[19px_15px_13px_15px] overflow-hidden"
      initial={false}
      animate={{
        width: isCollapsed ? "70px" : "201px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center flex-shrink-0">
          <IconCircle className="h-4 w-4 fill-[#363636] fill-opacity-80 stroke-[#5A5A5A] stroke-2" />
        </div>
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              className="flex flex-1 items-center justify-between overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[15.5px] font-medium text-[hsl(var(--blue-black))] whitespace-nowrap">
                DataHub
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-5 w-5 items-center justify-center text-[#626567] flex-shrink-0 hover:bg-white/50 rounded transition-colors"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? (
              <IconChevronRight className="h-5 w-5" />
            ) : (
              <IconChevronLeft className="h-5 w-5" />
            )}
          </motion.div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            className="flex h-[29px] items-center gap-[6px] rounded-md bg-[rgba(210,207,207,0.29)] px-[10px] overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "29px" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconSearch
              className="h-[14px] w-[14px] stroke-[#959595] opacity-50 flex-shrink-0"
              strokeWidth={1.1}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
              }}
              placeholder="Search"
              className="flex-1 bg-transparent border-none outline-none text-[13px] font-normal text-[#959595] placeholder:text-[#959595] placeholder:opacity-50"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-[10px]">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.span
              className="text-[13.5px] font-normal text-[hsl(var(--grey))] overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              Main
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === "task-board" ? "/" : `/${item.id}`}
              className={`flex h-[35px] items-center gap-[6px] rounded-[9px] px-[12px] ${
                isCollapsed ? "justify-center" : "justify-start"
              } ${
                item.active
                  ? "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]"
                  : ""
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div
                className={`h-5 w-5 flex-shrink-0 ${item.active ? "text-[hsl(var(--blue-black))]" : "text-[hsl(var(--med-grey))]"}`}
              >
                {item.icon}
              </div>
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    className={`text-[13px] font-medium overflow-hidden whitespace-nowrap ${
                      item.active
                        ? "text-[hsl(var(--blue-black))]"
                        : "text-[hsl(var(--med-grey))]"
                    }`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
