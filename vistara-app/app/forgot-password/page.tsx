"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";

import Navbar from "@/components/navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to process your request."
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
    <main className="min-h-screen bg-[#FAFAF8] text-[#171717]">
      <Navbar />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12 sm:px-6 lg:py-16">
        <div className="w-full max-w-[440px]">

          {/* CARD */}
          <div className="rounded-[30px] border border-black/[0.08] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:px-10 sm:py-10">

            {/* ICON */}
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EFE8] text-[#292929]">
                <Mail
                  size={23}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            {/* HEADER */}
            <div className="mt-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6F3D]">
                Account recovery
              </p>

              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
                Forgot your password?
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#737373]">
                No worries. Enter your email and we'll send
                you a secure link to create a new password.
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
                  className="text-sm font-medium text-[#292929]"
                >
                  Email address
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    strokeWidth={1.7}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
                  />

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
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#E5E5E5]
                      bg-white
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-[#171717]
                      outline-none
                      transition
                      placeholder:text-[#A3A3A3]
                      hover:border-[#CFCFCF]
                      focus:border-[#292929]
                      focus:ring-4
                      focus:ring-black/[0.04]
                      disabled:bg-[#F8F8F8]
                    "
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
                >
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700"
                >
                  {success}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#171717]
                  px-4
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  duration-200
                  hover:bg-[#292929]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send reset link
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* BACK */}
            <div className="mt-7 flex justify-center">
              <Link
                href="/login"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-[#666]
                  transition
                  hover:text-[#171717]
                "
              >
                <ArrowLeft size={15} />
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* REGISTER */}
          <p className="mt-6 text-center text-sm text-[#737373]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#292929] underline-offset-4 hover:underline"
            >
              Create account
            </Link>
          </p>

          {/* TRUST NOTE */}
          <p className="mt-4 text-center text-[11px] leading-5 text-[#A3A3A3]">
            For your security, we never reveal whether an email
            is registered with Vistara.
          </p>
        </div>
      </section>
    </main>
  );
}