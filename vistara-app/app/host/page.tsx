import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Host() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
              Become a Vistara Host
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#03045e]">
              Share your place.
              <br />
              Welcome the world.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500">
              Turn your property into a meaningful travel experience.
              List your stay on Vistara and connect with travelers
              looking for unique places.
            </p>

            <Link
              href="/host/register"
              className="mt-8 inline-block rounded-xl bg-[#03045e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Start hosting
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#f0f3ff]">
            <img
              src="/images/host.jpg"
              alt="Become a Vistara host"
              className="h-[480px] w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Why host */}
      <section className="border-y border-gray-100 bg-[#fafbff]">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
              Why Vistara
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#03045e]">
              Hosting made simple
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-[#03045e]">
                01
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                List your property
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Add your property details, photos, amenities and pricing.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-[#03045e]">
                02
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                Get verified
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Complete the verification process to build trust with guests.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-[#03045e]">
                03
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">
                Welcome guests
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Manage bookings and create memorable stays for travelers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">

        <h2 className="text-3xl font-bold text-[#03045e]">
          Ready to become a host?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
          Start your hosting journey with Vistara.
        </p>

        <Link
          href="/host/register"
          className="mt-7 inline-block rounded-xl bg-[#03045e] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#023e8a]"
        >
          Start hosting
        </Link>

      </section>
    </main>
  );
}