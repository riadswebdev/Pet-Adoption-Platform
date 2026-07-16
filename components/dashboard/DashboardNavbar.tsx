"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { Menu, Home, LogOut, Sun, Moon, PawPrint } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#0B0B0C]/80 border-b border-foreground/10 px-4 h-16 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          variant="ghost"
          onPress={onMenuClick}
          className="md:hidden text-foreground"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </Button>

        <Link href="/" className="md:hidden flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary-500" />
          <span className="font-bold text-lg">PetAdopt</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          className="text-foreground/70"
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted && theme === "light" ?
            <Sun className="h-5 w-5 text-amber-500" />
          : <Moon className="h-5 w-5 text-indigo-500" />}
        </Button>

        <Dropdown>
          <Dropdown.Trigger className="rounded-full p-0 min-w-0 bg-transparent">
            <Avatar size='sm' className="bg-foreground/10 dark:bg-foreground/20">
              <Avatar.Image
                alt="User avatar"
                src={session?.user?.image || undefined}
              />
              <Avatar.Fallback>
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu
              aria-label="Profile Actions"
              onAction={(key) => {
                if (key === "home") router.push("/");
                if (key === "logout") handleLogout();
              }}
            >
              <Dropdown.Item
                key="profile"
                className="h-14 gap-2 cursor-default"
              >
                <div className="flex flex-col">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-foreground/70">
                    {session?.user?.email}
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => router.push("/")}>
                <Home size={16} />
                Back to Home
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <LogOut size={16} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </nav>
  );
}
