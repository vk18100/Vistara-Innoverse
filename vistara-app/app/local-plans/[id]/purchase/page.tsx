"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ElementType,
} from "react";
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
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
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

type LocalPlan = {
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

type LocalPlanBooking = {
  id: string;
  bookingId: string;
  type: "LOCAL_PLAN";
  planId: string;
  planSlug: string;
  planTitle: string;
  city: string;
  area: string;
  date: string;
  guests: number;
  pricePerPerson: number;
  subtotal: number;
  serviceFee: number;
  totalAmount: number;
  status: "CONFIRMED";
  paymentStatus: "NOT_REQUIRED";
  unlockStatus: "UNLOCKED";
  createdAt: string;
  places: Place[];
  placesCount: number;
};

/* =========================================================
   FALLBACK DATA
========================================================= */

const fallbackPlans: LocalPlan[] = [
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
   HELPERS
========================================================= */

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function formatDuration(hours: number) {
  if (hours >= 336) return "14 days";
  if (hours >= 168) return "7 days";
  if (hours >= 72) return "3 days";
  if (hours >= 48) return "2 days";
  return `${hours} hours`;
}

function formatDate(date: Date | null) {
  if (!date) return "Select date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* =========================================================
   PAGE
========================================================= */

export default function LocalPlanPurchasePage() {
  const params = useParams<{ id: string }>();

  const id = String(params?.id ?? "").trim();

  /* =======================================================
     PLAN
  ======================================================= */

  const [plan, setPlan] = useState<LocalPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  /* =======================================================
     CONFIRMATION
  ======================================================= */

  const [confirmedBooking, setConfirmedBooking] =
    useState<LocalPlanBooking | null>(null);

  /* =======================================================
     DATE
  ======================================================= */

  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const value = new Date();
    value.setDate(1);
    value.setHours(0, 0, 0, 0);
    return value;
  });

  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIndex = calendarMonth.getMonth();

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

  const calendarDays: Array<number | null> = [];

  for (let index = 0; index < firstDay; index++) {
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

    date.setHours(0, 0, 0, 0);

    return date < today;
  }

  function isSelectedDate(day: number) {
    if (!selectedDate) return false;

    return (
      selectedDate.getFullYear() === calendarYear &&
      selectedDate.getMonth() === calendarMonthIndex &&
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

    date.setHours(0, 0, 0, 0);

    setSelectedDate(date);
    setCalendarOpen(false);
    setError("");
  }

  function previousMonth() {
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

  function nextMonth() {
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

          if (response.ok) {
            const result = await response.json();

            if (result?.success && result?.data) {
              if (active) {
                setPlan(result.data);
              }

              return;
            }
          }
        } catch (apiError) {
          console.warn(
            "LOCAL_PLAN_DETAIL_ERROR:",
            apiError
          );
        }

        /* -----------------------------------------------
           2. LIST API
        ----------------------------------------------- */

        try {
          const response = await fetch(
            "/api/local-plans",
            {
              method: "GET",
              cache: "no-store",
            }
          );

          if (response.ok) {
            const result = await response.json();

            if (
              result?.success &&
              Array.isArray(result?.data)
            ) {
              const found = result.data.find(
                (item: LocalPlan) =>
                  String(item.slug).trim() === id ||
                  String(item.id) === id
              );

              if (found) {
                if (active) {
                  setPlan(found);
                }

                return;
              }
            }
          }
        } catch (listError) {
          console.warn(
            "LOCAL_PLANS_LIST_ERROR:",
            listError
          );
        }

        /* -----------------------------------------------
           3. FALLBACK
        ----------------------------------------------- */

        const fallback = fallbackPlans.find(
          (item) =>
            String(item.slug).trim() === id ||
            String(item.id) === id
        );

        if (fallback) {
          if (active) {
            setPlan(fallback);
          }

          return;
        }

        if (active) {
          setError("Local plan not found.");
        }
      } catch (err) {
        console.error(
          "LOCAL_PLAN_LOAD_ERROR:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load local plan."
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
     PLAN DATA
  ======================================================= */

  const places = plan?.places ?? [];

  const placesCount =
    places.length || plan?.placesCount || 0;

  const planPrice = Number(plan?.price ?? 0);

  /* =======================================================
     PURCHASE
     
     MVP:
     - No Razorpay
     - No real payment
     - Purchase = confirmed booking + unlock
  ======================================================= */

  function handlePurchase() {
    if (!plan || purchasing) return;

    if (!selectedDate) {
      setError("Please select your experience date.");
      setCalendarOpen(true);
      return;
    }

    try {
      setPurchasing(true);
      setError("");

      const now = Date.now();

      const bookingId =
        `VST-LP-${new Date().getFullYear()}-${String(
          now
        ).slice(-6)}`;

      const subtotal = planPrice;
      const serviceFee = 0;
      const total = subtotal + serviceFee;

      const booking: LocalPlanBooking = {
        id: `local-plan-booking-${now}`,
        bookingId,

        type: "LOCAL_PLAN",

        planId: String(plan.id),
        planSlug: plan.slug,
        planTitle: plan.title,

        city: plan.city,
        area: plan.area ?? "",

        date: selectedDate.toISOString(),

        guests: 1,

        pricePerPerson: subtotal,
        subtotal,
        serviceFee,
        totalAmount: total,

        status: "CONFIRMED",
        paymentStatus: "NOT_REQUIRED",
        unlockStatus: "UNLOCKED",

        createdAt: new Date().toISOString(),

        places: plan.places ?? [],
        placesCount,
      };

      /* =================================================
         1. COMMON VISTARA BOOKINGS
      ================================================= */

      let commonBookings: LocalPlanBooking[] = [];

      try {
        const saved =
          localStorage.getItem(
            "vistara-bookings"
          );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            commonBookings = parsed;
          }
        }
      } catch {
        commonBookings = [];
      }

      commonBookings = commonBookings.filter(
        (item) =>
          item?.bookingId !== bookingId
      );

      commonBookings.unshift(booking);

      localStorage.setItem(
        "vistara-bookings",
        JSON.stringify(commonBookings)
      );

      /* =================================================
         2. LOCAL PLAN BOOKINGS
      ================================================= */

      let localPlanBookings: LocalPlanBooking[] = [];

      try {
        const saved =
          localStorage.getItem(
            "vistara-local-plan-bookings"
          );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            localPlanBookings = parsed;
          }
        }
      } catch {
        localPlanBookings = [];
      }

      localPlanBookings = localPlanBookings.filter(
        (item) =>
          item?.bookingId !== bookingId
      );

      localPlanBookings.unshift(booking);

      localStorage.setItem(
        "vistara-local-plan-bookings",
        JSON.stringify(localPlanBookings)
      );

      /* =================================================
         3. UNLOCK LOCAL PLAN
      ================================================= */

      let unlockedPlans: any[] = [];

      try {
        const saved =
          localStorage.getItem(
            "vistara-unlocked-local-plans"
          );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            unlockedPlans = parsed;
          }
        }
      } catch {
        unlockedPlans = [];
      }

      const unlockedPlan = {
        planId: String(plan.id),
        planSlug: plan.slug,
        planTitle: plan.title,

        city: plan.city,
        area: plan.area ?? "",

        purchaseDate:
          new Date().toISOString(),

        experienceDate:
          selectedDate.toISOString(),

        status: "UNLOCKED",

        bookingId,

        places: plan.places ?? [],
        placesCount,
      };

      unlockedPlans = unlockedPlans.filter(
        (item) =>
          String(item?.planId) !==
          String(plan.id)
      );

      unlockedPlans.unshift(unlockedPlan);

      localStorage.setItem(
        "vistara-unlocked-local-plans",
        JSON.stringify(unlockedPlans)
      );

      /* =================================================
         4. SAVE CURRENT LOCAL PLAN
      ================================================= */

      localStorage.setItem(
        "vistara-last-local-plan",
        JSON.stringify(booking)
      );

      /* =================================================
         5. SHOW CONFIRMATION MODAL
      ================================================= */

      setConfirmedBooking(booking);
    } catch (err) {
      console.error(
        "LOCAL_PLAN_BOOKING_ERROR:",
        err
      );

      setError(
        "Unable to confirm your local plan. Please try again."
      );
    } finally {
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

        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded bg-neutral-200" />

            <div className="mt-5 h-10 w-80 rounded bg-neutral-200" />

            <div className="mt-3 h-4 w-full max-w-xl rounded bg-neutral-100" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-5">
                <div className="h-72 rounded-3xl bg-neutral-100" />
                <div className="h-80 rounded-3xl bg-neutral-100" />
              </div>

              <div className="h-[520px] rounded-3xl bg-neutral-100" />
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

  if (!plan) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5">
          <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <MapPin size={24} />
            </div>

            <h1 className="mt-5 text-2xl font-black">
              Local plan unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-black/50">
              {error ||
                "We couldn't find this local plan."}
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/80"
            >
              <ArrowLeft size={16} />
              Back to Explore
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className="mb-7 flex items-center justify-between">
          <Link
            href={`/local-plans/${id}`}
            className="flex items-center gap-2 text-sm font-semibold text-black/55 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Local Plan
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">
            <ShieldCheck size={15} />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/55">
              Secure booking
            </span>
          </div>
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
            COMPLETE YOUR LOCAL PLAN
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Plan your experience
          </h1>

          <p className="mt-3 text-sm leading-6 text-black/50">
            Choose your preferred date and confirm
            your Local Plan. Your plan will be unlocked
            immediately for this MVP.
          </p>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-9 grid gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">
            {/* PLAN CARD */}

            <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="relative h-64 md:h-full md:min-h-[300px]">
                  {plan.coverImage ? (
                    <img
                      src={plan.coverImage}
                      alt={plan.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[260px] items-center justify-center bg-neutral-100">
                      <MapPin
                        size={38}
                        className="text-black/20"
                      />
                    </div>
                  )}

                  {plan.isFeatured && (
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-wider shadow-sm">
                      <Sparkles size={12} />
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                    LOCAL PLAN
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {plan.title}
                  </h2>

                  <p className="mt-2 text-sm text-black/45">
                    {plan.city}
                    {plan.area
                      ? ` · ${plan.area}`
                      : ""}
                  </p>

                  <p className="mt-5 text-sm leading-6 text-black/60">
                    {plan.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <InfoCard
                      icon={Clock3}
                      label="Duration"
                      value={formatDuration(
                        plan.durationHours
                      )}
                    />

                    <InfoCard
                      icon={MapPin}
                      label="Places"
                      value={`${placesCount} places`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* DATE SECTION */}

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SmallLabel>
                    EXPERIENCE DATE
                  </SmallLabel>

                  <h2 className="mt-1 text-xl font-black">
                    When do you want to explore?
                  </h2>

                  <p className="mt-2 text-sm text-black/45">
                    Select the date for your local
                    exploration.
                  </p>
                </div>

                <CalendarDays
                  size={22}
                  className="shrink-0"
                />
              </div>

              {/* DATE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setCalendarOpen(
                    (value) => !value
                  )
                }
                className={`mt-6 flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                  selectedDate
                    ? "border-black bg-black/[0.02]"
                    : "border-black/10 bg-white hover:border-black/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      selectedDate
                        ? "bg-black text-white"
                        : "bg-black/5 text-black"
                    }`}
                  >
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
                      Selected date
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {formatDate(selectedDate)}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className={
                    calendarOpen
                      ? "rotate-90 transition"
                      : "transition"
                  }
                />
              </button>

              {/* CALENDAR */}

              {calendarOpen && (
                <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={previousMonth}
                      disabled={!canGoPrevious}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:border-black disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    <p className="text-sm font-black">
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
                      onClick={nextMonth}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:border-black"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-1">
                    {[
                      "S",
                      "M",
                      "T",
                      "W",
                      "T",
                      "F",
                      "S",
                    ].map((day, index) => (
                      <div
                        key={`${day}-${index}`}
                        className="py-2 text-center text-[9px] font-bold text-black/35"
                      >
                        {day}
                      </div>
                    ))}

                    {calendarDays.map(
                      (day, index) => {
                        if (day === null) {
                          return (
                            <div
                              key={`empty-${index}`}
                              className="h-10"
                            />
                          );
                        }

                        const past =
                          isPastDate(day);

                        const selected =
                          isSelectedDate(day);

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() =>
                              selectDate(day)
                            }
                            disabled={past}
                            className={`h-10 rounded-xl text-xs font-semibold transition ${
                              selected
                                ? "bg-black text-white"
                                : past
                                ? "cursor-not-allowed text-black/15"
                                : "text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}
            </section>

            {/* INCLUDED */}

            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
              <SmallLabel>
                WHAT YOU UNLOCK
              </SmallLabel>

              <h2 className="mt-1 text-xl font-black">
                Everything inside your plan
              </h2>

              <div className="mt-6 space-y-5">
                <DetailCard
                  icon={Sparkles}
                  label="Local discoveries"
                  value={`Access ${placesCount} selected local places`}
                />

                <DetailCard
                  icon={MapPin}
                  label="Maps & routes"
                  value="Unlock exact locations and route information"
                />

                <DetailCard
                  icon={LockKeyhole}
                  label="Protected details"
                  value="Full place and plan details become available"
                />

                <DetailCard
                  icon={ShieldCheck}
                  label="Flexible exploration"
                  value="Choose Self Explore, Guide or Vistara Transport"
                />
              </div>
            </section>

            {/* AFTER PURCHASE */}

            <section className="rounded-3xl bg-black p-6 text-white sm:p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                AFTER UNLOCK
              </p>

              <h2 className="mt-2 text-xl font-black">
                Choose how you want to explore
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                Once your Local Plan is confirmed,
                you can continue your journey with
                the mode that suits you.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Self Explore",
                    text: "Explore on your own",
                  },
                  {
                    title: "Local Guide",
                    text: "Travel with a local",
                  },
                  {
                    title: "Vistara Transport",
                    text: "Book Bike, Auto or Car",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  >
                    <p className="text-sm font-bold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-white/45">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
              <div className="bg-black p-6 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                  ORDER SUMMARY
                </p>

                <h2 className="mt-2 text-xl font-black">
                  {plan.title}
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  {plan.city}
                  {plan.area
                    ? ` · ${plan.area}`
                    : ""}
                </p>
              </div>

              <div className="p-6">
                {/* DATE */}

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />

                      <span className="text-xs font-semibold">
                        Date
                      </span>
                    </div>

                    <span className="text-xs font-bold">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                </div>

                {/* DURATION */}

                <div className="mt-3 rounded-2xl bg-neutral-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />

                      <span className="text-xs font-semibold">
                        Duration
                      </span>
                    </div>

                    <span className="text-xs font-bold">
                      {formatDuration(
                        plan.durationHours
                      )}
                    </span>
                  </div>
                </div>

                {/* PRICE */}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-black/45">
                      Local Plan
                    </span>

                    <span className="font-semibold">
                      {formatPrice(plan.price)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black/45">
                      Service fee
                    </span>

                    <span className="font-semibold">
                      ₹0
                    </span>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        Total
                      </span>

                      <span className="text-2xl font-black">
                        {formatPrice(plan.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-sm font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {purchasing
                    ? "Confirming..."
                    : "Confirm Local Plan"}

                  {!purchasing && (
                    <ArrowRight size={16} />
                  )}
                </button>

                <div className="mt-4 flex items-start gap-2 border-t border-black/10 pt-4">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-[10px] leading-4 text-black/45">
                    Demo booking — no payment is
                    required. Your Local Plan will
                    be marked as confirmed and
                    unlocked immediately.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      {confirmedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-[480px] overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            {/* HEADER */}

            <div className="relative bg-black px-6 py-8 text-center text-white">
              <button
                type="button"
                onClick={() =>
                  setConfirmedBooking(null)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                <Check
                  size={28}
                  strokeWidth={3}
                />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">
                VISTARA LOCAL PLAN
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Booking confirmed
              </h2>

              <p className="mt-2 text-xs text-white/50">
                Your Local Plan has been confirmed
                and unlocked successfully.
              </p>
            </div>

            {/* BODY */}

            <div className="p-6">
              {/* BOOKING ID */}

              <div className="rounded-2xl border border-black/10 bg-white p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/35">
                  Booking ID
                </p>

                <p className="mt-1.5 text-sm font-black tracking-wide">
                  {confirmedBooking.bookingId}
                </p>
              </div>

              {/* PLAN */}

              <div className="mt-3 rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex gap-4">
                  {plan.coverImage ? (
                    <img
                      src={plan.coverImage}
                      alt={plan.title}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                      <MapPin size={22} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/35">
                      Local Plan
                    </p>

                    <h3 className="mt-1 text-sm font-black">
                      {confirmedBooking.planTitle}
                    </h3>

                    <p className="mt-1 text-xs text-black/45">
                      {confirmedBooking.city}
                      {confirmedBooking.area
                        ? ` · ${confirmedBooking.area}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* DATE / STATUS */}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <ModalInfo
                  label="Date"
                  value={formatDate(
                    new Date(
                      confirmedBooking.date
                    )
                  )}
                />

                <ModalInfo
                  label="Status"
                  value="Confirmed"
                />
              </div>

              {/* UNLOCK */}

              <div className="mt-3 rounded-2xl border border-black/10 bg-neutral-100 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                    <LockKeyhole size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-black">
                      Local Plan unlocked
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-black/50">
                      Exact places, plan details
                      and route information are now
                      available.
                    </p>
                  </div>
                </div>
              </div>

              {/* TOTAL */}

              <div className="mt-3 rounded-2xl bg-black p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    Total
                  </span>

                  <span className="text-lg font-black">
                    ₹
                    {confirmedBooking.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <p className="mt-2 text-[9px] text-white/35">
                  No payment required for this MVP.
                </p>
              </div>

              {/* ACTIONS */}

              <div className="mt-4 grid gap-2">
                <Link
                  href={`/bookings/${encodeURIComponent(
                    confirmedBooking.bookingId
                  )}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white transition hover:bg-black/85"
                >
                  View booking
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/explore"
                  className="flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-bold transition hover:border-black"
                >
                  Continue exploring
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   SMALL LABEL
========================================================= */

function SmallLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
      {children}
    </p>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <Icon
        size={18}
        strokeWidth={1.7}
      />

      <p className="mt-3 text-[9px] uppercase tracking-[0.1em] text-black/40">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
        <Icon
          size={18}
          strokeWidth={1.7}
        />
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.1em] text-black/40">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL INFO
========================================================= */

function ModalInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-neutral-50 p-3">
      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/35">
        {label}
      </p>

      <p className="mt-1 text-xs font-black">
        {value}
      </p>
    </div>
  );
}