"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to create your account."
        );
      }

      setSuccess(
        "Account created successfully. Redirecting to sign in..."
      );

      setName("");
      setEmail("");
      setPassword("");
      setAcceptedTerms(false);

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F6FF]">
      <Navbar />

      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#E5EBFF]" />

        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0D21A1]/10 blur-[120px]" />

        <div className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full bg-[#023E8A]/10 blur-[130px]" />

        {/* MAIN */}
        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center justify-center px-6 py-12 lg:px-10">
          <div className="grid w-full overflow-hidden rounded-[36px] border border-white/80 bg-white/80 shadow-[0_30px_100px_rgba(3,4,94,0.14)] backdrop-blur-xl lg:grid-cols-2">

            {/* LEFT PANEL */}
            <div className="hidden min-h-[680px] flex-col justify-between bg-[#03045E] p-12 text-white lg:flex">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-[#03045E]">
                  V
                </div>

                <p className="mt-12 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  Welcome to Vistara
                </p>

                <h2 className="mt-5 max-w-md font-serif text-5xl font-semibold leading-tight">
                  Discover places worth experiencing.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
                  Create your Vistara account and discover thoughtfully
                  selected stays, destinations and experiences.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-semibold">01</p>
                    <p className="mt-1 text-xs text-white/50">
                      Discover
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-semibold">02</p>
                    <p className="mt-1 text-xs text-white/50">
                      Stay
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xl font-semibold">03</p>
                    <p className="mt-1 text-xs text-white/50">
                      Experience
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-white/40">
                  Your journey begins here.
                </p>
              </div>
            </div>

            {/* REGISTER PANEL */}
            <div className="flex min-h-[680px] items-center bg-white px-7 py-10 sm:px-12 lg:px-16">
              <div className="mx-auto w-full max-w-md">

                {/* MOBILE LOGO */}
                <div className="mb-8 flex lg:hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03045E] text-lg font-bold text-white">
                    V
                  </div>
                </div>

                {/* HEADER */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                    Create account
                  </p>

                  <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E]">
                    Welcome to Vistara
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-[#64748B]">
                    Create your account and start discovering places
                    worth staying in.
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-[#334155]"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#DDE3F0] bg-[#F8FAFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-[#334155]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#DDE3F0] bg-[#F8FAFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#334155]"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#DDE3F0] bg-[#F8FAFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                    />

                    <p className="mt-2 text-xs text-[#94A3B8]">
                      At least 8 characters.
                    </p>
                  </div>

                  {/* TERMS */}
                  <label className="flex items-start gap-3 text-xs leading-5 text-[#64748B]">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#03045E]"
                    />

                    <span>
                      I agree to Vistara&apos;s{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-[#03045E]"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-[#03045E]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* ERROR */}
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {error}
                    </div>
                  )}

                  {/* SUCCESS */}
                  {success && (
                    <div
                      role="status"
                      className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                      {success}
                    </div>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#03045E]/20 transition hover:bg-[#0D21A1] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating account..."
                      : "Create account"}
                  </button>
                </form>

                {/* DIVIDER */}
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#E2E8F0]" />

                  <span className="text-xs text-[#94A3B8]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                </div>

                {/* GOOGLE */}
                <button
                  type="button"
                  onClick={() => { window.location.href = "/api/auth/google"; }}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#DDE3F0] bg-white px-5 py-3.5 text-sm font-semibold text-[#334155] transition hover:border-[#0D21A1] hover:bg-[#F8FAFF]"
                >
                  <span className="font-bold text-[#03045E]">
                    G
                  </span>

                  Continue with Google
                </button>

                {/* LOGIN */}
                <p className="mt-6 text-center text-sm text-[#64748B]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#03045E] transition hover:text-[#0D21A1]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}