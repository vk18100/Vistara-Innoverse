import Link from "next/link";
import Navbar from "@/components/navbar";

export default function HostRegister() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-12">

        <Link
          href="/host"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Hosting
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Become a Host
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
            Tell us about yourself
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Complete your host profile before listing your property.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
          <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
          <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Step 1 of 3
        </p>

        {/* Form */}
        <form className="mt-8 rounded-3xl border border-gray-200 p-6 md:p-8">

          <h2 className="text-xl font-semibold text-[#03045e]">
            Personal information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-gray-700">
                First name
              </label>

              <input
                type="text"
                placeholder="First name"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last name
              </label>

              <input
                type="text"
                placeholder="Last name"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone number
              </label>

              <input
                type="tel"
                placeholder="+91"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                placeholder="Your city"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

          </div>

          {/* About */}
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700">
              About you
            </label>

            <textarea
              rows={4}
              placeholder="Tell guests a little about yourself..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
            />
          </div>

          {/* Verification notice */}
          <div className="mt-8 rounded-2xl bg-[#f5f7ff] p-5">

            <p className="font-semibold text-[#03045e]">
              Verification required
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Before your property can go live, Vistara will ask you
              to complete identity and property verification.
            </p>

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <Link
              href="/host"
              className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-medium text-gray-700 hover:border-[#03045e]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#023e8a]"
            >
              Continue
            </button>

          </div>

        </form>

      </section>
    </main>
  );
}