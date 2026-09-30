"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to process your request."
        );
      }

      setSuccess(
        "If an account exists with this email, we've sent password reset instructions."
      );

      setEmail("");
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
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023E8A]">
              Account recovery
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#03045E]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Enter the email address associated with your
              Vistara account and we'll help you reset your
              password.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
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
                  setError("");
                  setSuccess("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                disabled={loading}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-gray-400 focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/10 disabled:bg-gray-50"
              />
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

            {/* SUCCESS */}
            {success && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl bg-green-50 px-4 py-3 text-sm leading-5 text-green-700"
              >
                {success}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#03045E] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#023E8A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-7 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#03045E] hover:text-[#023E8A] hover:underline"
            >
              ← Back to Sign In
            </Link>
          </div>

          {/* REGISTER */}
          <p className="mt-5 text-center text-sm text-gray-500">
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