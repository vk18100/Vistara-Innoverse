"use client";

import {
  FormEvent,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "@/components/navbar";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) return;

      setError("");

      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        setError("Please enter your email and password.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Login failed"
          );
        }

        const role = result.user?.role;

        if (role === "HOST") {
          router.replace("/host");
          return;
        }

        if (role === "GUIDE" || role === "ADMIN") {
          router.replace("/");
          return;
        }

        router.replace("/");
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to login. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, router]
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023E8A]">
              Welcome back
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#03045E]">
              Sign in to Vistara
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Continue exploring stays and places worth experiencing.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="you@example.com"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-gray-400 focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#03045E] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-[#03045E] outline-none transition placeholder:text-gray-400 focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-50 hover:text-[#03045E]"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Eye
                      size={18}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#03045E] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#023E8A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/api/auth/google";
            }}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continue with Google
          </button>

          {/* REGISTER */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#03045E] hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}