import Link from "next/link";
import Navbar from "@/components/navbar";

export default function AddProperty() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

        <Link
          href="/host"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Host Dashboard
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            List your property
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
            Add a new property
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Tell travelers about your place and what makes it special.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
          <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Step 2 of 3
        </p>

        <form className="mt-8 space-y-8">

          {/* Property basics */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              Property details
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Property title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Peaceful Villa near the city"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Property type
                </label>

                <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#03045e]">
                  <option>Select property type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Hotel</option>
                  <option>Guest House</option>
                  <option>Resort</option>
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="City"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Country
                  </label>

                  <input
                    type="text"
                    placeholder="India"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>

                <input
                  type="text"
                  placeholder="Full property address"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                />
              </div>

            </div>
          </section>

          {/* Capacity */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              Space & capacity
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Guests
                </label>

                <input
                  type="number"
                  placeholder="4"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Bedrooms
                </label>

                <input
                  type="number"
                  placeholder="2"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Bathrooms
                </label>

                <input
                  type="number"
                  placeholder="2"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#03045e]"
                />
              </div>

            </div>
          </section>

          {/* Description */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              About your property
            </h2>

            <textarea
              rows={6}
              placeholder="Describe your property, the experience guests can expect, and what makes it special..."
              className="mt-6 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
            />

          </section>

          {/* Amenities */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              Amenities
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

              {[
                "Wi-Fi",
                "Air conditioning",
                "Kitchen",
                "Parking",
                "Workspace",
                "TV",
              ].map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#03045e]"
                  />
                  {amenity}
                </label>
              ))}

            </div>
          </section>

          {/* Images */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              Property photos
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add clear photos that show guests what your property looks like.
            </p>

            <label className="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 text-center transition hover:border-[#03045e]">

              <span className="text-3xl text-[#03045e]">
                +
              </span>

              <span className="mt-3 text-sm font-semibold text-gray-700">
                Upload property photos
              </span>

              <span className="mt-1 text-xs text-gray-400">
                JPG or PNG · Multiple images allowed
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
              />

            </label>
          </section>

          {/* Pricing */}
          <section className="rounded-3xl border border-gray-200 p-6 md:p-8">

            <h2 className="text-xl font-semibold text-[#03045e]">
              Pricing
            </h2>

            <div className="mt-6 max-w-sm">

              <label className="text-sm font-medium text-gray-700">
                Price per night
              </label>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-gray-200">
                <span className="flex items-center bg-gray-50 px-4 text-sm text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="2500"
                  className="w-full px-4 py-3 text-sm outline-none"
                />
              </div>

            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <Link
              href="/host"
              className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-medium text-gray-700 hover:border-[#03045e]"
            >
              Save draft
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[#03045e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Continue to verification
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}