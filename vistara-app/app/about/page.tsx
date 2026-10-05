"use client";

import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

const values = [
  {
    icon: Compass,
    title: "Discover differently",
    text: "Find stays, places and experiences beyond the usual tourist path.",
    href: "/explore",
  },
  {
    icon: Users,
    title: "Local connection",
    text: "Meet people who know their destinations through lived experience.",
    href: "/guides",
  },
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    text: "We focus on verified listings, trusted people and transparent information.",
    href: "/stays",
  },
  {
    icon: Heart,
    title: "Travel with meaning",
    text: "Create journeys around places, people and experiences that matter.",
    href: "/trips",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/50">
              About Vistara
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Travel closer to the places you visit.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-black/60 sm:text-[15px]">
              Vistara helps travellers discover unique stays, local guides,
              hidden destinations and meaningful experiences across India.
            </p>

            <Link
              href="/explore"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:opacity-60"
            >
              Explore Vistara
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45">
              Our story
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              More than a booking platform.
            </h2>
          </div>

          <div className="max-w-2xl space-y-4 text-sm leading-6 text-black/65">
            <p>
              We believe travelling should be about more than checking places
              off a list. The best journeys come from discovering how a place
              actually feels.
            </p>

            <p>
              Vistara brings stays, local knowledge, experiences and trip
              planning together so travellers can discover destinations in a
              more personal way.
            </p>

            <p>
              From a hidden neighbourhood in Patna to a quiet stay somewhere
              you've never considered, our goal is simple: help you travel
              differently.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/45">
              What we believe
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Built around better journeys.
            </h2>
          </div>

          <div className="grid border-l border-t border-black/10 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Link
                  key={value.title}
                  href={value.href}
                  className="group border-b border-r border-black/10 p-6 transition hover:bg-black hover:text-white"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={19} strokeWidth={1.6} />

                    <ArrowRight
                      size={16}
                      className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-7 text-base font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-5 text-black/55 group-hover:text-white/65">
                    {value.text}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SIMPLE CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-5 border-y border-black/10 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Ready to explore differently?
              </p>

              <p className="mt-1 text-sm text-black/55">
                Start discovering places, stays and local experiences.
              </p>
            </div>

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:opacity-60"
            >
              Start exploring
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}