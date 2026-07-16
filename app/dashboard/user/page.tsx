"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiClient } from "../../lib/api-client";
import { Card, CardContent, CardHeader } from "@heroui/react";
import { Cat, CheckCircle2, List } from "lucide-react";

interface DashboardSummary {
  totalPetsListed: number;
  activeListings: number;
  adoptedPets: number;
}

export default function UserDashboardHome() {
  const { data: session } = useSession();
  const [summary, setSummary] = useState<DashboardSummary>({
    totalPetsListed: 0,
    activeListings: 0,
    adoptedPets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      const timeout = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(timeout);
    }
    console.log(session?.user, "UserDashboardHome");
    let isMounted = true;

    const loadSummary = async () => {
      try {
        const data = await apiClient("/api/pets/me/summary");
        if (isMounted) {
          setSummary(data as DashboardSummary);
        }
      } catch (error) {
        console.error("Failed to load dashboard summary", error);
        if (isMounted) {
          setSummary({ totalPetsListed: 0, activeListings: 0, adoptedPets: 0 });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
          Welcome back, {session?.user?.name || "Adopter"}!
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          Manage your pet listings and profile updates from your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Total Pets Listed
            </h3>
            <Cat className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : summary.totalPetsListed}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Lifetime total listings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Active Listings
            </h3>
            <List className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : summary.activeListings}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Pets currently looking for a home
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Adopted Pets
            </h3>
            <CheckCircle2 className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white">
              {loading ? "—" : summary.adoptedPets}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Successfully adopted pets
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
