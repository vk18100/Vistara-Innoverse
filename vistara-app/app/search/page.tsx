"use client"

import {useSearchParams} from "next/navigation";
import Navbar from "@/components/navbar";
import Search from "@/components/Searchbar";

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
            <section
            clasName="min-h-screen max-w-7xl px-6 py-8">
                <SearchBar/>
                <div className="mt-10">
                    <p className="text-sm text-gray-500">
                        Showing results for <span className="font-semibold text-gray-900">{destination}</span>
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property) => (
                            <div key={property.id}
                            title={property.title}
                            location={property.location}
                           price={property.price}
                            image={property.image}
                            className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"/>
                        ))}
                    </div>
                </div>
                        
                               
            </section>
        </main>
    )