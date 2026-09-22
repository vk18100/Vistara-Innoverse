import Link from "next/link";
import Navbar from "@/components/navbar";

export default function HostPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">

        {/* Hero */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#023e8a]">
            Be a Host
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#03045e] md:text-5xl">
            Share your place with the world.
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Turn your property into a meaningful stay for travelers
            discovering new places through Vistara.
          </p>

          <Link
            href="/host/register"
            className="mt-8 inline-block rounded-xl bg-[#03045e] px-6 py-3 font-semibold text-white transition hover:bg-[#023e8a]"
          >
            Start hosting
          </Link>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border p-6">
            <div className="text-2xl">✓</div>

            <h2 className="mt-4 text-xl font-semibold">
              Verified guests
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Build trust between hosts and travelers through a
              transparent platform.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <div className="text-2xl">₹</div>

            <h2 className="mt-4 text-xl font-semibold">
              Earn from your property
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Share your available property and manage your bookings
              from one place.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <div className="text-2xl">◆</div>

            <h2 className="mt-4 text-xl font-semibold">
              Reach new travelers
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Help travelers discover your location and experience
              something local.
            </p>
          </div>

        </div>

        {/* How it works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-[#03045e]">
            How hosting works
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div>
              <span className="text-sm font-bold text-[#023e8a]">
                01
              </span>

              <h3 className="mt-2 font-semibold">
                List your property
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add your property details, photos and availability.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-[#023e8a]">
                02
              </span>

              <h3 className="mt-2 font-semibold">
                Get verified
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Provide the required information for property
                verification.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-[#023e8a]">
                03
              </span>

              <h3 className="mt-2 font-semibold">
                Welcome guests
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Manage your bookings and host travelers through
                Vistara.
              </p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}