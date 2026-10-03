"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

type Notification = {
  id: number;
  type: "booking" | "wishlist" | "verification" | "trip";
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "booking",
    title: "Booking confirmed",
    message:
      "Your stay in Patna has been successfully confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "wishlist",
    title: "Price update",
    message:
      "A stay from your wishlist has a new price.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    type: "verification",
    title: "Property verified",
    message:
      "A property you viewed has completed Vistara verification.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 4,
    type: "trip",
    title: "Upcoming trip",
    message:
      "Your upcoming stay is approaching. Check your trip details.",
    time: "3 days ago",
    unread: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#29251F]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#29251F]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#756F65] transition hover:text-[#29251F]"
          >
            ← Settings
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
                UPDATES
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756F65] sm:text-base">
                Stay updated with your bookings, trips, saved places
                and important Vistara activity.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="w-fit rounded-xl border border-[#29251F]/20 bg-white px-5 py-3 text-sm font-semibold text-[#29251F] transition hover:border-[#C6A15B] hover:bg-[#F7F3EA]"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {notifications.length > 0 ? (
          <div className="overflow-hidden rounded-[28px] border border-[#29251F]/10 bg-white shadow-[0_20px_60px_rgba(41,37,31,0.05)]">
            {notifications.map((notification, index) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => markAsRead(notification.id)}
                className={`group flex w-full gap-4 p-5 text-left transition sm:gap-5 sm:p-6 ${
                  index !== notifications.length - 1
                    ? "border-b border-[#29251F]/10"
                    : ""
                } ${
                  notification.unread
                    ? "bg-[#FDFBF6]"
                    : "bg-white"
                } hover:bg-[#F7F3EA]`}
              >
                {/* ICON */}
                <NotificationIcon type={notification.type} />

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-sm sm:text-base ${
                          notification.unread
                            ? "font-bold text-[#29251F]"
                            : "font-semibold text-[#4A433A]"
                        }`}
                      >
                        {notification.title}
                      </h2>

                      {notification.unread && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#C6A15B]" />
                      )}
                    </div>

                    <span className="shrink-0 text-xs text-[#9A948A]">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#756F65]">
                    {notification.message}
                  </p>

                  {notification.unread && (
                    <p className="mt-3 text-xs font-semibold text-[#C6A15B]">
                      Tap to mark as read
                    </p>
                  )}
                </div>

                {/* ARROW */}
                <span className="hidden self-center text-lg text-[#B5AEA3] transition group-hover:translate-x-1 group-hover:text-[#C6A15B] sm:block">
                  →
                </span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyNotifications />
        )}

        {/* NOTIFICATION SETTINGS */}
        <div className="mt-6 rounded-[28px] border border-[#C6A15B]/20 bg-[#F7F3EA] p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PREFERENCES
              </p>

              <h2 className="mt-2 font-serif text-xl font-semibold text-[#29251F]">
                Manage notification preferences
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-[#756F65]">
                Choose which Vistara updates you want to receive.
              </p>
            </div>

            <Link
              href="/settings/preferences"
              className="w-fit rounded-xl border border-[#29251F] px-5 py-3 text-sm font-semibold text-[#29251F] transition hover:bg-[#29251F] hover:text-white"
            >
              Manage preferences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- NOTIFICATION ICON ---------------- */

function NotificationIcon({
  type,
}: {
  type: Notification["type"];
}) {
  const icons = {
    booking: "✓",
    wishlist: "♡",
    verification: "✓",
    trip: "✦",
  };

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F7F3EA] text-lg font-semibold text-[#29251F] transition group-hover:bg-[#C6A15B] group-hover:text-white sm:h-12 sm:w-12">
      {icons[type]}
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyNotifications() {
  return (
    <div className="rounded-[28px] border border-[#29251F]/10 bg-white p-10 text-center shadow-[0_20px_60px_rgba(41,37,31,0.05)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F3EA] text-xl font-semibold text-[#C6A15B]">
        ✓
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold text-[#29251F]">
        You're all caught up
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756F65]">
        New updates about your bookings, trips and stays will
        appear here.
      </p>

      <Link
        href="/stays"
        className="mt-6 inline-flex rounded-xl bg-[#29251F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A433A]"
      >
        Explore stays
      </Link>
    </div>
  );
}