import Link from "next/link";

export default function Navbar() {
return(
    <nav className="border-b  border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    
            {/* logo design */}
            <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#03045e] text-xl
            font-bold text-white">
                V
                </div>
                <span className="text-2xl font-semibold tracking-tight text-[#03045e]">Vistara</span>

            </Link>
            
            {/* navigation  working all the main links */}

            <div className="hidden items-center gap-8 md:flex">
                <Link href="/stays"
                className="text-sm font-medium text-black-700 transition hover:text-[#03045e] dark:text-gray-400 dark:hover:text-white">
                    Stays </Link>

                    <Link href="/explore" 
                    className="text-sm font-medium text-black-700 transition hover:text-[#03045e] dark:text-gray-400 dark:hover:text-white">
                    Explore </Link>
                    <Link 
                    href="/host"
                    className="text-sm font-medium text-black-700 transition hover:text-[#03045e] dark:text-gray-400 dark:hover:text-white">
                  Be a  Host </Link>

                  <Link href="/login"
                  className="rounded-lg bg-[#03045e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#023e8a] dark:hover:bg-[#023e8a]">
                    Login </Link>
            </div>

        </div>
        </nav>
)

}