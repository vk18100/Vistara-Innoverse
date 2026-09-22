import Link from "next/link";
import Navbar from "@/components/navbar";

const trips = [
  {
    id: 1,
    title: "Peaceful Stay in Patna",
    location: "Patna, Bihar",
    date: "25 Sep – 27 Sep",
    status: "Upcoming",
    image: "/images/stay1.jpg",
  },
  {
    id: 2,
    title: "Heritage Home",
    location: "Patna, Bihar",
    date: "12 Aug – 14 Aug",
    status: "Completed",
    image: "/images/stay3.jpg",
  },
];


export default function Trip() {
    return (
        <main className="min-h-screen bg-amber-50">
            <Navbar />
            <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold text-[#03045e]">Your Trips</h1>
        <p className="mt-2 text-sm text-gray-500">Manage your upcoming and past trips.</p>
        <div className="mt-2 flex gap-6 border-b border-gray-200 pb-2">
        <button className="border-b-2 border-[#03045e] pb-2 text-sm font-medium text-[#03045e]">Upcoming</button>
        <button className="text-sm font-medium text-gray-500 transition hover:text-[#03045e]">Completed</button>
        </div>


        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
            <article 
key={trip.id} className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
    <img src={trip.image} alt={trip.title} className="h-48 w-full object-cover"/>
    <div className="flex items-center justify-between p-4">
        <div>
            <div className="flex items-start justify-around gap-2">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{trip.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">{trip.location}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trip.status === "Upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {trip.status}
                    </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{trip.date}</p>
                    </div>
                    <Link href={`/trip/${trip.id}`} className="rounded-lg bg-[#03045e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#023e8a]">
                        View Details
                    </Link>
                </div>
        </article>
        ))}
        </div>
        </section>
        </main>
    );
}