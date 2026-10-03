"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Heart,
  Map,
  UserRound,
  Home,
} from "lucide-react";

const navItems = [
  {
    label: "Explore",
    href: "/",
    icon: Compass,
  },
  {
    label: "Stays",
    href: "/stays",
    icon: Home,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Trips",
    href: "/trips",
    icon: Map,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-[#E7E2D8]
        bg-white/95
        backdrop-blur-xl
        md:hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          max-w-md
          items-center
          justify-around
          px-2
          pb-[env(safe-area-inset-bottom)]
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`
                group
                flex
                min-w-[58px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                rounded-2xl
                py-2
                text-[11px]
                font-medium
                transition-all
                duration-200
                ${
                  active
                    ? "text-[#8B6F3D]"
                    : "text-[#A8A29E] hover:text-[#57534E]"
                }
              `}
            >
              {/* ICON */}

              <span
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-[#F7F3EA]"
                      : "bg-transparent group-hover:bg-[#FAF7F1]"
                  }
                `}
              >
                <Icon
                  size={19}
                  strokeWidth={active ? 2.2 : 1.8}
                />
              </span>

              {/* LABEL */}

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}