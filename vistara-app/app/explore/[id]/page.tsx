import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Star,
  Utensils,
  Users,
} from "lucide-react";

type Experience = {
  id: number;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: string;
  rating: string;
  image: string;
  description: string;

  host: string;
  hostImage: string;

  route: string[];
  food: string[];

  latitude: number;
  longitude: number;

  overview: string;

  reviews: {
    name: string;
    rating: number;
    comment: string;
    image: string;
  }[];
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Golghar Heritage Walk",
    location: "Patna, Bihar",
    category: "Heritage",
    duration: "2 hours",
    price: "₹699",
    rating: "4.9",
    image: "/images/golghar.jpg",
    description:
      "Discover Patna through its heritage, stories, food and local streets.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Golghar",
      "Gandhi Maidan",
      "Ganga Riverfront",
      "Local heritage streets",
    ],

    food: [
      "Litti Chokha",
      "Sattu Sharbat",
      "Khaja",
      "Local chai",
    ],

    latitude: 25.5941,
    longitude: 85.1376,

    overview:
      "This experience takes you through some of Patna's most recognisable heritage areas while introducing the local stories, food and everyday life around them. The walk is designed for travellers who want to understand the city instead of only seeing its famous landmarks.",

    reviews: [
      {
        name: "Ananya",
        rating: 5,
        comment:
          "Rajiv explained the history really well and the food stops made the experience much more interesting.",
        image: "/images/host.jpg",
      },
      {
        name: "Rohan",
        rating: 5,
        comment:
          "Very relaxed experience. We got to see places I would probably have missed on my own.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 2,
    title: "Jaipur Palace Discovery",
    location: "Jaipur, Rajasthan",
    category: "Heritage",
    duration: "3 hours",
    price: "₹999",
    rating: "4.8",
    image: "/images/hawamahal.jpg.jpg",
    description:
      "Walk through Jaipur's royal streets, architecture and local culture.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Hawa Mahal",
      "City Palace",
      "Johari Bazaar",
      "Old Jaipur streets",
    ],

    food: [
      "Pyaaz Kachori",
      "Ghevar",
      "Masala Chai",
      "Dal Baati Churma",
    ],

    latitude: 26.9239,
    longitude: 75.8267,

    overview:
      "Explore Jaipur through its architecture, bazaars and food culture. The experience combines famous landmarks with smaller local streets so travellers can experience the city beyond the usual tourist route.",

    reviews: [
      {
        name: "Meera",
        rating: 5,
        comment:
          "The route was beautiful and Rajiv made the history very easy to understand.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 3,
    title: "Qutub Heritage Trail",
    location: "Delhi, India",
    category: "Heritage",
    duration: "2 hours",
    price: "₹799",
    rating: "4.8",
    image: "/images/kutub.jpg.jpg",
    description:
      "Explore historic architecture and stories from old Delhi.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Qutub Minar",
      "Mehrauli Archaeological Park",
      "Historic ruins",
      "Local Delhi lanes",
    ],

    food: [
      "Delhi Chaat",
      "Kebabs",
      "Paratha",
      "Masala Chai",
    ],

    latitude: 28.5245,
    longitude: 77.1855,

    overview:
      "A heritage-focused walk around the historic Mehrauli area, combining major monuments with lesser-known architectural details and local food stops.",

    reviews: [
      {
        name: "Aarav",
        rating: 5,
        comment:
          "Loved the combination of history and local food.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 4,
    title: "Local Café & Coffee Trail",
    location: "Bengaluru, Karnataka",
    category: "Food",
    duration: "3 hours",
    price: "₹899",
    rating: "4.7",
    image: "/images/coffeebein.jpg",
    description:
      "Taste local coffee and discover neighbourhood cafés.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Neighbourhood café",
      "Local coffee roastery",
      "Street food lane",
      "Independent bakery",
    ],

    food: [
      "South Indian Filter Coffee",
      "Masala Dosa",
      "Local Pastry",
      "Fresh Bakery Snacks",
    ],

    latitude: 12.9716,
    longitude: 77.5946,

    overview:
      "A relaxed food experience for travellers who want to discover Bengaluru through its independent cafés, coffee culture and neighbourhood food.",

    reviews: [
      {
        name: "Priya",
        rating: 5,
        comment:
          "Perfect experience for anyone who loves coffee and local food.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 5,
    title: "Countryside Farm Experience",
    location: "Bihar, India",
    category: "Local Life",
    duration: "3 hours",
    price: "₹799",
    rating: "4.8",
    image: "/images/farm.jpg",
    description:
      "Spend time with local communities and experience rural life.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Village entrance",
      "Local farm",
      "Village homes",
      "Countryside fields",
    ],

    food: [
      "Litti Chokha",
      "Seasonal vegetables",
      "Sattu",
      "Village tea",
    ],

    latitude: 25.5941,
    longitude: 85.1376,

    overview:
      "Spend a few hours away from the city and experience everyday countryside life, local farming and traditional food.",

    reviews: [
      {
        name: "Kabir",
        rating: 5,
        comment:
          "A very different experience from normal sightseeing.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 6,
    title: "Hidden Heritage House",
    location: "Rajasthan, India",
    category: "Heritage",
    duration: "2 hours",
    price: "₹699",
    rating: "4.7",
    image: "/images/blackhouse.jpg",
    description:
      "Step inside a lesser-known architectural gem.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Heritage house",
      "Old neighbourhood",
      "Craft street",
      "Local market",
    ],

    food: [
      "Kachori",
      "Ghevar",
      "Chai",
      "Local sweets",
    ],

    latitude: 26.9124,
    longitude: 75.7873,

    overview:
      "Discover a quieter side of Rajasthan through traditional architecture, local crafts and food.",

    reviews: [
      {
        name: "Nisha",
        rating: 5,
        comment:
          "Beautiful architecture and a very personal experience.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 7,
    title: "Coastal Escape",
    location: "Goa, India",
    category: "Nature",
    duration: "3 hours",
    price: "₹899",
    rating: "4.8",
    image: "/images/beachhouse.jpg.jpg",
    description:
      "Slow down with coastal views and local experiences.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Beach viewpoint",
      "Local fishing village",
      "Coastal road",
      "Sunset point",
    ],

    food: [
      "Goan Fish Curry",
      "Prawn Fry",
      "Bebinca",
      "Fresh Coconut",
    ],

    latitude: 15.2993,
    longitude: 74.124,
    
    overview:
      "A relaxed coastal experience combining scenic places, local communities and regional Goan food.",

    reviews: [
      {
        name: "Ishita",
        rating: 5,
        comment:
          "The sunset stop was beautiful. Really calm experience.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 8,
    title: "City Lights Discovery",
    location: "Dubai",
    category: "Adventure",
    duration: "4 hours",
    price: "₹1,499",
    rating: "4.8",
    image: "/images/dubai.jpg",
    description:
      "Experience the city after sunset through local highlights.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Downtown",
      "Old Dubai",
      "Local market",
      "Night viewpoint",
    ],

    food: [
      "Arabic Mezze",
      "Shawarma",
      "Kunafa",
      "Arabic Coffee",
    ],

    latitude: 25.2048,
    longitude: 55.2708,

    overview:
      "See Dubai through a mix of modern landmarks, older neighbourhoods, markets and local food.",

    reviews: [
      {
        name: "Aditya",
        rating: 5,
        comment:
          "Good mix of modern Dubai and local culture.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 9,
    title: "Ancient Temple Trail",
    location: "India",
    category: "Heritage",
    duration: "3 hours",
    price: "₹799",
    rating: "4.9",
    image: "/images/krantaktemple.jpg",
    description:
      "Discover architecture, rituals and stories around an ancient temple.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Main temple",
      "Old shrine",
      "Temple market",
      "Local neighbourhood",
    ],

    food: [
      "Prasad",
      "Local sweets",
      "Regional Thali",
      "Chai",
    ],

    latitude: 25.3176,
    longitude: 82.9739,

    overview:
      "Explore the history and atmosphere surrounding an ancient temple while learning about local traditions and food.",

    reviews: [
      {
        name: "Sneha",
        rating: 5,
        comment:
          "Very peaceful and informative experience.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 10,
    title: "Local Home Experience",
    location: "Patna, Bihar",
    category: "Local Life",
    duration: "2 hours",
    price: "₹599",
    rating: "4.8",
    image: "/images/house.jpg",
    description:
      "Meet locals and experience the city from a different perspective.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Local neighbourhood",
      "Host home",
      "Nearby market",
      "Community street",
    ],

    food: [
      "Homestyle Thali",
      "Litti Chokha",
      "Sattu",
      "Chai",
    ],

    latitude: 25.5941,
    longitude: 85.1376,

    overview:
      "Experience everyday life through a local home, neighbourhood and traditional food.",

    reviews: [
      {
        name: "Rahul",
        rating: 5,
        comment:
          "Felt much more personal than a normal city tour.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 11,
    title: "Grand City Discovery",
    location: "India",
    category: "Adventure",
    duration: "4 hours",
    price: "₹1,099",
    rating: "4.7",
    image: "/images/big.jpg",
    description:
      "See the city through places most travellers miss.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "City centre",
      "Historic street",
      "Local market",
      "Sunset viewpoint",
    ],

    food: [
      "Street Chaat",
      "Local Snacks",
      "Regional Sweet",
      "Chai",
    ],

    latitude: 25.5941,
    longitude: 85.1376,

    overview:
      "A flexible city discovery route designed around local landmarks, neighbourhoods and food.",

    reviews: [
      {
        name: "Vansh",
        rating: 5,
        comment:
          "Nice way to see the city in a few hours.",
        image: "/images/host.jpg",
      },
    ],
  },

  {
    id: 12,
    title: "Hidden Gem Escape",
    location: "Patna, Bihar",
    category: "Nature",
    duration: "3 hours",
    price: "₹699",
    rating: "4.9",
    image: "/images/download.jpg",
    description:
      "Find a quiet corner and experience the destination differently.",

    host: "Rajiv Kumar",
    hostImage: "/images/host.jpg",

    route: [
      "Hidden viewpoint",
      "Local park",
      "Quiet neighbourhood",
      "Sunset point",
    ],

    food: [
      "Local Snacks",
      "Seasonal Fruit",
      "Sattu Sharbat",
      "Chai",
    ],

    latitude: 25.5941,
    longitude: 85.1376,

    overview:
      "A slower discovery experience focused on quieter places, local food and a relaxed pace.",

    reviews: [
      {
        name: "Diya",
        rating: 5,
        comment:
          "Exactly the kind of hidden place I wanted to find.",
        image: "/images/host.jpg",
      },
    ],
  },
];

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id.toString(),
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const experience = experiences.find(
    (item) => item.id === Number(id)
  );

  if (!experience) {
    return (
      <main className="min-h-screen bg-[#F7F5F0]">
        <div className="mx-auto max-w-5xl px-6 py-32 text-center">
          <h1 className="font-serif text-4xl font-semibold">
            Experience not found
          </h1>

          <Link
            href="/explore"
            className="mt-6 inline-flex rounded-full bg-[#1D1B18] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  const mapUrl =
    `https://www.openstreetmap.org/export/embed.html?` +
    `bbox=${experience.longitude - 0.025}%2C` +
    `${experience.latitude - 0.02}%2C` +
    `${experience.longitude + 0.025}%2C` +
    `${experience.latitude + 0.02}&` +
    `layer=mapnik&marker=${experience.latitude}%2C${experience.longitude}`;

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#1D1B18]">

      {/* ============================
          TOP NAV
      ============================ */}

      <header className="border-b border-[#DED9D0] bg-[#F7F5F0]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">

          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm font-semibold text-[#625D55] transition hover:text-[#1D1B18]"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A6935]">
            VISTARA
          </span>

        </div>
      </header>

      {/* ============================
          HERO IMAGE
      ============================ */}

      <section className="mx-auto max-w-[1500px] px-5 pt-5 sm:px-8 lg:px-12 lg:pt-8">

        <div className="relative aspect-[16/8] overflow-hidden rounded-[30px] bg-[#E7E0D5]">

          <Image
            src={experience.image}
            alt={experience.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1500px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-10 sm:left-10">

            <span className="inline-flex rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#39342D]">
              {experience.category}
            </span>

            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              {experience.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">

              <span className="flex items-center gap-1.5">
                <MapPin size={15} />
                {experience.location}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={15} />
                {experience.duration}
              </span>

              <span className="flex items-center gap-1.5">
                <Star
                  size={15}
                  className="fill-white"
                />
                {experience.rating}
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* ============================
          MAIN
      ============================ */}

      <div className="mx-auto grid max-w-[1350px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_380px] lg:px-12 lg:py-16">

        <div>

          {/* HOST */}

          <section className="flex items-center justify-between border-b border-[#DED9D0] pb-8">

            <div className="flex items-center gap-4">

              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#E6DED1]">

                <Image
                  src="/images/profile.jpg"
                  alt={experience.host}
                  fill
                  sizes="56px"
                  className="object-cover"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.15em] text-[#817A70]">
                  Hosted by
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  {experience.host}
                </h2>

                <p className="mt-1 flex items-center gap-1 text-xs text-[#817A70]">
                  <CheckCircle2 size={13} />
                  Vistara verified host
                </p>

              </div>

            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D2C7] bg-white transition hover:bg-[#EEE9DF]"
              aria-label="Save experience"
            >
              <Heart size={18} />
            </button>

          </section>

          {/* OVERVIEW */}

          <section className="border-b border-[#DED9D0] py-10">

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A6935]">
              OVERVIEW
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Experience the place, not just the landmark.
            </h2>

            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[#706A61]">
              {experience.overview}
            </p>

          </section>

          {/* ROUTE */}

          <section className="border-b border-[#DED9D0] py-10">

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A6935]">
              YOUR ROUTE
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Where we will go
            </h2>

            <div className="mt-8">

              {experience.route.map((place, index) => (

                <div
                  key={place}
                  className="relative flex gap-5 pb-8 last:pb-0"
                >

                  {index !== experience.route.length - 1 && (
                    <div className="absolute left-[14px] top-8 h-full w-px bg-[#D8D2C7]" />
                  )}

                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#24211D] text-xs font-bold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {place}
                    </h3>

                    <p className="mt-1 text-sm text-[#817A70]">
                      Explore with your local host
                    </p>
                  </div>

                </div>

              ))}

            </div>
          </section>

          {/* FOOD */}

          <section className="border-b border-[#DED9D0] py-10">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFE6D7]">
                <Utensils
                  size={19}
                  className="text-[#8A6935]"
                />
              </div>

              <div>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A6935]">
                  LOCAL FOOD
                </p>

                <h2 className="mt-1 font-serif text-3xl font-semibold">
                  What you can taste
                </h2>

              </div>

            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

              {experience.food.map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-[#DED9D0] bg-white p-4"
                >
                  <p className="text-sm font-semibold">
                    {item}
                  </p>

                  <p className="mt-1 text-xs text-[#817A70]">
                    Local favourite
                  </p>
                </div>

              ))}

            </div>

          </section>

          {/* MAP */}

          <section className="py-10">

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A6935]">
              LOCATION
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Where you will be
            </h2>

            <div className="mt-7 overflow-hidden rounded-[24px] border border-[#DED9D0] bg-white">

              <iframe
                src={mapUrl}
                title={`Map showing ${experience.title}`}
                loading="lazy"
                className="h-[380px] w-full border-0"
              />

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-3">

                  <MapPin
                    size={18}
                    className="text-[#8A6935]"
                  />

                  <div>

                    <p className="text-sm font-semibold">
                      {experience.location}
                    </p>

                    <p className="mt-1 text-xs text-[#817A70]">
                      Experience meeting point
                    </p>

                  </div>

                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${experience.latitude},${experience.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold"
                >
                  Open map
                  <ArrowUpRight size={15} />
                </a>

              </div>

            </div>

          </section>

          {/* REVIEWS */}

          <section className="border-t border-[#DED9D0] pt-10">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A6935]">
                  REVIEWS
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold">
                  What travellers say
                </h2>

              </div>

              <div className="flex items-center gap-1 text-sm font-semibold">

                <Star
                  size={16}
                  className="fill-[#B28A45] text-[#B28A45]"
                />

                {experience.rating}

              </div>

            </div>

            <div className="mt-8 space-y-6">

              {experience.reviews.map((review) => (

                <article
                  key={review.name}
                  className="rounded-[22px] border border-[#DED9D0] bg-white p-6"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="relative h-10 w-10 overflow-hidden rounded-full">

                        <Image
                          src="/images/profile.jpg"
                          alt={review.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />

                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          {review.name}
                        </p>

                        <div className="mt-1 flex gap-0.5">

                          {Array.from({
                            length: review.rating,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              size={12}
                              className="fill-[#B28A45] text-[#B28A45]"
                            />
                          ))}

                        </div>

                      </div>

                    </div>

                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#706A61]">
                    {review.comment}
                  </p>

                </article>

              ))}

            </div>

            {/* COMMENT */}

            <div className="mt-8 rounded-[22px] border border-[#DED9D0] bg-white p-6">

              <div className="flex items-center gap-3">

                <MessageCircle
                  size={19}
                  className="text-[#8A6935]"
                />

                <h3 className="font-semibold">
                  Share your experience
                </h3>

              </div>

              <textarea
                placeholder="Write a comment..."
                className="mt-5 min-h-[120px] w-full resize-none rounded-2xl border border-[#D8D2C7] bg-[#FAF8F4] p-4 text-sm outline-none transition focus:border-[#9C8154]"
              />

              <button
                type="button"
                className="mt-4 rounded-full bg-[#24211D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3A352F]"
              >
                Post comment
              </button>

            </div>

          </section>

        </div>

        {/* ============================
            BOOKING CARD
        ============================ */}

        <aside className="lg:sticky lg:top-8 lg:h-fit">
  <div className="rounded-[28px] border border-[#DED9D0] bg-white p-6 shadow-[0_15px_50px_rgba(30,25,15,0.08)]">

    {/* PRICE + RATING */}
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-[#817A70]">
          Experience from
        </p>

        <p className="mt-1 text-2xl font-bold text-[#24211D]">
          ₹{experience.price}
        </p>
      </div>

      <div className="flex items-center gap-1 text-sm font-semibold text-[#24211D]">
        <Star
          size={15}
          className="fill-[#B28A45] text-[#B28A45]"
        />
        {experience.rating}
      </div>
    </div>

    {/* DETAILS */}
    <div className="mt-6 grid grid-cols-2 gap-3">

      {/* DURATION */}
      <div className="rounded-2xl bg-[#F7F5F0] p-4">
        <Clock3
          size={17}
          className="text-[#8A6935]"
        />

        <p className="mt-3 text-xs text-[#817A70]">
          Duration
        </p>

        <p className="mt-1 text-sm font-semibold text-[#24211D]">
          {experience.duration}
        </p>
      </div>

      {/* GROUP */}
      <div className="rounded-2xl bg-[#F7F5F0] p-4">
        <Users
          size={17}
          className="text-[#8A6935]"
        />

        <p className="mt-3 text-xs text-[#817A70]">
          Group
        </p>

        <p className="mt-1 text-sm font-semibold text-[#24211D]">
          Small group
        </p>
      </div>

    </div>

    {/* BOOK */}
    <Link
      href={`/orders/${experience.id}?type=explore`}
      className="mt-6 flex w-full items-center justify-center rounded-full bg-[#24211D] py-4 text-sm font-semibold text-white transition hover:bg-[#B28A45]"
    >
      Book this experience
    </Link>

    <p className="mt-4 text-center text-xs text-[#817A70]">
      You won't be charged yet
    </p>

  </div>
</aside>

      </div>

    </main>
  );
}