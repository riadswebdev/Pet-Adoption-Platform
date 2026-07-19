"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  LogOut,
  PawPrint,
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Pets", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const links = publicLinks;

  const isActive = (path: string) => pathname === path;

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary-start" />
              <span className="font-bold text-xl text-gradient">PetAdopt</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary-start ${
                  isActive(link.href) ?
                    "text-primary-start bg-foreground/5"
                  : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-2">
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label="Toggle theme"
                className="text-foreground/70 hover:text-orange-500 hover:bg-default-100 transition-colors"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {mounted && theme === "light" ?
                  <Sun className="h-5 w-5 transition-transform duration-300 scale-100 text-amber-500" />
                : <Moon className="h-5 w-5 transition-transform duration-300 scale-100 text-indigo-500" />
                }
              </Button>

              {session ?
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
                    <Dropdown.Menu aria-label="Profile Actions">
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
                      <Dropdown.Item
                        onClick={() =>
                          router.push(
                            `/dashboard/${(session?.user as { role?: string } | undefined)?.role || "user"}`,
                          )
                        }
                        key="dashboard"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="text-danger"
                      >
                        <LogOut size={16} />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              : <>
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-primary text-white">
                      Register
                    </Button>
                  </Link>
                </>
              }
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary-start hover:bg-foreground/5 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ?
                <X className="block h-6 w-6" />
              : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-foreground/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href) ?
                    "text-primary-start bg-foreground/5"
                  : "text-foreground/80 hover:text-primary-start hover:bg-foreground/5"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-foreground/10">
              {session ?
                <div className="space-y-2">
                  <Link
                    href={`/dashboard/${(session?.user as { role?: string } | undefined)?.role || "user"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="ghost" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    fullWidth
                    onPress={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              : <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button
                      className="bg-gradient-primary text-white"
                      fullWidth
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
