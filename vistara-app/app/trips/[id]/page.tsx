"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function TripDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        const response = await fetch("/api/trips");

        const result = await response.json();

        if (result.success) {
          const foundTrip = result.data.trips.find(
            (item: Trip) => item.id === id
          );

          setTrip(foundTrip ?? null);
        }
      } catch (error) {
        console.error("Unable to load trip:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#03045E]" />

          <p className="mt-5 text-sm text-[#64748B]">
            Loading your journey...
          </p>
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              TRIP NOT FOUND
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold text-[#03045E]">
              We couldn't find this journey.
            </h1>

            <Link
              href="/trips"
              className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Back to trips
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const totalStay =
    trip.stay.pricePerNight * trip.nights;

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#03045E]">

      {/* =========================================================
          TOP BAR
      ========================================================= */}

      <header className="border-b border-[#E8EBF5] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          <Link
            href="/trips"
            className="flex items-center gap-2 text-sm font-semibold text-[#03045E] transition hover:text-[#0D21A1]"
          >
            <span className="text-lg">←</span>
            Back to trips
          </Link>

          <span className="font-serif text-2xl font-semibold tracking-tight">
            Vistara
          </span>

          <button className="rounded-xl border border-[#DCE1EF] px-4 py-2 text-sm font-medium hover:border-[#03045E]">
            Share
          </button>

        </div>
      </header>


      {/* =========================================================
          HERO IMAGE
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">

        <div className="relative h-[420px] overflow-hidden rounded-[32px]">

          <img
            src={trip.image}
            alt={trip.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/80 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white md:left-12 md:bottom-10">

            <div className="mb-4 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#03045E]">
                {trip.status}
              </span>

              <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-medium backdrop-blur-md">
                {trip.nights} nights
              </span>

            </div>

            <h1 className="font-serif text-5xl font-semibold leading-tight md:text-6xl">
              {trip.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-base text-white/90">
              <span>📍</span>
              {trip.destination}
            </p>

          </div>
        </div>

      </section>


      {/* =========================================================
          TRIP SUMMARY
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-4 md:grid-cols-3">

          <InfoCard
            label="DATES"
            value={`${formatDate(trip.startDate)} — ${formatDate(
              trip.endDate
            )}`}
            icon="◷"
          />

          <InfoCard
            label="DURATION"
            value={`${trip.nights} nights`}
            icon="◌"
          />

          <InfoCard
            label="DESTINATION"
            value={trip.destination}
            icon="⌖"
          />

        </div>

      </section>


      {/* =========================================================
          JOURNEY
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}

          <div>

            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                YOUR JOURNEY
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold">
                Everything for your trip
              </h2>
            </div>


            {/* STAY */}

            <div className="rounded-[28px] border border-[#E1E6F2] bg-white p-7">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    STAY
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {trip.stay.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    Your accommodation in {trip.destination}
                  </p>

                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-xl text-[#0D21A1]">
                  ⌂
                </div>

              </div>

              <div className="mt-7 grid gap-5 border-t border-[#E8EBF5] pt-6 sm:grid-cols-2">

                <div>
                  <p className="text-xs text-[#94A3B8]">
                    PRICE / NIGHT
                  </p>

                  <p className="mt-1 font-semibold">
                    ₹{trip.stay.pricePerNight.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#94A3B8]">
                    TOTAL STAY
                  </p>

                  <p className="mt-1 font-semibold">
                    ₹{totalStay.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

              <button className="mt-7 rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#03045E] hover:text-white">
                View stay
              </button>

            </div>


            {/* EXPERIENCE */}

            <div className="mt-5 rounded-[28px] border border-[#E1E6F2] bg-white p-7">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    EXPERIENCE
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {trip.experience.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    A local experience during your stay.
                  </p>

                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-xl text-[#0D21A1]">
                  ✦
                </div>

              </div>

              <div className="mt-7 border-t border-[#E8EBF5] pt-6">

                <p className="text-xs text-[#94A3B8]">
                  DURATION
                </p>

                <p className="mt-1 font-semibold">
                  {trip.experience.duration}
                </p>

              </div>

              <button className="mt-7 rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#03045E] hover:text-white">
                View experience
              </button>

            </div>


            {/* TIMELINE */}

            <div className="mt-5 rounded-[28px] border border-[#E1E6F2] bg-white p-7">

              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                ITINERARY
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold">
                Your journey timeline
              </h3>

              <div className="mt-8">

                <TimelineItem
                  day="DAY 1"
                  title="Arrival & check-in"
                  description={`Arrive in ${trip.destination} and settle into ${trip.stay.name}.`}
                  active
                />

                <TimelineItem
                  day="DAY 2"
                  title={trip.experience.name}
                  description={`Enjoy your ${trip.experience.duration} local experience.`}
                />

                <TimelineItem
                  day={`DAY ${trip.nights}`}
                  title="Slow morning & departure"
                  description="Take your time, explore a little more and begin your journey home."
                />

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT SUMMARY
          ===================================================== */}

          <aside>

            <div className="sticky top-8 rounded-[28px] border border-[#DDE3F0] bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.07)]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                TRIP SUMMARY
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold">
                {trip.title}
              </h3>

              <div className="my-6 h-px bg-[#E8EBF5]" />

              <div className="space-y-5">

                <SummaryRow
                  label="Stay"
                  value={`₹${totalStay.toLocaleString("en-IN")}`}
                />

                <SummaryRow
                  label="Experience"
                  value="Included"
                />

                <SummaryRow
                  label="Duration"
                  value={`${trip.nights} nights`}
                />

              </div>

              <div className="my-6 h-px bg-[#E8EBF5]" />

              <div className="flex items-end justify-between">

                <span className="text-sm text-[#64748B]">
                  Estimated total
                </span>

                <span className="text-2xl font-semibold">
                  ₹{totalStay.toLocaleString("en-IN")}
                </span>

              </div>

              <button className="mt-7 w-full rounded-xl bg-[#03045E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                Manage Trip
              </button>

              <button className="mt-3 w-full rounded-xl border border-[#DCE1EF] px-5 py-3.5 text-sm font-semibold text-[#03045E] transition hover:border-[#03045E]">
                Add to calendar
              </button>

            </div>

          </aside>

        </div>

      </section>


      {/* =========================================================
          FOOTER CTA
      ========================================================= */}

      <section className="bg-[#03045E]">

        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            KEEP EXPLORING
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold text-white">
            There's always another beautiful place waiting.
          </h2>

          <Link
            href="/explore"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#EEF2FF]"
          >
            Explore Vistara
          </Link>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E1E6F2] bg-white p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#0D21A1]">
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            {label}
          </p>

          <p className="mt-1 text-sm font-semibold">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}


function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#64748B]">{label}</span>

      <span className="font-semibold text-[#03045E]">
        {value}
      </span>
    </div>
  );
}


function TimelineItem({
  day,
  title,
  description,
  active = false,
}: {
  day: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">

      <div className="relative flex flex-col items-center">

        <div
          className={`h-3 w-3 rounded-full ${
            active ? "bg-[#0D21A1]" : "bg-[#CBD5E1]"
          }`}
        />

        <div className="absolute top-3 h-full w-px bg-[#E2E8F0]" />

      </div>

      <div className="-mt-1">

        <p className="text-[10px] font-bold tracking-wider text-[#0D21A1]">
          {day}
        </p>

        <h4 className="mt-1 font-semibold">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-[#64748B]">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   DATE
========================================================= */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}