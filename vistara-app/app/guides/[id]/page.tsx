"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Navigation,
  Share2,
  Star,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

const guides = [
  {
    id: "rajiv",
    name: "Rajiv Kumar",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.9,
    reviews: 124,
    experience: "8 years",
    languages: ["Hindi", "English"],
    specialties: ["Heritage", "Food", "Local Life"],
    price: 699,
    bio: "I love showing travellers the real Patna — from historic places and hidden streets to local food and stories that you won't find in a guidebook.",
  },
  {
    id: "amit",
    name: "Amit Singh",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.8,
    reviews: 96,
    experience: "6 years",
    languages: ["Hindi", "English"],
    specialties: ["History", "Culture", "Photography"],
    price: 599,
    bio: "Discover Patna through its history, riverside views and everyday local life.",
  },
  {
    id: "neha",
    name: "Neha Sharma",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.9,
    reviews: 87,
    experience: "5 years",
    languages: ["Hindi", "English"],
    specialties: ["Food", "Shopping", "Culture"],
    price: 649,
    bio: "Let's explore Patna through its flavours, markets and local culture.",
  },
  {
    id: "vikas",
    name: "Vikas Kumar",
    location: "Rajgir, Bihar",
    image: "/images/profile.jpg",
    rating: 4.7,
    reviews: 71,
    experience: "7 years",
    languages: ["Hindi", "English"],
    specialties: ["Nature", "History", "Adventure"],
    price: 599,
    bio: "Explore Rajgir and Nalanda with someone who knows the stories behind every place.",
  },
];

const reviews = [
  {
    name: "Ananya",
    text: "Rajiv made our Patna trip feel completely different. We discovered places we would never have found ourselves.",
  },
  {
    name: "Rohan",
    text: "Very friendly and knowledgeable. The local food stops were definitely my favourite part.",
  },
  {
    name: "Meera",
    text: "The whole experience felt personal instead of like a regular tourist tour.",
  },
];

export default function GuideDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const guide = guides.find((item) => item.id === id) ?? guides[0];

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">

      {/* NAVBAR */}
     
    <Navbar/>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-7 lg:px-10 lg:pt-10">

        <div className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(44,36,32,0.08)] lg:grid-cols-[1.15fr_0.85fr]">

          {/* IMAGE */}
          <div className="relative min-h-[430px] lg:min-h-[600px]">
            <img
              src={guide.image}
              alt={guide.name}
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/65 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 right-7 text-white">
              <div className="mb-4 flex flex-wrap gap-2">
                {guide.specialties.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#2C2420]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
                Meet {guide.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-white/90">
                <MapPin size={16} />
                {guide.location}
              </div>
            </div>
          </div>

          {/* INTRO */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-16 w-16 overflow-hidden rounded-full border-4 border-[#E8DED0]">
                <img
                  src="/images/profile.jpg"
                  alt={guide.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl font-semibold">
                    {guide.name}
                  </h2>

                  <CheckCircle2
                    size={18}
                    className="text-[#68705A]"
                  />
                </div>

                <p className="text-sm text-[#756D67]">
                  Local host · {guide.location}
                </p>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              LOCAL HOST
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              See the place
              <br />
              through local eyes.
            </h2>

            <p className="mt-6 text-base leading-8 text-[#756D67]">
              {guide.bio}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Info
                icon={<Star size={17} />}
                label="Rating"
                value={`${guide.rating} · ${guide.reviews} reviews`}
              />

              <Info
                icon={<Clock3 size={17} />}
                label="Experience"
                value={guide.experience}
              />

              <Info
                icon={<Languages size={17} />}
                label="Languages"
                value={guide.languages.join(", ")}
              />

              <Info
                icon={<Users size={17} />}
                label="Group"
                value="Up to 6"
              />
            </div>

            <Link
              href={`/guides/${guide.id}/book`}
              className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#B76545] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#965039]"
            >
              Book an experience
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-20">

        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              THE EXPERIENCE
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              A day shaped
              <br />
              around the city.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-[#756D67]">
              This isn't a fixed tourist itinerary. Your host will take you
              through local streets, cultural landmarks, food spots and places
              that show the everyday character of the destination.
            </p>

            <div className="mt-8 space-y-4">
              <Experience
                number="01"
                title="Meet your host"
                text="Start at an easy-to-find local meeting point."
              />

              <Experience
                number="02"
                title="Explore hidden places"
                text="Walk through local neighbourhoods and discover places beyond the usual route."
              />

              <Experience
                number="03"
                title="Taste something local"
                text="Stop at selected local food spots and try authentic regional flavours."
              />

              <Experience
                number="04"
                title="Finish with a local story"
                text="End the experience with stories, recommendations and places to explore next."
              />
            </div>
          </div>

          {/* FOOD */}
          <div className="rounded-[28px] bg-[#E8DED0] p-7 sm:p-9">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#68705A]">
              LOCAL FLAVOURS
            </p>

            <h3 className="mt-3 font-serif text-3xl">
              What you might taste
            </h3>

            <div className="mt-7 space-y-3">
              {[
                "Litti Chokha",
                "Sattu-based local dishes",
                "Traditional sweets",
                "Seasonal street food",
                "Local tea & snacks",
              ].map((food) => (
                <div
                  key={food}
                  className="flex items-center justify-between border-b border-[#CFC2B3] py-4"
                >
                  <span className="font-medium">{food}</span>
                  <span className="text-[#B76545]">→</span>
                </div>
              ))}
            </div>

            <p className="mt-7 text-sm leading-6 text-[#756D67]">
              Food stops can change depending on the day, availability and
              your preferences.
            </p>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="border-y border-[#E5DED6] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              MEET & EXPLORE
            </p>

            <h2 className="mt-3 font-serif text-4xl">
              Around {guide.location.split(",")[0]}
            </h2>
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-[28px] bg-[#E8DED0]">

            <iframe
              title={`${guide.location} map`}
              src="https://www.google.com/maps?q=Gandhi+Maidan+Patna+Bihar&output=embed"
              className="h-full w-full border-0 grayscale-[20%]"
              loading="lazy"
            />

            <div className="absolute bottom-5 left-5 max-w-xs rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3E7DE] text-[#B76545]">
                  <Navigation size={18} />
                </div>

                <div>
                  <p className="text-xs text-[#756D67]">
                    Meeting point
                  </p>

                  <p className="mt-1 font-bold">
                    Gandhi Maidan, Patna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              GUEST REVIEWS
            </p>

            <h2 className="mt-3 font-serif text-4xl">
              What travellers say.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Star
              size={20}
              fill="currentColor"
              className="text-[#B8945A]"
            />
            <span className="font-bold">{guide.rating}</span>
            <span className="text-[#756D67]">
              · {guide.reviews} reviews
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[24px] border border-[#E5DED6] bg-white p-6"
            >
              <div className="flex gap-1 text-[#B8945A]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-[#756D67]">
                “{review.text}”
              </p>

              <p className="mt-5 font-bold">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOST */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">

        <div className="rounded-[30px] bg-[#2C2420] p-7 text-white sm:p-10 lg:p-12">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/20">
                <img
                  src="/images/profile.jpg"
                  alt={guide.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D8B9A9]">
                  YOUR HOST
                </p>

                <h2 className="mt-1 font-serif text-3xl">
                  {guide.name}
                </h2>

                <p className="mt-1 text-sm text-white/60">
                  Local host · {guide.location}
                </p>
              </div>
            </div>

            <Link
              href={`/guides/${guide.id}/book`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#B76545] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#C87553]"
            >
              Book with {guide.name.split(" ")[0]}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] p-4">
      <div className="text-[#B76545]">{icon}</div>

      <p className="mt-3 text-xs text-[#756D67]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}

function Experience({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5 border-b border-[#E5DED6] pb-5">
      <span className="font-serif text-xl text-[#B76545]">
        {number}
      </span>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-[#756D67]">
          {text}
        </p>
      </div>
    </div>
  );
}