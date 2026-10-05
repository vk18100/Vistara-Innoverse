"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Plus,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

const plannedTrip = {
  id: 1,
  title: "Patna Heritage Journey",
  location: "Patna, Bihar, India",
  date: "12–15 October 2026",
  image: "/images/patna.jpg",
  status: "Upcoming",
};

export default function TripsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-7 lg:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/45">
                Your trips
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Plan your next journey.
              </h1>

              <p className="mt-2.5 max-w-md text-[11px] leading-5 text-black/50">
                Keep your stay, places and local plans
                together in one simple travel space.
              </p>
            </div>

            {/* CREATE TRIP → LOCAL PLANS */}

            <Link
              href="/local-plans"
              className="group inline-flex w-fit items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-black/80"
            >
              <Plus size={13} />

              Create trip

              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          PLANNED TRIP
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-5 py-9 sm:px-7 lg:px-10">
        <div className="mb-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/45">
            Planned
          </p>

          <h2 className="mt-1 font-serif text-xl font-semibold tracking-tight sm:text-2xl">
            Your next journey
          </h2>
        </div>

        {/* TRIP CARD */}

        <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_15px_45px_rgba(0,0,0,0.07)]">
          <div className="grid md:grid-cols-[360px_1fr]">
            {/* IMAGE */}

            <div className="relative h-[230px] overflow-hidden bg-black/5 md:h-[280px]">
              <img
                src={plannedTrip.image}
                alt={plannedTrip.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/property-placeholder.jpg";
                }}
              />

              {/* IMAGE OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* STATUS */}

              <div className="absolute bottom-4 left-4 rounded-full bg-white px-2.5 py-1 text-[8px] font-semibold text-black shadow-sm">
                {plannedTrip.status}
              </div>
            </div>

            {/* DETAILS */}

            <div className="flex flex-col justify-center p-5 sm:p-7">
              {/* DATE */}

              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-black/55">
                <CalendarDays size={12} />

                {plannedTrip.date}
              </div>

              {/* TITLE */}

              <h3 className="mt-2.5 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                {plannedTrip.title}
              </h3>

              {/* LOCATION */}

              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-black/50">
                <MapPin size={12} />

                {plannedTrip.location}
              </div>

              {/* DESCRIPTION */}

              <p className="mt-4 max-w-lg text-[10px] leading-5 text-black/50">
                Your upcoming journey is ready.
                Discover the area, choose your interests
                and build your Local Plan.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* =====================================================
          EXPLORE CTA
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7 lg:px-10">
        <div className="rounded-2xl bg-black px-5 py-6 text-white sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Explore
              </p>

              <h2 className="mt-1 font-serif text-lg font-semibold">
                Build your local journey.
              </h2>

              <p className="mt-1 text-[10px] leading-5 text-white/55">
                Discover places, experiences and
                Local Plans around your stay.
              </p>
            </div>

            {/* EXPLORE BUTTON */}

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[10px] font-semibold text-black transition hover:bg-white/85"
            >
              Explore

              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}