import Link from "next/link";
import Navbar from "@/components/navbar";

const user = {
  name: "Sristi Gupta",
  email: "sristi@example.com",
  location: "Patna, Bihar",
  joined: "September 2026",
};

const stats = [
  { label: "Trips", value: "8" },
  { label: "Wishlist", value: "12" },
  { label: "Reviews", value: "5" },
];

export default function Profile() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">

        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-gray-200 pb-10 sm:flex-row sm:items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#03045e] text-3xl font-bold text-white">
            SG
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
              Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#03045e]">
              {user.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {user.email}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {user.location}
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="rounded-xl bg-[#03045e] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#023e8a]"
          >
            Edit Profile
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-gray-200 py-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <p className="text-2xl font-bold text-[#03045e]">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

        {/* Account */}
        <section className="mt-10">

          <h2 className="text-xl font-semibold text-[#03045e]">
            Account
          </h2>

          <div className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200">

            <Link
              href="/profile/edit"
              className="flex items-center justify-between p-5 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Personal information
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Update your name, photo and location
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center justify-between p-5 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Wishlist
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  View your saved stays
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/activity"
              className="flex items-center justify-between p-5 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Account activity
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Review your recent account activity
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center justify-between p-5 transition hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">
                  Settings
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your account preferences
                </p>
              </div>

              <span className="text-gray-400">→</span>
            </Link>

          </div>

        </section>

        {/* Member info */}
        <div className="mt-8 rounded-2xl bg-[#f7f9ff] p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#023e8a]">
            Vistara Member
          </p>

          <h3 className="mt-2 font-semibold text-[#03045e]">
            Member since {user.joined}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Keep your profile updated to make your Vistara experience
            more personal.
          </p>

        </div>

      </section>
    </main>
  );
}