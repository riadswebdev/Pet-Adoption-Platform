"use client";

import { useEffect, useState } from "react";
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
} from "@heroui/react";
import { apiClient } from "@/app/lib/api-client";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified?: boolean;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const data = (await apiClient("/api/pets/admin/users")) as AdminUser[];

        if (isMounted) {
          setUsers(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load users.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600">
          User Management
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          View all registered users, manage roles, and moderate access.
        </p>
      </div>

      <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800">
        <CardContent className="p-0 overflow-x-auto">
          <Table aria-label="Users table" className="min-w-full">
            <Table.ScrollContainer>
              <Table.Content aria-label="Users table content">
                <TableHeader>
                  <TableColumn isRowHeader>NAME</TableColumn>
                  <TableColumn>EMAIL</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {loading ?
                    <TableRow>
                      <TableCell colSpan={4}>Loading users…</TableCell>
                    </TableRow>
                  : error ?
                    <TableRow>
                      <TableCell colSpan={4} className="text-danger">
                        {error}
                      </TableCell>
                    </TableRow>
                  : users.length === 0 ?
                    <TableRow>
                      <TableCell colSpan={4}>No users found.</TableCell>
                    </TableRow>
                  : users.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                      >
                        <TableCell className="font-medium text-zinc-900 dark:text-white">
                          {user.name || "Unnamed user"}
                        </TableCell>
                        <TableCell className="text-zinc-600 dark:text-zinc-400">
                          {user.email || "No email provided"}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="sm"
                            variant="soft"
                            color={
                              user.role === "admin" ? "warning" : "default"
                            }
                          >
                            {user.role || "user"}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="secondary"
                            onPress={() => setSelectedUser(user)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>{/* Optional footer content */}</Table.Footer>
          </Table>
        </CardContent>
      </Card>

      <div
        className={`fixed inset-0 z-50 ${selectedUser ? "flex" : "hidden"} items-center justify-center bg-black/60 p-4`}
        onClick={() => setSelectedUser(null)}
      >
        <div
          className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#121214]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {selectedUser?.image ?
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              : <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                  {selectedUser?.name?.slice(0, 2).toUpperCase() || "U"}
                </div>
              }
              <div>
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {selectedUser?.name || "User details"}
                </p>
                <p className="text-sm text-zinc-500">
                  {selectedUser?.role || "user"}
                </p>
              </div>
            </div>
            <Button variant="secondary" onPress={() => setSelectedUser(null)}>
              Close
            </Button>
          </div>

          <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Email
                </p>
                <p>{selectedUser?.email || "—"}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Phone
                </p>
                <p>{selectedUser?.phone || "—"}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Email Verified
                </p>
                <p>{selectedUser?.emailVerified ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Joined
                </p>
                <p>{formatDate(selectedUser?.createdAt)}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                Address
              </p>
              <p>{selectedUser?.address || "—"}</p>
            </div>

            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">Bio</p>
              <p>{selectedUser?.bio || "—"}</p>
            </div>

            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                Last Updated
              </p>
              <p>{formatDate(selectedUser?.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
