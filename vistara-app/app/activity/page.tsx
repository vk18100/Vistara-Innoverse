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

export default function Activity() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/profile"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Profile
        </Link>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#03045e]">
            Account Activity
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Review your recent account activity, including bookings, wishlist
            updates, and profile changes.
          </p>
        </div>

        {/* Activity List */}
        {activities.length > 0 ? (
          <div className="mt-10 space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#023e8a]"
              >
                {/* Activity Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03045e] text-white">
                  {activity.type === "booking" && "✓"}
                  {activity.type === "wishlist" && "♡"}
                  {activity.type === "profile" && "●"}
                  {activity.type === "view" && "◉"}
                </div>

                {/* Activity Content */}
                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-semibold text-[#03045e]">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-xs font-medium text-gray-500">
                        {activity.date}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-[#03045e]">
              No activity yet.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your bookings, wishlist changes and other account activity will
              appear here.
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-block rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Explore stays
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
