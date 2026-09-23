import Gallery from "@/components/property/Gallery";
import Head from "@/components/property/Head";
import Info from "@/components/property/Info";
import Amen from "@/components/property/Amen";
import Host from "@/components/property/Host";
import Reviews from "@/components/property/Reviews";
import Form from "@/components/property/Form";

import { props } from "@/data/props";
import { reviews } from "@/data/reviews";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = props.find((item) => item.id === id);

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#03045E]">
            Property not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This property may no longer be available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10">

        {/* Header */}
        <Head
          name={property.name}
          location={property.location}
          rating={property.rating}
          reviews={property.reviews}
        />

        {/* Gallery */}
        <div className="mt-2">
          <Gallery images={property.images} />
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Left */}
          <div className="min-w-0">
            <Info description={property.description} />

            <Amen amenities={property.amenities} />

            <Host
              name={property.host.name}
              image={property.host.image}
            />

            <Reviews reviews={reviews} />

            <Form />
          </div>

          {/* Right Booking Card */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(3,4,94,0.08)]">

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold text-[#03045E]">
                    ₹{property.price.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-sm text-gray-500">
                    / night
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  ★{" "}
                  <span className="font-medium">
                    {property.rating}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
                <div className="grid grid-cols-2">
                  <div className="border-r border-gray-200 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Check in
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      Add date
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Check out
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      Add date
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    Guests
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    Add guests
                  </p>
                </div>
              </div>

              {/* Reserve */}
              <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-[#03045E] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Reserve
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                You won't be charged yet
              </p>

              {/* Price */}
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    ₹{property.price.toLocaleString("en-IN")} × 1 night
                  </span>

                  <span>
                    ₹{property.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-[#03045E]">
                  <span>Total</span>

                  <span>
                    ₹{property.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Reserve Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white px-5 py-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">From</p>

            <p className="font-semibold text-[#03045E]">
              ₹{property.price.toLocaleString("en-IN")} / night
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white"
          >
            Reserve
          </button>
        </div>
      </div>
    </main>
  );
}