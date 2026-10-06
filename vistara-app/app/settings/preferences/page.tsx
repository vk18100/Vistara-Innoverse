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

  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR — Indian Rupee");
  const [personalized, setPersonalized] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            href="/settings"
            className="text-xs font-medium text-black/50 transition hover:text-black"
          >
            ← Settings
          </Link>

          <div className="mt-7 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
              YOUR TRAVEL PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Travel preferences
            </h1>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-black/55">
              Choose your travel style, interests, language and
              currency to personalize your Vistara experience.
            </p>
          </div>

          {/* PROFILE SUMMARY */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-black">
                Your Vistara profile
              </p>

              <p className="mt-0.5 text-xs font-medium text-black/50">
                {selectedStyles.length} travel styles ·{" "}
                {selectedInterests.length} interests selected
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedStyles.slice(0, 3).map((style) => (
                <span
                  key={style}
                  className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-black/65"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-4xl px-5 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="space-y-4">

          {/* ================= DISPLAY ================= */}
          <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
              DISPLAY
            </p>

            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-black">
              Language & currency
            </h2>

            <p className="mt-1 text-xs font-medium text-black/50">
              Choose how your Vistara experience is displayed.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="language"
                  className="text-xs font-bold text-black"
                >
                  Language
                </label>

                <select
                  id="language"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setSaved(false);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm font-medium text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="currency"
                  className="text-xs font-bold text-black"
                >
                  Currency
                </label>

                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setSaved(false);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm font-medium text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                >
                  <option>INR — Indian Rupee</option>
                  <option>USD — US Dollar</option>
                  <option>GBP — British Pound</option>
                  <option>EUR — Euro</option>
                </select>
              </div>
            </div>
          </section>

          {/* ================= TRAVEL STYLE ================= */}
          <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
              TRAVEL STYLE
            </p>

            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-black">
              How do you like to travel?
            </h2>

            <p className="mt-1 text-xs font-medium text-black/50">
              Select everything that feels like your kind of journey.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {travelStyles.map((style) => {
                const active = selectedStyles.includes(style);

                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() =>
                      toggleItem(style, setSelectedStyles)
                    }
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-black hover:border-black"
                    }`}
                  >
                    {active && "✓ "}
                    {style}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================= INTERESTS ================= */}
          <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
              INTERESTS
            </p>

            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-black">
              What would you love to discover?
            </h2>

            <p className="mt-1 text-xs font-medium text-black/50">
              Pick the things you naturally look for when you travel.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {interests.map((interest) => {
                const active = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() =>
                      toggleItem(interest, setSelectedInterests)
                    }
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white text-black hover:border-black/40"
                    }`}
                  >
                    <span
                      className={`mb-2 block h-1.5 w-1.5 rounded-full ${
                        active ? "bg-white" : "bg-black/25"
                      }`}
                    />

                    <span className="text-xs font-bold">
                      {interest}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================= PERSONALIZATION ================= */}
          <section className="rounded-2xl border border-black/10 bg-black/[0.03] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
              PERSONALIZATION
            </p>

            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-black">
              Personalized recommendations
            </h2>

            <p className="mt-1 max-w-xl text-xs font-medium leading-5 text-black/50">
              Use your preferences to improve recommendations across
              stays, destinations and local experiences.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3.5">
              <div>
                <p className="text-sm font-bold text-black">
                  Use my preferences
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-black/50">
                  Personalize what Vistara shows you.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPersonalized((value) => !value);
                  setSaved(false);
                }}
                aria-label="Toggle personalized recommendations"
                aria-pressed={personalized}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  personalized ? "bg-black" : "bg-black/20"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    personalized ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ================= SAVE ================= */}
          <div className="flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-xs font-semibold ${
                saved ? "text-black" : "text-black/45"
              }`}
            >
              {saved
                ? "✓ Preferences saved successfully"
                : "Your choices can be changed anytime."}
            </p>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-black px-6 py-2.5 text-xs font-bold text-white transition hover:bg-black/80 active:scale-[0.98]"
            >
              {saved ? "Saved ✓" : "Save preferences"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}