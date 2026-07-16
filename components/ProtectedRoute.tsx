"use client";

import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: string;
}

const getUserRole = (session: unknown): string | undefined => {
  const sessionUser = (session as { user?: { role?: string } } | undefined)
    ?.user;
  return sessionUser?.role?.toLowerCase();
};

export default function ProtectedRoute({
  children,
  requireRole,
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const role = getUserRole(session);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  useEffect(() => {
    if (isPending) {
      const timeoutId = window.setTimeout(() => {
        setFallbackTriggered(true);
      }, 2500);

      return () => window.clearTimeout(timeoutId);
    }

    if (!session) {
      router.replace("/login");
      return;
    }

    if (requireRole && role !== requireRole) {
      router.replace("/dashboard/user");
      return;
    }

    if (!requireRole && role === requireRole) {
      router.replace("/dashboard/admin");
    }
  }, [isPending, role, requireRole, router, session]);

  if (isPending || !session || fallbackTriggered) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0B0B0C]">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (requireRole && role !== requireRole) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0B0B0C]">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (!requireRole && role === requireRole) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-[#0B0B0C]">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  return <>{children}</>;
}
