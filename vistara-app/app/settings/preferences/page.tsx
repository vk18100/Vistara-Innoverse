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
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-10">
          <Link
            href="/settings"
            className="inline-flex items-center text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Settings
          </Link>

          <div className="mt-8 max-w-3xl sm:mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              YOUR TRAVEL PROFILE
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C2420] sm:text-5xl lg:text-6xl">
              Travel preferences
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#756D67] sm:text-base">
              Tell Vistara what feels like you. We’ll use your choices to
              shape the stays, places and experiences you discover.
            </p>
          </div>

          {/* Profile-style summary */}
          <div className="mt-8 flex flex-col gap-4 rounded-[26px] border border-[#E5DED6] bg-white p-5 shadow-[0_10px_35px_rgba(44,36,32,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-semibold text-[#2C2420]">
                Your Vistara profile
              </p>

              <p className="mt-1 text-sm text-[#756D67]">
                {selectedStyles.length} travel styles ·{" "}
                {selectedInterests.length} interests selected
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedStyles.slice(0, 3).map((style) => (
                <span
                  key={style}
                  className="rounded-full bg-[#E8DED0] px-3 py-1.5 text-xs font-semibold text-[#68705A]"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="space-y-6">

          {/* LANGUAGE + CURRENCY */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                DISPLAY
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                Language & currency
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#756D67]">
                Choose how your Vistara experience is displayed.
              </p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#2C2420]">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setSaved(false);
                  }}
                  className="mt-2 w-full rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] px-4 py-3.5 text-sm text-[#2C2420] outline-none transition focus:border-[#B76545] focus:bg-white focus:ring-4 focus:ring-[#B76545]/10"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#2C2420]">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setSaved(false);
                  }}
                  className="mt-2 w-full rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] px-4 py-3.5 text-sm text-[#2C2420] outline-none transition focus:border-[#B76545] focus:bg-white focus:ring-4 focus:ring-[#B76545]/10"
                >
                  <option>INR — Indian Rupee</option>
                  <option>USD — US Dollar</option>
                  <option>GBP — British Pound</option>
                  <option>EUR — Euro</option>
                </select>
              </div>
            </div>
          </section>

          {/* TRAVEL STYLE */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              TRAVEL STYLE
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
              How do you like to travel?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              Select everything that feels like your kind of journey.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
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
                    className={`rounded-full border px-5 py-3 text-sm font-semibold transition active:scale-[0.98] ${
                      active
                        ? "border-[#B76545] bg-[#B76545] text-white shadow-sm"
                        : "border-[#E5DED6] bg-[#FAF8F3] text-[#68705A] hover:border-[#B76545] hover:bg-white hover:text-[#965039]"
                    }`}
                  >
                    {active && "✓ "}
                    {style}
                  </button>
                );
              })}
            </div>
          </section>

          {/* INTERESTS */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              INTERESTS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
              What would you love to discover?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D67]">
              Pick the things you naturally look for when you travel.
            </p>

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
                    aria-pressed={active}
                    className={`group min-h-[92px] rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
                      active
                        ? "border-[#B76545] bg-[#E8DED0]"
                        : "border-[#E5DED6] bg-[#FAF8F3] hover:border-[#B76545]/50 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`mb-4 block h-2.5 w-2.5 rounded-full ${
                        active ? "bg-[#B76545]" : "bg-[#D5CDC3]"
                      }`}
                    />

                    <span
                      className={`text-sm font-semibold ${
                        active ? "text-[#2C2420]" : "text-[#68705A]"
                      }`}
                    >
                      {interest}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PERSONALIZATION */}
          <section className="overflow-hidden rounded-[28px] border border-[#E5DED6] bg-[#E8DED0]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                MADE FOR YOU
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                Let Vistara understand your travel style.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#756D67]">
                Your preferences can help shape recommendations across stays,
                destinations and local experiences.
              </p>

              <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[#E5DED6] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2C2420]">
                    Personalized recommendations
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#756D67]">
                    Use my preferences when showing recommendations.
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
                  className={`relative h-8 w-14 shrink-0 rounded-full transition ${
                    personalized ? "bg-[#B76545]" : "bg-[#D5CDC3]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                      personalized ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* SAVE */}
          <div className="sticky bottom-3 z-10 flex flex-col gap-3 rounded-2xl border border-[#E5DED6] bg-[#FAF8F3]/95 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
            <div className="px-2">
              {saved ? (
                <p className="text-sm font-semibold text-[#68705A]">
                  ✓ Preferences saved successfully
                </p>
              ) : (
                <p className="text-xs text-[#756D67]">
                  Your choices can be changed anytime.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-[#B76545] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(183,101,69,0.22)] transition hover:bg-[#965039] active:scale-[0.98]"
            >
              {saved ? "Saved ✓" : "Save preferences"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}