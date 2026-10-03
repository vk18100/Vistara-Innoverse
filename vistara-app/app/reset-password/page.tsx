"use client";

import {
  FormEvent,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import Navbar from "@/components/navbar";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("This password reset link is invalid or has expired.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to reset password."
        );
      }

      router.replace("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#171717]">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10 sm:px-6 lg:py-16">
        <div className="w-full max-w-[440px]">

          {/* HEADER */}
          <div className="text-center">

            {/* ICON */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#DEDAD2] bg-white">
              <LockKeyhole
                size={20}
                strokeWidth={1.7}
                className="text-[#292929]"
              />
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A8175]">
              Account recovery
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
              Create a new password
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#73706B]">
              Choose a new password to keep your Vistara
              account secure.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="mt-9 rounded-[28px] border border-[#E4E0D8] bg-white p-6 shadow-[0_18px_60px_rgba(30,25,20,0.06)] sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NEW PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#292929]"
                >
                  New password
                </label>

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
                      setError("");
                    }}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#DEDAD2]
                      bg-[#FCFBF9]
                      px-4
                      py-3.5
                      pr-12
                      text-sm
                      text-[#171717]
                      outline-none
                      transition
                      placeholder:text-[#AAA49B]
                      focus:border-[#292929]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#292929]/5
                      disabled:cursor-not-allowed
                      disabled:bg-[#F3F1ED]
                    "
                  />

                  <button
                    type="button"
                    disabled={loading}
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
                    className="
                      absolute
                      right-2
                      top-1/2
                      -translate-y-1/2
                      rounded-xl
                      p-2
                      text-[#918B83]
                      transition
                      hover:bg-[#F3F1ED]
                      hover:text-[#292929]
                    "
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        strokeWidth={1.7}
                      />
                    ) : (
                      <Eye
                        size={18}
                        strokeWidth={1.7}
                      />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-[#99938A]">
                  Use at least 8 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-[#292929]"
                >
                  Confirm new password
                </label>

                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );
                      setError("");
                    }}
                    placeholder="Repeat your new password"
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#DEDAD2]
                      bg-[#FCFBF9]
                      px-4
                      py-3.5
                      pr-12
                      text-sm
                      text-[#171717]
                      outline-none
                      transition
                      placeholder:text-[#AAA49B]
                      focus:border-[#292929]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#292929]/5
                      disabled:cursor-not-allowed
                      disabled:bg-[#F3F1ED]
                    "
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute
                      right-2
                      top-1/2
                      -translate-y-1/2
                      rounded-xl
                      p-2
                      text-[#918B83]
                      transition
                      hover:bg-[#F3F1ED]
                      hover:text-[#292929]
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        size={18}
                        strokeWidth={1.7}
                      />
                    ) : (
                      <Eye
                        size={18}
                        strokeWidth={1.7}
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
                  className="
                    rounded-2xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    leading-5
                    text-red-600
                  "
                >
                  {error}
                </div>
              )}

              {/* RESET BUTTON */}
              <button
                type="submit"
                disabled={loading || !token}
                className="
                  w-full
                  rounded-2xl
                  bg-[#171717]
                  px-4
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  duration-200
                  hover:bg-[#302E2A]
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Updating password..."
                  : "Update password"}
              </button>
            </form>

            {/* BACK TO LOGIN */}
            <div className="mt-7 border-t border-[#ECE9E3] pt-6 text-center">
              <Link
                href="/login"
                className="
                  text-sm
                  font-semibold
                  text-[#171717]
                  underline
                  decoration-[#C9C2B8]
                  underline-offset-4
                  transition
                  hover:decoration-[#171717]
                "
              >
                ← Back to Sign in
              </Link>
            </div>
          </div>

          {/* SECURITY NOTE */}
          <p className="mx-auto mt-6 max-w-sm text-center text-[11px] leading-5 text-[#A09A91]">
            Your new password will replace your existing
            Vistara account password.
          </p>
        </div>
      </section>
    </main>
  );
}