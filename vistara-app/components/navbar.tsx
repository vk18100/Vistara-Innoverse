"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MoreHorizontal,
  User,
  Settings,
  Heart,
  CalendarDays,
  Map,
  Compass,
  Car,
  Home,
  LogOut,
  BriefcaseBusiness,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* =========================================================
   MAIN NAVIGATION
   Desktop par center mein ye 4 rahenge:
   All | Stay | Experience | Explore
========================================================= */

const mainNavigation = [
  {
    href: "/",
    title: "All",
    icon: Home,
  },
  {
    href: "/stays",
    title: "Stay",
    icon: Home,
  },
  {
    href: "/experiences",
    title: "Experience",
    icon: Compass,
  },
  {
    href: "/explore",
    title: "Explore",
    icon: Map,
  },
];

/* =========================================================
   MORE MENU
   Desktop + mobile dono mein ye options rahenge
========================================================= */

const moreMenuItems = [
  {
    href: "/trips",
    title: "Trips",
    icon: CalendarDays,
  },
  {
    href: "/guides",
    title: "Guides",
    icon: Map,
  },
  {
    href: "/local-plans",
    title: "Local Plans",
    icon: Compass,
  },
  {
    href: "/drivers",
    title: "Drivers",
    icon: Car,
  },
  {
    href: "/wishlist",
    title: "Wishlist",
    icon: Heart,
  },
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
  },
  {
    href: "/host/register",
    title: "Host",
    icon: BriefcaseBusiness,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* =========================================================
     CLOSE MENU ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setMenuOpen(false);
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white">
      <div className="mx-auto flex h-[62px] w-full max-w-[1600px] items-center px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Vistara home"
          className="shrink-0 text-[21px] font-semibold tracking-[-0.04em] text-black transition-opacity hover:opacity-65"
        >
          Vistara
        </Link>

        {/* =====================================================
            DESKTOP CENTER NAVIGATION

            All | Stay | Experience | Explore
        ===================================================== */}

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {mainNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-black text-white"
                    : "text-black/65 hover:bg-black/[0.05] hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="ml-auto flex items-center gap-1">

          {/* List your property - Desktop */}
          <Link
            href="/host/register"
            onClick={closeMenu}
            className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-black/75 transition-all hover:bg-black/[0.05] hover:text-black sm:inline-flex"
          >
            List your property
          </Link>

          {/* Sign in - Desktop */}
          <Link
            href="/login"
            onClick={closeMenu}
            className="hidden rounded-full px-3 py-2 text-[13px] font-semibold text-black transition-all hover:bg-black/[0.05] hover:text-black sm:inline-flex"
          >
            Sign in
          </Link>

          {/* ===================================================
              THREE DOT MENU
          =================================================== */}

          <div className="relative" ref={menuRef}>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open more options"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${
                menuOpen
                  ? "bg-black text-white"
                  : "text-black hover:bg-black/[0.06]"
              }`}
            >
              <MoreHorizontal
                size={20}
                strokeWidth={2}
              />
            </button>

            {/* =================================================
                DROPDOWN
            ================================================= */}

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 z-[100] w-[270px] overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_55px_rgba(0,0,0,0.14)]"
              >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="px-3 pb-2 pt-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    VISTARA
                  </p>

                  <p className="mt-1 text-sm font-semibold text-black">
                    More options
                  </p>
                </div>

                <div className="my-1 h-px bg-black/10" />

                {/* =================================================
                    SMALL SCREEN ONLY

                    All
                    Stay
                    Experience
                    Explore
                ================================================= */}

                <div className="md:hidden">
                  {mainNavigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={`mobile-${item.href}`}
                        href={item.href}
                        role="menuitem"
                        onClick={closeMenu}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                          active
                            ? "bg-black text-white"
                            : "text-black/70 hover:bg-black/[0.05] hover:text-black"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-white/15"
                              : "bg-black/[0.04]"
                          }`}
                        >
                          <Icon size={16} />
                        </span>

                        <span>{item.title}</span>
                      </Link>
                    );
                  })}

                  <div className="my-1 h-px bg-black/10" />
                </div>

                {/* =================================================
                    TRIPS → HOST

                    Desktop + Mobile
                ================================================= */}

                <div className="space-y-0.5">
                  {moreMenuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={closeMenu}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                          active
                            ? "bg-black text-white"
                            : "text-black/70 hover:bg-black/[0.05] hover:text-black"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-white/15"
                              : "bg-black/[0.04]"
                          }`}
                        >
                          <Icon size={16} />
                        </span>

                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* =================================================
                    MOBILE ONLY

                    List your property
                    Sign in
                ================================================= */}

                <div className="sm:hidden">
                  <div className="my-1 h-px bg-black/10" />

                  <Link
                    href="/host/register"
                    role="menuitem"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/70 transition hover:bg-black/[0.05] hover:text-black"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                      <Home size={16} />
                    </span>

                    <span>List your property</span>
                  </Link>

                  <Link
                    href="/login"
                    role="menuitem"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/70 transition hover:bg-black/[0.05] hover:text-black"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                      <User size={16} />
                    </span>

                    <span>Sign in</span>
                  </Link>
                </div>

                {/* =================================================
                    LOGOUT
                ================================================= */}

                <div className="my-1 h-px bg-black/10" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-black/65 transition-all duration-200 hover:bg-black/[0.05] hover:text-black"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04]">
                    <LogOut size={16} />
                  </span>

                  <span>Log out</span>
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}