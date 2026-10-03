"use client";

import Link from "next/link";

const activities = [
  {
    id: 1,
    title: "Local Food Walk",
    location: "Kankarbagh, Patna",
    category: "Food",
    duration: "2–3 hours",
    price: 499,
    image: "/images/food.jpg",
    description:
      "Explore local flavours, hidden food spots and authentic regional dishes.",
  },
  {
    id: 2,
    title: "Heritage Walk",
    location: "Patna, Bihar",
    category: "Culture",
    duration: "2 hours",
    price: 399,
    image: "/images/patna.jpg",
    description:
      "Discover historical places and stories that shaped the local area.",
  },
  {
    id: 3,
    title: "Sunset Riverside Experience",
    location: "Ganga Ghat, Patna",
    category: "Nature",
    duration: "2 hours",
    price: 299,
    image: "/images/ganga.jpg",
    description:
      "Enjoy a peaceful evening experience along the riverside.",
  },
  {
    id: 4,
    title: "Local Market Explorer",
    location: "Patna",
    category: "Shopping",
    duration: "2–3 hours",
    price: 349,
    image: "/images/market.jpg",
    description:
      "Explore local markets, handmade products and regional shopping spots.",
  },
  {
    id: 5,
    title: "Cafe Hopping",
    location: "Patna",
    category: "Cafe",
    duration: "3 hours",
    price: 599,
    image: "/images/coffee.jpg",
    description:
      "Visit selected local cafes and discover the city's coffee culture.",
  },
  {
    id: 6,
    title: "Photography Trail",
    location: "Patna",
    category: "Experience",
    duration: "2 hours",
    price: 449,
    image: "/images/patna.jpg",
    description:
      "Capture interesting locations, local life and hidden visual gems.",
  },
];

const categories = [
  "All",
  "Food",
  "Culture",
  "Nature",
  "Shopping",
  "Cafe",
  "Experience",
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B76545]">
            VISTARA EXPERIENCES
          </p>

          <h1
            className="
              max-w-4xl
              font-serif
              text-5xl
              font-semibold
              leading-[1.02]
              tracking-[-0.035em]
              text-[#2C2420]
              md:text-7xl
            "
          >
            Experiences worth
            <br />
            <span className="text-[#B76545]">
              remembering.
            </span>
          </h1>

          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-[#756D67]
              md:text-lg
            "
          >
            Discover local food, culture, hidden places and meaningful
            experiences that make your journey feel truly personal.
          </p>

        </div>
      </section>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}
      <section
        className="
          sticky
          top-0
          z-20
          border-b
          border-[#E5DED6]
          bg-[#FAF8F3]/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            gap-3
            overflow-x-auto
            px-6
            py-5
            md:px-10
          "
        >
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`
                whitespace-nowrap
                rounded-full
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  index === 0
                    ? `
                      bg-[#B76545]
                      text-white
                      shadow-sm
                      hover:bg-[#965039]
                    `
                    : `
                      border
                      border-[#E5DED6]
                      bg-white
                      text-[#2C2420]
                      hover:border-[#B76545]
                      hover:text-[#B76545]
                    `
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </section>


      {/* =====================================================
          EXPERIENCES
      ===================================================== */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}
          <div
            className="
              mb-10
              flex
              flex-col
              justify-between
              gap-5
              md:flex-row
              md:items-end
            "
          >
            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#B76545]
                "
              >
                LOCAL ACTIVITIES
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-[#2C2420]
                  md:text-5xl
                "
              >
                Things to do around you.
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-[#756D67]
                "
              >
                Choose an activity and make your local journey more memorable.
              </p>

            </div>

            <span
              className="
                text-sm
                font-semibold
                text-[#68705A]
              "
            >
              6 experiences
            </span>

          </div>


          {/* =================================================
              EXPERIENCE CARDS
          ================================================= */}
          <div
            className="
              grid
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="
                  group
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#E5DED6]
                  bg-white
                  shadow-[0_8px_30px_rgba(44,36,32,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_rgba(44,36,32,0.12)]
                "
              >

                {/* =========================================
                    EXISTING IMAGE
                ========================================= */}
                <div
                  className="
                    relative
                    h-60
                    overflow-hidden
                    bg-[#E8DED0]
                  "
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* IMAGE OVERLAY */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/25
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* CATEGORY */}
                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-[#FAF8F3]/95
                      px-3.5
                      py-1.5
                      text-xs
                      font-bold
                      text-[#B76545]
                      shadow-sm
                    "
                  >
                    {activity.category}
                  </span>

                  {/* DURATION */}
                  <span
                    className="
                      absolute
                      bottom-4
                      right-4
                      rounded-full
                      bg-[#2C2420]/85
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    {activity.duration}
                  </span>
                </div>


                {/* =========================================
                    CARD CONTENT
                ========================================= */}
                <div className="p-6">

                  {/* TITLE */}
                  <h3
                    className="
                      font-serif
                      text-2xl
                      font-semibold
                      leading-tight
                      text-[#2C2420]
                      transition-colors
                      duration-200
                      group-hover:text-[#B76545]
                    "
                  >
                    {activity.title}
                  </h3>


                  {/* LOCATION */}
                  <p
                    className="
                      mt-3
                      text-sm
                      font-medium
                      text-[#68705A]
                    "
                  >
                    📍 {activity.location}
                  </p>


                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-[#756D67]
                    "
                  >
                    {activity.description}
                  </p>


                  {/* DIVIDER + PRICE + BUTTON */}
                  <div
                    className="
                      mt-6
                      flex
                      items-end
                      justify-between
                      border-t
                      border-[#E5DED6]
                      pt-5
                    "
                  >

                    <div>
                      <p
                        className="
                          text-xs
                          font-medium
                          text-[#756D67]
                        "
                      >
                        Starting from
                      </p>

                      <p
                        className="
                          mt-1
                          text-2xl
                          font-bold
                          text-[#2C2420]
                        "
                      >
                        ₹{activity.price.toLocaleString("en-IN")}
                      </p>
                    </div>


                    <Link
                      href={`/experiences/${activity.id}`}
                      className="
                        rounded-full
                        bg-[#B76545]
                        px-6
                        py-3
                        text-sm
                        font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#965039]
                        hover:shadow-md
                        active:scale-95
                      "
                    >
                      View
                    </Link>

                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          LOCAL PLAN CTA
      ===================================================== */}
      <section className="px-6 pb-20 md:px-10">

        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[32px]
            bg-[#2C2420]
            px-8
            py-12
            text-white
            md:px-14
            md:py-14
          "
        >

          <div className="max-w-3xl">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#B8945A]
              "
            >
              VISTARA LOCAL PLAN
            </p>


            <h2
              className="
                mt-4
                font-serif
                text-4xl
                font-semibold
                leading-tight
                md:text-5xl
              "
            >
              Unlock the complete
              <br />
              local experience.
            </h2>


            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-[#E8DED0]
              "
            >
              Discover selected places, exact locations, local routes,
              food spots and experiences around your stay.
            </p>


            <Link
              href="/explore"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-[#B76545]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                transition-all
                duration-200
                hover:bg-[#965039]
                hover:shadow-lg
              "
            >
              Explore Local Plan →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}