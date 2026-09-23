import Link from "next/link";
import Navbar from "@/components/navbar";
const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking confirmed",
    message: "Your stay in Patna has been successfully confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "wishlist",
    title: "Price update",
    message: "A stay from your wishlist has a new price.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    type: "verification",
    title: "Property verified",
    message: "A property you viewed has completed Vistara verification.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 4,
    type: "trip",
    title: "Upcoming trip",
    message: "Your upcoming stay is approaching. Check your trip details.",
    time: "3 days ago",
      unread: false,
  },
];
export default function Notifications() {
    return(
        <main className="min-h-screen bg-white">    
        <Navbar/>
        <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex items-center justify-between gap-4">
                <div>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
        Updates
    </p>
    <h1 className="mt-2 text-4xl font-bold text-[#03045e]">
        Notifications
    </h1>
    <p className="mt-3 text-sm text-gray-500">
        Stay updated with the latest notifications regarding your bookings, wishlist, and more.
    </p>
</div>

<button type="button" className=" hidden text-sm font-semibold rounded-xl bg-[#03045e] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#023e8a]">
    Mark all as read
</button>
            </div>

<div className="mt-10 space-y-4 overflow-auto max-h-[calc(100vh-200px)] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm   ">
    {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 border-b border-gray-200 p-5 last:border-b-0 transition hover:bg-gray-50 ${
                notification.unread ? "bg-[#f7f9ff]" : "bg-white"
              }`}
            >

              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-lg text-[#03045e]">
                {notification.type === "booking" && "✓"}
                {notification.type === "wishlist" && "♡"}
                {notification.type === "verification" && "✓"}
                {notification.type === "trip" && "✈"}
              </div>

              <div className="flex h-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-lg text-[#03045e]">
                {notification.type === "booking" && "✓"}
                {notification.type === "wishlist" && "♡"}
                {notification.type === "verification" && "✓"}
                {notification.type === "trip" && "✈"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-gray-500">{notification.title}</h2>
                        {notification.unread && (
                            <span className="inline-block h-2 w-2 rounded-full bg-[#03045e]"></span>
                        )}
                    </div>
                    <span className="mt-1 text-sm leading-6 text-gray-500 sm:mt-0">{notification.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        {notification.message}
                    </p>
                </div>
                </div>
    ))}
</div>
{notifications.length === 0 && (
    <div className="mt-10 text-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f3ff] text-xl text-[#03045e]">
              ✓
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#03045e]">
              You're all caught up
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              New updates about your bookings, trips and stays will
              appear here.
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-block rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#023e8a]"
            >
              Explore stays
            </Link>

          </div>
        )}

        </section>

                </main>
    )
}