"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";

const localPlans = [
  {
    id: "plan_001",
    title: "Varanasi Heritage Walk",
    location: "Varanasi, Uttar Pradesh",
    date: "12 October 2026",
    duration: "4 hours",
    guests: 2,
    status: "Upcoming",
    price: "₹1,499",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore the old city, hidden lanes and historic ghats with a local expert.",
  },
  {
    id: "plan_002",
    title: "Jaipur Old City Experience",
    location: "Jaipur, Rajasthan",
    date: "22 November 2026",
    duration: "5 hours",
    guests: 2,
    status: "Upcoming",
    price: "₹2,199",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover Jaipur's heritage streets, local food and traditional markets.",
  },
  {
    id: "plan_003",
    title: "Manali Mountain Day",
    location: "Manali, Himachal Pradesh",
    date: "10 August 2026",
    duration: "6 hours",
    guests: 3,
    status: "Completed",
    price: "₹2,799",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    description:
      "A relaxed mountain experience covering scenic viewpoints and local spots.",
  },
];

export default function LocalPlansPage() {
  const upcomingPlans = localPlans.filter(
    (plan) => plan.status === "Upcoming"
  );

  const completedPlans = localPlans.filter(
    (plan) => plan.status === "Completed"
  );

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#03045E]/10 bg-[#03045E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            YOUR EXPERIENCES
          </p>

          <div className="mt-4 max-w-3xl">
            <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-6xl">
              Local Plans
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Your purchased local experiences, carefully planned for your
              journey. Discover places through people who know them best.
            </p>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm">
              {upcomingPlans.length} upcoming
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm">
              {completedPlans.length} completed
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* UPCOMING */}
        <div>
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              UPCOMING
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Your upcoming plans
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Experiences you have booked for your upcoming journeys.
            </p>
          </div>

          <div className="space-y-6">
            {upcomingPlans.map((plan) => (
              <article
                key={plan.id}
                className="group overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_45px_rgba(3,4,94,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(3,4,94,0.10)]"
              >
                <div className="grid lg:grid-cols-[360px_1fr]">

                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[330px]">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#03045E] shadow-sm">
                      {plan.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="flex flex-col justify-between p-7 md:p-9">

                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                            LOCAL EXPERIENCE
                          </p>

                          <h3 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                            {plan.title}
                          </h3>
                        </div>

                        <p className="text-lg font-semibold text-[#03045E]">
                          {plan.price}
                        </p>
                      </div>

                      <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                        {plan.description}
                      </p>

                      {/* INFO */}
                      <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <InfoItem
                          icon={<MapPin size={17} />}
                          label="Location"
                          value={plan.location}
                        />

                        <InfoItem
                          icon={<CalendarDays size={17} />}
                          label="Date"
                          value={plan.date}
                        />

                        <InfoItem
                          icon={<Clock size={17} />}
                          label="Duration"
                          value={plan.duration}
                        />

                        <InfoItem
                          icon={<span className="text-sm">👥</span>}
                          label="Guests"
                          value={`${plan.guests} guests`}
                        />
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-[#03045E]/10 pt-6">
                      <Link
                        href={`/local-plans/${plan.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                      >
                        View Plan
                        <ArrowRight size={16} />
                      </Link>

                      <Link
                        href="/trips"
                        className="rounded-xl border border-[#03045E]/15 px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F5F7FF]"
                      >
                        View Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* COMPLETED */}
        <div className="mt-16">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              HISTORY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Completed plans
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {completedPlans.map((plan) => (
              <article
                key={plan.id}
                className="overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white"
              >
                <div className="relative h-56">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E]">
                    Completed
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    LOCAL EXPERIENCE
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {plan.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} />
                    {plan.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#03045E]/10 pt-4">
                    <span className="text-sm text-gray-500">
                      {plan.date}
                    </span>

                    <Link
                      href={`/local-plans/${plan.id}`}
                      className="text-sm font-semibold text-[#0D21A1] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* EMPTY / DISCOVER CTA */}
        <div className="mt-16 rounded-[30px] bg-[#F5F7FF] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            DISCOVER MORE
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
            Plan your next local experience
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Find authentic experiences, hidden places and local activities
            for your next Vistara journey.
          </p>

          <Link
            href="/explore"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            Explore Experiences
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F7FF] text-[#0D21A1]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-[#03045E]">
          {value}
        </p>
      </div>
    </div>
  );
}