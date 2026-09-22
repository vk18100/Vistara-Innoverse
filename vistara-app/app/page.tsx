import Category from "@/components/home/category";
import { categories } from "@/data/categories";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <main>
      <h1>Vistara</h1>
      <Navbar />
      <Category cards={categories} />
    </main>
  );
}