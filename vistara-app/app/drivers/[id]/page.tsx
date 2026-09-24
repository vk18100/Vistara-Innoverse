"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

type BookingType = "route" | "per_hour" | "whole_trip" | "religious";

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

export default function DriverDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  const [bookingType, setBookingType] =
    useState<BookingType>("route");

  const [selectedRoute, setSelectedRoute] = useState("");
  const [hours, setHours] = useState(4);
  const [days, setDays] = useState(2);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function getDriver() {
      try {
        const response = await fetch(`/api/drivers/${id}`);

        if (!response.ok) {
          throw new Error("Driver not found");
        }

        const result = await response.json();

        if (result.success) {
          setDriver(result.data);
        }
      } catch (error) {
        console.error("Driver details error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getDriver();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#03045E]/20 border-t-[#03045E]" />

            <p className="mt-4 text-sm text-[#64748B]">
              Loading driver...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (!driver) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <Car size={45} className="text-[#03045E]" />

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#03045E]">
            Driver not found
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            This driver may no longer be available.
          </p>

          <Link
            href="/driver"
            className="mt-6 rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Drivers
          </Link>
        </main>
      </>
    );
  }

  const getPrice = () => {
    switch (bookingType) {
      case "per_hour":
        return driver.pricing.perHour * hours;

      case "whole_trip":
        return driver.pricing.perDay * days;

      case "religious":
        return driver.pricing.religiousTrip;

      case "route":
      default:
        return driver.pricing.perTrip;
    }
  };

  const price = getPrice();

  const serviceOptions: {
    value: BookingType;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "route",
      title: "Route",
      description: "Hire for a specific route",
      icon: <MapPin size={18} />,
    },
    {
      value: "per_hour",
      title: "Per Hour",
      description: "Flexible hourly booking",
      icon: <Clock3 size={18} />,
    },
    {
      value: "whole_trip",
      title: "Whole Trip",
      description: "Driver for your entire trip",
      icon: <Car size={18} />,
    },
    {
      value: "religious",
      title: "Religious",
      description: "Pilgrimage & temple journeys",
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* BACK */}
      <div className="border-b border-[#03045E]/10">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <Link
            href="/driver"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            <ArrowLeft size={17} />
            Back to drivers
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          {/* LEFT */}
          <div>
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[30px]">
              <img
                src={driver.image}
                alt={driver.name}
                className="h-[430px] w-full object-cover md:h-[520px]"
              />

              {driver.verified && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-sm">
                  <ShieldCheck size={17} />
                  Verified Driver
                </div>
              )}

              {driver.availability === "available" && (
                <div className="absolute bottom-5 left-5 rounded-full bg-[#03045E] px-4 py-2 text-sm font-semibold text-white">
                  Available
                </div>
              )}
            </div>

            {/* DRIVER HEADER */}
            <div className="mt-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-serif text-4xl font-semibold">
                      {driver.name}
                    </h1>

                    {driver.verified && (
                      <ShieldCheck
                        size={22}
                        className="text-[#0D21A1]"
                      />
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {driver.city}, {driver.state}
                    </span>

                    <span>•</span>

                    <span>
                      {driver.experience} years experience
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    fill="currentColor"
                    className="text-[#C6A15B]"
                  />

                  <span className="font-semibold">
                    {driver.rating}
                  </span>

                  <span className="text-sm text-[#64748B]">
                    ({driver.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="mt-8 rounded-[25px] bg-[#F7F9FF] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#94A3B8]">
                YOUR VEHICLE
              </p>

              <div className="mt-5 flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#03045E]">
                    <Car size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      {driver.vehicle.name}
                    </h2>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {driver.vehicle.type}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm">
                    <Users size={15} />
                    {driver.vehicle.seats}
                  </div>

                  <p className="mt-1 text-xs text-[#64748B]">
                    passengers
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                  {driver.vehicle.seats} Seats
                </span>

                {driver.vehicle.ac && (
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                    Air Conditioning
                  </span>
                )}

                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium">
                  Private Vehicle
                </span>
              </div>
            </div>

            {/* ABOUT */}
            <div className="mt-9">
              <h2 className="font-serif text-2xl font-semibold">
                About {driver.name.split(" ")[0]}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748B]">
                An experienced local driver who knows the routes,
                destinations and local travel requirements around{" "}
                {driver.city}. Choose a booking option that fits
                your journey.
              </p>
            </div>

            {/* LANGUAGES */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">
                Languages
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {driver.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-[#03045E]/10 px-4 py-2 text-sm text-[#64748B]"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* SPECIALTIES */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">
                Specialties
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {driver.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-xl bg-[#F7F3EA] px-4 py-2.5 text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* ROUTES */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">
                Popular routes
              </h3>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {driver.routes.map((route) => (
                  <div
                    key={route}
                    className="flex items-center gap-2 rounded-xl border border-[#03045E]/10 px-4 py-3 text-sm"
                  >
                    <MapPin
                      size={15}
                      className="text-[#0D21A1]"
                    />

                    {route}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING CARD */}
          <div>
            <div className="sticky top-6 rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.08)] md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                BOOK YOUR DRIVER
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Choose how you want to travel
              </h2>

              {/* SERVICE OPTIONS */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                {serviceOptions.map((option) => {
                  const active =
                    bookingType === option.value;

                  const available =
                    driver.services.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={!available}
                      onClick={() =>
                        setBookingType(option.value)
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-[#03045E] bg-[#03045E] text-white"
                          : available
                          ? "border-[#03045E]/10 hover:border-[#03045E]"
                          : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon}

                        <span className="text-sm font-semibold">
                          {option.title}
                        </span>
                      </div>

                      <p
                        className={`mt-2 text-xs leading-5 ${
                          active
                            ? "text-white/70"
                            : "text-[#64748B]"
                        }`}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* ROUTE */}
              {bookingType === "route" && (
                <div className="mt-7">
                  <label className="text-sm font-semibold">
                    Select route
                  </label>

                  <select
                    value={selectedRoute}
                    onChange={(e) =>
                      setSelectedRoute(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                  >
                    <option value="">
                      Choose your route
                    </option>

                    {driver.routes.map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* PER HOUR */}
              {bookingType === "per_hour" && (
                <div className="mt-7">
                  <label className="text-sm font-semibold">
                    How many hours?
                  </label>

                  <select
                    value={hours}
                    onChange={(e) =>
                      setHours(Number(e.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                  >
                    {[2, 4, 6, 8, 10, 12].map(
                      (hour) => (
                        <option key={hour} value={hour}>
                          {hour} hours
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-2 text-xs text-[#64748B]">
                    ₹{driver.pricing.perHour.toLocaleString("en-IN")}{" "}
                    per hour
                  </p>
                </div>
              )}

              {/* WHOLE TRIP */}
              {bookingType === "whole_trip" && (
                <div className="mt-7 space-y-4">
                  <div>
                    <label className="text-sm font-semibold">
                      Start date
                    </label>

                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) =>
                        setStartDate(e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#03045E]/15 px-4 py-3 text-sm outline-none focus:border-[#03045E]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      End date
                    </label>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) =>
                        setEndDate(e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#03045E]/15 px-4 py-3 text-sm outline-none focus:border-[#03045E]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Number of days
                    </label>

                    <select
                      value={days}
                      onChange={(e) =>
                        setDays(Number(e.target.value))
                      }
                      className="mt-2 w-full rounded-xl border border-[#03045E]/15 px-4 py-3 text-sm outline-none focus:border-[#03045E]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}{" "}
                            {day === 1 ? "day" : "days"}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}

              {/* RELIGIOUS */}
              {bookingType === "religious" && (
                <div className="mt-7 rounded-2xl bg-[#F7F3EA] p-5">
                  <p className="text-sm font-semibold">
                    Pilgrimage journey
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    Suitable for temple visits, religious
                    circuits and multi-stop pilgrimage routes.
                  </p>

                  <div className="mt-4">
                    <label className="text-sm font-semibold">
                      Select route
                    </label>

                    <select
                      value={selectedRoute}
                      onChange={(e) =>
                        setSelectedRoute(e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm outline-none"
                    >
                      <option value="">
                        Choose pilgrimage route
                      </option>

                      {driver.routes.map((route) => (
                        <option key={route} value={route}>
                          {route}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* PRICE */}
              <div className="mt-7 border-t border-[#03045E]/10 pt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#94A3B8]">
                      Estimated fare
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {bookingType === "per_hour" &&
                        `₹${driver.pricing.perHour.toLocaleString(
                          "en-IN"
                        )} × ${hours} hours`}

                      {bookingType === "whole_trip" &&
                        `₹${driver.pricing.perDay.toLocaleString(
                          "en-IN"
                        )} × ${days} days`}

                      {bookingType === "route" &&
                        "Route based fare"}

                      {bookingType === "religious" &&
                        "Pilgrimage trip fare"}
                    </p>
                  </div>

                  <p className="text-2xl font-semibold">
                    ₹{price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* CONTINUE */}
              <Link
                href={`/driver/${driver.id}/book?type=${bookingType}&price=${price}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                <CheckCircle2 size={18} />
                Continue to Booking
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#94A3B8]">
                Final fare can vary depending on distance,
                route, duration and additional requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}