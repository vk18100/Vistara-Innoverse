"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Clock3,
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

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function DriverProfilePage({
  params,
}: PageProps) {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDriver() {
      try {
        const { id } = await params;

        const response = await fetch("/api/drivers");
        const result = await response.json();

        if (result.success) {
          const foundDriver = result.data.find(
            (item: Driver) => String(item.id) === id
          );

          setDriver(foundDriver || null);
        }
      } catch (error) {
        console.error("Driver profile error:", error);
        setDriver(null);
      } finally {
        setLoading(false);
      }
    }

    loadDriver();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-[#E8E3DA]" />

            <div className="mt-8 h-[300px] rounded-[28px] bg-[#E8E3DA]" />

            <div className="mt-8 h-8 w-64 rounded bg-[#E8E3DA]" />
            <div className="mt-4 h-4 w-96 max-w-full rounded bg-[#E8E3DA]" />
          </div>
        </div>
      </main>
    );
  }

  if (!driver) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Car size={26} className="text-[#B96342]" />
            </div>

            <h1 className="mt-5 font-serif text-3xl font-semibold text-[#292524]">
              Driver not found
            </h1>

            <p className="mt-2 text-sm text-[#78716C]">
              This driver may no longer be available.
            </p>

            <Link
              href="/drivers"
              className="mt-6 inline-flex rounded-xl bg-[#292524] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#44403C]"
            >
              Back to drivers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const vehicle = driver.vehicles?.[0];

  const vehicleName =
    vehicle?.make || vehicle?.model
      ? `${vehicle.make ?? ""} ${vehicle.model ?? ""}`.trim()
      : vehicle?.type || "Comfort vehicle";

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#292524]">
      <Navbar />

      {/* PAGE */}
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* BACK */}
        <Link
          href="/drivers"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#78716C] transition hover:text-[#292524]"
        >
          <ArrowLeft size={17} />
          All drivers
        </Link>

        {/* PROFILE HERO */}
        <section className="mt-6 overflow-hidden rounded-[30px] border border-[#E7E2D8] bg-white shadow-[0_12px_45px_rgba(41,37,36,0.06)]">

          {/* TOP */}
          <div className="relative h-36 bg-[#F1ECE3] sm:h-44">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EFE7DA] to-[#F8F5EF]" />

            {driver.isVerified && (
              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-[#356859] shadow-sm sm:right-7 sm:top-7">
                <ShieldCheck size={15} />
                Verified driver
              </div>
            )}
          </div>

          {/* PROFILE CONTENT */}
          <div className="relative px-5 pb-7 sm:px-8 lg:px-10">

            {/* PROFILE IMAGE */}
            <div className="-mt-14 sm:-mt-16">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-[5px] border-white bg-[#E8E3DA] shadow-lg sm:h-32 sm:w-32">
                <Image
                  src="/images/profile.jpg"
                  alt={driver.name}
                  fill
                  priority
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* NAME + BOOK */}
            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-semibold text-[#292524] sm:text-4xl">
                    {driver.name}
                  </h1>

                  {driver.isVerified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6F1] px-3 py-1.5 text-xs font-semibold text-[#356859]">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#78716C]">
                  <span className="flex items-center gap-1.5">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-[#C6923E]"
                    />
                    <strong className="text-[#292524]">
                      {driver.rating.toFixed(1)}
                    </strong>
                    rating
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Car size={16} />
                    {driver.totalTrips} trips
                  </span>
                </div>
              </div>

              <Link
                href={`/drivers/${driver.id}/book`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#292524] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#44403C] sm:w-auto"
              >
                Book this driver
              </Link>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ABOUT */}
            <section className="rounded-[26px] border border-[#E7E2D8] bg-white p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B96342]">
                About your driver
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#292524]">
                Travel comfortably, your way.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#78716C]">
                Book a local driver for your journey and travel with
                someone who knows the roads, routes and destinations.
                Driver details and trip history are shown before you book.
              </p>
            </section>

            {/* VEHICLE */}
            <section className="rounded-[26px] border border-[#E7E2D8] bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B96342]">
                    Vehicle
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-[#292524]">
                    Your ride
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F3EA] text-[#8B6F3D]">
                  <Car size={21} />
                </div>
              </div>

              {vehicle ? (
                <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#FAF8F3] p-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#292524] shadow-sm">
                    <Car size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#292524]">
                      {vehicleName}
                    </h3>

                    <p className="mt-1 text-sm text-[#78716C]">
                      {vehicle.type} · {vehicle.capacity} seats
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm text-[#78716C]">
                  Vehicle details will be shown during booking.
                </p>
              )}
            </section>

            {/* WHY BOOK */}
            <section className="rounded-[26px] border border-[#E7E2D8] bg-white p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B96342]">
                Why book with Vistara
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">

                <Feature
                  icon={<ShieldCheck size={20} />}
                  title="Verified"
                  text="Driver verification shown before booking."
                />

                <Feature
                  icon={<Clock3 size={20} />}
                  title="Flexible"
                  text="Choose your route, date and timing."
                />

                <Feature
                  icon={<MapPin size={20} />}
                  title="Local"
                  text="Travel with someone familiar with the area."
                />

              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:block">
            <div className="sticky top-24 rounded-[26px] border border-[#E7E2D8] bg-white p-6 shadow-[0_12px_40px_rgba(41,37,36,0.06)]">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">
                Driver profile
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src="/images/profile.jpg"
                    alt={driver.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold text-[#292524]">
                    {driver.name}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-[#78716C]">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-[#C6923E]"
                    />
                    {driver.rating.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-[#E7E2D8]" />

              <div className="space-y-4">
                <SummaryRow
                  icon={<Car size={17} />}
                  label="Trips completed"
                  value={String(driver.totalTrips)}
                />

                <SummaryRow
                  icon={<Users size={17} />}
                  label="Vehicle capacity"
                  value={
                    vehicle
                      ? `${vehicle.capacity} seats`
                      : "Available on booking"
                  }
                />

                <SummaryRow
                  icon={<ShieldCheck size={17} />}
                  label="Verification"
                  value={driver.isVerified ? "Verified" : "Pending"}
                />
              </div>

              <Link
                href={`/drivers/${driver.id}/book`}
                className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#292524] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#44403C]"
              >
                Book driver
              </Link>

              <p className="mt-3 text-center text-xs leading-5 text-[#A8A29E]">
                You can review your journey details before confirming.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
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
    <div className="rounded-2xl bg-[#FAF8F3] p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#8B6F3D] shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#292524]">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-[#78716C]">
        {text}
      </p>
    </div>
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
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-[#78716C]">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <span className="text-right text-sm font-semibold text-[#292524]">
        {value}
      </span>
    </div>
  );
}