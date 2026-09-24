import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";

type StayPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StayPage({ params }: StayPageProps) {
  const { id } = await params;

  const propertyId = Number(id);

  if (!Number.isInteger(propertyId)) {
    notFound();
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      images: {
        orderBy: {
          isPrimary: "desc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  if (!property || property.status !== "VERIFIED") {
    notFound();
  }

  const images = property.images;

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* BACK */}
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">
        <Link
          href="/stays"
          className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
        >
          ← Back to stays
        </Link>
      </section>

      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#03045E] px-3 py-1.5 text-xs font-semibold text-white">
                Verified
              </span>

              <span className="text-sm text-[#64748B]">
                {property.city}, {property.country}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
              {property.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
              <span>★ {property.rating}</span>

              <span>•</span>

              <span>{property.images.length} photos</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        {images.length > 0 ? (
          <div className="grid h-[520px] grid-cols-1 gap-3 overflow-hidden rounded-[28px] md:grid-cols-2">
            {/* Main image */}
            <div className="h-full overflow-hidden">
              <img
                src={images[0].url}
                alt={images[0].altText || property.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Additional images */}
            <div className="hidden grid-cols-2 gap-3 md:grid">
              {images.slice(1, 5).map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.altText || property.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[420px] items-center justify-center rounded-[28px] bg-[#F1F4FA]">
            <p className="text-sm text-[#64748B]">
              No images available
            </p>
          </div>
        )}
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">
        {/* LEFT */}
        <div>
          {/* BASIC INFO */}
          <div className="border-b border-[#E2E8F0] pb-8">
            <h2 className="font-serif text-3xl font-semibold">
              About this stay
            </h2>

            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#64748B]">
              {property.description ||
                "A comfortable stay designed to help you experience the destination in a meaningful way."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#475569]">
              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.guests} guests
              </span>

              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.bedrooms} bedrooms
              </span>

              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.bathrooms} bathrooms
              </span>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="border-b border-[#E2E8F0] py-8">
            <h2 className="font-serif text-3xl font-semibold">
              What this place offers
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities.map((item) => (
                <div
                  key={`${item.propertyId}-${item.amenityId}`}
                  className="rounded-2xl border border-[#E2E8F0] px-4 py-4 text-sm text-[#475569]"
                >
                  {item.amenity.name}
                </div>
              ))}
            </div>
          </div>

          {/* LOCATION */}
          <div className="py-8">
            <h2 className="font-serif text-3xl font-semibold">
              Location
            </h2>

            <p className="mt-4 text-sm text-[#64748B]">
              {property.city}, {property.country}
            </p>

            <div className="mt-5 h-48 rounded-[24px] bg-[#EEF4FF]">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm font-medium text-[#0D21A1]">
                  {property.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.08)]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-[#03045E]">
                  ₹{Number(property.pricePerNight).toLocaleString("en-IN")}
                </span>

                <span className="ml-1 text-sm text-[#64748B]">
                  / night
                </span>
              </div>

              <div className="text-sm font-semibold text-[#03045E]">
                ★ {property.rating}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0]">
              <div className="grid grid-cols-2">
                <div className="border-r border-[#E2E8F0] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                    Check-in
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Add date
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                    Check-out
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Add date
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                  Guests
                </p>

                <p className="mt-2 text-sm font-medium">
                  Add guests
                </p>
              </div>
            </div>

            <Link
              href={`/booking/${property.id}`}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#03045E] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Reserve
            </Link>

            <p className="mt-4 text-center text-xs text-[#94A3B8]">
              You will not be charged yet
            </p>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}