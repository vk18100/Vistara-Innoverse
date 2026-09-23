import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Settings() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

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

          <h1 className="mt-2 text-4xl font-bold text-[#03045e]">
            Settings
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Manage your account preferences and privacy.
          </p>
        </div>

        {/* Notifications */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#03045e]">
            Notifications
          </h2>

          <div className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200">

            <div className="flex items-center justify-between gap-5 p-5">
              <div>
                <p className="font-medium text-gray-900">
                  Booking updates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Receive updates about your bookings and trips.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 accent-[#03045e]"
              />
            </div>

            <div className="flex items-center justify-between gap-5 p-5">
              <div>
                <p className="font-medium text-gray-900">
                  Wishlist updates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Get updates about saved stays.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 accent-[#03045e]"
              />
            </div>

            <div className="flex items-center justify-between gap-5 p-5">
              <div>
                <p className="font-medium text-gray-900">
                  Vistara recommendations
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Receive recommendations based on your activity.
                </p>
              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-[#03045e]"
              />
            </div>

          </div>
        </section>

        {/* Privacy */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#03045e]">
            Privacy
          </h2>

          <div className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200">

            <Link
              href="/privacy"
              className="flex items-center justify-between p-5 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Privacy Policy
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Learn how Vistara handles your information.
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/activity"
              className="flex items-center justify-between p-5 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Account Activity
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Review activity on your account.
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

          </div>
        </section>

        {/* Security */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#03045e]">
            Security
          </h2>

          <div className="mt-4 rounded-2xl border border-gray-200">

            <button
              type="button"
              className="w-full border-b border-gray-200 p-5 text-left hover:bg-gray-50"
            >
              <p className="font-medium text-gray-900">
                Change password
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Update your account password.
              </p>
            </button>

            <button
              type="button"
              className="w-full p-5 text-left hover:bg-gray-50"
            >
              <p className="font-medium text-gray-900">
                Sign out of all devices
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Sign out from other active sessions.
              </p>
            </button>

          </div>
        </section>

        {/* Danger zone */}
        <section className="mt-10 rounded-2xl border border-red-100 p-6">

          <h2 className="font-semibold text-red-700">
            Account
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Deleting your account permanently removes your Vistara account
            and associated information.
          </p>

          <button
            type="button"
            className="mt-5 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Delete Account
          </button>

        </section>

      </section>
    </main>
  );
}