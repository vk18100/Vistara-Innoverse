"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  MoreHorizontal,
  User,
  Settings,
  Map,
  Compass,
  Car,
  Home,
  Heart,
  CalendarDays,
  LogOut,
  X,
  Menu,
} from "lucide-react";

/* =========================================================
   MAIN NAVIGATION
========================================================= */

const mainNavigation = [
  
  {
    href: "/stays",
    label: "Stays",
  },
  {
    href: "/trips",
    label: "Trips",
  },
  {
    href: "/experiences",
    label: "Experiences",
  },
  {
    href:"/explore",
    label:"Explore"
  }
];

/* =========================================================
   EXPLORE / MORE MENU
========================================================= */

const menuItems = [
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
  },
  {
    href: "/wishlist",
    title: "Wishlist",
    icon: Heart,
  },
  {
    href: "/bookings",
    title: "Bookings",
    icon: CalendarDays,
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
    title: "Drivers",
    icon: Car,
  },
  {
    href: "/host/register",
    title: "Host",
    icon: Home,
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    setMenuOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);

    if (!query) {
      router.push("/stays");
      return;
    }

    router.push(`/stays?search=${encodeURIComponent(query)}`);
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    setMenuOpen(false);
    setMobileOpen(false);

    router.push("/login");
  };

  /* =======================================================
     CLOSE ALL
  ======================================================= */

  const closeAllMenus = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E1D8] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          onClick={closeAllMenus}
          aria-label="Vistara home"
          className="
            shrink-0
            font-serif
            text-[27px]
            font-semibold
            tracking-tight
            text-[#171717]
            transition-opacity
            hover:opacity-70
          "
        >
          Vistara
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                text-sm
                font-medium
                text-[#404040]
                transition-colors
                duration-200
                hover:text-[#171717]
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center gap-1.5">

          {/* =================================================
              SEARCH
          ================================================= */}

          {searchOpen ? (
            <form
              onSubmit={handleSearch}
              className="
                hidden
                items-center
                rounded-full
                border
                border-[#D6D1C7]
                bg-[#F8F6F1]
                px-3
                py-1.5
                shadow-sm
                sm:flex
              "
            >
              <Search
                size={17}
                className="mr-2 text-[#404040]"
              />

              <input
                autoFocus
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search Vistara..."
                aria-label="Search Vistara"
                className="
                  w-[180px]
                  bg-transparent
                  text-sm
                  text-[#171717]
                  outline-none
                  placeholder:text-[#A3A09A]
                "
              />

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                aria-label="Close search"
                className="
                  ml-2
                  rounded-full
                  p-1
                  text-[#737373]
                  transition
                  hover:bg-[#EAE6DE]
                  hover:text-[#171717]
                "
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              aria-label="Search Vistara"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[#404040]
                transition-all
                hover:bg-[#F7F4EE]
                hover:text-[#171717]
              "
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* =================================================
              SIGN IN
          ================================================= */}

          <Link
            href="/login"
            className="
              hidden
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              text-[#171717]
              transition
              hover:bg-[#F7F4EE]
              sm:inline-flex
            "
          >
            Sign in
          </Link>

          {/* =================================================
              PROFILE
          ================================================= */}

          <Link
            href="/profile"
            aria-label="Open profile"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#E5E1D8]
              bg-white
              text-[#404040]
              transition-all
              hover:border-[#C6A15B]
              hover:bg-[#F7F4EE]
              hover:text-[#171717]
            "
          >
            <User
              size={18}
              strokeWidth={1.8}
            />
          </Link>

          {/* =================================================
              MORE MENU
          ================================================= */}

          <div className="relative hidden sm:block">

            <button
              type="button"
              aria-label="Open more options"
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((current) => !current);
                setSearchOpen(false);
              }}
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition-all
                ${
                  menuOpen
                    ? "bg-[#171717] text-white"
                    : "text-[#404040] hover:bg-[#F7F4EE] hover:text-[#171717]"
                }
              `}
            >
              <MoreHorizontal
                size={21}
                strokeWidth={2}
              />
            </button>

            {/* =================================================
                DROPDOWN
            ================================================= */}

            {menuOpen && (
              <>
                {/* Outside click */}
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="
                    fixed
                    inset-0
                    z-40
                    h-full
                    w-full
                    cursor-default
                  "
                />

                <div
                  role="menu"
                  className="
                    absolute
                    right-0
                    top-12
                    z-50
                    w-[270px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#E5E1D8]
                    bg-white
                    p-2
                    shadow-[0_20px_60px_rgba(23,23,23,0.14)]
                  "
                >

                  {/* MENU HEADER */}

                  <div className="px-3 pb-2 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A09A]">
                      VISTARA
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#171717]">
                      Explore more
                    </p>
                  </div>

                  <div className="my-2 h-px bg-[#E5E1D8]" />

                  {/* MENU LINKS */}

                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-3
                          py-2.5
                          text-sm
                          font-medium
                          text-[#404040]
                          transition
                          hover:bg-[#F7F4EE]
                          hover:text-[#171717]
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
                            bg-[#F1EFEA]
                          "
                        >
                          <Icon size={16} />
                        </span>

                        <span>{item.title}</span>
                      </Link>
                    );
                  })}

                  <div className="my-2 h-px bg-[#E5E1D8]" />

                  {/* LOGOUT */}

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
                      font-medium
                      text-[#737373]
                      transition
                      hover:bg-[#F7F4EE]
                      hover:text-[#171717]
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
                        bg-[#F1EFEA]
                      "
                    >
                      <LogOut size={16} />
                    </span>

                    <span>Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((current) => !current);
              setSearchOpen(false);
              setMenuOpen(false);
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#404040]
              transition
              hover:bg-[#F7F4EE]
              hover:text-[#171717]
              sm:hidden
            "
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-[#E5E1D8]
            bg-white
            px-4
            pb-6
            pt-4
            shadow-[0_15px_40px_rgba(23,23,23,0.08)]
            sm:hidden
          "
        >

          {/* MOBILE SEARCH */}

          <form
            onSubmit={handleSearch}
            className="
              mb-4
              flex
              items-center
              rounded-2xl
              border
              border-[#E5E1D8]
              bg-[#F8F6F1]
              px-4
              py-3
            "
          >
            <Search
              size={18}
              className="mr-3 shrink-0 text-[#404040]"
            />

            <input
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search Vistara..."
              aria-label="Search Vistara"
              className="
                min-w-0
                flex-1
                bg-transparent
                text-sm
                text-[#171717]
                outline-none
                placeholder:text-[#A3A09A]
              "
            />
          </form>

          {/* MOBILE MAIN NAV */}

          <nav className="space-y-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="
                  block
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[#404040]
                  transition
                  hover:bg-[#F7F4EE]
                  hover:text-[#171717]
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="my-3 h-px bg-[#E5E1D8]" />

          {/* MOBILE ACCOUNT LINKS */}

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-[#404040]
                    transition
                    hover:bg-[#F7F4EE]
                    hover:text-[#171717]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F1EFEA]
                    "
                  >
                    <Icon size={16} />
                  </span>

                  {item.title}
                </Link>
              );
            })}

            {/* MOBILE SIGN IN */}

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-[#171717]
                transition
                hover:bg-[#F7F4EE]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F1EFEA]
                "
              >
                <User size={16} />
              </span>

              Sign in
            </Link>

            {/* MOBILE LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                text-[#737373]
                transition
                hover:bg-[#F7F4EE]
                hover:text-[#171717]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F1EFEA]
                "
              >
                <LogOut size={16} />
              </span>

              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}