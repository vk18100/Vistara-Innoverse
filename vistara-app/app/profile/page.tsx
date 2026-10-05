"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type User = {
  name?: string;
  email?: string;
  image?: string | null;
  createdAt?: string;
};

type Trip = {
  id: string;
  title: string;
  location: string;
  date: string;
  image?: string;
  status?: string;
};

type WishlistItem = {
  id: string;
  title: string;
  location?: string;
  image?: string;
};

type ProfileData = {
  user: User;
  trips: Trip[];
  wishlist: WishlistItem[];
  bookings: any[];
  payments: any[];
};

const defaultUser: User = {
  name: "Sristi Gupta",
  email: "sristi@example.com",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    user: defaultUser,
    trips: [],
    wishlist: [],
    bookings: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/api/profile", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Unable to load profile");
        }

        const data = await res.json();

        setProfile({
          user: data.user ?? defaultUser,
          trips: data.trips ?? [],
          wishlist: data.wishlist ?? [],
          bookings: data.bookings ?? [],
          payments: data.payments ?? [],
        });
      } catch (error) {
        console.error("Profile error:", error);

        setProfile((prev) => ({
          ...prev,
          user: defaultUser,
        }));
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  const user = profile.user;

  const displayName =
    user.name?.trim() || "Sristi Gupta";

  const displayEmail =
    user.email?.trim() || "sristi@example.com";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* USER */}
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#03045E] text-lg font-semibold text-white">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials || "SG"
                )}
              </div>

              {/* Info */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
                  VISTARA TRAVELLER
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                  {loading ? "Loading..." : displayName}
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* EDIT */}
            <Link
              href="/profile/edit"
              className="inline-flex w-fit items-center justify-center rounded-lg border border-black bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Edit profile
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN PROFILE CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8">

        {/* INTRO */}
        <div className="mb-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            YOUR ACCOUNT
          </p>

          <h2 className="mt-1 text-xl font-semibold text-black">
            Your Vistara journey
          </h2>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          <SmallStat
            number={profile.trips.length}
            label="Trips"
          />

          <SmallStat
            number={profile.wishlist.length}
            label="Saved places"
          />

          <SmallStat
            number={profile.bookings.length}
            label="Bookings"
          />

          <SmallStat
            number={profile.payments.length}
            label="Payments"
          />

        </div>

        {/* =====================================================
            TRIPS
        ===================================================== */}

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {/* Heading */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                TRAVEL
              </p>

              <h3 className="mt-1 text-lg font-semibold text-black">
                My trips
              </h3>
            </div>

            <Link
              href="/trips"
              className="text-xs font-semibold text-black underline-offset-4 hover:underline"
            >
              View trips →
            </Link>
          </div>

          {/* Trip content */}
          <div className="p-5 sm:p-6">

            {profile.trips.length === 0 ? (
              <EmptyTrips />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {profile.trips.slice(0, 6).map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                  />
                ))}

              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            WISHLIST
        ===================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">

          {/* Heading */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                SAVED
              </p>

              <h3 className="mt-1 text-lg font-semibold text-black">
                Wishlist
              </h3>
            </div>

            <Link
              href="/wishlist"
              className="text-xs font-semibold text-black underline-offset-4 hover:underline"
            >
              View wishlist →
            </Link>
          </div>

          {/* Wishlist content */}
          <div className="p-5 sm:p-6">

            {profile.wishlist.length === 0 ? (
              <EmptyWishlist />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                {profile.wishlist.slice(0, 8).map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                  />
                ))}

              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            BOOKINGS + PAYMENTS
        ===================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <SimpleAccountCard
            href="/bookings"
            title="Bookings"
            description="View your accommodation and travel bookings."
            count={profile.bookings.length}
          />

          <SimpleAccountCard
            href="/payments"
            title="Payments"
            description="View your payment history and transactions."
            count={profile.payments.length}
          />

        </div>

      </section>

      <Footer />
    </main>
  );
}


/* ============================================================
   SMALL STAT
============================================================ */

function SmallStat({
  number,
  label,
}: {
  number: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">

      <p className="text-xl font-semibold leading-none text-black">
        {number}
      </p>

      <p className="mt-1.5 text-[11px] text-slate-500">
        {label}
      </p>

    </div>
  );
}


/* ============================================================
   TRIP CARD
============================================================ */

function TripCard({
  trip,
}: {
  trip: Trip;
}) {
  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-black hover:shadow-sm"
    >

      {/* IMAGE */}
      <div className="h-40 overflow-hidden bg-slate-100">

        {trip.image ? (
          <img
            src={trip.image}
            alt={trip.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}

      </div>

      {/* INFO */}
      <div className="p-4">

        {trip.status && (
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            {trip.status}
          </span>
        )}

        <h4 className="mt-1 text-sm font-semibold text-black">
          {trip.title}
        </h4>

        <p className="mt-1 text-xs text-slate-500">
          {trip.location}
        </p>

        <p className="mt-3 text-[11px] font-medium text-black">
          {trip.date}
        </p>

      </div>
    </Link>
  );
}


/* ============================================================
   WISHLIST CARD
============================================================ */

function WishlistCard({
  item,
}: {
  item: WishlistItem;
}) {
  return (
    <Link
      href={`/wishlist/${item.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-black hover:shadow-sm"
    >

      <div className="h-32 overflow-hidden bg-slate-100">

        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}

      </div>

      <div className="p-3">

        <p className="truncate text-xs font-semibold text-black">
          {item.title}
        </p>

        {item.location && (
          <p className="mt-1 truncate text-[11px] text-slate-500">
            {item.location}
          </p>
        )}

      </div>

    </Link>
  );
}


/* ============================================================
   EMPTY TRIPS
============================================================ */

function EmptyTrips() {
  return (
    <div className="rounded-xl bg-[#f7f7f7] px-5 py-9 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-black shadow-sm">
        ✦
      </div>

      <h4 className="mt-3 text-sm font-semibold text-black">
        No trips yet
      </h4>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
        Your upcoming and completed trips will appear here.
      </p>

      <Link
        href="/explore"
        className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-slate-800"
      >
        Explore places
      </Link>

    </div>
  );
}


/* ============================================================
   EMPTY WISHLIST
============================================================ */

function EmptyWishlist() {
  return (
    <div className="rounded-xl bg-[#f7f7f7] px-5 py-9 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-black shadow-sm">
        ♡
      </div>

      <h4 className="mt-3 text-sm font-semibold text-black">
        Your wishlist is empty
      </h4>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
        Save stays and places you would like to explore later.
      </p>

      <Link
        href="/explore"
        className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-slate-800"
      >
        Explore places
      </Link>

    </div>
  );
}


/* ============================================================
   BOOKINGS / PAYMENTS
============================================================ */

function SimpleAccountCard({
  href,
  title,
  description,
  count,
}: {
  href: string;
  title: string;
  description: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-black"
    >

      <div>

        <p className="text-sm font-semibold text-black">
          {title}
        </p>

        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
          {description}
        </p>

        <p className="mt-3 text-[11px] font-medium text-black">
          {count} {count === 1 ? "record" : "records"}
        </p>

      </div>

      <span className="ml-4 text-sm text-slate-400 transition group-hover:translate-x-1 group-hover:text-black">
        →
      </span>

    </Link>
  );
}