"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

type Place = {
  id?: string | number;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
};

type LocalPlan = {
  id: string;
  title: string;
  slug: string;
  description: string;
  city: string;
  area: string;
  price: number;
  durationHours: number;
  coverImage: string;
  isFeatured: boolean;
  places: Place[];
};

export default function LocalPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [plan, setPlan] = useState<LocalPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [id, setId] = useState("");

  useEffect(() => {
    async function loadPlan() {
      try {
        const { id: planId } = await params;

        setId(planId);

        const response = await fetch(`/api/local-plans/${planId}`);

        if (!response.ok) {
          throw new Error("Plan not found");
        }

        const result = await response.json();

        if (result.success && result.data) {
          setPlan(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Local plan error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, [params]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
          <div className="h-5 w-28 animate-pulse rounded bg-[#E7E2D8]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="h-[520px] animate-pulse rounded-[30px] bg-[#EDE9E1]" />

            <div className="h-[420px] animate-pulse rounded-[30px] bg-[#EDE9E1]" />
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (error || !plan) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] text-[#292524]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A08452]">
              LOCAL PLANS
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold">
              Plan not found
            </h1>

            <p className="mt-3 text-sm text-[#78716C]">
              This local plan may no longer be available.
            </p>

            <Link
              href="/local-plans"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#292524] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#44403C]"
            >
              <ArrowLeft size={16} />
              Back to Local Plans
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292524]">
      <Navbar />

      {/* =========================================
          PAGE
      ========================================= */}

      <section className="mx-auto max-w-7xl px-5 py-7 lg:px-10 lg:py-10">
        {/* BACK */}
        <Link
          href="/local-plans"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#78716C] transition hover:text-[#292524]"
        >
          <ArrowLeft size={16} />
          Local Plans
        </Link>

        {/* =====================================
            HERO
        ===================================== */}

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.55fr_0.75fr]">
          {/* IMAGE */}
          <div className="relative min-h-[380px] overflow-hidden rounded-[30px] bg-[#E7E2D8] sm:min-h-[500px]">
            <Image
              src={plan.coverImage}
              alt={plan.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* FEATURED */}
            {plan.isFeatured && (
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#292524] shadow-sm backdrop-blur">
                <Sparkles size={14} />
                Featured plan
              </div>
            )}

            {/* IMAGE TITLE */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {plan.city}
                </span>

                {plan.area && (
                  <>
                    <span>·</span>
                    <span>{plan.area}</span>
                  </>
                )}
              </div>

              <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
                {plan.title}
              </h1>
            </div>
          </div>

          {/* =================================
              BOOKING / PRICING CARD
          ================================= */}

          <aside className="lg:pt-2">
            <div className="sticky top-24 overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white shadow-[0_16px_50px_rgba(41,37,36,0.07)]">
              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A08452]">
                  YOUR LOCAL PLAN
                </p>

                <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                  {plan.title}
                </h2>

                {/* PRICE */}
                <div className="mt-7 border-b border-[#E7E2D8] pb-6">
                  <p className="text-xs text-[#78716C]">
                    Starting from
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight">
                      ₹{Number(plan.price).toLocaleString("en-IN")}
                    </span>

                    <span className="mb-1 text-sm text-[#78716C]">
                      / person
                    </span>
                  </div>
                </div>

                {/* QUICK INFO */}
                <div className="space-y-4 py-6">
                  <QuickInfo
                    icon={<Clock3 size={17} />}
                    label="Duration"
                    value={`${plan.durationHours} hours`}
                  />

                  <QuickInfo
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={`${plan.area}, ${plan.city}`}
                  />

                  <QuickInfo
                    icon={<Users size={17} />}
                    label="Experience"
                    value="Local experience"
                  />
                </div>

                {/* CTA */}
                <Link
                  href={`/local-plans/purchase?planId=${plan.id}`}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#292524] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#44403C]"
                >
                  Book this plan
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-3 text-center text-xs text-[#A8A29E]">
                  Plan details are shown before booking.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================
            DETAILS
        ===================================== */}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_330px]">
          <div>
            {/* ABOUT */}
            <section className="border-b border-[#E7E2D8] pb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A08452]">
                ABOUT THIS PLAN
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                A simple way to experience the city.
              </h2>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#57534E]">
                {plan.description}
              </p>
            </section>

            {/* PLACES */}
            <section className="border-b border-[#E7E2D8] py-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A08452]">
                    ON THE PLAN
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-semibold">
                    Places you’ll explore
                  </h2>
                </div>

                <span className="hidden text-sm text-[#78716C] sm:block">
                  {plan.places?.length || 0} places
                </span>
              </div>

              {plan.places?.length > 0 ? (
                <div className="mt-7 space-y-4">
                  {plan.places.map((place, index) => (
                    <div
                      key={place.id ?? index}
                      className="group flex gap-4 rounded-2xl border border-[#E7E2D8] bg-white p-4 transition hover:shadow-md"
                    >
                      {/* NUMBER */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EFE5] text-sm font-semibold text-[#8B6F3D]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold">
                          {place.name || place.title || "Local destination"}
                        </h3>

                        {place.description && (
                          <p className="mt-1.5 text-sm leading-6 text-[#78716C]">
                            {place.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-[#78716C]">
                  Places included in this plan will be shared during
                  booking.
                </p>
              )}
            </section>

            {/* INCLUDED */}
            <section className="py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A08452]">
                WHAT YOU GET
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold">
                Everything kept simple.
              </h2>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Curated local route",
                  "Local places to explore",
                  "Flexible experience",
                  "Clear upfront pricing",
                  "Plan details before booking",
                  "Easy booking experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#E7E2D8] bg-white px-4 py-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4EFE5] text-[#8B6F3D]">
                      <Check size={15} />
                    </span>

                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDE SUMMARY */}
          <aside className="hidden lg:block">
            <div className="rounded-[26px] border border-[#E7E2D8] bg-[#F4EFE5] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F3D]">
                PLAN AT A GLANCE
              </p>

              <div className="mt-6 space-y-5">
                <SummaryItem
                  icon={<CalendarDays size={18} />}
                  title="Local experience"
                  value={plan.city}
                />

                <SummaryItem
                  icon={<Clock3 size={18} />}
                  title="Duration"
                  value={`${plan.durationHours} hours`}
                />

                <SummaryItem
                  icon={<MapPin size={18} />}
                  title="Area"
                  value={plan.area}
                />

                <SummaryItem
                  icon={<Users size={18} />}
                  title="Best for"
                  value="Explorers & travellers"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   QUICK INFO
========================================= */

function QuickInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EFE5] text-[#8B6F3D]">
        {icon}
      </span>

      <div>
        <p className="text-xs text-[#A8A29E]">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-[#44403C]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   SUMMARY ITEM
========================================= */

function SummaryItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#8B6F3D]">{icon}</span>

      <div>
        <p className="text-xs text-[#78716C]">{title}</p>
        <p className="mt-1 text-sm font-semibold text-[#292524]">
          {value}
        </p>
      </div>
    </div>
  );
}