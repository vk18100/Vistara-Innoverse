import Link from "next/link";

const exploreLinks = [
  { href: "/stays", label: "Stays" },
  { href: "/experiences", label: "Experiences" },
  { href: "/guides", label: "Local Guides" },
  { href: "/drivers", label: "Drivers" },
  { href: "/trips", label: "Trips" },
];

const guestLinks = [
  { href: "/wishlist", label: "Wishlist" },
  { href: "/trips", label: "My Trips" },
  { href: "/settings/help", label: "Help Centre" },
  { href: "/support", label: "Support" },
];

const vistaraLinks = [
  { href: "/about", label: "About Vistara" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function FooterLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-2.5 text-sm text-neutral-500">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block transition-colors hover:text-black"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">

        {/* MAIN FOOTER */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-2xl font-semibold tracking-tight text-black"
            >
              Vistara
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
              Discover unique stays, hidden destinations, local guides and
              meaningful experiences across India.
            </p>

            <Link
              href="/explore"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black transition-opacity hover:opacity-60"
            >
              Start exploring
              <span>→</span>
            </Link>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">
              Explore
            </h3>

            <FooterLinks links={exploreLinks} />
          </div>

          {/* GUESTS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">
              For Guests
            </h3>

            <FooterLinks links={guestLinks} />
          </div>

          {/* VISTARA */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">
              Vistara
            </h3>

            <FooterLinks links={vistaraLinks} />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-9 h-px bg-neutral-200" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-3 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Vistara. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-black"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-black"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-black"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}