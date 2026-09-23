import Link from "next/link";
import Navbar from "@/components/navbar";

const stats = [
  {
    label: "Properties",
    value: "04",
    detail: "2 active listings",
  },
  {
    label: "Bookings",
    value: "12",
    detail: "3 upcoming",
  },
  {
    label: "Earnings",
    value: "₹84,500",
    detail: "This month",
  },
];

const properties = [
  {
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    type: "Entire villa",
    status: "Active",
    image: "/images/pag1 (1).jpg",
  },
  {
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    type: "Private stay",
    status: "Active",
    image: "/images/pag1 (2).jpg",
  },
];

const bookings = [
  {
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    dates: "18 Oct – 21 Oct",
    amount: "₹13,500",
    status: "Confirmed",
  },
  {
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    dates: "24 Oct – 27 Oct",
    amount: "₹11,400",
    status: "Confirmed",
  },
];

export default function HostPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                VISTARA HOST
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Welcome back, Sristi.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Manage your properties, bookings and hosting activity
                from one place.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Add property
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[26px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.05)]"
            >
              <p className="text-sm font-medium text-[#64748B]">
                {stat.label}
              </p>

              <p className="mt-3 font-serif text-3xl font-semibold">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-[#94A3B8]">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.5fr_0.7fr]">

          {/* PROPERTIES */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.05)]">

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
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {properties.map((property) => (
                <div
                  key={property.name}
                  className="flex flex-col gap-4 rounded-2xl border border-[#03045E]/10 p-4 sm:flex-row"
                >
                  <div className="h-32 w-full overflow-hidden rounded-xl sm:w-40">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[11px] font-semibold text-emerald-700">
                        {property.status}
                      </span>

                      <h3 className="mt-3 font-serif text-xl font-semibold">
                        {property.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {property.location} · {property.type}
                      </p>
                    </div>

                    <Link
                      href="/host/properties"
                      className="mt-4 text-sm font-semibold text-[#03045E]"
                    >
                      Manage property →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* VERIFICATION */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.16)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                VERIFICATION
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                Complete your host verification.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Verify your identity and property before publishing
                a new listing on Vistara.
              </p>

              <Link
                href="/host/verification"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Continue verification
              </Link>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                QUICK ACTIONS
              </p>

              <div className="mt-5 space-y-2">
                <HostLink
                  href="/host/property/new"
                  title="Add a new property"
                  icon="+"
                />

                <HostLink
                  href="/host/properties"
                  title="Manage properties"
                  icon="⌂"
                />

                <HostLink
                  href="/host/bookings"
                  title="View bookings"
                  icon="◷"
                />

                <HostLink
                  href="/host/verification"
                  title="Verification"
                  icon="✓"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="mt-8 rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                BOOKINGS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Upcoming stays
              </h2>
            </div>

            <Link
              href="/host/bookings"
              className="text-sm font-semibold text-[#0D21A1] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="pb-4">Guest</th>
                  <th className="pb-4">Property</th>
                  <th className="pb-4">Dates</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.guest}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-5 text-sm font-semibold">
                      {booking.guest}
                    </td>

                    <td className="py-5 text-sm text-[#64748B]">
                      {booking.property}
                    </td>

                    <td className="py-5 text-sm text-[#64748B]">
                      {booking.dates}
                    </td>

                    <td className="py-5 text-sm font-semibold">
                      {booking.amount}
                    </td>

                    <td className="py-5">
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-emerald-700">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </main>
  );
}

function HostLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-[#F7F3EA]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#03045E]">
          {icon}
        </span>

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <span className="text-[#94A3B8] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}