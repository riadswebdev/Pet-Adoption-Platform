"use client";

import { useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import {
  Button,
  Card,
  CardContent,
  Input,
  TextArea,
  Avatar,
  TextField,
  Label,
  Description,
} from "@heroui/react";
import { toast } from "react-hot-toast";

interface ProfileFormData {
  name: string;
  phone: string;
  address: string;
  bio: string;
  image: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = session?.user as Partial<Record<string, string>> | undefined;

  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
    image: user?.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await authClient.updateUser({
      image: formData.image,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
    } as any);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  if (!session?.user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-500 via-amber-500 to-rose-600">
          My Profile
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 mt-2">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800 md:col-span-1">
          <CardContent className="flex flex-col items-center p-6 space-y-4">
            <Avatar className="w-32 h-32 text-large">
              <Avatar.Image
                alt="User avatar"
                src={
                  formData.image ||
                  `https://i.pravatar.cc/150?u=${session.user.email}`
                }
              />
              <Avatar.Fallback>
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {session.user.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {session.user.email}
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs rounded-full uppercase tracking-wider font-semibold">
                {(session.user as { role?: string }).role || "Member"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#121214] shadow-sm border border-zinc-200 dark:border-zinc-800 md:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Edit Details
              </h3>

              <TextField className="w-full flex flex-col gap-1">
                <Label className="text-sm font-medium">Full Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-2 border rounded-md"
                />
                <Description className="text-xs text-zinc-500">
                  Your name will be updated through Better Auth when you save.
                </Description>
              </TextField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField className="w-full flex flex-col gap-1">
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <Input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2 border rounded-md"
                  />
                </TextField>

                <TextField className="w-full flex flex-col gap-1">
                  <Label className="text-sm font-medium">Avatar URL</Label>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full p-2 border rounded-md"
                  />
                </TextField>
              </div>

              <TextField className="w-full flex flex-col gap-1">
                <Label className="text-sm font-medium">Address</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Pet Street, City, Country"
                  className="w-full p-2 border rounded-md"
                />
              </TextField>

              <TextField className="w-full flex flex-col gap-1">
                <Label className="text-sm font-medium">Bio</Label>
                <TextArea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a little bit about yourself and your experience with pets..."
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </TextField>

              <div className="pt-2">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-medium w-full sm:w-auto px-8 p-3 rounded-md"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
