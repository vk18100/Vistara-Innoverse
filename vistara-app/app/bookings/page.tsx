"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch("/api/bookings", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load booking"
          );
        }

        const bookings = data.bookings || [];

        if (bookings.length > 0) {
          setBooking(bookings[0]);
        }
      } catch (error) {
        console.error("BOOKING_PAGE_ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xs text-slate-500">
            Loading booking...
          </p>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="font-serif text-2xl font-semibold">
            No booking found
          </h1>

          <p className="mt-2 text-xs text-slate-500">
            Please select a stay or experience first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-5 py-10">

        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          BOOKING
        </p>

        <h1 className="mt-2 font-serif text-3xl font-semibold">
          Complete your booking
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">

          {/* DETAILS */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <h2 className="font-serif text-xl font-semibold">
              {booking.property?.name ||
                booking.property?.title ||
                "Your Vistara stay"}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              {booking.property?.city ||
                booking.property?.location ||
                "India"}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] uppercase text-slate-400">
                  Check-in
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {new Date(
                    booking.checkIn
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] uppercase text-slate-400">
                  Check-out
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {new Date(
                    booking.checkOut
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] uppercase text-slate-400">
                  Guests
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {booking.guests}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] uppercase text-slate-400">
                  Nights
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {booking.nights}
                </p>
              </div>

            </div>

          </div>


          {/* PAYMENT */}

          <div className="h-fit rounded-2xl border border-slate-200 p-5">

            <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
              TOTAL
            </p>

            <p className="mt-2 text-2xl font-semibold">
              ₹
              {Number(
                booking.totalAmount || 0
              ).toLocaleString("en-IN")}
            </p>

            <button
              onClick={() =>
                router.push(
                  `/bookings/${booking.id}`
                )
              }
              className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Confirm & Pay
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}