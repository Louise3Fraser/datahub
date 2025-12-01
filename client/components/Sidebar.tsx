import { useState } from "react";
import {
  IconLayoutGrid,
  IconDashboard,
  IconTable,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconChevronDown,
  IconChevronUp,
  IconFolder,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import placeholderUser from "@/assets/placeholder-user.png";
import datahubLogo from "@/assets/datahub-logo.png";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isViewsCollapsed, setIsViewsCollapsed] = useState(false);
  const [isWorkspacesCollapsed, setIsWorkspacesCollapsed] = useState(false);

  const navItems: NavItem[] = [
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

  return (
    <motion.div
      className="flex h-screen flex-shrink-0 flex-col gap-5 bg-[#F7F6F6] p-[19px_15px_13px_15px] overflow-x-hidden overflow-y-auto"
      initial={false}
      animate={{
        width: isCollapsed ? "70px" : "240px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.img
                src={datahubLogo}
                alt="Datahub logo"
                className="ml-1 h-4 w-4 flex-shrink-0 object-contain"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                className="text-[15px] font-semibold text-[hsl(var(--blue-black))] whitespace-nowrap overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Datable
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex h-5 w-5 items-center justify-center text-[#626567] flex-shrink-0 hover:bg-white/50 rounded transition-colors ${
            isCollapsed ? "mr-[10px]" : ""
          }`}
        >
          {isCollapsed ? (
            <IconLayoutSidebarRightCollapse className="h-5 w-5" />
          ) : (
            <IconLayoutSidebarLeftCollapse className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            className="flex items-center gap-3 rounded-lg bg-white px-1 py-1 shadow-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 rounded-lg bg-[#F7F6F6] p-1 shadow-mini">
              <img
                src={placeholderUser}
                alt="User profile"
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[14px] font-semibold text-[hsl(var(--blue-black))] truncate">
                Jane Doe
              </span>
              <span className="text-[12px] font-normal text-[hsl(var(--med-grey))]">
                Premium Tier
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[5px]">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.button
                onClick={() => setIsViewsCollapsed(!isViewsCollapsed)}
                className="flex items-center justify-between text-[13.5px] font-medium text-[hsl(var(--grey))] overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[13.5px] font-normal">Views</span>
                <motion.div
                  animate={{ rotate: isViewsCollapsed ? -90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {(isCollapsed || !isViewsCollapsed) && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id === "task-board" ? "/" : `/${item.id}`}
                    className={`flex h-[35px] items-center gap-[6px] rounded-[9px] px-[12px] ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } ${item.active ? "bg-white shadow-overlay" : ""}`}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-[5px]">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.button
                onClick={() => setIsWorkspacesCollapsed(!isWorkspacesCollapsed)}
                className="flex items-center justify-between text-[13.5px] font-medium text-[hsl(var(--grey))] overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[13.5px] font-normal">Workspaces</span>
                <motion.div
                  animate={{ rotate: isWorkspacesCollapsed ? -90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {!isCollapsed && !isWorkspacesCollapsed && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {["Work", "Christmas 2025", "Table", "Batmizva"].map(
                  (workspace) => (
                    <button
                      key={workspace}
                      className="flex h-[35px] items-center gap-[6px] rounded-[9px] px-[12px] justify-start hover:bg-white/50 transition-colors"
                    >
                      <IconFolder className="h-5 w-5 flex-shrink-0 text-[hsl(var(--med-grey))]" />
                      <span className="text-[13px] font-medium text-[hsl(var(--med-grey))] overflow-hidden whitespace-nowrap">
                        {workspace}
                      </span>
                    </button>
                  ),
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
