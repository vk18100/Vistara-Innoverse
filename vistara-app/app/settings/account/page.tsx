"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function AccountSettings() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
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
              Account & personal details
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Manage the information connected to your Vistara account.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="space-y-6">

          {/* CONTACT INFORMATION */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                CONTACT INFORMATION
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                Your contact details
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                These details are used for your account and important
                Vistara updates.
              </p>
            </div>

            <div className="space-y-5">

              {/* EMAIL */}
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    EMAIL ADDRESS
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#03045E]">
                    sristigupta@example.com
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    ✓ Verified
                  </p>
                </div>

                <button className="w-fit rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                  Change email
                </button>
              </div>

              {/* PHONE */}
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    PHONE NUMBER
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#03045E]">
                    +91 XXXXX XXXXX
                  </p>

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Add a phone number for easier booking communication.
                  </p>
                </div>

                <button className="w-fit rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                  Add phone
                </button>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PERSONAL DETAILS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                Basic information
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Legal first name
                </label>

                <input
                  type="text"
                  defaultValue="Sristi"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Legal last name
                </label>

                <input
                  type="text"
                  defaultValue="Gupta"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Date of birth
                </label>

                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Country / Region
                </label>

                <select
                  defaultValue="India"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Your city"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Preferred language
                </label>

                <select
                  defaultValue="English"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t border-[#03045E]/10 pt-6">
              <button className="rounded-xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                Save changes
              </button>
            </div>
          </div>

          {/* ACCOUNT STATUS */}
          <div className="rounded-[28px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] to-white p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              ACCOUNT STATUS
            </p>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#03045E]">
                  Your account is active
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  Member since September 2026
                </p>
              </div>

              <div className="rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-bold text-emerald-700">
                ACTIVE
              </div>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="rounded-[28px] border border-red-100 bg-[#FFF9F7] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              ACCOUNT ACTIONS
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#03045E]">
              Manage your account
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              You can deactivate your account temporarily or permanently
              delete your Vistara account.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#475569] transition hover:border-[#03045E]">
                Deactivate account
              </button>

              <button className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                Delete account
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}