import Link from "next/link";
import Navbar from "@/components/navbar";

const property = {
  title: "Peaceful Stay in Patna",
  location: "Patna, Bihar, India",
  rating: "4.8",
  reviews: 24,
  guests: 2,
  price: "₹2,500",
  host: "Vistara Verified Host",
  description:
    "A calm and comfortable stay designed for travelers who want to experience the city while having a peaceful place to return to.",
  images: [
    "/images/stay1.jpg",
    "/images/stay2.jpg",
    "/images/stay3.jpg",
    "/images/stay4.jpg",
  ],
  amenities: [
    "Wi-Fi",
    "Air conditioning",
    "Private room",
    "Free parking",
    "Workspace",
    "Kitchen",
  ],
};

export  default function Propertydetails(){
    return(
        <main className="min-h-screen bg-white">
            <Navbar/>
            <section  className="mx-auto max-w-7xl px-6 py-10">
                <Link href="/stays" className="text-sm font-medium text-[#03045e] transition hover:text-[#023e8a]">
                    &larr; Back to Stays
                </Link>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <h1 className="text-3xl font-bold text-[#03045e]">{property.title}</h1>
            <p className="mt-2 text-lg text-gray-700">{property.location}</p>
            <p className="mt-4 text-xl font-semibold text-[#03045e]">{property.price}</p>
            <div className="mt-4 flex items-center gap-2">
                <span className="text-yellow-500">★ {property.rating}</span>
                <span className="text-gray-500">({property.reviews} reviews)</span>
            </div>
            </div>
        
            <div className="mt-8  grid gap-3 md:grid-cols-2 lg:grid-cols-2 ">

            <img src={property.images[0]} alt={property.title} className="h-[204px] w-full rounded-lg object-cover" />
<div className="grid gap-3">
            {property.images.slice(1).map((image) => (
           <img
                key={image}
                src={image}
                alt={property.title}
                className="h-[204px] w-full rounded-2xl object-cover"
              />
            ))}

          </div>

        </div>


<div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px]">
    <div>
        <h2 className="text-2xl font-semibold text-[#03045e]">Hosted by {property.host}</h2>
        <p className="mt-2 text-sm text-gray-500 leading-6">{property.description}</p>
          
        
        

    
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{property.guests}</p>
                    </div>
                    
                </div>

<div className="mt-8">
    <h2 className="text-2xl font-semibold text-[#03045e]">Amenities</h2>
    <div className="mt-4 grid grid-cols-2 gap-4">
        {property.amenities.map((amenity) => (
            <div 
key={amenity} className="flex items-center gap-2 rounded-lg border border-gray-200 p-4">
                <span className="text-gray-500"> ✓ {amenity}</span>
            </div>
        ))}
    </div>
</div>

<div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
    <h2 className=" mt-2 font-semibold text-[#03045e]">Verified Owner</h2>
    <p className="mt-2 text-sm leading-6 text-gray-500">This property is managed by a verified owner, ensuring a safe and reliable experience for guests.</p>
     <Link
                href="/verification"
                className="mt-4 inline-block text-sm font-semibold text-[#03045e] hover:underline"
              >
                View verification details →
              </Link>
</div>
</div>


<aside className="h-fit rounded-2xl border border-gray-200 p-6 shadow-sm">
    <div className=" text-2xl font-bold flex items-center gap-4 lg:sticky lg:top-6">

        <span className="text-2xl font-bold text-[#03045e]">{property.price}</span>
        <span className="text-sm text-gray-500"> {" "}
                / night</span>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4 overflow-hidden rounded-lg border border-gray-200">
        <div className="border-r p-4">
            <p className="text-sx font-semibold text-gray-500">Check-in</p>
        <p className="mt-2 text-sm font-medium text-gray-900">select date</p>

        </div>
        <div className="mt-3 rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500">Guests</p>
            <p className="mt-2 text-sm font-medium text-gray-900">select guests</p>
        </div>
        <Link 
        href="/booking" className="mt-6 block w-full rounded-lg bg-[#03045e] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#023e8a]">
            Book Now
        </Link>
        <p className="mt-2 text-center text-sm text-gray-500">You won't be charged yet</p>

    </div>
    
</aside>
</div>

 <section className="mt-16 border-t border-gray-200 pt-12">

          <p className="text-xs font-semibold uppercase tracking-wider text-[#023e8a]">
            Location
          </p>


 <h2 className="mt-2 text-3xl font-bold text-[#03045e]">
            Where you'll stay
          </h2>

          <p className="mt-2 text-gray-500">
            {property.location}
          </p>

          <div className="mt-8 flex h-[400px] items-center justify-center rounded-3xl bg-gray-100">

            <div className="text-center">

              <div className="text-4xl">
                📍
              </div>

              <p className="mt-3 font-semibold text-[#03045e]">
                Property Location
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Interactive map will be connected here.
              </p>

            </div>

          </div>
</section>
</section>
</main>
    )
}

      