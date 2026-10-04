"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const trips = [
  {
    id: "varanasi-escape",
    title: "Varanasi Escape",
    location: "Varanasi, Uttar Pradesh",
    dates: "12–15 October",
    nights: "3 nights",
    guests: "2 guests",
    image: "/images/temple.jpg",
    description:
      "A slow and meaningful journey through Varanasi — from riverside mornings and heritage lanes to local food and peaceful evenings by the Ganga.",
    stay: {
      title: "Riverside Heritage Stay",
      image: "/images/pag1 (2).jpg",
      location: "Assi Ghat, Varanasi",
      price: 2800,
    },
    experience: {
      title: "Ganga Sunrise & Ghat Walk",
      image: "/images/pag1 (3).jpg",
      duration: "2–3 hours",
      price: 499,
    },
    places: [
      "Assi Ghat",
      "Dashashwamedh Ghat",
      "Old City",
      "Kashi Vishwanath",
    ],
    food: [
      "Kachori Sabzi",
      "Banarasi Chaat",
      "Lassi",
      "Banarasi Paan",
    ],
    highlights: [
      "Riverside mornings",
      "Local food discoveries",
      "Heritage walks",
      "Evening Ganga experience",
    ],
  },
];

export default function TripDetailsPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const trip = useMemo(
    () => trips.find((item) => item.id === id) || trips[0],
    [id]
  );

  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: trip.title,
          text: trip.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 1800);
      }
    } catch {
      // User cancelled share.
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">

      {/* TOP NAV */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 lg:px-10">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 rounded-full border border-[#E5DED6] bg-white px-4 py-2.5 text-sm font-semibold text-[#756D67] transition hover:border-[#B76545] hover:text-[#B76545]"
        >
          <ArrowLeft size={16} />
          Back to trips
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label="Save trip"
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white transition ${
              saved
                ? "border-[#B76545] text-[#B76545]"
                : "border-[#E5DED6] text-[#756D67] hover:border-[#B76545] hover:text-[#B76545]"
            }`}
          >
            <Heart
              size={18}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share trip"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DED6] bg-white text-[#756D67] transition hover:border-[#B76545] hover:text-[#B76545]"
          >
            {shared ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8 lg:px-10 lg:pb-14">

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_12px_45px_rgba(44,36,32,0.08)]">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* IMAGE */}
            <div className="relative h-[330px] overflow-hidden sm:h-[440px] lg:h-[560px]">

              <img
                src={trip.image}
                alt={trip.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B76545] backdrop-blur">
                  Your journey
                </span>
              </div>
            </div>

            {/* HERO INFO */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
                Planned escape
              </p>

              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
                {trip.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-[#756D67]">
                <MapPin size={17} className="text-[#B76545]" />
                <span>{trip.location}</span>
              </div>

              <p className="mt-6 text-base leading-7 text-[#756D67] sm:text-lg">
                {trip.description}
              </p>

              {/* TRIP META */}
              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-[#E8DED0]/50 p-4">
                  <CalendarDays
                    size={18}
                    className="text-[#B76545]"
                  />

                  <p className="mt-3 text-xs uppercase tracking-wide text-[#756D67]">
                    Dates
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {trip.dates}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E8DED0]/50 p-4">
                  <Clock3
                    size={18}
                    className="text-[#B76545]"
                  />

                  <p className="mt-3 text-xs uppercase tracking-wide text-[#756D67]">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {trip.nights}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E8DED0]/50 p-4">
                  <Users
                    size={18}
                    className="text-[#B76545]"
                  />

                  <p className="mt-3 text-xs uppercase tracking-wide text-[#756D67]">
                    Travellers
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {trip.guests}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#E8DED0]/50 p-4">
                  <Sparkles
                    size={18}
                    className="text-[#B76545]"
                  />

                  <p className="mt-3 text-xs uppercase tracking-wide text-[#756D67]">
                    Journey
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    Curated
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_350px] lg:px-10">

        {/* LEFT */}
        <div className="space-y-8">

          {/* JOURNEY */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 sm:p-8">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                Journey
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold">
                Your trip, thoughtfully planned.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756D67]">
                Everything you have planned for this journey, from your stay
                to the places and experiences you want to discover.
              </p>
            </div>

            <div className="mt-8 space-y-4">

              {/* STAY */}
              <div className="group flex flex-col gap-4 rounded-2xl border border-[#E5DED6] p-4 transition hover:border-[#B76545] sm:flex-row">

                <img
                  src={trip.stay.image}
                  alt={trip.stay.title}
                  className="h-44 w-full rounded-xl object-cover sm:h-28 sm:w-36"
                />

                <div className="flex flex-1 flex-col justify-center">

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#B76545]">
                      Stay
                    </span>

                    <ChevronRight
                      size={18}
                      className="text-[#756D67] transition group-hover:translate-x-1 group-hover:text-[#B76545]"
                    />
                  </div>

                  <h3 className="mt-2 text-xl font-bold">
                    {trip.stay.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#756D67]">
                    📍 {trip.stay.location}
                  </p>

                  <p className="mt-3 text-sm font-semibold">
                    ₹{trip.stay.price.toLocaleString("en-IN")}
                    <span className="ml-1 font-normal text-[#756D67]">
                      / night
                    </span>
                  </p>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="group flex flex-col gap-4 rounded-2xl border border-[#E5DED6] p-4 transition hover:border-[#B76545] sm:flex-row">

                <img
                  src={trip.experience.image}
                  alt={trip.experience.title}
                  className="h-44 w-full rounded-xl object-cover sm:h-28 sm:w-36"
                />

                <div className="flex flex-1 flex-col justify-center">

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#B76545]">
                      Experience
                    </span>

                    <ChevronRight
                      size={18}
                      className="text-[#756D67] transition group-hover:translate-x-1 group-hover:text-[#B76545]"
                    />
                  </div>

                  <h3 className="mt-2 text-xl font-bold">
                    {trip.experience.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#756D67]">
                    {trip.experience.duration}
                  </p>

                  <p className="mt-3 text-sm font-semibold">
                    ₹{trip.experience.price}
                    <span className="ml-1 font-normal text-[#756D67]">
                      / person
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* PLACES */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 sm:p-8">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              Places
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              Places along the way.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {trip.places.map((place, index) => (
                <div
                  key={place}
                  className="flex items-center gap-4 rounded-2xl bg-[#FAF8F3] p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B76545] text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <span className="font-semibold">
                    {place}
                  </span>
                </div>
              ))}

            </div>
          </section>

          {/* FOOD */}
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-6 sm:p-8">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              Taste of the place
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              Food to try.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {trip.food.map((food) => (
                <div
                  key={food}
                  className="flex items-center gap-3 rounded-2xl border border-[#E5DED6] p-4"
                >
                  <span className="text-lg">✦</span>
                  <span className="font-semibold">
                    {food}
                  </span>
                </div>
              ))}

            </div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="rounded-[28px] bg-[#E8DED0]/55 p-6 sm:p-8">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              What makes it special
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              A little more than a trip.
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              {trip.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B76545] text-white">
                    <Check size={15} />
                  </span>

                  <span className="font-semibold">
                    {highlight}
                  </span>
                </div>
              ))}

            </div>
          </section>

        </div>

        {/* RIGHT BOOKING / SUMMARY */}
    <aside className="lg:sticky lg:top-6 lg:h-fit">

  <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_35px_rgba(44,36,32,0.06)] sm:p-7">

    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
      Trip summary
    </p>

    <h3 className="mt-3 font-serif text-2xl font-bold">
      {trip.title}
    </h3>

    <div className="mt-5 space-y-4">

      <div className="flex items-start gap-3">
        <CalendarDays
          size={18}
          className="mt-0.5 text-[#B76545]"
        />

        <div>
          <p className="text-xs text-[#756D67]">
            Dates
          </p>

          <p className="mt-1 text-sm font-semibold">
            {trip.dates}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin
          size={18}
          className="mt-0.5 text-[#B76545]"
        />

        <div>
          <p className="text-xs text-[#756D67]">
            Destination
          </p>

          <p className="mt-1 text-sm font-semibold">
            {trip.location}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Users
          size={18}
          className="mt-0.5 text-[#B76545]"
        />

        <div>
          <p className="text-xs text-[#756D67]">
            Travellers
          </p>

          <p className="mt-1 text-sm font-semibold">
            {trip.guests}
          </p>
        </div>
      </div>

    </div>

    <div className="my-6 border-t border-[#E5DED6]" />

    <div className="flex items-center justify-between">

      <span className="text-sm text-[#756D67]">
        Trip status
      </span>

      <span className="rounded-full bg-[#E8DED0] px-3 py-1.5 text-xs font-bold text-[#965039]">
        Planned
      </span>

    </div>

    <Link
      href={`/orders/${trip.id}`}
      className="mt-7 flex w-full items-center justify-center rounded-full bg-[#B76545] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#965039] active:scale-[0.98]"
    >
      Book this trip
    </Link>

    <p className="mt-4 text-center text-xs leading-5 text-[#756D67]">
      You can update your stay, experiences and places anytime.
    </p>

  </div>

  {/* RATING */}
  <div className="mt-4 rounded-[24px] border border-[#E5DED6] bg-white p-5">

    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          fill="#B8945A"
          className="text-[#B8945A]"
        />
      ))}
    </div>

    <p className="mt-3 text-sm leading-6 text-[#756D67]">
      Curated around the places, food and experiences you want to
      discover.
    </p>

  </div>

</aside>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#E5DED6] bg-[#2C2420] text-white">

        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10 lg:py-20">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6BFA7]">
            Your journey is waiting
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Make the next few days worth remembering.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Refine your stay, discover something local and shape the journey
            around you.
          </p>

          <Link
            href="/trips"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#2C2420] transition hover:bg-[#E8DED0]"
          >
            Back to my trips
          </Link>

        </div>

      </section>

    </main>
  );
}