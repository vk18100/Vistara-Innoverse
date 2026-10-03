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
    <main className="min-h-screen bg-[#FAFAF8] text-[#292524]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#E7E2D8] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#8B6F3D]">
              <Sparkles size={14} />
              Vistara Local Plans
            </p>

            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your trip,
              <br />
              planned like a local.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#78716C] sm:text-base">
              Curated places, routes, food and experiences — packed into
              simple plans you can unlock before your journey.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
              CHOOSE YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
              Local plans
            </h2>
          </div>

          {loading && (
            <p className="text-xs text-[#A8A29E]">
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
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[28px] bg-[#292524] text-white">
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
      className={`group relative flex flex-col overflow-hidden rounded-[26px] border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(41,37,36,0.10)] ${
        plan.isFeatured
          ? "border-[#8B6F3D]/50 shadow-[0_10px_35px_rgba(139,111,61,0.10)]"
          : "border-[#E7E2D8]"
      }`}
    >
      {/* FEATURED */}
      {plan.isFeatured && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-[#292524] px-3 py-1.5 text-[11px] font-semibold text-white">
          Most popular
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden bg-[#F5F5F4]">
        {plan.coverImage ? (
          <img
            src={plan.coverImage}
            alt={plan.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#A8A29E]">
            Vistara
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#292524]">
          <Clock3 size={13} />
          {formatDuration(plan.durationHours)}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B6F3D]">
            <MapPin size={13} />
            {plan.city}
          </div>

          <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
            {plan.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#78716C]">
            {plan.description}
          </p>

          {plan.area && (
            <p className="mt-3 text-xs text-[#A8A29E]">
              {plan.area}
            </p>
          )}

          {plan.placesCount && (
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#57534E]">
              <Check size={14} className="text-[#8B6F3D]" />
              {plan.placesCount}+ places & experiences
            </div>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-6 border-t border-[#E7E2D8] pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E]">
            One-time price
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <span className="font-serif text-3xl font-semibold">
              {formatPrice(plan.price)}
            </span>

            <Link
              href={`/local-plans/${plan.slug}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#292524] text-white transition group-hover:bg-[#8B6F3D]"
              aria-label={`View ${plan.title}`}
            >
              <ArrowRight size={17} />
            </Link>
          </div>

          <Link
            href={`/local-plans/${plan.slug}?buy=true`}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#292524] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#57534E]"
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
    <div className="border-white/10 p-6 md:border-r last:border-r-0 lg:p-8">
      <p className="font-semibold">{title}</p>

      <p className="mt-2 text-sm leading-6 text-white/60">
        {description}
      </p>
    </div>
  );
}