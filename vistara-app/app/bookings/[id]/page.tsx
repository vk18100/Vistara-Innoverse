"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  HelpCircle,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";

import Navbar from "@/components/navbar";

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

type Booking = {
  id: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number | string;
  status: BookingStatus;
  paymentStatus: string;
  property: {
    id: number;
    title: string;
    city: string;
    country: string;
    images: {
      id: number;
      url: string;
      altText?: string | null;
      isPrimary: boolean;
    }[];
  };
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: number | string) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function getStatusLabel(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "Confirmed";
    case "PENDING":
      return "Pending";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}

function getStatusStyles(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "bg-[#EEF1E8] text-[#68705A] border-[#DCE2D2]";

    case "COMPLETED":
      return "bg-[#F5EFE4] text-[#8D6E38] border-[#E7D9BC]";

    case "CANCELLED":
      return "bg-[#F9EDE8] text-[#A04E32] border-[#EBD0C6]";

    case "PENDING":
      return "bg-[#F5F0EA] text-[#806C5E] border-[#E4D9CF]";

    default:
      return "bg-[#F5F0EA] text-[#756D67] border-[#E4D9CF]";
  }
}

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    async function loadBooking() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/bookings/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load this booking."
          );
        }

        setBooking(result.booking ?? result.data ?? null);
      } catch (err) {
        console.error("BOOKING_DETAIL_ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load this booking."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [id]);

  async function handleCancel() {
    if (!booking || cancelling) return;

    const confirmed = window.confirm(
      "Cancel this booking? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setCancelError("");

      const response = await fetch(
        `/api/bookings/${booking.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "CANCELLED",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to cancel booking."
        );
      }

      router.push("/bookings");
    } catch (err) {
      console.error("BOOKING_CANCEL_ERROR:", err);

      setCancelError(
        err instanceof Error
          ? err.message
          : "Unable to cancel booking."
      );

      setCancelling(false);
    }
  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <Navbar />

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
          <div className="h-5 w-32 animate-pulse rounded bg-[#E9E2DA]" />

          <div className="mt-8 overflow-hidden rounded-[28px] border border-[#E5DED6] bg-white">
            <div className="h-[360px] animate-pulse bg-[#EEE8E1]" />

            <div className="space-y-6 p-7">
              <div className="h-8 w-2/3 animate-pulse rounded bg-[#EEE8E1]" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-[#EEE8E1]" />

              <div className="grid gap-5 sm:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-xl bg-[#F3EFEA]"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
        <Navbar />

        <section className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-5">
          <div className="max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EFEA] text-[#B76545]">
              <CalendarDays size={27} />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B76545]">
              Booking unavailable
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {error || "We couldn't find this booking."}
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#756D67]">
              The booking may no longer exist, or you may not
              have access to it.
            </p>

            <Link
              href="/bookings"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
            >
              <ArrowLeft size={15} />
              Back to bookings
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const primaryImage =
    booking.property.images.find(
      (image) => image.isPrimary
    ) || booking.property.images[0];

  const canCancel =
    booking.status === "CONFIRMED" ||
    booking.status === "PENDING";

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <section className="border-b border-[#E5DED6] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-7 lg:px-10">
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            <ArrowLeft size={15} />
            Back to bookings
          </Link>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B8945A]">
                Booking details
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Your reservation
              </h1>
            </div>

            <p className="text-xs text-[#948981]">
              Booking ID:{" "}
              <span className="font-semibold text-[#5F554E]">
                VS-{booking.id}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-7 lg:px-10 lg:py-12">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="space-y-6">
            {/* PROPERTY */}

            <article className="overflow-hidden rounded-[30px] border border-[#E5DED6] bg-white shadow-[0_12px_45px_rgba(44,36,32,0.045)]">
              {/* IMAGE */}

              <div className="relative h-[300px] overflow-hidden sm:h-[390px]">
                {primaryImage ? (
                  <img
                     src="/images/hawamahal.jpg"
                    alt={
                      primaryImage.altText ||
                      booking.property.title
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#F3EFEA] text-sm text-[#756D67]">
                    No property image available
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-6 sm:p-8">
                  <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#4A403A]">
                    Vistara stay
                  </span>
                </div>
              </div>

              {/* PROPERTY INFO */}

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-serif text-3xl font-semibold tracking-[-0.03em]">
                      {booking.property.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#756D67]">
                      <MapPin
                        size={15}
                        className="text-[#B76545]"
                      />

                      <span>
                        {booking.property.city},{" "}
                        {booking.property.country}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold ${getStatusStyles(
                      booking.status
                    )}`}
                  >
                    {booking.status === "CONFIRMED" && (
                      <CheckCircle2 size={13} />
                    )}

                    {booking.status === "CANCELLED" && (
                      <XCircle size={13} />
                    )}

                    {booking.status === "PENDING" && (
                      <Clock3 size={13} />
                    )}

                    {booking.status === "COMPLETED" && (
                      <Check size={13} />
                    )}

                    {getStatusLabel(booking.status)}
                  </span>
                </div>

                {/* BOOKING INFORMATION */}

                <div className="mt-8 grid gap-5 border-y border-[#EAE3DC] py-6 sm:grid-cols-2 lg:grid-cols-4">
                  <BookingInfo
                    icon={<CalendarDays size={16} />}
                    label="Check-in"
                    value={formatDate(booking.checkIn)}
                  />

                  <BookingInfo
                    icon={<CalendarDays size={16} />}
                    label="Check-out"
                    value={formatDate(booking.checkOut)}
                  />

                  <BookingInfo
                    icon={<Users size={16} />}
                    label="Guests"
                    value={`${booking.guests} ${
                      booking.guests === 1
                        ? "Guest"
                        : "Guests"
                    }`}
                  />

                  <BookingInfo
                    icon={<Clock3 size={16} />}
                    label="Duration"
                    value={`${booking.nights} ${
                      booking.nights === 1
                        ? "Night"
                        : "Nights"
                    }`}
                  />
                </div>
              </div>
            </article>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <article className="rounded-[26px] border border-[#E5DED6] bg-white p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EFEA] text-[#B8945A]">
                  <CreditCard size={19} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                    Payment
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold">
                    Payment summary
                  </h2>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#756D67]">
                    Stay
                  </span>

                  <span className="font-medium text-[#4A403A]">
                    {formatAmount(booking.totalAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-[#EEE7E1] pt-4">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="font-serif text-xl font-semibold text-[#B76545]">
                    {formatAmount(booking.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F7F4EF] px-4 py-3">
                <span className="text-xs text-[#756D67]">
                  Payment status
                </span>

                <span className="text-xs font-bold text-[#68705A]">
                  {booking.paymentStatus}
                </span>
              </div>
            </article>
          </div>

          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* TOTAL */}

            <div className="rounded-[26px] border border-[#E2D8CE] bg-[#F3EFEA] p-6 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                Reservation total
              </p>

              <p className="mt-3 font-serif text-3xl font-semibold">
                {formatAmount(booking.totalAmount)}
              </p>

              <p className="mt-1 text-xs text-[#756D67]">
                {booking.nights}{" "}
                {booking.nights === 1
                  ? "night"
                  : "nights"}{" "}
                · {booking.guests}{" "}
                {booking.guests === 1
                  ? "guest"
                  : "guests"}
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/stays/${booking.property.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B76545] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
                >
                  View stay
                  <ArrowRight size={15} />
                </Link>

                {canCancel && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="flex w-full items-center justify-center rounded-xl border border-[#D9C8BE] bg-white px-5 py-3 text-sm font-semibold text-[#A04E32] transition hover:border-[#B76545] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancelling
                      ? "Cancelling..."
                      : "Cancel booking"}
                  </button>
                )}
              </div>

              {cancelError && (
                <div className="mt-4 rounded-xl border border-[#E9CFC6] bg-[#F9EDE8] px-4 py-3 text-xs leading-5 text-[#A04E32]">
                  {cancelError}
                </div>
              )}
            </div>

            {/* HELP */}

            <div className="rounded-[26px] border border-[#E5DED6] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EFEA] text-[#B76545]">
                <HelpCircle size={18} />
              </div>

              <h3 className="mt-5 font-serif text-xl font-semibold">
                Need help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#756D67]">
                Have a question about your reservation or
                payment? Our support team can help.
              </p>

              <Link
                href="/support"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B76545] transition hover:text-[#965039]"
              >
                Contact support
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   BOOKING INFO
============================================================ */

function BookingInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[#A59C95]">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-[#3A302A]">
        {value}
      </p>
    </div>
  );
}