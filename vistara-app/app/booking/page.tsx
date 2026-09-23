"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const bookings = [
  {
    id: "VS-2026-1048",
    type: "Stay",
    title: "A peaceful stay by the Ganges",
    location: "Varanasi, Uttar Pradesh",
    dates: "18 Oct – 21 Oct 2026",
    guests: "2 Guests",
    amount: "₹18,500",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "VS-2026-0981",
    type: "Experience",
    title: "Sunrise boat ride & old city walk",
    location: "Varanasi, Uttar Pradesh",
    dates: "19 Oct 2026",
    guests: "2 Guests",
    amount: "₹3,200",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "VS-2026-0714",
    type: "Stay",
    title: "Heritage retreat in Jaipur",
    location: "Jaipur, Rajasthan",
    dates: "12 Aug – 15 Aug 2026",
    guests: "2 Guests",
    amount: "₹15,800",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function BookingsPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mt-9">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              YOUR BOOKINGS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
              Bookings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Manage your stays, experiences and previous reservations
              from one place.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* FILTERS */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white">
            All bookings
          </button>

          <button className="rounded-full border border-[#DDE2E8] px-5 py-2.5 text-sm font-medium text-[#64748B] hover:border-[#03045E]">
            Stays
          </button>

          <button className="rounded-full border border-[#DDE2E8] px-5 py-2.5 text-sm font-medium text-[#64748B] hover:border-[#03045E]">
            Experiences
          </button>

          <button className="rounded-full border border-[#DDE2E8] px-5 py-2.5 text-sm font-medium text-[#64748B] hover:border-[#03045E]">
            Completed
          </button>

          <button className="rounded-full border border-[#DDE2E8] px-5 py-2.5 text-sm font-medium text-[#64748B] hover:border-[#03045E]">
            Cancelled
          </button>
        </div>

        {/* BOOKING LIST */}
        <div className="space-y-5">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="group overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_45px_rgba(3,4,94,0.05)] transition hover:shadow-[0_18px_55px_rgba(3,4,94,0.09)]"
            >
              <div className="flex flex-col md:flex-row">

                {/* IMAGE */}
                <div className="relative h-64 shrink-0 overflow-hidden md:h-auto md:w-72">
                  <img
                    src={booking.image}
                    alt={booking.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E] backdrop-blur">
                    {booking.type}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex flex-1 flex-col p-6 md:p-7">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C6A15B]">
                        {booking.status}
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-[#03045E]">
                        {booking.title}
                      </h2>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {booking.location}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                        booking.status === "Confirmed"
                          ? "bg-[#ECFDF5] text-emerald-700"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* META */}
                  <div className="mt-6 grid gap-4 border-y border-[#03045E]/10 py-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-[#94A3B8]">
                        DATES
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#03045E]">
                        {booking.dates}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#94A3B8]">
                        GUESTS
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#03045E]">
                        {booking.guests}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#94A3B8]">
                        TOTAL
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#03045E]">
                        {booking.amount}
                      </p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#94A3B8]">
                      Booking ID:{" "}
                      <span className="font-medium text-[#64748B]">
                        {booking.id}
                      </span>
                    </p>

                    <div className="flex gap-3">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
                      >
                        View details
                      </Link>

                      {booking.status === "Confirmed" && (
                        <button className="rounded-xl bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                          Manage booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAYMENT / INVOICE */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">

          <div className="rounded-[28px] border border-[#03045E]/10 bg-[#FAFAF8] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PAYMENTS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Payment history
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Review payments made for your Vistara bookings.
            </p>

            <Link
              href="/payments"
              className="mt-5 inline-block text-sm font-semibold text-[#0D21A1] hover:underline"
            >
              View payment history →
            </Link>
          </div>

          <div className="rounded-[28px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] to-white p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              NEED HELP?
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Something about a booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Get help with your reservation or booking details.
            </p>

            <Link
              href="/support"
              className="mt-5 inline-block text-sm font-semibold text-[#0D21A1] hover:underline"
            >
              Get support →
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}