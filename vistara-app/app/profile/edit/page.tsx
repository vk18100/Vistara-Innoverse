import Link from "next/link";
import Navbar from "@/components/navbar";

export default function EditProfile() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-12">

        {/* Header */}
        <Link
          href="/profile"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Profile
        </Link>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#03045e]">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Keep your personal information up to date.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 rounded-3xl border border-gray-200 p-6 md:p-8">

          {/* Profile photo */}
          <div className="flex items-center gap-5 border-b border-gray-200 pb-8">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#03045e] text-2xl font-bold text-white">
              SG
            </div>

            <div>
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#03045e]"
              >
                Change photo
              </button>

              <p className="mt-2 text-xs text-gray-400">
                JPG or PNG · Max 5MB
              </p>
            </div>

          </div>

          {/* Personal information */}
          <div className="mt-8">

            <h2 className="text-lg font-semibold text-[#03045e]">
              Personal information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  First name
                </label>

                <input
                  type="text"
                  defaultValue="Sristi"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last name
                </label>

                <input
                  type="text"
                  defaultValue="Gupta"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="sristi@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  defaultValue="Patna, Bihar"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Bio
                </label>

                <textarea
                  rows={4}
                  placeholder="Tell us a little about yourself..."
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <Link
              href="/profile"
              className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-medium text-gray-700 hover:border-[#03045e]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </section>
    </main>
  );
}