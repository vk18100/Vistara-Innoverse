import Link from "next/link";
import Navbar from "@/components/navbar";

const wishlist = [
  {
    id: 1,
    title: "Peaceful Stay in Patna",
    location: "Patna, Bihar",
    price: "₹2,500",
    rating: "4.8",
    image: "/images/stay1.jpg",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Goa, India",
    price: "₹6,500",
    rating: "4.9",
    image: "/images/stay2.jpg",
  },
  {
    id: 3,
    title: "Mountain Retreat",
    location: "Manali, Himachal Pradesh",
    price: "₹3,800",
    rating: "4.7",
    image: "/images/stay3.jpg",
  },
  {
    id: 4,
    title: "Heritage Stay",
    location: "Jaipur, Rajasthan",
    price: "₹4,200",
    rating: "4.8",
    image: "/images/stay4.jpg",
  },
];

export default function Wishlist() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Your collection
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#03045e]">
            Wishlist
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Save the stays you would love to experience.
          </p>
        </div>

        {/* Cards */}
        {wishlist.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {wishlist.map((stay) => (
              <div
                key={stay.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Image */}
                <div className="relative">

                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="h-60 w-full object-cover"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    aria-label={`Remove ${stay.title} from wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:scale-105"
                  >
                    ♥
                  </button>

                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <h2 className="font-semibold text-[#03045e]">
                      {stay.title}
                    </h2>

                    <span className="shrink-0 text-sm text-gray-600">
                      ★ {stay.rating}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {stay.location}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-900">
                        {stay.price}
                      </span>{" "}
                      / night
                    </p>

                    <Link
                      href={`/stays/${stay.id}`}
                      className="text-sm font-semibold text-[#03045e] hover:underline"
                    >
                      View →
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>
        ) : (
          /* Empty state */
          <div className="mt-12 rounded-3xl border border-gray-200 px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f3ff] text-2xl text-[#03045e]">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#03045e]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save places you love while exploring Vistara and
              come back to them whenever you are ready.
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-block rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Explore stays
            </Link>

          </div>
        )}

      </section>
    </main>
  );
}