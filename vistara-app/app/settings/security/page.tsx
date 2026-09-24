"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
              SECURITY
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] sm:text-5xl">
              Security
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
              Protect your Vistara account and manage your login security.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="space-y-6">

          {/* PASSWORD */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_45px_rgba(3,4,94,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              LOGIN
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Password
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Keep your password strong and change it regularly to protect
              your account.
            </p>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Change password
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  Update the password used to sign in to Vistara.
                </p>
              </div>

              <button
                type="button"
                className="w-fit rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
              >
                Change password
              </button>
            </div>
          </div>

          {/* TWO FACTOR */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_45px_rgba(3,4,94,0.05)] sm:p-8">
            <h2 className="font-serif text-2xl font-semibold">
              Two-factor authentication
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Add an extra layer of protection when signing in to your
              account.
            </p>

            <div className="mt-6 flex items-center justify-between gap-5 border-t border-[#03045E]/10 pt-6">
              <div>
                <p className="text-sm font-semibold">
                  Two-factor authentication
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Require an additional verification step during login.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  twoFactor ? "bg-[#03045E]" : "bg-[#CBD5E1]"
                }`}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    twoFactor ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* LOGIN ALERTS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_45px_rgba(3,4,94,0.05)] sm:p-8">
            <h2 className="font-serif text-2xl font-semibold">
              Login alerts
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Get notified when a new login is detected on your account.
            </p>

            <div className="mt-6 flex items-center justify-between gap-5 border-t border-[#03045E]/10 pt-6">
              <div>
                <p className="text-sm font-semibold">
                  New login notifications
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Receive alerts about new or unusual account logins.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLoginAlerts(!loginAlerts)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  loginAlerts ? "bg-[#03045E]" : "bg-[#CBD5E1]"
                }`}
                aria-label="Toggle login alerts"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    loginAlerts ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ACTIVE SESSIONS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_45px_rgba(3,4,94,0.05)] sm:p-8">
            <h2 className="font-serif text-2xl font-semibold">
              Active sessions
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Review devices where your Vistara account is currently signed
              in.
            </p>

            <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Current browser
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Windows · Chrome · Current session
                  </p>
                </div>

                <span className="w-fit rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-emerald-700">
                  ACTIVE
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
            >
              Sign out other devices
            </button>
          </div>

          {/* DANGER */}
          <div className="rounded-[28px] border border-red-100 bg-[#FFF9F7] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              DANGER ZONE
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Sign out everywhere
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Sign out of your Vistara account on all devices except the
              device you are currently using.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Sign out everywhere
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}