"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import BecomeHostButton from "@/components/BecomeHostButton";
import {
  Car,
  Compass,
  Heart,
  HelpCircle,
  Home,
  Map,
  Menu,
  MoreHorizontal,
  Settings,
  User,
  X,
} from "lucide-react";

const navLinks = [
  {
    href: "/stays",
    label: "Stays",
  },
  {
    href: "/explore",
    label: "Explore",
  },
  {
    href: "/trips",
    label: "Trips",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------
     CLOSE ACCOUNT MENU ON OUTSIDE CLICK
  ---------------------------------- */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ---------------------------------
     PREVENT BODY SCROLL WHEN MOBILE
     MENU IS OPEN
  ---------------------------------- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---------------------------------
     CLOSE MOBILE MENU
  ---------------------------------- */
  const closeMobile = () => {
    setMobileOpen(false);
  };

  /* ---------------------------------
     CLOSE BOTH MENUS
  ---------------------------------- */
  const closeMenus = () => {
    setOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="relative z-50 bg-[#03045E] text-white">
      {/* =================================
          MAIN NAVBAR
      ================================== */}
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:h-[96px] lg:px-12">

        {/* =================================
            LOGO
        ================================== */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-3"
          aria-label="Vistara Home"
        >
          <div className="flex h-12 w-12 items-center justify-center lg:h-14 lg:w-14">
            <img
              src="/images/logo.png"
              alt="Vistara"
              className="h-11 w-11 object-contain lg:h-13 lg:w-13"
            />
          </div>

          <span className="font-serif text-3xl font-semibold tracking-tight lg:text-4xl">
            Vistara
          </span>
        </Link>

        {/* =================================
            DESKTOP NAVIGATION
        ================================== */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">

          {/* MAIN LINKS */}
          <div className="flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/85 transition hover:text-white lg:text-base"
              >
                {link.label}
              </Link>
            ))}

            {/* BECOME A HOST */}
            <BecomeHostButton />
          </div>

          {/* DIVIDER */}
          <div className="h-8 w-px bg-white/20" />

          {/* =================================
              LOGIN
              IMPORTANT:
              /signin -> /login
          ================================== */}
          <Link
            href="/login"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-white/90 lg:px-7 lg:py-3.5"
          >
            Sign In
          </Link>

          {/* =================================
              ACCOUNT / MORE MENU
          ================================== */}
          <div ref={menuRef} className="relative">

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label="Open account menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
            >
              {open ? <X size={22} /> : <MoreHorizontal size={24} />}
            </button>

            {open && (
              <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_20px_60px_rgba(3,4,94,0.2)]">

                {/* WISHLIST */}
                <MenuItem
                  href="/wishlist"
                  icon={<Heart size={18} />}
                  title="Wishlist"
                  description="Your saved places"
                  onClick={() => setOpen(false)}
                />

                {/* LOCAL PLANS */}
                <MenuItem
                  href="/local-plans"
                  icon={<Map size={18} />}
                  title="Local Plans"
                  description="Your purchased plans"
                  onClick={() => setOpen(false)}
                />

                {/* GUIDES */}
                <MenuItem
                  href="/guides"
                  icon={<Compass size={18} />}
                  title="Guides"
                  description="Find local guides"
                  onClick={() => setOpen(false)}
                />

                {/* DRIVERS */}
                <MenuItem
                  href="/drivers"
                  icon={<Car size={18} />}
                  title="Drivers"
                  description="Book local drivers"
                  onClick={() => setOpen(false)}
                />

                {/* DIVIDER */}
                <div className="my-2 h-px bg-gray-100" />

                {/* PROFILE */}
                <MenuItem
                  href="/profile"
                  icon={<User size={18} />}
                  title="Profile"
                  description="View your profile"
                  onClick={() => setOpen(false)}
                />

                {/* SETTINGS */}
                <MenuItem
                  href="/settings"
                  icon={<Settings size={18} />}
                  title="Settings"
                  description="Manage your account"
                  onClick={() => setOpen(false)}
                />

                {/* HELP */}
                <MenuItem
                  href="/settings/help"
                  icon={<HelpCircle size={18} />}
                  title="Help & Support"
                  description="Get help from Vistara"
                  onClick={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* =================================
            MOBILE MENU BUTTON
        ================================== */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* =================================
          MOBILE NAVIGATION
      ================================== */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#03045E] px-5 pb-6 pt-4 md:hidden">

          {/* MAIN LINKS */}
          <div className="space-y-1">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}

            {/* BECOME A HOST */}
            <Link
              href="/host"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
            >
              <Home size={18} />
              <span>Become a Host</span>
            </Link>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
            >
              <Heart size={18} />
              <span>Wishlist</span>
            </Link>

            {/* LOCAL PLANS */}
            <Link
              href="/local-plans"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
            >
              <Map size={18} />
              <span>Local Plans</span>
            </Link>

            {/* GUIDES */}
            <Link
              href="/guides"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
            >
              <Compass size={18} />
              <span>Guides</span>
            </Link>

            {/* DRIVERS */}
            <Link
              href="/drivers"
              onClick={closeMobile}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/90 transition hover:bg-white/10"
            >
              <Car size={18} />
              <span>Drivers</span>
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="my-4 h-px bg-white/10" />

          {/* =================================
              MOBILE LOGIN
              IMPORTANT:
              /signin -> /login
          ================================== */}
          <Link
            href="/login"
            onClick={closeMobile}
            className="block rounded-full bg-white px-5 py-3.5 text-center text-sm font-semibold text-[#03045E] transition hover:bg-white/90"
          >
            Sign In
          </Link>

          {/* PROFILE / SETTINGS */}
          <div className="mt-3 grid grid-cols-2 gap-2">

            <Link
              href="/profile"
              onClick={closeMobile}
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-white/80 transition hover:bg-white/10"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              onClick={closeMobile}
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-white/80 transition hover:bg-white/10"
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* =================================
   MENU ITEM COMPONENT
================================== */

type MenuItemProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

function MenuItem({
  href,
  icon,
  title,
  description,
  onClick,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#F5F7FF]"
    >
      {/* ICON */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#03045E]">
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm font-semibold text-[#03045E]">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
}