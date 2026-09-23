"use client"

import {useSearchParams} from "next/navigation";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/Searchbar";

import Filters from "@/components/Filters";
import Dropdown from "@/components/Dropdown";
const properties =[
    {
        id:1,
        title:"Luxury Villa",
        description:"A beautiful villa with stunning views.",
        location:"Bali, Indonesia",
        price:500,
        image:"/images/villa.jpg",
    },
    {
        id:2,
        title:"Beachfront Apartment",
        description:"A modern apartment with direct beach access.", 
        location:"Miami, USA",
        price:300,
        image:"/images/apartment.jpg",
    },
    {
            id:3,
            title:"Mountain Cabin",
            description:"A cozy cabin in the mountains.",
            location:"Aspen, USA",
            price:200,
            image:"/images/cabin.jpg",
    }
]

export default function SearchPage() {
    const searchParams = useSearchParams();
    const destination = searchParams.get("destination") || "your destination";
    return(
        <main>
            <Navbar/>
            <section className="min-h-screen max-w-7xl px-6 py-8">
                <SearchBar/>
                <div className="mt-10">
                    <p className="text-sm text-gray-500">
                        Showing results for <span className="font-semibold text-gray-900">{destination}</span>
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property) => (
                           <div
  key={property.id}
  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
>
  <img
    src={property.image}
    alt={property.title}
    className="h-48 w-full object-cover"
  />

  <div className="p-4">
    <h2 className="text-lg font-semibold text-[#03045e]">
      {property.title}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      {property.description}
    </p>

    <p className="mt-2 text-sm text-gray-600">
      {property.location}
    </p>

    <p className="mt-3 font-semibold text-[#03045e]">
      ₹{property.price} / night
    </p>
  </div>
</div>
                        ))}
                    </div>
                    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

  {/* Left */}
  <Filters />

  {/* Right - Search Results */}
  <section>
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#03045e]">
          Stays in Patna
        </h1>

        <p className="text-sm text-gray-500">
          24 properties found
        </p>
      </div>

      <div className="w-44">
        <Dropdown
          label="Sort by"
          options={[
            "Recommended",
            "Price: Low to High",
            "Price: High to Low",
            "Highest Rated",
          ]}
        />
      </div>
    </div>

    {/* Property results */}
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Cards yahan */}
    </div>
  </section>

</div>
                </div>
                        
                               
            </section>
        </main>
    )
  }