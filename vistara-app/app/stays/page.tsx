import Link from "next/link";
import Navbar from "@/components/navbar";

const stays = [
  {
    id: 1,
    title: "Peaceful Stay in Patna",
    location: "Patna, Bihar",
    price: "₹2,500",
    rating: "4.8",
    image: "/images/stay1.jpg",
    type: "Home",
  },
  {
    id: 2,
    title: "Modern Riverside Villa",
    location: "Patna, Bihar",
    price: "₹3,200",
    rating: "4.7",
    image: "/images/stay2.jpg",
    type: "Villa",
  },
  {
    id: 3,
    title: "Cozy Heritage Home",
    location: "Patna, Bihar",
    price: "₹1,800",
    rating: "4.9",
    image: "/images/stay3.jpg",
    type: "Heritage",
     },
  {
    id: 4,
    title: "Luxury City Apartment",
    location: "Patna, Bihar",
    price: "₹4,000",
    rating: "4.6",
    image: "/images/stay4.jpg",
    type: "Apartment",
  },
  {
    id: 5,
    title: "Quiet Garden Retreat",
    location: "Rajgir, Bihar",
    price: "₹2,200",
    rating: "4.8",
    image: "/images/stay5.jpg",
    type: "Retreat",
  },
  {
    id: 6,
    title: "Heritage Villa",
    location: "Bodh Gaya, Bihar",
    price: "₹3,500",
    rating: "4.9",
    image: "/images/stay6.jpg",
    type: "Villa",
  },
];

export default function StaysPage(){
    return(
        <main className="min-h-screen bg-[#fafafa]">
            <Navbar/>
            <section className="mx-auto max-w-6xl px-6 py-16">

                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#023e8a]">
                        Vistara Stays
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-[#03045e] md:text-5xl">
                        Find Your Perfect Stay
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Explore our curated selection of stays across Bihar. Whether you're looking for a cozy home, a luxurious villa, or a heritage property, we have something for every traveler.
                    </p>
                </div>
            



            <div className="mt-10 flex gap-3 overflow-x-auto
            border-b border-gray-200 pb-5">
                <button className="shrink-0 rounded-full bg-[#03045e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#023e8a]"
                >All Stays</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Home</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Villa</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Heritage</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Apartment</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Retreat</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Cottage</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Cabin</button>
                <button className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"  
                >Bungalow</button>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#023e8a]">
                {stays.length} Stays Available
                </p>
                </div>

                <div className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {stays.map((stay) => (
            <Link
              key={stay.id}
              href={`/property/${stay.id}`}
              className="group"
            >
                <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={stay.image}
                        alt={stay.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <button 
                type="button"
                onClick={(e) => e.preventDefault()}
                className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-500 transition hover:bg-gray-100"
                > ♡
                </button>

                <div className="absolute bottom-4 left-4 top-0 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#03045e] shadow-sm">
                ✓ Verified
                </div>
            <div className="mt-4">

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-900 transition group-hover:text-[#03045e]">
                      {stay.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {stay.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 text-sm">
                    <span>★</span>
                    <span>{stay.rating}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {stay.type}
                </p>

                <p className="mt-2 text-sm text-gray-900">
                  <span className="font-semibold">
                    {stay.price}
                  </span>{" "}
                  night
                </p>

              </div>
            </Link>  
              ))}

        </div>    


        <section className="mx-auto mt-16 max-w-6xl px-6">
            <div className="mb-6">
                <p className="text-xs font-semibold 
                uppercase tracking-[0.2rem] text-[#023e8a]">
                    Explore the location
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#03045e]">
                    Find stays around your destination
                </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="absolute h-48 w-full overflow-hidden rounded-lg bg-gray-100">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#03045e] text-xl font-bold text-white">
                              📍
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[#03045e]">
                  Vistara Map
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Interactive property map will appear here.
                </p>
              </div>
            </div>

          </div>
        </section></section>
        </main>
             
    )
}