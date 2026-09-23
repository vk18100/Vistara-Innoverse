"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    // Backend / API will be connected here later
    console.log(form);

    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT BRAND PANEL */}
        <section className="relative hidden overflow-hidden bg-[#03045E] lg:flex">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0D21A1]/50 blur-3xl" />

          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#0D21A1]/40 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <span className="font-bold text-[#03045E]">V</span>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide">
                  VISTARA
                </p>

                <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                  Stay beyond ordinary
                </p>
              </div>
            </Link>

            {/* CENTER */}
            <div className="max-w-lg">

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Welcome to Vistara
              </span>

              <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Travel differently.
                <span className="block text-[#0D21A1]">
                  Stay meaningfully.
                </span>
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
                Discover distinctive stays, hidden destinations and
                experiences designed around the way you want to travel.
              </p>

            </div>

            {/* FOOTER */}
            <p className="text-xs text-white/30">
              © 2026 Vistara. Crafted for meaningful journeys.
            </p>

          </div>
        </section>


        {/* RIGHT FORM */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-12 lg:hidden">

              <Link href="/" className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03045E]">
                  <span className="font-bold text-white">V</span>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    VISTARA
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#03045E]/35">
                    Stay beyond ordinary
                  </p>
                </div>

              </Link>

            </div>


            {/* HEADING */}
            <div className="mb-9">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D21A1]">
                Create account
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Begin your journey.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#03045E]/45">
                Create your Vistara account and start discovering
                places worth remembering.
              </p>

            </div>


            {/* SOCIAL */}
            <button
              type="button"
              className="flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-[#03045E]/10 text-sm font-medium transition hover:bg-[#03045E]/[0.03]"
            >
              <span className="text-base font-semibold">G</span>
              Continue with Google
            </button>


            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#03045E]/8" />

              <span className="text-[10px] uppercase tracking-[0.15em] text-[#03045E]/30">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-[#03045E]/8" />

            </div>


            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>

                <label className="mb-2 block text-xs font-semibold">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.02] px-5 text-sm outline-none transition placeholder:text-[#03045E]/25 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />

              </div>


              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-xs font-semibold">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.02] px-5 text-sm outline-none transition placeholder:text-[#03045E]/25 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />

              </div>


              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-xs font-semibold">
                    Password
                  </label>

                  <span className="text-[10px] text-[#03045E]/30">
                    Minimum 8 characters
                  </span>

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.02] px-5 pr-16 text-sm outline-none transition placeholder:text-[#03045E]/25 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#03045E]/40 hover:text-[#03045E]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* TERMS */}
              <div className="flex items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#03045E]"
                />

                <p className="text-xs leading-5 text-[#03045E]/40">
                  I agree to Vistara's{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#03045E] underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#03045E] underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#03045E] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(3,4,94,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}

                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

            </form>


            {/* LOGIN */}
            <p className="mt-8 text-center text-sm text-[#03045E]/45">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#03045E] hover:text-[#0D21A1]"
              >
                Log in
              </Link>

            </p>


            {/* HOST */}
            <div className="mt-8 rounded-2xl border border-[#03045E]/8 bg-[#03045E]/[0.025] p-4">

              <p className="text-xs font-semibold">
                Want to host your property?
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#03045E]/40">
                You can create your traveller account first and become
                a host whenever you're ready.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}