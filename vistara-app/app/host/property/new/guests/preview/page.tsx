"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Wifi,
  X,
  Coffee,
  Car,
  Home,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Photo = {
  src: string;
  alt: string;
};

type Amenity = {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

/* -------------------------------------------------------------------------- */
/* DEMO LISTING DATA                                                          */
/* Replace this with your API/database response later.                       */
/* -------------------------------------------------------------------------- */

const listing = {
  title: "The Heritage Courtyard",
  location: "Patna, Bihar",
  type: "Entire villa",

  guests: 4,
  bedrooms: 2,
  beds: 2,
  bathrooms: 2,

  price: 4500,
  rating: 4.9,
  reviews: 28,

  hostName: "Vistara Host",
  hostInitial: "V",

  description:
    "A thoughtfully designed private stay offering comfort, privacy and a calm connection to the local character of Patna.",

  verified: true,
};

const photos: Photo[] = [
  {
    src: "/images/house.jpg",
    alt: "Property exterior",
  },
  {
    src: "/images/beachhouse.jpg",
    alt: "Beautiful property living space",
  },
  {
    src: "/images/dubai.jpg",
    alt: "Property interior",
  },
  {
    src: "/images/big.jpg",
    alt: "Guest bedroom",
  },
  {
    src: "/images/whitehouse.jpg",
    alt: "Property exterior view",
  },
];

const amenities: Amenity[] = [
  {
    label: "Wi-Fi",
    icon: Wifi,
  },
  {
    label: "2 bedrooms",
    icon: BedDouble,
  },
  {
    label: "2 bathrooms",
    icon: Bath,
  },
  {
    label: "4 guests",
    icon: Users,
  },
  {
    label: "Parking",
    icon: Car,
  },
  {
    label: "Kitchen",
    icon: Home,
  },
  {
    label: "Coffee maker",
    icon: Coffee,
  },
  {
    label: "Entire property",
    icon: Home,
  },
];

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function GuestPreviewPage() {
  const params = useParams();

  const id = String(params.id);

  const [saved, setSaved] = useState(false);

  const [activePhoto, setActivePhoto] = useState(0);

  const [showGallery, setShowGallery] = useState(false);

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guestCount, setGuestCount] = useState(2);

  const [shareMessage, setShareMessage] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    const calculated = Math.ceil(
      difference / (1000 * 60 * 60 * 24),
    );

    return calculated > 0 ? calculated : 1;
  }, [checkIn, checkOut]);

  const subtotal = listing.price * nights;

  const serviceFee = Math.round(subtotal * 0.12);

  const total = subtotal + serviceFee;

  /* ------------------------------------------------------------------------ */
  /* GALLERY                                                                  */
  /* ------------------------------------------------------------------------ */

  function nextPhoto() {
    setActivePhoto((current) =>
      current === photos.length - 1
        ? 0
        : current + 1,
    );
  }

  function previousPhoto() {
    setActivePhoto((current) =>
      current === 0
        ? photos.length - 1
        : current - 1,
    );
  }

  /* ------------------------------------------------------------------------ */
  /* SHARE                                                                    */
  /* ------------------------------------------------------------------------ */

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: listing.title,
          text: `${listing.title} · ${listing.location}`,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href,
      );

      setShareMessage("Link copied");

      setTimeout(() => {
        setShareMessage("");
      }, 2000);
    } catch {
      setShareMessage("");
    }
  }

  /* ------------------------------------------------------------------------ */
  /* BOOK                                                                     */
  /* ------------------------------------------------------------------------ */

  function handleBooking() {
    if (!checkIn || !checkOut) {
      document
        .getElementById("booking-card")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    // Connect this to your booking route/API.
    console.log({
      propertyId: id,
      checkIn,
      checkOut,
      guests: guestCount,
      nights,
      subtotal,
      serviceFee,
      total,
    });
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* ================================================================== */}
      {/* PREVIEW HEADER                                                     */}
      {/* ================================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/8 bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* BACK */}

          <Link
            href={`/host/property/new/${id}/guests`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#57534E] transition hover:text-[#9A711E]"
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">
              Back to guest settings
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </Link>

          {/* CENTER */}

          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] text-xs font-bold text-white">
              V
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
              Guest Preview
            </span>
          </div>

          {/* EDIT */}

          <Link
            href={`/host/property/new/${id}/guests`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#292524]"
          >
            Edit listing
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PAGE                                                                */}
      {/* ================================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        {/* ================================================================ */}
        {/* TITLE                                                             */}
        {/* ================================================================ */}

        <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
              <span>{listing.type}</span>

              <span className="text-[#CFC9BE]">
                •
              </span>

              <span>Guest preview</span>
            </div>

            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {listing.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#78716C]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {listing.location}
              </span>

              <span className="text-[#D6D0C7]">
                •
              </span>

              <span className="inline-flex items-center gap-1.5 font-bold text-[#403C37]">
                <Star
                  size={13}
                  className="fill-[#D9A441] text-[#D9A441]"
                />

                {listing.rating}
              </span>

              <span>
                {listing.reviews} reviews
              </span>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-2.5 text-xs font-bold text-[#57534E] transition hover:border-[#D9A441]"
            >
              <Share2 size={14} />

              <span className="hidden sm:inline">
                Share
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setSaved((value) => !value)
              }
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition",
                saved
                  ? "border-[#D9A441] bg-[#FFF8E8] text-[#8A681D]"
                  : "border-black/8 bg-white text-[#403C37] hover:border-[#D9A441]",
              ].join(" ")}
            >
              <Heart
                size={14}
                className={
                  saved ? "fill-current" : ""
                }
              />

              <span className="hidden sm:inline">
                {saved ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </section>

        {/* SHARE MESSAGE */}

        {shareMessage && (
          <div className="mt-4 inline-flex rounded-xl bg-[#18181B] px-4 py-2.5 text-xs font-semibold text-white">
            {shareMessage}
          </div>
        )}

        {/* ================================================================ */}
        {/* GALLERY                                                           */}
        {/* ================================================================ */}

        <section className="mt-8 overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.05)]">
          <div className="grid min-h-[430px] grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr]">
            {/* MAIN */}

            <button
              type="button"
              onClick={() => {
                setActivePhoto(0);
                setShowGallery(true);
              }}
              className="group relative min-h-[300px] overflow-hidden bg-[#E9E3D8] text-left lg:row-span-2"
            >
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2.5 text-[10px] font-bold text-[#18181B] shadow-lg">
                View all photos
              </span>
            </button>

            {/* OTHER PHOTOS */}

            {photos.slice(1).map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => {
                  setActivePhoto(index + 1);
                  setShowGallery(true);
                }}
                className="group relative hidden min-h-[210px] overflow-hidden bg-[#E9E3D8] sm:block"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="30vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />

                {index ===
                  photos.slice(1).length - 1 && (
                  <span className="absolute bottom-4 right-4 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-bold text-[#18181B]">
                    + all photos
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* MAIN CONTENT                                                      */}
        {/* ================================================================ */}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* ============================================================ */}
          {/* LEFT                                                            */}
          {/* ============================================================ */}

          <div>
            {/* PROPERTY INTRO */}

            <section className="border-b border-black/8 pb-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-[#78716C]">
                    {listing.type} ·{" "}
                    {listing.location}
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    A calm stay with a sense of place
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#78716C]">
                    {listing.description}
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
                  <ShieldCheck size={23} />
                </div>
              </div>

              {/* STATS */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoItem
                  icon={<Users size={17} />}
                  label={`${listing.guests} guests`}
                />

                <InfoItem
                  icon={<BedDouble size={17} />}
                  label={`${listing.bedrooms} bedrooms`}
                />

                <InfoItem
                  icon={<BedDouble size={17} />}
                  label={`${listing.beds} beds`}
                />

                <InfoItem
                  icon={<Bath size={17} />}
                  label={`${listing.bathrooms} bathrooms`}
                />
              </div>
            </section>

            {/* ========================================================== */}
            {/* AMENITIES                                                    */}
            {/* ========================================================== */}

            <section className="border-b border-black/8 py-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Comfort
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                What this place offers
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;

                  return (
                    <div
                      key={amenity.label}
                      className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-4 transition hover:border-[#D9A441]/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EA] text-[#9A711E]">
                        <Icon size={18} />
                      </div>

                      <span className="text-xs font-bold text-[#403C37]">
                        {amenity.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Link
                href={`/host/property/new/${id}/amenities`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-3 text-xs font-bold text-[#57534E] transition hover:border-[#D9A441] hover:text-[#8A681D]"
              >
                Edit amenities
                <ArrowRight size={14} />
              </Link>
            </section>

            {/* ========================================================== */}
            {/* LOCATION                                                     */}
            {/* ========================================================== */}

            <section className="border-b border-black/8 py-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Location
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                Where you'll stay
              </h2>

              <div className="relative mt-6 flex min-h-[280px] items-center justify-center overflow-hidden rounded-[26px] bg-[#ECE7DE]">
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute left-[20%] top-[25%] h-28 w-28 rounded-full bg-[#D9A441]/20 blur-2xl" />

                  <div className="absolute bottom-[15%] right-[20%] h-36 w-36 rounded-full bg-[#A89B7A]/20 blur-3xl" />
                </div>

                <div className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#9A711E] shadow-sm">
                    <MapPin size={23} />
                  </div>

                  <p className="mt-4 font-serif text-xl font-semibold">
                    {listing.location}
                  </p>

                  <p className="mt-1 text-[10px] text-[#78716C]">
                    Exact address shared after booking
                  </p>
                </div>
              </div>

              <Link
                href={`/host/property/new/${id}/location`}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#8A681D] transition hover:text-[#6F5318]"
              >
                Manage location
                <ArrowRight size={14} />
              </Link>
            </section>

            {/* ========================================================== */}
            {/* HOST                                                          */}
            {/* ========================================================== */}

            <section className="py-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Your host
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8E0D3] font-serif text-xl font-semibold text-[#665A3E]">
                  {listing.hostInitial}
                </div>

                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    {listing.hostName}
                  </h2>

                  <p className="mt-1 text-xs text-[#A8A29E]">
                    Available to help during your stay.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-[#78716C]">
                <ShieldCheck
                  size={15}
                  className="text-[#68705A]"
                />

                {listing.verified
                  ? "Verified host information"
                  : "Host information pending verification"}
              </div>
            </section>
          </div>

          {/* ============================================================ */}
          {/* BOOKING CARD                                                   */}
          {/* ============================================================ */}

          <aside
            id="booking-card"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(24,24,27,0.08)]">
              {/* PRICE */}

              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl font-semibold">
                    ₹{listing.price.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-xs text-[#A8A29E]">
                    / night
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star
                    size={13}
                    className="fill-[#D9A441] text-[#D9A441]"
                  />

                  {listing.rating}
                </div>
              </div>

              {/* BOOKING INPUTS */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8D2C7]">
                <div className="grid grid-cols-2">
                  {/* CHECK IN */}

                  <label className="border-r border-[#D8D2C7] p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">
                      Check-in
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="text-[#9A711E]"
                      />

                      <input
                        type="date"
                        value={checkIn}
                        onChange={(event) =>
                          setCheckIn(
                            event.target.value,
                          )
                        }
                        className="w-full bg-transparent text-xs font-bold outline-none"
                      />
                    </div>
                  </label>

                  {/* CHECK OUT */}

                  <label className="p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">
                      Check-out
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="text-[#9A711E]"
                      />

                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || undefined}
                        onChange={(event) =>
                          setCheckOut(
                            event.target.value,
                          )
                        }
                        className="w-full bg-transparent text-xs font-bold outline-none"
                      />
                    </div>
                  </label>
                </div>

                {/* GUESTS */}

                <div className="border-t border-[#D8D2C7] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">
                    Guests
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users
                        size={15}
                        className="text-[#9A711E]"
                      />

                      <span className="text-xs font-bold">
                        {guestCount}{" "}
                        {guestCount === 1
                          ? "guest"
                          : "guests"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            Math.max(
                              1,
                              guestCount - 1,
                            ),
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-sm font-bold transition hover:bg-[#F5F2EB]"
                      >
                        −
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            Math.min(
                              listing.guests,
                              guestCount + 1,
                            ),
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-sm font-bold transition hover:bg-[#F5F2EB]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-[#A8A29E]">
                    Maximum {listing.guests} guests
                  </p>
                </div>
              </div>

              {/* CTA */}

              <button
                type="button"
                onClick={handleBooking}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9A441] py-4 text-xs font-bold text-[#18181B] shadow-[0_10px_25px_rgba(217,164,65,0.18)] transition hover:bg-[#E7C46D]"
              >
                Check availability
                <ArrowRight size={15} />
              </button>

              <p className="mt-3 text-center text-[10px] text-[#A8A29E]">
                You won't be charged yet
              </p>

              {/* PRICE BREAKDOWN */}

              <div className="mt-6 space-y-3 border-t border-black/8 pt-5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">
                    ₹
                    {listing.price.toLocaleString(
                      "en-IN",
                    )}{" "}
                    × {nights}{" "}
                    {nights === 1
                      ? "night"
                      : "nights"}
                  </span>

                  <span className="font-semibold">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#78716C]">
                    Service fee
                  </span>

                  <span className="font-semibold">
                    ₹
                    {serviceFee.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-black/8 pt-4 font-bold">
                  <span>Total before taxes</span>

                  <span>
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
              </div>

              {/* VERIFICATION */}

              <div className="mt-6 flex gap-3 rounded-2xl bg-[#FFF8E8] p-4">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-[#8A681D]"
                />

                <p className="text-[10px] leading-5 text-[#786A4A]">
                  Your booking is supported by
                  Vistara's guest support and
                  verification process.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ================================================================ */}
        {/* MOBILE BOOKING CTA                                                */}
        {/* ================================================================ */}

        <div className="mt-8 lg:hidden">
          <button
            type="button"
            onClick={handleBooking}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D9A441] px-5 py-4 text-sm font-bold text-[#18181B] shadow-[0_12px_30px_rgba(217,164,65,0.2)]"
          >
            Check availability
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* PHOTO LIGHTBOX                                                      */}
      {/* ================================================================== */}

      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-[#18181B]/95">
          {/* CLOSE */}

          <button
            type="button"
            onClick={() => setShowGallery(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* IMAGE */}

          <div className="flex h-full items-center justify-center px-4 sm:px-8">
            <div className="relative h-[70vh] w-full max-w-6xl">
              <Image
                src={photos[activePhoto].src}
                alt={photos[activePhoto].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={previousPhoto}
                className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-5"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-5"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* COUNTER */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-semibold text-white/80 backdrop-blur">
            {activePhoto + 1} / {photos.length}
          </div>

          {/* THUMBNAILS */}

          <div className="absolute bottom-5 right-5 hidden gap-2 md:flex">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() =>
                  setActivePhoto(index)
                }
                className={[
                  "relative h-12 w-16 overflow-hidden rounded-lg border-2",
                  index === activePhoto
                    ? "border-[#D9A441]"
                    : "border-white/20",
                ].join(" ")}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* INFO ITEM                                                                  */
/* -------------------------------------------------------------------------- */

function InfoItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EA] text-[#9A711E]">
        {icon}
      </div>

      <span className="text-xs font-bold text-[#57534E]">
        {label}
      </span>
    </div>
  );
}