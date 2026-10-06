"use client";

import Link from "next/link";
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

    images?: {
      url?: string;
      imageUrl?: string;
      src?: string;
      isPrimary?: boolean;
    }[];
  };
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/bookings",
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
            "Failed to load bookings"
        );
      }

      setBookings(data.bookings || []);
    } catch (error: any) {
      console.error(
        "BOOKINGS_LIST_ERROR:",
        error
      );

      setError(
        error?.message ||
          "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6">

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
            VISTARA
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-black/50">
            All your bookings and order details.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl bg-neutral-100"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          bookings.length === 0 && (
            <div className="rounded-2xl border border-black/10 px-6 py-16 text-center">

              <h2 className="text-lg font-bold">
                No bookings yet
              </h2>

              <p className="mt-2 text-sm text-black/50">
                Your confirmed stays will appear
                here.
              </p>

              <Link
                href="/stays"
                className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
              >
                Explore stays
              </Link>

            </div>
          )}

        {/* BOOKING LIST */}

        {!loading &&
          bookings.length > 0 && (
            <div className="space-y-3">

              {bookings.map((booking) => {

                const image =
                  booking.property?.images?.find(
                    (item) =>
                      item.isPrimary
                  )?.url ||
                  booking.property?.images?.[0]
                    ?.url ||
                  booking.property?.images?.[0]
                    ?.imageUrl ||
                  booking.property?.images?.[0]
                    ?.src ||
                  "";

                const title =
                  booking.property?.title ||
                  booking.property?.name ||
                  "Vistara Stay";

                const location =
                  booking.property?.location ||
                  booking.property?.city ||
                  "India";

                const amount =
                  Number(
                    booking.totalAmount || 0
                  );

                return (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-black/10 bg-white p-4 transition hover:border-black/25"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                      {/* IMAGE */}

                      {image && (
                        <img
                          src={image}
                          alt={title}
                          className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
                        />
                      )}

                      {/* DETAILS */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">
                              Booking ID
                            </p>

                            <p className="mt-1 text-sm font-bold">
                              #{booking.id}
                            </p>

                          </div>

                          <span className="rounded-full bg-black px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                            {booking.status}
                          </span>

                        </div>

                        <h2 className="mt-3 text-base font-bold">
                          {title}
                        </h2>

                        <p className="mt-1 text-xs text-black/50">
                          {location}
                        </p>

                        {/* TRIP INFO */}

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-black/60">

                          <span>
                            {formatDate(
                              booking.checkIn
                            )}
                            {" → "}
                            {formatDate(
                              booking.checkOut
                            )}
                          </span>

                          <span>
                            {booking.guests}{" "}
                            {booking.guests === 1
                              ? "Guest"
                              : "Guests"}
                          </span>

                          <span>
                            {booking.nights}{" "}
                            {booking.nights === 1
                              ? "Night"
                              : "Nights"}
                          </span>

                        </div>

                      </div>

                      {/* PRICE + VIEW */}

                      <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4 sm:block sm:border-t-0 sm:pt-0 sm:text-right">

                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-black/40">
                            Total
                          </p>

                          <p className="mt-1 text-base font-bold">
                            ₹
                            {amount.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>

                        <Link
                          href={`/bookings/${booking.id}`}
                          className="inline-flex items-center rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black/85"
                        >
                          View
                        </Link>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </section>

      <Footer />
    </main>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(value: string) {
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