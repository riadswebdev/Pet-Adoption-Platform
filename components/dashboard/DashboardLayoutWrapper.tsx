"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";


export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0B0B0C]">
      {/* Sidebar for Desktop, Drawer for Mobile */}
      <DashboardSidebar isOpen={isOpen} onOpenChange={onOpenChange} />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <DashboardNavbar onMenuClick={onOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
