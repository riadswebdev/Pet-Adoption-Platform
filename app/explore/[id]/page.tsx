"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Tag,
  Heart,
  ArrowLeft,
  Shield,
  CircleCheck,
  Circle,
  User,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { Chip } from "@heroui/react";
import { PetCard } from "@/components/PetCard";
import { apiClient } from "@/app/lib/api-client";
import type { Pet } from "@/app/types/pet";
import Image from "next/image";

export default function PetDetails() {
  const params = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [relatedPets, setRelatedPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      if (!params?.id) return;

      try {
        setIsLoading(true);
        const petData = await apiClient(`/api/pets/${params.id}`);
        setPet(petData);

        const relatedData = await apiClient(
          `/api/pets?category=${encodeURIComponent(petData.category)}&limit=4`,
        );
        setRelatedPets(
          Array.isArray(relatedData) ?
            relatedData.filter((item: Pet) => item._id !== petData._id)
          : [],
        );
      } catch (error) {
        console.error("Failed to load pet details", error);
        setPet(null);
        setRelatedPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPet();
  }, [params?.id]);

  if (!isLoading && !pet) {
    notFound();
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500 dark:text-zinc-400">
        Loading pet details...
      </div>
    );
  }

  const statusColor: Record<string, "success" | "warning" | "danger"> = {
    Available: "success",
    Pending: "warning",
    Adopted: "danger",
  };

  return (
    <div className="bg-background min-h-screen py-10 dark:bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-orange-500 mb-8 transition-colors group dark:text-zinc-300"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="overflow-hidden relative rounded-3xl border border-default-300 dark:border-default-200 bg-background dark:bg-[#121214] h-105">
              <Image
                fill
                src={pet.images[0]}
                alt={pet.petName}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {pet?.images?.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden relative rounded-3xl border border-default-300 dark:border-default-200 bg-background dark:bg-[#121214] h-24"
                >
                  <Image
                    fill
                    src={img}
                    alt={pet?.petName + ` ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-foreground dark:text-white mb-2">
                  {pet.petName}
                </h1>
                <p className="text-foreground/70 dark:text-zinc-400">
                  {pet.breed}
                </p>
              </div>
              <Chip
                color={statusColor[pet.adoptionStatus] ?? "default"}
                size="lg"
                variant="soft"
                className="font-semibold"
              >
                {pet.adoptionStatus}
              </Chip>
            </div>

            <p className="text-foreground/80 dark:text-zinc-300 leading-relaxed">
              {pet.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                {
                  label: "Category",
                  value: pet.category,
                  icon: <Tag size={16} className="text-orange-500" />,
                },
                {
                  label: "Age",
                  value: pet.age,
                  icon: <Calendar size={16} className="text-amber-500" />,
                },
                {
                  label: "Gender",
                  value: pet.gender,
                  icon: <Heart size={16} className="text-rose-500" />,
                },
                {
                  label: "Weight",
                  value: pet.weight,
                  icon: <Shield size={16} className="text-orange-500" />,
                },
                {
                  label: "Color",
                  value: pet.color,
                  icon: <CircleCheck size={16} className="text-green-500" />,
                },
                {
                  label: "Location",
                  value: pet.location,
                  icon: <MapPin size={16} className="text-orange-500" />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-default-300 dark:border-default-200 bg-foreground/5 dark:bg-[#121214] p-4"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60 dark:text-zinc-500 mb-2">
                    {item.icon}
                    {item.label}
                  </div>
                  <p className="font-semibold text-foreground dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-default-300 dark:border-default-200 bg-foreground/5 dark:bg-[#121214] p-6 mb-6">
              <h3 className="font-bold text-lg text-foreground dark:text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-orange-500" /> Health Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground/80 dark:text-zinc-300">
                  {pet.vaccinated ?
                    <CircleCheck size={20} className="text-emerald-500" />
                  : <Circle size={20} className="text-foreground/40" />}
                  <span>
                    {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80 dark:text-zinc-300">
                  {pet.neutered ?
                    <CircleCheck size={20} className="text-emerald-500" />
                  : <Circle size={20} className="text-foreground/40" />}
                  <span>
                    {pet.neutered ? "Neutered / Spayed" : "Not Neutered"}
                  </span>
                </div>
                <div className="mt-4 border-t border-default-300 dark:border-default-200 pt-4 text-foreground/70 dark:text-zinc-400">
                  <span className="font-semibold text-foreground dark:text-white">
                    Condition:
                  </span>{" "}
                  {pet.healthCondition}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-linear-to-r from-orange-500 to-rose-600 p-6 text-white shadow-lg shadow-orange-500/20 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                    Adoption Fee
                  </p>
                  <p className="mt-2 text-4xl font-extrabold">
                    ${pet.adoptionFee}
                  </p>
                </div>
                <DollarSign size={44} className="text-white/30" />
              </div>
            </div>

            <div className="rounded-3xl border border-default-300 dark:border-default-200 bg-foreground/5 dark:bg-[#121214] p-6">
              <h3 className="font-bold text-lg text-foreground dark:text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-orange-500" /> Listed By
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold">
                  {pet.userName?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-foreground dark:text-white">
                    {pet.userName}
                  </p>
                  <p className="text-foreground/70 dark:text-zinc-400 text-sm">
                    {pet.userEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-default-300 dark:border-default-200 bg-foreground/5 dark:bg-[#121214] p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
            About {pet.petName}
          </h2>
          <p className="text-foreground/80 dark:text-zinc-300 leading-relaxed text-lg">
            {pet.description}
          </p>
        </div>

        {relatedPets.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8">
              More <span className="text-gradient">{pet.category}s</span>{" "}
              Available
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPets.map((related) => (
                <PetCard key={related._id} {...related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
