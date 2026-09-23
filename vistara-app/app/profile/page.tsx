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
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* PROFILE HERO */}
      <section className="relative overflow-hidden border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#C6A15B]/10 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#0D21A1]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* USER */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#03045E] to-[#0D21A1] font-serif text-4xl font-semibold text-white shadow-xl">
                  SG
                </div>

                <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#F7F3EA] bg-white text-sm text-[#03045E] shadow">
                  ✎
                </button>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                  VISTARA TRAVELLER
                </p>

                <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                  Sristi Gupta
                </h1>

                <p className="mt-2 text-sm text-[#64748B]">
                  sristi@example.com
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  Member since 2026
                </p>
              </div>
            </div>
<Link
  href="/profile/edit"
  className="w-fit rounded-xl border border-[#03045E] bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
>
  Edit profile
</Link>
           
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-[#03045E]/10 bg-white p-6 shadow-[0_10px_35px_rgba(3,4,94,0.04)]"
            >
              <p className="font-serif text-3xl font-semibold">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-[#64748B]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">

          {/* LEFT */}
          <div className="space-y-7">

            {/* UPCOMING TRIP */}
            <div className="overflow-hidden rounded-[30px] border border-[#03045E]/10 bg-white shadow-[0_15px_50px_rgba(3,4,94,0.06)]">
              <div className="flex items-center justify-between border-b border-[#03045E]/10 p-6 md:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    UPCOMING
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    Your next trip
                  </h2>
                </div>

                <Link
                  href="/trips"
                  className="text-sm font-semibold text-[#0D21A1] hover:underline"
                >
                  View all
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

                <div className="p-6 md:p-7">
                  <span className="rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-emerald-700">
                    Confirmed
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-semibold">
                    {upcoming.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    {upcoming.location}
                  </p>

                  <p className="mt-4 text-sm font-medium text-[#03045E]">
                    {upcoming.dates}
                  </p>

                  <Link
                    href="/bookings/VS-2026-1048"
                    className="mt-6 inline-flex rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                  >
                    View booking
                  </Link>
                </div>
              </div>
            </div>

            {/* SAVED PLACES */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    YOUR COLLECTION
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    Saved places
                  </h2>
                </div>

                <Link
                  href="/wishlist"
                  className="text-sm font-semibold text-[#0D21A1] hover:underline"
                >
                  See all
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
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                ACCOUNT
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
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
            <div className="rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.16)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                YOUR TRAVEL STYLE
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                Discover more of what you love.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Your saved places and trips help Vistara understand
                the kind of experiences you enjoy.
              </p>

              <Link
                href="/explore"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Explore places
              </Link>
            </div>
          </div>
        </div>

        {/* ACCOUNT INFORMATION */}
        <div className="mt-7 rounded-[30px] border border-[#03045E]/10 bg-[#FAFAF8] p-7 md:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PROFILE
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Keep your profile up to date
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Add your preferences and personal details to make
                future Vistara trips easier.
              </p>
            </div>

           <Link
  href="/profile/edit"
  className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
>
  Manage profile
</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

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
      className="group overflow-hidden rounded-2xl border border-[#03045E]/10 bg-white"
    >
      <div className="h-36 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#64748B]">
          Saved place
        </p>
      </div>
    </Link>
  );
}

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
      className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-[#F7F3EA]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF] text-sm text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
          {icon}
        </span>

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <span className="text-[#94A3B8] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}