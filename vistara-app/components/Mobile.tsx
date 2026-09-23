"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Explore",
    href: "/",
    icon: "⌂",
  },
  {
    label: "Stays",
    href: "/stays",
    icon: "⌂",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: "♡",
  },
  {
    label: "Trips",
    href: "/trips",
    icon: "▣",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "○",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-2 pb-safe backdrop-blur-md md:hidden">

      <div className="mx-auto flex max-w-md items-center justify-around">

        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[60px] flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                active
                  ? "text-[#03045e]"
                  : "text-gray-400 hover:text-[#023e8a]"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center text-lg ${
                  active ? "font-bold" : ""
                }`}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}