"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Edit3,
  Home,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";

type BookingStatus =
  | "CONFIRMED"
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

type Booking = {
  id: string;
  bookingId: string;
  propertyName: string;
  propertyImage?: string;
  propertyLocation: string;

  guestName: string;
  guestEmail?: string;
  guestPhone?: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  nights: number;

  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  total: number;

  status: BookingStatus;

  paymentStatus?: string;
  paymentMethod?: string;

  bookedOn?: string;
  notes?: string;
};

const DEMO_BOOKING: Booking = {
  id: "demo-1",
  bookingId: "VST-2026-10482",

  propertyName: "The Heritage Villa",
  propertyImage:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  propertyLocation: "Patna, Bihar",

  guestName: "Aarav Sharma",
  guestEmail: "aarav.sharma@example.com",
  guestPhone: "+91 98765 43210",

  checkIn: "12 Oct 2026",
  checkOut: "15 Oct 2026",

  guests: 3,
  nights: 3,

  pricePerNight: 2800,
  cleaningFee: 700,
  serviceFee: 800,
  total: 9900,

  status: "CONFIRMED",

  paymentStatus: "Paid",
  paymentMethod: "Online payment",

  bookedOn: "02 Oct 2026",

  notes:
    "Guest requested early check-in if available.",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatus(status: string): BookingStatus {
  const value = status.toUpperCase();

  if (value === "CONFIRMED") return "CONFIRMED";
  if (value === "PENDING") return "PENDING";
  if (value === "COMPLETED") return "COMPLETED";
  if (value === "CANCELLED") return "CANCELLED";

  return "PENDING";
}

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        const response = await fetch(
          `/api/host/bookings/${params.id}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Booking not found.");
        }

        const result = await response.json();

        if (result?.data) {
          setBooking(result.data);
        } else {
          setBooking(DEMO_BOOKING);
        }
      } catch (error) {
        console.error(
          "BOOKING_DETAIL_ERROR:",
          error,
        );

        /*
         * Demo fallback.
         * Remove this when your API is fully connected.
         */
        setBooking(DEMO_BOOKING);
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [params.id]);

  async function deleteBooking() {
    if (!booking) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this booking? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/host/bookings/${booking.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete booking.",
        );
      }

      window.location.href = "/bookings";
    } catch (error) {
      console.error(
        "DELETE_BOOKING_ERROR:",
        error,
      );

      window.alert(
        "Unable to delete this booking right now.",
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <BookingSkeleton />;
  }

  if (!booking) {
    return <BookingNotFound />;
  }

  const status = getStatus(booking.status);

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* Header */}
      <header className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            <Link
              href="/host/bookings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
            >
              <ArrowLeft size={17} />
              Back to bookings
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/bookings/${booking.id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-bold text-[#44403C] transition hover:border-[#D9A441]/50 hover:bg-[#FFF8E8]"
              >
                <Edit3 size={16} />
                Edit
              </Link>

              <button
                type="button"
                onClick={deleteBooking}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-xl border border-[#9B4439]/20 bg-white px-4 py-2.5 text-sm font-bold text-[#9B4439] transition hover:bg-[#FFF1EF] disabled:opacity-50"
              >
                <Trash2 size={16} />
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Booking details
              </span>

              <StatusBadge status={status} />
            </div>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {booking.propertyName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#71717A]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {booking.propertyLocation}
              </span>

              <span className="text-[#D4D0C8]">
                |
              </span>

              <span>
                Booking ID:{" "}
                <strong className="text-[#18181B]">
                  {booking.bookingId}
                </strong>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D9A441]/25 bg-[#FFF8E8] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A651B]">
              Booking value
            </p>

            <p className="mt-1 font-serif text-3xl font-semibold">
              {formatMoney(booking.total)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Property */}
            <section className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-white">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="aspect-[4/3] overflow-hidden bg-[#F1F0EB] md:aspect-auto">
                  {booking.propertyImage ? (
                    <img
                      src={booking.propertyImage}
                      alt={booking.propertyName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[230px] items-center justify-center text-[#A8A29E]">
                      <Home size={42} />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                    Property
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    {booking.propertyName}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-[#71717A]">
                    <MapPin size={15} />
                    {booking.propertyLocation}
                  </p>

                  <Link
                    href={`/properties/${booking.id}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-xs font-bold transition hover:border-[#D9A441]/40 hover:bg-[#FFF8E8]"
                  >
                    <Home size={14} />
                    View property
                  </Link>
                </div>
              </div>
            </section>

            {/* Stay details */}
            <section className="rounded-[26px] border border-black/[0.07] bg-white p-6 sm:p-7">
              <SectionTitle
                icon={<CalendarDays size={18} />}
                title="Stay details"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoBox
                  label="Check-in"
                  value={booking.checkIn}
                  icon={<CalendarDays size={17} />}
                />

                <InfoBox
                  label="Check-out"
                  value={booking.checkOut}
                  icon={<CalendarDays size={17} />}
                />

                <InfoBox
                  label="Guests"
                  value={`${booking.guests} guests`}
                  icon={<Users size={17} />}
                />

                <InfoBox
                  label="Duration"
                  value={`${booking.nights} nights`}
                  icon={<Clock3 size={17} />}
                />
              </div>
            </section>

            {/* Guest */}
            <section className="rounded-[26px] border border-black/[0.07] bg-white p-6 sm:p-7">
              <SectionTitle
                icon={<User size={18} />}
                title="Guest information"
              />

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF8E8] text-[#9A711E]">
                  <User size={24} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-semibold">
                    {booking.guestName}
                  </h3>

                  <div className="mt-2 flex flex-col gap-2 text-sm text-[#71717A] sm:flex-row sm:gap-5">
                    {booking.guestEmail && (
                      <span className="inline-flex items-center gap-2">
                        <Mail size={14} />
                        {booking.guestEmail}
                      </span>
                    )}

                    {booking.guestPhone && (
                      <span className="inline-flex items-center gap-2">
                        <Phone size={14} />
                        {booking.guestPhone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Notes */}
            {booking.notes && (
              <section className="rounded-[26px] border border-black/[0.07] bg-white p-6 sm:p-7">
                <SectionTitle
                  icon={<MoreHorizontal size={18} />}
                  title="Guest notes"
                />

                <p className="mt-5 rounded-2xl bg-[#FAF8F3] p-4 text-sm leading-6 text-[#57534E]">
                  {booking.notes}
                </p>
              </section>
            )}
          </div>

          {/* Right */}
          <aside className="space-y-6">
            {/* Payment */}
            <section className="rounded-[26px] border border-black/[0.07] bg-white p-6">
              <SectionTitle
                icon={<CreditCard size={18} />}
                title="Payment"
              />

              <div className="mt-6 space-y-4">
                <PriceRow
                  label={`${formatMoney(
                    booking.pricePerNight,
                  )} × ${booking.nights} nights`}
                  value={formatMoney(
                    booking.pricePerNight *
                      booking.nights,
                  )}
                />

                <PriceRow
                  label="Cleaning fee"
                  value={formatMoney(
                    booking.cleaningFee || 0,
                  )}
                />

                <PriceRow
                  label="Service fee"
                  value={formatMoney(
                    booking.serviceFee || 0,
                  )}
                />

                <div className="border-t border-black/[0.07] pt-4">
                  <PriceRow
                    label="Total"
                    value={formatMoney(
                      booking.total,
                    )}
                    strong
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F3F8EE] px-4 py-3">
                <span className="text-xs font-semibold text-[#4E693E]">
                  Payment status
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4E693E]">
                  <CheckCircle2 size={14} />
                  {booking.paymentStatus ||
                    "Paid"}
                </span>
              </div>

              {booking.paymentMethod && (
                <p className="mt-3 text-[11px] text-[#A8A29E]">
                  Method: {booking.paymentMethod}
                </p>
              )}
            </section>

            {/* Booking info */}
            <section className="rounded-[26px] border border-black/[0.07] bg-white p-6">
              <SectionTitle
                icon={<ShieldCheck size={18} />}
                title="Booking information"
              />

              <div className="mt-5 space-y-4">
                <DetailRow
                  label="Booking ID"
                  value={booking.bookingId}
                />

                <DetailRow
                  label="Status"
                  value={booking.status}
                />

                {booking.bookedOn && (
                  <DetailRow
                    label="Booked on"
                    value={booking.bookedOn}
                  />
                )}
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-[26px] border border-black/[0.07] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A711E]">
                Manage booking
              </p>

              <div className="mt-4 grid gap-2">
                <Link
                  href={`/bookings/${booking.id}/edit`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-4 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
                >
                  <Edit3 size={16} />
                  Edit booking
                </Link>

                <button
                  type="button"
                  onClick={deleteBooking}
                  disabled={deleting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#9B4439]/20 px-4 text-sm font-bold text-[#9B4439] transition hover:bg-[#FFF1EF] disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete booking
                </button>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  if (status === "CONFIRMED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F8EE] px-3 py-1.5 text-[10px] font-bold text-[#4E693E]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#6F9959]" />
        Confirmed
      </span>
    );
  }

  if (status === "PENDING") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold text-[#8A651B]">
        <Clock3 size={13} />
        Pending
      </span>
    );
  }

  if (status === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F8EE] px-3 py-1.5 text-[10px] font-bold text-[#4E693E]">
        <CheckCircle2 size={13} />
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1EF] px-3 py-1.5 text-[10px] font-bold text-[#9B4439]">
      <XCircle size={13} />
      Cancelled
    </span>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
        {icon}
      </span>

      <h2 className="font-serif text-xl font-semibold">
        {title}
      </h2>
    </div>
  );
}

function InfoBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-[#FCFBF8] p-4">
      <div className="flex items-center gap-2 text-[#9A711E]">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>

      <p className="mt-3 text-sm font-bold text-[#292524]">
        {value}
      </p>
    </div>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span
        className={`text-sm ${
          strong
            ? "font-bold text-[#18181B]"
            : "text-[#71717A]"
        }`}
      >
        {label}
      </span>

      <span
        className={`shrink-0 ${
          strong
            ? "font-serif text-xl font-semibold"
            : "text-sm font-semibold text-[#44403C]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-[#A8A29E]">
        {label}
      </span>

      <span className="text-right text-xs font-bold text-[#44403C]">
        {value}
      </span>
    </div>
  );
}

function BookingSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <div className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto h-[76px] max-w-7xl px-5" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="h-4 w-32 animate-pulse rounded bg-[#EDE9E1]" />

        <div className="mt-5 h-12 w-96 max-w-full animate-pulse rounded bg-[#EDE9E1]" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-[26px] bg-white"
              />
            ))}
          </div>

          <div className="h-[450px] animate-pulse rounded-[26px] bg-white" />
        </div>
      </div>
    </main>
  );
}

function BookingNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-5">
      <div className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1EF] text-[#9B4439]">
          <XCircle size={26} />
        </div>

        <h1 className="mt-5 font-serif text-2xl font-semibold">
          Booking not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#71717A]">
          This booking may have been removed or the
          booking ID is invalid.
        </p>

        <Link
          href="/bookings"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-5 py-3 text-sm font-bold text-white"
        >
          <ArrowLeft size={16} />
          Back to bookings
        </Link>
      </div>
    </main>
  );
}