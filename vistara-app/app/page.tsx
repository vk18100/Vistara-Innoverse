import Navbar from "@/components/navbar";
import Hero from "@/components/home/Hero";
import HomePage from "@/components/home/page";
import Footer from "@/app/footer/page";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomePage />
      <Footer />
    </>
  );
}