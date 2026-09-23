import  Link from "next/link";
import Navbar from "@/components/navbar";

const destinations = [
  {
    id: 1,
    title: "Patna",
    description: "Discover local places, stays and experiences.",
    image: "/images/patna.jpg",
  },
  {
    id: 2,
    title: "Bodh Gaya",
    description: "Explore culture, history and peaceful surroundings.",
    image: "/images/bodh-gaya.jpg",
  },
  {
    id: 3,
    title: "Rajgir",
    description: "Find nature, heritage and places beyond the usual route.",
    image: "/images/rajgir.jpg",
  },
  {
    id: 4,
    title: "Vaishali",
    description: "Discover historic places and local experiences.",
    image: "/images/vaishali.jpg",
  },
];

export default function Explore(){
    return(
        <main className="min-h-screen bg-white">
            <Navbar/>
    <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#023e8a]">
                Explore Bihar
            </p>
            <h1 className="mt-3 text-4xl font-bold text-[#03045e] md:text-5xl">
                Discover the beauty of Bihar
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
                Explore the rich culture, history and natural beauty of Bihar. Find unique stays and experiences that make your trip unforgettable.
            </p>
        </div>


        <div className="mt-8 flex max-w-2xl overflow-auto gap-4">
            <input type="text" placeholder="Search destinations..." className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#03045e] focus:ring focus:ring-[#03045e] focus:ring-opacity-50"/>
            <button className="rounded-lg bg-[#03045e] px-4 py-2 text-white transition hover:bg-[#023e8a]">
                Search
            </button>
        </div>
        <div className="mt-16">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#03045e]">Place to Destinations</h2>
                    <p className="mt-2 text-sm text-gray-600">Discover the best places to visit in Bihar.</p>
                        </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {destinations.map((destination) => (
                        <Link key={destination.id} href={`/destinations/${destination.id}`} className="group relative block overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                            <div className="relative h-48 w-full">
                            <img src={destination.image} alt={destination.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                            </div>

                            <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{destination.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{destination.description}</p>
                          <span className="mt-4 inline-block text-sm font-semibold text-[#03045e]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
        </main>
    )


}

   