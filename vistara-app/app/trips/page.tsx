"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Compass,
  Heart,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type Trip = {
  id: string | number;
  title: string;
  location?: string;
  destination?: string;
  dates?: string;
  image?: string;
  status?: string;
};

type Place = {
  id: string | number;
  title?: string;
  name?: string;
  location?: string;
  image?: string;
};

type PlanningOption = {
  title: string;
  description: string;
  href: string;
  icon: "stay" | "experience" | "place";
};

type Inspiration = {
  title: string;
  location: string;
  image: string;
};

type TripsResponse = {
  upcomingTrip?: Trip | null;
  trips?: Trip[];
  completedTrips?: Trip[];
  recentPlaces?: Place[];
  savedPlaces?: Place[];
  inspiration?: Inspiration[];
};

const fallbackPlanningOptions: PlanningOption[] = [
  {
    title: "Find a stay",
    description: "Discover verified homes, villas and unique stays.",
    href: "/stays",
    icon: "stay",
  },
  {
    title: "Find experiences",
    description: "Explore meaningful things to do around you.",
    href: "/explore",
    icon: "experience",
  },
  {
    title: "Explore places",
    description: "Discover destinations worth remembering.",
    href: "/explore",
    icon: "place",
  },
];

const fallbackInspiration: Inspiration[] = [
  {
    title: "A slower weekend",
    location: "Patna, Bihar",
    image: "/images/pag1 (1).jpg",
  },
  {
    title: "Heritage & culture",
    location: "Bihar, India",
    image: "/images/pag1 (2).jpg",
  },
  {
    title: "Riverside moments",
    location: "Patna, Bihar",
    image: "/images/pag1 (3).jpg",
  },
];

const fallbackRecentPlaces: Place[] = [
  {
    id: "1",
    title: "Patna",
    location: "Bihar, India",
    image: "/images/pag1 (4).jpg",
  },
  {
    id: "2",
    title: "Heritage Bihar",
    location: "Bihar, India",
    image: "/images/pag1 (5).jpg",
  },
  {
    id: "3",
    title: "Riverside Escape",
    location: "Patna, Bihar",
    image: "/images/pag1 (6).jpg",
  },
];

function getPlaceName(place: Place) {
  return place.title || place.name || "Untitled place";
}

function getTripLocation(trip: Trip) {
  return trip.location || trip.destination || "India";
}

function PlanningIcon({ type }: { type: PlanningOption["icon"] }) {
  if (type === "stay") {
    return <MapPin size={21} strokeWidth={1.8} />;
  }

  if (type === "experience") {
    return <Sparkles size={21} strokeWidth={1.8} />;
  }

  return <Compass size={21} strokeWidth={1.8} />;
}

function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-[#EEF2FF]`}
      >
        <Compass
          size={32}
          strokeWidth={1.5}
          className="text-[#0D21A1]/50"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={className}
    />
  );
}

export default function TripsPage() {
  const [data, setData] = useState<TripsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTrips() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/trips", {
        cache: "no-store",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication required");
        }

        throw new Error("Unable to load your trips");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load your trips"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

  const upcomingTrip = data?.upcomingTrip;

  const trips = data?.trips ?? [];

  const completedTrips = data?.completedTrips ?? [];

  const recentPlaces =
    data?.recentPlaces && data.recentPlaces.length > 0
      ? data.recentPlaces
      : fallbackRecentPlaces;

  const savedPlaces = data?.savedPlaces ?? [];

  const inspiration =
    data?.inspiration && data.inspiration.length > 0
      ? data.inspiration
      : fallbackInspiration;

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-[#E6EAF2] bg-[#F8FAFF]">
        <div className="absolute right-[-120px] top-[-150px] h-[360px] w-[360px] rounded-full bg-[#0D21A1]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0D21A1]">
                YOUR TRIPS
              </p>

              <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#03045E] md:text-6xl">
                Plan your
                <br />
                soothing trip.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#64748B] md:text-lg">
                Bring your stays, places and experiences together in one
                thoughtful travel space.
              </p>
            </div>

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              <Plus size={18} />
              Create a Trip
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          AUTH / ERROR
      ========================================================== */}
      {error && (
        <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
          <div className="rounded-2xl border border-[#DCE3F0] bg-[#F8FAFF] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#03045E]">
                  {error}
                </p>

                <p className="mt-1 text-sm text-[#64748B]">
                  Your trip data could not be loaded right now.
                </p>
              </div>

              <button
                type="button"
                onClick={loadTrips}
                className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Try again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          UPCOMING TRIP
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              NEXT ESCAPE
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Your next journey
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="h-[330px] animate-pulse rounded-[28px] bg-[#EEF2FF]" />
        ) : upcomingTrip ? (
          <div className="overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_18px_55px_rgba(3,4,94,0.08)]">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <ImageWithFallback
                src={upcomingTrip.image || "/images/pag1 (7).jpg"}
                alt={upcomingTrip.title}
                className="h-[280px] w-full object-cover lg:h-[330px]"
              />

              <div className="flex flex-col justify-between p-7 lg:p-9">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#EEF2FF] px-3 py-1.5 text-xs font-semibold text-[#0D21A1]">
                      Upcoming
                    </span>

                    {upcomingTrip.dates && (
                      <span className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <CalendarDays size={14} />
                        {upcomingTrip.dates}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-serif text-4xl font-semibold tracking-tight">
                    {upcomingTrip.title}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm text-[#64748B]">
                    <MapPin size={16} />
                    {getTripLocation(upcomingTrip)}
                  </p>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-[#64748B]">
                    Everything you are planning for this journey, gathered in
                    one place.
                  </p>
                </div>

                <Link
                  href={`/trip/${upcomingTrip.id}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#03045E] transition hover:text-[#0D21A1]"
                >
                  View trip
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#CBD5E1] bg-[#F8FAFF] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF]">
              <Compass size={24} className="text-[#0D21A1]" />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold">
              Your next escape starts here.
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
              Start exploring stays, places and experiences and build your
              first trip.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white"
            >
              Start exploring
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* =========================================================
          PLAN YOUR JOURNEY
      ========================================================== */}
      <section className="border-y border-[#E6EAF2] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              PLAN YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Build your perfect trip.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Start with what you need and let your journey take shape.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {fallbackPlanningOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group rounded-[24px] border border-[#E2E8F0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-[0_15px_40px_rgba(3,4,94,0.07)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
                  <PlanningIcon type={option.icon} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {option.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {option.description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#0D21A1]">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          RECENTLY EXPLORED
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              RECENTLY EXPLORED
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Continue planning.
            </h2>
          </div>

          <Link
            href="/explore"
            className="hidden items-center gap-1 text-sm font-semibold text-[#03045E] sm:flex"
          >
            Explore all
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentPlaces.map((place) => (
            <Link
              key={place.id}
              href="/explore"
              className="group overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white"
            >
              <ImageWithFallback
                src={place.image}
                alt={getPlaceName(place)}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {getPlaceName(place)}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748B]">
                  <MapPin size={14} />
                  {place.location || "India"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          MY TRIPS
      ========================================================== */}
      {trips.length > 0 && (
        <section className="border-t border-[#E6EAF2] bg-[#F8FAFF]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                  MY TRIPS
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold">
                  Journeys you are building.
                </h2>
              </div>

              <span className="hidden text-sm text-[#64748B] sm:block">
                {trips.length} trips
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trip/${trip.id}`}
                  className="group flex overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white"
                >
                  <ImageWithFallback
                    src={trip.image || "/images/pag1 (1).jpg"}
                    alt={trip.title}
                    className="h-40 w-36 shrink-0 object-cover transition duration-500 group-hover:scale-105 sm:h-44 sm:w-44"
                  />

                  <div className="flex flex-1 flex-col justify-center p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#64748B]">
                      {trip.status || "Trip"}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl font-semibold">
                      {trip.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-[#64748B]">
                      <MapPin size={14} />
                      {getTripLocation(trip)}
                    </p>

                    <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#0D21A1]">
                      View trip
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          SAVED PLACES
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              SAVED FOR LATER
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Places you want to remember.
            </h2>
          </div>

          <Link
            href="/saved"
            className="hidden items-center gap-1 text-sm font-semibold text-[#03045E] sm:flex"
          >
            View saved
            <ChevronRight size={16} />
          </Link>
        </div>

        {savedPlaces.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedPlaces.map((place) => (
              <Link
                key={place.id}
                href="/saved"
                className="group overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white"
              >
                <ImageWithFallback
                  src={place.image}
                  alt={getPlaceName(place)}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold">{getPlaceName(place)}</h3>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {place.location || "India"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[24px] border border-dashed border-[#CBD5E1] bg-[#F8FAFF] px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Heart size={20} className="text-[#0D21A1]" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Nothing saved yet.
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              Save places you love and come back to them later.
            </p>

            <Link
              href="/explore"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0D21A1]"
            >
              Explore places
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>

      {/* =========================================================
          PAST TRIPS
      ========================================================== */}
      {completedTrips.length > 0 && (
        <section className="border-t border-[#E6EAF2] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              PAST TRIPS
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Places you have been.
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {completedTrips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trip/${trip.id}`}
                  className="group overflow-hidden rounded-[24px] border border-[#E2E8F0]"
                >
                  <ImageWithFallback
                    src={trip.image}
                    alt={trip.title}
                    className="h-52 w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold">
                      {trip.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {getTripLocation(trip)}
                    </p>

                    {trip.dates && (
                      <p className="mt-3 text-xs text-[#94A3B8]">
                        {trip.dates}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          INSPIRATION
      ========================================================== */}
      <section className="border-t border-[#E6EAF2] bg-[#03045E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                INSPIRATION
              </p>

              <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight">
                Maybe your next story starts somewhere unexpected.
              </h2>
            </div>

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#EEF2FF]"
            >
              Explore Vistara
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {inspiration.map((item) => (
              <Link
                key={item.title}
                href="/explore"
                className="group relative overflow-hidden rounded-[24px]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-medium text-white/70">
                    {item.location}
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}