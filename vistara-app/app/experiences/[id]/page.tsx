"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Star,
  UserRound,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/navbar";

const activities = [
  {
    id: 1,
    title: "Local Food Walk",
    location: "Kankarbagh, Patna",
    category: "Food",
    duration: "2–3 hours",
    price: 499,
    image: "/images/Cultural Crown.jpg",
    description:
      "Taste authentic local flavours, discover hidden food spots and experience the food culture of the destination.",
    host: "Ananya Singh",
    hostRole: "Local Food Host",
    hostImage: "/images/host-1.jpg",
    highlights: [
      "Local food recommendations",
      "Selected food spots",
      "Regional dishes",
      "Local experience",
    ],
  },

  {
    id: 2,
    title: "Heritage Walk",
    location: "Patna, Bihar",
    category: "Culture",
    duration: "2 hours",
    price: 399,
    image: "/images/download (4).jpg",
    description:
      "Walk through historic streets, iconic landmarks and cultural places while discovering the stories behind them.",
    host: "Rohan Kumar",
    hostRole: "Heritage Guide",
    hostImage: "/images/host-2.jpg",
    highlights: [
      "Historical locations",
      "Local stories",
      "Cultural discovery",
      "Walking experience",
    ],
  },

  {
    id: 3,
    title: "Sunset Riverside Experience",
    location: "Ganga Ghat, Patna",
    category: "Nature",
    duration: "2 hours",
    price: 299,
    image: "/images/download (2).jpg",
    description:
      "Slow down and enjoy beautiful landscapes, peaceful surroundings and memorable moments close to nature.",
    host: "Priya Sharma",
    hostRole: "Local Experience Host",
    hostImage: "/images/host-3.jpg",
    highlights: [
      "Riverside experience",
      "Sunset views",
      "Relaxed exploration",
      "Local surroundings",
    ],
  },

  {
    id: 4,
    title: "Local Market Explorer",
    location: "Patna",
    category: "Shopping",
    duration: "2–3 hours",
    price: 349,
    image: "/images/download (5).jpg",
    description:
      "Explore vibrant local markets, discover unique finds and experience the everyday life of the destination.",
    host: "Amit Raj",
    hostRole: "Local Market Host",
    hostImage: "/images/host-4.jpg",
    highlights: [
      "Local markets",
      "Regional products",
      "Shopping spots",
      "Local discoveries",
    ],
  },

  {
    id: 5,
    title: "Cafe Hopping",
    location: "Patna",
    category: "Cafe",
    duration: "3 hours",
    price: 599,
    image: "/images/Tour through coastal Mallorca.jpg",
    description:
      "Visit charming local cafés, enjoy signature treats and discover the local coffee and food culture.",
    host: "Meera Sinha",
    hostRole: "Cafe Experience Host",
    hostImage: "/images/host-5.jpg",
    highlights: [
      "Selected cafes",
      "Coffee experiences",
      "Local recommendations",
      "Cafe hopping",
    ],
  },

  {
    id: 6,
    title: "Photography Trail",
    location: "Patna",
    category: "Experience",
    duration: "2 hours",
    price: 449,
    image: "/images/download (3).jpg",
    description:
      "Capture beautiful locations, local life and hidden visual gems while exploring the destination.",
    host: "Arjun Verma",
    hostRole: "Photography Host",
    hostImage: "/images/host-6.jpg",
    highlights: [
      "Photography locations",
      "Local life",
      "Hidden spots",
      "Visual exploration",
    ],
  },

  {
    id: 7,
    title: "Adventure & Rafting",
    location: "Slovenia",
    category: "Adventure",
    duration: "3–4 hours",
    price: 1299,
    image:
      "/images/Whitewater rafting in Slovenia, on the emerald Soca River.jpg",
    description:
      "Take on rushing turquoise waters and experience an unforgettable outdoor adventure surrounded by nature.",
    host: "Luca Weber",
    hostRole: "Adventure Host",
    hostImage: "/images/host-7.jpg",
    highlights: [
      "River rafting",
      "Mountain scenery",
      "Outdoor adventure",
      "Professional guidance",
    ],
  },

  {
    id: 8,
    title: "Mountain Escape",
    location: "Swiss Alps",
    category: "Nature",
    duration: "5 hours",
    price: 1799,
    image: "/images/download (2).jpg",
    description:
      "Explore breathtaking alpine landscapes, peaceful valleys and scenic mountain trails.",
    host: "Luca Weber",
    hostRole: "Mountain Experience Host",
    hostImage: "/images/host-8.jpg",
    highlights: [
      "Alpine landscapes",
      "Mountain trails",
      "Scenic valleys",
      "Nature exploration",
    ],
  },

  {
    id: 9,
    title: "Desert Balloon Experience",
    location: "Dubai, UAE",
    category: "Adventure",
    duration: "3 hours",
    price: 2499,
    image: "/images/download (1).jpg",
    description:
      "Rise above the desert at sunrise and experience sweeping views across the golden dunes.",
    host: "Omar Hassan",
    hostRole: "Adventure Host",
    hostImage: "/images/host-9.jpg",
    highlights: [
      "Sunrise flight",
      "Desert views",
      "Hot air balloon",
      "Golden dunes",
    ],
  },

  {
    id: 10,
    title: "Northern Lights",
    location: "Iceland",
    category: "Nature",
    duration: "4 hours",
    price: 2999,
    image: "/images/download (11).jpg",
    description:
      "Chase the northern lights and witness one of nature's most spectacular nighttime experiences.",
    host: "Einar Jónsson",
    hostRole: "Northern Lights Guide",
    hostImage: "/images/host-10.jpg",
    highlights: [
      "Northern lights",
      "Night photography",
      "Arctic landscape",
      "Local guidance",
    ],
  },

  {
    id: 11,
    title: "Venice Canal Ride",
    location: "Venice, Italy",
    category: "Culture",
    duration: "2 hours",
    price: 1599,
    image: "/images/download (4).jpg",
    description:
      "Glide through Venice's historic canals and discover the city's architecture from the water.",
    host: "Marco Rossi",
    hostRole: "Venice Local Host",
    hostImage: "/images/host-11.jpg",
    highlights: [
      "Venice canals",
      "Historic architecture",
      "Gondola experience",
      "Local stories",
    ],
  },

  {
    id: 12,
    title: "Mountain Paragliding",
    location: "Interlaken, Switzerland",
    category: "Adventure",
    duration: "2 hours",
    price: 3999,
    image: "/images/download (6).jpg",
    description:
      "Fly above alpine valleys and turquoise lakes for an unforgettable high-altitude adventure.",
    host: "Noah Keller",
    hostRole: "Certified Adventure Host",
    hostImage: "/images/host-12.jpg",
    highlights: [
      "Mountain flight",
      "Alpine valleys",
      "Lake views",
      "Professional guidance",
    ],
  },
];
const reviews = [
  {
    name: "Aarav",
    rating: 5,
    comment:
      "Beautiful experience. Everything felt local and well organised.",
  },
  {
    name: "Riya",
    rating: 5,
    comment:
      "The host was really helpful and the experience was worth the price.",
  },
  {
    name: "Kabir",
    rating: 4,
    comment:
      "Loved the atmosphere and the way the experience was planned.",
  },
];

export default function ExperienceDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const activity = activities.find(
    (item) => item.id === id
  );

  if (!activity) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Experience not found
          </h1>

          <Link
            href="/experiences"
            className="mt-6 inline-flex rounded-full bg-[#222] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to experiences
          </Link>
        </div>
      </main>
    );
  }

  const openMap = () => {
    const query = encodeURIComponent(activity.location);

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#222]">

      {/* ================= NAVBAR ================= */}

    <Navbar />


      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 lg:py-10">

        {/* BACK */}

        <Link
          href="/experiences"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft size={17} />
          Back to experiences
        </Link>


        {/* TITLE */}

        <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#B58A3A]">
              VISTARA EXPERIENCE
            </p>

            <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
              {activity.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#666]">

              <span className="flex items-center gap-1.5">
                <MapPin size={17} />
                {activity.location}
              </span>

              <span>·</span>

              <span className="flex items-center gap-1.5">
                <Star
                  size={16}
                  fill="#B58A3A"
                  className="text-[#B58A3A]"
                />
                4.9
              </span>

              <span>·</span>

              <span>{activity.category}</span>

            </div>
          </div>

          {/* MAP BUTTON */}

          <button
            onClick={openMap}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#222] px-5 py-3 text-sm font-semibold transition hover:bg-[#222] hover:text-white"
          >
            <MapPin size={17} />
            View location
          </button>

        </div>


        {/* ================= HERO IMAGE ================= */}

        <div className="overflow-hidden rounded-[28px]">
          <img
            src={activity.image}
            alt={activity.title}
            className="h-[420px] w-full object-cover md:h-[560px]"
          />
        </div>


        {/* ================= MAIN GRID ================= */}

        <section className="mt-10 grid gap-12 lg:grid-cols-[1fr_390px]">

          <div>

            {/* ABOUT */}

            <section className="border-b border-[#eeeeee] pb-10">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-serif text-3xl font-semibold">
                    About this experience
                  </h2>

                  <p className="mt-2 text-[#666]">
                    Hosted by {activity.host}
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#f3f3f3]">
                  <img
                    src="/images/profile.jpg"
                    alt={activity.host}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <UserRound size={24} className="text-[#777]" />
                </div>

              </div>

              <p className="mt-7 max-w-3xl text-[16px] leading-8 text-[#555]">
                {activity.description}
              </p>

            </section>


            {/* HIGHLIGHTS */}

            <section className="border-b border-[#eeeeee] py-10">

              <h2 className="font-serif text-3xl font-semibold">
                What you'll experience
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                {activity.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-[#eeeeee] p-5"
                  >
                    <div className="mt-1">
                      <ShieldCheck
                        size={20}
                        className="text-[#B58A3A]"
                      />
                    </div>

                    <span className="text-sm leading-6 text-[#444]">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </section>


            {/* HOST */}

            <section className="border-b border-[#eeeeee] py-10">

              <h2 className="font-serif text-3xl font-semibold">
                Meet your host
              </h2>

              <div className="mt-7 flex flex-col gap-6 rounded-3xl border border-[#eeeeee] p-6 sm:flex-row sm:items-center">

                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#f2f2f2]">

                  <img
                    src={activity.hostImage}
                    alt={activity.host}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {activity.host}
                  </h3>

                  <p className="mt-1 text-sm text-[#777]">
                    {activity.hostRole}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Star
                      size={15}
                      fill="#B58A3A"
                      className="text-[#B58A3A]"
                    />
                    <span className="font-semibold">
                      4.9
                    </span>

                    <span className="text-[#888]">
                      · 120+ hosted experiences
                    </span>
                  </div>
                </div>

              </div>

            </section>


            {/* REVIEWS */}

            <section className="py-10">

              <div className="flex items-center gap-3">

                <Star
                  size={22}
                  fill="#B58A3A"
                  className="text-[#B58A3A]"
                />

                <h2 className="font-serif text-3xl font-semibold">
                  4.9 · 48 reviews
                </h2>

              </div>

              <div className="mt-8 space-y-6">

                {reviews.map((review) => (
                  <article
                    key={review.name}
                    className="border-b border-[#eeeeee] pb-6"
                  >

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="font-semibold">
                          {review.name}
                        </p>

                        <div className="mt-1 flex gap-1">
                          {[...Array(review.rating)].map(
                            (_, index) => (
                              <Star
                                key={index}
                                size={13}
                                fill="#B58A3A"
                                className="text-[#B58A3A]"
                              />
                            )
                          )}
                        </div>
                      </div>

                    </div>

                    <p className="mt-3 text-sm leading-7 text-[#555]">
                      {review.comment}
                    </p>

                  </article>
                ))}

              </div>

              <button className="mt-7 rounded-full border border-[#222] px-6 py-3 text-sm font-semibold hover:bg-[#222] hover:text-white">
                Show all reviews
              </button>

            </section>

          </div>


          {/* ================= BOOKING CARD ================= */}

          <aside>

            <div className="sticky top-28 rounded-3xl border border-[#dddddd] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

              <div className="flex items-end justify-between">

                <div>
                  <span className="text-3xl font-semibold">
                    ₹{activity.price}
                  </span>

                  <span className="ml-2 text-sm text-[#777]">
                    / person
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Star
                    size={15}
                    fill="#B58A3A"
                    className="text-[#B58A3A]"
                  />
                  4.9
                </div>

              </div>


              <div className="my-6 border-t border-[#eeeeee]" />


              <div className="space-y-5">

                <div className="flex items-center justify-between">
                  <span className="text-[#777]">
                    Experience
                  </span>

                  <span className="font-medium">
                    {activity.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#777]">
                    Duration
                  </span>

                  <span className="flex items-center gap-2 font-medium">
                    <Clock3 size={16} />
                    {activity.duration}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-5">
                  <span className="text-[#777]">
                    Location
                  </span>

                  <span className="max-w-[200px] text-right font-medium">
                    {activity.location}
                  </span>
                </div>

              </div>

{/* BOOK */}

<Link
  href={`/orders/${activity.id}?type=experience`}
  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#222] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#B58A3A]"
>
  Book now
  <ChevronRight size={18} />
</Link>

<p className="mt-4 text-center text-xs leading-5 text-[#777]">
  You won't be charged until you confirm your booking.
</p>

            </div>

          </aside>

        </section>

      </div>

    </main>
  );
}