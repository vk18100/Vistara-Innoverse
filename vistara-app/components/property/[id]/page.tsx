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

  /* NOT FOUND */
  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-6">
        <div className="w-full max-w-md rounded-[28px] border border-[#E7E2D8] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F3EA] text-xl text-[#8B6F3D]">
            ?
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-[#292524]">
            Property not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#78716C]">
            This property may no longer be available.
          </p>
        </div>
      </main>
    );
  }

  const price = Number(property.price ?? 0);
  const rating = Number(property.rating ?? 0);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#292524]">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-16">

        {/* PROPERTY HEADER */}
        <Head
          name={property.name}
          location={property.location}
          rating={rating}
          reviews={property.reviews}
        />

        {/* IMAGE GALLERY */}
        <section className="mt-3">
          <Gallery images={property.images} />
        </section>

        {/* MAIN LAYOUT */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* LEFT CONTENT */}
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

          {/* BOOKING CARD */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white shadow-[0_12px_40px_rgba(41,37,36,0.08)]">

              <div className="p-6">

                {/* PRICE */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-2xl font-bold text-[#292524]">
                      ₹{price.toLocaleString("en-IN")}
                    </span>

                    <span className="ml-1 text-sm text-[#78716C]">
                      / night
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-[#292524]">
                    <span className="mr-1 text-[#B8863B]">★</span>
                    {rating.toFixed(1)}
                  </span>
                </div>

                {/* DATES */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#E7E2D8]">
                  <div className="grid grid-cols-2">

                    <div className="border-r border-[#E7E2D8] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78716C]">
                        Check in
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#292524]">
                        Add date
                      </p>
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78716C]">
                        Check out
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#292524]">
                        Add date
                      </p>
                    </div>

                  </div>

                  <div className="border-t border-[#E7E2D8] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78716C]">
                      Guests
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#292524]">
                      Add guests
                    </p>
                  </div>
                </div>

                {/* RESERVE */}
                <button
                  type="button"
                  className="
                    mt-5 w-full rounded-2xl
                    bg-[#292524]
                    px-5 py-3.5
                    text-sm font-semibold text-white
                    transition
                    hover:bg-[#44403C]
                    active:scale-[0.99]
                  "
                >
                  Reserve
                </button>

                <p className="mt-3 text-center text-xs text-[#78716C]">
                  You won't be charged yet
                </p>

                {/* PRICE SUMMARY */}
                <div className="mt-6 border-t border-[#EEEAE3] pt-5">
                  <div className="flex justify-between text-sm text-[#78716C]">
                    <span>
                      ₹{price.toLocaleString("en-IN")} × 1 night
                    </span>

                    <span className="font-medium text-[#292524]">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between border-t border-[#EEEAE3] pt-4 text-sm font-bold text-[#292524]">
                    <span>Total</span>

                    <span>
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE RESERVE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7E2D8] bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">

          <div>
            <p className="text-[11px] text-[#78716C]">
              From
            </p>

            <p className="text-base font-bold text-[#292524]">
              ₹{price.toLocaleString("en-IN")}
              <span className="ml-1 text-xs font-normal text-[#78716C]">
                / night
              </span>
            </p>
          </div>

          <button
            type="button"
            className="
              rounded-full
              bg-[#292524]
              px-6 py-3
              text-sm font-semibold text-white
              transition
              hover:bg-[#44403C]
              active:scale-[0.98]
            "
          >
            Reserve
          </button>

        </div>
      </div>
    </main>
  );
}