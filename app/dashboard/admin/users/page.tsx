"use client";

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
import { UserX, Shield } from "lucide-react";

const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    status: "banned",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
  },
];

export default function UserManagementPage() {
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
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>EMAIL</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                    >
                      <TableCell className="font-medium text-zinc-900 dark:text-white">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-zinc-600 dark:text-zinc-400">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={user.role === "admin" ? "warning" : "default"}
                        >
                          {user.role}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          variant="soft"
                          color={
                            user.status === "active" ? "success" : "danger"
                          }
                        >
                          {user.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="text-zinc-700 dark:text-zinc-300"
                          >
                            <Shield className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="text-danger"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
