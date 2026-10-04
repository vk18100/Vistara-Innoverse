"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Compass,
  Eye,
  EyeOff,
  MapPin,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/navbar";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
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
    <main className="min-h-screen bg-[#F5F1EA] text-[#25231F]">
      <Navbar />

      {/* PAGE BACKGROUND */}
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">

        {/* soft luxury background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(184,148,90,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(120,105,80,0.10),transparent_32%),#F5F1EA]" />

        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#B8945A]/10 blur-[100px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#8A7A62]/10 blur-[110px]" />

        {/* MAIN */}
        <div className="relative mx-auto flex w-full max-w-[1320px] items-center px-5 py-10 sm:px-8 lg:min-h-[calc(100vh-80px)] lg:px-10 lg:py-14">

          <div className="grid w-full overflow-hidden rounded-[38px] border border-[#DED6C9] bg-[#FCFAF6] shadow-[0_35px_100px_rgba(55,45,30,0.14)] lg:grid-cols-[0.92fr_1.08fr]">

            {/* ================================================= */}
            {/* LEFT PREMIUM VISUAL PANEL */}
            {/* ================================================= */}

            <div className="relative hidden min-h-[720px] overflow-hidden bg-[#25231F] text-white lg:flex">

              {/* decorative gold circles */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#C5A66A]/30" />

              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#C5A66A]/20" />

              <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full border border-[#C5A66A]/20" />

              {/* texture */}
              <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:42px_42px]" />

              <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

                {/* BRAND */}
                <div>
                  <div className="flex items-center justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F3EA] text-xl font-bold text-[#25231F] shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                      V
                    </div>

                    <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 backdrop-blur">
                      Vistara
                    </div>

                  </div>

                  <p className="mt-20 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C8A968]">
                    A different way to travel
                  </p>

                  <h2 className="mt-6 max-w-lg font-serif text-5xl font-medium leading-[1.03] tracking-tight xl:text-6xl">
                    Discover places
                    <br />
                    worth
                    <br />
                    remembering.
                  </h2>

                  <p className="mt-7 max-w-md text-sm leading-7 text-white/60">
                    Stay somewhere meaningful. Meet local people.
                    Discover experiences that turn a destination into
                    a memory.
                  </p>
                </div>

                {/* CENTER FEATURE */}
                <div className="relative my-12">

                  <div className="absolute -inset-5 rounded-[32px] border border-[#C8A968]/10" />

                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#302D28] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">

                    <div className="flex items-start justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A968]/15">
                        <Compass
                          size={20}
                          className="text-[#C8A968]"
                        />
                      </div>

                      <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-white/60">
                        <Sparkles
                          size={12}
                          className="text-[#C8A968]"
                        />
                        Curated
                      </div>

                    </div>

                    <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-white/40">
                      Your next discovery
                    </p>

                    <p className="mt-2 font-serif text-2xl text-white">
                      Go beyond the obvious.
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-xs text-white/50">
                      <MapPin
                        size={14}
                        className="text-[#C8A968]"
                      />
                      Hidden places · Local stories · Real experiences
                    </div>

                  </div>
                </div>

                {/* BOTTOM */}
                <div>

                  <div className="grid grid-cols-3 gap-3">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="font-serif text-2xl">01</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        Discover
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="font-serif text-2xl">02</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        Stay
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="font-serif text-2xl">03</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        Experience
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-white/35">
                      Your journey begins here.
                    </p>

                    <div className="h-px w-20 bg-[#C8A968]/40" />
                  </div>

                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT REGISTER PANEL */}
            {/* ================================================= */}

            <div className="flex min-h-[720px] items-center bg-[#FCFAF6] px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

              <div className="mx-auto w-full max-w-[500px]">

                {/* MOBILE BRAND */}
                <div className="mb-10 flex items-center justify-between lg:hidden">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25231F] text-lg font-bold text-white">
                    V
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9A8050]">
                    Vistara
                  </span>

                </div>

                {/* HEADER */}
                <div>

                  <div className="flex items-center gap-3">

                    <span className="h-px w-8 bg-[#B8945A]" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A8050]">
                      Create account
                    </p>

                  </div>

                  <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-[#25231F] sm:text-5xl">
                    Welcome to Vistara.
                  </h1>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#777066]">
                    Create your account and start discovering stays,
                    destinations and experiences worth your time.
                  </p>

                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-9 space-y-5"
                >

                  {/* NAME */}
                  <div>

                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#4E4941]"
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
                      className="mt-2 w-full rounded-2xl border border-[#DDD6CB] bg-white px-4 py-4 text-sm text-[#25231F] outline-none transition placeholder:text-[#A49D93] focus:border-[#B8945A] focus:ring-4 focus:ring-[#B8945A]/10"
                    />

                  </div>

                  {/* EMAIL */}
                  <div>

                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#4E4941]"
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
                      className="mt-2 w-full rounded-2xl border border-[#DDD6CB] bg-white px-4 py-4 text-sm text-[#25231F] outline-none transition placeholder:text-[#A49D93] focus:border-[#B8945A] focus:ring-4 focus:ring-[#B8945A]/10"
                    />

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <label
                      htmlFor="password"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#4E4941]"
                    >
                      Password
                    </label>

                    <div className="relative mt-2">

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        required
                        className="w-full rounded-2xl border border-[#DDD6CB] bg-white px-4 py-4 pr-12 text-sm text-[#25231F] outline-none transition placeholder:text-[#A49D93] focus:border-[#B8945A] focus:ring-4 focus:ring-[#B8945A]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91897E] transition hover:text-[#25231F]"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>

                    </div>

                    <p className="mt-2 text-xs text-[#9B948A]">
                      At least 8 characters.
                    </p>

                  </div>

                  {/* TERMS */}
                  <label className="flex cursor-pointer items-start gap-3 pt-1 text-xs leading-5 text-[#777066]">

                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(e.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#B8945A]"
                    />

                    <span>
                      I agree to Vistara&apos;s{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-[#25231F] underline decoration-[#B8945A] underline-offset-2"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-[#25231F] underline decoration-[#B8945A] underline-offset-2"
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
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {error}
                    </div>
                  )}

                  {/* SUCCESS */}
                  {success && (
                    <div
                      role="status"
                      className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                      <Check size={16} />
                      {success}
                    </div>
                  )}

                  {/* CREATE ACCOUNT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25231F] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,35,31,0.16)] transition hover:bg-[#3A362F] hover:shadow-[0_16px_35px_rgba(37,35,31,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating account..."
                      : "Create account"}

                    {!loading && (
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>

                </form>

                {/* DIVIDER */}
                <div className="my-7 flex items-center gap-4">

                  <div className="h-px flex-1 bg-[#E3DDD4]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A29A8F]">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-[#E3DDD4]" />

                </div>

                {/* GOOGLE */}
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/api/auth/google";
                  }}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#DDD6CB] bg-white px-5 py-4 text-sm font-semibold text-[#4E4941] transition hover:border-[#B8945A] hover:bg-[#FAF7F1]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E1D9CD] text-xs font-bold">
                    G
                  </span>

                  Continue with Google
                </button>

                {/* LOGIN */}
                <p className="mt-7 text-center text-sm text-[#81796E]">

                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-semibold text-[#25231F] underline decoration-[#B8945A] underline-offset-4 transition hover:text-[#9A8050]"
                  >
                    Sign in
                  </Link>

                </p>

                {/* TRUST NOTE */}
                <div className="mt-9 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#A29A8F]">

                  <div className="h-1.5 w-1.5 rounded-full bg-[#B8945A]" />

                  Secure · Private · Built for travellers

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}