"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type  Card={
    id:number,
    title:string,
    description:string,
    image:string,
    cta:string,
    href:string,
}
type Props = {
    cards: Card[]
}
export default function Search(){
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();


    useEffect(() => {
        const search = async()=> {
            // Perform search logic here
            if(searchQuery.trim() !== ""){
                const response = await fetch(`/api/search?query=${searchQuery}`);
                const data = await response.json();
                // handle the seaarch result and update the state or navigate to a new page
                router.push(`/search?query=${searchQuery}`);
                setSearchQuery("");
            }
            search();
        }

    }, [searchQuery]);

    try{
        const res = fetch(`/api/search?query=${searchQuery}`);
       if(!res.ok){
            throw new Error("Failed to fetch search results");
       }
       const data = res.json();
       const newData = data.data.filter((item:Card) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
       return(
        <div className="flex items-center justify-center">
    <div className="relative w-full max-w-md">
        <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Search..." className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200" />
        <input type="Date" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Check-in.." className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200" />
        <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Guests.." className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200" />
        <button onClick={()=> router.push(`/search?query=${searchQuery}`)} className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Search</button>
    </div>
</div>
       )
    }
    }
