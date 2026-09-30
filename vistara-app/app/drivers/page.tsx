"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Car,
  MapPin,
  ShieldCheck,
  Star,
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
      setLoading(true);

      const response = await fetch("/api/drivers");
      const result = await response.json();

      if (result.success) {
        setDrivers(result.data);
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
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#03045E]/10 bg-[#03045E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            TRAVEL YOUR WAY
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Find a driver for your journey.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Hire a trusted, verified driver for your trip.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            VERIFIED DRIVERS
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold">
                Drivers for your journey
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                {loading
                  ? "Finding available drivers..."
                  : `${drivers.length} drivers available`}
              </p>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[340px] animate-pulse rounded-[28px] bg-[#F5F7FF]"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && drivers.length === 0 && (
          <div className="rounded-[28px] border border-[#03045E]/10 bg-[#FAFAF8] px-6 py-20 text-center">
            <h3 className="font-serif text-2xl font-semibold">
              No drivers available right now
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
              Please check back shortly.
            </p>
          </div>
        )}

        {/* DRIVER CARDS */}
        {!loading && drivers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => {
              const primaryVehicle = driver.vehicles[0];

              return (
                <article
                  key={driver.id}
                  className="group overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(3,4,94,0.12)]"
                >
                  {/* HEADER STRIP */}
                  <div className="relative flex h-32 items-center justify-center bg-[#F5F7FF]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#03045E] text-2xl font-semibold text-white">
                      {driver.name.charAt(0).toUpperCase()}
                    </div>

                    {driver.isVerified && (
                      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#03045E]">
                        <ShieldCheck size={14} />
                        Verified
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-[#03045E]">
                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-[#C6A15B]"
                      />
                      {driver.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">
                      {driver.name}
                    </h3>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                      <div className="rounded-xl bg-[#F7F3EA] p-3">
                        <p className="text-xs text-[#64748B]">
                          Total trips
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {driver.totalTrips}
                        </p>
                      </div>
                    </div>

                    {/* VEHICLE */}
                    {primaryVehicle && (
                      <div className="mt-5 flex items-center gap-3 border-t border-[#03045E]/10 pt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#03045E]">
                          <Car size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {primaryVehicle.make || primaryVehicle.model
                              ? `${primaryVehicle.make ?? ""} ${
                                  primaryVehicle.model ?? ""
                                }`.trim()
                              : primaryVehicle.type}
                          </p>

                          <p className="mt-0.5 text-xs text-[#64748B]">
                            {primaryVehicle.type} · {primaryVehicle.capacity}{" "}
                            seats
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ACTION */}
                    <div className="mt-6 flex justify-end border-t border-[#03045E]/10 pt-5">
                      <Link
                        href={`/drivers/${driver.id}`}
                        className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                      >
                        View Driver
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* INFO */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard
            icon={<ShieldCheck size={22} />}
            title="Verified Drivers"
            description="Every listed driver is verified before being shown here."
          />

          <InfoCard
            icon={<MapPin size={22} />}
            title="Reliable"
            description="Track record shown through completed trips and ratings."
          />

          <InfoCard
            icon={<Car size={22} />}
            title="Your Choice of Vehicle"
            description="Pick a driver based on the vehicle that suits your trip."
          />
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#03045E]/10 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
        {icon}
      </div>

      <h4 className="mt-4 font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-[#64748B]">
        {description}
      </p>
    </div>
  );
}