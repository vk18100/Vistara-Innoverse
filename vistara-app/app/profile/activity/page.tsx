"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const activities = [
  {
    id: 1,
    title: "Booking confirmed",
    description: "You booked Peaceful Stay in Patna.",
    date: "September 22, 2026",
    time: "10:42 AM",
    type: "booking",
  },
  {
    id: 2,
    title: "Added to wishlist",
    description: "You saved Luxury Villa to your wishlist.",
    date: "September 20, 2026",
    time: "6:18 PM",
    type: "wishlist",
  },
  {
    id: 3,
    title: "Profile updated",
    description: "You updated your personal information.",
    date: "September 18, 2026",
    time: "4:30 PM",
    type: "profile",
  },
  {
    id: 4,
    title: "Property viewed",
    description: "You viewed Mountain Retreat.",
    date: "September 17, 2026",
    time: "9:15 PM",
    type: "view",
  },
];

const activityStyles = {
  booking: {
    icon: "✓",
    label: "Booking",
  },
  wishlist: {
    icon: "♡",
    label: "Wishlist",
  },
  profile: {
    icon: "●",
    label: "Profile",
  },
  view: {
    icon: "◉",
    label: "Viewed",
  },
};

export default function Activity() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
          <Link
            href="/profile"
            className="inline-flex items-center text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Back to profile
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B76545]">
              ACCOUNT
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C2420] sm:text-5xl">
              Account activity
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#756D67] sm:text-base">
              Keep track of your recent bookings, saved places, profile
              changes and the properties you have explored.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACTIVITY ================= */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
        {activities.length > 0 ? (
          <div className="grid gap-7 lg:grid-cols-[1fr_280px]">
            {/* ACTIVITY LIST */}
            <div>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                    RECENT
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C2420]">
                    Your activity
                  </h2>
                </div>

                <span className="rounded-full bg-[#E8DED0] px-3 py-1.5 text-xs font-semibold text-[#68705A]">
                  {activities.length} activities
                </span>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => {
                  const style =
                    activityStyles[
                      activity.type as keyof typeof activityStyles
                    ];

                  return (
                    <div
                      key={activity.id}
                      className="group rounded-[24px] border border-[#E5DED6] bg-white p-5 shadow-[0_10px_35px_rgba(44,36,32,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#B76545]/40 hover:shadow-[0_15px_40px_rgba(44,36,32,0.08)] sm:p-6"
                    >
                      <div className="flex gap-4 sm:gap-5">
                        {/* ICON */}
                        <div className="relative shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8DED0] font-semibold text-[#B76545] transition group-hover:bg-[#B76545] group-hover:text-white">
                            {style.icon}
                          </div>

                          {activity.id !== activities.length && (
                            <div className="absolute left-1/2 top-14 hidden h-10 w-px -translate-x-1/2 bg-[#E5DED6] sm:block" />
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-serif text-xl font-semibold text-[#2C2420]">
                                  {activity.title}
                                </h3>

                                <span className="rounded-full bg-[#FAF8F3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#68705A]">
                                  {style.label}
                                </span>
                              </div>

                              <p className="mt-2 text-sm leading-6 text-[#756D67]">
                                {activity.description}
                              </p>
                            </div>

                            {/* DATE */}
                            <div className="shrink-0 sm:text-right">
                              <p className="text-xs font-semibold text-[#2C2420]">
                                {activity.date}
                              </p>

                              <p className="mt-1 text-xs text-[#756D67]">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= SIDE CARD ================= */}
            <aside className="h-fit space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[28px] bg-[#2C2420] p-6 text-white shadow-[0_18px_50px_rgba(44,36,32,0.14)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                  YOUR JOURNEY
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold">
                  Keep exploring.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  Your bookings, saved places and discoveries will keep
                  building your Vistara journey.
                </p>

                <Link
                  href="/stays"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#B76545] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
                >
                  Discover stays
                </Link>
              </div>

              <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                  ACTIVITY
                </p>

                <div className="mt-5 space-y-4">
                  <MiniStat
                    value={activities.length.toString().padStart(2, "0")}
                    label="Recent activities"
                  />

                  <div className="h-px bg-[#E5DED6]" />

                  <MiniStat
                    value="01"
                    label="Confirmed booking"
                  />

                  <div className="h-px bg-[#E5DED6]" />

                  <MiniStat
                    value="01"
                    label="Wishlist update"
                  />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="mx-auto max-w-xl rounded-[30px] border border-[#E5DED6] bg-white p-8 text-center shadow-[0_15px_50px_rgba(44,36,32,0.05)] sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8DED0] text-2xl text-[#B76545]">
              ◷
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#2C2420]">
              No activity yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756D67]">
              Your bookings, wishlist updates and other account activity
              will appear here as you explore Vistara.
            </p>

            <Link
              href="/stays"
              className="mt-7 inline-flex rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
            >
              Discover stays
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

/* ================= MINI STAT ================= */

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-serif text-3xl font-semibold text-[#2C2420]">
        {value}
      </span>

      <span className="text-right text-xs font-medium text-[#756D67]">
        {label}
      </span>
    </div>
  );
}