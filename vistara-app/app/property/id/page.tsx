import Link from "next/link";
import Navbar from "@/components/navbar";

const properties = {
     title: "Peaceful Stay in Patna",
  location: "Patna, Bihar",
  price: "₹2,500",
  rating: "4.8",
  reviews: 24,
  image: "/images/stay1.jpg",
  description:
    "A comfortable and peaceful stay for travelers looking to explore Patna and nearby places.",
  guests: 4,
  bedrooms: 2,
  amenities: ["Wi-Fi", "Parking", "Air Conditioning", "Kitchen"],
};
export  default function Propertydetails(){
    return(
        <main className="min-h-screen bg-white">
            <Navbar/>
            <div className="mx-auto max-w-7xl px-6 py-8">
                <Link href="/search" className="text-sm font-medium text-[#03045e] transition hover:text-[#023e8a]">
                    &larr; Back to Search
                </Link>
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <h1 className="text-3xl font-bold text-[#03045e]">{properties.title}</h1>
            <p className="mt-2 text-lg text-gray-700">{properties.location}</p>
            <p className="mt-4 text-xl font-semibold text-[#03045e]">{properties.price}</p>
            <div className="mt-4 flex items-center gap-2">
                <span className="text-yellow-500">★ {properties.rating}</span>
                <span className="text-gray-500">({properties.reviews} reviews)</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
            <img src={properties.image} alt={properties.title} className="mt-6 w-full rounded-lg object-cover"/>
            <p className="mt-6 text-gray-700">{properties.description}</p>
            </div>
        
        <div className="mt-10 grid gap-10 lg:grid-cols-2">

            <div>
                <h2 className="text-2xl font-semibold text-[#03045e]">About the Property</h2>
                <p className="mt-4 text-gray-700 leading-06">{properties.description}</p >


                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{properties.guests}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{properties.bedrooms}</p>
                    </div>
                </div>

<div className="mt-8">
    <h2 className="text-2xl font-semibold text-[#03045e]">Amenities</h2>
    <div className="mt-4 grid grid-cols-2 gap-4">
        {properties.amenities.map((amenity) => (
            <div 
key={amenity} className="flex items-center gap-2 rounded-lg border border-gray-200 p-4">
                <span className="text-gray-500">{amenity}</span>
            </div>
        ))}
    </div>
</div>

<div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
    <h2 className="font-semibold text-[#03045e]">Verified Owner</h2>
    <p className="mt-2 text-sm leading-6 text-gray-500">This property is managed by a verified owner, ensuring a safe and reliable experience for guests.</p>
</div>
</div>


<aside className="h-fit rounded-2xl border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-[#03045e]">{properties.price}</span>
        <span className="text-sm text-gray-500">per night</span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border border-gray-200">
        <div className="border-r p-4">
            <p className="text-sm text-gray-500">Check-in</p>
        <p className="mt-1 text-sm font-medium text-gray-900">select date</p>

        </div>
        <div className="p-4">
            <p className="text-sm text-gray-500">Guests</p>
            <p className="mt-1 text-sm font-medium text-gray-900">select guests</p>
        </div>
        </div>

        <Link href="/booking" className="mt-6 block w-full rounded-lg bg-[#03045e] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#023e8a]">
            Book Now
        </Link>
        <p className="mt-2 text-center text-sm text-gray-500">You won't be charged yet</p>

</aside>
            </div>
        </div>

        </main>
    )
}