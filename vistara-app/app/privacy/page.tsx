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
        body: JSON.stringify({ email: cleanEmail }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to process your request."
        );
      }

      setSuccess(
        "If an account exists with this email, reset instructions have been sent."
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
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-[370px]">

          {/* CARD */}
          <div className="rounded-xl border border-neutral-200 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:px-7">

            {/* ICON */}
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200">
                <Mail size={17} strokeWidth={1.6} />
              </div>
            </div>

            {/* HEADER */}
            <div className="mt-4 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Account recovery
              </p>

              <h1 className="mt-1.5 font-serif text-[23px] font-semibold tracking-tight">
                Forgot your password?
              </h1>

              <p className="mx-auto mt-2 max-w-[300px] text-[11px] leading-[18px] text-neutral-500">
                Enter your email and we'll send you a secure
                link to reset your password.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="text-[11px] font-medium text-black"
                >
                  Email address
                </label>

                <div className="relative mt-1">
                  <Mail
                    size={14}
                    strokeWidth={1.6}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
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
                      h-10
                      w-full
                      rounded-lg
                      border
                      border-neutral-200
                      bg-white
                      pl-9
                      pr-3
                      text-[11px]
                      text-black
                      outline-none
                      transition
                      placeholder:text-neutral-400
                      hover:border-neutral-300
                      focus:border-black
                      focus:ring-2
                      focus:ring-black/[0.04]
                    "
                  />
                </div>
              </div>

              {/* MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[10px] leading-4 text-black"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[10px] leading-4 text-black"
                >
                  {success}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-black
                  px-4
                  text-[11px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-neutral-800
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send reset link
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* BACK */}
            <div className="mt-4 flex justify-center">
              <Link
                href="/login"
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-[11px]
                  font-medium
                  text-neutral-500
                  transition
                  hover:text-black
                "
              >
                <ArrowLeft size={13} />
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* REGISTER */}
          <p className="mt-4 text-center text-[11px] text-neutral-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              Create account
            </Link>
          </p>

          {/* SECURITY */}
          <p className="mx-auto mt-2.5 max-w-[320px] text-center text-[9px] leading-4 text-neutral-400">
            For your security, we never reveal whether an email
            is registered with Vistara.
          </p>
        </div>
      </section>
    </main>
  );
}