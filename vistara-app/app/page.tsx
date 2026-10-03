import Link from "next/link";
import Image from "next/image";

import Hero from "@/components/home/Hero";
import Navbar from "@/components/navbar";
import Footer from "./footer/page";

/* =========================================================
   FAMOUS DESTINATIONS
========================================================= */

const destinations = [
  {
    name: "Patna",
    location: "Bihar, India",
    image: "/images/golghar.jpg",
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    image: "/images/hawamahal.jpg",
  },
  {
    name: "Delhi",
    location: "India",
    image: "/images/kutub.jpg",
  },
  {
    name: "Dubai",
    location: "United Arab Emirates",
    image: "/images/dubai.jpg",
  },
  {
    name: "Goa",
    location: "India",
    image: "/images/beachhouse.jpg",
  },
  {
    name: "Countryside",
    location: "Slow travel",
    image: "/images/farm.jpg",
  },
  {
    name: "Unique stays",
    location: "Places worth discovering",
    image: "/images/blackhouse.jpg",
  },
  {
    name: "Heritage",
    location: "India",
    image: "/images/krantimandir.jpg",
  },
];

/* =========================================================
   FEATURED STAYS
========================================================= */

const featuredStays = [
  {
    name: "Beach House",
    location: "Coastal escape",
    image: "/images/beachhouse.jpg",
  },
  {
    name: "Black House",
    location: "Private retreat",
    image: "/images/blackhouse.jpg",
  },
  {
    name: "Farm Stay",
    location: "Countryside living",
    image: "/images/farm.jpg",
  },
  {
    name: "Horse Ranch",
    location: "A stay with character",
    image: "/images/horse.jpg",
  },
];

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#171614]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          EXISTING HERO
          DO NOT CHANGE — contains image + search
      ===================================================== */}

      <Hero />

      {/* =====================================================
          DESTINATIONS
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6F6B64]">
              DISCOVER PLACES
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#171614] sm:text-5xl">
              Find somewhere new.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#716D66]">
              Explore destinations, famous landmarks and places worth
              discovering for your next journey.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={`/stays?location=${encodeURIComponent(
                  destination.name
                )}`}
                className="group block"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[22px] bg-[#F3F1EC]">
                  <Image
                    src={destination.image}
                    alt={`${destination.name}, ${destination.location}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold text-[#171614]">
                    {destination.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#77736C]">
                    {destination.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED STAYS
      ===================================================== */}

      <section className="border-t border-[#E8E5DF] bg-[#FAF9F7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6F6B64]">
              VISTARA STAYS
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#171614] sm:text-5xl">
              Stay somewhere worth remembering.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#716D66]">
              Homes, retreats and unique places selected for the way you want
              to travel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featuredStays.map((stay) => (
              <Link
                key={stay.name}
                href="/stays"
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#F3F1EC]">
                  <Image
                    src={stay.image}
                    alt={stay.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-semibold text-[#171614]">
                    {stay.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#77736C]">
                    {stay.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY SECTION
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="overflow-hidden rounded-[30px] bg-[#171614] px-7 py-12 text-white sm:px-12 lg:px-16">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                  PLAN YOUR JOURNEY
                </p>

                <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                  Your stay is only the beginning.
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
                  Discover places, stays and experiences and build a journey
                  around the way you want to travel.
                </p>
              </div>

              <Link
                href="/explore"
                className="w-fit shrink-0 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#171614] transition hover:bg-[#EDEAE4]"
              >
                Build your journey →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY VISTARA
      ===================================================== */}

      <section className="border-t border-[#E8E5DF] bg-[#FAF9F7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6F6B64]">
              WHY VISTARA
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#171614] sm:text-5xl">
              Travel with more context.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Feature
              number="01"
              title="Verified stays"
              description="Discover properties with a clearer verification and trust journey."
            />

            <Feature
              number="02"
              title="Local discovery"
              description="Find food, culture, places and experiences beyond typical tourist lists."
            />

            <Feature
              number="03"
              title="Connected journeys"
              description="Turn discoveries into a planned multi-stop journey."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

type FeatureProps = {
  number: string;
  title: string;
  description: string;
};

function Feature({
  number,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="rounded-[24px] border border-[#E5E2DC] bg-white p-7">
      <span className="text-xs font-bold tracking-[0.2em] text-[#77736C]">
        {number}
      </span>

      <h3 className="mt-8 text-lg font-semibold text-[#171614]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#77736C]">
        {description}
      </p>
    </div>
  );
}