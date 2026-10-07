"use client";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type ApiVehicle = {
  id?: number | string;
  model?: string | null;
  name?: string | null;
  make?: string | null;
  type?: string | null;
  seats?: number | null;
  capacity?: number | null;
};

type Driver = {
  id: number;
  name: string;
  image: string | null;
  vehicle: string;
  vehicleType: string;
  rating: number;
  totalTrips: number;
  experienceYears: number;
  price: number;
  seats: number;
  verified: boolean;
  status: string;
  languages: string[];
  services: string[];
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  if (!value) return "Select a date";

  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(value: string) {
  if (!value) return "Select time";

  return new Date(
    `2000-01-01T${value}:00`
  ).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* -------------------------------------------------------------------------- */
/* NORMALIZE DRIVER                                                           */
/* -------------------------------------------------------------------------- */

function normalizeDriver(
  apiDriver: any
): Driver | null {
  if (
    !apiDriver ||
    apiDriver.id === undefined ||
    apiDriver.id === null
  ) {
    return null;
  }

  const numericId = Number(apiDriver.id);

  if (
    !Number.isInteger(numericId) ||
    numericId <= 0
  ) {
    return null;
  }

  const vehicles: ApiVehicle[] =
    Array.isArray(apiDriver.vehicles)
      ? apiDriver.vehicles
      : [];

  const vehicle =
    vehicles.length > 0
      ? vehicles[0]
      : null;

  return {
    id: numericId,

    name:
      apiDriver.name ??
      apiDriver.user?.name ??
      "Local Driver",

    image:
      apiDriver.image ??
      apiDriver.avatar ??
      apiDriver.profileImage ??
      apiDriver.user?.image ??
      apiDriver.user?.profile?.avatar ??
      null,

    vehicle:
      vehicle?.model ??
      vehicle?.name ??
      vehicle?.make ??
      apiDriver.vehicle ??
      "Local Vehicle",

    vehicleType:
      vehicle?.type ??
      apiDriver.vehicleType ??
      "Comfort",

    rating:
      Number(apiDriver.rating ?? 0) || 0,

    totalTrips:
      Number(
        apiDriver.totalTrips ??
          apiDriver.trips ??
          0
      ) || 0,

    experienceYears:
      Number(
        apiDriver.experienceYears ??
          apiDriver.experience ??
          0
      ) || 0,

    price:
      Number(
        apiDriver.pricePerRide ??
          apiDriver.price ??
          0
      ) || 0,

    seats:
      Number(
        vehicle?.seats ??
          vehicle?.capacity ??
          apiDriver.seats ??
          4
      ) || 4,

    verified: Boolean(
      apiDriver.isVerified ??
        apiDriver.verified ??
        false
    ),

    status:
      apiDriver.status ??
      "AVAILABLE",

    languages:
      Array.isArray(apiDriver.languages)
        ? apiDriver.languages
        : [],

    services:
      Array.isArray(apiDriver.services)
        ? apiDriver.services
        : [],
  };
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function DriverBookPage() {
  const params = useParams();
  const router = useRouter();

  const driverId = String(
    params?.id ?? ""
  ).trim();

  const [driver, setDriver] =
    useState<Driver | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [pickup, setPickup] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [passengers, setPassengers] =
    useState("1");

  const [calendarOpen, setCalendarOpen] =
    useState(false);

  const [timeOpen, setTimeOpen] =
    useState(false);

  const [viewDate, setViewDate] =
    useState(() => new Date());

  /* ------------------------------------------------------------------------ */
  /* TODAY                                                                    */
  /* ------------------------------------------------------------------------ */

  const today = useMemo(() => {
    const value = new Date();

    value.setHours(
      0,
      0,
      0,
      0
    );

    return value;
  }, []);

  const todayString =
    getLocalDateString(today);

  /* ------------------------------------------------------------------------ */
  /* LOAD EXACT DRIVER                                                        */
  /* ------------------------------------------------------------------------ */

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
         * IMPORTANT:
         * We intentionally call the SINGLE DRIVER endpoint.
         *
         * /api/drivers
         * is NOT used here.
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

        if (!response.ok) {
          throw new Error(
            result?.message ??
              result?.error ??
              `Unable to load driver. HTTP ${response.status}`
          );
        }

        const apiDriver =
          result?.data ??
          result?.driver ??
          result;

        if (
          !apiDriver ||
          String(apiDriver.id) !==
            String(driverId)
        ) {
          throw new Error(
            `Driver ${driverId} not found.`
          );
        }

        const normalized =
          normalizeDriver(apiDriver);

        if (!normalized) {
          throw new Error(
            "Invalid driver data."
          );
        }

        if (!cancelled) {
          setDriver(normalized);
          setError("");
        }
      } catch (err) {
        console.error(
          "DRIVER_BOOK_LOAD_ERROR:",
          err
        );

        if (!cancelled) {
          setDriver(null);

          setError(
            err instanceof Error
              ? err.message
              : "Unable to load driver."
          );
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

  /* ------------------------------------------------------------------------ */
  /* PASSENGERS / PRICE                                                       */
  /* ------------------------------------------------------------------------ */

  const passengerCount = Math.max(
    1,
    Number(passengers) || 1
  );

  const basePrice =
    Number(driver?.price) || 0;

  const total = useMemo(() => {
    if (!basePrice) return 0;

    if (passengerCount <= 4) {
      return basePrice;
    }

    return (
      basePrice +
      (passengerCount - 4) * 150
    );
  }, [
    basePrice,
    passengerCount,
  ]);

  /* ------------------------------------------------------------------------ */
  /* CALENDAR                                                                 */
  /* ------------------------------------------------------------------------ */

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

  const firstDayOfMonth =
    monthStart.getDay();

  const monthName =
    viewDate.toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  function buildDateValue(
    day: number
  ) {
    return `${viewDate.getFullYear()}-${String(
      viewDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  function selectDate(
    value: string
  ) {
    setDate(value);
    setCalendarOpen(false);
    setTimeOpen(false);
  }

  function previousMonth() {
    const previous = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() - 1,
      1
    );

    const currentMonth =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

    if (previous < currentMonth) {
      return;
    }

    setViewDate(previous);
  }

  function nextMonth() {
    setViewDate(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        1
      )
    );
  }

  /* ------------------------------------------------------------------------ */
  /* TIME                                                                     */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /* SUBMIT BOOKING                                                           */
  /* ------------------------------------------------------------------------ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!driver) {
      setError(
        "Driver information is unavailable."
      );
      return;
    }

    setError("");

    if (!date) {
      setError(
        "Please select a date."
      );
      return;
    }

    if (!time) {
      setError(
        "Please select a pickup time."
      );
      return;
    }

    if (!pickup.trim()) {
      setError(
        "Please enter your pickup location."
      );
      return;
    }

    if (!destination.trim()) {
      setError(
        "Please enter your destination."
      );
      return;
    }

    if (
      passengerCount < 1 ||
      !Number.isFinite(
        passengerCount
      )
    ) {
      setError(
        "Please enter a valid passenger count."
      );
      return;
    }

    if (
      driver.seats > 0 &&
      passengerCount > driver.seats
    ) {
      setError(
        `This vehicle can carry up to ${driver.seats} passengers.`
      );
      return;
    }

    if (date < todayString) {
      setError(
        "Please select today or a future date."
      );
      return;
    }

    if (date === todayString) {
      const now = new Date();

      const [hours, minutes] =
        time.split(":").map(Number);

      const selectedTime =
        new Date();

      selectedTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      if (selectedTime <= now) {
        setError(
          "Please select a future pickup time."
        );
        return;
      }
    }

    try {
      setSubmitting(true);

      const realDriverId =
        Number(driver.id);

      if (
        !Number.isInteger(
          realDriverId
        ) ||
        realDriverId <= 0
      ) {
        throw new Error(
          "Invalid driver ID."
        );
      }

      const response =
        await fetch(
          "/api/bookings",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              bookingType: "DRIVER",

              driverId:
                realDriverId,

              pickup:
                pickup.trim(),

              destination:
                destination.trim(),

              date,

              time,

              passengers:
                passengerCount,

              notes:
                `Driver: ${driver.name}`,

              price: total,
            }),
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

      if (!response.ok) {
        throw new Error(
          result?.error ??
            result?.message ??
            `Unable to create ride booking. HTTP ${response.status}`
        );
      }

      const bookingId =
        result?.bookingId ??
        result?.booking?.id ??
        result?.data?.bookingId ??
        result?.data?.booking?.id ??
        result?.data?.id ??
        result?.id;

      if (!bookingId) {
        throw new Error(
          "Booking was created but booking ID was not returned."
        );
      }

      router.push(
        `/bookings/${bookingId}`
      );
    } catch (err) {
      console.error(
        "DRIVER_BOOKING_ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create this ride booking."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* LOADING                                                                  */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-black/5" />

            <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
              <div className="h-[650px] rounded-3xl bg-black/5" />

              <div className="h-[650px] rounded-3xl bg-black/5" />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* DRIVER ERROR                                                             */
  /* ------------------------------------------------------------------------ */

  if (!driver) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-24 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
            <Car size={26} />
          </div>

          <h1 className="mt-5 text-xl font-semibold">
            Driver unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/45">
            {error ||
              "Driver information is unavailable."}
          </p>

          <div className="mt-7 flex justify-center gap-3">
            <Link
              href="/drivers"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white transition hover:bg-black/80"
            >
              <ArrowLeft size={14} />
              Back to drivers
            </Link>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="rounded-xl border border-black/10 px-5 py-3 text-xs font-semibold transition hover:bg-black/5"
            >
              Try again
            </button>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* MAIN UI                                                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-7 lg:px-8">
        <Link
          href={`/drivers/${driver.id}`}
          className="inline-flex items-center gap-2 text-xs text-black/50 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to driver
        </Link>

        <div className="mt-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
            BOOK A LOCAL RIDE
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Ride with {driver.name}
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-5 text-black/45">
            Choose your date, pickup location,
            destination and passengers to
            request your Vistara local ride.
          </p>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_380px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/10 p-5 sm:p-7"
          >
            {/* DRIVER HEADER */}

            <div className="flex items-center gap-3 border-b border-black/10 pb-5">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-black/5">
                {driver.image ? (
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Users size={20} />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold">
                    {driver.name}
                  </h2>

                  {driver.verified && (
                    <ShieldCheck
                      size={13}
                    />
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-black/45">
                  <span className="flex items-center gap-1">
                    <Star
                      size={10}
                      fill="currentColor"
                    />
                    {driver.rating.toFixed(
                      1
                    )}
                  </span>

                  <span>·</span>

                  <span>
                    {driver.vehicle}
                  </span>

                  <span>·</span>

                  <span>
                    {driver.seats} seats
                  </span>
                </div>
              </div>
            </div>

            {/* DATE + TIME */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Date">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setCalendarOpen(
                        (value) =>
                          !value
                      );

                      setTimeOpen(false);

                      if (date) {
                        setViewDate(
                          new Date(
                            `${date}T00:00:00`
                          )
                        );
                      }
                    }}
                    className="flex h-13 w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 text-left transition hover:border-black/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
                        <CalendarDays
                          size={16}
                        />
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-widest text-black/35">
                          Travel date
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            date
                              ? "font-semibold text-black"
                              : "text-black/35"
                          }`}
                        >
                          {date
                            ? formatDate(
                                date
                              )
                            : "Choose your date"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={15}
                      className={
                        calendarOpen
                          ? "rotate-90 text-black/25"
                          : "text-black/25"
                      }
                    />
                  </button>

                  {calendarOpen && (
                    <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[330px] max-w-[calc(100vw-40px)] rounded-3xl border border-black/10 bg-white p-4 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={
                            previousMonth
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
                        >
                          <ChevronLeft
                            size={17}
                          />
                        </button>

                        <div className="text-sm font-bold">
                          {monthName}
                        </div>

                        <button
                          type="button"
                          onClick={nextMonth}
                          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
                        >
                          <ChevronRight
                            size={17}
                          />
                        </button>
                      </div>

                      <div className="mt-5 grid grid-cols-7">
                        {[
                          "S",
                          "M",
                          "T",
                          "W",
                          "T",
                          "F",
                          "S",
                        ].map(
                          (
                            day,
                            index
                          ) => (
                            <div
                              key={`${day}-${index}`}
                              className="text-center text-[9px] font-bold uppercase text-black/30"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-7 gap-y-1">
                        {Array.from({
                          length:
                            firstDayOfMonth,
                        }).map(
                          (_, index) => (
                            <div
                              key={`empty-${index}`}
                              className="h-9"
                            />
                          )
                        )}

                        {Array.from({
                          length:
                            daysInMonth,
                        }).map(
                          (_, index) => {
                            const day =
                              index + 1;

                            const value =
                              buildDateValue(
                                day
                              );

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
                              currentDate <
                              today;

                            const isSelected =
                              value ===
                              date;

                            const isToday =
                              value ===
                              todayString;

                            return (
                              <button
                                key={value}
                                type="button"
                                disabled={
                                  isPast
                                }
                                onClick={() =>
                                  selectDate(
                                    value
                                  )
                                }
                                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs transition ${
                                  isSelected
                                    ? "bg-black font-bold text-white"
                                    : isPast
                                      ? "cursor-not-allowed text-black/15"
                                      : "text-black hover:bg-black/5"
                                } ${
                                  isToday &&
                                  !isSelected
                                    ? "font-bold ring-1 ring-black"
                                    : ""
                                }`}
                              >
                                {day}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setDate("");
                            setCalendarOpen(
                              false
                            );
                          }}
                          className="text-[10px] font-semibold text-black/40 hover:text-black"
                        >
                          Clear
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const current =
                              new Date();

                            setViewDate(
                              current
                            );

                            setDate(
                              getLocalDateString(
                                current
                              )
                            );

                            setCalendarOpen(
                              false
                            );
                          }}
                          className="rounded-full bg-black px-3 py-1.5 text-[10px] font-bold text-white"
                        >
                          Today
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Pickup time">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setTimeOpen(
                        (value) =>
                          !value
                      );

                      setCalendarOpen(
                        false
                      );
                    }}
                    className="flex h-13 w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-3.5 text-left transition hover:border-black/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
                        <Clock3
                          size={16}
                        />
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-widest text-black/35">
                          Pickup time
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            time
                              ? "font-semibold text-black"
                              : "text-black/35"
                          }`}
                        >
                          {time
                            ? formatTime(
                                time
                              )
                            : "Choose pickup time"}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={15}
                      className={
                        timeOpen
                          ? "rotate-90 text-black/25"
                          : "text-black/25"
                      }
                    />
                  </button>

                  {timeOpen && (
                    <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[300px] max-w-[calc(100vw-40px)] rounded-3xl border border-black/10 bg-white p-4 shadow-2xl">
                      <div className="flex items-start justify-between border-b border-black/5 pb-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-black/35">
                            Pickup time
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            When should we pick you up?
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setTimeOpen(
                              false
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-black/30 hover:bg-black/5"
                        >
                          <X
                            size={14}
                          />
                        </button>
                      </div>

                      <div className="mt-4 max-h-[250px] overflow-y-auto pr-1">
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map(
                            (slot) => {
                              const selected =
                                time ===
                                slot;

                              let disabled =
                                false;

                              if (
                                date ===
                                todayString
                              ) {
                                const now =
                                  new Date();

                                const [
                                  hours,
                                  minutes,
                                ] =
                                  slot
                                    .split(
                                      ":"
                                    )
                                    .map(
                                      Number
                                    );

                                const slotTime =
                                  new Date();

                                slotTime.setHours(
                                  hours,
                                  minutes,
                                  0,
                                  0
                                );

                                disabled =
                                  slotTime <=
                                  now;
                              }

                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  disabled={
                                    disabled
                                  }
                                  onClick={() => {
                                    setTime(
                                      slot
                                    );
                                    setTimeOpen(
                                      false
                                    );
                                  }}
                                  className={`relative rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition ${
                                    disabled
                                      ? "cursor-not-allowed border-black/5 bg-black/[0.02] text-black/15"
                                      : selected
                                        ? "border-black bg-black text-white"
                                        : "border-black/10 bg-white text-black/60 hover:bg-black/5 hover:text-black"
                                  }`}
                                >
                                  {formatTime(
                                    slot
                                  )}

                                  {selected && (
                                    <Check
                                      size={
                                        11
                                      }
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
                            setTimeOpen(
                              false
                            );
                          }}
                          className="text-[10px] font-semibold text-black/40 hover:text-black"
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

            {/* PICKUP */}

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
                    onChange={(event) =>
                      setPickup(
                        event.target.value
                      )
                    }
                    placeholder="Where should the driver pick you up?"
                    className="input pl-9"
                    required
                  />
                </div>
              </Field>
            </div>

            {/* DESTINATION */}

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
                    onChange={(event) =>
                      setDestination(
                        event.target.value
                      )
                    }
                    placeholder="Where are you going?"
                    className="input pl-9"
                    required
                  />
                </div>
              </Field>
            </div>

            {/* PASSENGERS */}

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
                    max={
                      driver.seats ||
                      20
                    }
                    value={passengers}
                    onChange={(event) =>
                      setPassengers(
                        event.target.value
                      )
                    }
                    className="input pl-9"
                    required
                  />
                </div>

                <p className="mt-1.5 text-[9px] text-black/35">
                  Vehicle capacity:{" "}
                  {driver.seats} passengers
                </p>
              </Field>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-xs font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Confirming ride..."
                : "Confirm ride"}

              {!submitting && (
                <ArrowRight size={14} />
              )}
            </button>

            <p className="mt-3 text-center text-[9px] leading-4 text-black/35">
              Your ride request will be
              recorded in your Vistara
              bookings.
            </p>
          </form>

          {/* ---------------------------------------------------------------- */}
          {/* SUMMARY                                                          */}
          {/* ---------------------------------------------------------------- */}

          <aside className="h-fit rounded-3xl border border-black/10 p-5 sm:p-6 lg:sticky lg:top-20">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
              RIDE SUMMARY
            </p>

            <h2 className="mt-2 text-base font-semibold">
              Your local ride
            </h2>

            <div className="mt-5 flex items-center gap-3 border-b border-black/10 pb-5">
              <div className="h-11 w-11 overflow-hidden rounded-xl bg-black/5">
                {driver.image ? (
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Users size={18} />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">
                  {driver.name}
                </p>

                <p className="mt-1 text-[10px] text-black/45">
                  {driver.vehicle}
                </p>
              </div>
            </div>

            <div className="space-y-4 py-5">
              <SummaryRow
                icon={
                  <CalendarDays
                    size={14}
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
                  <Clock3 size={14} />
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
                  <MapPin size={14} />
                }
                label="Route"
                value={
                  pickup &&
                  destination
                    ? `${pickup} → ${destination}`
                    : "Add your route"
                }
              />

              <SummaryRow
                icon={
                  <Users size={14} />
                }
                label="Passengers"
                value={`${passengerCount}`}
              />
            </div>

            <div className="border-t border-black/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/50">
                  Ride fare
                </span>

                <span className="text-base font-semibold">
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-black/35">
                Final fare may depend on
                the selected route and ride
                details.
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-black/5 px-3 py-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={14}
                />

                <p className="text-[9px] leading-4 text-black/60">
                  {driver.verified
                    ? "Vistara verified local driver"
                    : "Vistara local driver"}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-[9px] text-black/40">
                <span>
                  {driver.totalTrips}+
                  trips
                </span>

                <span>
                  {driver.experienceYears}{" "}
                  years experience
                </span>
              </div>
            </div>

            {driver.services.length >
              0 && (
              <div className="mt-5 border-t border-black/10 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/35">
                  SERVICES
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {driver.services
                    .slice(0, 6)
                    .map(
                      (service) => (
                        <span
                          key={service}
                          className="rounded-full bg-black/5 px-2.5 py-1 text-[9px] text-black/55"
                        >
                          {service}
                        </span>
                      )
                    )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid
            rgba(0, 0, 0, 0.12);
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
          border-color: rgba(
            0,
            0,
            0,
            0.4
          );
          box-shadow:
            0 0 0 3px
            rgba(0, 0, 0, 0.05);
        }

        .input::placeholder {
          color: rgba(
            0,
            0,
            0,
            0.35
          );
        }

        .input[type="number"]::-webkit-inner-spin-button,
        .input[type="number"]::-webkit-outer-spin-button {
          opacity: 0.5;
        }
      `}</style>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* FIELD                                                                      */
/* -------------------------------------------------------------------------- */

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
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* SUMMARY ROW                                                                */
/* -------------------------------------------------------------------------- */

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