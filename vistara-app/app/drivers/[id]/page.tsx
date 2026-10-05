"use client";

import Link from "next/link";
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
  experienceYears?: number | null;
  languages?: string[];
  services?: string[];
};

export default function DriverDetailsPage() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];

    if (!id) {
      setError("Driver not found.");
      setLoading(false);
      return;
    }

    const loadDriver = async () => {
      try {
        const response = await fetch(`/api/drivers/${id}`, {
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message || "Unable to load driver."
          );
        }

        setDriver(result.data?.driver || result.data);
      } catch (err) {
        console.error("DRIVER_DETAILS_ERROR:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load driver."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDriver();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Header />

        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="animate-pulse">
            <div className="h-[420px] rounded-3xl bg-black/[0.05]" />

            <div className="mt-6 h-7 w-56 rounded bg-black/[0.06]" />

            <div className="mt-3 h-4 w-80 rounded bg-black/[0.05]" />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error || !driver) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Header />

        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Car className="mx-auto" size={30} />

          <h1 className="mt-4 text-lg font-semibold">
            Driver not found
          </h1>

          <p className="mt-2 text-xs text-black/45">
            {error || "This driver is currently unavailable."}
          </p>

          <Link
            href="/drivers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white"
          >
            <ArrowLeft size={13} />
            Back to drivers
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-7 lg:px-8">

        {/* Back */}

        <Link
          href="/drivers"
          className="mb-5 inline-flex items-center gap-2 text-xs text-black/50 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          All drivers
        </Link>

        {/* ================= HERO ================= */}

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
              />

              {driver.verified && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold">
                  <ShieldCheck size={12} />
                  Verified driver
                </div>
              )}

            </div>

          </div>

          {/* INFO */}

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

            {/* Rating */}

            <div className="mt-4 flex items-center gap-3">

              <div className="flex items-center gap-1 text-sm">
                <Star
                  size={13}
                  fill="currentColor"
                />
                <span className="font-semibold">
                  {Number(driver.rating || 0).toFixed(1)}
                </span>
              </div>

              <span className="text-xs text-black/40">
                {driver.reviewCount || 0} reviews
              </span>

            </div>

            {/* Bio */}

            <p className="mt-5 max-w-lg text-sm leading-6 text-black/55">
              {driver.bio ||
                "A trusted local driver helping you travel comfortably around the city and nearby destinations."}
            </p>

            {/* Quick details */}

            <div className="mt-6 grid grid-cols-2 gap-2">

              <Detail
                icon={<Car size={14} />}
                label="Vehicle"
                value={
                  driver.vehicle ||
                  driver.vehicleType ||
                  "Comfort"
                }
              />

              <Detail
                icon={<Users size={14} />}
                label="Capacity"
                value={`${driver.seats || 4} seats`}
              />

              {driver.experienceYears !== undefined &&
                driver.experienceYears !== null && (
                  <Detail
                    icon={<CheckCircle2 size={14} />}
                    label="Experience"
                    value={`${driver.experienceYears} years`}
                  />
                )}

              <Detail
                icon={<MapPin size={14} />}
                label="Service"
                value="Local rides"
              />

            </div>

            {/* Price */}

            <div className="mt-6 border-t border-black/10 pt-5">

              <p className="text-[10px] uppercase tracking-wider text-black/40">
                Starting from
              </p>

              <div className="mt-1 flex items-end gap-1">

                <span className="text-2xl font-semibold">
                  ₹
                  {Number(
                    driver.price || 0
                  ).toLocaleString("en-IN")}
                </span>

                <span className="mb-1 text-xs text-black/40">
                  / ride
                </span>

              </div>

            </div>

            {/* CTA */}

            <div className="mt-5 flex gap-2">

              <Link
                href={`/drivers/${driver.id}/book`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-black/80"
              >
                Book this ride
                <ArrowRight size={14} />
              </Link>

            </div>

          </div>

        </div>

        {/* ================= DETAILS ================= */}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">

          <InfoCard
            title="What you can book"
            items={
              driver.services?.length
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
              driver.languages?.length
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

/* =========================
   HEADER
========================= */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">

        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          Vistara
        </Link>

        <nav className="hidden items-center gap-7 text-xs md:flex">
          <Link
            href="/explore"
            className="text-black/50 hover:text-black"
          >
            Explore
          </Link>

          <Link
            href="/trips"
            className="text-black/50 hover:text-black"
          >
            Trips
          </Link>

          <Link
            href="/wishlist"
            className="text-black/50 hover:text-black"
          >
            Wishlist
          </Link>

          <Link
            href="/guides"
            className="text-black/50 hover:text-black"
          >
            Guides
          </Link>

          <Link
            href="/drivers"
            className="font-semibold"
          >
            Drivers
          </Link>
        </nav>

        <Link
          href="/explore"
          className="text-xs font-medium"
        >
          Explore
        </Link>

      </div>
    </header>
  );
}

/* =========================
   DETAIL
========================= */

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

/* =========================
   INFO CARD
========================= */

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

            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
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

        <div className="flex gap-5 text-[10px] text-black/45">

          <Link href="/explore">
            Explore
          </Link>

          <Link href="/trips">
            Trips
          </Link>

          <Link href="/guides">
            Guides
          </Link>

          <Link
            href="/drivers"
            className="text-black"
          >
            Drivers
          </Link>

        </div>

      </div>

    </footer>
  );
}