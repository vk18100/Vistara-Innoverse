import Link from "next/link";
import Navbar from "@/components/navbar";

const properties = [
  {
    id: 1,
    title: "Peaceful Stay in Patna",
    location: "Patna, Bihar",
    price: "₹2,500",
    status: "Verified",
    bookings: 12,
    rating: "4.8",
    image: "/images/stay1.jpg",
  },
  {
    id: 2,
    title: "Modern City Apartment",
    location: "Patna, Bihar",
    price: "₹3,200",
    status: "Under Review",
    bookings: 6,
    rating: "4.6",
    image: "/images/stay2.jpg",
  },
];

export default function Properties() {
    return(
        <main className="min-h-screen bg-[#fafbff]">
            <Navbar />
            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <Link href="/host/dashboard" className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]">
                         ← Dashboard
            </Link>



       <h1 className="mt-5 text-4xl font-bold text-[#03045e]">
        Your Properties
       </h1>
       <p className="mt-2 text-sm text-gray-500">
        Manage your properties and view their status.
       </p>
       </div>
       <Link href="/host/property/new" className="rounded-lg bg-[#03045e] px-4 py-2 text-sm font-medium text-white hover:bg-[#023e8a]">
        Add New Property
       </Link>
            
                    </div>
                    <div className="mt-10 space-y-5">
                        {properties.map((property) => (
                            <div key={property.id} className="flex flex-col gap-5 rounded-2xl bg-white p-6 sm:flex-row sm:items-center">
                                <img src={property.image} alt={property.title} className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-24" />
                                <div className="flex flex-1 justify-between p-6">
<div>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">

                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {property.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          {property.location}
                        </p>
                      </div>

                      <span
                        className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-medium ${
                          property.status === "Verified"
                            ? "bg-[#eef2ff] text-[#03045e]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {property.status}
                      </span>

                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4">

                      <div>
                        <p className="text-xs text-gray-400">
                          Price
                        </p>
                        <p className="mt-1 font-semibold text-[#03045e]">
                          {property.price}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Bookings
                        </p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {property.bookings}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Rating
                        </p>
                        <p className="mt-1 font-semibold text-gray-900">
                          ★ {property.rating}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">

                    <Link
                      href={`/host/properties/${property.id}`}
                      className="rounded-xl bg-[#03045e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#023e8a]"
                    >
                      Manage
                    </Link>

                    <button
                      type="button"
                      className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#03045e]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-red-100 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            
          ))}

        </div>

        {/* Empty state */}
        {properties.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">

            <h2 className="text-xl font-semibold text-[#03045e]">
              No properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Start by adding your first property to Vistara.
            </p>

            <Link
              href="/host/property/new"
              className="mt-6 inline-block rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white"
            >
              Add Property
            </Link>

          </div>
        )}

      </section>
    </main>
  );
}