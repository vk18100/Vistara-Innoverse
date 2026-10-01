import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const localImages = [
  "/images/pag1 (7).jpg",
  "/images/pag1 (8).jpg",
  "/images/pag1 (9).jpg",
  "/images/pag1 (10).jpg",
  "/images/pag1 (11).jpg",
  "/images/pag1 (12).jpg",
  "/images/pag1 (13).jpg",
  "/images/pag1 (14).jpg",
  "/images/pag1 (15).jpg",
  "/images/pag1 (16).jpg",
  "/images/pag1 (17).jpg",
  "/images/pag1 (18).jpg",
  "/images/pag1 (19).jpg",
  "/images/pag1 (20).jpg",
  "/images/pag1 (21).jpg",
  "/images/pag1 (22).jpg",
  "/images/pag1 (23).jpg",
];

const imagesPerProperty = 5;

function getPropertyImage(index: number) {
  const start = index * imagesPerProperty;

  return (
    localImages[start % localImages.length] ??
    localImages[0]
  );
}

export default async function StaysPage() {
  const properties = await prisma.property.findMany({
    where: {
      status: "VERIFIED",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      city: true,
      country: true,
      pricePerNight: true,
      rating: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      description: true,
    },
  });

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
            Vistara Stays
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            Find a stay worth remembering
          </h1>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#64748B]">
            Discover verified stays, villas, apartments, hotels and unique
            places across destinations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        {properties.length === 0 ? (
          <div className="rounded-[28px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-[#03045E]">
              No verified stays available
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property, index) => {
              const image = getPropertyImage(index);

              return (
                <Link
                  key={property.id}
                  href={`/stays/${property.id}`}
                  className="group block"
                >
                  <article>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#EEF2F7]">
                      <Image
                        src={image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#03045E] shadow-sm">
                        Verified
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-semibold text-[#03045E]">
                            {property.title}
                          </h2>

                          <p className="mt-1 text-sm text-[#64748B]">
                            {property.city}, {property.country}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-semibold text-[#03045E]">
                          ★ {Number(property.rating ?? 0).toFixed(1)}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#64748B]">
                        <span>{property.guests} guests</span>

                        <span>•</span>

                        <span>{property.bedrooms} bedrooms</span>

                        <span>•</span>

                        <span>{property.bathrooms} bathrooms</span>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#03045E]">
                        ₹
                        {Number(property.pricePerNight).toLocaleString(
                          "en-IN"
                        )}
                        <span className="ml-1 font-normal text-[#64748B]">
                          / night
                        </span>
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}