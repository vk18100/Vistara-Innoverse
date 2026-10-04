"use client";
import {useState} from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";

const stayData = {
  title: "Luxury Stay in Patna",
  location: "Patna, Bihar",
  image: "/images/stay.jpg",
  price: 2499,
  rating: 4.8,
  duration: "1 night",
};

const experienceData = {
  title: "Jaipur Palace Discovery",
  location: "Jaipur, Rajasthan",
  image: "/images/Cultural Crown.jpg",
  price: 999,
  rating: 4.8,
  duration: "3 hours",
};

const tripData = {
  title: "Himalayan Adventure Trip",
  location: "Manali, Himachal Pradesh",
  image: "/images/download (6).jpg",
  price: 4999,
  rating: 4.9,
  duration: "3 days",
};

const exploreData = {
  title: "Heritage City Explorer",
  location: "Jaipur, Rajasthan",
  image: "/images/download (4).jpg",
  price: 1499,
  rating: 4.8,
  duration: "1 day",
};

export default function OrderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
 const [showConfirmation, setShowConfirmation] = useState(false);

  const id = params.id;
  const type = searchParams.get("type") || "stay";

  let item = stayData;

  if (type === "experience") {
    item = experienceData;
  }

  if (type === "trip") {
    item = tripData;
  }

  if (type === "explore") {
    item = exploreData;
  }

  const typeLabel =
    type === "stay"
      ? "Stay"
      : type === "experience"
      ? "Experience"
      : type === "trip"
      ? "Trip"
      : "Explore";

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#222]">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-[#E7E0D5] bg-[#F8F5EF]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6">

          <Link
            href="/"
            className="text-[27px] font-semibold tracking-[-1px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Vistara
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium transition hover:text-[#B58A3A]"
            >
              Home
            </Link>

            <Link
              href="/stays"
              className="text-sm font-medium transition hover:text-[#B58A3A]"
            >
              Stays
            </Link>

            <Link
              href="/experiences"
              className="text-sm font-medium transition hover:text-[#B58A3A]"
            >
              Experiences
            </Link>

            <Link
              href="/explore"
              className="text-sm font-medium transition hover:text-[#B58A3A]"
            >
              Explore
            </Link>

            <Link
              href="/trips"
              className="text-sm font-medium transition hover:text-[#B58A3A]"
            >
              Trips
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="rounded-full border border-[#DCD4C8] bg-white px-5 py-2.5 text-sm font-medium transition hover:border-[#B58A3A]"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE */}

      <div className="mx-auto max-w-[1180px] px-6 py-10">

        {/* BACK */}

        <Link
          href={
            type === "stay"
              ? "/stays"
              : type === "experience"
              ? "/experiences"
              : type === "trip"
              ? "/trips"
              : "/explore"
          }
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#555] transition hover:text-[#B58A3A]"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        {/* TITLE */}

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#B58A3A]">
            {typeLabel} booking
          </p>

          <h1
            className="text-4xl font-semibold tracking-[-1px] md:text-5xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Complete your booking
          </h1>

          <p className="mt-3 text-[#777]">
            Review your selection and provide your booking details.
          </p>
        </div>

        {/* CONTENT */}

        <div className="grid gap-8 lg:grid-cols-[1fr_430px]">

          {/* LEFT */}

          <section>

            {/* ITEM CARD */}

            <div className="overflow-hidden rounded-[28px] border border-[#E4DDD2] bg-white">

              <div className="grid md:grid-cols-[240px_1fr]">

                <div className="h-[240px] md:h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-7">

                  <div className="mb-3 flex items-center justify-between">

                    <span className="rounded-full bg-[#F3EEE5] px-3 py-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-[#8C6A2D]">
                      {typeLabel}
                    </span>

                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star
                        size={15}
                        fill="#B58A3A"
                        className="text-[#B58A3A]"
                      />
                      {item.rating}
                    </div>

                  </div>

                  <h2
                    className="text-2xl font-semibold"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {item.title}
                  </h2>

                  <div className="mt-4 flex items-center gap-2 text-sm text-[#777]">
                    <MapPin size={16} />
                    {item.location}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <div className="rounded-2xl bg-[#F8F5EF] px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs text-[#888]">
                        <Clock3 size={14} />
                        Duration
                      </div>

                      <p className="text-sm font-semibold">
                        {item.duration}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5EF] px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs text-[#888]">
                        <Users size={14} />
                        Guests
                      </div>

                      <p className="text-sm font-semibold">
                        2 Guests
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* BOOKING DETAILS */}

            <div className="mt-7 rounded-[28px] border border-[#E4DDD2] bg-white p-7">

              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your details
              </h3>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-[#DDD5C9] bg-[#FCFAF7] px-4 py-3.5 text-sm outline-none transition focus:border-[#B58A3A]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-2xl border border-[#DDD5C9] bg-[#FCFAF7] px-4 py-3.5 text-sm outline-none transition focus:border-[#B58A3A]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                    />

                    <input
                      type="date"
                      className="w-full rounded-2xl border border-[#DDD5C9] bg-[#FCFAF7] px-11 py-3.5 text-sm outline-none transition focus:border-[#B58A3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Guests
                  </label>

                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                    />

                    <select
                      className="w-full appearance-none rounded-2xl border border-[#DDD5C9] bg-[#FCFAF7] px-11 py-3.5 text-sm outline-none transition focus:border-[#B58A3A]"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                  Special request
                </label>

                <textarea
                  rows={4}
                  placeholder="Anything we should know?"
                  className="w-full resize-none rounded-2xl border border-[#DDD5C9] bg-[#FCFAF7] px-4 py-3.5 text-sm outline-none transition focus:border-[#B58A3A]"
                />
              </div>

            </div>

          </section>

          {/* RIGHT — PRICE */}

          <aside>

            <div className="sticky top-[100px] rounded-[28px] border border-[#E1D9CD] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.06)]">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-[#888]">
                    {typeLabel} price
                  </p>

                  <p className="mt-1 text-3xl font-semibold">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={15}
                    fill="#B58A3A"
                    className="text-[#B58A3A]"
                  />
                  {item.rating}
                </div>

              </div>

              <div className="my-6 h-px bg-[#ECE5DB]" />

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-[#777]">
                    Base price
                  </span>

                  <span>
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#777]">
                    Service fee
                  </span>

                  <span>
                    ₹0
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#777]">
                    Taxes
                  </span>

                  <span>
                    Included
                  </span>
                </div>

              </div>

              <div className="my-6 h-px bg-[#ECE5DB]" />

              <div className="flex items-center justify-between">

                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-semibold">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>

              </div>

              {/* CONFIRM */}

             <button
  type="button"
  onClick={() => setShowConfirmation(true)}
  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#25221E] px-6 py-4 font-semibold text-white transition hover:bg-[#B58A3A] active:scale-[0.99]"
>
  Confirm & Book
  <ChevronRight size={18} />
</button>

              <p className="mt-4 text-center text-xs leading-5 text-[#888]">
                You won't be charged until your booking is confirmed.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F8F5EF] p-4">

                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#B58A3A]"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Vistara protected booking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#777]">
                    Your booking information is handled securely.
                  </p>
                </div>

              </div>

            </div>

          </aside>

        </div>
{/* CONFIRMATION POPUP */}

{showConfirmation && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5 backdrop-blur-sm">

    <div className="relative w-full max-w-[460px] overflow-hidden rounded-[32px] border border-[#E4DDD2] bg-[#FCFAF7] p-8 text-center shadow-[0_30px_100px_rgba(30,25,15,0.25)]">

      {/* GOLD TOP */}
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-[#B58A3A]" />

      {/* SUCCESS ICON */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F1E7D3]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B58A3A] text-2xl font-bold text-white">
          ✓
        </div>
      </div>

      {/* CONTENT */}
      <p className="mt-7 text-xs font-bold uppercase tracking-[3px] text-[#B58A3A]">
        Booking confirmed
      </p>

      <h2
        className="mt-3 text-3xl font-semibold text-[#25221E]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Your order is confirmed
      </h2>

      <p className="mx-auto mt-4 max-w-[350px] text-sm leading-6 text-[#777]">
        Your {typeLabel.toLowerCase()} has been successfully booked.
        We’ll keep your booking details safe and available in your profile.
      </p>

      {/* ORDER CARD */}
      <div className="mt-7 rounded-[22px] border border-[#E4DDD2] bg-white p-5 text-left">

        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-xs uppercase tracking-[1.5px] text-[#999]">
              {typeLabel}
            </p>

            <p
              className="mt-1 text-lg font-semibold text-[#25221E]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {item.title}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs text-[#999]">
              Total
            </p>

            <p className="mt-1 text-lg font-bold text-[#25221E]">
              ₹{item.price.toLocaleString("en-IN")}
            </p>
          </div>

        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-[#777]">
          <MapPin size={15} className="text-[#B58A3A]" />
          {item.location}
        </div>

      </div>

      {/* ACTIONS */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">

        <Link
          href="/profile"
          className="flex flex-1 items-center justify-center rounded-full bg-[#25221E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B58A3A]"
        >
          View booking
        </Link>

        <Link
          href="/"
          className="flex flex-1 items-center justify-center rounded-full border border-[#DCD3C7] bg-white px-6 py-3.5 text-sm font-semibold text-[#25221E] transition hover:border-[#B58A3A]"
        >
          Back home
        </Link>

      </div>

      <p className="mt-5 text-xs text-[#999]">
        Booking ID: VS-{id}
      </p>

    </div>
  </div>
)}
      </div>

    </main>
  );
}