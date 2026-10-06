"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Car,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

type Driver = {
  id: number;
  name: string;
  city: string;
  bio?: string | null;
  image?: string | null;
  vehicle?: string | null;
  vehicleType?: string | null;
  rating: number;
  reviewCount: number;
  price?: number | null;
  seats?: number | null;
  verified?: boolean;
};

const fallbackDrivers: Driver[] = [
  {
    id: 1,
    name: "Rajiv Kumar",
    city: "Patna, Bihar",
    bio: "Local driver for city rides, airport transfers and nearby destinations.",
    image: "/images/profile.jpg",
    vehicle: "Sedan",
    vehicleType: "Comfort",
    rating: 4.9,
    reviewCount: 124,
    price: 699,
    seats: 4,
    verified: true,
  },
  {
    id: 2,
    name: "Amit Singh",
    city: "Patna, Bihar",
    bio: "Friendly local driver for flexible city trips and destination transfers.",
    image: "/images/profile.jpg",
    vehicle: "SUV",
    vehicleType: "Comfort",
    rating: 4.8,
    reviewCount: 96,
    price: 799,
    seats: 6,
    verified: true,
  },
  {
    id: 3,
    name: "Neha Sharma",
    city: "Patna, Bihar",
    bio: "Reliable driver for local sightseeing and comfortable rides.",
    image: "/images/profile.jpg",
    vehicle: "Hatchback",
    vehicleType: "Economy",
    rating: 4.9,
    reviewCount: 87,
    price: 599,
    seats: 4,
    verified: true,
  },
];

export default function DriversPage() {
  const [drivers, setDrivers] =
    useState<Driver[]>(fallbackDrivers);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadDrivers = async () => {
      try {
        const response = await fetch("/api/drivers", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        /*
         * Do NOT throw when the API fails.
         * The page already has fallback drivers.
         */
        if (!response.ok) {
          if (mounted) {
            setDrivers(fallbackDrivers);
          }

          return;
        }

        const result = await response.json();

        /*
         * Support the expected API format:
         *
         * {
         *   success: true,
         *   data: [...]
         * }
         *
         * Also supports:
         *
         * {
         *   data: [...]
         * }
         *
         * and:
         *
         * {
         *   drivers: [...]
         * }
         */

        const apiDrivers =
          Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.drivers)
              ? result.drivers
              : null;

        if (
          mounted &&
          apiDrivers &&
          apiDrivers.length > 0
        ) {
          setDrivers(apiDrivers);
        } else if (mounted) {
          setDrivers(fallbackDrivers);
        }
      } catch (error) {
        /*
         * API/network failure should never break
         * the drivers page.
         */
        console.error(
          "DRIVERS_API_ERROR:",
          error
        );

        if (mounted) {
          setDrivers(fallbackDrivers);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDrivers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= HERO ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-10 lg:px-8">
        <div className="max-w-2xl">

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
            LOCAL RIDES
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Ride with a local
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/50">
            Get around the city with trusted local drivers.
            Book comfortable rides for sightseeing, transfers
            and nearby destinations.
          </p>

        </div>
      </section>

      {/* ================= DRIVER LIST ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-black/10"
              >
                <div className="h-56 bg-black/[0.05]" />

                <div className="space-y-3 p-4">
                  <div className="h-4 w-32 rounded bg-black/[0.06]" />
                  <div className="h-3 w-24 rounded bg-black/[0.06]" />
                  <div className="h-3 w-full rounded bg-black/[0.06]" />
                </div>
              </div>
            ))}
          </div>

        ) : drivers.length === 0 ? (

          <div className="rounded-2xl border border-black/10 px-6 py-16 text-center">
            <Car
              className="mx-auto"
              size={25}
            />

            <h2 className="mt-4 text-base font-semibold">
              No drivers available
            </h2>

            <p className="mt-1 text-xs text-black/45">
              Try exploring again later.
            </p>
          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {drivers.map((driver) => (

              <article
                key={driver.id}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* IMAGE */}

                <Link href={`/drivers/${driver.id}`}>
                  <div className="relative h-56 overflow-hidden bg-black/[0.04]">

                    <img
                      src={
                        driver.image ||
                        "/images/profile.jpg"
                      }
                      alt={driver.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold">
                      Local Driver
                    </div>

                    {driver.verified && (
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black px-2.5 py-1 text-[9px] font-medium text-white">
                        <ShieldCheck size={11} />
                        Verified
                      </div>
                    )}

                  </div>
                </Link>

                {/* CONTENT */}

                <div className="p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <div className="flex items-center gap-1.5">

                        <h2 className="truncate text-base font-semibold">
                          {driver.name}
                        </h2>

                        {driver.verified && (
                          <ShieldCheck
                            size={13}
                            className="shrink-0"
                          />
                        )}

                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-black/45">
                        <MapPin size={11} />

                        <span>
                          {driver.city}
                        </span>
                      </div>

                    </div>

                    <div className="flex shrink-0 items-center gap-1 text-xs">

                      <Star
                        size={12}
                        fill="currentColor"
                      />

                      <span className="font-medium">
                        {Number(driver.rating || 0).toFixed(1)}
                      </span>

                    </div>

                  </div>

                  {/* BIO */}

                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-black/50">
                    {driver.bio ||
                      "Reliable local rides and comfortable city transfers."}
                  </p>

                  {/* DETAILS */}

                  <div className="mt-4 flex items-center gap-2">

                    <div className="flex items-center gap-1.5 rounded-lg bg-black/[0.035] px-2.5 py-2 text-[10px]">
                      <Car size={12} />

                      {driver.vehicle ||
                        driver.vehicleType ||
                        "Comfort"}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg bg-black/[0.035] px-2.5 py-2 text-[10px]">
                      <Users size={12} />

                      {driver.seats || 4} seats
                    </div>

                    <div className="ml-auto text-right">

                      <p className="text-[9px] text-black/40">
                        From
                      </p>

                      <p className="text-sm font-semibold">
                        ₹
                        {Number(
                          driver.price || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-4 grid grid-cols-2 gap-2">

                    <Link
                      href={`/drivers/${driver.id}`}
                      className="flex items-center justify-center rounded-xl border border-black/15 px-3 py-2.5 text-xs font-medium transition hover:bg-black hover:text-white"
                    >
                      View driver
                    </Link>

                    <Link
                      href={`/drivers/${driver.id}/book`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-black px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80"
                    >
                      Book ride
                      <ArrowRight size={13} />
                    </Link>

                  </div>

                  {/* REVIEWS */}

                  <p className="mt-3 text-[9px] text-black/35">
                    {driver.reviewCount || 0} reviews · Local rides
                  </p>

                </div>
              </article>

            ))}

          </div>
        )}

      </section>

      {/* ================= INFO ================= */}

      <section className="border-y border-black/10 bg-black/[0.02]">

        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-3 lg:px-8">

          <div>
            <Car size={18} />

            <h3 className="mt-3 text-sm font-semibold">
              Comfortable rides
            </h3>

            <p className="mt-1 text-xs leading-5 text-black/45">
              Choose a local driver based on your route
              and vehicle preference.
            </p>
          </div>

          <div>
            <MapPin size={18} />

            <h3 className="mt-3 text-sm font-semibold">
              Know the city
            </h3>

            <p className="mt-1 text-xs leading-5 text-black/45">
              Get local help for nearby places and
              destinations.
            </p>
          </div>

          <div>
            <ShieldCheck size={18} />

            <h3 className="mt-3 text-sm font-semibold">
              Verified drivers
            </h3>

            <p className="mt-1 text-xs leading-5 text-black/45">
              See driver details and reviews before
              booking your ride.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-black/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>
            <p className="text-sm font-semibold">
              Vistara
            </p>

            <p className="mt-1 text-[10px] text-black/40">
              Discover places. Meet locals. Travel differently.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-[10px] text-black/45">

            <Link
              href="/explore"
              className="hover:text-black"
            >
              Explore
            </Link>

            <Link
              href="/trips"
              className="hover:text-black"
            >
              Trips
            </Link>

            <Link
              href="/guides"
              className="hover:text-black"
            >
              Guides
            </Link>

            <Link
              href="/drivers"
              className="text-black"
            >
              Drivers
            </Link>

            <Link
              href="/wishlist"
              className="hover:text-black"
            >
              Wishlist
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}