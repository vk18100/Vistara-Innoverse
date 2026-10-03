"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type Plan = {
  id: number;
  title: string;
  slug: string;
  description: string;
  city: string;
  area: string | null;
  price: number | string;
  durationHours: number;
  coverImage: string | null;
  isFeatured?: boolean;
  placesCount?: number;
};

const fallbackPlans: Plan[] = [
  {
    id: 1,
    title: "Weekend Explorer",
    slug: "weekend-explorer",
    description:
      "A compact local plan for discovering the essential experiences of a city.",
    city: "Varanasi",
    area: "Old City",
    price: 499,
    durationHours: 48,
    coverImage:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "3-Day City Escape",
    slug: "3-day-city-escape",
    description:
      "Three days of carefully selected places, food, culture and local experiences.",
    city: "Jaipur",
    area: "Pink City",
    price: 899,
    durationHours: 72,
    coverImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "7-Day Deep Explore",
    slug: "7-day-deep-explore",
    description:
      "Spend a full week exploring beyond the usual tourist route.",
    city: "Rajasthan",
    area: "Multiple Areas",
    price: 1499,
    durationHours: 168,
    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "14-Day Complete Journey",
    slug: "14-day-complete-journey",
    description:
      "A deeper two-week local journey designed for travellers who want more.",
    city: "India",
    area: "Multiple Destinations",
    price: 2499,
    durationHours: 336,
    coverImage:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
  },
];

function formatDuration(hours: number) {
  if (hours >= 336) return "2 Weeks";
  if (hours >= 168) return "1 Week";
  if (hours >= 72) return "3 Days";
  return "2 Days";
}

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function LocalPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPlans() {
      try {
        setLoading(true);

        const response = await fetch("/api/local-plans", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load local plans."
          );
        }

        if (
          active &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          setPlans(result.data);
        }
      } catch (error) {
        console.error("LOCAL_PLANS_ERROR:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPlans();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FCFBF8] text-[#292524]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#E7E2D8] bg-[#F5F1E9]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B6F3D]">
              VISTARA LOCAL PLANS
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#292524] sm:text-5xl md:text-6xl">
              Your city.
              <br />
              Your way.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#78716C] sm:text-base">
              Curated local plans that help you discover food,
              culture, hidden places and experiences without
              spending hours planning.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16 lg:px-10">
        {/* SECTION HEADER */}
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A8A29E]">
              CHOOSE YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#292524] md:text-4xl">
              Local plans
            </h2>
          </div>

          {loading && (
            <span className="text-xs text-[#A8A29E]">
              Updating plans...
            </span>
          )}
        </div>

        {/* PLAN GRID */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`group relative flex min-h-[530px] flex-col overflow-hidden rounded-[28px] border bg-white transition-all duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-[#C6A15B]/50 shadow-[0_18px_50px_rgba(139,111,61,0.12)]"
                  : "border-[#E7E2D8] shadow-[0_10px_35px_rgba(41,37,36,0.04)] hover:shadow-[0_18px_50px_rgba(41,37,36,0.10)]"
              }`}
            >
              {/* FEATURED LABEL */}
              {index === 1 && (
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[#292524] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
                </div>
              )}

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden bg-[#F5F1E9]">
                {plan.coverImage ? (
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#78716C]">
                    Vistara
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#292524] shadow-sm">
                  {formatDuration(plan.durationHours)}
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B6F3D]">
                      {plan.city}
                    </p>

                    {plan.placesCount !== undefined && (
                      <span className="text-[11px] text-[#A8A29E]">
                        {plan.placesCount} places
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#292524]">
                    {plan.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#78716C]">
                    {plan.description}
                  </p>

                  {plan.area && (
                    <div className="mt-4 inline-flex rounded-full bg-[#F5F1E9] px-3 py-1.5 text-xs font-medium text-[#78716C]">
                      {plan.area}
                    </div>
                  )}
                </div>

                {/* PRICE */}
                <div className="mt-auto pt-7">
                  <div className="border-t border-[#E7E2D8] pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">
                      ONE-TIME PRICE
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-serif text-3xl font-semibold text-[#292524]">
                          {formatPrice(plan.price)}
                        </span>
                      </div>

                      <Link
                        href={`/local-plans/${plan.slug}`}
                        className="rounded-full border border-[#D6D0C5] px-4 py-2.5 text-xs font-semibold text-[#292524] transition hover:border-[#292524] hover:bg-[#292524] hover:text-white"
                      >
                        Details
                      </Link>
                    </div>

                    <Link
                      href={`/local-plans/${plan.slug}?buy=true`}
                      className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#292524] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#44403C]"
                    >
                      Get this plan
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BOTTOM VALUE STRIP */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-10">
        <div className="rounded-[28px] border border-[#E7E2D8] bg-white p-6 shadow-[0_8px_30px_rgba(41,37,36,0.03)] md:p-8">
          <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-[#E7E2D8]">
            <Value
              title="Curated locally"
              text="Discover places beyond the usual tourist route."
            />

            <Value
              title="One-time unlock"
              text="Buy once and access your selected local plan."
            />

            <Value
              title="Made for exploring"
              text="Use your plan while planning and travelling."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Value({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="px-0 md:px-7 first:md:pl-0 last:md:pr-0">
      <h3 className="text-sm font-semibold text-[#292524]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#78716C]">
        {text}
      </p>
    </div>
  );
}