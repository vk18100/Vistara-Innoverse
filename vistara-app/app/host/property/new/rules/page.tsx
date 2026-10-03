"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  DoorOpen,
  Info,
  Minus,
  Plus,
  Sofa,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type RoomState = {
  bedrooms: number;
  beds: number;
  bathrooms: number;
  livingRooms: number;
  privateRooms: number;
  sharedRooms: number;
};

const DEFAULT_ROOMS: RoomState = {
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  livingRooms: 0,
  privateRooms: 1,
  sharedRooms: 0,
};

export default function RoomsPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const storageKey =
    `vistara-property-${id}-rooms`;

  const [rooms, setRooms] =
    useState<RoomState>(DEFAULT_ROOMS);

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* LOAD SAVED DATA                                                        */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(storageKey);

      if (stored) {
        const parsed = JSON.parse(stored);

        setRooms({
          bedrooms:
            typeof parsed.bedrooms === "number"
              ? parsed.bedrooms
              : DEFAULT_ROOMS.bedrooms,

          beds:
            typeof parsed.beds === "number"
              ? parsed.beds
              : DEFAULT_ROOMS.beds,

          bathrooms:
            typeof parsed.bathrooms === "number"
              ? parsed.bathrooms
              : DEFAULT_ROOMS.bathrooms,

          livingRooms:
            typeof parsed.livingRooms === "number"
              ? parsed.livingRooms
              : DEFAULT_ROOMS.livingRooms,

          privateRooms:
            typeof parsed.privateRooms === "number"
              ? parsed.privateRooms
              : DEFAULT_ROOMS.privateRooms,

          sharedRooms:
            typeof parsed.sharedRooms === "number"
              ? parsed.sharedRooms
              : DEFAULT_ROOMS.sharedRooms,
        });
      }
    } catch {
      setRooms(DEFAULT_ROOMS);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  /* ---------------------------------------------------------------------- */
  /* UPDATE                                                                 */
  /* ---------------------------------------------------------------------- */

  function updateRoom(
    field: keyof RoomState,
    value: number,
  ) {
    setSaved(false);

    setRooms((current) => ({
      ...current,
      [field]: Math.max(0, value),
    }));
  }

  /* ---------------------------------------------------------------------- */
  /* VALIDATION                                                             */
  /* ---------------------------------------------------------------------- */

  const valid = useMemo(() => {
    return (
      rooms.bedrooms >= 1 &&
      rooms.beds >= rooms.bedrooms &&
      rooms.bathrooms >= 1 &&
      rooms.privateRooms >= 1
    );
  }, [rooms]);

  /* ---------------------------------------------------------------------- */
  /* SAVE                                                                   */
  /* ---------------------------------------------------------------------- */

  function saveRooms() {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(rooms),
      );

      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* CONTINUE                                                               */
  /* ---------------------------------------------------------------------- */

  function handleContinue() {
    if (!valid) return;

    setSaving(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(rooms),
      );
    } finally {
      setTimeout(() => {
        router.push(
          `/host/property/new/${id}/rules`,
        );
      }, 300);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                */
  /* ---------------------------------------------------------------------- */

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-[#E7E0D4]" />

            <div className="mt-12 h-10 w-80 rounded bg-[#E7E0D4]" />

            <div className="mt-4 h-4 w-[450px] max-w-full rounded bg-[#E7E0D4]" />

            <div className="mt-10 h-80 rounded-[28px] bg-[#E7E0D4]" />
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
            href={`/host/property/new/${id}/pricing`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#57534E] transition hover:text-[#9A711E]"
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">
              Back to pricing
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
            07 / 08
          </span>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PROGRESS                                                            */}
      {/* ================================================================== */}

      <div className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-1.5">
            <div className="w-[86%] bg-[#D9A441]" />
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
            <BedDouble size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Rooms & sleeping
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tell guests about the space
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#78716C]">
            Add the rooms, beds and bathrooms available
            at your property. This information helps guests
            understand exactly what they are booking.
          </p>
        </section>

        {/* ================================================================== */}
        {/* PROPERTY SUMMARY                                                   */}
        {/* ================================================================== */}

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          <SummaryCard
            icon={<DoorOpen size={18} />}
            value={rooms.bedrooms}
            label={
              rooms.bedrooms === 1
                ? "Bedroom"
                : "Bedrooms"
            }
          />

          <SummaryCard
            icon={<BedDouble size={18} />}
            value={rooms.beds}
            label={
              rooms.beds === 1
                ? "Bed"
                : "Beds"
            }
          />

          <SummaryCard
            icon={<Users size={18} />}
            value={rooms.bathrooms}
            label={
              rooms.bathrooms === 1
                ? "Bathroom"
                : "Bathrooms"
            }
          />
        </section>

        {/* ================================================================== */}
        {/* MAIN ROOM SETTINGS                                                 */}
        {/* ================================================================== */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#E4DDD1] bg-white shadow-[0_15px_45px_rgba(24,24,27,0.04)]">
          <div className="border-b border-black/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
              Sleeping arrangements
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Rooms and beds
            </h2>
          </div>

          <div className="divide-y divide-black/[0.07]">
            <RoomCounter
              icon={<DoorOpen size={18} />}
              title="Bedrooms"
              description="Private sleeping rooms"
              value={rooms.bedrooms}
              min={1}
              max={20}
              suffix={
                rooms.bedrooms === 1
                  ? "room"
                  : "rooms"
              }
              onDecrease={() =>
                updateRoom(
                  "bedrooms",
                  rooms.bedrooms - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "bedrooms",
                  rooms.bedrooms + 1,
                )
              }
            />

            <RoomCounter
              icon={<BedDouble size={18} />}
              title="Beds"
              description="Total individual beds"
              value={rooms.beds}
              min={1}
              max={40}
              suffix={
                rooms.beds === 1
                  ? "bed"
                  : "beds"
              }
              onDecrease={() =>
                updateRoom(
                  "beds",
                  rooms.beds - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "beds",
                  rooms.beds + 1,
                )
              }
            />

            <RoomCounter
              icon={<Users size={18} />}
              title="Bathrooms"
              description="Bathrooms available to guests"
              value={rooms.bathrooms}
              min={1}
              max={15}
              suffix={
                rooms.bathrooms === 1
                  ? "bathroom"
                  : "bathrooms"
              }
              onDecrease={() =>
                updateRoom(
                  "bathrooms",
                  rooms.bathrooms - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "bathrooms",
                  rooms.bathrooms + 1,
                )
              }
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* COMMON SPACES                                                       */}
        {/* ================================================================== */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#E4DDD1] bg-white shadow-[0_15px_45px_rgba(24,24,27,0.04)]">
          <div className="border-b border-black/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
              Additional spaces
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Shared and living areas
            </h2>
          </div>

          <div className="divide-y divide-black/[0.07]">
            <RoomCounter
              icon={<Sofa size={18} />}
              title="Living rooms"
              description="Separate living or lounge areas"
              value={rooms.livingRooms}
              min={0}
              max={10}
              suffix={
                rooms.livingRooms === 1
                  ? "room"
                  : "rooms"
              }
              onDecrease={() =>
                updateRoom(
                  "livingRooms",
                  rooms.livingRooms - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "livingRooms",
                  rooms.livingRooms + 1,
                )
              }
            />

            <RoomCounter
              icon={<DoorOpen size={18} />}
              title="Private rooms"
              description="Rooms exclusively accessible to guests"
              value={rooms.privateRooms}
              min={1}
              max={20}
              suffix={
                rooms.privateRooms === 1
                  ? "room"
                  : "rooms"
              }
              onDecrease={() =>
                updateRoom(
                  "privateRooms",
                  rooms.privateRooms - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "privateRooms",
                  rooms.privateRooms + 1,
                )
              }
            />

            <RoomCounter
              icon={<Users size={18} />}
              title="Shared rooms"
              description="Spaces shared with other guests"
              value={rooms.sharedRooms}
              min={0}
              max={20}
              suffix={
                rooms.sharedRooms === 1
                  ? "room"
                  : "rooms"
              }
              onDecrease={() =>
                updateRoom(
                  "sharedRooms",
                  rooms.sharedRooms - 1,
                )
              }
              onIncrease={() =>
                updateRoom(
                  "sharedRooms",
                  rooms.sharedRooms + 1,
                )
              }
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* VALIDATION                                                         */}
        {/* ================================================================== */}

        {rooms.beds < rooms.bedrooms && (
          <section className="mt-5 rounded-2xl border border-[#D9A441] bg-[#FFF9EA] p-4">
            <p className="text-xs font-bold text-[#7C5D17]">
              Add at least one bed for each bedroom.
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[#8B7750]">
              You currently have {rooms.bedrooms}{" "}
              {rooms.bedrooms === 1
                ? "bedroom"
                : "bedrooms"}{" "}
              but only {rooms.beds}{" "}
              {rooms.beds === 1
                ? "bed"
                : "beds"}.
            </p>
          </section>
        )}

        {/* ================================================================== */}
        {/* GUEST-FACING PREVIEW                                               */}
        {/* ================================================================== */}

        <section className="mt-5 rounded-[28px] border border-[#E4DDD1] bg-[#F7F3EB] p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
            Guest preview
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold">
            What guests will see
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            <PreviewPill
              icon={<DoorOpen size={14} />}
              text={`${rooms.bedrooms} ${
                rooms.bedrooms === 1
                  ? "bedroom"
                  : "bedrooms"
              }`}
            />

            <PreviewPill
              icon={<BedDouble size={14} />}
              text={`${rooms.beds} ${
                rooms.beds === 1
                  ? "bed"
                  : "beds"
              }`}
            />

            <PreviewPill
              icon={<Users size={14} />}
              text={`${rooms.bathrooms} ${
                rooms.bathrooms === 1
                  ? "bathroom"
                  : "bathrooms"
              }`}
            />

            {rooms.livingRooms > 0 && (
              <PreviewPill
                icon={<Sofa size={14} />}
                text={`${rooms.livingRooms} living ${
                  rooms.livingRooms === 1
                    ? "room"
                    : "rooms"
                }`}
              />
            )}
          </div>
        </section>

        {/* ================================================================== */}
        {/* INFO                                                               */}
        {/* ================================================================== */}

        <section className="mt-5 flex gap-3 rounded-2xl border border-[#E7DCC4] bg-[#FFF9EA] p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E]">
            <Info size={17} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#51472F]">
              Keep your listing accurate
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#7C7052]">
              The room and bed information should match
              what guests will actually find when they
              arrive at the property.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SAVED                                                              */}
        {/* ================================================================== */}

        <div className="mt-5 flex min-h-5 justify-center">
          {saved && (
            <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#68705A]">
              <Check size={13} />
              Room details saved
            </p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}

      <footer className="sticky bottom-0 z-30 border-t border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/pricing`}
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
              onClick={saveRooms}
              className="hidden rounded-xl border border-[#D8D1C5] bg-white px-5 py-3 text-xs font-bold text-[#403C37] transition hover:border-[#D9A441] sm:inline-flex"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={
                saving || !valid
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

/* ========================================================================== */
/* ROOM COUNTER                                                               */
/* ========================================================================== */

function RoomCounter({
  icon,
  title,
  description,
  value,
  min,
  max,
  suffix,
  onDecrease,
  onIncrease,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
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

/* ========================================================================== */
/* SUMMARY CARD                                                               */
/* ========================================================================== */

function SummaryCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E4DDD1] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF4D8] text-[#9A711E]">
          {icon}
        </div>

        <div>
          <p className="font-serif text-xl font-semibold">
            {value}
          </p>

          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#A8A29E]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* PREVIEW PILL                                                               */
/* ========================================================================== */

function PreviewPill({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#DDD5C8] bg-white px-3 py-2 text-[10px] font-bold text-[#57534E]">
      <span className="text-[#9A711E]">
        {icon}
      </span>

      {text}
    </span>
  );
}