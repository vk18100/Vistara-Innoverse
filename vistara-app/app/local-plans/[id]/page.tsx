"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  UserRound,
} from "lucide-react";

type LocalPlan = {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  guests: number;
  status: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  activities: string[];
  guide?: {
    name: string;
    language: string[];
  };
};

export default function LocalPlanDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [plan, setPlan] = useState<LocalPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlan() {
      try {
        const { id } = await params;

        const response = await fetch(`/api/local-plans/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load plan");
        }

        const result = await response.json();

        setPlan(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load this local plan.");
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-[#EEF0FF]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="h-[500px] animate-pulse rounded-[30px] bg-[#F5F7FF]" />
            <div className="h-[500px] animate-pulse rounded-[30px] bg-[#F5F7FF]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !plan) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-serif text-4xl font-semibold">
            Plan not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            We couldn't find this local plan.
          </p>

          <Link
            href="/local-plans"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Back to Local Plans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <Link
            href="/local-plans"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#03045E]"
          >
            <ArrowLeft size={16} />
            Back to Local Plans
          </Link>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">

          {/* LEFT */}
          <div>
            {/* IMAGE */}
            <div className="relative h-[380px] overflow-hidden rounded-[32px] md:h-[520px]">
              <img
                src={plan.image}
                alt={plan.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#03045E] shadow-lg">
                  {plan.status}
                </span>
              </div>
            </div>

            {/* TITLE */}
            <div className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
                LOCAL EXPERIENCE
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                {plan.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={17} />
                {plan.location}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-9 border-t border-[#03045E]/10 pt-8">
              <h2 className="font-serif text-2xl font-semibold">
                About this plan
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
                {plan.description}
              </p>
            </div>

            {/* ACTIVITIES */}
            <div className="mt-9 border-t border-[#03045E]/10 pt-8">
              <h2 className="font-serif text-2xl font-semibold">
                What's included
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {plan.activities.map((activity) => (
                  <div
                    key={activity}
                    className="flex items-center gap-3 rounded-xl bg-[#F5F7FF] px-4 py-3.5"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#0D21A1]"
                    />

                    <span className="text-sm font-medium">
                      {activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GUIDE */}
            {plan.guide && (
              <div className="mt-9 border-t border-[#03045E]/10 pt-8">
                <h2 className="font-serif text-2xl font-semibold">
                  Your local guide
                </h2>

                <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#03045E]/10 p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF0FF] text-[#03045E]">
                    <UserRound size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {plan.guide.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Speaks {plan.guide.language.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT BOOKING CARD */}
          <aside>
            <div className="sticky top-8 rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.08)] md:p-7">

              <div className="flex items-end justify-between gap-4 border-b border-[#03045E]/10 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Plan price
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-[#03045E]">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="rounded-full bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-[#0D21A1]">
                  {plan.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-5 py-6">

                <DetailRow
                  icon={<CalendarDays size={18} />}
                  label="Date"
                  value={formatDate(plan.date)}
                />

                <DetailRow
                  icon={<Clock3 size={18} />}
                  label="Duration"
                  value={plan.duration}
                />

                <DetailRow
                  icon={<Users size={18} />}
                  label="Guests"
                  value={`${plan.guests} guests`}
                />

                <DetailRow
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={plan.location}
                />
              </div>

              {/* STATUS */}
              <div className="rounded-2xl bg-[#F5F7FF] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 text-[#0D21A1]"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Plan confirmed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your local experience is saved to your Vistara journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <Link
                href="/trips"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                View My Trip
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function DetailRow({
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-[#03045E]">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}