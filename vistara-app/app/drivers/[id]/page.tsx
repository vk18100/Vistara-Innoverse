"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Car,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import Footer from "@/app/footer/page";
import Navbar from "@/components/navbar";

type Driver = {
  id: number;
  name: string;
  city: string;
  bio: string;
  image: string | null;
  vehicle: string;
  vehicleType: string;
  rating: number;
  reviewCount: number;
  price: number;
  seats: number;
  verified: boolean;
  experienceYears: number;
  languages: string[];
  services: string[];
  status: string;
};

/*
|--------------------------------------------------------------------------
| SAME DEMO DRIVERS AS /drivers PAGE
|--------------------------------------------------------------------------
*/

const demoDrivers: Driver[] = [
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
    experienceYears: 5,
    languages: ["Hindi", "English"],
    services: [
      "City rides",
      "Airport transfers",
      "Local sightseeing",
      "Nearby destinations",
    ],
    status: "AVAILABLE",
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
    experienceYears: 7,
    languages: ["Hindi", "English"],
    services: [
      "City rides",
      "Airport transfers",
      "Outstation",
      "Nearby destinations",
    ],
    status: "AVAILABLE",
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
    experienceYears: 4,
    languages: ["Hindi", "English"],
    services: [
      "City rides",
      "Local sightseeing",
      "Airport transfers",
      "Nearby destinations",
    ],
    status: "AVAILABLE",
  },
];

/*
|--------------------------------------------------------------------------
| API DRIVER NORMALIZER
|--------------------------------------------------------------------------
*/

function normalizeApiDriver(
  data: any
): Driver | null {
  if (!data || data.id == null) {
    return null;
  }

  const vehicle =
    Array.isArray(data.vehicles) &&
    data.vehicles.length > 0
      ? data.vehicles[0]
      : null;

  return {
    id: Number(data.id),

    name:
      data.name ||
      data.user?.name ||
      "Local Driver",

    city:
      data.city ||
      data.user?.city ||
      "Patna, Bihar",

    bio:
      data.bio ||
      "A trusted local driver helping you travel comfortably around the city and nearby destinations.",

    image:
      data.avatar ||
      data.image ||
      data.user?.profile?.avatar ||
      null,

    vehicle:
      vehicle?.model ||
      data.vehicle ||
      "Local Vehicle",

    vehicleType:
      vehicle?.type ||
      data.vehicleType ||
      "Comfort",

    rating:
      Number(data.rating) || 0,

    reviewCount:
      Number(
        data.reviewCount ??
          data.reviewsCount ??
          0
      ),

    price:
      Number(
        data.pricePerRide ??
          data.price ??
          0
      ),

    seats:
      Number(
        vehicle?.seats ??
          vehicle?.capacity ??
          data.seats ??
          4
      ),

    verified:
      Boolean(
        data.isVerified ??
          data.verified
      ),

    experienceYears:
      Number(
        data.experienceYears ?? 0
      ),

    languages:
      Array.isArray(data.languages)
        ? data.languages
        : ["Hindi", "English"],

    services:
      Array.isArray(data.services)
        ? data.services
        : [
            "City rides",
            "Airport transfers",
            "Local sightseeing",
            "Nearby destinations",
          ],

    status:
      data.status ||
      "AVAILABLE",
  };
}

export default function DriverDetailsPage() {
  const params = useParams();

  const driverId = String(
    params?.id ?? ""
  ).trim();

  const [driver, setDriver] =
    useState<Driver | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD DRIVER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    async function loadDriver() {
      if (!driverId) {
        setError("Invalid driver ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
        |--------------------------------------------------------------------------
        | FIRST: TRY REAL API
        |--------------------------------------------------------------------------
        */

        const response = await fetch(
          `/api/drivers/${encodeURIComponent(
            driverId
          )}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const raw =
          await response.text();

        let result: any = {};

        try {
          result = raw
            ? JSON.parse(raw)
            : {};
        } catch {
          result = {};
        }

        /*
        |--------------------------------------------------------------------------
        | API SUCCESS
        |--------------------------------------------------------------------------
        */

        if (
          response.ok &&
          result?.success &&
          result?.data
        ) {
          const apiDriver =
            normalizeApiDriver(
              result.data
            );

          if (apiDriver) {
            if (!cancelled) {
              setDriver(apiDriver);
            }

            return;
          }
        }

        /*
        |--------------------------------------------------------------------------
        | API FAILED
        |
        | Use SAME demo driver that exists
        | on /drivers page.
        |--------------------------------------------------------------------------
        */

        const demoDriver =
          demoDrivers.find(
            (item) =>
              String(item.id) ===
              String(driverId)
          );

        if (!demoDriver) {
          throw new Error(
            "Driver not found."
          );
        }

        if (!cancelled) {
          setDriver(demoDriver);
        }
      } catch (err) {
        console.error(
          "DRIVER_DETAILS_ERROR:",
          err
        );

        /*
        |--------------------------------------------------------------------------
        | FALLBACK TO SAME DEMO DATA
        |--------------------------------------------------------------------------
        */

        const demoDriver =
          demoDrivers.find(
            (item) =>
              String(item.id) ===
              String(driverId)
          );

        if (demoDriver) {
          if (!cancelled) {
            setDriver(demoDriver);
            setError("");
          }
        } else {
          if (!cancelled) {
            setDriver(null);

            setError(
              err instanceof Error
                ? err.message
                : "Unable to load driver."
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDriver();

    return () => {
      cancelled = true;
    };
  }, [driverId]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-black/[0.05]" />

            <div className="mt-6 grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
              <div className="h-[430px] rounded-3xl bg-black/[0.05]" />

              <div className="space-y-4">
                <div className="h-3 w-28 rounded bg-black/[0.05]" />
                <div className="h-10 w-64 rounded bg-black/[0.06]" />
                <div className="h-4 w-40 rounded bg-black/[0.05]" />
                <div className="h-20 w-full rounded bg-black/[0.05]" />

                <div className="grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-xl bg-black/[0.05]" />
                  <div className="h-16 rounded-xl bg-black/[0.05]" />
                  <div className="h-16 rounded-xl bg-black/[0.05]" />
                  <div className="h-16 rounded-xl bg-black/[0.05]" />
                </div>

                <div className="h-12 rounded-xl bg-black/[0.05]" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | DRIVER NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!driver) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5">
          <div className="max-w-md text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black/[0.04]">
              <Car size={30} />
            </div>

            <h1 className="mt-5 text-xl font-semibold">
              Driver not found
            </h1>

            <p className="mt-2 text-sm text-black/45">
              {error ||
                "This driver is currently unavailable."}
            </p>

            <div className="mt-7 flex justify-center gap-3">

              <Link
                href="/drivers"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white"
              >
                <ArrowLeft size={14} />
                Back to drivers
              </Link>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="rounded-xl border border-black/10 px-5 py-3 text-xs font-semibold"
              >
                Try again
              </button>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | VALUES
  |--------------------------------------------------------------------------
  */

  const price =
    Number(driver.price) || 0;

  const seats =
    Number(driver.seats) || 4;

  const rating =
    Number(driver.rating) || 0;

  /*
  |--------------------------------------------------------------------------
  | MAIN PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-7 lg:px-8">

        {/* BACK */}

        <Link
          href="/drivers"
          className="mb-5 inline-flex items-center gap-2 text-xs text-black/50 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          All drivers
        </Link>

        {/* HERO */}

        <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">

          {/* IMAGE */}

          <div className="overflow-hidden rounded-3xl bg-black/[0.04]">
            <div className="relative h-[360px] sm:h-[430px]">

              <img
                src={
                  driver.image ||
                  "/images/profile.jpg"
                }
                alt={driver.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/profile.jpg";
                }}
              />

              {driver.verified && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold shadow-sm">
                  <ShieldCheck size={12} />
                  Verified driver
                </div>
              )}

            </div>
          </div>

          {/* INFORMATION */}

          <div className="flex flex-col justify-center">

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
              LOCAL DRIVER
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {driver.name}
            </h1>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-black/50">
              <MapPin size={12} />
              {driver.city}
            </div>

            {/* RATING */}

            <div className="mt-4 flex items-center gap-3">

              <div className="flex items-center gap-1 text-sm">
                <Star
                  size={13}
                  fill="currentColor"
                />

                <span className="font-semibold">
                  {rating.toFixed(1)}
                </span>
              </div>

              <span className="text-xs text-black/40">
                {driver.reviewCount} reviews
              </span>
            </div>

            {/* BIO */}

            <p className="mt-5 max-w-lg text-sm leading-6 text-black/55">
              {driver.bio}
            </p>

            {/* DETAILS */}

            <div className="mt-6 grid grid-cols-2 gap-2">

              <Detail
                icon={<Car size={14} />}
                label="Vehicle"
                value={
                  driver.vehicle ||
                  driver.vehicleType
                }
              />

              <Detail
                icon={<Users size={14} />}
                label="Capacity"
                value={`${seats} seats`}
              />

              <Detail
                icon={
                  <CheckCircle2 size={14} />
                }
                label="Experience"
                value={`${driver.experienceYears} years`}
              />

              <Detail
                icon={<MapPin size={14} />}
                label="Service"
                value="Local rides"
              />

            </div>

            {/* PRICE */}

            <div className="mt-6 border-t border-black/10 pt-5">

              <p className="text-[10px] uppercase tracking-wider text-black/40">
                Starting from
              </p>

              <div className="mt-1 flex items-end gap-1">

                <span className="text-2xl font-semibold">
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="mb-1 text-xs text-black/40">
                  / ride
                </span>

              </div>

            </div>

            {/* BOOK */}

            <div className="mt-5">

              <Link
                href={`/drivers/${driver.id}/book`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-black/80"
              >
                Book this ride
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>
        </div>

        {/* INFORMATION */}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">

          <InfoCard
            title="What you can book"
            items={
              driver.services.length > 0
                ? driver.services
                : [
                    "City rides",
                    "Airport transfers",
                    "Local sightseeing",
                    "Nearby destinations",
                  ]
            }
          />

          <InfoCard
            title="Why book with Vistara"
            items={[
              "Verified driver",
              "Local destination knowledge",
              "Clear pricing",
              "Comfortable rides",
            ]}
          />

          <InfoCard
            title="Languages"
            items={
              driver.languages.length > 0
                ? driver.languages
                : ["Hindi", "English"]
            }
          />

        </div>

      </section>

      <Footer />
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL CARD
|--------------------------------------------------------------------------
*/

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/[0.035] p-3">

      <div className="flex items-center gap-1.5 text-black/50">
        {icon}

        <span className="text-[9px] uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1.5 text-xs font-medium">
        {value}
      </p>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INFO CARD
|--------------------------------------------------------------------------
*/

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-5">

      <h2 className="text-sm font-semibold">
        {title}
      </h2>

      <div className="mt-4 space-y-2.5">

        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-2 text-xs text-black/55"
          >
            <CheckCircle2
              size={13}
              className="shrink-0"
            />

            <span>{item}</span>
          </div>
        ))}

      </div>

    </div>
  );
}