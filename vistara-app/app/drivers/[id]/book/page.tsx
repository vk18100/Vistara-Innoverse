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
import Navbar from "@/components/navbar";

type Vehicle = {
  id: number;
  make: string | null;
  model: string | null;
  type: string;
  capacity: number;
};

type Driver = {
  id: number;
  name: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  vehicles: Vehicle[];
};

export default function DriverDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDriver() {
      try {
        const response = await fetch("/api/drivers");
        const result = await response.json();

        if (result.success) {
          const found = result.data.find(
            (item: Driver) => String(item.id) === params.id
          );

          setDriver(found || null);
        }
      } catch (error) {
        console.error("Driver loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDriver();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="h-[520px] animate-pulse rounded-[32px] bg-[#F0ECE5]" />
        </div>
      </main>
    );
  }

  if (!driver) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <p className="text-sm font-medium text-[#A66A4C]">
              DRIVER
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold text-[#292524]">
              Driver not found
            </h1>

            <Link
              href="/drivers"
              className="mt-6 inline-flex rounded-full bg-[#292524] px-6 py-3 text-sm font-semibold text-white"
            >
              Back to drivers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const vehicle = driver.vehicles?.[0];

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#292524]">
      <Navbar />

      {/* PAGE */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:py-10 lg:px-8">

        {/* BACK */}
        <Link
          href="/drivers"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#78716C] transition hover:text-[#292524]"
        >
          <ArrowLeft size={17} />
          All drivers
        </Link>

        {/* MAIN PROFILE */}
        <div className="mt-6 overflow-hidden rounded-[32px] border border-[#E7E2D8] bg-white shadow-[0_20px_70px_rgba(41,37,36,0.08)]">

          {/* TOP */}
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* IMAGE */}
            <div className="relative min-h-[380px] overflow-hidden bg-[#EEE9E1] sm:min-h-[460px] lg:min-h-[540px]">
              <img
                src="/images/profile.jpg"
                alt={`${driver.name} profile`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* soft overlay */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />

              {/* VERIFIED */}
              {driver.isVerified && (
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#292524] shadow-sm backdrop-blur">
                  <ShieldCheck
                    size={15}
                    className="text-[#A66A4C]"
                  />
                  Verified driver
                </div>
              )}

              {/* RATING */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
                <Star
                  size={16}
                  fill="currentColor"
                  className="text-[#C49A4A]"
                />
                {driver.rating.toFixed(1)}
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A66A4C]">
                  Vistara driver
                </p>

                <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#292524] sm:text-5xl">
                  {driver.name}
                </h1>

                <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#78716C]">
                  A verified local driver ready to help you
                  travel comfortably and confidently around your
                  destination.
                </p>

                {/* STATS */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Stat
                    value={driver.rating.toFixed(1)}
                    label="Rating"
                    icon={<Star size={17} />}
                  />

                  <Stat
                    value={driver.totalTrips.toString()}
                    label="Trips"
                    icon={<MapPin size={17} />}
                  />

                  <Stat
                    value={vehicle?.capacity?.toString() || "—"}
                    label="Seats"
                    icon={<Users size={17} />}
                  />
                </div>

                {/* VEHICLE */}
                {vehicle && (
                  <div className="mt-8 rounded-2xl border border-[#E7E2D8] bg-[#FAF8F4] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#A66A4C] shadow-sm">
                        <Car size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-[#A8A29E]">
                          Vehicle
                        </p>

                        <h2 className="mt-1 font-semibold text-[#292524]">
                          {vehicle.make || vehicle.model
                            ? `${vehicle.make ?? ""} ${
                                vehicle.model ?? ""
                              }`.trim()
                            : vehicle.type}
                        </h2>

                        <p className="mt-1 text-sm text-[#78716C]">
                          {vehicle.type} · {vehicle.capacity} seats
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TRUST */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {driver.isVerified && (
                    <TrustBadge>
                      <CheckCircle2 size={15} />
                      Identity verified
                    </TrustBadge>
                  )}

                  <TrustBadge>
                    <ShieldCheck size={15} />
                    Vistara verified
                  </TrustBadge>

                  <TrustBadge>
                    <MapPin size={15} />
                    Local driver
                  </TrustBadge>
                </div>
              </div>

              {/* BOOK */}
              <div className="mt-10 border-t border-[#E7E2D8] pt-7">
                <Link
                  href={`/drivers/${driver.id}/book`}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#292524] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#44403C] sm:w-auto"
                >
                  Book this driver

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-3 text-center text-xs text-[#A8A29E] sm:text-left">
                  Choose your journey details on the next step.
                </p>
              </div>
            </div>
          </div>

          {/* LOWER INFO */}
          <div className="border-t border-[#E7E2D8] bg-[#FFFEFC] p-6 sm:p-9 lg:p-12">

            <div className="grid gap-8 md:grid-cols-3">

              <Feature
                icon={<ShieldCheck size={20} />}
                title="Verified"
                text="Driver information is checked before being listed."
              />

              <Feature
                icon={<MapPin size={20} />}
                title="Local knowledge"
                text="Travel with someone familiar with local routes and places."
              />

              <Feature
                icon={<Car size={20} />}
                title="Comfortable travel"
                text="Choose a vehicle based on your journey and group size."
              />

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E7E2D8] bg-[#FFFEFC] p-4">
      <div className="flex items-center gap-2 text-[#A66A4C]">
        {icon}
        <span className="text-xs font-medium text-[#78716C]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold text-[#292524]">
        {value}
      </p>
    </div>
  );
}

function TrustBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E2D8] bg-white px-3 py-2 text-xs font-medium text-[#57534E]">
      <span className="text-[#A66A4C]">{children}</span>
    </span>
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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EEE7] text-[#A66A4C]">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[#292524]">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-[#78716C]">
          {text}
        </p>
      </div>
    </div>
  );
}