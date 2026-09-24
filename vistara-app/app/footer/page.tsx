import Link from "next/link";

const exploreLinks = [
  { href: "/stays", label: "Stays" },
  { href: "/explore", label: "Explore" },
  { href: "/experiences", label: "Experiences" },
  { href: "/trips", label: "Trips" },
];

const guestLinks = [
  { href: "/wishlist", label: "Wishlist" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/help", label: "Help Centre" },
];

const vistaraLinks = [
  { href: "/about", label: "About Vistara" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

function FooterLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-3 text-sm text-gray-500">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block transition-colors hover:text-[#0D21A1]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-[#03045E]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">

        {/* MAIN FOOTER */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-3xl font-semibold tracking-tight"
            >
              Vistara
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
              Discover unique stays, hidden destinations and meaningful
              experiences across India.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0D21A1] transition hover:text-[#03045E]"
            >
              Start exploring
              <span>→</span>
            </Link>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-[#03045E]">
              Explore
            </h3>

            <FooterLinks links={exploreLinks} />
          </div>

          {/* GUESTS */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-[#03045E]">
              For Guests
            </h3>

            <FooterLinks links={guestLinks} />
          </div>

          {/* VISTARA */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-[#03045E]">
              Vistara
            </h3>

            <FooterLinks links={vistaraLinks} />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gray-200" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>© 2026 Vistara. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-[#0D21A1]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#0D21A1]"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#0D21A1]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}