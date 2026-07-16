"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "PetAdopt - Register";
  }, []);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please fulfill all password requirements.");
      return;
    }
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
    });

    console.log("SignUp response:", { data, error });

    if (error) {
      const message = error.message ?? "Unable to create account.";
      setError(message);
      toast.error(message);
    } else {
      toast.success(
        "Account created successfully! Please check your email to verify your account.",
      );
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 rounded-3xl border border-default-200/60 bg-background/80 backdrop-blur-md shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 text-white mb-2 shadow-lg">
            <UserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Create Your PetAdopt Account
          </h2>
          <p className="text-sm text-foreground/60">
            Join PetAdopt and find a loving home for your next companion.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="register-name"
              className="text-sm font-medium text-foreground/90 block"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="register-name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-email"
              className="text-sm font-medium text-foreground/90 block"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-image"
              className="text-sm font-medium text-foreground/90 block"
            >
              Profile Image URL <span className="text-rose-500">*</span>
            </label>
            <input
              id="register-image"
              type="url"
              placeholder="https://example.com/avatar.png"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-password"
              className="text-sm font-medium text-foreground/90 block"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 pr-12 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-foreground/40 hover:text-foreground/70 focus:outline-none"
              >
                {showPassword ?
                  <EyeOff size={16} />
                : <Eye size={16} />}
              </button>
            </div>

            {password && (
              <div className="p-3 bg-foreground/5 rounded-2xl border border-foreground/10 text-xs space-y-2 mt-1">
                <p className="font-medium text-foreground/70">
                  Password Requirements:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        hasMinLength ? "text-green-500" : "text-foreground/50"
                      }
                    >
                      {hasMinLength ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        hasMinLength ? "text-foreground" : "text-foreground/50"
                      }
                    >
                      Minimum 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        hasUppercase ? "text-green-500" : "text-foreground/50"
                      }
                    >
                      {hasUppercase ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        hasUppercase ? "text-foreground" : "text-foreground/50"
                      }
                    >
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        hasLowercase ? "text-green-500" : "text-foreground/50"
                      }
                    >
                      {hasLowercase ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        hasLowercase ? "text-foreground" : "text-foreground/50"
                      }
                    >
                      At least one lowercase letter
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-semibold hover:text-rose-500 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
