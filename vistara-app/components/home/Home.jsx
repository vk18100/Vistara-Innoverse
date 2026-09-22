import Link from "next/link";

function Home(){
    return(
        <main className="min-h-screen bg-white text-[#03045E]">
            <section className="relative  ming-h[90vh]
            overflow-hidden bg-[#03045E]">

                <div className="absolute -right-32 -top-32 -top-32
                h-[500px] w-[500px] rounded-full bg-[#0d21a1] opacity-40 blur-3xl">
                    <div className="absolute -right-32 -top-32
                    h-[500px] w-[500px] rounded-full bg-[#0d21a1] opacity-40 blur-3xl">
<div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-6 px-4 text-center">
    <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-normal text-[#00B4D8]">
                Stays experience Trips 
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking -tight text-white
            sm:text-7xl lg:text-8xl">
                Explore the world with Vistara
            </h1>
            <p className="mt-6 text-lg text-white">
                Discover the world with Vistara, your trusted travel companion. From luxurious stays to unforgettable experiences, we make every journey extraordinary.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/explore" className="rounded-lg bg-[#00B4D8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00B4D8]/90">
                    Explore Now
                </Link>
    <Link href="/stays" className=" rounded-full border border-[#00B4D8] px-5 py-3 text-sm font-medium text-[#00B4D8] transition hover:bg-[#00B4D8]/10">
                    Stays
                </Link>
            </div>
        </div>
        <div className="relative">
            <img src="/images/hero.png" alt="Hero Image" className="mx-auto max-w-full rounded-lg shadow-lg" />
            <div className="h-full w-full object-cover opacity-90"/>
            <div className="absolute inset-0 bg-[#03045E] opacity-50"/>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white//20 bg-[#03045E]/h-80
            p-5 backdrop:blur-sm">
                <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                Discover places beyond the ordinary. </p>
        </div>
        <span className="text-2xl text-white">↗</span>
    </div>
                    </div>

                </div>
            <section className="home">

            </section>



            {/* seaarch */}

<section className="relative z-10 -mt-10 px-6">
    <div className="mx-auto max-w-6xl rounded-3xl border border-[#03045E]/20 bg-white p-6 shadow-lg backdrop-blur-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl px-5 py-4 hover:bg-[#03045E]/5"> <p className="text-xs font-semibold uppercase tracking-wider text-[#03045E]/50"> Location </p> <p className="mt-1 font-medium text-[#03045E]"> Where are you going? </p> </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="check-in" className="text-sm font-medium text-[#03045E]">
                    Check-in
                </label>
                <input type="date" id="check-in" className="rounded-lg border border-[#03045E]/20 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" />
            </div>
           <div className="rounded-2xl px-5 py-4 hover:bg-[#03045E]/5"> <p className="text-xs font-semibold uppercase tracking-wider text-[#03045E]/50"> Guests </p> <p className="mt-1 font-medium text-[#03045E]"> Add guests </p> </div> <button className="rounded-2xl bg-[#0D21A1] px-6 py-4 font-semibold text-white transition hover:bg-[#03045E]"> Search → </button> </div> </div> </section>
        </div>
    </div>
</section>



{/* discover */}
<section className="relative z-10 -mt-10 px-6">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em]
        text-[#03045E]/50">
            Explore
        </p>
        <h2 className="text-3xl font-semibold text-[#03045E]">
            Discover the world with Vistara
        </h2>
        </div>
        <Link href="/explore" className="rounded-lg bg-[#00B4D8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00B4D8]/90">
            Explore Now
        </Link>
    </div>
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
            {
                place: "Paris, France",
                image: "/images/paris.jpg",
                description: "Experience the romance and culture of Paris, from the Eiffel Tower to world-class museums."
            },
            {
                place: "Tokyo, Japan",
                image: "/images/tokyo.jpg",
                description: "Immerse yourself in the vibrant culture and modernity of Tokyo, from bustling streets to serene temples."
            },
        ].map((item) => (
            <div key={item.place} className="rounded-2xl bg-white p-4 shadow-md">
                <img src={item.image} alt={item.place} className="w-full h-48 object-cover rounded-lg" />
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-[#03045E]">{item.place}</h3>
                    <p className="text-sm text-[#03045E]/70">{item.description}</p>
                    <h3 className="mt-2 text-sm font-medium text-[#00B4D8]">Learn More →</h3>
                    <button className="mt-4 rounded-lg bg-[#00B4D8] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#00B4D8]/90">
                        Book Now
                    </button>
                </div>
            </div>
            
        ))}
    </div>
</section>
<section className="px-6 py-24 lg:px-10"> <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0D21A1] px-8 py-16 text-center text-white md:px-16"> <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60"> Your next journey </p> <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"> Your next story starts somewhere new. </h2> <Link to="/explore" className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white" > Start exploring </Link> </div> </section>

        </main>
    )
}