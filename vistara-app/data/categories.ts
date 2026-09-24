export type Category = {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: 1,
    title: "Culture",
    description:
      "Discover local traditions, heritage, art and stories that bring every destination to life.",
    image: "/images/culture.jpg",
    cta: "Explore",
    href: "/experiences?category=culture",
  },
  {
    id: 2,
    title: "Nature",
    description:
      "Find peaceful landscapes, hidden natural escapes and unforgettable outdoor experiences.",
    image: "/images/nature.jpg",
    cta: "Explore",
    href: "/experiences?category=nature",
  },
  {
    id: 3,
    title: "Food",
    description:
      "Taste authentic local flavours, regional cuisine and memorable food experiences.",
    image: "/images/food.jpg",
    cta: "Explore",
    href: "/experiences?category=food",
  },
  {
    id: 4,
    title: "Adventure",
    description:
      "Experience thrilling activities, outdoor adventures and places beyond the ordinary.",
    image: "/images/adventure.jpg",
    cta: "Explore",
    href: "/experiences?category=adventure",
  },
];