"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/api-client";
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Spinner,
 
  AlertDialog,
} from "@heroui/react";
import { Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface Pet {
  _id: string;
  title: string;
  petName: string;
  category: string;
  userName: string;
  adoptionStatus: string;
}

export default function PetModerationPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPets() {
    try {
      const data = await apiClient("/api/pets/admin/all");
      setPets(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load platform pets");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPets();
  }, []);

  const confirmDelete = async (petId: string) => {
    try {
      await apiClient(`/api/pets/${petId}`, { method: "DELETE" });
      setPets(pets.filter((p) => p._id !== petId));
      toast.success("Listing removed by admin");
    } catch (error) {
      toast.error("Failed to delete listing");
    }
  };

  const toggleStatus = async (pet: Pet) => {
    try {
      const nextStatus =
        pet.adoptionStatus === "Available" ? "Adopted" : "Available";
      await apiClient(`/api/pets/admin/${pet._id}/status`, {
        method: "PUT",
        body: JSON.stringify({ adoptionStatus: nextStatus }),
      });
      toast.success(`Status updated for ${pet.petName}`);
      setPets(
        pets.map((p) =>
          p._id === pet._id ? { ...p, adoptionStatus: nextStatus } : p,
        ),
      );
    } catch (error) {
      toast.error("Failed to update status");
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
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
          Pet Moderation
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          View all active listings platform-wide, edit status, or remove
          inappropriate listings.
        </p>
      </div>

      <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
        <CardContent className="p-0 overflow-x-auto">
          <Table aria-label="Pet Moderation table" className="min-w-full">
            <Table.ScrollContainer>
              <Table.Content aria-label="Pet Moderation table content">
                <TableHeader>
                  <TableColumn isRowHeader>LISTING TITLE</TableColumn>
                  <TableColumn>PET NAME</TableColumn>
                  <TableColumn>OWNER</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {pets.map((pet) => (
                    <TableRow
                      key={pet._id}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                    >
                      <TableCell className="font-medium text-zinc-900 dark:text-white max-w-50 truncate">
                        {pet.title}
                      </TableCell>
                      <TableCell className="text-zinc-600 dark:text-zinc-400">
                        {pet.petName}
                      </TableCell>
                      <TableCell className="text-zinc-600 dark:text-zinc-400">
                        {pet.userName}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={
                            pet.adoptionStatus === "Available" ?
                              "success"
                            : "danger"
                          }
                        >
                          {pet.adoptionStatus}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="text-zinc-700 dark:text-zinc-300"
                            onPress={() => toggleStatus(pet)}
                          >
                            {pet.adoptionStatus === "Available" ?
                              <CheckCircle2 className="w-4 h-4" />
                            : <AlertCircle className="w-4 h-4" />}
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
                                      <strong>{pet.petName}</strong>? This
                                      action cannot be undone.
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                      Cancel
                                    </Button>
                                    <Button onClick={() => confirmDelete(pet._id)} variant="danger">
                                      Delete Pet
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pets.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-zinc-500 py-6"
                      >
                        No pets found on the platform.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>{/* Optional footer content */}</Table.Footer>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
