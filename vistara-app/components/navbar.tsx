"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, User, Settings, HelpCircle } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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

  return (
    <nav className="relative z-50 bg-[#03045E]">
      <div className="mx-auto flex h-[108px] max-w-[1500px] items-center justify-between px-8 lg:px-12">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >
          <div className="flex h-16 w-16 items-center justify-center">
            <img
              src="/images/logo1.png"
              alt="Vistara"
              className="h-14 w-14 object-contain"
            />
          </div>

          <span className="font-serif text-4xl font-semibold tracking-tight text-white">
            Vistara
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8">

          {/* NAV LINKS */}
          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/stays"
              className="text-[17px] font-medium text-white/90 transition hover:text-white"
            >
              Stays
            </Link>

            <Link
              href="/explore"
              className="text-[17px] font-medium text-white/90 transition hover:text-white"
            >
              Explore
            </Link>

            <Link
              href="/trips"
              className="text-[17px] font-medium text-white/90 transition hover:text-white"
            >
              Trips
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="hidden h-9 w-px bg-white/25 md:block" />

          {/* SIGN IN */}
          <Link
            href="/signin"
            className="rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-[#03045E] shadow-sm transition hover:bg-[#F7F3EA]"
          >
            Sign In
          </Link>

          {/* THREE DOT MENU */}
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Open account menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <MoreHorizontal size={25} strokeWidth={2} />
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 top-16 w-64 overflow-hidden rounded-3xl border border-[#03045E]/10 bg-white p-2 shadow-[0_20px_60px_rgba(3,4,94,0.20)]">

                {/* PROFILE */}
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-[#F7F3EA]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#03045E]">
                    <User size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#03045E]">
                      Profile
                    </p>

                    <p className="mt-0.5 text-xs text-[#64748B]">
                      View your profile
                    </p>
                  </div>
                </Link>

                {/* SETTINGS */}
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-[#F7F3EA]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#03045E]">
                    <Settings size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#03045E]">
                      Settings
                    </p>

                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Manage your account
                    </p>
                  </div>
                </Link>

                {/* HELP */}
                <Link
                  href="/settings/help"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-[#F7F3EA]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#03045E]">
                    <HelpCircle size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#03045E]">
                      Help & Support
                    </p>

                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Get help from Vistara
                    </p>
                  </div>
                </Link>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}