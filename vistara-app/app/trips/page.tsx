"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  Heart,
  MapPin,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "@/components/navbar";

/* =========================================================
   TYPES
========================================================= */

type Place = {
  id: string | number;
  title: string;
  location: string;
  image: string;
  category?: string;
  rating?: number;
};

type Trip = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
};

/* =========================================================
   DEMO DATA
   Existing images are preserved
========================================================= */

const upcomingTrip: Trip = {
  id: "trip-1",
  title: "Varanasi Escape",
  location: "Varanasi, Uttar Pradesh",
  date: "12–15 October 2026",
  image: "/images/temple.jpg",
  description:
    "A thoughtful journey bringing together stays, local places and meaningful experiences.",
};

const recentlyExplored: Place[] = [
  {
    id: 1,
    title: "Patna",
    location: "Bihar, India",
    image: "/images/pag1 (33).jpg",
    category: "Destination",
  },
  {
    id: 2,
    title: "Heritage Bihar",
    location: "Bihar, India",
    image: "/images/pag1 (30).jpg",
    category: "Culture",
  },
  {
    id: 3,
    title: "Riverside Escape",
    location: "Patna, Bihar",
    image: "/images/pag1 (40).jpg",
    category: "Nature",
  },
];

const inspiration: Place[] = [
  {
    id: 4,
    title: "A slower kind of journey.",
    location: "Discover somewhere unexpected",
    image: "/images/pag1 (40).jpg",
  },
  {
    id: 5,
    title: "Places worth remembering.",
    location: "Hidden destinations across India",
    image: "/images/pag1 (30).jpg",
  },
  {
    id: 6,
    title: "Travel beyond the obvious.",
    location: "Meaningful local experiences",
    image: "/images/pag1 (40).jpg",
  },
];

/* =========================================================
   HEADER
========================================================= */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5DED6] bg-[#FAF8F3]/95 backdrop-blur">
      <div className="w-full">
        <Navbar />
      </div>

    </header>
  );
}

/* =========================================================
   JOURNEY ACTION
========================================================= */

function JourneyAction({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#E5DED6] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#B76545] hover:shadow-[0_14px_35px_rgba(44,36,32,0.08)]"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8DED0] text-[#B76545]">
        {icon}
      </div>

      <h3 className="font-serif text-xl font-bold text-[#2C2420]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#756D67]">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#B76545]">
        Start
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

/* =========================================================
   PLACE CARD
========================================================= */

function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      href={`/explore/${place.id}`}
      className="group block overflow-hidden rounded-[24px] border border-[#E5DED6] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(44,36,32,0.10)]"
    >
      <div className="relative h-[230px] overflow-hidden">
        <img
          src={place.image}
          alt={place.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-[#FAF8F3]/95 px-3 py-1.5 text-xs font-semibold text-[#2C2420]">
          {place.category || "Destination"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-2xl font-bold text-[#2C2420]">
          {place.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-[#756D67]">
          <MapPin size={15} />
          {place.location}
        </div>

        {place.rating && (
          <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#B8945A]">
            <Star size={15} fill="currentColor" />
            {place.rating}
          </div>
        )}
      </div>
    </Link>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="border-t border-[#E5DED6] bg-[#FAF8F3]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#2C2420]">
              Vistara
            </h2>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#756D67]">
              Discover unique stays, hidden destinations and meaningful
              experiences across India.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B76545]"
            >
              Begin your journey
              <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            <h3 className="font-semibold text-[#2C2420]">Discover</h3>

            <div className="mt-5 space-y-4 text-sm text-[#756D67]">
              <Link className="block hover:text-[#B76545]" href="/stays">
                Stays
              </Link>

              <Link className="block hover:text-[#B76545]" href="/explore">
                Places
              </Link>

              <Link
                className="block hover:text-[#B76545]"
                href="/experiences"
              >
                Experiences
              </Link>

              <Link className="block hover:text-[#B76545]" href="/trips">
                Trips
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#2C2420]">For guests</h3>

            <div className="mt-5 space-y-4 text-sm text-[#756D67]">
              <Link className="block hover:text-[#B76545]" href="/wishlist">
                Wishlist
              </Link>

              <Link className="block hover:text-[#B76545]" href="/bookings">
                My bookings
              </Link>

              <Link className="block hover:text-[#B76545]" href="/help">
                Help Centre
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#2C2420]">Vistara</h3>

            <div className="mt-5 space-y-4 text-sm text-[#756D67]">
              <Link className="block hover:text-[#B76545]" href="/about">
                About Vistara
              </Link>

              <Link className="block hover:text-[#B76545]" href="/privacy">
                Privacy
              </Link>

              <Link className="block hover:text-[#B76545]" href="/terms">
                Terms
              </Link>

              <Link className="block hover:text-[#B76545]" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#E5DED6] pt-7 text-sm text-[#756D67] sm:flex-row">
          <p>© 2026 Vistara. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#B76545]">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-[#B76545]">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-[#B76545]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function TripsPage() {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

  /*
    Reads wishlist data if your wishlist stores it in localStorage.
    It also safely handles an empty wishlist.
  */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vistara-wishlist");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setSavedPlaces(parsed);
        }
      }
    } catch {
      setSavedPlaces([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#B76545]">
                Your trips
              </p>

              <h1 className="font-serif text-5xl font-bold leading-[1.02] tracking-tight text-[#2C2420] sm:text-6xl lg:text-7xl">
                Plan your
                <br />
                soothing trip.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#756D67] sm:text-lg">
                Bring your stays, places and experiences together in one
                thoughtful travel space.
              </p>
            </div>

            <Link
              href="/trips/new"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#B76545] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#965039]"
            >
              <Plus size={18} />
              Create a trip
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEXT JOURNEY
      ===================================================== */}

      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
            Already planned
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#2C2420] sm:text-5xl">
            Your next journey
          </h2>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-[#E5DED6] bg-white shadow-[0_15px_50px_rgba(44,36,32,0.07)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Image */}
            <div className="relative min-h-[300px] lg:min-h-[500px]">
              <img
                src={upcomingTrip.image}
                alt={upcomingTrip.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 rounded-full bg-[#FAF8F3]/95 px-4 py-2 text-sm font-semibold text-[#2C2420]">
                Upcoming journey
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#B76545]">
                <CalendarDays size={17} />
                {upcomingTrip.date}
              </div>

              <h3 className="mt-5 font-serif text-4xl font-bold leading-tight text-[#2C2420] sm:text-5xl">
                {upcomingTrip.title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-[#756D67]">
                <MapPin size={17} />
                {upcomingTrip.location}
              </div>

              <p className="mt-6 max-w-xl leading-7 text-[#756D67]">
                {upcomingTrip.description}
              </p>

              {/* Trip actions INSIDE existing journey */}
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <JourneyAction
                  icon={<MapPin size={20} />}
                  title="Find a stay"
                  description="Discover verified homes and villas."
                  href="/stays"
                />

                <JourneyAction
                  icon={<Sparkles size={20} />}
                  title="Experiences"
                  description="Add meaningful things to your trip."
                  href="/experiences"
                />

                <JourneyAction
                  icon={<Compass size={20} />}
                  title="Places"
                  description="Keep interesting destinations nearby."
                  href="/explore"
                />
              </div>

              <div className="mt-8">
                <Link
                  href="/trips/new"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B76545] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#965039]"
                >
                  View trip
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTINUE PLANNING
      ===================================================== */}

      <section className="border-y border-[#E5DED6] bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
                Recently explored
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#2C2420] sm:text-5xl">
                Continue planning.
              </h2>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B76545]"
            >
              View destinations
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {recentlyExplored.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SAVED / WISHLIST
      ===================================================== */}

      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              Saved for later
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#2C2420] sm:text-5xl">
              Places you want to remember.
            </h2>
          </div>

          <Link
            href="/wishlist"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B76545]"
          >
            View wishlist
            <ArrowRight size={16} />
          </Link>
        </div>

        {savedPlaces.length > 0 ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {savedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="mt-9 flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#E5DED6] bg-[#E8DED0]/35 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#B76545] shadow-sm">
              <Heart size={25} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#2C2420]">
              Nothing saved yet.
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#756D67]">
              Save stays and places you love and they will appear here when
              you are ready to plan.
            </p>

            <Link
              href="/wishlist"
              className="mt-6 text-sm font-semibold text-[#B76545]"
            >
              View wishlist →
            </Link>
          </div>
        )}
      </section>

      {/* =====================================================
          INSPIRATION
      ===================================================== */}

      <section className="bg-[#2C2420] text-[#FAF8F3]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8945A]">
                Inspiration
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Maybe your next story starts somewhere unexpected.
              </h2>
            </div>

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FAF8F3] px-6 py-3.5 text-sm font-semibold text-[#2C2420] transition hover:bg-[#E8DED0]"
            >
              Discover places
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {inspiration.map((place) => (
              <Link
                href={`/explore/${place.id}`}
                key={place.id}
                className="group overflow-hidden rounded-[24px] bg-[#FAF8F3]"
              >
                <div className="h-[250px] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-2xl font-bold text-[#2C2420]">
                    {place.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#756D67]">
                    {place.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}