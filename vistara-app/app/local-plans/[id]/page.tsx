"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function formatDuration(hours: number) {
  if (hours >= 336) return "14 days";
  if (hours >= 168) return "7 days";
  if (hours >= 72) return "3 days";

  return "2 days";
}

/* =========================================================
   FALLBACK DATA
========================================================= */

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
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1400&q=85",
    placesCount: 12,
    isFeatured: true,
    places: [],
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
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85",
    placesCount: 24,
    places: [],
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
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
    placesCount: 40,
    places: [],
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
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=85",
    placesCount: 70,
    places: [],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function LocalPlanDetailPage() {
  const params = useParams<{ id: string }>();

  const id = String(params?.id ?? "").trim();

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD PLAN
  ======================================================= */

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      if (!id) {
        if (active) {
          setError("Local plan identifier is missing.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        /* -----------------------------------------------
           1. SINGLE PLAN API
        ----------------------------------------------- */

        try {
          const response = await fetch(
            `/api/local-plans/${encodeURIComponent(id)}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

          const result = await response.json();

          if (
            response.ok &&
            result?.success &&
            result?.data
          ) {
            if (active) {
              setPlan(result.data);
            }

            return;
          }
        } catch (apiError) {
          console.warn(
            "LOCAL_PLAN_DETAIL_API_ERROR:",
            apiError
          );
        }

        /* -----------------------------------------------
           2. LIST API FALLBACK
        ----------------------------------------------- */

        try {
          const response = await fetch(
            "/api/local-plans",
            {
              method: "GET",
              cache: "no-store",
            }
          );

          const result = await response.json();

          if (
            response.ok &&
            result?.success &&
            Array.isArray(result?.data)
          ) {
            const foundPlan = result.data.find(
              (item: Plan) =>
                String(item.slug).trim() === id ||
                String(item.id) === id
            );

            if (foundPlan) {
              if (active) {
                setPlan(foundPlan);
              }

              return;
            }
          }
        } catch (listError) {
          console.warn(
            "LOCAL_PLANS_LIST_API_ERROR:",
            listError
          );
        }

        /* -----------------------------------------------
           3. DEMO FALLBACK
        ----------------------------------------------- */

        const fallbackPlan = fallbackPlans.find(
          (item) =>
            String(item.slug).trim() === id ||
            String(item.id) === id
        );

        if (fallbackPlan) {
          if (active) {
            setPlan(fallbackPlan);
          }

          return;
        }

        if (active) {
          setError("Local plan not found.");
        }
      } catch (err) {
        console.error(
          "LOCAL_PLAN_DETAIL_ERROR:",
          err
        );

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
  }, [id]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-10">
          <div className="animate-pulse">
            <div className="h-3 w-20 rounded bg-neutral-200" />

            <div className="mt-5 h-10 w-80 rounded bg-neutral-200" />

            <div className="mt-3 h-4 w-full max-w-xl rounded bg-neutral-100" />

            <div className="mt-8 h-[300px] rounded-3xl bg-neutral-100" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
              <div className="space-y-4">
                <div className="h-5 w-44 rounded bg-neutral-200" />
                <div className="h-20 rounded bg-neutral-100" />
                <div className="h-20 rounded bg-neutral-100" />
              </div>

              <div className="h-64 rounded-3xl bg-neutral-100" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !plan) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              LOCAL PLAN
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold">
              Plan not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              This local plan may have been removed or is
              currently unavailable.
            </p>

            <Link
              href="/local-plans"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white transition hover:bg-neutral-800"
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

  const placeCount =
    places.length || plan.placesCount || 0;

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      {/* ===================================================
          BACK NAVIGATION
      =================================================== */}

      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-6 lg:px-10">
        <Link
          href="/local-plans"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={14} />
          Local plans
        </Link>
      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-6 sm:px-6 lg:px-10 lg:pb-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">

          {/* LEFT */}

          <div>

            <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">

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
                  <span className="text-black">
                    Featured
                  </span>
                </>
              )}

            </div>

            <h1 className="mt-3 max-w-3xl font-serif text-[34px] font-semibold leading-[1.02] tracking-tight sm:text-[44px]">
              {plan.title}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
              {plan.description}
            </p>

            {/* META */}

            <div className="mt-5 flex flex-wrap gap-2">

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2 text-[10px] font-medium">
                <MapPin size={13} />
                {plan.city}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2 text-[10px] font-medium">
                <Clock3 size={13} />
                {formatDuration(plan.durationHours)}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2 text-[10px] font-medium">
                <Sparkles size={13} />
                {placeCount} places
              </div>

            </div>

          </div>

          {/* PRICE — NO SECOND BUTTON */}

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">

            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              One-time price
            </p>

            <div className="mt-2 flex items-end justify-between gap-4">

              <span className="font-serif text-3xl font-semibold">
                {formatPrice(plan.price)}
              </span>

              <span className="pb-1 text-[9px] text-neutral-400">
                Full plan access
              </span>

            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-neutral-200 pt-4 text-[10px] text-neutral-500">
              <ShieldCheck size={14} />
              One-time purchase · Instant access
            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          HERO IMAGE
      =================================================== */}

      <section className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">

        <div className="group relative h-[280px] overflow-hidden rounded-3xl bg-neutral-100 sm:h-[390px]">

          {plan.coverImage ? (
            <img
              src={plan.coverImage}
              alt={plan.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No cover image
            </div>
          )}

          {/* IMAGE GRADIENT */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* IMAGE LABEL */}

          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65">
              VISTARA LOCAL PLAN
            </p>

            <p className="mt-1.5 text-base font-medium text-white sm:text-lg">
              Explore {plan.city} like a local.
            </p>

          </div>

        </div>

      </section>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-10 lg:py-12">

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* =================================================
              PLACES
          ================================================= */}

          <div>

            <div className="mb-6">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                INCLUDED IN YOUR PLAN
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Places to discover
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-neutral-500">
                A curated collection of places selected to
                help you experience the destination beyond
                the usual tourist route.
              </p>

            </div>

            {places.length > 0 ? (

              <div className="divide-y divide-neutral-200 border-y border-neutral-200">

                {places.map((place, index) => (

                  <div
                    key={
                      place.id ??
                      `${place.name}-${index}`
                    }
                    className="flex gap-4 py-5"
                  >

                    {/* NUMBER */}

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black text-[9px] font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* IMAGE */}

                    {place.image && (
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-16 w-20 shrink-0 rounded-xl object-cover"
                      />
                    )}

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-semibold">
                          {place.name}
                        </h3>

                        {place.category && (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[8px] font-medium text-neutral-500">
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
                        <p className="mt-2 max-w-xl text-[10px] leading-4 text-neutral-500">
                          {place.description}
                        </p>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 px-6 py-10 text-center">

                <Sparkles
                  size={20}
                  className="mx-auto text-neutral-400"
                />

                <p className="mt-3 text-sm font-medium">
                  Your local plan is ready to explore.
                </p>

                <p className="mt-1.5 text-xs leading-5 text-neutral-400">
                  Detailed places will appear here once
                  they are available.
                </p>

              </div>

            )}

          </div>

          {/* =================================================
              PLAN DETAILS + ONE CTA
          ================================================= */}

          <aside>

            <div className="sticky top-24 rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                PLAN DETAILS
              </p>

              <div className="mt-5 space-y-4">

                {/* DESTINATION */}

                <div className="flex items-center justify-between gap-4">

                  <span className="text-xs text-neutral-500">
                    Destination
                  </span>

                  <span className="text-xs font-semibold">
                    {plan.city}
                  </span>

                </div>

                {/* AREA */}

                {plan.area && (
                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xs text-neutral-500">
                      Area
                    </span>

                    <span className="max-w-[150px] text-right text-xs font-semibold">
                      {plan.area}
                    </span>

                  </div>
                )}

                {/* DURATION */}

                <div className="flex items-center justify-between gap-4">

                  <span className="text-xs text-neutral-500">
                    Duration
                  </span>

                  <span className="text-xs font-semibold">
                    {formatDuration(plan.durationHours)}
                  </span>

                </div>

                {/* PLACES */}

                <div className="flex items-center justify-between gap-4">

                  <span className="text-xs text-neutral-500">
                    Places
                  </span>

                  <span className="text-xs font-semibold">
                    {placeCount}
                  </span>

                </div>

                {/* PRICE */}

                <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-4">

                  <span className="text-xs text-neutral-500">
                    Total
                  </span>

                  <span className="font-serif text-xl font-semibold">
                    {formatPrice(plan.price)}
                  </span>

                </div>

              </div>

              {/* PURCHASE INFO */}

              <div className="mt-5 rounded-2xl bg-neutral-50 p-4">

                <div className="flex gap-2.5">

                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-xs font-semibold">
                      Ready to explore?
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-neutral-500">
                      Continue to purchase and unlock this
                      curated local plan.
                    </p>

                  </div>

                </div>

              </div>

              {/* ONLY GET THIS PLAN BUTTON */}

              <Link
                href={`/local-plans/${plan.slug}/purchase`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
              >
                Get this plan

                <ArrowRight size={14} />
              </Link>

              <p className="mt-3 text-center text-[9px] leading-4 text-neutral-400">
                You will review your purchase before payment.
              </p>

            </div>

          </aside>

        </div>

      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />

    </main>
  );
}