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
    message: "Your stay in Patna has been successfully confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "wishlist",
    title: "Price update",
    message: "A stay from your wishlist has a new price.",
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
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-10">
          <Link
            href="/settings"
            className="text-xs font-medium text-black/50 transition hover:text-black"
          >
            ← Settings
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
                Updates
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
                Notifications
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-5 text-black/55 sm:text-sm">
                Stay updated with your bookings, trips, saved places
                and important Vistara activity.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="
                  w-fit
                  rounded-lg
                  border border-black/15
                  bg-white
                  px-3.5 py-2
                  text-xs
                  font-semibold
                  text-black
                  transition
                  hover:bg-black
                  hover:text-white
                "
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-8">
        {notifications.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
            {notifications.map((notification, index) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => markAsRead(notification.id)}
                className={`
                  group flex w-full items-start gap-3
                  px-4 py-4
                  text-left
                  transition
                  sm:gap-4
                  sm:px-5 sm:py-4
                  ${
                    index !== notifications.length - 1
                      ? "border-b border-black/10"
                      : ""
                  }
                  ${
                    notification.unread
                      ? "bg-black/[0.025]"
                      : "bg-white"
                  }
                  hover:bg-black/[0.04]
                `}
              >
                {/* ICON */}
                <NotificationIcon type={notification.type} />

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-xs sm:text-sm ${
                          notification.unread
                            ? "font-bold text-black"
                            : "font-semibold text-black/75"
                        }`}
                      >
                        {notification.title}
                      </h2>

                      {notification.unread && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                      )}
                    </div>

                    <span className="text-[10px] text-black/40 sm:text-xs">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-black/55 sm:text-sm">
                    {notification.message}
                  </p>

                  {notification.unread && (
                    <p className="mt-2 text-[10px] font-semibold text-black/55">
                      Tap to mark as read
                    </p>
                  )}
                </div>

                {/* ARROW */}
                <span className="hidden shrink-0 self-center text-sm text-black/30 transition group-hover:translate-x-1 group-hover:text-black sm:block">
                  →
                </span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyNotifications />
        )}

        {/* PREFERENCES */}
        <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.025] px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                Preferences
              </p>

              <h2 className="mt-1 text-sm font-bold text-black">
                Notification preferences
              </h2>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Choose which Vistara updates you want to receive.
              </p>
            </div>

            <Link
              href="/settings/preferences"
              className="
                w-fit
                rounded-lg
                border border-black
                px-3.5 py-2
                text-xs
                font-semibold
                text-black
                transition
                hover:bg-black
                hover:text-white
              "
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
    <div
      className="
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-lg
        border border-black/10
        bg-black/[0.025]
        text-sm font-bold
        text-black
        transition
        group-hover:bg-black
        group-hover:text-white
        sm:h-10 sm:w-10
      "
    >
      {icons[type]}
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyNotifications() {
  return (
    <div className="rounded-xl border border-black/10 bg-white px-5 py-10 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-sm font-bold text-black">
        ✓
      </div>

      <h2 className="mt-4 text-lg font-bold text-black">
        You're all caught up
      </h2>

      <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-black/50">
        New updates about your bookings, trips and stays will
        appear here.
      </p>

      <Link
        href="/stays"
        className="
          mt-5
          inline-flex
          rounded-lg
          bg-black
          px-4 py-2.5
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-black/80
        "
      >
        Explore stays
      </Link>
    </div>
  );
}