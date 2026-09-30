"use client"; 
 
import Link from "next/link"; 
import { useParams, useRouter } from "next/navigation"; 
import { useEffect, useState } from "react"; 
 
import Navbar from "@/components/navbar"; 
 
type Booking = { 
  id: number; 
  checkIn: string; 
  checkOut: string; 
  guests: number; 
  nights: number; 
  totalAmount: number | string; 
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"; 
  paymentStatus: string; 
  property: { 
    id: number; 
    title: string; 
    city: string; 
    country: string; 
    images: { 
      id: number; 
      url: string; 
      altText?: string | null; 
      isPrimary: boolean; 
    }[]; 
  }; 
}; 
 
function formatDate(date: string) { 
  return new Date(date).toLocaleDateString("en-IN", { 
    day: "numeric", 
    month: "short", 
    year: "numeric", 
  }); 
} 
 
function formatAmount(amount: number | string) { 
  return `₹${Number(amount).toLocaleString("en-IN")}`; 
} 
 
function getStatusStyle(status: Booking["status"]) { 
  switch (status) { 
    case "CONFIRMED": 
      return "bg-[#ECFDF5] text-emerald-700"; 
    case "PENDING": 
      return "bg-[#FFF7ED] text-orange-700"; 
    case "COMPLETED": 
      return "bg-[#F1F5F9] text-[#64748B]"; 
    case "CANCELLED": 
      return "bg-[#FEF2F2] text-red-700"; 
    default: 
      return "bg-[#F1F5F9] text-[#64748B]"; 
  } 
} 
 
export default function BookingDetailPage() { 
  const params = useParams(); 
  const router = useRouter(); 
  const id = params.id as string; 
 
  const [booking, setBooking] = useState<Booking | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
 
  const [cancelling, setCancelling] = useState(false); 
  const [cancelError, setCancelError] = useState(""); 
 
  useEffect(() => { 
    async function loadBooking() { 
      try { 
        setLoading(true); 
        setError(""); 
 
        const response = await fetch(`/api/bookings/${id}`, { 
          method: "GET", 
          credentials: "include", 
          cache: "no-store", 
        }); 
 
        const result = await response.json(); 
 
        if (!response.ok || !result.success) { 
          throw new Error( 
            result.message || "Unable to load this booking." 
          ); 
        } 
 
        setBooking(result.booking ?? result.data ?? null); 
      } catch (err) { 
        console.error("BOOKING_DETAIL_ERROR:", err); 
        setError( 
          err instanceof Error 
            ? err.message 
            : "Unable to load this booking." 
        ); 
      } finally { 
        setLoading(false); 
      } 
    } 
 
    loadBooking(); 
  }, [id]); 
 
  async function handleCancel() { 
    if (!booking) return; 
 
    const confirmed = window.confirm( 
      "Cancel this booking? This cannot be undone." 
    ); 
 
    if (!confirmed) return; 
 
    setCancelling(true); 
    setCancelError(""); 
 
    try { 
      const response = await fetch(`/api/bookings/${booking.id}`, { 
        method: "PATCH", 
        headers: { 
          "Content-Type": "application/json", 
        }, 
        credentials: "include", 
        body: JSON.stringify({ status: "CANCELLED" }), 
      }); 
 
      const result = await response.json(); 
 
      if (!response.ok || !result.success) { 
        throw new Error( 
          result.message || "Unable to cancel booking." 
        ); 
      } 
 
      router.push("/bookings"); 
    } catch (err) { 
      setCancelError( 
        err instanceof Error 
          ? err.message 
          : "Unable to cancel booking." 
      ); 
      setCancelling(false); 
    } 
  } 
 
  if (loading) { 
    return ( 
      <main className="min-h-screen bg-white flex items-center justify-center"> 
        <div className="text-center"> 
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#03045E]" /> 
          <p className="mt-5 text-sm text-[#64748B]"> 
            Loading booking... 
          </p> 
        </div> 
      </main> 
    ); 
  } 
 
  if (error || !booking) { 
    return ( 
      <main className="min-h-screen bg-white text-[#03045E]"> 
        <Navbar /> 
 
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6"> 
          <div className="text-center"> 
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]"> 
              BOOKING NOT FOUND 
            </p> 
 
            <h1 className="mt-4 font-serif text-4xl font-semibold"> 
              {error || "We couldn't find this booking."} 
            </h1> 
 
            <Link 
              href="/bookings" 
              className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]" 
            > 
              Back to bookings 
            </Link> 
          </div> 
        </div> 
      </main> 
    ); 
  } 
 
  const primaryImage = 
    booking.property.images.find((img) => img.isPrimary) || 
    booking.property.images[0]; 
 
  const canCancel = 
    booking.status === "CONFIRMED" || booking.status === "PENDING"; 
 
  return ( 
    <main className="min-h-screen bg-white text-[#03045E]"> 
      <Navbar /> 
 
      <section className="border-b border-[#03045E]/10 bg-[#F7F9FF]"> 
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10"> 
          <Link 
            href="/bookings" 
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]" 
          > 
            ← Back to bookings 
          </Link> 
 
          <p className="mt-6 text-xs text-[#94A3B8]"> 
            Booking ID: VS-{booking.id} 
          </p> 
        </div> 
      </section> 
 
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-10"> 
        <div className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_15px_50px_rgba(3,4,94,0.06)]"> 
          <div className="relative h-80 w-full overflow-hidden bg-[#EEF2FF]"> 
            {primaryImage ? ( 
              <img 
                src={primaryImage.url} 
                alt={primaryImage.altText || booking.property.title} 
                className="h-full w-full object-cover" 
              /> 
            ) : ( 
              <div className="flex h-full items-center justify-center text-sm text-[#64748B]"> 
                No image 
              </div> 
            )} 
          </div> 
 
          <div className="p-8"> 
            <div className="flex flex-wrap items-start justify-between gap-4"> 
              <div> 
                <h1 className="font-serif text-3xl font-semibold"> 
                  {booking.property.title} 
                </h1> 
 
                <p className="mt-2 text-sm text-[#64748B]"> 
                  {booking.property.city}, {booking.property.country} 
                </p> 
              </div> 
 
              <span 
                className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle( 
                  booking.status 
                )}`} 
              > 
                {booking.status} 
              </span> 
            </div> 
 
            <div className="mt-8 grid gap-6 border-y border-[#E8EBF5] py-6 sm:grid-cols-4"> 
              <div> 
                <p className="text-xs text-[#94A3B8]">CHECK-IN</p> 
                <p className="mt-1 text-sm font-semibold"> 
                  {formatDate(booking.checkIn)} 
                </p> 
              </div> 
 
              <div> 
                <p className="text-xs text-[#94A3B8]">CHECK-OUT</p> 
                <p className="mt-1 text-sm font-semibold"> 
                  {formatDate(booking.checkOut)} 
                </p> 
              </div> 
 
              <div> 
                <p className="text-xs text-[#94A3B8]">GUESTS</p> 
                <p className="mt-1 text-sm font-semibold"> 
                  {booking.guests} 
                </p> 
              </div> 
 
              <div> 
                <p className="text-xs text-[#94A3B8]">TOTAL</p> 
                <p className="mt-1 text-sm font-semibold"> 
                  {formatAmount(booking.totalAmount)} 
                </p> 
              </div> 
            </div> 
 
            {cancelError && ( 
              <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600"> 
                {cancelError} 
              </p> 
            )} 
 
            <div className="mt-8 flex flex-wrap gap-3"> 
              <Link 
                href={`/stays/${booking.property.id}`} 
                className="rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#03045E] hover:text-white" 
              > 
                View stay 
              </Link> 
 
              {canCancel && ( 
                <button 
                  onClick={handleCancel} 
                  disabled={cancelling} 
                  className="rounded-xl bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60" 
                > 
                  {cancelling ? "Cancelling..." : "Cancel booking"} 
                </button> 
              )} 
 
              <Link 
                href="/support" 
                className="rounded-xl border border-[#DCE1EF] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:border-[#03045E]" 
              > 
                Get help 
              </Link> 
            </div> 
          </div> 
        </div> 
      </section> 
    </main> 
  ); 
}