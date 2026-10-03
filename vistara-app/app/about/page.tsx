import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Home,
  Map,
  ShieldCheck,
  Sparkles,
  Car,
  Users,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

const journey = [
  {
    number: "01",
    title: "Find a stay",
    description:
      "Discover homes, apartments, villas, hotels, resorts, hostels, homestays and other accommodation options.",
    icon: Home,
  },
  {
    number: "02",
    title: "Check in",
    description:
      "Book your stay with information about price, availability, amenities, reviews and verification.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Explore your area",
    description:
      "Choose the area where you are staying, your date, guests and interests to discover what is around you.",
    icon: Compass,
  },
  {
    number: "04",
    title: "Build your journey",
    description:
      "Use a Local Plan to unlock detailed locations, maps, directions and a planned sequence of places.",
    icon: Map,
  },
];

const pillars = [
  {
    icon: Home,
    title: "Accommodation",
    description:
      "Vistara brings different types of stays into one place, from homes and villas to hotels, homestays and farm stays.",
  },
  {
    icon: Compass,
    title: "Local discovery",
    description:
      "Explore more than just your accommodation. Discover food, places, cafes, markets, experiences, culture, nature and more.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & verification",
    description:
      "Verification is part of the Vistara experience, helping users understand the information available around properties and hosts.",
  },
  {
    icon: Sparkles,
    title: "Intelligent recommendations",
    description:
      "Vistara's AI and ML layer is designed for recommendations, property ranking, verification, review and photo intelligence.",
  },
];

const discoveryItems = [
  "Food & restaurants",
  "Cafes & local markets",
  "Experiences & events",
  "Culture & religious places",
  "Nature & local attractions",
  "Shopping & tourist essentials",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#171614]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#E5DED4] bg-[#F4EFE7]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B97845]">
              ABOUT VISTARA
            </p>

            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#03045E] md:text-7xl">
              Stay somewhere.
              <br />
              Then discover what
              <br />
              makes it special.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#625D56] md:text-lg">
              Vistara is a connected travel platform designed to bring
              accommodation, local discovery and the journey between them
              into one experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/stays"
                className="inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Explore stays
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D8CFC3] bg-white px-6 py-3.5 text-sm font-semibold text-[#03045E] transition hover:border-[#03045E]"
              >
                Discover places
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS VISTARA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B97845]">
                THE IDEA
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#03045E] md:text-5xl">
                Travel should not stop at the booking.
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-[#4F4A44]">
                Vistara connects the different parts of a journey instead of
                treating them as separate products.
              </p>

              <p className="mt-5 text-base leading-8 text-[#77726A]">
                A traveler can find a stay, book it, check in, explore the
                surrounding area, discover relevant places and experiences,
                unlock a Local Plan, and continue the journey through
                self-exploration, a local guide or Vistara transport.
              </p>

              <p className="mt-5 text-base leading-8 text-[#77726A]">
                The goal is to make the journey around a stay as useful and
                connected as the stay itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="border-y border-[#E5DED4] bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B97845]">
              WHAT VISTARA BRINGS TOGETHER
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
              One platform, connected experiences.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#77726A]">
              Vistara is structured around accommodation, discovery,
              transportation and intelligence working together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#E1D9CE] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(3,4,94,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EBDD] text-[#B97845]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-semibold text-[#03045E]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77726A]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B97845]">
              THE VISTARA JOURNEY
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
              From stay to exploration.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="relative rounded-[24px] border border-[#E2DDD5] bg-[#FAF9F6] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#B97845]">
                      {item.number}
                    </span>

                    <Icon
                      size={20}
                      strokeWidth={1.7}
                      className="text-[#03045E]"
                    />
                  </div>

                  <h3 className="mt-8 font-serif text-xl font-semibold text-[#03045E]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#77726A]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCAL PLAN */}
      <section className="bg-[#29231F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D6A66F]">
                THE LOCAL PLAN
              </p>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Don't just know the city.
                <br />
                Know where to go.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#CFC7BF]">
                Vistara's Explore journey lets a traveler select an area,
                date, guests and interests before discovering relevant local
                options.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-[#CFC7BF]">
                A Local Plan can then unlock exact locations, place and shop
                details, maps, directions and route sequences.
              </p>

              <Link
                href="/explore"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#29231F] transition hover:bg-[#F4EFE7]"
              >
                Explore Vistara
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D6A66F]">
                DISCOVER
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {discoveryItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#E5DED7]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORT */}
      <section className="bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B97845]">
                SERVICES
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
                The journey between the places matters too.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#77726A]">
                Vistara's Services module is designed for local and intercity
                transportation, including Bike, Auto and Car options.
              </p>

              <p className="mt-4 text-base leading-8 text-[#77726A]">
                For local exploration, transport can also follow a multi-stop
                journey — from the stay to different places and experiences,
                and eventually back to the stay.
              </p>

              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#03045E] hover:underline"
              >
                Explore services
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <ServiceCard
                icon={<Car size={22} />}
                title="Bike"
                text="Local rides"
              />

              <ServiceCard
                icon={<Car size={22} />}
                title="Auto"
                text="City travel"
              />

              <ServiceCard
                icon={<Car size={22} />}
                title="Car"
                text="Local & intercity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST + AI */}
      <section className="border-y border-[#E5DED4] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] bg-[#F4EFE7] p-8 md:p-10">
              <ShieldCheck
                size={28}
                strokeWidth={1.7}
                className="text-[#B97845]"
              />

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#B97845]">
                TRUST
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E]">
                Verification is part of the experience.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F685F]">
                Vistara includes property and host verification workflows so
                verification information can be surfaced alongside the
                accommodation experience.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#03045E] p-8 text-white md:p-10">
              <Sparkles
                size={28}
                strokeWidth={1.7}
                className="text-[#D6A66F]"
              />

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#D6A66F]">
                INTELLIGENCE
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Technology that helps make discovery smarter.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#C9D0E3]">
                Vistara's AI/ML direction includes recommendation, property
                ranking, verification, photo intelligence, review
                intelligence, Explore and plan intelligence, and
                personalization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR BOTH SIDES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B97845]">
              BUILT AROUND PEOPLE
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
              For the people who travel.
              <br />
              And the people who host.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-[#E2DDD5] p-8">
              <Users size={26} className="text-[#B97845]" />

              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#03045E]">
                For guests
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#77726A]">
                Find a suitable stay, understand the property, make a
                booking, discover the surrounding area and continue the
                journey with relevant local options.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#E2DDD5] p-8">
              <Home size={26} className="text-[#B97845]" />

              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#03045E]">
                For hosts
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#77726A]">
                Hosts can present accommodation, manage property information,
                complete verification workflows and participate in the
                connected Vistara marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL STORY */}
      <section className="bg-[#F4EFE7]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B97845]">
            THE VISTARA IDEA
          </p>

          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#03045E] md:text-6xl">
            Book a stay.
            <br />
            Discover the place.
            <br />
            Experience the journey.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#77726A]">
            Vistara brings these pieces together into one connected travel
            experience — from the moment you choose where to stay to the
            places you discover along the way.
          </p>

          <div className="mt-9 flex justify-center gap-3">
            <Link
              href="/stays"
              className="inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Find a stay
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ServiceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#E2DDD5] bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EBDD] text-[#B97845]">
        {icon}
      </div>

      <h3 className="mt-6 font-serif text-xl font-semibold text-[#03045E]">
        {title}
      </h3>

      <p className="mt-2 text-sm text-[#77726A]">{text}</p>
    </div>
  );
}