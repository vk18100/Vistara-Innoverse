"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "../footer/page";

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: "upcoming" | "completed";
  image: string;

  stay: {
    name: string;
    pricePerNight: number;
  };

  experience: {
    name: string;
    duration: string;
  };
};

type RecentPlace = {
  id: string;
  title: string;
  location: string;
  image: string;
};

type Inspiration = {
  id: string;
  title: string;
  image: string;
};

type TripsData = {
  upcomingTrip: Trip | null;
  trips: Trip[];
  completedTrips: Trip[];
  recentPlaces: RecentPlace[];
  savedPlaces: unknown[];
  inspiration: Inspiration[];
};

type ApiResponse = {
  success: boolean;
  data?: TripsData;
  message?: string;
};

export default function TripPage() {
  const [data, setData] = useState<TripsData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrips() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/trips", {
          method: "GET",
          cache: "no-store",
        });

        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Unable to load trips."
          );
        }

        setData(result.data);
      } catch (error) {
        console.error("Trips page error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your trips."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-[#EEF2FF]" />

            <div className="mt-5 h-12 w-[420px] max-w-full rounded bg-[#EEF2FF]" />

            <div className="mt-5 h-5 w-[550px] max-w-full rounded bg-[#F1F5F9]" />
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="h-[380px] rounded-[28px] bg-[#F1F5F9] animate-pulse" />

            <div className="h-[380px] rounded-[28px] bg-[#F1F5F9] animate-pulse" />
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error || !data) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
          <div className="w-full max-w-md rounded-[28px] border border-[#E1E6F2] bg-white p-10 text-center shadow-[0_15px_50px_rgba(3,4,94,0.08)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF] text-2xl text-[#0D21A1]">
              !
            </div>

            <h1 className="mt-6 font-serif text-3xl font-semibold">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {error || "Unable to load your trips."}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-7 rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Try again
            </button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const {
    upcomingTrip,
    completedTrips,
    recentPlaces,
    savedPlaces,
    inspiration,
  } = data;

  /*
  |--------------------------------------------------------------------------
  | MAIN PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="border-b border-[#E8EBF5] bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF2FF]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
              YOUR TRIPS
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#03045E] md:text-6xl">
              Plan your soothing trip.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#64748B]">
              Take a break, discover somewhere beautiful, and let Vistara
              help you bring every part of your journey together.
            </p>

            <Link
              href="/stays"
              className="mt-8 inline-flex rounded-xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Create a Trip
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          UPCOMING TRIP
      ================================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
            UPCOMING
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            Your next escape
          </h2>
        </div>

        {upcomingTrip ? (
          <div className="overflow-hidden rounded-[28px] border border-[#E1E6F2] bg-white shadow-[0_15px_50px_rgba(3,4,94,0.08)]">
            <div className="grid lg:grid-cols-[1.05fr_1fr]">
              {/* IMAGE */}

              <div className="relative min-h-[320px] overflow-hidden bg-[#EEF2FF]">
                <img
                  src={upcomingTrip.image}
                  alt={upcomingTrip.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

                <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#03045E] shadow-sm">
                  UPCOMING TRIP
                </div>
              </div>

              {/* DETAILS */}

              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="text-sm font-medium text-[#64748B]">
                  {formatDate(upcomingTrip.startDate)} –{" "}
                  {formatDate(upcomingTrip.endDate)} ·{" "}
                  {upcomingTrip.nights} nights
                </p>

                <h3 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
                  {upcomingTrip.title}
                </h3>

                <p className="mt-2 text-sm text-[#64748B]">
                  📍 {upcomingTrip.destination}
                </p>

                <div className="my-7 h-px bg-[#E8EBF5]" />

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* STAY */}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                      STAY
                    </p>

                    <p className="mt-2 font-semibold text-[#03045E]">
                      {upcomingTrip.stay.name}
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      ₹
                      {upcomingTrip.stay.pricePerNight.toLocaleString(
                        "en-IN"
                      )}{" "}
                      / night
                    </p>
                  </div>

                  {/* EXPERIENCE */}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                      EXPERIENCE
                    </p>

                    <p className="mt-2 font-semibold text-[#03045E]">
                      {upcomingTrip.experience.name}
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {upcomingTrip.experience.duration}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/trips/${upcomingTrip.id}`}
                  className="mt-8 w-fit rounded-xl border border-[#03045E] px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
                >
                  View Trip
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon="✦"
            title="No upcoming trips"
            description="Start planning your next Vistara journey."
            href="/stays"
            buttonText="Find a stay"
          />
        )}
      </section>

      {/* ================================================================
          PLAN YOUR JOURNEY
      ================================================================= */}

      <section className="bg-[#F7F8FC]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
              PLAN YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
              Build your perfect trip
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748B]">
              Find a beautiful stay, add experiences and discover places
              around your destination.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <PlanningCard
              icon="⌂"
              title="Find a Stay"
              description="Discover beautiful villas, homes and stays for your journey."
              href="/stays"
            />

            <PlanningCard
              icon="✦"
              title="Experiences"
              description="Add local experiences, food trails and memorable activities."
              href="/explore"
            />

            <PlanningCard
              icon="⌖"
              title="Explore Places"
              description="Discover destinations and hidden places worth visiting."
              href="/explore"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          RECENTLY EXPLORED
      ================================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
            RECENTLY EXPLORED
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            Continue planning
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            Pick up where you left off.
          </p>
        </div>

        {recentPlaces.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentPlaces.map((place) => (
              <Link
                href="/explore"
                key={place.id}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#EEF2FF]">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-[#03045E]">
                  {place.title}
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  {place.location}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="⌖"
            title="Nothing explored yet"
            description="Explore beautiful destinations and discover something new."
            href="/explore"
            buttonText="Explore places"
          />
        )}
      </section>

      {/* ================================================================
          COMPLETED TRIPS
      ================================================================= */}

      {completedTrips.length > 0 && (
        <section className="bg-[#F7F8FC]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
                YOUR JOURNEY
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
                Past trips
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {completedTrips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group overflow-hidden rounded-3xl border border-[#E1E6F2] bg-white transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(3,4,94,0.08)]"
                >
                  <div className="grid sm:grid-cols-[180px_1fr]">
                    <div className="h-48 overflow-hidden sm:h-full">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0D21A1]">
                        Completed
                      </span>

                      <h3 className="mt-4 font-serif text-2xl font-semibold text-[#03045E]">
                        {trip.title}
                      </h3>

                      <p className="mt-2 text-sm text-[#64748B]">
                        📍 {trip.destination}
                      </p>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {formatDate(trip.startDate)} –{" "}
                        {formatDate(trip.endDate)}
                      </p>

                      <p className="mt-5 text-sm font-semibold text-[#0D21A1]">
                        View journey →
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          SAVED
      ================================================================= */}

      <section className="border-y border-[#E8EBF5] bg-[#F9FAFD]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
                SAVED FOR LATER
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
                Places you love
              </h2>
            </div>

            <Link
              href="/saved"
              className="text-sm font-semibold text-[#0D21A1]"
            >
              View all →
            </Link>
          </div>

          {savedPlaces.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#E1E6F2] bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-2xl text-[#0D21A1]">
                ♡
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#03045E]">
                Nothing saved yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
                Save stays and experiences you love, and come back to them
                whenever you are ready.
              </p>

              <Link
                href="/explore"
                className="mt-6 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Explore places
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              {/* Saved places will come here from the API */}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          INSPIRATION
      ================================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
            FIND INSPIRATION
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            More places to make your trip special
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {inspiration.map((item) => (
            <Link
              href="/explore"
              key={item.id}
              className="group relative h-72 overflow-hidden rounded-[28px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/80 via-[#03045E]/10 to-transparent" />

              <h3 className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ==========================================================================
   PLANNING CARD
============================================================================ */

function PlanningCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#E1E6F2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0D21A1] hover:shadow-[0_15px_40px_rgba(3,4,94,0.08)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-2xl text-[#0D21A1]">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-[#03045E]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#64748B]">
        {description}
      </p>

      <span className="mt-6 inline-block text-sm font-semibold text-[#0D21A1] transition group-hover:translate-x-1">
        Explore →
      </span>
    </Link>
  );
}

/* ==========================================================================
   EMPTY STATE
============================================================================ */

function EmptyState({
  icon,
  title,
  description,
  href,
  buttonText,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E1E6F2] bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-2xl text-[#0D21A1]">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-semibold text-[#03045E]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
        {description}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
      >
        {buttonText}
      </Link>
    </div>
  );
}

/* ==========================================================================
   DATE FORMATTER
============================================================================ */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}