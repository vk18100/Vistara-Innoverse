"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type Place = {
  id?: number | string;
  name: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  area?: string | null;
};

type Plan = {
  id: number;
  title: string;
  slug: string;
  description: string;
  city: string;
  area?: string | null;
  price: number | string;
  durationHours: number;
  coverImage?: string | null;
  places?: Place[];
  placesCount?: number;
  isFeatured?: boolean;
};

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function formatDuration(hours: number) {
  if (hours >= 336) return "14 days";
  if (hours >= 168) return "7 days";
  if (hours >= 72) return "3 days";
  return "2 days";
}

export default function LocalPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      try {
        setLoading(true);
        setError("");

        const { id } = await params;

        const response = await fetch(`/api/local-plans/${id}`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load this plan."
          );
        }

        if (active) {
          setPlan(result.data);
        }
      } catch (err) {
        console.error("LOCAL_PLAN_DETAIL_ERROR:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this plan."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-10">
          <div className="animate-pulse">
            <div className="h-3 w-20 rounded bg-neutral-200" />
            <div className="mt-4 h-8 w-72 rounded bg-neutral-200" />
            <div className="mt-3 h-4 w-full max-w-xl rounded bg-neutral-100" />

            <div className="mt-8 h-[280px] rounded-2xl bg-neutral-100" />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <div className="h-5 w-40 rounded bg-neutral-200" />
                <div className="h-20 rounded bg-neutral-100" />
                <div className="h-20 rounded bg-neutral-100" />
              </div>

              <div className="h-52 rounded-2xl bg-neutral-100" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !plan) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              LOCAL PLAN
            </p>

            <h1 className="mt-3 font-serif text-2xl font-semibold">
              Plan not found
            </h1>

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              This local plan may have been removed or is
              currently unavailable.
            </p>

            <Link
              href="/local-plans"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-neutral-800"
            >
              <ArrowLeft size={14} />
              Back to local plans
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const places = plan.places ?? [];

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* BACK */}
      <div className="mx-auto max-w-6xl px-5 pt-5 sm:px-6 lg:px-10">
        <Link
          href="/local-plans"
          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Local plans
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-5 sm:px-6 lg:px-10 lg:pb-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              <span>{plan.city}</span>

              {plan.area && (
                <>
                  <span>•</span>
                  <span>{plan.area}</span>
                </>
              )}

              {plan.isFeatured && (
                <>
                  <span>•</span>
                  <span className="text-black">Featured</span>
                </>
              )}
            </div>

            <h1 className="mt-2 max-w-2xl font-serif text-[30px] font-semibold leading-[1.05] tracking-tight sm:text-[36px]">
              {plan.title}
            </h1>

            <p className="mt-3 max-w-2xl text-[11px] leading-5 text-neutral-500 sm:text-xs">
              {plan.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-[9px] font-medium">
                <MapPin size={12} />
                {plan.city}
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-[9px] font-medium">
                <Clock3 size={12} />
                {formatDuration(plan.durationHours)}
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-[9px] font-medium">
                <Sparkles size={12} />
                {places.length || plan.placesCount || 0} places
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="border-t border-neutral-200 pt-4 lg:border-l lg:border-t-0 lg:pl-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              One-time price
            </p>

            <div className="mt-1 flex items-center justify-between gap-4">
              <span className="font-serif text-[25px] font-semibold tracking-tight">
                {formatPrice(plan.price)}
              </span>

              <span className="text-[9px] text-neutral-400">
                Full plan access
              </span>
            </div>

            <Link
              href={`/local-plans/${plan.slug}?buy=true`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-neutral-800"
            >
              Get this plan
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* COVER */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="relative h-[260px] overflow-hidden rounded-2xl bg-neutral-100 sm:h-[340px]">
          {plan.coverImage ? (
            <img
              src={plan.coverImage}
              alt={plan.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-400">
              No cover image
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70">
              VISTARA LOCAL PLAN
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Explore {plan.city} like a local.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-10 lg:py-11">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* ITINERARY */}
          <div>
            <div className="mb-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                INCLUDED IN YOUR PLAN
              </p>

              <h2 className="mt-1 font-serif text-xl font-semibold">
                Places to discover
              </h2>
            </div>

            {places.length > 0 ? (
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {places.map((place, index) => (
                  <div
                    key={place.id ?? `${place.name}-${index}`}
                    className="flex gap-4 py-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black text-[9px] font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {place.image && (
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-16 w-20 shrink-0 rounded-lg object-cover"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xs font-semibold text-black">
                          {place.name}
                        </h3>

                        {place.category && (
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[8px] font-medium text-neutral-500">
                            {place.category}
                          </span>
                        )}
                      </div>

                      {place.area && (
                        <p className="mt-1 text-[9px] text-neutral-400">
                          {place.area}
                        </p>
                      )}

                      {place.description && (
                        <p className="mt-1.5 max-w-xl text-[10px] leading-4 text-neutral-500">
                          {place.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-y border-neutral-200 py-8 text-center">
                <p className="text-xs font-medium">
                  Your local plan is ready to explore.
                </p>

                <p className="mt-1 text-[10px] text-neutral-400">
                  Detailed places will appear here once available.
                </p>
              </div>
            )}
          </div>

          {/* SIDE INFO */}
          <aside>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                PLAN DETAILS
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] text-neutral-500">
                    Destination
                  </span>

                  <span className="text-[10px] font-semibold">
                    {plan.city}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] text-neutral-500">
                    Duration
                  </span>

                  <span className="text-[10px] font-semibold">
                    {formatDuration(plan.durationHours)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] text-neutral-500">
                    Places
                  </span>

                  <span className="text-[10px] font-semibold">
                    {places.length || plan.placesCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-3">
                  <span className="text-[10px] text-neutral-500">
                    Price
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(plan.price)}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-neutral-200 pt-4">
                <div className="flex gap-2">
                  <Check
                    size={13}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-[9px] leading-4 text-neutral-500">
                    One-time purchase. Access your selected local
                    plan and its curated places.
                  </p>
                </div>

                <Link
                  href={`/local-plans/${plan.slug}?buy=true`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-[10px] font-semibold text-white transition hover:bg-neutral-800"
                >
                  Get this plan
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}