"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Plus,
  Minus,
  UserRound,
  MoreHorizontal,
} from "lucide-react";

import PropCard from "@/components/cards/properCard";
import Navbar from "@/components/navbar";
type Stay = {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  guests: number;
  verified: boolean;
};

/* =========================================================
   30 STAYS
========================================================= */

const stays: Stay[] = [
  {
    id: "blue-courtyard",
    title: "The Blue Courtyard",
    location: "Kankarbagh, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (80).jpg",
    price: 2800,
    currency: "INR",
    rating: 4.8,
    guests: 4,
    verified: true,
  },
  {
    id: "patna-heritage-stay",
    title: "Patna Heritage Stay",
    location: "Rajendra Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (28).jpg",
    price: 2200,
    currency: "INR",
    rating: 4.7,
    guests: 3,
    verified: true,
  },
  {
    id: "ganga-view-retreat",
    title: "Ganga View Retreat",
    location: "Gandhi Ghat, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (29).jpg",
    price: 3500,
    currency: "INR",
    rating: 4.9,
    guests: 6,
    verified: true,
  },
  {
    id: "garden-house",
    title: "The Garden House",
    location: "Boring Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (35).jpg",
    price: 1900,
    currency: "INR",
    rating: 4.6,
    guests: 2,
    verified: true,
  },
  {
    id: "modern-patna-residence",
    title: "Modern Patna Residence",
    location: "Bailey Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (66).jpg",
    price: 2500,
    currency: "INR",
    rating: 4.7,
    guests: 4,
    verified: true,
  },
  {
    id: "quiet-riverside-home",
    title: "Quiet Riverside Home",
    location: "Gandhi Ghat, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (67).jpg",
    price: 3100,
    currency: "INR",
    rating: 4.8,
    guests: 5,
    verified: true,
  },
  {
    id: "royal-patna-villa",
    title: "Royal Patna Villa",
    location: "Patliputra Colony, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (85).jpg",
    price: 4200,
    currency: "INR",
    rating: 4.9,
    guests: 8,
    verified: true,
  },
  {
    id: "terrace-garden-stay",
    title: "Terrace Garden Stay",
    location: "Anisabad, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (86).jpg",
    price: 2300,
    currency: "INR",
    rating: 4.5,
    guests: 3,
    verified: true,
  },
  {
    id: "sunset-suite",
    title: "Sunset Suite",
    location: "Fraser Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (70).jpg",
    price: 2900,
    currency: "INR",
    rating: 4.7,
    guests: 4,
    verified: true,
  },
  {
    id: "old-city-home",
    title: "Old City Home",
    location: "Patna City, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (71).jpg",
    price: 1800,
    currency: "INR",
    rating: 4.4,
    guests: 2,
    verified: true,
  },
  {
    id: "green-leaf-villa",
    title: "Green Leaf Villa",
    location: "Digha, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (82).jpg",
    price: 3900,
    currency: "INR",
    rating: 4.8,
    guests: 7,
    verified: true,
  },
  {
    id: "serene-studio",
    title: "Serene Studio",
    location: "Rajeev Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (30).jpg",
    price: 1700,
    currency: "INR",
    rating: 4.5,
    guests: 2,
    verified: true,
  },
  {
    id: "urban-blue-home",
    title: "Urban Blue Home",
    location: "Boring Canal Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (43).jpg",
    price: 2600,
    currency: "INR",
    rating: 4.6,
    guests: 4,
    verified: true,
  },
  {
    id: "heritage-courtyard",
    title: "Heritage Courtyard",
    location: "Ashiana Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (85).jpg",
    price: 3200,
    currency: "INR",
    rating: 4.8,
    guests: 5,
    verified: true,
  },
  {
    id: "riverside-suite",
    title: "Riverside Suite",
    location: "Rajendra Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (68).jpg",
    price: 3400,
    currency: "INR",
    rating: 4.9,
    guests: 5,
    verified: true,
  },
  {
    id: "minimalist-stay",
    title: "Minimalist Stay",
    location: "Kankarbagh, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (77).jpg",
    price: 2100,
    currency: "INR",
    rating: 4.6,
    guests: 3,
    verified: true,
  },
  {
    id: "palatial-residence",
    title: "Palatial Residence",
    location: "Patliputra Colony, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (78).jpg",
    price: 4800,
    currency: "INR",
    rating: 4.9,
    guests: 10,
    verified: true,
  },
  {
    id: "cozy-corner",
    title: "Cozy Corner",
    location: "Boring Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (79).jpg",
    price: 1600,
    currency: "INR",
    rating: 4.3,
    guests: 2,
    verified: true,
  },
  {
    id: "lotus-garden-home",
    title: "Lotus Garden Home",
    location: "Digha, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (80).jpg",
    price: 2700,
    currency: "INR",
    rating: 4.7,
    guests: 4,
    verified: true,
  },
  {
    id: "the-patna-loft",
    title: "The Patna Loft",
    location: "Fraser Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (81).jpg",
    price: 3000,
    currency: "INR",
    rating: 4.6,
    guests: 3,
    verified: true,
  },
  {
    id: "blue-lotus-retreat",
    title: "Blue Lotus Retreat",
    location: "Bailey Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (82).jpg",
    price: 3600,
    currency: "INR",
    rating: 4.8,
    guests: 6,
    verified: true,
  },
  {
    id: "peaceful-nest",
    title: "Peaceful Nest",
    location: "Rajeev Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (83).jpg",
    price: 2000,
    currency: "INR",
    rating: 4.5,
    guests: 3,
    verified: true,
  },
  {
    id: "sunrise-villa",
    title: "Sunrise Villa",
    location: "Kankarbagh, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (84).jpg",
    price: 4100,
    currency: "INR",
    rating: 4.9,
    guests: 8,
    verified: true,
  },
  {
    id: "the-white-house",
    title: "The White House Stay",
    location: "Boring Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (85).jpg",
    price: 2800,
    currency: "INR",
    rating: 4.7,
    guests: 4,
    verified: true,
  },
  {
    id: "ganga-breeze-home",
    title: "Ganga Breeze Home",
    location: "Gandhi Ghat, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (86).jpg",
    price: 3300,
    currency: "INR",
    rating: 4.8,
    guests: 5,
    verified: true,
  },
  {
    id: "city-lights-apartment",
    title: "City Lights Apartment",
    location: "Fraser Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (87).jpg",
    price: 2400,
    currency: "INR",
    rating: 4.6,
    guests: 3,
    verified: true,
  },
  {
    id: "heritage-blue-house",
    title: "Heritage Blue House",
    location: "Patna City, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (88).jpg",
    price: 2900,
    currency: "INR",
    rating: 4.7,
    guests: 4,
    verified: true,
  },
  {
    id: "royal-garden-retreat",
    title: "Royal Garden Retreat",
    location: "Ashiana Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (89).jpg",
    price: 3800,
    currency: "INR",
    rating: 4.9,
    guests: 7,
    verified: true,
  },
  {
    id: "quiet-city-stay",
    title: "Quiet City Stay",
    location: "Anisabad, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (90).jpg",
    price: 1900,
    currency: "INR",
    rating: 4.5,
    guests: 2,
    verified: true,
  },
  {
    id: "vistara-signature-villa",
    title: "Vistara Signature Villa",
    location: "Patliputra Colony, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (46).jpg",
    price: 5200,
    currency: "INR",
    rating: 5.0,
    guests: 10,
    verified: true,
  },
];

/* =========================================================
   NAVBAR
========================================================= */

/* =========================================================
   STAYS PAGE
========================================================= */

export default function StaysPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSearch() {
    const params = new URLSearchParams();

    if (destination.trim()) {
      params.set("query", destination.trim());
    }

    if (checkIn) {
      params.set("checkIn", checkIn);
    }

    params.set("guests", String(guests));

    router.push(`/search?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#F4EEDF]">

        <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-20 lg:px-10 lg:pt-24">

          <div className="max-w-[900px]">

            <p className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#A87928]">
              VISTARA STAYS
            </p>

            <h1 className="mt-7 font-serif text-[58px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#171614] sm:text-[72px] lg:text-[86px]">
              Stay somewhere
              <br />
              <span className="text-[#A67C35]">
                worth remembering.
              </span>
            </h1>

            <p className="mt-8 max-w-[720px] text-[18px] leading-8 text-[#456B9A]">
              Discover verified homes, villas, apartments and unique
              stays selected for meaningful journeys.
            </p>

          </div>

          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <div className="mt-14 rounded-[30px] bg-white p-3 shadow-[0_25px_70px_rgba(80,65,40,0.12)]">

            <div className="flex flex-col lg:flex-row">

              {/* WHERE */}

              <div className="flex min-h-[105px] flex-1 items-center gap-4 rounded-[22px] px-6 py-5 hover:bg-[#FAF9F6]">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[#03045E]">
                  <MapPin size={22} />
                </div>

                <div className="min-w-0 flex-1">

                  <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#77726A]">
                    WHERE
                  </label>

                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Explore a destination"
                    className="mt-2 w-full bg-transparent text-[16px] font-semibold text-[#292724] outline-none placeholder:text-[#77726A]"
                  />

                </div>
              </div>

              <div className="hidden h-[70px] w-px self-center bg-[#E7E2D9] lg:block" />

              {/* WHEN */}

              <div className="flex min-h-[105px] flex-1 items-center gap-4 rounded-[22px] px-6 py-5 hover:bg-[#FAF9F6]">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[#03045E]">
                  <CalendarDays size={22} />
                </div>

                <div className="min-w-0 flex-1">

                  <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#77726A]">
                    WHEN
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-2 w-full bg-transparent text-[16px] font-semibold text-[#292724] outline-none"
                  />

                </div>
              </div>

              <div className="hidden h-[70px] w-px self-center bg-[#E7E2D9] lg:block" />

              {/* GUESTS */}

              <div className="flex min-h-[105px] flex-1 items-center gap-4 rounded-[22px] px-6 py-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[#03045E]">
                  <Users size={22} />
                </div>

                <div className="flex-1">

                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#77726A]">
                    GUESTS
                  </p>

                  <div className="mt-2 flex items-center gap-4">

                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() =>
                        setGuests((value) => Math.max(1, value - 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DED9D0] disabled:opacity-40"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="min-w-[75px] text-center text-[16px] font-semibold">
                      {guests} {guests === 1 ? "Guest" : "Guests"}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setGuests((value) => Math.min(16, value + 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DED9D0]"
                    >
                      <Plus size={15} />
                    </button>

                  </div>
                </div>

              </div>

              {/* SEARCH */}

              <button
                type="button"
                onClick={handleSearch}
                className="flex min-h-[82px] items-center justify-center gap-3 rounded-[22px] bg-[#03045E] px-10 text-[16px] font-bold text-white transition hover:bg-[#023E8A] lg:min-w-[170px]"
              >
                <Search size={21} />
                Search
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          STAYS COLLECTION
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-6 py-20 lg:px-10">

        <div className="mb-12">

          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#A87928]">
            VERIFIED COLLECTION
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <h2 className="font-serif text-[48px] font-semibold tracking-[-0.04em] text-[#171614]">
                Places to stay
              </h2>

              <p className="mt-3 text-[16px] text-[#64748B]">
                Explore stays that have completed Vistara's verification process.
              </p>
            </div>

            <p className="text-sm font-semibold text-[#77726A]">
              {stays.length} stays
            </p>

          </div>

        </div>

        {/* =================================================
            30 PROPERTY CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {stays.map((stay) => (
            <PropCard
              key={stay.id}
              property={stay}
            />
          ))}

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#E5E0D8] bg-white">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          <div>
            <p className="font-serif text-2xl font-bold text-[#171614]">
              Vistara
            </p>

            <p className="mt-1 text-sm text-[#77726A]">
              Discover places worth remembering.
            </p>
          </div>

          <p className="text-sm text-[#77726A]">
            © 2026 Vistara. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}