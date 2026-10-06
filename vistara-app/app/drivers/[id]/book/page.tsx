"use client";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  X,
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

/* =========================================================
   DEMO FALLBACK
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  if (!value) return "Select a date";

  try {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function formatTime(value: string) {
  if (!value) return "Select time";

  try {
    return new Date(`2000-01-01T${value}`).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DriverBookPage() {
  const [driver, setDriver] = useState<Driver | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* =======================================================
     DATE / TIME PICKER STATE
  ======================================================= */

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const [viewDate, setViewDate] = useState(() => new Date());

  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const todayString = getLocalDateString(today);

  /* =======================================================
     DRIVER ID
  ======================================================= */

  const driverId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2] || ""
      : "";

  /* =======================================================
     LOAD DRIVER
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadDriver() {
      if (!driverId) {
        if (mounted) {
          setError("Invalid driver.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/drivers", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        let result: any = null;

        try {
          result = await response.json();
        } catch {
          result = null;
        }

        if (
          response.ok &&
          result?.success &&
          Array.isArray(result.data)
        ) {
          const foundDriver = result.data.find(
            (item: Driver) =>
              String(item.id) === String(driverId)
          );

          if (foundDriver) {
            if (mounted) {
              setDriver({
                ...foundDriver,
                rating: Number(foundDriver.rating || 0),
                reviewCount: Number(foundDriver.reviewCount || 0),
                price:
                  foundDriver.price !== null &&
                  foundDriver.price !== undefined
                    ? Number(foundDriver.price)
                    : 0,
                seats:
                  foundDriver.seats !== null &&
                  foundDriver.seats !== undefined
                    ? Number(foundDriver.seats)
                    : 4,
              });
            }

            return;
          }
        }

        const fallbackDriver = fallbackDrivers.find(
          (item) => String(item.id) === String(driverId)
        );

        if (fallbackDriver) {
          if (mounted) {
            setDriver(fallbackDriver);
          }

          return;
        }

        throw new Error(
          result?.message || "Driver not found."
        );
      } catch (err) {
        console.error("DRIVER_BOOK_LOAD_ERROR:", err);

        const fallbackDriver = fallbackDrivers.find(
          (item) => String(item.id) === String(driverId)
        );

        if (mounted && fallbackDriver) {
          setDriver(fallbackDriver);
          setError("");
        } else if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load driver."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDriver();

    return () => {
      mounted = false;
    };
  }, [driverId]);

  /* =======================================================
     PRICING
  ======================================================= */

  const price = Number(driver?.price || 0);

  const passengerCount = Math.max(
    1,
    Number(passengers) || 1
  );

  const total = useMemo(() => {
    if (!price) return 0;

    if (passengerCount <= 4) {
      return price;
    }

    return (
      price +
      Math.max(0, passengerCount - 4) * 150
    );
  }, [price, passengerCount]);

  /* =======================================================
     CALENDAR
  ======================================================= */

  const monthStart = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  );

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = monthStart.getDay();

  const monthName = viewDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goPreviousMonth = () => {
    setViewDate(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() - 1,
        1
      )
    );
  };

  const goNextMonth = () => {
    setViewDate(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        1
      )
    );
  };

  const selectDate = (selected: string) => {
    setDate(selected);
    setCalendarOpen(false);
  };

  const buildDateValue = (day: number) => {
    return `${viewDate.getFullYear()}-${String(
      viewDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  /* =======================================================
     TIME SLOTS
  ======================================================= */

  const timeSlots = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!driverId || !driver) {
      setError("Driver information is unavailable.");
      return;
    }

    setError("");

    if (!date || !time) {
      setError("Please select date and time.");
      return;
    }

    if (!pickup.trim()) {
      setError("Please enter your pickup location.");
      return;
    }

    if (!destination.trim()) {
      setError("Please enter your destination.");
      return;
    }

    if (passengerCount < 1) {
      setError("Please enter a valid passenger count.");
      return;
    }

    if (
      driver.seats &&
      passengerCount > driver.seats
    ) {
      setError(
        `This vehicle can carry up to ${driver.seats} passengers.`
      );

      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `/api/drivers/${driverId}/book`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driverId: Number(driverId),
            pickup: pickup.trim(),
            destination: destination.trim(),
            date,
            time,
            passengers: passengerCount,
            price: total,
          }),
        }
      );

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create ride booking."
        );
      }

      const bookingId =
        result?.data?.booking?.id ||
        result?.booking?.id ||
        result?.data?.id ||
        result?.bookingId;

      if (bookingId) {
        window.location.href =
          `/driver-bookings/${bookingId}`;

        return;
      }

      window.location.href = "/trips";
    } catch (err) {
      console.error("DRIVER_BOOK_ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to book this ride."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-black/[0.06]" />

            <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
              <div className="h-[500px] rounded-3xl bg-black/[0.05]" />
              <div className="h-[500px] rounded-3xl bg-black/[0.05]" />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* =======================================================
     DRIVER ERROR
  ======================================================= */

  if (error && !driver) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-24 text-center lg:px-8">
          <Car
            className="mx-auto"
            size={30}
          />

          <h1 className="mt-4 text-lg font-semibold">
            Driver unavailable
          </h1>

          <p className="mt-2 text-xs text-black/45">
            {error}
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

  if (!driver) {
    return null;
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-7 lg:px-8">

        {/* BACK */}

        <Link
          href={`/drivers/${driver.id}`}
          className="inline-flex items-center gap-2 text-xs text-black/50 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to driver
        </Link>

        {/* TITLE */}

        <div className="mt-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
            BOOK A LOCAL RIDE
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
            Ride with {driver.name}
          </h1>

          <p className="mt-2 text-xs text-black/45">
            Plan your ride around {driver.city}.
          </p>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/10 p-5 sm:p-7"
          >

            {/* DRIVER */}

            <div className="flex items-center gap-3 border-b border-black/10 pb-5">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-black/[0.05]">
                <img
                  src={
                    driver.image ||
                    "/images/profile.jpg"
                  }
                  alt={driver.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold">
                    {driver.name}
                  </h2>

                  {driver.verified && (
                    <ShieldCheck
                      size={12}
                      className="text-[#023E8A]"
                    />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 text-[10px] text-black/45">
                  <span className="flex items-center gap-1">
                    <Star
                      size={10}
                      fill="currentColor"
                    />
                    {Number(driver.rating).toFixed(1)}
                  </span>

                  <span>·</span>

                  <span>
                    {driver.vehicle ||
                      driver.vehicleType ||
                      "Comfort ride"}
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                DATE + TIME
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* DATE */}

              <Field label="Date">
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => {
                      setCalendarOpen((value) => !value);
                      setTimeOpen(false);

                      if (date) {
                        setViewDate(
                          new Date(
                            `${date}T00:00:00`
                          )
                        );
                      }
                    }}
                    className="group flex h-[52px] w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 text-left transition-all hover:border-[#023E8A]/35 hover:shadow-[0_8px_25px_rgba(3,4,94,0.06)]"
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF4FF]">
                        <CalendarDays
                          size={16}
                          className="text-[#023E8A]"
                        />
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/35">
                          Travel date
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            date
                              ? "font-semibold text-[#111827]"
                              : "text-black/35"
                          }`}
                        >
                          {date
                            ? formatDate(date)
                            : "Choose your date"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`text-black/25 transition-transform ${
                        calendarOpen
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </button>

                  {/* CALENDAR */}

                  {calendarOpen && (
                    <div className="absolute left-0 top-[calc(100%+10px)] z-[100] w-[330px] max-w-[calc(100vw-40px)] rounded-[26px] border border-black/10 bg-white p-4 shadow-[0_25px_70px_rgba(3,4,94,0.15)]">

                      {/* HEADER */}

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={goPreviousMonth}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#EEF4FF] hover:text-[#023E8A]"
                        >
                          <ChevronLeft size={17} />
                        </button>

                        <div className="text-sm font-bold text-[#03045E]">
                          {monthName}
                        </div>

                        <button
                          type="button"
                          onClick={goNextMonth}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#EEF4FF] hover:text-[#023E8A]"
                        >
                          <ChevronRight size={17} />
                        </button>
                      </div>

                      {/* WEEK DAYS */}

                      <div className="mt-5 grid grid-cols-7">
                        {[
                          "S",
                          "M",
                          "T",
                          "W",
                          "T",
                          "F",
                          "S",
                        ].map((day, index) => (
                          <div
                            key={`${day}-${index}`}
                            className="text-center text-[9px] font-bold uppercase tracking-wide text-black/30"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* DAYS */}

                      <div className="mt-3 grid grid-cols-7 gap-y-1">

                        {Array.from({
                          length: firstDayOfMonth,
                        }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="h-9"
                          />
                        ))}

                        {Array.from({
                          length: daysInMonth,
                        }).map((_, index) => {
                          const day = index + 1;

                          const value =
                            buildDateValue(day);

                          const currentDate =
                            new Date(
                              viewDate.getFullYear(),
                              viewDate.getMonth(),
                              day
                            );

                          currentDate.setHours(
                            0,
                            0,
                            0,
                            0
                          );

                          const isPast =
                            currentDate < today;

                          const isSelected =
                            value === date;

                          const isToday =
                            value === todayString;

                          return (
                            <button
                              key={value}
                              type="button"
                              disabled={isPast}
                              onClick={() =>
                                selectDate(value)
                              }
                              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs transition-all ${
                                isSelected
                                  ? "bg-[#03045E] font-bold text-white shadow-[0_5px_15px_rgba(3,4,94,0.25)]"
                                  : isPast
                                  ? "cursor-not-allowed text-black/15"
                                  : "text-[#111827] hover:bg-[#EEF4FF] hover:text-[#023E8A]"
                              } ${
                                isToday &&
                                !isSelected
                                  ? "font-bold text-[#0D21A1] ring-1 ring-[#0D21A1]/30"
                                  : ""
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      {/* FOOTER */}

                      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">

                        <button
                          type="button"
                          onClick={() => {
                            setDate("");
                            setCalendarOpen(false);
                          }}
                          className="text-[10px] font-semibold text-black/40 transition hover:text-[#03045E]"
                        >
                          Clear
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current =
                              new Date();

                            setViewDate(current);
                            setDate(
                              getLocalDateString(
                                current
                              )
                            );
                            setCalendarOpen(false);
                          }}
                          className="rounded-full bg-[#EEF4FF] px-3 py-1.5 text-[10px] font-bold text-[#023E8A] transition hover:bg-[#023E8A] hover:text-white"
                        >
                          Today
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Field>

              {/* TIME */}

              <Field label="Pickup time">
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => {
                      setTimeOpen((value) => !value);
                      setCalendarOpen(false);
                    }}
                    className="group flex h-[52px] w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 text-left transition-all hover:border-[#023E8A]/35 hover:shadow-[0_8px_25px_rgba(3,4,94,0.06)]"
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF4FF]">
                        <Clock3
                          size={16}
                          className="text-[#023E8A]"
                        />
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/35">
                          Pickup time
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            time
                              ? "font-semibold text-[#111827]"
                              : "text-black/35"
                          }`}
                        >
                          {time
                            ? formatTime(time)
                            : "Choose pickup time"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`text-black/25 transition-transform ${
                        timeOpen
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </button>

                  {/* TIME PICKER */}

                  {timeOpen && (
                    <div className="absolute right-0 top-[calc(100%+10px)] z-[100] w-[300px] max-w-[calc(100vw-40px)] rounded-[26px] border border-black/10 bg-white p-4 shadow-[0_25px_70px_rgba(3,4,94,0.15)]">

                      <div className="flex items-start justify-between border-b border-black/5 pb-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                            Pickup time
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#03045E]">
                            When should we pick you up?
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setTimeOpen(false)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-black/30 transition hover:bg-[#EEF4FF] hover:text-[#023E8A]"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="mt-4 max-h-[250px] overflow-y-auto pr-1">
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map(
                            (slot) => {
                              const selected =
                                time === slot;

                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => {
                                    setTime(slot);
                                    setTimeOpen(false);
                                  }}
                                  className={`relative rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition-all ${
                                    selected
                                      ? "border-[#03045E] bg-[#03045E] text-white shadow-md"
                                      : "border-black/[0.08] bg-white text-black/60 hover:border-[#023E8A]/30 hover:bg-[#EEF4FF] hover:text-[#023E8A]"
                                  }`}
                                >
                                  {formatTime(slot)}

                                  {selected && (
                                    <Check
                                      size={11}
                                      className="absolute right-1.5 top-1.5"
                                    />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setTime("");
                            setTimeOpen(false);
                          }}
                          className="text-[10px] font-semibold text-black/40 hover:text-[#03045E]"
                        >
                          Clear time
                        </button>

                        <span className="text-[9px] text-black/30">
                          30 min intervals
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Field>
            </div>

            {/* =================================================
                PICKUP
            ================================================= */}

            <div className="mt-5">
              <Field label="Pickup location">
                <div className="relative">

                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) =>
                      setPickup(e.target.value)
                    }
                    placeholder="Where should the driver pick you up?"
                    className="input pl-9"
                    required
                  />
                </div>
              </Field>
            </div>

            {/* =================================================
                DESTINATION
            ================================================= */}

            <div className="mt-5">
              <Field label="Destination">
                <div className="relative">

                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="text"
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                    placeholder="Where are you going?"
                    className="input pl-9"
                    required
                  />
                </div>
              </Field>
            </div>

            {/* =================================================
                PASSENGERS
            ================================================= */}

            <div className="mt-5">
              <Field label="Passengers">
                <div className="relative">

                  <Users
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="number"
                    min="1"
                    max={driver.seats || 20}
                    value={passengers}
                    onChange={(e) =>
                      setPassengers(e.target.value)
                    }
                    className="input pl-9"
                    required
                  />
                </div>
              </Field>
            </div>
sh

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-xs font-semibold text-white transition hover:bg-[#023E8A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Confirming ride..."
                : "Confirm ride"}

              {!submitting && (
                <ArrowRight size={14} />
              )}
            </button>

            <p className="mt-3 text-center text-[9px] text-black/35">
              You can review your ride details before
              completing the booking.
            </p>
          </form>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside className="h-fit rounded-3xl border border-black/10 p-5 sm:p-6 lg:sticky lg:top-20">

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
              RIDE SUMMARY
            </p>

            <h2 className="mt-2 text-base font-semibold">
              Your local ride
            </h2>

            {/* DRIVER */}

            <div className="mt-5 flex items-center gap-3 border-b border-black/10 pb-5">

              <div className="h-11 w-11 overflow-hidden rounded-xl">
                <img
                  src={
                    driver.image ||
                    "/images/profile.jpg"
                  }
                  alt={driver.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">
                  {driver.name}
                </p>

                <p className="mt-1 text-[10px] text-black/45">
                  {driver.vehicle ||
                    driver.vehicleType ||
                    "Local ride"}
                </p>
              </div>
            </div>

            {/* DETAILS */}

            <div className="space-y-4 py-5">

              <SummaryRow
                icon={
                  <CalendarDays
                    size={14}
                    className="text-[#023E8A]"
                  />
                }
                label="Date"
                value={
                  date
                    ? formatDate(date)
                    : "Select a date"
                }
              />

              <SummaryRow
                icon={
                  <Clock3
                    size={14}
                    className="text-[#023E8A]"
                  />
                }
                label="Time"
                value={
                  time
                    ? formatTime(time)
                    : "Select time"
                }
              />

              <SummaryRow
                icon={
                  <MapPin
                    size={14}
                    className="text-[#023E8A]"
                  />
                }
                label="Route"
                value={
                  pickup && destination
                    ? `${pickup} → ${destination}`
                    : "Add your route"
                }
              />

              <SummaryRow
                icon={
                  <Users
                    size={14}
                    className="text-[#023E8A]"
                  />
                }
                label="Passengers"
                value={`${passengerCount}`}
              />
            </div>

            {/* PRICE */}

            <div className="border-t border-black/10 pt-5">

              <div className="flex items-center justify-between">

                <span className="text-xs text-black/50">
                  Ride fare
                </span>

                <span className="text-base font-semibold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-black/35">
                Final fare may depend on the selected
                route and ride details.
              </p>
            </div>

            {/* TRUST */}

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EEF4FF] px-3 py-3">

              <ShieldCheck
                size={14}
                className="text-[#023E8A]"
              />

              <p className="text-[9px] leading-4 text-[#023E8A]">
                Vistara verified local driver
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium text-black/55">
        {label}
      </span>

      {children}

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 1rem;
          background: white;
          padding: 0.82rem 0.875rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #111827;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        .input:focus {
          border-color: rgba(2, 62, 138, 0.45);
          box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.08);
        }

        .input::placeholder {
          color: rgba(0, 0, 0, 0.35);
        }

        .input[type="number"]::-webkit-inner-spin-button,
        .input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </label>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="mt-0.5 shrink-0">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] uppercase tracking-wide text-black/35">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}