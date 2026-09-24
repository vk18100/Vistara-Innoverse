"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

type TripType = "discovery" | "custom" | "full_day";

type Guide = {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  image: string;
};

const tripOptions = [
  {
    id: "discovery" as TripType,
    title: "Local Discovery",
    description:
      "Let your guide take you through hidden places, local streets, culture and stories.",
    duration: "2–4 hours",
    icon: "✦",
    features: [
      "Hidden local places",
      "Local stories & culture",
      "Flexible stops",
    ],
  },
  {
    id: "custom" as TripType,
    title: "Custom Route",
    description:
      "Tell your guide where you want to go and create your own local route.",
    duration: "Flexible",
    icon: "⌁",
    features: [
      "Choose your places",
      "Build your own route",
      "Guide travels with you",
    ],
  },
  {
    id: "full_day" as TripType,
    title: "Full Local Day",
    description:
      "Spend the day with a local guide and explore the destination at your own pace.",
    duration: "8 hours",
    icon: "◌",
    features: [
      "Full-day guide",
      "Multiple locations",
      "Personalized experience",
    ],
  },
];

export default function BookGuidePage() {
  const params = useParams();
  const guideId = params.id as string;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);

  const [tripType, setTripType] =
    useState<TripType>("discovery");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [guests, setGuests] = useState(2);
  const [hours, setHours] = useState(3);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadGuide() {
      try {
        const response = await fetch(`/api/guides/${guideId}`);

        if (!response.ok) {
          throw new Error("Guide not found");
        }

        const result = await response.json();
        setGuide(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [guideId]);

  const selectedTrip = tripOptions.find(
    (trip) => trip.id === tripType
  );

  const calculatedHours =
    tripType === "full_day"
      ? 8
      : tripType === "discovery"
        ? hours
        : hours;

  const total = useMemo(() => {
    if (!guide) return 0;

    return guide.pricePerHour * calculatedHours;
  }, [guide, calculatedHours]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="h-6 w-32 animate-pulse rounded bg-[#F5F7FF]" />

          <div className="mt-8 h-[600px] animate-pulse rounded-[30px] bg-[#F5F7FF]" />
        </div>
      </main>
    );
  }

  if (!guide) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-serif text-4xl font-semibold">
            Guide not found
          </h1>

          <Link
            href="/guides"
            className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white"
          >
            Back to Guides
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <Link
            href={`/guides/${guide.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            <ArrowLeft size={17} />
            Back to {guide.name}
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
              BOOK A LOCAL EXPERIENCE
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              Plan your local journey
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Choose how you want to explore {guide.location}
              with {guide.name}.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-7">
            {/* TRIP TYPES */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                  STEP 1
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Choose your local trip
                </h2>

                <p className="mt-2 text-sm text-[#64748B]">
                  Pick the experience that fits your journey.
                </p>
              </div>

              <div className="mt-7 space-y-4">
                {tripOptions.map((option) => {
                  const active = tripType === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTripType(option.id)}
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-[#03045E] bg-[#F5F7FF] ring-1 ring-[#03045E]"
                          : "border-[#03045E]/10 hover:border-[#03045E]/30"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                            active
                              ? "bg-[#03045E] text-white"
                              : "bg-[#F5F7FF] text-[#03045E]"
                          }`}
                        >
                          {option.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">
                                {option.title}
                              </h3>

                              <p className="mt-1 text-xs font-medium text-[#0D21A1]">
                                {option.duration}
                              </p>
                            </div>

                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                active
                                  ? "border-[#03045E] bg-[#03045E] text-white"
                                  : "border-[#CBD5E1]"
                              }`}
                            >
                              {active && <Check size={14} />}
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-[#64748B]">
                            {option.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {option.features.map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full bg-white px-3 py-1.5 text-xs text-[#64748B]"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DATE & TIME */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                STEP 2
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                When are you exploring?
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Date
                  </span>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-[#03045E]/15 bg-white px-11 py-3.5 text-sm outline-none focus:border-[#03045E]"
                    />
                  </div>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Start time
                  </span>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />

                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-[#03045E]/15 bg-white px-11 py-3.5 text-sm outline-none focus:border-[#03045E]"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* DETAILS */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                STEP 3
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Journey details
              </h2>

              {/* GUESTS */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold">
                  Guests
                </label>

                <div className="flex items-center justify-between rounded-xl border border-[#03045E]/15 p-3">
                  <div className="flex items-center gap-3">
                    <Users size={18} />

                    <span className="text-sm">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setGuests(Math.max(1, guests - 1))
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={() => setGuests(guests + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* HOURS */}
              {tripType !== "full_day" && (
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold">
                    Duration
                  </label>

                  <select
                    value={hours}
                    onChange={(e) =>
                      setHours(Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                  >
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={5}>5 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={8}>8 hours</option>
                  </select>
                </div>
              )}

              {/* CUSTOM ROUTE */}
              {tripType === "custom" && (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-semibold">
                      Starting point
                    </span>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                      <input
                        value={pickup}
                        onChange={(e) =>
                          setPickup(e.target.value)
                        }
                        placeholder="Where should we start?"
                        className="w-full rounded-xl border border-[#03045E]/15 px-11 py-3.5 text-sm outline-none focus:border-[#03045E]"
                      />
                    </div>
                  </label>

                  <label>
                    <span className="mb-2 block text-sm font-semibold">
                      Places / destination
                    </span>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                      />

                      <input
                        value={destination}
                        onChange={(e) =>
                          setDestination(e.target.value)
                        }
                        placeholder="Where do you want to go?"
                        className="w-full rounded-xl border border-[#03045E]/15 px-11 py-3.5 text-sm outline-none focus:border-[#03045E]"
                      />
                    </div>
                  </label>
                </div>
              )}

              {/* NOTES */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold">
                  Anything you want your guide to know?
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Food preferences, places you want to see, accessibility needs..."
                  className="w-full resize-none rounded-xl border border-[#03045E]/15 px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <aside>
            <div className="sticky top-6 rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.07)]">
              <div className="flex items-center gap-4">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8]">
                    YOUR GUIDE
                  </p>

                  <h3 className="mt-1 font-serif text-xl font-semibold">
                    {guide.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#64748B]">
                    {guide.location}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-[#03045E]/10" />

              <p className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
                YOUR EXPERIENCE
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                {selectedTrip?.title}
              </h2>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  icon={<CalendarDays size={16} />}
                  label="Date"
                  value={date || "Select a date"}
                />

                <SummaryRow
                  icon={<Clock3 size={16} />}
                  label="Start"
                  value={time}
                />

                <SummaryRow
                  icon={<Clock3 size={16} />}
                  label="Duration"
                  value={`${calculatedHours} hours`}
                />

                <SummaryRow
                  icon={<Users size={16} />}
                  label="Guests"
                  value={`${guests}`}
                />
              </div>

              <div className="my-6 border-t border-[#03045E]/10" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#94A3B8]">
                    Estimated total
                  </p>

                  <p className="mt-1 text-3xl font-semibold">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>

                <p className="text-xs text-[#94A3B8]">
                  ₹{guide.pricePerHour.toLocaleString("en-IN")}
                  /hr
                </p>
              </div>

              <button
                type="button"
                disabled={!date}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => {
                  console.log({
                    guideId,
                    tripType,
                    date,
                    time,
                    guests,
                    hours: calculatedHours,
                    pickup,
                    destination,
                    notes,
                    total,
                  });
                }}
              >
                Continue to Confirm
                <ArrowRight size={17} />
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-[#94A3B8]">
                Final booking confirmation will happen on the
                next step.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F7FF] text-[#0D21A1]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-[#94A3B8]">{label}</p>

        <p className="mt-0.5 text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}