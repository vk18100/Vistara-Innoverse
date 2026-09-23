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
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-semibold text-[#03045E]">
          Property not found
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <Head
        name={property.name}
        location={property.location}
        rating={property.rating}
        reviews={property.reviews}
      />

      <Gallery images={property.images} />

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <Info description={property.description} />

          <Amen amenities={property.amenities} />

          <Host
            name={property.host.name}
            image={property.host.image}
          />

          <Reviews reviews={reviews} />

          <Form />
        </div>

        {/* Booking Card */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-semibold text-[#03045E]">
                  ₹{property.price}
                </span>

                <span className="text-sm text-gray-500">
                  {" "}
                  / night
                </span>
              </div>

              <span className="text-sm text-gray-600">
                ★ {property.rating}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#03045E] py-3 font-medium text-white transition hover:bg-[#0D21A1]"
            >
              Reserve
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              You won't be charged yet
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}