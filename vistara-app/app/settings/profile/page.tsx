"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {/* Profile Header */}
        <div className="overflow-hidden rounded-[30px] border border-[#E5DED6] bg-white shadow-[0_15px_45px_rgba(44,36,32,0.06)]">
          <div className="bg-[#E8DED0] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              
              <div className="flex items-center gap-5">
                {/* Profile image */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#B76545] shadow-md">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#68705A]">
                    VISTARA MEMBER
                  </p>

                  <h1 className="mt-2 font-serif text-3xl font-semibold text-[#2C2420]">
                    Sristi Gupta
                  </h1>

                  <p className="mt-1 text-sm text-[#756D67]">
                    sristigupta@example.com
                  </p>
                </div>
              </div>

              {/* CONNECTED TO SETTINGS/PROFILE */}
              <Link
                href="/settings/profile"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
              >
                Edit profile
              </Link>
            </div>
          </div>

          {/* Profile information */}
          <div className="grid gap-5 p-6 sm:grid-cols-2 md:p-10">
            <ProfileInfo
              label="Location"
              value="Patna, Bihar"
            />

            <ProfileInfo
              label="Travel style"
              value="Cultural · Relaxed"
            />

            <ProfileInfo
              label="Interests"
              value="Heritage · Culture"
            />

            <ProfileInfo
              label="Member since"
              value="September 2026"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/trips"
            className="group rounded-[24px] border border-[#E5DED6] bg-white p-6 transition hover:-translate-y-1 hover:border-[#B76545]/40 hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#68705A]">
              JOURNEYS
            </p>

            <h2 className="mt-2 font-serif text-xl font-semibold text-[#2C2420]">
              My trips
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              View your planned and completed journeys.
            </p>

            <span className="mt-5 block text-sm font-semibold text-[#B76545]">
              View trips →
            </span>
          </Link>

          <Link
            href="/saved"
            className="group rounded-[24px] border border-[#E5DED6] bg-white p-6 transition hover:-translate-y-1 hover:border-[#B76545]/40 hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#68705A]">
              SAVED
            </p>

            <h2 className="mt-2 font-serif text-xl font-semibold text-[#2C2420]">
              Wishlist
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              See the stays and places you have saved.
            </p>

            <span className="mt-5 block text-sm font-semibold text-[#B76545]">
              View saved →
            </span>
          </Link>

          <Link
            href="/activity"
            className="group rounded-[24px] border border-[#E5DED6] bg-white p-6 transition hover:-translate-y-1 hover:border-[#B76545]/40 hover:shadow-lg"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#68705A]">
              ACCOUNT
            </p>

            <h2 className="mt-2 font-serif text-xl font-semibold text-[#2C2420]">
              Activity
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              Review your recent account activity.
            </p>

            <span className="mt-5 block text-sm font-semibold text-[#B76545]">
              View activity →
            </span>
          </Link>
        </div>

        {/* Travel preferences */}
        <div className="mt-6 rounded-[28px] border border-[#E5DED6] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#68705A]">
                TRAVEL IDENTITY
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                Make your Vistara experience more personal
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D67]">
                Update your travel preferences so Vistara can understand
                the stays, destinations and experiences you enjoy.
              </p>
            </div>

            {/* Same detailed settings page */}
            <Link
              href="/settings/profile"
              className="shrink-0 rounded-xl border border-[#B76545] px-5 py-3 text-sm font-semibold text-[#B76545] transition hover:bg-[#B76545] hover:text-white"
            >
              Edit profile →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#68705A]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#2C2420]">
        {value}
      </p>
    </div>
  );
}