"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/navbar";

export default function EditProfile() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
          <Link
            href="/profile"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to profile
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              PROFILE
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              Edit your profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
              Update your personal details and travel preferences.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PHOTO */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_45px_rgba(3,4,94,0.05)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PROFILE PHOTO
            </p>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#03045E] to-[#0D21A1] font-serif text-3xl font-semibold text-white shadow-lg">
                SG
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Profile picture
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  Add a photo that represents you.
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="rounded-xl bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D21A1]"
                  >
                    Upload photo
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border border-[#E2E8F0] px-5 py-2.5 text-sm font-semibold text-[#64748B] hover:border-red-200 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_45px_rgba(3,4,94,0.05)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PERSONAL DETAILS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Tell us about yourself
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              <Input
                label="First name"
                defaultValue="Sristi"
              />

              <Input
                label="Last name"
                defaultValue="Gupta"
              />

              <Input
                label="Email"
                type="email"
                defaultValue="sristi@example.com"
              />

              <Input
                label="Phone"
                type="tel"
                defaultValue="+91 98765 43210"
              />

              <Input
                label="City"
                defaultValue="Patna"
              />

              <Input
                label="Country"
                defaultValue="India"
              />

            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold">
                About you
              </label>

              <textarea
                rows={5}
                defaultValue="I love discovering beautiful places, local experiences and peaceful stays."
                className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E] focus:bg-white focus:ring-4 focus:ring-[#03045E]/5"
              />
            </div>
          </div>

          {/* TRAVEL PREFERENCES */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_45px_rgba(3,4,94,0.05)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              TRAVEL STYLE
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              What do you love?
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Choose experiences that match your travel style.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Beach",
                "Heritage",
                "Nature",
                "Luxury",
                "Food",
                "Adventure",
                "Wellness",
                "Culture",
                "Local Experiences",
              ].map((item, index) => (
                <label key={item} className="cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={index < 4}
                    className="peer sr-only"
                  />

                  <span className="block rounded-full border border-[#DDE2E8] bg-white px-4 py-2.5 text-sm font-medium text-[#64748B] transition peer-checked:border-[#03045E] peer-checked:bg-[#03045E] peer-checked:text-white">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#03045E]/10 bg-white p-4 shadow-[0_10px_35px_rgba(3,4,94,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved ? (
                <p className="text-sm font-semibold text-emerald-700">
                  ✓ Profile updated successfully
                </p>
              ) : (
                <p className="text-xs text-[#94A3B8]">
                  Changes will be saved to your account.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Link
                href="/profile"
                className="rounded-xl border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#64748B] transition hover:border-[#03045E] hover:text-[#03045E]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Save changes
              </button>
            </div>
          </div>

        </form>
      </section>
    </main>
  );
}

/* INPUT */

function Input({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E] focus:bg-white focus:ring-4 focus:ring-[#03045E]/5"
      />
    </div>
  );
}