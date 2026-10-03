"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

const settingsItems = [
  {
    title: "Account",
    description:
      "Manage your account information and personal details.",
    href: "/settings/account",
    icon: "◎",
  },
  {
    title: "Profile",
    description:
      "View and edit your personal Vistara profile.",
    href: "/profile",
    icon: "♙",
  },
  {
    title: "Travel preferences",
    description:
      "Choose your travel style, interests, language and currency.",
    href: "/settings/preferences",
    icon: "✦",
  },
  {
    title: "Privacy",
    description:
      "Control your profile visibility, personalization and data choices.",
    href: "/settings/privacy",
    icon: "◉",
  },
  {
    title: "Security",
    description:
      "Manage your password, login protection and active sessions.",
    href: "/settings/security",
    icon: "⌁",
  },
  {
    title: "Payments",
    description:
      "Manage payment methods and view your Vistara transactions.",
    href: "/settings/payments",
    icon: "₹",
  },
  {
    title: "Notifications",
    description:
      "Manage booking updates, trip alerts and other Vistara notifications.",
    href: "/settings/notifications",
    icon: "◌",
  },
  
 {
  title: "Host",
  description:
    "Become a host, register your hosting profile, and manage your properties.",
  href: "/host/register",
  icon: "⌂",
},
];

export default function SettingsPage() {
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      // Replace with your actual authentication logout logic.
      // Example with NextAuth:
      // await signOut({ callbackUrl: "/" });

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#29231D]">
      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="border-b border-[#29231D]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B28A45]">
            VISTARA ACCOUNT
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#29231D] sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756D63] sm:text-base">
            Manage your account, profile, travel preferences, privacy,
            security and other Vistara settings.
          </p>
        </div>
      </section>

      {/* ================= SETTINGS ================= */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="overflow-hidden rounded-[28px] border border-[#29231D]/10 bg-white shadow-[0_18px_50px_rgba(41,35,29,0.06)]">
          {settingsItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 px-5 py-5 transition duration-200 hover:bg-[#F7F3EA] sm:gap-5 sm:px-7 sm:py-6 ${
                index !== settingsItems.length - 1
                  ? "border-b border-[#29231D]/10"
                  : ""
              }`}
            >
              {/* ICON */}
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-2xl
                  bg-[#F7F3EA]
                  text-lg font-semibold text-[#29231D]
                  transition duration-200
                  group-hover:bg-[#B28A45]
                  group-hover:text-white
                  sm:h-12 sm:w-12
                "
              >
                {item.icon}
              </div>

              {/* TEXT */}
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-[#29231D] sm:text-base">
                  {item.title}
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-[#756D63] sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* ARROW */}
              <span
                className="
                  shrink-0
                  text-xl
                  text-[#A49B90]
                  transition duration-200
                  group-hover:translate-x-1
                  group-hover:text-[#B28A45]
                  sm:text-2xl
                "
              >
                →
              </span>
            </Link>
          ))}
        </div>

        {/* ================= LOGOUT ================= */}
        <div className="mt-6 rounded-[26px] border border-[#29231D]/10 bg-white p-5 shadow-[0_12px_35px_rgba(41,35,29,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#29231D]">
                Sign out of Vistara
              </p>

              <p className="mt-1 text-xs leading-5 text-[#756D63] sm:text-sm">
                Sign out from your Vistara account on this device.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="
                w-fit
                rounded-xl
                border border-[#29231D]/20
                px-5 py-3
                text-sm font-semibold
                text-[#29231D]
                transition
                hover:border-[#29231D]
                hover:bg-[#29231D]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loggingOut ? "Signing out..." : "Log out"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}