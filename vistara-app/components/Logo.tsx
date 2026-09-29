"use client";

import Link from "next/link";
import { Home, MoreHorizontal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[88px] bg-[#03045E]">
      <div className="mx-auto flex h-full w-full items-center justify-between px-8 lg:px-16">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          {/* V Logo */}
          <div className="flex h-10 w-10 items-center justify-center">
            <img
              src="/logo-white.png"
              alt="Vistara"
              className="h-9 w-9 object-contain"
            />
          </div>

          {/* Brand Name */}
          <span className="text-[32px] font-bold tracking-[-0.02em] text-white">
            Vistara
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/stays"
            className="text-[17px] font-medium text-white transition-opacity hover:opacity-70"
          >
            Stays
          </Link>

          <Link
            href="/explore"
            className="text-[17px] font-medium text-white transition-opacity hover:opacity-70"
          >
            Explore
          </Link>

          <Link
            href="/trips"
            className="text-[17px] font-medium text-white transition-opacity hover:opacity-70"
          >
            Trips
          </Link>

          <Link
            href="/host"
            className="flex items-center gap-2 text-[17px] font-medium text-white transition-opacity hover:opacity-70"
          >
            <Home size={20} strokeWidth={1.8} />
            <span>Become a Host</span>
          </Link>

          {/* Divider */}
          <div className="mx-1 h-10 w-px bg-white/20" />

          {/* Sign In */}
          <Link
            href="/login"
            className="rounded-full bg-white px-9 py-3 text-[16px] font-semibold text-[#03045E] transition hover:bg-white/90"
          >
            Sign In
          </Link>

          {/* More */}
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            aria-label="More options"
          >
            <MoreHorizontal size={25} strokeWidth={2} />
          </button>
        </nav>
      </div>
    </header>
  );
}