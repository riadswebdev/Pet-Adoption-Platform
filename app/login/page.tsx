"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "PetAdopt - Login";
  }, []);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });
      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        toast.success("Successfully signed in!");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 rounded-3xl border border-default-200/60 bg-background/80 backdrop-blur-md shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 text-white mb-2 shadow-lg">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back to PetAdopt
          </h2>
          <p className="text-sm text-foreground/60">
            Log in to discover your next furry friend.
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-foreground/80 mb-2"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-foreground/80 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-background border border-foreground/10 rounded-2xl px-4 py-3 pr-12 text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
              >
                {showPassword ?
                  <EyeOff size={18} />
                : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <a href="#" className="text-xs text-orange-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-2xl bg-linear-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ?
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            : "Sign In with Email"}
          </Button>
        </form>

        <div className="flex items-center my-4 justify-center gap-3 text-xs uppercase tracking-widest text-foreground/40">
          <span className="h-px flex-1 bg-foreground/10" />
          <span>Or continue with</span>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>

        <Button
          onClick={() => setError("Google login is not yet enabled.")}
          className="w-full rounded-2xl border border-default-200 bg-background/80 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
        >
          <span className="mr-2">G</span>
          Sign In with Google
        </Button>

        <p className="text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-orange-500 font-semibold hover:text-rose-500 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
