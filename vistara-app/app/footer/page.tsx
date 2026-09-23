import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E1E5EF] bg-[#F7F8FC] text-[#03045E]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#03045E]">
              Vistara
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-6 text-[#5B6780]">
              Discover unique stays, hidden destinations and meaningful
              experiences across India.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-[#03045E]">
              Explore
            </h3>

            <div className="space-y-2.5 text-sm text-[#5B6780]">
              <Link
                href="/stays"
                className="block transition hover:text-[#0D21A1]"
              >
                Stays
              </Link>

              <Link
                href="/explore"
                className="block transition hover:text-[#0D21A1]"
              >
                Explore
              </Link>

              <Link
                href="/experiences"
                className="block transition hover:text-[#0D21A1]"
              >
                Experiences
              </Link>

              <Link
                href="/trips"
                className="block transition hover:text-[#0D21A1]"
              >
                Trips
              </Link>
            </div>
          </div>

          {/* GUESTS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-[#03045E]">
              For Guests
            </h3>

            <div className="space-y-2.5 text-sm text-[#5B6780]">
              <Link
                href="/wishlist"
                className="block transition hover:text-[#0D21A1]"
              >
                Wishlist
              </Link>

              <Link
                href="/bookings"
                className="block transition hover:text-[#0D21A1]"
              >
                My Bookings
              </Link>

              <Link
                href="/help"
                className="block transition hover:text-[#0D21A1]"
              >
                Help Centre
              </Link>
            </div>
          </div>

          {/* VISTARA */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-[#03045E]">
              Vistara
            </h3>

            <div className="space-y-2.5 text-sm text-[#5B6780]">
              <Link
                href="/about"
                className="block transition hover:text-[#0D21A1]"
              >
                About Vistara
              </Link>

              <Link
                href="/privacy"
                className="block transition hover:text-[#0D21A1]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="block transition hover:text-[#0D21A1]"
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-[#0D21A1]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 h-px w-full bg-[#DDE2EA]" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-[#68748A] sm:flex-row sm:items-center">

          <p>
            © 2026 Vistara. All rights reserved.
          </p>

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