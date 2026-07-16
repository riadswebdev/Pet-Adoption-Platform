"use client";

import { useEffect, useMemo, useState } from "react";
import { PetCard } from "@/components/PetCard";
import { apiClient } from "@/app/lib/api-client";
import { type Pet } from "@/app/types/pet";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sortPets = (pets: Pet[], sortBy: string) => {
  const sorted = [...pets];

  if (sortBy === "newest") {
    return sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (sortBy === "oldest") {
    return sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }

  if (sortBy === "fee-low") {
    return sorted.sort((a, b) => a.adoptionFee - b.adoptionFee);
  }

  if (sortBy === "fee-high") {
    return sorted.sort((a, b) => b.adoptionFee - a.adoptionFee);
  }

  return sorted;
};

const CATEGORIES = ["All", "Dogs", "Cats", "Birds", "Rabbits", "Others"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest Additions" },
  { value: "oldest", label: "Oldest Additions" },
  { value: "fee-low", label: "Fee: Low to High" },
  { value: "fee-high", label: "Fee: High to Low" },
];

export default function ExplorePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [gender, setGender] = useState("Any");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient("/api/pets");
        setPets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load pets", error);
        setPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPets();
  }, []);

  const filteredPets = useMemo(() => {
    return sortPets(
      pets.filter((pet) => {
        const matchesSearch =
          !search ||
          pet.petName.toLowerCase().includes(search.toLowerCase()) ||
          pet.breed.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          activeCategory === "All" || pet.category === activeCategory;
        const matchesGender = gender === "Any" || pet.gender === gender;

        return matchesSearch && matchesCategory && matchesGender;
      }),
      sortBy,
    );
  }, [pets, search, activeCategory, gender, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPets.length / itemsPerPage));
  const paginatedPets = filteredPets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setGender("Any");
    setSortBy("newest");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#0B0B0C] dark:text-white py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wide uppercase border border-orange-500/20">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-orange-500/20 text-orange-600">
              ★
            </span>
            Explore PetAdopt
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-neutral-900 via-orange-600 to-rose-600 dark:from-white dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
            Browse Pets
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Discover adoptable companions from our trusted rescue community and
            find the one that fits your home.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-[#131b2e]/70 border border-neutral-200/80 dark:border-neutral-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-6 mb-10">
          <div className="relative group">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by pet name, breed, or location..."
              className="w-full pl-12 pr-4 py-3.5 bg-neutral-100 dark:bg-[#1a233d]/50 border border-transparent focus:border-orange-500/50 rounded-xl focus:outline-none transition-all text-sm font-medium text-foreground dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <span>Category</span>
              </label>
              <select
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <span>Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                <option value="Any">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <span>Sort By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-600 hover:bg-orange-500/15 transition px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em]"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800/80 w-full" />

          <div className="space-y-3">
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase block">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                    activeCategory === category ?
                      "bg-linear-to-r from-orange-500 to-rose-500 border-transparent text-white shadow-md shadow-orange-500/20 scale-105"
                    : "bg-neutral-100 dark:bg-[#1a233d]/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-orange-500/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
              <Filter size={16} />
            </div>
            <p className="text-sm font-semibold">
              Found{" "}
              <span className="text-orange-500 text-base font-bold">
                {filteredPets.length}
              </span>{" "}
              adoptable pets
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider"
          >
            Clear All Filters
          </button>
        </div>

        <div className="space-y-6">
          {isLoading ?
            <div className="text-center py-16 px-4 bg-white/50 dark:bg-[#131b2e]/40 border border-neutral-200/60 dark:border-neutral-800/40 rounded-3xl backdrop-blur-md max-w-md mx-auto shadow-sm">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Loading pets...
              </p>
            </div>
          : paginatedPets.length === 0 ?
            <div className="text-center py-16 px-4 bg-white/50 dark:bg-[#131b2e]/40 border border-neutral-200/60 dark:border-neutral-800/40 rounded-3xl backdrop-blur-md max-w-md mx-auto shadow-sm">
              <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-100">
                কোনো পোষা প্রাণী পাওয়া যায়নি!
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                আপনার সার্চ করা কি-ওয়ার্ড বা ফিল্টারটির সাথে মিল হয়নি। দয়া করে
                আবার চেষ্টা করুন।
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2 bg-linear-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
              >
                Reset Filters
              </button>
            </div>
          : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedPets.map((pet) => (
                <div key={pet._id} className="animate-fadeIn">
                  <PetCard {...pet} />
                </div>
              ))}
            </div>
          }
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-40 hover:border-orange-500 transition"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                page === num ?
                  "bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20"
                : "bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-orange-500"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-40 hover:border-orange-500 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// 