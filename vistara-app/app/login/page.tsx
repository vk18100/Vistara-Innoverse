import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Login() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
              Welcome back
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
              Sign in to Vistara
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Continue exploring stays and places worth experiencing.
            </p>

          </div>

          {/* Form */}
          <form className="mt-8 space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">

                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#03045e] hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#03045e] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Sign In
            </button>

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />

          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#03045e]"
          >
            Continue with Google
          </button>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-gray-500">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-[#03045e] hover:underline"
            >
              Create account
            </Link>

          </p>

        </div>

      </section>
    </main>
  );
}