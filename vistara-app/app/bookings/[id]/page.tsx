"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type Booking = {
  id: number;

  checkIn: string;
  checkOut: string;

  guests: number;
  nights: number;

  totalAmount: number | string;

  status: string;
  paymentStatus: string;

  property?: {
    id: number;

    name?: string;
    title?: string;

    city?: string;
    location?: string;

    pricePerNight?: number | string;

    images?: {
      url?: string;
      imageUrl?: string;
      src?: string;
      isPrimary?: boolean;
    }[];
  };
};

export default function BookingIdPage() {
  const params = useParams();

  const bookingId = String(
    params?.id || ""
  );

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      setLoading(false);
      return;
    }

    async function loadBooking() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/bookings/${encodeURIComponent(
            bookingId
          )}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const text = await response.text();

        let data: any = null;

        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = null;
        }

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message ||
              "Booking not found."
          );
        }

        setBooking(
          data.booking ||
            data.data ||
            data.order
        );
      } catch (err: any) {
        console.error(
          "BOOKING_DETAIL_ERROR:",
          err
        );

        setError(
          err?.message ||
            "Unable to load booking."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [bookingId]);

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="animate-pulse space-y-5">
            <div className="mx-auto h-10 w-48 rounded bg-neutral-100" />
            <div className="h-64 rounded-2xl bg-neutral-100" />
            <div className="h-40 rounded-2xl bg-neutral-100" />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* -------------------------------------------------------
     ERROR
  ------------------------------------------------------- */

  if (!booking) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="flex min-h-[65vh] items-center justify-center px-5">
          <div className="text-center">

            <h1 className="text-2xl font-bold">
              Booking not found
            </h1>

            <p className="mt-2 text-sm text-black/50">
              {error ||
                "This booking could not be found."}
            </p>

            <Link
              href="/bookings"
              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
            >
              Back to bookings
            </Link>

          </div>
        </div>

        <Footer />
      </main>
    );
  }

  /* -------------------------------------------------------
     DATA
  ------------------------------------------------------- */

  const title =
    booking.property?.title ||
    booking.property?.name ||
    "Vistara Stay";

  const location =
    booking.property?.location ||
    booking.property?.city ||
    "India";

  const image =
    booking.property?.images?.find(
      (item) => item.isPrimary
    )?.url ||
    booking.property?.images?.[0]?.url ||
    booking.property?.images?.[0]?.imageUrl ||
    booking.property?.images?.[0]?.src ||
    "";

  const total = Number(
    booking.totalAmount || 0
  );

  const confirmed =
    booking.status === "CONFIRMED";

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6">

        {/* CONFIRMATION */}

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
            ✓
          </div>

          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
            Booking
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {confirmed
              ? "Your booking is confirmed"
              : "Your booking has been created"}
          </h1>

          <p className="mt-2 text-sm text-black/50">
            Your Vistara stay booking is recorded
            successfully.
          </p>

          {/* BOOKING ID */}

          <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-black/10 px-4 py-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
              Booking ID
            </span>

            <span className="text-xs font-bold">
              #{booking.id}
            </span>
          </div>

        </div>

        {/* CONTENT */}

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_320px]">

          {/* LEFT */}

          <div className="space-y-5">

            {/* STAY */}

            <div className="overflow-hidden rounded-2xl border border-black/10">

              {image && (
                <img
                  src={image}
                  alt={title}
                  className="h-64 w-full object-cover"
                />
              )}

              <div className="p-5">

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">
                  Stay
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-black/50">
                  {location}
                </p>

              </div>

            </div>

            {/* DETAILS */}

            <div className="rounded-2xl border border-black/10 p-5">

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">
                Booking details
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Your reservation
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <Info
                  label="Booking ID"
                  value={`#${booking.id}`}
                />

                <Info
                  label="Status"
                  value={booking.status}
                />

                <Info
                  label="Check in"
                  value={formatDate(
                    booking.checkIn
                  )}
                />

                <Info
                  label="Check out"
                  value={formatDate(
                    booking.checkOut
                  )}
                />

                <Info
                  label="Guests"
                  value={`${booking.guests} ${
                    booking.guests === 1
                      ? "Guest"
                      : "Guests"
                  }`}
                />

                <Info
                  label="Duration"
                  value={`${booking.nights} ${
                    booking.nights === 1
                      ? "Night"
                      : "Nights"
                  }`}
                />

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="rounded-2xl border border-black/10 p-5">

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">
                Order summary
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-black/50">
                    Booking ID
                  </span>

                  <span className="font-bold">
                    #{booking.id}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-black/50">
                    Payment
                  </span>

                  <span className="font-bold">
                    {booking.paymentStatus}
                  </span>
                </div>

                <div className="border-t border-black/10 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-black/50">
                      Total
                    </span>

                    <span className="text-2xl font-bold">
                      ₹
                      {total.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* VIEW STAY */}

              {booking.property?.id && (
                <Link
                  href={`/stays/${booking.property.id}`}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition hover:bg-black/85"
                >
                  View stay
                </Link>
              )}

              {/* ALL BOOKINGS */}

              <Link
                href="/bookings"
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-bold transition hover:border-black"
              >
                All bookings
              </Link>

            </div>

          </aside>

        </div>

      </section>

      <Footer />
    </main>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/[0.035] p-3.5">
      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/40">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(value?: string) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}