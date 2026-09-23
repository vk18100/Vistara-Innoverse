"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "../footer/page";

const recentPlaces = [
  {
    title: "Banaras Ghat Walk",
    location: "Varanasi, Uttar Pradesh",
    image: "/images/pag1 (1).jpg",
  },
  {
    title: "Mountain Escape",
    location: "Manali, Himachal Pradesh",
    image: "/images/pag1 (2).jpg",
  },
  {
    title: "Riverside Retreat",
    location: "Patna, Bihar",
    image: "/images/pag1 (3).jpg",
  },
  {
    title: "Goa Sunset Experience",
    location: "Goa",
    image: "/images/pag1 (4).jpg",
  },
];

const planningOptions = [
  {
    title: "Find a Stay",
    description: "Discover beautiful villas, homes and stays for your journey.",
    icon: "⌂",
    href: "/stays",
  },
  {
    title: "Experiences",
    description: "Add local experiences, food trails and memorable activities.",
    icon: "✦",
    href: "/explore",
  },
  {
    title: "Explore Places",
    description: "Discover destinations and hidden places worth visiting.",
    icon: "⌖",
    href: "/explore",
  },
];

const inspiration = [
  {
    title: "Hidden mountain stays",
    image: "/images/pag1 (5).jpg",
  },
  {
    title: "Peaceful riverside escapes",
    image: "/images/pag1 (6).jpg",
  },
  {
    title: "Weekend experiences",
    image: "/images/pag1 (7).jpg",
  },
];

export default function TripPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
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

      {/* UPCOMING TRIP */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
            UPCOMING
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            Your next escape
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#E1E6F2] bg-white shadow-[0_15px_50px_rgba(3,4,94,0.08)]">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            {/* IMAGE */}
            <div className="relative min-h-[320px] overflow-hidden bg-[#EEF2FF]">
              <img
                src="/images/pag1 (8).jpg"
                alt="Varanasi trip"
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#03045E] shadow-sm">
                UPCOMING TRIP
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="text-sm font-medium text-[#64748B]">
                12 Oct – 15 Oct · 3 nights
              </p>

              <h3 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
                Varanasi Escape
              </h3>

              <p className="mt-2 text-sm text-[#64748B]">
                📍 Varanasi, Uttar Pradesh
              </p>

              <div className="my-7 h-px bg-[#E8EBF5]" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    STAY
                  </p>

                  <p className="mt-2 font-semibold text-[#03045E]">
                    The Heritage Courtyard
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    ₹4,500 / night
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    EXPERIENCE
                  </p>

                  <p className="mt-2 font-semibold text-[#03045E]">
                    Ganga Sunrise & Ghat Walk
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    2 hours
                  </p>
                </div>
              </div>

              <Link
                href="/trip/varanasi"
                className="mt-8 w-fit rounded-xl border border-[#03045E] px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
              >
                View Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN YOUR JOURNEY */}
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
            {planningOptions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-[#E1E6F2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0D21A1] hover:shadow-[0_15px_40px_rgba(3,4,94,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-2xl text-[#0D21A1]">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#03045E]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {item.description}
                </p>

                <span className="mt-6 inline-block text-sm font-semibold text-[#0D21A1] transition group-hover:translate-x-1">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY EXPLORED */}
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recentPlaces.map((place) => (
            <div key={place.title} className="group cursor-pointer">
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
            </div>
          ))}
        </div>
      </section>

      {/* SAVED */}
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
              className="mt-6 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Explore places
            </Link>
          </div>
        </div>
      </section>

      {/* INSPIRATION */}
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
            <div
              key={item.title}
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
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}