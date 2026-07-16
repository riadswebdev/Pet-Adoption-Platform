"use client";

import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/app/lib/api-client";
import { AlertDialog, Button, Card, CardContent, Spinner } from "@heroui/react";
import { Trash2, Edit, Save, X } from "lucide-react";
import toast from "react-hot-toast";

interface Pet {
  _id: string;
  title: string;
  petName: string;
  category: string;
  adoptionStatus: string;
  images: string[];
  breed?: string;
  age?: string;
  gender?: string;
  adoptionFee?: number;
  location?: string;
  shortDescription?: string;
  description?: string;
  weight?: string;
  color?: string;
  vaccinated?: boolean;
  neutered?: boolean;
  healthCondition?: string;
  isFeatured?: boolean;
}

interface PetFormState {
  title: string;
  petName: string;
  category: string;
  breed: string;
  age: string;
  gender: string;
  adoptionFee: string;
  location: string;
  images: string;
  shortDescription: string;
  description: string;
  weight: string;
  color: string;
  vaccinated: boolean;
  neutered: boolean;
  healthCondition: string;
  adoptionStatus: string;
  isFeatured: boolean;
}

const createFormState = (pet: Pet): PetFormState => ({
  title: pet.title ?? "",
  petName: pet.petName ?? "",
  category: pet.category ?? "",
  breed: pet.breed ?? "",
  age: pet.age ?? "",
  gender: pet.gender ?? "Unknown",
  adoptionFee: String(pet.adoptionFee ?? 0),
  location: pet.location ?? "",
  images: (pet.images ?? []).join(", "),
  shortDescription: pet.shortDescription ?? "",
  description: pet.description ?? "",
  weight: pet.weight ?? "",
  color: pet.color ?? "",
  vaccinated: pet.vaccinated ?? false,
  neutered: pet.neutered ?? false,
  healthCondition: pet.healthCondition ?? "",
  adoptionStatus: pet.adoptionStatus ?? "Available",
  isFeatured: pet.isFeatured ?? false,
});

export default function ManagePetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [formState, setFormState] = useState<PetFormState | null>(null);

  useEffect(() => {
    void fetchMyPets();
  }, []);

  const editingPet = useMemo(
    () => pets.find((pet) => pet._id === editingPetId) ?? null,
    [editingPetId, pets],
  );

  const fetchMyPets = async () => {
    try {
      const data = await apiClient("/api/my-pets");
      setPets(data as Pet[]);
    } catch {
      toast.error("Failed to load your pets");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (pet: Pet) => {
    setEditingPetId(pet._id);
    setFormState(createFormState(pet));
  };

  const cancelEdit = () => {
    setEditingPetId(null);
    setFormState(null);
  };

  const handleFieldChange = (
    field: keyof PetFormState,
    value: string | boolean,
  ) => {
    setFormState((current) =>
      current ? { ...current, [field]: value } : current,
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingPetId || !formState) {
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        ...formState,
        adoptionFee: Number.parseFloat(formState.adoptionFee || "0"),
        images: formState.images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const updatedPet = (await apiClient(`/api/pets/${editingPetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })) as Pet;

      setPets((current) =>
        current.map((pet) => (pet._id === editingPetId ? updatedPet : pet)),
      );
      toast.success("Pet listing updated");
      cancelEdit();
    } catch {
      toast.error("Failed to update pet listing");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (petId: string) => {
    try {
      await apiClient(`/api/pets/${petId}`, { method: "DELETE" });
      setPets((current) => current.filter((pet) => pet._id !== petId));
      if (editingPetId === petId) {
        cancelEdit();
      }
      toast.success("Pet listing removed");
    } catch {
      toast.error("Failed to delete pet");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="warning" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
            Manage Pets
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 mt-2">
            View and manage all your pet listings.
          </p>
        </div>
      </div>

      {editingPet && formState ?
        <Card className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Edit listing
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Updating {editingPet.petName}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="text-zinc-700 dark:text-zinc-300"
                onPress={cancelEdit}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Title
                </label>
                <input
                  required
                  value={formState.title}
                  onChange={(event) =>
                    handleFieldChange("title", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Pet name
                </label>
                <input
                  required
                  value={formState.petName}
                  onChange={(event) =>
                    handleFieldChange("petName", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Category
                </label>
                <input
                  required
                  value={formState.category}
                  onChange={(event) =>
                    handleFieldChange("category", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Breed
                </label>
                <input
                  required
                  value={formState.breed}
                  onChange={(event) =>
                    handleFieldChange("breed", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Age
                </label>
                <input
                  required
                  value={formState.age}
                  onChange={(event) =>
                    handleFieldChange("age", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Gender
                </label>
                <select
                  value={formState.gender}
                  onChange={(event) =>
                    handleFieldChange("gender", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Adoption status
                </label>
                <select
                  value={formState.adoptionStatus}
                  onChange={(event) =>
                    handleFieldChange("adoptionStatus", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Adoption fee
                </label>
                <input
                  type="number"
                  min="0"
                  value={formState.adoptionFee}
                  onChange={(event) =>
                    handleFieldChange("adoptionFee", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Location
                </label>
                <input
                  required
                  value={formState.location}
                  onChange={(event) =>
                    handleFieldChange("location", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Weight
                </label>
                <input
                  value={formState.weight}
                  onChange={(event) =>
                    handleFieldChange("weight", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Color
                </label>
                <input
                  value={formState.color}
                  onChange={(event) =>
                    handleFieldChange("color", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Images (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={formState.images}
                  onChange={(event) =>
                    handleFieldChange("images", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Short description
                </label>
                <textarea
                  rows={2}
                  value={formState.shortDescription}
                  onChange={(event) =>
                    handleFieldChange("shortDescription", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formState.description}
                  onChange={(event) =>
                    handleFieldChange("description", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Health condition
                </label>
                <input
                  value={formState.healthCondition}
                  onChange={(event) =>
                    handleFieldChange("healthCondition", event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Featured listing
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={(event) =>
                      handleFieldChange("isFeatured", event.target.checked)
                    }
                  />
                  Mark as featured
                </label>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-3">
                <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formState.vaccinated}
                    onChange={(event) =>
                      handleFieldChange("vaccinated", event.target.checked)
                    }
                  />
                  Vaccinated
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formState.neutered}
                    onChange={(event) =>
                      handleFieldChange("neutered", event.target.checked)
                    }
                  />
                  Neutered
                </label>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-zinc-700 dark:text-zinc-300"
                  onPress={cancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-orange-500 to-rose-500 text-white"
                  isDisabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      : null}

      {pets.length === 0 ?
        <Card className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
          <CardContent className="py-12 text-center text-zinc-500 dark:text-zinc-400">
            You haven&apos;t listed any pets yet.
          </CardContent>
        </Card>
      : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Card
              key={pet._id}
              className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
            >
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${pet.images?.[0] || "https://via.placeholder.com/400x300"})`,
                }}
              />
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white truncate">
                    {pet.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {pet.petName} • {pet.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      pet.adoptionStatus === "Available" ?
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {pet.adoptionStatus}
                  </span>

                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      onPress={() => startEdit(pet)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="text-danger"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container className="bg-white dark:bg-[#121214]">
                          <AlertDialog.Dialog>
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header className="text-zinc-900 dark:text-white">
                              Admin Remove Listing
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-zinc-700 dark:text-zinc-300">
                                Are you sure you want to forcibly remove{" "}
                                <strong>{pet.petName}</strong>? This action
                                cannot be undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button slot="close" variant="tertiary">
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleDelete(pet._id)}
                                variant="danger"
                              >
                                Delete Pet
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    </div>
  );
}
