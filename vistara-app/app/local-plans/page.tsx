"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock3, MapPin, Sparkles } from "lucide-react";

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
      "A compact local plan covering the places, food and experiences worth discovering.",
    city: "Varanasi",
    area: "Old City",
    price: 499,
    durationHours: 48,
    coverImage:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
    placesCount: 12,
  },
  {
    id: 2,
    title: "3-Day City Escape",
    slug: "3-day-city-escape",
    description:
      "A balanced three-day route combining culture, food, landmarks and local experiences.",
    city: "Jaipur",
    area: "Pink City",
    price: 899,
    durationHours: 72,
    coverImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    placesCount: 24,
  },
  {
    id: 3,
    title: "7-Day Deep Explore",
    slug: "7-day-deep-explore",
    description:
      "Go beyond the usual tourist route with a full week of local discoveries.",
    city: "Rajasthan",
    area: "Multiple Areas",
    price: 1499,
    durationHours: 168,
    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    placesCount: 40,
  },
  {
    id: 4,
    title: "14-Day Complete Journey",
    slug: "14-day-complete-journey",
    description:
      "A deeper two-week journey for travellers who want to experience more of India.",
    city: "India",
    area: "Multiple Destinations",
    price: 2499,
    durationHours: 336,
    coverImage:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
    placesCount: 70,
  },
];

function formatDuration(hours: number) {
  if (hours >= 336) return "14 days";
  if (hours >= 168) return "7 days";
  if (hours >= 72) return "3 days";
  return "2 days";
}

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function LocalPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadPlans() {
      try {
        const response = await fetch("/api/local-plans", {
          cache: "no-store",
        });

        const result = await response.json();

        if (
          mounted &&
          response.ok &&
          result.success &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          setPlans(result.data);
        }
      } catch (error) {
        console.error("LOCAL_PLANS_ERROR:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPlans();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HERO — COMPACT */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              <Sparkles size={11} />
              Vistara Local Plans
            </p>

            <h1 className="mt-2 font-serif text-[28px] font-semibold leading-[1.05] tracking-tight sm:text-[32px]">
              Your trip,
              <br />
              planned like a local.
            </h1>

            <p className="mt-3 max-w-xl text-[11px] leading-5 text-neutral-500 sm:text-xs">
              Curated places, routes, food and experiences — packed into
              simple plans you can unlock before your journey.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-6 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Choose your journey
            </p>

            <h2 className="mt-1 font-serif text-[23px] font-semibold tracking-tight">
              Local plans
            </h2>
          </div>

          {loading && (
            <p className="text-[10px] text-neutral-400">
              Updating plans...
            </p>
          )}
        </div>

        {/* PRICING STYLE GRID */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[22px] bg-black text-white">
          <div className="grid md:grid-cols-3">
            <ValueItem
              title="Curated locally"
              description="Discover places beyond the standard tourist checklist."
            />

            <ValueItem
              title="One-time unlock"
              description="Buy once and access the plan for your journey."
            />

            <ValueItem
              title="Made for exploring"
              description="Use your plan while planning and travelling."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[20px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)] ${
        plan.isFeatured
          ? "border-black shadow-[0_8px_25px_rgba(0,0,0,0.07)]"
          : "border-neutral-200"
      }`}
    >
      {/* FEATURED */}
      {plan.isFeatured && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold text-white">
          Most popular
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden bg-neutral-100">
        {plan.coverImage ? (
          <img
            src={plan.coverImage}
            alt={plan.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            Vistara
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-black">
          <Clock3 size={11} />
          {formatDuration(plan.durationHours)}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
            <MapPin size={11} />
            {plan.city}
          </div>

          <h3 className="mt-1.5 font-serif text-[20px] font-semibold tracking-tight">
            {plan.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-neutral-500">
            {plan.description}
          </p>

          {plan.area && (
            <p className="mt-2 text-[9px] text-neutral-400">
              {plan.area}
            </p>
          )}

          {plan.placesCount && (
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-neutral-600">
              <Check size={11} />
              {plan.placesCount}+ places & experiences
            </div>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-5 border-t border-neutral-200 pt-4">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
            One-time price
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <span className="font-serif text-[25px] font-semibold">
              {formatPrice(plan.price)}
            </span>

            <Link
              href={`/local-plans/${plan.slug}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-neutral-800"
              aria-label={`View ${plan.title}`}
            >
              <ArrowRight size={15} />
            </Link>
          </div>

          <Link
            href={`/local-plans/${plan.slug}?buy=true`}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-black px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-neutral-800"
          >
            View & unlock
          </Link>
        </div>
      </div>
    </article>
  );
}

function ValueItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-white/10 p-5 md:border-r last:border-r-0 lg:p-6">
      <p className="text-[12px] font-semibold">{title}</p>

      <p className="mt-1.5 text-[10px] leading-5 text-white/60">
        {description}
      </p>
    </div>
  );
}