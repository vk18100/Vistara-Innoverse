import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import { prisma } from "@/lib/prisma";

type HostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function HostProfilePage({
  params,
}: HostPageProps) {
  const { id } = await params;

  const hostId = Number(id);

  if (!Number.isInteger(hostId) || hostId <= 0) {
    notFound();
  }

  const host = await prisma.user.findUnique({
    where: {
      id: hostId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      role: true,

      profile: {
        select: {
          bio: true,
          city: true,
          country: true,
          profileImage: true,
        },
      },

      properties: {
        where: {
          status: "VERIFIED",
        },
        select: {
          id: true,
          title: true,
          city: true,
          country: true,
          type: true,
          rating: true,
          pricePerNight: true,

          images: {
            orderBy: {
              isPrimary: "desc",
            },
            take: 1,
            select: {
              url: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!host || host.role !== "HOST") {
    notFound();
  }

  const hostName = host.name?.trim() || "Vistara Host";

  const firstName = hostName.split(" ")[0];

  const initials = hostName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const memberSince = new Date(
    host.createdAt
  ).getFullYear();

  const profileImage =
    host.profile?.profileImage || "/profile.jpg";

  const location = [
    host.profile?.city,
    host.profile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

          <Link
            href="/"
            className="text-sm font-semibold text-black/50 transition hover:text-black"
          >
            ← Back
          </Link>

          <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center">

            {/* PROFILE IMAGE */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-black bg-black sm:h-36 sm:w-36">
              <Image
                src={profileImage}
                alt={`${hostName} profile`}
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
            </div>

            {/* HOST INFO */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-black/50">
                VISTARA HOST
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {hostName}
              </h1>

              {location && (
                <p className="mt-3 text-base font-semibold text-black/60 sm:text-lg">
                  {location}
                </p>
              )}

              <p className="mt-2 text-sm font-medium text-black/45">
                Host since {memberSince}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">

        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/45">
            ABOUT THE HOST
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Meet {firstName}
          </h2>

          <p className="mt-5 text-base font-medium leading-8 text-black/65 sm:text-lg">
            {host.profile?.bio ||
              `${hostName} is a Vistara host helping travellers discover comfortable stays and memorable places.`}
          </p>
        </div>

        {/* ================= HOST STATS ================= */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

          <div className="border border-black/10 p-5 sm:p-6">
            <p className="text-3xl font-black sm:text-4xl">
              {host.properties.length}
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-black/50">
              Verified stays
            </p>
          </div>

          <div className="border border-black/10 p-5 sm:p-6">
            <p className="text-3xl font-black sm:text-4xl">
              ✓
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-black/50">
              Verified host
            </p>
          </div>

          <div className="col-span-2 border border-black/10 p-5 sm:col-span-1 sm:p-6">
            <p className="text-3xl font-black sm:text-4xl">
              {memberSince}
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-black/50">
              Joined Vistara
            </p>
          </div>
        </div>

        {/* ================= HOST STAYS ================= */}
        {host.properties.length > 0 && (
          <section className="mt-16">

            <div className="border-b border-black pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/45">
                HOST'S STAYS
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Properties by {firstName}
              </h2>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {host.properties.map((property) => {
                const image =
                  property.images[0]?.url ||
                  "/images/property-placeholder.jpg";

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="group overflow-hidden border border-black/10 bg-white transition hover:border-black hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                      <Image
                        src={image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                        {property.type}
                      </p>

                      <h3 className="mt-2 text-lg font-black tracking-tight">
                        {property.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-black/55">
                        {property.city}, {property.country}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">

                        <p className="text-sm font-bold">
                          ₹
                          {Number(
                            property.pricePerNight
                          ).toLocaleString("en-IN")}
                          <span className="font-medium text-black/45">
                            {" "}
                            / night
                          </span>
                        </p>

                        {property.rating > 0 && (
                          <span className="text-sm font-bold">
                            ★ {property.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= TRUST ================= */}
        <section className="mt-16 border-t border-black/10 pt-10">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/45">
              VISTARA TRUST
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              A verified Vistara host
            </h2>

            <p className="mt-3 text-sm font-medium leading-7 text-black/60 sm:text-base">
              This host's verified properties are reviewed through
              Vistara's property and provider verification workflow.
            </p>

          </div>
        </section>

      </section>
    </main>
  );
}