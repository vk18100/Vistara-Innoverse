"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const stats = [
  {
    value: "04",
    label: "Trips",
  },
  {
    value: "12",
    label: "Saved places",
  },
  {
    value: "08",
    label: "Experiences",
  },
];

const upcoming = {
  title: "A peaceful stay by the Ganges",
  location: "Varanasi, Uttar Pradesh",
  dates: "18 Oct – 21 Oct 2026",
  image:
    "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* ================= PROFILE HERO ================= */}
      <section className="relative overflow-hidden border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B76545]/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#68705A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* USER */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative w-fit">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#2C2420] font-serif text-3xl font-semibold text-white shadow-lg sm:h-28 sm:w-28 sm:text-4xl">
                  SG
                </div>

                <button
                  type="button"
                  aria-label="Edit profile picture"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#FAF8F3] bg-white text-sm text-[#2C2420] shadow-md transition hover:bg-[#E8DED0]"
                >
                  ✎
                </button>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
                  VISTARA TRAVELLER
                </p>

                <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#2C2420] sm:text-5xl">
                  Sristi Gupta
                </h1>

                <p className="mt-2 text-sm text-[#756D67]">
                  sristi@example.com
                </p>

                <p className="mt-1 text-xs text-[#756D67]/80">
                  Member since 2026
                </p>
              </div>
            </div>

            <Link
              href="/profile/edit"
              className="w-full rounded-xl border border-[#2C2420] bg-white px-6 py-3 text-center text-sm font-semibold text-[#2C2420] transition hover:bg-[#2C2420] hover:text-white sm:w-fit"
            >
              Edit profile
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-[#E5DED6] bg-white p-5 shadow-[0_10px_35px_rgba(44,36,32,0.05)] sm:p-6"
            >
              <p className="font-serif text-3xl font-semibold text-[#2C2420]">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-[#756D67]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">
          {/* LEFT */}
          <div className="space-y-7">
            {/* UPCOMING TRIP */}
            <div className="overflow-hidden rounded-[28px] border border-[#E5DED6] bg-white shadow-[0_15px_50px_rgba(44,36,32,0.06)]">
              <div className="flex flex-col gap-3 border-b border-[#E5DED6] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                    UPCOMING
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                    Your next trip
                  </h2>
                </div>

                <Link
                  href="/trips"
                  className="w-fit text-sm font-semibold text-[#B76545] transition hover:text-[#965039]"
                >
                  View all →
                </Link>
              </div>

              <div className="grid md:grid-cols-[220px_1fr]">
                <div className="h-56 md:h-full">
                  <img
                    src={upcoming.image}
                    alt={upcoming.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-7">
                  <span className="inline-flex rounded-full bg-[#E8DED0] px-3 py-1.5 text-xs font-bold text-[#68705A]">
                    Confirmed
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#2C2420]">
                    {upcoming.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#756D67]">
                    {upcoming.location}
                  </p>

                  <p className="mt-4 text-sm font-medium text-[#2C2420]">
                    {upcoming.dates}
                  </p>

                  <Link
                    href="/bookings/VS-2026-1048"
                    className="mt-6 inline-flex rounded-xl bg-[#B76545] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
                  >
                    View booking
                  </Link>
                </div>
              </div>
            </div>

            {/* SAVED PLACES */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-5 shadow-[0_15px_50px_rgba(44,36,32,0.05)] sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                    YOUR COLLECTION
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                    Saved places
                  </h2>
                </div>

                <Link
                  href="/wishlist"
                  className="shrink-0 text-sm font-semibold text-[#B76545] transition hover:text-[#965039]"
                >
                  See all →
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <SavedPlace
                  title="Goa"
                  image="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
                />

                <SavedPlace
                  title="Jaipur"
                  image="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80"
                />

                <SavedPlace
                  title="Varanasi"
                  image="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=600&q=80"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* QUICK ACCESS */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-5 shadow-[0_15px_50px_rgba(44,36,32,0.05)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                ACCOUNT
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                Quick access
              </h2>

              <div className="mt-6 space-y-2">
                <QuickLink
                  href="/trips"
                  icon="✦"
                  title="My trips"
                />

                <QuickLink
                  href="/bookings"
                  icon="⌂"
                  title="My bookings"
                />

                <QuickLink
                  href="/wishlist"
                  icon="♡"
                  title="Wishlist"
                />

                <QuickLink
                  href="/payments"
                  icon="₹"
                  title="Payments"
                />

                <QuickLink
                  href="/settings"
                  icon="⚙"
                  title="Settings"
                />
              </div>
            </div>

            {/* TRAVEL STYLE */}
            <div className="rounded-[28px] bg-[#2C2420] p-6 text-white shadow-[0_18px_55px_rgba(44,36,32,0.16)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                YOUR TRAVEL STYLE
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                Discover more of what you love.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Your saved places and trips help Vistara understand the
                kind of experiences you enjoy.
              </p>

              <Link
                href="/explore"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#2C2420] transition hover:bg-[#E8DED0]"
              >
                Discover places →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= SAVED PLACE ================= */

function SavedPlace({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Link
      href="/wishlist"
      className="group overflow-hidden rounded-2xl border border-[#E5DED6] bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-36 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-[#2C2420]">{title}</p>

        <p className="mt-1 text-xs text-[#756D67]">Saved place</p>
      </div>
    </Link>
  );
}

/* ================= QUICK LINK ================= */

function QuickLink({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-[#FAF8F3]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8DED0] text-sm text-[#2C2420] transition group-hover:bg-[#B76545] group-hover:text-white">
          {icon}
        </span>

        <span className="text-sm font-medium text-[#2C2420]">
          {title}
        </span>
      </div>

      <span className="text-[#756D67] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}