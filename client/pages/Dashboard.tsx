import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#F7F6F6] p-8">
        <div className="rounded-2xl bg-white p-12 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_-1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.04)]">
          <h1 className="mb-4 text-2xl font-semibold text-[hsl(var(--blue-black))]">
            Dashboard
          </h1>
          <p className="text-[hsl(var(--med-grey))]">
            This page is under construction. Continue prompting to fill in the content.
          </p>
        </div>
      </div>
    </div>
  );
}
