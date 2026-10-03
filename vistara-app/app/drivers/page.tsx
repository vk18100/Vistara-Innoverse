"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Car,
  ShieldCheck,
  Star,
  ArrowRight,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

type Driver = {
  id: number;
  name: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  vehicles: {
    id: number;
    make: string | null;
    model: string | null;
    type: string;
    capacity: number;
  }[];
};

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    try {
      const response = await fetch("/api/drivers");

      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }

      const result = await response.json();

      if (result.success) {
        setDrivers(result.data || []);
      } else {
        setDrivers([]);
      }
    } catch (error) {
      console.error("Drivers loading error:", error);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292524]">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#E7E2D8] bg-[#F3F0E9]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9A7137]">
              VISTARA DRIVERS
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#292524] sm:text-5xl md:text-6xl">
              Meet the people
              <br />
              behind your journey.
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#78716C] sm:text-base">
              Book a trusted local driver for airport transfers,
              city rides, road trips and longer journeys.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DRIVER SECTION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16 lg:px-10">

        {/* SECTION HEADER */}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7137]">
              LOCAL DRIVERS
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#292524] sm:text-4xl">
              Drivers for your journey
            </h2>

            <p className="mt-2 text-sm text-[#78716C]">
              {loading
                ? "Finding available drivers..."
                : `${drivers.length} drivers available`}
            </p>
          </div>

          {!loading && drivers.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-[#78716C]">
              <ShieldCheck size={17} />
              Verified profiles
            </div>
          )}
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white"
              >
                <div className="h-64 animate-pulse bg-[#EEEAE2]" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-32 animate-pulse rounded bg-[#EEEAE2]" />
                  <div className="h-4 w-24 animate-pulse rounded bg-[#EEEAE2]" />
                  <div className="h-12 animate-pulse rounded-xl bg-[#EEEAE2]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && drivers.length === 0 && (
          <div className="rounded-[28px] border border-[#E7E2D8] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F0E9] text-[#9A7137]">
              <Car size={28} strokeWidth={1.7} />
            </div>

            <h3 className="mt-6 font-serif text-2xl font-semibold">
              No drivers available right now
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#78716C]">
              We're adding local drivers to Vistara.
              Please check back shortly.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#292524] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#44403C]"
            >
              Explore Vistara
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* =================================================
            DRIVER CARDS
        ================================================= */}

        {!loading && drivers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => {
              const vehicle = driver.vehicles?.[0];

              return (
                <article
                  key={driver.id}
                  className="
                    group
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[#E7E2D8]
                    bg-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_50px_rgba(41,37,36,0.10)]
                  "
                >
                  {/* IMAGE */}

                  <div className="relative h-64 overflow-hidden bg-[#EEEAE2]">
                    <Image
                      src="/images/profile.jpg"
                      alt={`${driver.name} profile`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* SOFT OVERLAY */}

                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

                    {/* VERIFIED */}

                    {driver.isVerified && (
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#292524] shadow-sm">
                        <ShieldCheck
                          size={14}
                          className="text-[#9A7137]"
                        />
                        Verified
                      </div>
                    )}

                    {/* RATING */}

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#292524] shadow-sm">
                      <Star
                        size={13}
                        fill="currentColor"
                        className="text-[#B8873C]"
                      />
                      {driver.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-[#292524]">
                          {driver.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#78716C]">
                          Local Vistara driver
                        </p>
                      </div>
                    </div>

                    {/* STATS */}

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <div className="rounded-2xl bg-[#F7F3EA] p-4">
                        <p className="text-xs text-[#A8A29E]">
                          Completed trips
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Car
                            size={16}
                            className="text-[#9A7137]"
                          />

                          <p className="font-semibold text-[#292524]">
                            {driver.totalTrips}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#F7F3EA] p-4">
                        <p className="text-xs text-[#A8A29E]">
                          Capacity
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Users
                            size={16}
                            className="text-[#9A7137]"
                          />

                          <p className="font-semibold text-[#292524]">
                            {vehicle?.capacity || "-"} seats
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* VEHICLE */}

                    {vehicle && (
                      <div className="mt-5 flex items-center gap-3 border-t border-[#E7E2D8] pt-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F0E9] text-[#9A7137]">
                          <Car size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#292524]">
                            {vehicle.make || vehicle.model
                              ? `${vehicle.make ?? ""} ${
                                  vehicle.model ?? ""
                                }`.trim()
                              : vehicle.type}
                          </p>

                          <p className="mt-0.5 text-xs capitalize text-[#78716C]">
                            {vehicle.type}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ACTION */}

                    <Link
                      href={`/drivers/${driver.id}`}
                      className="
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#292524]
                        px-5
                        py-3.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#44403C]
                      "
                    >
                      View driver
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =================================================
            TRUST STRIP
        ================================================= */}

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <TrustItem
            icon={<ShieldCheck size={21} />}
            title="Verified profiles"
            text="Driver information is checked before listing."
          />

          <TrustItem
            icon={<Star size={21} />}
            title="Real trip history"
            text="See ratings and completed journeys at a glance."
          />

          <TrustItem
            icon={<Car size={21} />}
            title="Suitable vehicles"
            text="Choose based on your group and journey."
          />

        </div>
      </section>
    </main>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#E7E2D8] bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F0E9] text-[#9A7137]">
        {icon}
      </div>

      <h4 className="mt-4 text-sm font-semibold text-[#292524]">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-[#78716C]">
        {text}
      </p>
    </div>
  );
}