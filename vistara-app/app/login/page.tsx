"use client";

import {
  FormEvent,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
          throw new Error(result.message || "Login failed");
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
    <main className="min-h-screen bg-[#FAF9F6] text-[#171717]">
      <Navbar />

      {/* PAGE */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#E7E2D8] bg-white shadow-[0_20px_70px_rgba(23,23,23,0.08)] lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT — BRAND PANEL */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[#171717] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

            {/* Decorative shapes */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#D9A441]/20" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#171717]">
                V
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#D9A441]">
                WELCOME BACK
              </p>

              <h2 className="mt-5 max-w-md font-serif text-5xl font-semibold leading-[1.05]">
                Your next journey starts here.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                Sign in to continue discovering unique stays,
                local experiences and places worth remembering.
              </p>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9A441]/10 text-[#D9A441]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Your journey, your way.
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Secure access to your Vistara account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — LOGIN */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
            <div className="w-full max-w-md">

              {/* MOBILE BRAND */}
              <div className="mb-8 lg:hidden">
                <Link
                  href="/"
                  className="font-serif text-3xl font-semibold tracking-tight text-[#171717]"
                >
                  Vistara
                </Link>
              </div>

              {/* HEADER */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A47B2C]">
                  Welcome back
                </p>

                <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
                  Sign in
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-6 text-[#737373]">
                  Continue exploring stays, places and experiences
                  worth experiencing.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-9 space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#262626]"
                  >
                    Email address
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
                    className="
                      mt-2.5
                      w-full
                      rounded-2xl
                      border
                      border-[#DDD9D0]
                      bg-[#FCFBF8]
                      px-4
                      py-3.5
                      text-sm
                      text-[#171717]
                      outline-none
                      transition
                      placeholder:text-[#A3A3A3]
                      focus:border-[#171717]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#171717]/5
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#262626]"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#525252] transition hover:text-[#A47B2C]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative mt-2.5">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
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
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#DDD9D0]
                        bg-[#FCFBF8]
                        px-4
                        py-3.5
                        pr-12
                        text-sm
                        text-[#171717]
                        outline-none
                        transition
                        placeholder:text-[#A3A3A3]
                        focus:border-[#171717]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#171717]/5
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
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
                        text-[#8A8A8A]
                        transition
                        hover:bg-[#F2F0EB]
                        hover:text-[#171717]
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
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
                    hover:bg-[#2A2A2A]
                    hover:shadow-[0_10px_30px_rgba(23,23,23,0.18)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5E2DC]" />

                <span className="text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">
                  or
                </span>

                <div className="h-px flex-1 bg-[#E5E2DC]" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/api/auth/google";
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-[#DDD9D0]
                  bg-white
                  px-4
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#333333]
                  transition
                  hover:border-[#171717]
                  hover:bg-[#FAF9F6]
                "
              >
                {/* Google mark */}
                <span className="text-base font-bold">G</span>
                Continue with Google
              </button>

              {/* REGISTER */}
              <p className="mt-7 text-center text-sm text-[#737373]">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#171717] underline decoration-[#D9A441] decoration-2 underline-offset-4 transition hover:text-[#A47B2C]"
                >
                  Create account
                </Link>
              </p>

              {/* FOOT NOTE */}
              <p className="mt-8 text-center text-[11px] leading-5 text-[#A3A3A3]">
                By continuing, you agree to Vistara's{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-[#171717]"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-[#171717]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}