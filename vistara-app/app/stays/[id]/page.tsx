"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

// IMPORTANT:
// Agar tumhara Navbar kisi aur path par hai,
// sirf ye import path change kar dena.
import Navbar from "@/components/navbar";

// Apne existing stays data ko yahan se import karo
import { stays } from "@/data/stay";

export default function StayDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const stay = useMemo(() => {
    return stays.find((item) => item.id === id);
  }, [id]);

  if (!stay) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#FAF9F6] px-6 py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#9A722F]">
              Vistara Stays
            </p>

            <h1 className="font-serif text-5xl font-bold text-[#171614]">
              Stay not found
            </h1>

            <p className="mt-5 text-[#64748B]">
              The stay you are looking for does not exist.
            </p>

            <button
              onClick={() => router.push("/stays")}
              className="mt-8 rounded-full bg-[#171614] px-7 py-3 font-semibold text-white transition hover:bg-[#03045E]"
            >
              Back to stays
            </button>
          </div>
        </main>
      </>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    stay.location
  )}&output=embed`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171614]">
      {/* NAVBAR */}
      <Navbar />

      <main>
        {/* BACK BUTTON */}
        <div className="mx-auto max-w-[1450px] px-6 pt-8 lg:px-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            <ChevronLeft size={18} />
            Back to stays
          </button>
        </div>

        {/* IMAGE + BASIC INFO */}
        <section className="mx-auto max-w-[1450px] px-6 pb-12 pt-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.55fr_0.75fr]">
            {/* IMAGE */}
            <div className="overflow-hidden rounded-[28px] border border-[#E5E0D8] bg-white">
              <div className="relative h-[430px] w-full overflow-hidden lg:h-[560px]">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-6 top-6 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#171614] shadow-sm">
                  Vistara Stay
                </div>

                <button
                  type="button"
                  className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-5 p-7 lg:p-9">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#9A722F]">
                      Vistara Stays
                    </p>

                    <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[#171614] lg:text-5xl">
                      {stay.title}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-[#64748B]">
                      <MapPin size={18} />
                      <span>{stay.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-[#F3EEE5] px-4 py-2 font-semibold">
                    <Star
                      size={17}
                      fill="currentColor"
                      className="text-[#9A722F]"
                    />
                    <span>{stay.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RESERVATION CARD */}
            <aside className="lg:pt-0">
              <div className="sticky top-[105px] rounded-[28px] border border-[#E3DED5] bg-white p-7 shadow-[0_20px_60px_rgba(23,22,20,0.07)] lg:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="font-serif text-4xl font-bold text-[#171614]">
                      ₹{stay.price.toLocaleString("en-IN")}
                    </span>
                    <span className="ml-2 text-[#64748B]">/ night</span>
                  </div>

                  <div className="flex items-center gap-1 font-semibold">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-[#9A722F]"
                    />
                    {stay.rating}
                  </div>
                </div>

                <div className="my-7 border-t border-[#E8E3DB]" />

                {/* DATES */}
                <div className="grid overflow-hidden rounded-2xl border border-[#DDD8D0] sm:grid-cols-2">
                  <div className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7A756D]">
                      Check in
                    </p>

                    <div className="mt-3 flex items-center gap-2 font-semibold">
                      <CalendarDays size={18} />
                      Add date
                    </div>
                  </div>

                  <div className="border-t border-[#DDD8D0] p-5 sm:border-l sm:border-t-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7A756D]">
                      Check out
                    </p>

                    <div className="mt-3 flex items-center gap-2 font-semibold">
                      <CalendarDays size={18} />
                      Add date
                    </div>
                  </div>
                </div>

                {/* GUESTS */}
                <div className="mt-4 rounded-2xl border border-[#DDD8D0] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7A756D]">
                    Guests
                  </p>

                  <div className="mt-3 flex items-center gap-3 font-semibold">
                    <Users size={19} />
                    Up to {stay.guests} guests
                  </div>
                </div>

                {/* ORDER PAGE CONNECTION */}
                <button
                  type="button"
                  onClick={() => router.push(`/orders/${stay.id}`)}
                  className="mt-5 w-full rounded-2xl bg-[#171614] px-6 py-4 text-base font-bold text-white transition hover:bg-[#03045E]"
                >
                  Reserve this stay
                </button>

                <p className="mt-4 text-center text-sm text-[#7A756D]">
                  You won't be charged until you confirm your booking.
                </p>

                <div className="my-6 border-t border-[#E8E3DB]" />

                <div className="flex justify-between text-sm">
                  <span>
                    ₹{stay.price.toLocaleString("en-IN")} × 1 night
                  </span>

                  <span className="font-semibold">
                    ₹{stay.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-5 flex justify-between border-t border-[#E8E3DB] pt-5">
                  <span className="font-semibold">Total</span>

                  <span className="font-serif text-2xl font-bold">
                    ₹{stay.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* INFORMATION */}
        <section className="border-y border-[#E5E0D8] bg-white">
          <div className="mx-auto max-w-[1450px] px-6 py-16 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A722F]">
                  The stay
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold">
                  What this place offers
                </h2>

                <div className="mt-10 grid gap-7 sm:grid-cols-2">
                  <Feature
                    icon={<ShieldCheck size={21} />}
                    title="Verified property"
                    text="Verified by Vistara"
                  />

                  <Feature
                    icon={<Users size={21} />}
                    title={`${stay.guests} guests`}
                    text="Comfortable capacity"
                  />

                  <Feature
                    icon={<MapPin size={21} />}
                    title="Great location"
                    text={stay.location}
                  />

                  <Feature
                    icon={
                      <Star
                        size={21}
                        fill="currentColor"
                      />
                    }
                    title={`${stay.rating} rating`}
                    text="Guest reviewed"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A722F]">
                  About
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold">
                  A place made for your journey.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748B]">
                  Stay somewhere comfortable, verified and thoughtfully
                  selected for meaningful journeys. This Vistara stay is
                  located in {stay.location}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="mx-auto max-w-[1450px] px-6 py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A722F]">
                Location
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold">
                Where you'll stay
              </h2>

              <div className="mt-7 rounded-2xl border border-[#E3DED5] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3EEE5]">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-[#171614]">
                      {stay.location}
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {stay.city}, {stay.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REAL MAP */}
            <div className="h-[380px] overflow-hidden rounded-[28px] border border-[#E3DED5] bg-[#EEEAE2]">
              <iframe
                title={`Map showing ${stay.location}`}
                src={mapUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#171614]">
          <div className="mx-auto max-w-[1450px] px-6 py-16 text-center lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A45B]">
              Ready for your journey?
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold text-white lg:text-5xl">
              Make this stay part of your next journey.
            </h2>

            <button
              onClick={() => router.push(`/orders/${stay.id}`)}
              className="mt-8 rounded-full bg-white px-8 py-4 font-bold text-[#171614] transition hover:bg-[#F3EEE5]"
            >
              Reserve {stay.title}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3EEE5]">
        {icon}
      </div>

      <div>
        <p className="font-semibold text-[#171614]">{title}</p>
        <p className="mt-1 text-sm text-[#64748B]">{text}</p>
      </div>
    </div>
  );
}