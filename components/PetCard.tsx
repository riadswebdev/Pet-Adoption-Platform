"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Shield, Star } from "lucide-react";

export interface PetCardProps {
  _id: string;
  petName: string;
  breed: string;
  category: string;
  age: string;
  gender: string;
  vaccinated: boolean;
  location: string;
  adoptionFee: number;
  images: string[];
  shortDescription: string;
}

const PetCard = ({
  _id,
  petName,
  breed,
  category,
  age,
  gender,
  vaccinated,
  location,
  adoptionFee,
  images,
  shortDescription,
}: PetCardProps) => {
  const safeImageSrc = (() => {
    const fallbackImage =
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600";
    const imageCandidates = Array.isArray(images) ? images : [];

    const firstValidImage = imageCandidates.find((image) => {
      const value = image?.trim();
      if (!value) return false;
      if (value.startsWith("/")) return true;
      if (/^https?:\/\//i.test(value)) return true;
      if (/^data:image\//i.test(value)) return true;
      return false;
    });

    return firstValidImage?.trim() || fallbackImage;
  })();

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group h-full"
    >
      <div className="group bg-white dark:bg-[#131b2e] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
        <div className="relative h-56 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 aspect-video">
          <Image
            fill
            alt={petName}
            src={safeImageSrc}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-extrabold bg-white/90 dark:bg-[#0b0f19]/90 text-orange-600 dark:text-orange-400 uppercase tracking-wider shadow-sm backdrop-blur-xs">
            {category}
          </span>

          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-xs font-bold">
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            <span>{vaccinated ? "Vaccinated" : "Not Vaccinated"}</span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-lg leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
              {petName}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {breed}
            </p>

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-rose-500" />
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {location}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-100 dark:border-neutral-800/60 text-neutral-600 dark:text-neutral-400 text-xs font-semibold">
            <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
              <Shield size={14} className="text-orange-500 mb-0.5" />
              <span>{age}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
              <Star size={14} className="text-rose-500 mb-0.5" />
              <span>{gender}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
              <Heart size={14} className="text-blue-500 mb-0.5" />
              <span>${adoptionFee}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
            {shortDescription}
          </p>

          <Link href={`/explore/${_id}`} className="block">
            <button className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-linear-to-r hover:from-orange-500 hover:to-rose-500 dark:bg-[#1a233d]/60 dark:hover:bg-linear-to-r text-neutral-800 dark:text-neutral-300 font-bold text-xs uppercase tracking-wider hover:text-white dark:hover:text-white border border-neutral-200/40 dark:border-neutral-800/40 hover:border-transparent dark:hover:border-transparent shadow-xs transition-all duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};
export default PetCard;
