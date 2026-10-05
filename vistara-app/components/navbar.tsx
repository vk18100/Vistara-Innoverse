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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* =========================================================
   THREE DOT MENU ITEMS
========================================================= */

const menuItems = [
  // Main navigation
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

  // Account / services
  {
    href: "/profile",
    title: "Profile",
    icon: User,
  },
  {
    href: "/bookings",
    title: "Bookings",
    icon: CalendarDays,
  },
  {
    href: "/wishlist",
    title: "Wishlist",
    icon: Heart,
  },
  {
    href: "/guides",
    title: "Local Guide",
    icon: Map,
  },
  {
    href: "/local-plans",
    title: "Local Plans",
    icon: Compass,
  },
  {
    href: "/drivers",
    title: "Transport",
    icon: Car,
  },
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* =======================================================
     CLOSE MENU
  ======================================================= */

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

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /* =======================================================
     CLOSE MENU
  ======================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    setMenuOpen(false);
    window.location.href = "/login";
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-white">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Vistara home"
          className="
            shrink-0
            text-[21px]
            font-semibold
            tracking-[-0.03em]
            text-[#111111]
            transition-opacity
            hover:opacity-70
          "
        >
          Vistara
        </Link>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center gap-1">

          {/* =================================================
              LIST YOUR PROPERTY
          ================================================= */}

          <Link
            href="/host/register"
            onClick={closeMenu}
            className="
              hidden
              rounded-full
              px-3
              py-2
              text-[13px]
              font-medium
              text-[#333333]
              transition-all
              duration-200
              hover:bg-[#F3F3F3]
              hover:text-[#111111]
              sm:inline-flex
            "
          >
            List your property
          </Link>

          {/* =================================================
              SIGN IN
          ================================================= */}

          <Link
            href="/login"
            onClick={closeMenu}
            className="
              rounded-full
              px-3
              py-2
              text-[13px]
              font-semibold
              text-[#171717]
              transition-all
              duration-200
              hover:bg-[#F3F3F3]
            "
          >
            Sign in
          </Link>

          {/* =================================================
              THREE DOT MENU
          ================================================= */}

          <div className="relative" ref={menuRef}>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open more options"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                transition-all
                duration-200

                ${
                  menuOpen
                    ? "bg-[#171717] text-white"
                    : "text-[#333333] hover:bg-[#F3F3F3] hover:text-[#111111]"
                }
              `}
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
                className="
                  absolute
                  right-0
                  top-11
                  z-[100]
                  w-[255px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E5E5E5]
                  bg-white
                  p-2
                  shadow-[0_18px_50px_rgba(0,0,0,0.12)]
                "
              >

                {/* =================================================
                    MENU HEADER
                ================================================= */}

                <div className="px-3 pb-2 pt-2">

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#999999]
                    "
                  >
                    VISTARA
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-[#171717]
                    "
                  >
                    More options
                  </p>

                </div>

                <div className="my-1 h-px bg-[#EEEEEE]" />

                {/* =================================================
                    MENU ITEMS
                ================================================= */}

                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={closeMenu}
                      className={`
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition-all
                        duration-200

                        ${
                          active
                            ? "bg-[#171717] text-white"
                            : "text-[#444444] hover:bg-[#F4F4F4] hover:text-[#111111]"
                        }
                      `}
                    >

                      {/* ICON */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg

                          ${
                            active
                              ? "bg-white/15"
                              : "bg-[#F3F3F3]"
                          }
                        `}
                      >
                        <Icon size={16} />
                      </span>

                      {/* TITLE */}

                      <span>{item.title}</span>

                    </Link>
                  );
                })}

                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div className="my-1 h-px bg-[#EEEEEE]" />

                {/* =================================================
                    LOG OUT
                ================================================= */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-[#555555]
                    transition-all
                    duration-200
                    hover:bg-[#F4F4F4]
                    hover:text-[#111111]
                  "
                >

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F3F3F3]
                    "
                  >
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