"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  User,
  Heart,
  CalendarDays,
  ShieldCheck,
  Lock,
  Bell,
  ChevronRight,
  Settings,
} from "lucide-react";

const accountSections = [
  {
    title: "Personal information",
    description: "Manage your name, email, phone and profile details.",
    href: "/settings/profile",
    icon: User,
  },
  {
    title: "Trips & bookings",
    description: "View your upcoming and completed Vistara journeys.",
    href: "/bookings",
    icon: CalendarDays,
  },
  {
    title: "Saved places",
    description: "Your wishlist and places you want to remember.",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Security",
    description: "Manage your password, login and account protection.",
    href: "/settings/security",
    icon: Lock,
  },
  {
    title: "Privacy",
    description: "Review how your information is handled on Vistara.",
    href: "/settings/privacy",
    icon: ShieldCheck,
  },
  {
    title: "Notifications",
    description: "Choose what updates and travel notifications you receive.",
    href: "/settings/preferences",
    icon: Bell,
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#1C1C1C]">
      <Navbar />

      {/* Page */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-5 flex items-center gap-2 text-sm text-[#77756E]">
            <Link
              href="/profile"
              className="transition hover:text-[#1C1C1C]"
            >
              Profile
            </Link>

            <span>/</span>

            <span className="text-[#1C1C1C]">Account</span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
                Your Vistara
              </p>

              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                Account
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6B6B65] sm:text-base">
                Everything you need to manage your profile, journeys,
                saved places and account preferences.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E2DA] bg-white">
              <Settings
                size={19}
                strokeWidth={1.6}
                className="text-[#1C1C1C]"
              />
            </div>
          </div>
        </div>

        {/* Account overview */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-[#E5E2DA] bg-white">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F1EEE6] font-serif text-xl text-[#1C1C1C]">
              V
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.18em] text-[#B08D57]">
                Vistara account
              </p>

              <h2 className="mt-1 truncate font-serif text-2xl text-[#1C1C1C]">
                Your travel space
              </h2>

              <p className="mt-1 text-sm text-[#77756E]">
                Manage your information and travel preferences.
              </p>
            </div>

            <Link
              href="/settings/profile"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D5CC] px-5 py-3 text-sm font-medium text-[#1C1C1C] transition hover:bg-[#F8F7F3]"
            >
              Edit profile
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Sections */}
        <div>
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D57]">
              Manage
            </p>

            <h2 className="mt-2 font-serif text-2xl text-[#1C1C1C] sm:text-3xl">
              Your account
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {accountSections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-3xl border border-[#E5E2DA] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#D2C8B6] hover:shadow-[0_10px_35px_rgba(40,35,25,0.06)] sm:p-6"
                >
                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1EEE6] text-[#1C1C1C] transition group-hover:bg-[#EDE7DA]">
                      <Icon
                        size={19}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-[#1C1C1C] sm:text-lg">
                            {section.title}
                          </h3>

                          <p className="mt-1.5 max-w-md text-sm leading-6 text-[#77756E]">
                            {section.description}
                          </p>
                        </div>

                        <ChevronRight
                          size={18}
                          className="mt-1 shrink-0 text-[#AAA69C] transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Travel note */}
        <div className="mt-10 rounded-3xl border border-[#E5E2DA] bg-[#F1EEE6] p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B08D57]">
              Your journey
            </p>

            <h2 className="mt-2 font-serif text-2xl leading-tight text-[#1C1C1C] sm:text-3xl">
              Your account follows your journey.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B6B65]">
              From finding a stay and discovering places to saving
              experiences and planning your next trip, your Vistara
              account keeps everything together.
            </p>

            <Link
              href="/trips"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1C1C1C] transition hover:text-[#B08D57]"
            >
              View your trips
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12" />
      </section>
    </main>
  );
}