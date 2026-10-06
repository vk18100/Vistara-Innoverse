"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/navbar";

const settingsItems = [
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
      "Manage your travel style, interests, language and currency.",
    href: "/settings/preferences",
    icon: "✦",
  },
  {
    title: "Privacy",
    description:
      "Control your privacy, personalization and data choices.",
    href: "/privacy",
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
      "Manage payment methods and Vistara transactions.",
    href: "/settings/payments",
    icon: "₹",
  },
  {
    title: "Notifications",
    description:
      "Manage booking updates, trip alerts and notifications.",
    href: "/settings/notifications",
    icon: "◌",
  },
  {
    title: "Help",
    description:
      "Find answers and get help with your Vistara account.",
    href: "/settings/help",
    icon: "?",
  },
  {
    title: "Host",
    description:
      "Become a host and manage your hosting profile and properties.",
    href: "/host/register",
    icon: "⌂",
  },
];

export default function SettingsPage() {
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Logout successful → home page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">
            VISTARA ACCOUNT
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-xl text-xs font-medium leading-5 text-black/55 sm:text-sm">
            Manage your profile, preferences, privacy,
            security and other Vistara settings.
          </p>
        </div>
      </section>

      {/* =====================================================
          SETTINGS
      ===================================================== */}

      <section className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">

          {settingsItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-black/[0.025] sm:px-5 ${
                index !== settingsItems.length - 1
                  ? "border-b border-black/[0.08]"
                  : ""
              }`}
            >

              {/* ICON */}

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-black/[0.025] text-sm font-bold text-black transition-colors group-hover:bg-black group-hover:text-white">
                {item.icon}
              </div>

              {/* CONTENT */}

              <div className="min-w-0 flex-1">

                <h2 className="text-sm font-bold tracking-tight text-black">
                  {item.title}
                </h2>

                <p className="mt-0.5 text-[11px] font-medium leading-4 text-black/55 sm:text-xs">
                  {item.description}
                </p>

              </div>

              {/* ARROW */}

              <span className="shrink-0 text-base font-bold text-black/35 transition-transform group-hover:translate-x-1 group-hover:text-black">
                →
              </span>

            </Link>
          ))}

        </div>

        {/* ===================================================
            LOGOUT
        =================================================== */}

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/10 py-5">

          <div>

            <p className="text-sm font-bold text-black">
              Sign out
            </p>

            <p className="mt-0.5 text-[11px] font-medium text-black/50 sm:text-xs">
              Sign out from your Vistara account on this device.
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="shrink-0 rounded-lg border border-black px-4 py-2 text-xs font-bold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut
              ? "Signing out..."
              : "Log out"}
          </button>

        </div>

      </section>
    </main>
  );
}