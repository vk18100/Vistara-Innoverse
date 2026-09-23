"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-108px)] items-center justify-center bg-gradient-to-br from-[#FAFAF8] via-white to-[#EEF2FF] px-6 py-12">

        <div className="w-full max-w-md">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF]">
              <span className="font-serif text-xl font-bold text-[#03045E]">
                V
              </span>
            </div>

            <h1 className="mt-6 font-serif text-3xl font-semibold text-[#03045E]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Enter your email address and we'll send you a secure
              link to reset your password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_20px_60px_rgba(3,4,94,0.08)]"
          >
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#03045E]"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/10"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-[#03045E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && (
              <div className="mt-4 rounded-xl bg-[#F7F3EA] px-4 py-3 text-center text-xs leading-5 text-[#475569]">
                {message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-sm font-semibold text-[#03045E] hover:text-[#0D21A1]"
            >
              ← Back to Sign In
            </Link>
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-[#94A3B8]">
            For your security, reset instructions will be sent to
            the email associated with your Vistara account.
          </p>

        </div>
      </section>
    </main>
  );
}