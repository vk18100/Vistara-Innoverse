"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

const interests = [
  "Luxury Stays",
  "Heritage",
  "Nature",
  "Beach",
  "Adventure",
  "Food",
  "Culture",
  "Wellness",
  "Arts",
  "Local Experiences",
];

const travelStyles = [
  "Relaxed",
  "Romantic",
  "Family",
  "Solo",
  "Adventure",
  "Cultural",
];

export default function PreferencesSettings() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Heritage",
    "Culture",
  ]);

  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "Cultural",
    "Relaxed",
  ]);

  const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  };

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
              Travel preferences
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Tell Vistara what you enjoy so your stays and experiences
              can feel more personal.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="space-y-6">

          {/* LANGUAGE + CURRENCY */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                DISPLAY
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                Language & currency
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                Choose how Vistara displays information to you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Language
                </label>

                <select
                  defaultValue="English"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#03045E]">
                  Currency
                </label>

                <select
                  defaultValue="INR"
                  className="mt-2 w-full rounded-xl border border-[#DDE2E8] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                >
                  <option>INR — Indian Rupee</option>
                  <option>USD — US Dollar</option>
                  <option>GBP — British Pound</option>
                  <option>EUR — Euro</option>
                </select>
              </div>
            </div>
          </div>

          {/* TRAVEL STYLE */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                TRAVEL STYLE
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                How do you like to travel?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Select the styles that describe your trips.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {travelStyles.map((style) => {
                const active = selectedStyles.includes(style);

                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleItem(style, setSelectedStyles)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                      active
                        ? "border-[#03045E] bg-[#03045E] text-white"
                        : "border-[#DDE2E8] bg-white text-[#475569] hover:border-[#0D21A1] hover:text-[#03045E]"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTERESTS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                INTERESTS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
                What would you love to discover?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Pick a few interests to help us personalize destinations,
                stays and activities.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {interests.map((interest) => {
                const active = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      toggleItem(interest, setSelectedInterests)
                    }
                    className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                      active
                        ? "border-[#0D21A1] bg-[#EEF2FF] text-[#03045E]"
                        : "border-[#E5E7EB] bg-[#FAFAF8] text-[#475569] hover:border-[#0D21A1]/40 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`mb-2 block h-2 w-2 rounded-full ${
                        active ? "bg-[#C6A15B]" : "bg-[#CBD5E1]"
                      }`}
                    />

                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PERSONALIZATION */}
          <div className="rounded-[28px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] to-white p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PERSONALIZATION
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
              Personalized Vistara
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Use your selected travel styles and interests to personalize
              the places, stays and experiences shown to you.
            </p>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#C6A15B]/20 bg-white/70 p-5">
              <div>
                <p className="text-sm font-semibold text-[#03045E]">
                  Personalized recommendations
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  Use my preferences when showing recommendations.
                </p>
              </div>

              <button
                aria-label="Toggle personalized recommendations"
                className="relative h-7 w-12 rounded-full bg-[#0D21A1]"
              >
                <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end border-t border-[#03045E]/10 pt-6">
            <button className="rounded-xl bg-[#03045E] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#03045E]/10 transition hover:bg-[#0D21A1]">
              Save preferences
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}