
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState("2");

  const price = 2500;
  const nights = 3;
  const totalPrice = price * nights;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/property/id"
          className="text-sm font-medium text-[#03045e] transition hover:text-[#023e8a]"
        >
          &larr; Back to Property Details
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-[#03045e]">
          Confirm your Stay
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Booking Form */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#03045e]">
              Your trip
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 focus:border-[#03045e] focus:outline-none focus:ring-2 focus:ring-[#03045e]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>

                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#03045e] focus:outline-none focus:ring-2 focus:ring-[#03045e]"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-5">
              <h3 className="font-semibold text-[#03045e]">
                Price Summary
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                Price per night: ₹{price}
              </p>

              <p className="text-sm leading-6 text-gray-700">
                {nights} nights: ₹{totalPrice}
              </p>
            </div>

            <button
              onClick={() =>
                alert(
                  `Booking confirmed! Total price: ₹${totalPrice}`
                )
              }
              className="mt-8 w-full rounded-2xl bg-[#03045e] px-4 py-3 text-lg font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Confirm Booking
            </button>
          </div>

          {/* Property Summary */}
          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src="/property-image.jpg"
                alt="Property"
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold text-[#03045e]">
                  Beautiful Beach House
                </h2>

                <p className="mt-2 text-sm">★ 4.8</p>

                <p className="mt-1 text-sm text-gray-500">
                  Malibu, California
                </p>

                <p className="mt-2 text-lg font-semibold text-[#03045e]">
                  ₹{totalPrice}
                </p>
              </div>
            </div>

            <div className="my-6 border-t" />

            <h3 className="font-semibold text-[#03045e]">
              Price details
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>
                  ₹{price} × {nights} nights
                </span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Service fee</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="my-5 border-t" />

            <div className="flex justify-between font-semibold text-[#03045e]">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
