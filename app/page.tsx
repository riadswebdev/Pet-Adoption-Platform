"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import PetCard from "@/components/PetCard";
import { apiClient } from "@/app/lib/api-client";
import type { Pet } from "@/app/types/pet";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPets = async () => {
      try {
        const data = await apiClient("/api/pets?limit=4");
        setFeaturedPets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load featured pets", error);
        setFeaturedPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPets();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-slate-950 text-white dark:bg-[#0B0B0C]">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-168 w-2xl -translate-x-1/2 rounded-full bg-linear-to-tr from-orange-500/20 to-rose-500/20 blur-[120px] dark:from-orange-500/10 dark:to-rose-500/10" />
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.12] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur-sm">
                Premium Pet Adoption Platform
              </span>
              <h1 className="mt-8 text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Find Your Best{" "}
                <span className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
                  Companion
                </span>{" "}
                Today.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Discover adoptable pets with premium support, responsive theme
                behavior, and curated listings from our trusted rescue
                community.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-rose-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
                >
                  Adopt Today
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white px-8 py-4 text-base font-semibold backdrop-blur-sm hover:border-orange-500 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {featuredPets.map((pet) => (
                <div
                  key={pet._id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-orange-500/5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                        {pet.category}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold text-white">
                        {pet.petName}
                      </h2>
                    </div>
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-500">
                      ${pet.adoptionFee}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {pet.shortDescription}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-300 dark:bg-[#0B0B0C]  transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- SECTION HEADER --- */}
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              Why Adopt
            </p>

            <h2 className="mt-4 text-4xl font-extrabold bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
              Give a Pet a Second Chance
            </h2>

            <p className="mt-4 text-base mx-auto max-w-2xl leading-relaxed">
              Adoption brings joy to families and a safe, loving future to pets
              in need. Our platform makes it easy to browse, compare, and
              connect.
            </p>
          </div>

          {/* --- CARDS GRID --- */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Heart className="h-7 w-7 text-orange-500" />,
                title: "Heartfelt Matches",
                label: "We surface highly compatible pets with every search.",
                iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
              },
              {
                icon: <Shield className="h-7 w-7 text-rose-500" />,
                title: "Trusted Listings",
                label:
                  "Every profile includes health, age, and location details.",
                iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
              },
              {
                icon: <Clock className="h-7 w-7 text-amber-500" />,
                title: "Rapid Adoption",
                label:
                  "Find pets ready for adoption with clear adoption fees and status.",
                iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-6 ${item.iconBg}`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background dark:bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                Featured Pets
              </p>
              <h2 className="mt-4 text-4xl font-bold text-foreground dark:text-white">
                Adopt Your New Companion
              </h2>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-full border border-default-300 dark:border-default-200 bg-background/95 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-orange-500"
            >
              Explore All Pets
              <ArrowRight className="ml-2 h-4 w-4 text-orange-500" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {isLoading ?
              <div className="col-span-full text-center py-10 text-zinc-500 dark:text-zinc-400">
                Loading featured pets...
              </div>
            : featuredPets.length === 0 ?
              <div className="col-span-full text-center py-10 text-zinc-500 dark:text-zinc-400">
                No pets available right now.
              </div>
            : featuredPets.map((pet) => <PetCard key={pet._id} {...pet} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-foreground/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-3xl border border-default-300 dark:border-default-200 bg-background dark:bg-[#121214] shadow-xl shadow-orange-500/5 p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Make a difference
          </p>
          <h2 className="mt-6 text-4xl font-bold ">
            Change a life with a single click.
          </h2>
          <p className="mt-4 text-base ">
            Adopt from our trusted shelter listings, or register to list a pet
            in need of a loving home.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-rose-600 px-9 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
          >
            Join PetAdopt
          </Link>
        </div>
      </section>
    </div>
  );
}
