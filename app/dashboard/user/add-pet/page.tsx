"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  Input,
  TextArea,
  Label,
  Description,
  TextField,
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { apiClient } from "@/app/lib/api-client";
import { useRouter } from "next/navigation";

const petSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  petName: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["Male", "Female", "Unknown"]),
  weight: z.string().min(1, "Weight is required"),
  color: z.string().min(1, "Color is required"),
  vaccinated: z.boolean(),
  neutered: z.boolean(),
  healthCondition: z.string().min(1, "Health condition is required"),
  adoptionFee: z.string().min(1, "Adoption fee is required"),
  location: z.string().min(3, "Location is required"),
  images: z
    .string()
    .trim()
    .min(1, "At least one image is required")
    .url("Please enter a valid image URL"),
  shortDescription: z.string().min(10, "Short description is required"),
  description: z.string().min(20, "Full description is required"),
});

type PetFormValues = z.infer<typeof petSchema>;

export default function AddPetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      vaccinated: true,
      neutered: false,
    },
  });

  const onSubmit = async (data: PetFormValues) => {
    setIsSubmitting(true);
    try {
      await apiClient("/api/pets", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          adoptionFee: Number(data.adoptionFee),
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          adoptionStatus: "Available",
          isFeatured: false,
        }),
      });
      toast.success("Pet listed successfully!");
      router.push("/dashboard/user/manage-pets");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to list pet";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
          List a Pet for Adoption
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          Provide detailed information to help your pet find a loving home.
        </p>
      </div>

      <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                isInvalid={!!errors.title}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Listing Title</Label>
                <Input
                  placeholder="e.g., Loving Golden Retriever Puppy"
                  {...register("title")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.title && (
                  <Description className="text-danger text-xs">
                    {errors.title.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.petName}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Pet Name</Label>
                <Input
                  placeholder="e.g., Max"
                  {...register("petName")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.petName && (
                  <Description className="text-danger text-xs">
                    {errors.petName.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.category}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Category</Label>
                <Input
                  placeholder="e.g., Dog, Cat, Bird"
                  {...register("category")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.category && (
                  <Description className="text-danger text-xs">
                    {errors.category.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.breed}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Breed</Label>
                <Input
                  placeholder="e.g., Golden Retriever"
                  {...register("breed")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.breed && (
                  <Description className="text-danger text-xs">
                    {errors.breed.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.age}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Age</Label>
                <Input
                  placeholder="e.g., 2 months"
                  {...register("age")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.age && (
                  <Description className="text-danger text-xs">
                    {errors.age.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.gender}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Gender</Label>
                <select
                  {...register("gender")}
                  className="w-full p-2 border rounded-md bg-white dark:bg-[#121214]"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
                {errors.gender && (
                  <Description className="text-danger text-xs">
                    {errors.gender.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.weight}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Weight</Label>
                <Input
                  placeholder="e.g., 5 kg"
                  {...register("weight")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.weight && (
                  <Description className="text-danger text-xs">
                    {errors.weight.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.color}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Color</Label>
                <Input
                  placeholder="e.g., Golden"
                  {...register("color")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.color && (
                  <Description className="text-danger text-xs">
                    {errors.color.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.healthCondition}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Health Condition</Label>
                <Input
                  placeholder="e.g., Healthy"
                  {...register("healthCondition")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.healthCondition && (
                  <Description className="text-danger text-xs">
                    {errors.healthCondition.message}
                  </Description>
                )}
              </TextField>

              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("vaccinated")}
                    className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Vaccinated
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("neutered")}
                    className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Neutered
                  </span>
                </label>
              </div>

              <TextField
                isInvalid={!!errors.adoptionFee}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Adoption Fee ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  {...register("adoptionFee")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.adoptionFee && (
                  <Description className="text-danger text-xs">
                    {errors.adoptionFee.message}
                  </Description>
                )}
              </TextField>

              <TextField
                isInvalid={!!errors.location}
                className="w-full flex flex-col gap-1"
              >
                <Label className="text-sm font-medium">Location</Label>
                <Input
                  placeholder="e.g., New York, NY"
                  {...register("location")}
                  className="w-full p-2 border rounded-md"
                />
                {errors.location && (
                  <Description className="text-danger text-xs">
                    {errors.location.message}
                  </Description>
                )}
              </TextField>
            </div>

            <TextField
              isInvalid={!!errors.images}
              className="w-full flex flex-col gap-1"
            >
              <Label className="text-sm font-medium">Image URL or Path</Label>
              <Input
                placeholder="https://example.com/pet-image.jpg or /images/pet.jpg"
                {...register("images")}
                className="w-full p-2 border rounded-md"
              />
              {errors.images && (
                <Description className="text-danger text-xs">
                  {errors.images.message}
                </Description>
              )}
            </TextField>

            <TextField
              isInvalid={!!errors.shortDescription}
              className="w-full flex flex-col gap-1"
            >
              <Label className="text-sm font-medium">Short Description</Label>
              <TextArea
                placeholder="A brief summary about the pet..."
                {...register("shortDescription")}
                className="w-full p-2 border rounded-md"
              />
              {errors.shortDescription && (
                <Description className="text-danger text-xs">
                  {errors.shortDescription.message}
                </Description>
              )}
            </TextField>

            <TextField
              isInvalid={!!errors.description}
              className="w-full flex flex-col gap-1"
            >
              <Label className="text-sm font-medium">Full Description</Label>
              <TextArea
                rows={5}
                placeholder="Detailed information about behavior, history, etc..."
                {...register("description")}
                className="w-full p-2 border rounded-md"
              />
              {errors.description && (
                <Description className="text-danger text-xs">
                  {errors.description.message}
                </Description>
              )}
            </TextField>

            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-medium shadow-md p-3 rounded-md"
            >
              {isSubmitting ? "Listing..." : "List Pet"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
