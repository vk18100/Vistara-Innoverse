"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const devices = [
  {
    device: "Windows PC",
    location: "Patna, India",
    lastActive: "Active now",
    current: true,
  },
  {
    device: "Chrome on Android",
    location: "India",
    lastActive: "2 days ago",
    current: false,
  },
];

export default function SecuritySettings() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* Header */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mt-9">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              ACCOUNT
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-5xl">
              Login & security
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Protect your Vistara account and manage where you are
              signed in.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="space-y-6">

          {/* SECURITY STATUS */}
          <div className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-[#03045E] p-7 text-white shadow-[0_20px_60px_rgba(3,4,94,0.15)] md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  SECURITY STATUS
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold">
                  Your account is protected
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                  Keep your password private and enable additional
                  security for important account activity.
                </p>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#C6A15B]/40 bg-white/5">
                <span className="text-2xl text-[#C6A15B]">✓</span>
              </div>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  PASSWORD
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                  Change your password
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Use a strong password that you do not use on another
                  website.
                </p>

                <p className="mt-3 text-xs text-[#94A3B8]">
                  Last changed: Not available
                </p>
              </div>

              <button className="w-fit shrink-0 rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                Change password
              </button>
            </div>
          </div>

          {/* TWO FACTOR */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  EXTRA PROTECTION
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                  Two-factor authentication
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                  Add another layer of protection when signing in to
                  your Vistara account.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs font-semibold text-[#94A3B8]">
                  OFF
                </span>

                <button
                  aria-label="Enable two-factor authentication"
                  className="relative h-7 w-12 rounded-full bg-[#CBD5E1] transition hover:bg-[#94A3B8]"
                >
                  <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#F7F3EA] p-5">
              <p className="text-sm font-semibold text-[#03045E]">
                Recommended
              </p>

              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Two-factor authentication can help protect your account
                even if your password is compromised.
              </p>
            </div>
          </div>

          {/* LOGIN ALERTS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                SECURITY ALERTS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                Login notifications
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Get notified when your account is accessed from a new
                device.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
              <div>
                <p className="text-sm font-semibold text-[#03045E]">
                  New login alerts
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  Email me when a new device signs in.
                </p>
              </div>

              <button
                aria-label="Toggle login alerts"
                className="relative h-7 w-12 rounded-full bg-[#0D21A1]"
              >
                <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* ACTIVE DEVICES */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  ACTIVE DEVICES
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                  Where you're signed in
                </h2>

                <p className="mt-2 text-sm text-[#64748B]">
                  Review devices that currently have access to your
                  account.
                </p>
              </div>

              <button className="text-sm font-semibold text-[#0D21A1] hover:underline">
                Sign out all
              </button>
            </div>

            <div className="mt-7 divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB]">
              {devices.map((device) => (
                <div
                  key={device.device}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-lg text-[#03045E]">
                      ◫
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#03045E]">
                        {device.device}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {device.location}
                      </p>

                      <p className="mt-1 text-xs text-[#94A3B8]">
                        {device.lastActive}
                      </p>
                    </div>
                  </div>

                  {device.current ? (
                    <span className="w-fit rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-emerald-700">
                      CURRENT DEVICE
                    </span>
                  ) : (
                    <button className="w-fit text-sm font-semibold text-[#0D21A1] hover:underline">
                      Sign out
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DANGER */}
          <div className="rounded-[28px] border border-red-100 bg-[#FFF9F7] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              SECURITY ACTION
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#03045E]">
              Sign out everywhere
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              This will sign you out from every device except the one
              you are currently using.
            </p>

            <button className="mt-5 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
              Sign out all other devices
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}