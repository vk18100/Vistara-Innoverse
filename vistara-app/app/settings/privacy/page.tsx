"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function PrivacyPage() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showInterests, setShowInterests] = useState(true);
  const [personalized, setPersonalized] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState(true);
  const [travelUpdates, setTravelUpdates] = useState(true);
  const [offers, setOffers] = useState(false);

  const [saved, setSaved] = useState(false);

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
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-10">
          <Link
            href="/settings"
            className="inline-flex items-center text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Back to settings
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E5DED6] bg-white text-[#B76545] shadow-sm">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3L19 6V11C19 16 16 19 12 21C8 19 5 16 5 11V6L12 3Z" />
                <path d="M9.5 12L11.3 13.8L15 10" />
              </svg>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              PRIVACY & CONTROL
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C2420] sm:text-5xl">
              Your privacy, your choice.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#756D67] sm:text-base">
              Manage what you share, how Vistara personalizes your journey,
              and how you receive communication from us.
            </p>
          </div>

          {/* PRIVACY STATUS */}
          <div className="mt-8 flex flex-col gap-4 rounded-[26px] border border-[#E5DED6] bg-white p-5 shadow-[0_12px_35px_rgba(44,36,32,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8DED0] text-[#68705A]">
                <span className="text-lg">✓</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#2C2420]">
                  Privacy controls are active
                </p>

                <p className="mt-1 text-xs text-[#756D67]">
                  You can change these settings whenever you want.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-[#E8DED0] px-3 py-1.5 text-xs font-semibold text-[#68705A]">
              Protected
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="space-y-6">

          {/* PROFILE VISIBILITY */}
          <SettingCard
            eyebrow="PROFILE"
            title="Profile visibility"
            description="Choose what other Vistara users can see when they visit your profile."
          >
            <Toggle
              title="Public profile"
              description="Allow other Vistara users to view your profile."
              checked={profileVisible}
              onChange={setProfileVisible}
            />

            <Toggle
              title="Show travel interests"
              description="Display your selected travel interests on your profile."
              checked={showInterests}
              onChange={setShowInterests}
            />
          </SettingCard>

          {/* PERSONALIZATION */}
          <SettingCard
            eyebrow="PERSONALIZATION"
            title="A Vistara experience shaped around you"
            description="Control whether your activity is used to make your recommendations more relevant."
          >
            <Toggle
              title="Personalised recommendations"
              description="Use your searches, saved places and bookings to improve recommendations."
              checked={personalized}
              onChange={setPersonalized}
            />

            <Toggle
              title="Recently viewed places"
              description="Allow Vistara to remember places and stays you have recently viewed."
              checked={recentlyViewed}
              onChange={setRecentlyViewed}
            />
          </SettingCard>

          {/* COMMUNICATIONS */}
          <SettingCard
            eyebrow="COMMUNICATIONS"
            title="Stay informed, your way"
            description="Choose the messages you want to receive from Vistara."
          >
            <Toggle
              title="Travel updates"
              description="Receive important information about bookings, trips and reservations."
              checked={travelUpdates}
              onChange={setTravelUpdates}
            />

            <Toggle
              title="Offers & experiences"
              description="Receive occasional travel inspiration, offers and experience recommendations."
              checked={offers}
              onChange={setOffers}
            />
          </SettingCard>

          {/* DATA */}
          <SettingCard
            eyebrow="YOUR DATA"
            title="Your information"
            description="Keep track of the information connected to your Vistara account."
          >
            <Link
              href="/settings/account"
              className="group flex items-center justify-between gap-5 rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] p-5 transition hover:border-[#B76545]/40 hover:bg-white"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8DED0] text-[#68705A]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 21C5.8 16.8 8.2 15 12 15C15.8 15 18.2 16.8 19 21" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#2C2420]">
                    Manage account data
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#756D67]">
                    Review your account information and personal details.
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xl text-[#756D67] transition group-hover:translate-x-1 group-hover:text-[#B76545]">
                →
              </span>
            </Link>
          </SettingCard>

          {/* PRIVACY NOTE */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-[#E8DED0] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#B76545] shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3L19 6V11C19 16 16 19 12 21C8 19 5 16 5 11V6L12 3Z" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                  YOUR CONTROL
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                  You stay in control.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#756D67]">
                  These settings help you decide how your Vistara account
                  appears, how recommendations are personalized and what
                  communication you receive.
                </p>
              </div>
            </div>
          </section>

          {/* SAVE */}
          <div className="sticky bottom-3 z-10 flex flex-col gap-3 rounded-2xl border border-[#E5DED6] bg-[#FAF8F3]/95 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
            <div className="px-2">
              {saved ? (
                <p className="text-sm font-semibold text-[#68705A]">
                  ✓ Privacy settings saved
                </p>
              ) : (
                <p className="text-xs text-[#756D67]">
                  Changes are saved when you press save.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-[#B76545] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(183,101,69,0.22)] transition hover:bg-[#965039] active:scale-[0.98]"
            >
              {saved ? "Saved ✓" : "Save privacy settings"}
            </button>
          </div>

          {/* DANGER ZONE */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              ACCOUNT CLOSURE
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
              Delete your account
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#756D67]">
              Permanently remove your Vistara account and associated
              information. This action should only be used if you no longer
              want to use your account.
            </p>

            <button
              type="button"
              className="mt-6 rounded-2xl border border-[#D8B5A8] px-5 py-3 text-sm font-semibold text-[#965039] transition hover:bg-[#F8EEE9]"
            >
              Delete my account
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------- */
/* SETTING CARD */
/* -------------------------------------------------- */

function SettingCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D67]">
        {description}
      </p>

      <div className="mt-6 divide-y divide-[#E5DED6]">
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* TOGGLE */
/* -------------------------------------------------- */

function Toggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#2C2420]">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-[#756D67]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition ${
          checked ? "bg-[#B76545]" : "bg-[#D5CDC3]"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition ${
            checked ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}