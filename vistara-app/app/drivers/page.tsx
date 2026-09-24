"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Car,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

type Driver = {
  id: string;
  name: string;
  city: string;
  state: string;
  experience: number;
  rating: number;
  reviews: number;
  languages: string[];
  vehicle: {
    type: string;
    name: string;
    seats: number;
    ac: boolean;
  };
  services: string[];
  pricing: {
    perHour: number;
    perDay: number;
    perTrip: number;
    religiousTrip: number;
  };
  availability: string;
  routes: string[];
  specialties: string[];
  verified: boolean;
  image: string;
};

const serviceOptions = [
  { value: "all", label: "All Drivers" },
  { value: "route", label: "Route Driver" },
  { value: "whole_trip", label: "Whole Trip" },
  { value: "religious", label: "Religious Trips" },
  { value: "per_hour", label: "Per Hour" },
];

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState("all");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers(service = selectedService, selectedCity = city) {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (service !== "all") {
        params.set("service", service);
      }

      if (selectedCity.trim()) {
        params.set("city", selectedCity.trim());
      }

      const query = params.toString();

      const response = await fetch(
        `/api/drivers${query ? `?${query}` : ""}`
      );

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

  function handleServiceChange(service: string) {
    setSelectedService(service);
    fetchDrivers(service, city);
  }

  function handleCitySearch() {
    fetchDrivers(selectedService, city);
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
            Hire a trusted driver for a route, an entire trip, religious
            journeys, or simply by the hour.
          </p>

          {/* SEARCH */}
          <div className="mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#03045E]/10 px-4">
              <MapPin size={19} className="text-[#0D21A1]" />

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCitySearch();
                  }
                }}
                placeholder="Search by city"
                className="w-full bg-transparent py-3 text-sm text-[#03045E] outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleCitySearch}
              className="rounded-xl bg-[#0D21A1] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#03045E]"
            >
              Find Drivers
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* SERVICE FILTERS */}
        <div className="mb-10 flex flex-wrap gap-3">
          {serviceOptions.map((service) => {
            const active = selectedService === service.value;

            return (
              <button
                key={service.value}
                onClick={() => handleServiceChange(service.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#03045E] text-white"
                    : "border border-[#DDE2E8] bg-white text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]"
                }`}
              >
                {service.label}
              </button>
            );
          })}
        </div>

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
                className="h-[500px] animate-pulse rounded-[28px] bg-[#F5F7FF]"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && drivers.length === 0 && (
          <div className="rounded-[28px] border border-[#03045E]/10 bg-[#F7F3EA] px-6 py-16 text-center">
            <Car className="mx-auto text-[#03045E]" size={38} />

            <h3 className="mt-4 font-serif text-2xl font-semibold">
              No drivers found
            </h3>

            <p className="mt-2 text-sm text-[#64748B]">
              Try another city or choose a different service.
            </p>

            <button
              onClick={() => {
                setCity("");
                setSelectedService("all");
                fetchDrivers("all", "");
              }}
              className="mt-6 rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white"
            >
              View All Drivers
            </button>
          </div>
        )}

        {/* DRIVER CARDS */}
        {!loading && drivers.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => (
              <article
                key={driver.id}
                className="group overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(3,4,94,0.12)]"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {driver.verified && (
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
                    {driver.rating}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {driver.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-[#64748B]">
                        <MapPin size={14} />
                        {driver.city}, {driver.state}
                      </div>
                    </div>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F7F3EA] p-3">
                      <p className="text-xs text-[#64748B]">
                        Experience
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {driver.experience} years
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F7F3EA] p-3">
                      <p className="text-xs text-[#64748B]">
                        Reviews
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {driver.reviews}
                      </p>
                    </div>
                  </div>

                  {/* VEHICLE */}
                  <div className="mt-5 flex items-center gap-3 border-t border-[#03045E]/10 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#03045E]">
                      <Car size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {driver.vehicle.name}
                      </p>

                      <p className="mt-0.5 text-xs text-[#64748B]">
                        {driver.vehicle.type} · {driver.vehicle.seats} seats
                        {driver.vehicle.ac ? " · AC" : ""}
                      </p>
                    </div>
                  </div>

                  {/* SERVICES */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {driver.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-[#F5F7FF] px-3 py-1.5 text-xs font-medium text-[#03045E]"
                      >
                        {formatService(service)}
                      </span>
                    ))}
                  </div>

                  {/* PRICE */}
                  <div className="mt-6 flex items-end justify-between border-t border-[#03045E]/10 pt-5">
                    <div>
                      <p className="text-xs text-[#64748B]">
                        From
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        ₹{driver.pricing.perHour.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-[#64748B]">
                          {" "}
                          / hour
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/driver/${driver.id}`}
                      className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                    >
                      View Driver
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* INFO */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard
            icon={<ShieldCheck size={22} />}
            title="Verified Drivers"
            description="Every listed driver is presented with verification and experience information."
          />

          <InfoCard
            icon={<MapPin size={22} />}
            title="Route Based"
            description="Choose drivers who already cover the route you are planning."
          />

          <InfoCard
            icon={<Clock size={22} />}
            title="Flexible Booking"
            description="Book by the hour, for a route, religious journey, or your entire trip."
          />
        </div>
      </section>
    </main>
  );
}

function formatService(service: string) {
  const labels: Record<string, string> = {
    route: "Route",
    whole_trip: "Whole Trip",
    religious: "Religious",
    per_hour: "Per Hour",
  };

  return labels[service] ?? service;
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
    <div className="rounded-[24px] border border-[#03045E]/10 bg-[#F7F3EA] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#03045E]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#64748B]">
        {description}
      </p>
    </div>
  );
}