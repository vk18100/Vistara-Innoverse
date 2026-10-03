"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Check,
  Dog,
  Info,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type GuestState = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

const DEFAULT_GUESTS: GuestState = {
  adults: 2,
  children: 0,
  infants: 0,
  pets: 0,
};

const MIN_ADULTS = 1;
const MAX_ADULTS = 20;
const MAX_CHILDREN = 10;
const MAX_INFANTS = 5;
const MAX_PETS = 5;

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function GuestsPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const storageKey = `vistara-property-${id}-guests`;

  const [guests, setGuests] =
    useState<GuestState>(DEFAULT_GUESTS);

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* LOAD SAVED DATA                                                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const parsed = JSON.parse(stored);

        setGuests({
          adults:
            typeof parsed.adults === "number"
              ? parsed.adults
              : DEFAULT_GUESTS.adults,

          children:
            typeof parsed.children === "number"
              ? parsed.children
              : DEFAULT_GUESTS.children,

          infants:
            typeof parsed.infants === "number"
              ? parsed.infants
              : DEFAULT_GUESTS.infants,

          pets:
            typeof parsed.pets === "number"
              ? parsed.pets
              : DEFAULT_GUESTS.pets,
        });
      }
    } catch {
      setGuests(DEFAULT_GUESTS);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  /* ------------------------------------------------------------------------ */
  /* TOTAL                                                                     */
  /* ------------------------------------------------------------------------ */

  const totalGuests = useMemo(() => {
    return guests.adults + guests.children;
  }, [guests.adults, guests.children]);

  const totalPeople = useMemo(() => {
    return (
      guests.adults +
      guests.children +
      guests.infants
    );
  }, [
    guests.adults,
    guests.children,
    guests.infants,
  ]);

  /* ------------------------------------------------------------------------ */
  /* UPDATE                                                                    */
  /* ------------------------------------------------------------------------ */

  function updateGuest(
    field: keyof GuestState,
    value: number,
  ) {
    setSaved(false);

    setGuests((current) => ({
      ...current,
      [field]: Math.max(0, value),
    }));
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE                                                                      */
  /* ------------------------------------------------------------------------ */

  function saveGuests() {
    setSaving(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(guests),
      );

      setSaved(true);
    } catch {
      setSaved(false);
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 350);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* CONTINUE                                                                  */
  /* ------------------------------------------------------------------------ */

  function handleContinue() {
    if (guests.adults < MIN_ADULTS) {
      return;
    }

    setSaving(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(guests),
      );
    } finally {
      setTimeout(() => {
        router.push(
          `/host/property/new/${id}/location`,
        );
      }, 250);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* LOADING                                                                   */
  /* ------------------------------------------------------------------------ */

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-[#E7E0D4]" />

            <div className="mt-12 h-10 w-72 rounded bg-[#E7E0D4]" />

            <div className="mt-4 h-4 w-96 max-w-full rounded bg-[#E7E0D4]" />

            <div className="mt-10 h-64 rounded-[28px] bg-[#E7E0D4]" />
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
            href={`/host/property/new/${id}/amenities`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#57534E] transition hover:text-[#9A711E]"
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">
              Back to amenities
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
            04 / 07
          </span>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PROGRESS                                                            */}
      {/* ================================================================== */}

      <div className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-1.5">
            <div className="w-[57%] bg-[#D9A441]" />
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
            <Users size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Guest capacity
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Who can stay here?
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#78716C]">
            Set the number of guests your property can
            comfortably accommodate. Guests will see these
            details before making a booking.
          </p>
        </section>

        {/* ================================================================== */}
        {/* SUMMARY                                                            */}
        {/* ================================================================== */}

        <section className="mt-9 rounded-[28px] border border-[#E4DDD1] bg-white p-5 shadow-[0_15px_45px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8A29E]">
                Current capacity
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold">
                  {totalGuests}
                </span>

                <span className="text-sm text-[#78716C]">
                  {totalGuests === 1
                    ? "guest"
                    : "guests"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <SummaryPill
                label={`${guests.adults} adults`}
              />

              {guests.children > 0 && (
                <SummaryPill
                  label={`${guests.children} children`}
                />
              )}

              {guests.infants > 0 && (
                <SummaryPill
                  label={`${guests.infants} infants`}
                />
              )}

              {guests.pets > 0 && (
                <SummaryPill
                  label={`${guests.pets} pets`}
                />
              )}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* GUEST CONTROLS                                                     */}
        {/* ================================================================== */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#E4DDD1] bg-white shadow-[0_15px_45px_rgba(24,24,27,0.04)]">
          <GuestRow
            icon={<Users size={19} />}
            title="Adults"
            description="Guests aged 13 and above"
            value={guests.adults}
            min={1}
            max={MAX_ADULTS}
            onDecrease={() =>
              updateGuest(
                "adults",
                guests.adults - 1,
              )
            }
            onIncrease={() =>
              updateGuest(
                "adults",
                guests.adults + 1,
              )
            }
          />

          <GuestRow
            icon={<Users size={19} />}
            title="Children"
            description="Guests aged 2–12"
            value={guests.children}
            min={0}
            max={MAX_CHILDREN}
            onDecrease={() =>
              updateGuest(
                "children",
                guests.children - 1,
              )
            }
            onIncrease={() =>
              updateGuest(
                "children",
                guests.children + 1,
              )
            }
          />

          <GuestRow
            icon={<Baby size={19} />}
            title="Infants"
            description="Children under 2"
            value={guests.infants}
            min={0}
            max={MAX_INFANTS}
            onDecrease={() =>
              updateGuest(
                "infants",
                guests.infants - 1,
              )
            }
            onIncrease={() =>
              updateGuest(
                "infants",
                guests.infants + 1,
              )
            }
          />

          <GuestRow
            icon={<Dog size={19} />}
            title="Pets"
            description="Will you allow guests to bring pets?"
            value={guests.pets}
            min={0}
            max={MAX_PETS}
            onDecrease={() =>
              updateGuest(
                "pets",
                guests.pets - 1,
              )
            }
            onIncrease={() =>
              updateGuest(
                "pets",
                guests.pets + 1,
              )
            }
            last
          />
        </section>

        {/* ================================================================== */}
        {/* INFORMATION                                                        */}
        {/* ================================================================== */}

        <section className="mt-5 flex gap-3 rounded-2xl border border-[#E7DCC4] bg-[#FFF9EA] p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E]">
            <Info size={17} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#51472F]">
              Keep your capacity realistic
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#7C7052]">
              Only include guests your property can
              comfortably and safely accommodate.
              Infants are shown separately and do not
              increase the standard guest capacity.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/* CAPACITY CHECK                                                     */}
        {/* ================================================================== */}

        <section className="mt-5 rounded-[24px] border border-black/[0.07] bg-[#F7F3EB] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
                Booking capacity
              </p>

              <p className="mt-1 text-sm font-semibold text-[#403C37]">
                {totalGuests}{" "}
                {totalGuests === 1
                  ? "guest"
                  : "guests"}{" "}
                can book this property
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#68705A]">
              <Check size={18} />
            </div>
          </div>

          {guests.pets > 0 && (
            <div className="mt-4 border-t border-black/[0.06] pt-4 text-[11px] text-[#78716C]">
              Pet allowance:{" "}
              <span className="font-bold text-[#403C37]">
                {guests.pets}
              </span>
            </div>
          )}

          {totalPeople > MAX_ADULTS && (
            <p className="mt-3 text-xs font-semibold text-[#9A711E]">
              Please review your guest capacity.
            </p>
          )}
        </section>

        {/* ================================================================== */}
        {/* SAVE STATUS                                                        */}
        {/* ================================================================== */}

        <div className="mt-6 flex min-h-5 items-center justify-center">
          {saved && (
            <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#68705A]">
              <Check size={13} />
              Guest settings saved
            </p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOOTER ACTIONS                                                      */}
      {/* ================================================================== */}

      <footer className="sticky bottom-0 z-30 border-t border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/amenities`}
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
              onClick={saveGuests}
              disabled={saving}
              className="hidden rounded-xl border border-[#D8D1C5] bg-white px-5 py-3 text-xs font-bold text-[#403C37] transition hover:border-[#D9A441] disabled:cursor-not-allowed disabled:opacity-50 sm:inline-flex"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={
                saving ||
                guests.adults < MIN_ADULTS
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#18181B] shadow-[0_8px_20px_rgba(217,164,65,0.18)] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
            >
              {saving
                ? "Saving..."
                : "Continue"}

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

/* -------------------------------------------------------------------------- */
/* GUEST ROW                                                                  */
/* -------------------------------------------------------------------------- */

function GuestRow({
  icon,
  title,
  description,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-4 px-5 py-5 sm:px-6",
        !last
          ? "border-b border-black/[0.07]"
          : "",
      ].join(" ")}
    >
      {/* ICON */}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F7F3EB] text-[#9A711E]">
        {icon}
      </div>

      {/* TEXT */}

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-bold text-[#292524]">
          {title}
        </h2>

        <p className="mt-1 text-[11px] leading-5 text-[#A8A29E]">
          {description}
        </p>
      </div>

      {/* COUNTER */}

      <div className="flex shrink-0 items-center gap-3">
        <CounterButton
          type="decrease"
          disabled={value <= min}
          onClick={onDecrease}
        />

        <span className="w-5 text-center text-sm font-bold text-[#292524]">
          {value}
        </span>

        <CounterButton
          type="increase"
          disabled={value >= max}
          onClick={onIncrease}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COUNTER BUTTON                                                             */
/* -------------------------------------------------------------------------- */

function CounterButton({
  type,
  disabled,
  onClick,
}: {
  type: "increase" | "decrease";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={
        type === "increase"
          ? "Increase"
          : "Decrease"
      }
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8D1C5] bg-white text-[#57534E] transition hover:border-[#D9A441] hover:text-[#8A681D] disabled:cursor-not-allowed disabled:opacity-30"
    >
      {type === "increase" ? (
        <Plus size={15} />
      ) : (
        <Minus size={15} />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* SUMMARY PILL                                                               */
/* -------------------------------------------------------------------------- */

function SummaryPill({
  label,
}: {
  label: string;
}) {
  return (
    <span className="rounded-full border border-[#E4DDD1] bg-[#FAF8F3] px-3 py-1.5 text-[10px] font-bold text-[#57534E]">
      {label}
    </span>
  );
}