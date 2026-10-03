"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Info,
  LockKeyhole,
  Plus,
  Minus,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type AvailabilityState = {
  available: boolean;
  minStay: number;
  maxStay: number;
  advanceNotice: number;
  preparationTime: number;
  instantBooking: boolean;
  blockedDates: string[];
};

const DEFAULT_AVAILABILITY: AvailabilityState = {
  available: true,
  minStay: 1,
  maxStay: 30,
  advanceNotice: 1,
  preparationTime: 0,
  instantBooking: false,
  blockedDates: [],
};

const STORAGE_KEY_PREFIX = "vistara-property-";

export default function AvailabilityPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);
  const storageKey =
    `${STORAGE_KEY_PREFIX}${id}-availability`;

  const [availability, setAvailability] =
    useState<AvailabilityState>(
      DEFAULT_AVAILABILITY,
    );

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* LOAD                                                                    */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(storageKey);

      if (stored) {
        const parsed = JSON.parse(stored);

        setAvailability({
          available:
            typeof parsed.available === "boolean"
              ? parsed.available
              : true,

          minStay:
            typeof parsed.minStay === "number"
              ? parsed.minStay
              : 1,

          maxStay:
            typeof parsed.maxStay === "number"
              ? parsed.maxStay
              : 30,

          advanceNotice:
            typeof parsed.advanceNotice === "number"
              ? parsed.advanceNotice
              : 1,

          preparationTime:
            typeof parsed.preparationTime === "number"
              ? parsed.preparationTime
              : 0,

          instantBooking:
            typeof parsed.instantBooking === "boolean"
              ? parsed.instantBooking
              : false,

          blockedDates:
            Array.isArray(parsed.blockedDates)
              ? parsed.blockedDates
              : [],
        });
      }
    } catch {
      setAvailability(DEFAULT_AVAILABILITY);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  /* ---------------------------------------------------------------------- */
  /* UPDATE                                                                  */
  /* ---------------------------------------------------------------------- */

  function updateField(
    field: keyof AvailabilityState,
    value:
      | boolean
      | number
      | string[],
  ) {
    setSaved(false);

    setAvailability((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* ---------------------------------------------------------------------- */
  /* SAVE                                                                    */
  /* ---------------------------------------------------------------------- */

  function saveAvailability() {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(availability),
      );

      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* CONTINUE                                                                */
  /* ---------------------------------------------------------------------- */

  function handleContinue() {
    if (
      availability.minStay >
      availability.maxStay
    ) {
      return;
    }

    setSaving(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(availability),
      );
    } finally {
      setTimeout(() => {
        router.push(
          `/host/property/new/${id}/pricing`,
        );
      }, 300);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* DATE HELPERS                                                             */
  /* ---------------------------------------------------------------------- */

  const upcomingDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  }, []);

  function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  function toggleDate(date: Date) {
    const formatted = formatDate(date);

    const exists =
      availability.blockedDates.includes(
        formatted,
      );

    const nextDates = exists
      ? availability.blockedDates.filter(
          (item) => item !== formatted,
        )
      : [
          ...availability.blockedDates,
          formatted,
        ];

    updateField(
      "blockedDates",
      nextDates,
    );
  }

  function isBlocked(date: Date) {
    return availability.blockedDates.includes(
      formatDate(date),
    );
  }

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                 */
  /* ---------------------------------------------------------------------- */

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-[#E7E0D4]" />

            <div className="mt-12 h-10 w-80 rounded bg-[#E7E0D4]" />

            <div className="mt-4 h-4 w-[450px] max-w-full rounded bg-[#E7E0D4]" />

            <div className="mt-10 h-72 rounded-[28px] bg-[#E7E0D4]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* ================================================================== */}
      {/* HEADER                                                             */}
      {/* ================================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/location`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#57534E] transition hover:text-[#9A711E]"
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">
              Back to location
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] text-xs font-bold text-white">
              V
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
              Property setup
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
            06 / 08
          </span>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PROGRESS                                                            */}
      {/* ================================================================== */}

      <div className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-1.5">
            <div className="w-[76%] bg-[#D9A441]" />
            <div className="flex-1 bg-[#EEE9E0]" />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* CONTENT                                                             */}
      {/* ================================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* INTRO */}

        <section className="max-w-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF4D8] text-[#9A711E]">
            <CalendarDays size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Availability
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            When can guests stay?
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#78716C]">
            Control when your property is available,
            how long guests can stay, and how much notice
            you need before a booking.
          </p>
        </section>

        {/* ================================================================== */}
        {/* AVAILABILITY STATUS                                                 */}
        {/* ================================================================== */}

        <section className="mt-10 rounded-[28px] border border-[#E4DDD1] bg-white p-5 shadow-[0_15px_45px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div
                className={[
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                  availability.available
                    ? "bg-[#F1F4EA] text-[#68705A]"
                    : "bg-[#F4EDEA] text-[#8B5E52]",
                ].join(" ")}
              >
                <CalendarDays size={19} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
                  Listing status
                </p>

                <h2 className="mt-1 text-sm font-bold">
                  {availability.available
                    ? "Available for bookings"
                    : "Currently unavailable"}
                </h2>

                <p className="mt-1 text-[11px] text-[#A8A29E]">
                  You can change this anytime.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "available",
                  !availability.available,
                )
              }
              className={[
                "relative h-7 w-12 shrink-0 rounded-full transition",
                availability.available
                  ? "bg-[#D9A441]"
                  : "bg-[#C8C1B7]",
              ].join(" ")}
              aria-label="Toggle availability"
            >
              <span
                className={[
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition",
                  availability.available
                    ? "left-6"
                    : "left-1",
                ].join(" ")}
              />
            </button>
          </div>
        </section>

        {/* ================================================================== */}
        {/* STAY SETTINGS                                                       */}
        {/* ================================================================== */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#E4DDD1] bg-white shadow-[0_15px_45px_rgba(24,24,27,0.04)]">
          <div className="border-b border-black/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
              Booking rules
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Stay preferences
            </h2>
          </div>

          <div className="divide-y divide-black/[0.07]">
            <NumberSetting
              icon={<CalendarDays size={18} />}
              title="Minimum stay"
              description="Minimum number of nights per booking"
              value={availability.minStay}
              suffix={
                availability.minStay === 1
                  ? "night"
                  : "nights"
              }
              min={1}
              max={30}
              onDecrease={() =>
                updateField(
                  "minStay",
                  Math.max(
                    1,
                    availability.minStay - 1,
                  ),
                )
              }
              onIncrease={() =>
                updateField(
                  "minStay",
                  Math.min(
                    30,
                    availability.minStay + 1,
                  ),
                )
              }
            />

            <NumberSetting
              icon={<CalendarDays size={18} />}
              title="Maximum stay"
              description="Maximum number of nights per booking"
              value={availability.maxStay}
              suffix="nights"
              min={1}
              max={365}
              onDecrease={() =>
                updateField(
                  "maxStay",
                  Math.max(
                    1,
                    availability.maxStay - 1,
                  ),
                )
              }
              onIncrease={() =>
                updateField(
                  "maxStay",
                  Math.min(
                    365,
                    availability.maxStay + 1,
                  ),
                )
              }
            />

            <NumberSetting
              icon={<Clock3 size={18} />}
              title="Advance notice"
              description="How much notice you need before arrival"
              value={availability.advanceNotice}
              suffix={
                availability.advanceNotice === 1
                  ? "day"
                  : "days"
              }
              min={0}
              max={30}
              onDecrease={() =>
                updateField(
                  "advanceNotice",
                  Math.max(
                    0,
                    availability.advanceNotice - 1,
                  ),
                )
              }
              onIncrease={() =>
                updateField(
                  "advanceNotice",
                  Math.min(
                    30,
                    availability.advanceNotice + 1,
                  ),
                )
              }
            />

            <NumberSetting
              icon={<Clock3 size={18} />}
              title="Preparation time"
              description="Time needed between two reservations"
              value={availability.preparationTime}
              suffix={
                availability.preparationTime === 1
                  ? "day"
                  : "days"
              }
              min={0}
              max={7}
              onDecrease={() =>
                updateField(
                  "preparationTime",
                  Math.max(
                    0,
                    availability.preparationTime - 1,
                  ),
                )
              }
              onIncrease={() =>
                updateField(
                  "preparationTime",
                  Math.min(
                    7,
                    availability.preparationTime + 1,
                  ),
                )
              }
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* BLOCK DATES                                                         */}
        {/* ================================================================== */}

        <section className="mt-5 rounded-[28px] border border-[#E4DDD1] bg-white p-5 shadow-[0_15px_45px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#9A711E]">
              <LockKeyhole size={18} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
                Calendar
              </p>

              <h2 className="mt-1 text-base font-bold">
                Block dates
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-[#A8A29E]">
                Select dates when your property should
                not accept bookings.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {upcomingDates.map((date) => {
              const blocked = isBlocked(date);

              return (
                <button
                  key={formatDate(date)}
                  type="button"
                  onClick={() =>
                    toggleDate(date)
                  }
                  className={[
                    "rounded-2xl border p-3 text-center transition",
                    blocked
                      ? "border-[#D9A441] bg-[#FFF4D8]"
                      : "border-[#E4DDD1] bg-[#FCFBF8] hover:border-[#D9A441]",
                  ].join(" ")}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#A8A29E]">
                    {date.toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "short",
                      },
                    )}
                  </p>

                  <p className="mt-1 font-serif text-xl font-semibold">
                    {date.getDate()}
                  </p>

                  <p className="mt-1 text-[9px] text-[#A8A29E]">
                    {date.toLocaleDateString(
                      "en-IN",
                      {
                        month: "short",
                      },
                    )}
                  </p>

                  {blocked && (
                    <span className="mt-2 block text-[8px] font-bold uppercase tracking-wider text-[#9A711E]">
                      Blocked
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {availability.blockedDates.length > 0 && (
            <div className="mt-4 rounded-xl bg-[#F7F3EB] px-4 py-3 text-[10px] font-semibold text-[#57534E]">
              {availability.blockedDates.length}{" "}
              {availability.blockedDates.length === 1
                ? "date"
                : "dates"}{" "}
              currently blocked.
            </div>
          )}
        </section>

        {/* ================================================================== */}
        {/* INSTANT BOOKING                                                     */}
        {/* ================================================================== */}

        <section className="mt-5 rounded-[28px] border border-[#E4DDD1] bg-white p-5 shadow-[0_15px_45px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4D8] text-[#9A711E]">
                <Zap size={18} />
              </div>

              <div>
                <h2 className="text-sm font-bold">
                  Instant booking
                </h2>

                <p className="mt-1 max-w-lg text-[11px] leading-5 text-[#A8A29E]">
                  Allow eligible guests to book without
                  waiting for you to manually approve the
                  request.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "instantBooking",
                  !availability.instantBooking,
                )
              }
              className={[
                "relative h-7 w-12 shrink-0 rounded-full transition",
                availability.instantBooking
                  ? "bg-[#D9A441]"
                  : "bg-[#C8C1B7]",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition",
                  availability.instantBooking
                    ? "left-6"
                    : "left-1",
                ].join(" ")}
              />
            </button>
          </div>
        </section>

        {/* ================================================================== */}
        {/* WARNING                                                             */}
        {/* ================================================================== */}

        {availability.minStay >
          availability.maxStay && (
          <section className="mt-5 rounded-2xl border border-[#D9A441] bg-[#FFF9EA] p-4">
            <p className="text-xs font-bold text-[#7C5D17]">
              Minimum stay cannot be greater than
              maximum stay.
            </p>

            <p className="mt-1 text-[10px] text-[#8B7750]">
              Adjust your stay settings before
              continuing.
            </p>
          </section>
        )}

        {/* ================================================================== */}
        {/* INFO                                                                */}
        {/* ================================================================== */}

        <section className="mt-5 flex gap-3 rounded-2xl border border-[#E7DCC4] bg-[#FFF9EA] p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E]">
            <Info size={17} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#51472F]">
              You stay in control
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#7C7052]">
              Availability can be changed later from your
              host calendar. Blocked dates will prevent new
              reservations for those days.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SAVED                                                               */}
        {/* ================================================================== */}

        <div className="mt-5 flex min-h-5 justify-center">
          {saved && (
            <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#68705A]">
              <Check size={13} />
              Availability saved
            </p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOOTER                                                               */}
      {/* ================================================================== */}

      <footer className="sticky bottom-0 z-30 border-t border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/location`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-[#57534E] transition hover:bg-white"
          >
            <ArrowLeft size={15} />

            <span className="hidden sm:inline">
              Back
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={saveAvailability}
              className="hidden rounded-xl border border-[#D8D1C5] bg-white px-5 py-3 text-xs font-bold text-[#403C37] transition hover:border-[#D9A441] sm:inline-flex"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={
                saving ||
                availability.minStay >
                  availability.maxStay
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#18181B] shadow-[0_8px_20px_rgba(217,164,65,0.18)] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
            >
              {saving ? "Saving..." : "Continue"}

              {!saving && (
                <ArrowRight size={15} />
              )}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================================================================== */
/* NUMBER SETTING                                                             */
/* ========================================================================== */

function NumberSetting({
  icon,
  title,
  description,
  value,
  suffix,
  min,
  max,
  onDecrease,
  onIncrease,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#9A711E]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-[#A8A29E]">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D1C5] bg-white text-[#57534E] transition hover:border-[#D9A441] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus size={15} />
        </button>

        <div className="w-16 text-center">
          <span className="block text-sm font-bold">
            {value}
          </span>

          <span className="text-[9px] text-[#A8A29E]">
            {suffix}
          </span>
        </div>

        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D1C5] bg-white text-[#57534E] transition hover:border-[#D9A441] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}