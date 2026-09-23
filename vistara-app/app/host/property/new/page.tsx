import Link from "next/link";
import Navbar from "@/components/navbar";

const stats = [
  {
    label: "Total earnings",
    value: "₹84,500",
    change: "+12.4%",
  },
  {
    label: "Bookings",
    value: "18",
    change: "+4 this month",
  },
  {
    label: "Occupancy",
    value: "72%",
    change: "+8.2%",
  },
  {
    label: "Rating",
    value: "4.8",
    change: "24 reviews",
  },
];

const bookings = [
  {
    guest: "Rahul Sharma",
    property: "The Heritage Courtyard",
    dates: "18 Oct – 21 Oct",
    guests: "2 guests",
    amount: "₹13,500",
    status: "Confirmed",
  },
  {
    guest: "Ananya Singh",
    property: "Ganga Riverside Retreat",
    dates: "22 Oct – 25 Oct",
    guests: "3 guests",
    amount: "₹11,400",
    status: "Confirmed",
  },
  {
    guest: "Vikram Kumar",
    property: "The Heritage Courtyard",
    dates: "29 Oct – 31 Oct",
    guests: "4 guests",
    amount: "₹9,000",
    status: "Pending",
  },
];

const properties = [
  {
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    rating: "4.8",
    bookings: "14 bookings",
    price: "₹4,500",
    status: "Active",
    image: "/images/pag1 (1).jpg",
  },
  {
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    rating: "4.7",
    bookings: "4 bookings",
    price: "₹3,800",
    status: "Active",
    image: "/images/pag1 (2).jpg",
  },
];

export default function HostDashboard() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HOST NAVIGATION */}
      <div className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-10">
          <div className="flex min-w-max items-center gap-7 py-4 text-sm">
            <Link
              href="/host"
              className="font-semibold text-[#03045E]"
            >
              Dashboard
            </Link>

            <Link
              href="/host/properties"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Properties
            </Link>

            <Link
              href="/host/bookings"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Bookings
            </Link>

            <Link
              href="/host/calendar"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Calendar
            </Link>

            <Link
              href="/host/earnings"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Earnings
            </Link>

            <Link
              href="/host/analytics"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Analytics
            </Link>

            <Link
              href="/host/messages"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Messages
            </Link>

            <Link
              href="/host/settings"
              className="text-[#64748B] transition hover:text-[#03045E]"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                VISTARA HOST
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                Good morning, Sristi.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Here is everything you need to manage your stays,
                guests and hosting performance.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Add a property
            </Link>
          </div>

          {/* VERIFICATION */}
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#03045E]/10 bg-[#F7F3EA] p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#03045E] shadow-sm">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Your host account is verified
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Your identity has been verified. Keep your
                  property information up to date.
                </p>
              </div>
            </div>

            <Link
              href="/host/verification"
              className="text-sm font-semibold text-[#03045E] hover:underline"
            >
              View verification →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-[#03045E]/10 bg-white p-6 shadow-[0_10px_35px_rgba(3,4,94,0.04)]"
            >
              <p className="text-sm text-[#64748B]">
                {stat.label}
              </p>

              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="font-serif text-3xl font-semibold">
                  {stat.value}
                </p>

                <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-bold text-[#0D21A1]">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.4fr_0.6fr]">

          {/* BOOKINGS */}
          <div className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_15px_50px_rgba(3,4,94,0.05)]">

            <div className="flex items-center justify-between border-b border-[#03045E]/10 p-6 md:p-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  RESERVATIONS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Upcoming bookings
                </h2>
              </div>

              <Link
                href="/host/bookings"
                className="text-sm font-semibold text-[#0D21A1] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-[#03045E]/10">
              {bookings.map((booking) => (
                <div
                  key={`${booking.guest}-${booking.dates}`}
                  className="p-6 transition hover:bg-[#FAFAF8] md:p-7"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-bold text-[#03045E]">
                        {booking.guest
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {booking.guest}
                        </p>

                        <p className="mt-1 text-xs text-[#64748B]">
                          {booking.property}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#64748B]">
                          <span>{booking.dates}</span>
                          <span>{booking.guests}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 md:justify-end">
                      <div className="md:text-right">
                        <p className="text-sm font-semibold">
                          {booking.amount}
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            booking.status === "Confirmed"
                              ? "bg-[#ECFDF5] text-emerald-700"
                              : "bg-[#FFF7E6] text-[#9A6700]"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <Link
                        href="/host/bookings"
                        className="text-sm text-[#94A3B8] hover:text-[#03045E]"
                      >
                        →
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-7">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              QUICK ACTIONS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Manage your hosting
            </h2>

            <div className="mt-6 space-y-2">
              <HostAction
                href="/host/properties"
                icon="⌂"
                title="Manage properties"
                description="Update your listings"
              />

              <HostAction
                href="/host/calendar"
                icon="▣"
                title="Open calendar"
                description="Manage availability"
              />

              <HostAction
                href="/host/earnings"
                icon="₹"
                title="View earnings"
                description="Track your revenue"
              />

              <HostAction
                href="/host/messages"
                icon="◌"
                title="Messages"
                description="Talk to your guests"
              />
            </div>
          </div>
        </div>

        {/* PROPERTIES */}
        <div className="mt-8 rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-7">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                YOUR LISTINGS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Your properties
              </h2>
            </div>

            <Link
              href="/host/properties"
              className="text-sm font-semibold text-[#0D21A1] hover:underline"
            >
              Manage all
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {properties.map((property) => (
              <Link
                key={property.name}
                href="/host/properties"
                className="group overflow-hidden rounded-2xl border border-[#03045E]/10 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                    {property.status}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-semibold">
                        {property.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {property.location}
                      </p>
                    </div>

                    <span className="text-sm font-semibold">
                      ★ {property.rating}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#03045E]/10 pt-4 text-xs">
                    <span className="text-[#64748B]">
                      {property.bookings}
                    </span>

                    <span className="font-semibold">
                      {property.price}
                      <span className="font-normal text-[#64748B]">
                        {" "}
                        / night
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_0.8fr]">

          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)]">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  PERFORMANCE
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Listing performance
                </h2>
              </div>

              <Link
                href="/host/analytics"
                className="text-sm font-semibold text-[#0D21A1] hover:underline"
              >
                Details
              </Link>
            </div>

            <div className="mt-8 flex h-48 items-end gap-3">
              {[42, 55, 48, 72, 64, 81, 74, 90, 78, 95, 84, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-lg bg-[#0D21A1]/80 transition hover:bg-[#03045E]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-4 flex justify-between text-[10px] text-[#94A3B8]">
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
            </div>
          </div>

          {/* VISTARA INSIGHT */}
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.16)]">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              VISTARA INSIGHT
            </p>

            <h2 className="mt-4 font-serif text-2xl font-semibold">
              Your property is performing well.
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/70">
              Your listings receive more engagement on weekends.
              Keeping your availability updated can help guests
              find your property more easily.
            </p>

            <Link
              href="/host/analytics"
              className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
            >
              View insights
            </Link>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-8 rounded-[28px] border border-[#03045E]/10 bg-[#F7F3EA] p-7 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold">
                Ready to grow your hosting business?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Add another unique place to your Vistara collection.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Add property
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HostAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-[#F7F3EA]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-sm font-semibold text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-semibold">
          {title}
        </span>

        <span className="mt-0.5 block text-xs text-[#94A3B8]">
          {description}
        </span>
      </span>

      <span className="ml-auto text-[#94A3B8] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}