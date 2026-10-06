"use client";



import { use, useEffect, useState } from "react";

import Link from "next/link";

import {

  ArrowLeft,

  CalendarDays,
  ChevronLeft,
  ChevronRight,

  Check,

  Clock,

  Compass,

  Heart,

  MapPin,

  MessageCircle,

  Share2,

  ShieldCheck,

  Star,

  Users,

  Camera,

  Utensils,

} from "lucide-react";



import Navbar from "@/components/navbar";

import { experiences } from "@/data/experience";



type ExperiencePageProps = {

  params: Promise<{

    id: string;

  }>;

};



type Review = {

  id: string;

  name: string;

  rating: number;

  comment: string;

  date: string;

};



const defaultReviews: Review[] = [

  {

    id: "1",

    name: "Priya",

    rating: 5,

    comment:

      "A wonderful local experience. The host was friendly and showed us places we would never have found ourselves.",

    date: "Recently",

  },

  {

    id: "2",

    name: "Rahul",

    rating: 5,

    comment:

      "Really well organised and a great way to understand the local culture.",

    date: "Recently",

  },

];



export default function ExperienceDetailsPage({

  params,

}: ExperiencePageProps) {

  // IMPORTANT:

  // Next.js 16 params is a Promise

  const { id } = use(params);



  const experience = experiences.find(

    (item) => String(item.id) === String(id)

  );



  const [date, setDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [guests, setGuests] = useState(1);



  const [wishlisted, setWishlisted] = useState(false);



  const [reviews, setReviews] =

    useState<Review[]>(defaultReviews);



  const [reviewText, setReviewText] = useState("");

  const [reviewRating, setReviewRating] = useState(5);



  /* -------------------------------------------------------

     LOAD WISHLIST + REVIEWS

  ------------------------------------------------------- */



  useEffect(() => {

    if (!experience) return;



    const savedWishlist = localStorage.getItem(

      `experience-wishlist-${experience.id}`

    );



    setWishlisted(savedWishlist === "true");



    const savedReviews = localStorage.getItem(

      `experience-reviews-${experience.id}`

    );



    if (savedReviews) {

      try {

        setReviews(JSON.parse(savedReviews));

      } catch {

        setReviews(defaultReviews);

      }

    }

  }, [experience]);



  /* -------------------------------------------------------

     NOT FOUND

  ------------------------------------------------------- */



  if (!experience) {

    return (

      <main className="min-h-screen bg-white text-black">

        <Navbar />



        <div className="flex min-h-[70vh] items-center justify-center px-6">

          <div className="text-center">

            <h1 className="text-2xl font-semibold">

              Experience not found

            </h1>



            <p className="mt-2 text-sm text-gray-500">

              This experience does not exist.

            </p>



            <Link

              href="/experiences"

              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"

            >

              Back to Experiences

            </Link>

          </div>

        </div>

      </main>

    );

  }



  /* -------------------------------------------------------

     WISHLIST

  ------------------------------------------------------- */



  const toggleWishlist = () => {

    const nextValue = !wishlisted;



    setWishlisted(nextValue);



    localStorage.setItem(

      `experience-wishlist-${experience.id}`,

      String(nextValue)

    );

  };



  /* -------------------------------------------------------

     REVIEW

  ------------------------------------------------------- */



  const submitReview = () => {

    if (!reviewText.trim()) return;



    const newReview: Review = {

      id: Date.now().toString(),

      name: "You",

      rating: reviewRating,

      comment: reviewText.trim(),

      date: "Just now",

    };



    const updatedReviews = [

      newReview,

      ...reviews,

    ];



    setReviews(updatedReviews);



    localStorage.setItem(

      `experience-reviews-${experience.id}`,

      JSON.stringify(updatedReviews)

    );



    setReviewText("");

    setReviewRating(5);

  };



  const serviceFee = Math.round(

    experience.price * guests * 0.05

  );



  const subtotal =

    experience.price * guests;



  const total = subtotal + serviceFee;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1
  ).getDay();

  const calendarDays = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => (index < firstDay ? null : index - firstDay + 1)
  );

  const selectedDate = date ? new Date(`${date}T00:00:00`) : null;

  const selectDate = (day: number) => {
    const selected = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day
    );

    if (selected < today) return;

    const formatted = [
      selected.getFullYear(),
      String(selected.getMonth() + 1).padStart(2, "0"),
      String(selected.getDate()).padStart(2, "0"),
    ].join("-");

    setDate(formatted);
    setCalendarOpen(false);
  };

  const monthName = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const closeCalendar = () => setCalendarOpen(false);



  return (

    <main className="min-h-screen bg-white text-black">



      {/* ==================================================

          NAVBAR

      ================================================== */}



      <Navbar />



      {/* ==================================================

          MAIN

      ================================================== */}



      <div className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 lg:px-8">



        {/* ==================================================

            TOP BAR

        ================================================== */}



        <div className="mb-5 flex items-center justify-between">



          <Link

            href="/experiences"

            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"

          >

            <ArrowLeft size={16} />

            Back to experiences

          </Link>



          <button

            onClick={toggleWishlist}

            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${

              wishlisted

                ? "border-black bg-black text-white"

                : "border-gray-300 bg-white text-black hover:bg-gray-50"

            }`}

          >

            <Heart

              size={16}

              fill={

                wishlisted

                  ? "currentColor"

                  : "none"

              }

            />



            {wishlisted ? "Saved" : "Wishlist"}

          </button>

        </div>



        {/* ==================================================

            TWO COLUMN LAYOUT

        ================================================== */}



        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">



          {/* ==================================================

              LEFT SIDE

          ================================================== */}



          <div>



            {/* ==================================================

                MAIN IMAGE

            ================================================== */}



            <div className="relative overflow-hidden rounded-3xl bg-gray-100">



              <img

                src={experience.image}

                alt={experience.title}

                className="h-[330px] w-full object-cover sm:h-[430px] lg:h-[500px]"

              />



              {/* VERIFIED */}



              <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] shadow-sm">

                <ShieldCheck size={13} />

                Verified Experience

              </div>



            </div>



            {/* ==================================================

                TITLE

            ================================================== */}



            <div className="border-b border-gray-200 py-7">



              <div className="flex items-start justify-between gap-5">



                <div>



                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">

                    {experience.title}

                  </h1>



                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">



                    <span className="flex items-center gap-1.5">

                      <MapPin size={15} />

                      {experience.location},{" "}

                      {experience.city}

                    </span>



                    <span className="flex items-center gap-1.5 font-semibold text-black">

                      <Star

                        size={14}

                        fill="currentColor"

                      />

                      {experience.rating}

                    </span>



                    <span>

                      {reviews.length} reviews

                    </span>



                  </div>



                </div>



                {/* HEART */}



                <button

                  onClick={toggleWishlist}

                  className="hidden rounded-full border border-gray-300 p-3 transition hover:bg-gray-50 sm:flex"

                >

                  <Heart

                    size={19}

                    fill={

                      wishlisted

                        ? "currentColor"

                        : "none"

                    }

                  />

                </button>



              </div>



            </div>



            {/* ==================================================

                ABOUT

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                About this experience

              </SmallLabel>



              <h2 className="mt-2 text-xl font-semibold">

                Discover the destination like a local

              </h2>



              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">

                {experience.description}

              </p>



            </section>



            {/* ==================================================

                EXPERIENCE DETAILS

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                Experience details

              </SmallLabel>



              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">



                <InfoCard

                  icon={Compass}

                  label="Category"

                  value={experience.category}

                />



                <InfoCard

                  icon={Clock}

                  label="Duration"

                  value={experience.duration}

                />



                <InfoCard

                  icon={Users}

                  label="Guests"

                  value={`Up to ${experience.guests}`}

                />



                <InfoCard

                  icon={ShieldCheck}

                  label="Status"

                  value="Verified"

                />



              </div>



            </section>



            {/* ==================================================

                HIGHLIGHTS

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                Highlights

              </SmallLabel>



              <h2 className="mt-2 text-xl font-semibold">

                What you&apos;ll experience

              </h2>



              <div className="mt-5 grid gap-3 sm:grid-cols-2">



                {experience.highlights.map(

                  (highlight) => (

                    <div

                      key={highlight}

                      className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5"

                    >

                      <Check

                        size={17}

                        className="shrink-0"

                      />



                      <span className="text-sm font-medium text-gray-700">

                        {highlight}

                      </span>

                    </div>

                  )

                )}



              </div>



            </section>



            {/* ==================================================

                INCLUDED

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                What&apos;s included

              </SmallLabel>



              <div className="mt-5 grid gap-3 sm:grid-cols-2">



                <DetailCard

                  icon={Utensils}

                  label="Local experience"

                  value="Curated activity"

                />



                <DetailCard

                  icon={ShieldCheck}

                  label="Verified host"

                  value="Vistara verified"

                />



                <DetailCard

                  icon={Users}

                  label="Group size"

                  value={`Up to ${experience.guests} guests`}

                />



                <DetailCard

                  icon={Camera}

                  label="Guidance"

                  value="Local host guidance"

                />



              </div>



            </section>



            {/* ==================================================

                HOST

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                Hosted by

              </SmallLabel>



              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-gray-200 p-5 sm:flex-row sm:items-center">



                {/* PROFILE IMAGE */}



                <img

                  src="/profile.jpg"

                  alt={experience.hostName}

                  className="h-16 w-16 shrink-0 rounded-full object-cover"

                />



                <div className="flex-1">



                  <h3 className="font-semibold">

                    {experience.hostName}

                  </h3>



                  <p className="mt-1 text-sm text-gray-500">

                    Experience host on Vistara

                  </p>



                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">



                    <span className="flex items-center gap-1">

                      <Star

                        size={13}

                        fill="currentColor"

                      />

                      {experience.rating} rating

                    </span>



                    <span>•</span>



                    <span className="flex items-center gap-1">

                      <ShieldCheck size={13} />

                      Verified host

                    </span>



                  </div>



                </div>



                {/* HOST PROFILE */}



                <Link

                  href={`/host/${experience.hostId}`}

                  className="rounded-xl border border-black px-5 py-2.5 text-center text-sm font-semibold transition hover:bg-black hover:text-white"

                >

                  View Profile ↗

                </Link>



              </div>



            </section>



            {/* ==================================================

                LOCATION

            ================================================== */}



            <section className="border-b border-gray-200 py-8">



              <SmallLabel>

                Location

              </SmallLabel>



              <h2 className="mt-2 text-xl font-semibold">

                Where the experience happens

              </h2>



              <p className="mt-2 text-sm text-gray-600">

                {experience.location},{" "}

                {experience.city}

              </p>



              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">



                <div className="flex h-[280px] flex-col items-center justify-center bg-[#EEF4FF] sm:h-[340px]">



                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">

                    <MapPin size={22} />

                  </div>



                  <p className="mt-4 text-sm font-semibold">

                    {experience.city}

                  </p>



                  <p className="mt-1 px-5 text-center text-xs text-gray-500">

                    Exact meeting location will be

                    shared after booking.

                  </p>



                </div>



              </div>



            </section>



            {/* ==================================================

                REVIEWS

            ================================================== */}



            <section className="py-8">



              <div className="flex items-end justify-between">



                <div>



                  <SmallLabel>

                    Guest reviews

                  </SmallLabel>



                  <h2 className="mt-2 text-xl font-semibold">

                    What guests say

                  </h2>



                </div>



                <div className="flex items-center gap-1 text-sm font-semibold">

                  <Star

                    size={15}

                    fill="currentColor"

                  />

                  {experience.rating}

                </div>



              </div>



              {/* REVIEW CARDS */}



              <div className="mt-5 grid gap-3 sm:grid-cols-2">



                {reviews.map((review) => (

                  <div

                    key={review.id}

                    className="rounded-2xl bg-[#F7F8FA] p-5"

                  >



                    <div className="flex items-center gap-1">

                      {[1, 2, 3, 4, 5].map(

                        (star) => (

                          <Star

                            key={star}

                            size={13}

                            fill={

                              star <=

                              Math.round(

                                review.rating

                              )

                                ? "currentColor"

                                : "none"

                            }

                          />

                        )

                      )}

                    </div>



                    <p className="mt-4 text-sm leading-6 text-gray-700">

                      &quot;{review.comment}&quot;

                    </p>



                    <p className="mt-4 text-xs font-semibold">

                      {review.name} · Guest

                    </p>



                  </div>

                ))}



              </div>



              {/* ==================================================

                  WRITE REVIEW

              ================================================== */}



              <div className="mt-5 rounded-2xl border border-gray-200 p-5">



                <div className="flex items-center gap-2">

                  <MessageCircle size={17} />



                  <h3 className="text-sm font-semibold">

                    Share your experience

                  </h3>

                </div>



                {/* RATING */}



                <div className="mt-4 flex gap-1">



                  {[1, 2, 3, 4, 5].map(

                    (star) => (

                      <button

                        key={star}

                        type="button"

                        onClick={() =>

                          setReviewRating(star)

                        }

                        className="p-1"

                      >

                        <Star

                          size={17}

                          fill={

                            star <= reviewRating

                              ? "currentColor"

                              : "none"

                          }

                        />

                      </button>

                    )

                  )}



                </div>



                <textarea

                  value={reviewText}

                  onChange={(e) =>

                    setReviewText(e.target.value)

                  }

                  placeholder="Write about your experience..."

                  className="mt-3 min-h-[100px] w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-black"

                />



                <button

                  type="button"

                  onClick={submitReview}

                  className="mt-3 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"

                >

                  Submit Review

                </button>



              </div>



            </section>



          </div>



          {/* ==================================================

              RIGHT BOOKING CARD

          ================================================== */}



          <aside className="lg:sticky lg:top-24">



            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">



              {/* PRICE */}



              <div className="flex items-center justify-between">



                <div>



                  <span className="text-2xl font-bold">

                    ₹

                    {experience.price.toLocaleString(

                      "en-IN"

                    )}

                  </span>



                  <span className="ml-1 text-sm text-gray-500">

                    / person

                  </span>



                </div>



                <div className="flex items-center gap-1 text-sm font-semibold">

                  <Star

                    size={14}

                    fill="currentColor"

                  />

                  {experience.rating}

                </div>



              </div>



              {/* DATE */}
              <div className="mt-6 rounded-2xl border border-gray-200 p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">
                  Date
                </p>

                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen((prev) => !prev)}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <CalendarDays size={17} />
                    <span className="flex-1 text-sm">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Select date"}
                    </span>
                  </button>

                  {calendarOpen && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-full min-w-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                      <div className="mb-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            const previousMonth = new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1
                            );

                            const currentMonth = new Date(
                              today.getFullYear(),
                              today.getMonth(),
                              1
                            );

                            if (previousMonth >= currentMonth) {
                              setCalendarMonth(previousMonth);
                            }
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-gray-100"
                          aria-label="Previous month"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <p className="text-sm font-semibold">{monthName}</p>

                        <button
                          type="button"
                          onClick={() =>
                            setCalendarMonth(
                              new Date(
                                calendarMonth.getFullYear(),
                                calendarMonth.getMonth() + 1,
                                1
                              )
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-gray-100"
                          aria-label="Next month"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="mb-2 grid grid-cols-7 text-center">
                        {["S", "M", "T", "W", "T", "F", "S"].map(
                          (day, index) => (
                            <div
                              key={`${day}-${index}`}
                              className="py-2 text-[10px] font-semibold text-gray-400"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, index) => {
                          if (!day) {
                            return <div key={`empty-${index}`} />;
                          }

                          const currentDate = new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth(),
                            day
                          );

                          const isPast = currentDate < today;
                          const isSelected =
                            selectedDate !== null &&
                            currentDate.getTime() ===
                              new Date(
                                selectedDate.getFullYear(),
                                selectedDate.getMonth(),
                                selectedDate.getDate()
                              ).getTime();

                          const isToday =
                            currentDate.getTime() === today.getTime();

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isPast}
                              onClick={() => selectDate(day)}
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition ${
                                isPast
                                  ? "cursor-not-allowed text-gray-300"
                                  : "text-black hover:bg-gray-100"
                              } ${
                                isSelected
                                  ? "bg-black text-white hover:bg-black"
                                  : ""
                              } ${
                                isToday && !isSelected
                                  ? "font-bold ring-1 ring-black"
                                  : ""
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      {date && (
                        <button
                          type="button"
                          onClick={() => {
                            setDate("");
                            closeCalendar();
                          }}
                          className="mt-4 w-full border-t border-gray-200 pt-3 text-left text-xs font-medium hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* GUESTS */}



              <div className="mt-3 rounded-2xl border border-gray-200 p-4">



                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">

                  Guests

                </p>



                <div className="mt-2 flex items-center justify-between">



                  <div className="flex items-center gap-2">

                    <Users size={17} />



                    <span className="text-sm font-medium">

                      {guests}{" "}

                      {guests === 1

                        ? "guest"

                        : "guests"}

                    </span>

                  </div>



                  <div className="flex items-center gap-2">



                    <button

                      type="button"

                      onClick={() =>

                        setGuests(

                          Math.max(

                            1,

                            guests - 1

                          )

                        )

                      }

                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg"

                    >

                      −

                    </button>



                    <button

                      type="button"

                      onClick={() =>

                        setGuests(

                          Math.min(

                            experience.guests,

                            guests + 1

                          )

                        )

                      }

                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg"

                    >

                      +

                    </button>



                  </div>



                </div>



                <p className="mt-2 text-[11px] text-gray-500">

                  Up to {experience.guests} guests

                </p>



              </div>



              {/* ==================================================

                  BOOK NOW

              ================================================== */}



              <Link

                href={`/booking/${experience.id}`}

                className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"

              >

                Book Now ↗

              </Link>



              <p className="mt-3 text-center text-[11px] text-gray-500">

                You won&apos;t be charged until you

                confirm your booking.

              </p>



              {/* ==================================================

                  PRICE

              ================================================== */}



              <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">



                <div className="flex justify-between">



                  <span className="text-gray-600">

                    ₹

                    {experience.price.toLocaleString(

                      "en-IN"

                    )}{" "}

                    × {guests} guest

                    {guests > 1 ? "s" : ""}

                  </span>



                  <span>

                    ₹

                    {subtotal.toLocaleString(

                      "en-IN"

                    )}

                  </span>



                </div>



                <div className="flex justify-between">



                  <span className="text-gray-600">

                    Service fee

                  </span>



                  <span>

                    ₹

                    {serviceFee.toLocaleString(

                      "en-IN"

                    )}

                  </span>



                </div>



                <div className="border-t border-gray-200 pt-3">



                  <div className="flex justify-between font-semibold">



                    <span>Total</span>



                    <span>

                      ₹

                      {total.toLocaleString(

                        "en-IN"

                      )}

                    </span>



                  </div>



                </div>



              </div>



            </div>



            {/* SHARE */}



            <button

              type="button"

              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold transition hover:bg-gray-50"

            >

              <Share2 size={16} />

              Share this experience

            </button>



          </aside>



        </div>

      </div>



      {/* ==================================================

          FOOTER

      ================================================== */}



      <footer className="border-t border-gray-200">



        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">



          <div>



            <p className="font-serif text-lg font-semibold">

              Vistara

            </p>



            <p className="mt-1 text-xs text-gray-500">

              Discover places. Create memories.

            </p>



          </div>



          <p className="text-xs text-gray-500">

            © {new Date().getFullYear()} Vistara

          </p>



        </div>



      </footer>



    </main>

  );

}



/* ========================================================

   SMALL LABEL

======================================================== */



function SmallLabel({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">

      {children}

    </p>

  );

}



/* ========================================================

   INFO CARD

======================================================== */



function InfoCard({

  icon: Icon,

  label,

  value,

}: {

  icon: React.ElementType;

  label: string;

  value: string;

}) {

  return (

    <div className="rounded-xl border border-gray-200 p-4">



      <Icon

        size={18}

        strokeWidth={1.7}

      />



      <p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-gray-500">

        {label}

      </p>



      <p className="mt-1 text-sm font-semibold">

        {value}

      </p>



    </div>

  );

}



/* ========================================================

   DETAIL CARD

======================================================== */



function DetailCard({

  icon: Icon,

  label,

  value,

}: {

  icon: React.ElementType;

  label: string;

  value: string;

}) {

  return (

    <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4">



      <Icon

        size={19}

        strokeWidth={1.7}

      />



      <div>



        <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500">

          {label}

        </p>



        <p className="mt-1 text-sm font-medium">

          {value}

        </p>



      </div>



    </div>

  );

}