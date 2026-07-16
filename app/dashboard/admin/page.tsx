"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiClient } from "../../lib/api-client";
import { Card, CardContent, CardHeader } from "@heroui/react";
import { Users, Dog, Activity } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalPets: number;
  adoptionRequests: number;
  availablePets: number;
  adoptedPets: number;
}

interface RecentActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  actor: string;
}

const emptyStats: AdminStats = {
  totalUsers: 0,
  totalPets: 0,
  adoptionRequests: 0,
  availablePets: 0,
  adoptedPets: 0,
};

const normalizeStats = (data: unknown): AdminStats => {
  const payload = (data as Partial<AdminStats> | null) ?? {};

  return {
    totalUsers: Number(payload.totalUsers) || 0,
    totalPets: Number(payload.totalPets) || 0,
    adoptionRequests: Number(payload.adoptionRequests) || 0,
    availablePets: Number(payload.availablePets) || 0,
    adoptedPets: Number(payload.adoptedPets) || 0,
  };
};

const normalizeActivities = (data: unknown): RecentActivityItem[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter((item): item is Record<string, unknown> =>
      Boolean(item && typeof item === "object"),
    )
    .map((item) => ({
      id: String(item.id ?? item.title ?? item.createdAt ?? Math.random()),
      type: String(item.type ?? "activity"),
      title: String(item.title ?? "Activity"),
      description: String(item.description ?? "Recent platform activity"),
      createdAt: String(item.createdAt ?? new Date().toISOString()),
      actor: String(item.actor ?? "System"),
    }))
    .filter((item) => Boolean(item.title));
};

const formatActivityDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function AdminDashboardHome() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<AdminStats>(emptyStats);
  const [activities, setActivities] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      const timeoutId = window.setTimeout(() => {
        setStats(emptyStats);
        setActivities([]);
        setLoading(false);
        setActivityLoading(false);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    let isMounted = true;
    const fallbackTimer = window.setTimeout(() => {
      if (isMounted) {
        setStats(emptyStats);
        setLoading(false);
        setActivityLoading(false);
      }
    }, 8000);

    const loadDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          apiClient("/api/pets/admin/stats", { timeoutMs: 8000 }),
          apiClient("/api/pets/admin/recent-activity", { timeoutMs: 8000 }),
        ]);

        if (isMounted) {
          setStats(normalizeStats(statsData));
          setActivities(normalizeActivities(activityData));
        }
      } catch (error) {
        console.error("Failed to load admin dashboard data", error);
        if (isMounted) {
          setStats(emptyStats);
          setActivities([]);
        }
      } finally {
        if (isMounted) {
          clearTimeout(fallbackTimer);
          setLoading(false);
          setActivityLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [session?.user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
          Admin Dashboard
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          Overview of platform statistics and global activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Total Users
            </h3>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : stats.totalUsers}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Registered accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Total Pets
            </h3>
            <Dog className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : stats.totalPets}
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">
                {loading ? "—" : `${stats.availablePets} Available`}
              </span>
              <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full dark:bg-zinc-800 dark:text-zinc-400">
                {loading ? "—" : `${stats.adoptedPets} Adopted`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Adoption Requests
            </h3>
            <Activity className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : stats.adoptionRequests}
            </div>
            <p className="text-xs text-zinc-500 mt-1">Pending approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <Card className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Recent Activity
            </h3>
          </CardHeader>
          <CardContent>
            {activityLoading ?
              <p className="text-sm text-zinc-500">Loading recent activity…</p>
            : activities.length === 0 ?
              <p className="text-sm text-zinc-500">
                No recent activity to display.
              </p>
            : <ul className="space-y-3">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3"
                  >
                    <div className="mt-0.5 rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {activity.title}
                        </p>
                        <span className="text-xs text-zinc-500">
                          {activity.actor}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-zinc-400 mt-2">
                        {formatActivityDate(activity.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
