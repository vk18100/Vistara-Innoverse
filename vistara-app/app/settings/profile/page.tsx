"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ProfileSettings() {
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
              Your profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
              Keep your personal information up to date for a smoother
              Vistara experience.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="space-y-6">

          {/* Profile card */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#03045E] font-serif text-3xl font-semibold text-white ring-8 ring-[#EEF2FF]">
                S
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
                  VISTARA MEMBER
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#03045E]">
                  Sristi Gupta
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  sristigupta@example.com
                </p>
              </div>

              <button className="rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                Change photo
              </button>
            </div>
          </div>

          {/* Personal information */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
                PERSONAL INFORMATION
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                Tell us about yourself
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  First name
                </label>

                <input
                  type="text"
                  defaultValue="Sristi"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Last name
                </label>

                <input
                  type="text"
                  defaultValue="Gupta"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="sristigupta@example.com"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Phone number
                </label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Date of birth
                </label>

                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Your city"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-[#03045E]">
                About you
              </label>

              <textarea
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="mt-2 w-full resize-none rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
              />
            </div>

            {/* Save */}
            <div className="mt-8 flex justify-end border-t border-[#03045E]/10 pt-6">
              <button className="rounded-xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                Save changes
              </button>
            </div>
          </div>

          {/* Travel identity */}
          <div className="rounded-[28px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] to-white p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
              TRAVEL IDENTITY
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
              Make Vistara feel more personal
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Your travel preferences will help Vistara understand the
              kinds of stays, destinations and experiences you enjoy.
            </p>

            <Link
              href="/settings/preferences"
              className="mt-6 inline-flex rounded-xl border border-[#03045E] px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
            >
              Set travel preferences →
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}