import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ForgotPassword() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef2ff]">
              <span className="text-xl font-bold text-[#03045e]">
                V
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#03045e]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Enter your email address and we'll send you a link
              to reset your password.
            </p>

          </div>

          {/* Form */}
          <form className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#03045e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Send Reset Link
            </button>

          </form>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
            >
              ← Back to Sign In
            </Link>
          </div>

          {/* Security note */}
          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            For your security, the password reset link will be sent
            only to the email associated with your account.
          </p>

        </div>

      </section>
    </main>
  );
}