import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <Outlet />
    </div>
  );
}
