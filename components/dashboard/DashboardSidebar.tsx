"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Drawer } from "@heroui/react";
import {
  LayoutDashboard,
  PlusCircle,
  PawPrint,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface DashboardSidebarProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function DashboardSidebar({
  isOpen,
  onOpenChange,
}: DashboardSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin =
    (session?.user as { role?: string } | undefined)?.role === "admin";
  const roleBase = isAdmin ? "/dashboard/admin" : "/dashboard/user";

  const adminLinks = [
    { name: "Overview", href: roleBase, icon: LayoutDashboard },
    { name: "Manage Pets", href: `${roleBase}/pets`, icon: PawPrint },
    { name: "Manage Users", href: `${roleBase}/users`, icon: Users },
  ];

  const userLinks = [
    { name: "Overview", href: roleBase, icon: LayoutDashboard },
    { name: "Add Pet", href: `${roleBase}/add-pet`, icon: PlusCircle },
    { name: "Manage Pets", href: `${roleBase}/manage-pets`, icon: PawPrint },
    { name: "Profile", href: `${roleBase}/profile`, icon: UserCircle },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const isActive = (path: string) => {
    if (path === roleBase) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen w-[20%] overflow-hidden shrink-0">
        <SidebarContent
          isAdmin={isAdmin}
          links={links}
          handleLogout={handleLogout}
          isActive={isActive}
        />
      </aside>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <Drawer.Backdrop>
          <Drawer.Content
            placement="left"
            className="bg-white dark:bg-[#121214] rounded-r-none w-72 max-w-[90vw] h-full"
          >
            <Drawer.Dialog className="h-full">
              <Drawer.Handle />
              <Drawer.CloseTrigger />
              <Drawer.Header className="border-b border-foreground/10 py-4 h-16">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => onOpenChange()}
                >
                  <PawPrint className="h-6 w-6 text-[#FF6B35]" />
                  <span className="font-bold text-lg text-gradient">
                    PetAdopt
                  </span>
                </Link>
              </Drawer.Header>
              <Drawer.Body className="p-0 h-full overflow-hidden">
                <SidebarContent
                  isAdmin={isAdmin}
                  links={links}
                  onOpenChange={onOpenChange}
                  handleLogout={handleLogout}
                  isActive={isActive}
                />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}

interface SidebarContentProps {
  isAdmin: boolean;
  links: {
    name: string;
    href: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
  }[];
  onOpenChange?: () => void;
  handleLogout: () => void;
  isActive: (path: string) => boolean;
}

function SidebarContent({
  isAdmin,
  links,
  onOpenChange,
  handleLogout,
  isActive,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121214] border-r border-foreground/10 text-foreground w-full shrink-0 transition-colors">
      <div className="p-6 h-16 hidden md:flex items-center border-b border-foreground/10 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="h-8 w-8 text-[#FF6B35]" />
          <span className="font-bold text-xl text-gradient">PetAdopt</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4 px-2">
          {isAdmin ? "Admin Navigation" : "User Navigation"}
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onOpenChange}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                active ?
                  "bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-medium shadow-md shadow-orange-500/20"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <Icon
                size={20}
                className={active ? "text-white" : "text-foreground/60"}
              />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-foreground/10 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
