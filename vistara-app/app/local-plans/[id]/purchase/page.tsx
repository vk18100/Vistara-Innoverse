"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
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

function formatSelectedDate(date: Date | null) {
  if (!date) return "Select date";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

export default function LocalPlanPurchasePage() {
  const params = useParams<{ id: string }>();

  const id = String(params?.id ?? "").trim();

  const [plan, setPlan] = useState<Plan | null>(null);

  const [loading, setLoading] = useState(true);

  const [purchasing, setPurchasing] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     CALENDAR
  ======================================================= */

  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [calendarMonth, setCalendarMonth] =
    useState<Date>(() => {
      const date = new Date();

      date.setDate(1);

      return date;
    });

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const calendarYear =
    calendarMonth.getFullYear();

  const calendarMonthIndex =
    calendarMonth.getMonth();

  const daysInMonth = new Date(
    calendarYear,
    calendarMonthIndex + 1,
    0
  ).getDate();

  const firstDay = new Date(
    calendarYear,
    calendarMonthIndex,
    1
  ).getDay();

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  function isPastDate(day: number) {
    const date = new Date(
      calendarYear,
      calendarMonthIndex,
      day
    );

    return date < today;
  }

  function isSelectedDate(day: number) {
    if (!selectedDate) return false;

    return (
      selectedDate.getFullYear() === calendarYear &&
      selectedDate.getMonth() ===
        calendarMonthIndex &&
      selectedDate.getDate() === day
    );
  }

  function selectDate(day: number) {
    if (isPastDate(day)) return;

    const date = new Date(
      calendarYear,
      calendarMonthIndex,
      day
    );

    setSelectedDate(date);

    setCalendarOpen(false);
  }

  function goPreviousMonth() {
    const previous = new Date(calendarMonth);

    previous.setMonth(previous.getMonth() - 1);

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= currentMonth) {
      setCalendarMonth(previous);
    }
  }

  function goNextMonth() {
    const next = new Date(calendarMonth);

    next.setMonth(next.getMonth() + 1);

    setCalendarMonth(next);
  }

  const canGoPrevious =
    calendarYear > today.getFullYear() ||
    (calendarYear === today.getFullYear() &&
      calendarMonthIndex > today.getMonth());

  /* =======================================================
     LOAD PLAN
  ======================================================= */

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      if (!id) {
        if (active) {
          setError(
            "Local plan identifier is missing."
          );

          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const slug = String(id).trim();

        /* ---------------------------------------------------
           SINGLE PLAN API
        --------------------------------------------------- */

        try {
          const response = await fetch(
            `/api/local-plans/${encodeURIComponent(
              slug
            )}`,
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

        /* ---------------------------------------------------
           LIST API
        --------------------------------------------------- */

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
                String(item.slug).trim() === slug ||
                String(item.id) === slug
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

        /* ---------------------------------------------------
           FALLBACK
        --------------------------------------------------- */

        const fallbackPlan =
          fallbackPlans.find(
            (item) =>
              String(item.slug).trim() === slug ||
              String(item.id) === slug
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
          "LOCAL_PLAN_PURCHASE_LOAD_ERROR:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this local plan."
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
     PURCHASE
  ======================================================= */
async function handlePurchase() {
  if (!plan || purchasing) return;

  if (!selectedDate) {
    setError("Please select your date before continuing.");
    setCalendarOpen(true);
    return;
  }

  try {
    setPurchasing(true);
    setError("");

    const response = await fetch(
      "/api/local-plans/purchases",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id,

          // date abhi UI se selected hai
          // API mein later save kar sakte hain
          date: selectedDate.toISOString(),
        }),
      }
    );

    /*
    -------------------------------------------------------
    IMPORTANT:
    Pehle text read karo.
    Empty response hone par response.json() crash nahi karega.
    -------------------------------------------------------
    */

    const rawResponse = await response.text();

    let result: any = null;

    if (rawResponse.trim()) {
      try {
        result = JSON.parse(rawResponse);
      } catch {
        console.error(
          "PURCHASE API NON-JSON RESPONSE:",
          rawResponse
        );

        throw new Error(
          `Purchase API returned an invalid response (${response.status}).`
        );
      }
    }

    /*
    -------------------------------------------------------
    EMPTY RESPONSE
    -------------------------------------------------------
    */

    if (!rawResponse.trim()) {
      console.error(
        "PURCHASE API EMPTY RESPONSE:",
        response.status,
        response.statusText
      );

      throw new Error(
        `Purchase request failed (${response.status} ${response.statusText}).`
      );
    }

    /*
    -------------------------------------------------------
    API ERROR
    -------------------------------------------------------
    */

    if (!response.ok || !result?.success) {
      throw new Error(
        result?.message ||
          `Unable to purchase this plan (${response.status}).`
      );
    }

    /*
    -------------------------------------------------------
    PAYMENT / CHECKOUT URL
    -------------------------------------------------------
    */

    if (result?.data?.checkoutUrl) {
      window.location.href =
        result.data.checkoutUrl;

      return;
    }

    /*
    -------------------------------------------------------
    SUCCESS
    -------------------------------------------------------
    */

    window.location.href = "/trips";

  } catch (err) {
    console.error(
      "LOCAL_PLAN_PURCHASE_ERROR:",
      err
    );

    setError(
      err instanceof Error
        ? err.message
        : "Unable to complete purchase."
    );

    setPurchasing(false);
  }
}

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">

            <div className="h-3 w-20 rounded bg-neutral-200" />

            <div className="mt-4 h-8 w-72 rounded bg-neutral-200" />

            <div className="mt-3 h-4 w-96 max-w-full rounded bg-neutral-100" />

            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">

              <div className="h-[380px] rounded-2xl bg-neutral-100" />

              <div className="h-[380px] rounded-2xl bg-neutral-100" />

            </div>

          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error && !plan) {
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
              This local plan may no longer be
              available.
            </p>

            <Link
              href="/local-plans"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-[10px] font-semibold text-white"
            >
              <ArrowLeft size={13} />
              Back to local plans
            </Link>

          </div>

        </section>

        <Footer />
      </main>
    );
  }

  if (!plan) return null;

  const places = plan.places ?? [];

  const placeCount =
    places.length || plan.placesCount || 0;

  /* =======================================================
     MAIN PURCHASE PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      {/* ===================================================
          BACK
      =================================================== */}

      <div className="mx-auto max-w-6xl px-5 pt-5 sm:px-6 lg:px-8">

        <Link
          href={`/local-plans/${plan.slug}`}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to plan
        </Link>

      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="mx-auto max-w-6xl px-5 pb-5 pt-5 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-end justify-between gap-4">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              COMPLETE YOUR PURCHASE
            </p>

            <h1 className="mt-1.5 font-serif text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]">
              Plan your experience
            </h1>

            <p className="mt-1.5 max-w-xl text-[11px] leading-5 text-neutral-500">
              Choose your preferred date and review your
              local plan before continuing.
            </p>

          </div>

          {/* PRICE */}

          <div className="flex items-center gap-3">

            <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400">
              Total
            </span>

            <span className="font-serif text-2xl font-semibold">
              {formatPrice(plan.price)}
            </span>

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* =================================================
              LEFT — COMPACT PLAN + DATE
          ================================================= */}

          <div className="space-y-5">

            {/* PLAN SUMMARY */}

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

              <div className="flex gap-4 p-4">

                {/* IMAGE */}

                <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-40">

                  {plan.coverImage ? (
                    <img
                      src={plan.coverImage}
                      alt={plan.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[9px] text-neutral-400">
                      No image
                    </div>
                  )}

                </div>

                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                      VISTARA LOCAL PLAN
                    </p>

                    {plan.isFeatured && (
                      <span className="rounded-full bg-black px-2 py-0.5 text-[7px] font-semibold uppercase tracking-wider text-white">
                        Featured
                      </span>
                    )}

                  </div>

                  <h2 className="mt-1 font-serif text-lg font-semibold">
                    {plan.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">

                    <span className="inline-flex items-center gap-1 text-[9px] text-neutral-500">
                      <MapPin size={10} />
                      {plan.city}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[9px] text-neutral-500">
                      <Clock3 size={10} />
                      {formatDuration(
                        plan.durationHours
                      )}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[9px] text-neutral-500">
                      <Sparkles size={10} />
                      {placeCount} places
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                DATE SELECTOR
            ================================================= */}

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    EXPERIENCE DATE
                  </p>

                  <h2 className="mt-1 text-sm font-semibold">
                    When are you exploring?
                  </h2>

                </div>

                {selectedDate && (
                  <span className="text-[10px] font-medium text-neutral-500">
                    {formatSelectedDate(
                      selectedDate
                    )}
                  </span>
                )}

              </div>

              {/* DATE INPUT */}

              <button
                type="button"
                onClick={() =>
                  setCalendarOpen(
                    !calendarOpen
                  )
                }
                className={`mt-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  selectedDate
                    ? "border-black"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >

                <div className="flex items-center gap-3">

                  <CalendarDays size={17} />

                  <div>

                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                      DATE
                    </p>

                    <p
                      className={`mt-0.5 text-xs font-medium ${
                        selectedDate
                          ? "text-black"
                          : "text-neutral-400"
                      }`}
                    >
                      {formatSelectedDate(
                        selectedDate
                      )}
                    </p>

                  </div>

                </div>

                <ArrowRight size={14} />

              </button>

              {/* =================================================
                  COMPACT CALENDAR
              ================================================= */}

              {calendarOpen && (

                <div className="mt-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">

                  {/* CALENDAR HEADER */}

                  <div className="flex items-center justify-between">

                    <button
                      type="button"
                      onClick={
                        goPreviousMonth
                      }
                      disabled={!canGoPrevious}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <p className="text-xs font-semibold">
                      {calendarMonth.toLocaleDateString(
                        "en-IN",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <button
                      type="button"
                      onClick={goNextMonth}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-50"
                    >
                      <ChevronRight size={14} />
                    </button>

                  </div>

                  {/* WEEKDAYS */}

                  <div className="mt-4 grid grid-cols-7 text-center">

                    {[
                      "S",
                      "M",
                      "T",
                      "W",
                      "T",
                      "F",
                      "S",
                    ].map(
                      (
                        day,
                        index
                      ) => (
                        <span
                          key={`${day}-${index}`}
                          className="text-[8px] font-semibold text-neutral-400"
                        >
                          {day}
                        </span>
                      )
                    )}

                  </div>

                  {/* DAYS */}

                  <div className="mt-2 grid grid-cols-7 gap-y-1">

                    {calendarDays.map(
                      (day, index) => {

                        if (day === null) {
                          return (
                            <div
                              key={`empty-${index}`}
                              className="h-8"
                            />
                          );
                        }

                        const past =
                          isPastDate(
                            day
                          );

                        const selected =
                          isSelectedDate(
                            day
                          );

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={past}
                            onClick={() =>
                              selectDate(
                                day
                              )
                            }
                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[10px] transition ${
                              selected
                                ? "bg-black font-semibold text-white"
                                : past
                                  ? "cursor-not-allowed text-neutral-200"
                                  : "text-black hover:bg-neutral-100"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                    )}

                  </div>

                  <div className="mt-3 border-t border-neutral-100 pt-3 text-center">

                    <p className="text-[8px] text-neutral-400">
                      Past dates are unavailable
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* INCLUDED */}

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                INCLUDED WITH YOUR PLAN
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">

                <div className="flex gap-2.5">

                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-[10px] font-semibold">
                      Curated places
                    </p>

                    <p className="mt-0.5 text-[8px] leading-4 text-neutral-500">
                      Selected local discoveries.
                    </p>

                  </div>

                </div>

                <div className="flex gap-2.5">

                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-[10px] font-semibold">
                      Full access
                    </p>

                    <p className="mt-0.5 text-[8px] leading-4 text-neutral-500">
                      Complete plan after purchase.
                    </p>

                  </div>

                </div>

                <div className="flex gap-2.5">

                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="text-[10px] font-semibold">
                      One-time payment
                    </p>

                    <p className="mt-0.5 text-[8px] leading-4 text-neutral-500">
                      No recurring subscription.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside>

            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                ORDER SUMMARY
              </p>

              <h3 className="mt-2 text-sm font-semibold">
                {plan.title}
              </h3>

              <p className="mt-1 text-[9px] text-neutral-500">
                {plan.city}
                {plan.area
                  ? ` · ${plan.area}`
                  : ""}
              </p>

              {/* SELECTED DATE */}

              <div className="mt-4 rounded-xl bg-neutral-50 p-3">

                <div className="flex items-center gap-2">

                  <CalendarDays size={14} />

                  <div>

                    <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      EXPERIENCE DATE
                    </p>

                    <p className="mt-0.5 text-[10px] font-semibold">
                      {formatSelectedDate(
                        selectedDate
                      )}
                    </p>

                  </div>

                </div>

              </div>

              {/* PRICE */}

              <div className="my-5 border-t border-neutral-200" />

              <div className="space-y-3">

                <div className="flex items-center justify-between">

                  <span className="text-[10px] text-neutral-500">
                    Plan price
                  </span>

                  <span className="text-[10px] font-semibold">
                    {formatPrice(
                      plan.price
                    )}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[10px] text-neutral-500">
                    Access
                  </span>

                  <span className="text-[10px] font-semibold">
                    Full plan
                  </span>

                </div>

              </div>

              <div className="my-5 border-t border-neutral-200" />

              <div className="flex items-end justify-between">

                <span className="text-[10px] text-neutral-500">
                  Total
                </span>

                <span className="font-serif text-2xl font-semibold">
                  {formatPrice(
                    plan.price
                  )}
                </span>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[9px] leading-4 text-neutral-600">
                  {error}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="button"
                onClick={handlePurchase}
                disabled={purchasing}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {purchasing ? (
                  "Processing..."
                ) : (
                  <>
                    Continue to payment
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {/* TRUST */}

              <div className="mt-4 flex gap-2 border-t border-neutral-200 pt-4">

                <ShieldCheck
                  size={14}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-[8px] leading-4 text-neutral-500">
                  Secure checkout. Your selected
                  local plan will be available after
                  successful purchase.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

      <Footer />

    </main>
  );
}