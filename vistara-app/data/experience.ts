export type Experience = {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  duration: string;
  hostId: string;
  hostName: string;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Local Food Walk",
    location: "Kankarbagh",
    city: "Patna",
    country: "India",
    category: "Food",
    image: "/images/Cultural Crown.jpg",
    price: 499,
    rating: 4.9,
    reviews: 128,
    guests: 8,
    duration: "2–3 hours",
    hostId: "1",
    hostName: "Aarav Kumar",
    description:
      "Discover the real taste of Patna through a relaxed local food walk. Visit hidden food spots, taste authentic local dishes and experience the food culture with a local host.",
    highlights: [
      "Local food tasting",
      "Hidden food spots",
      "Local host",
      "Cultural stories",
      "Small group experience",
      "Local recommendations",
    ],
  },

  {
    id: "2",
    title: "Heritage Walk",
    location: "Patna",
    city: "Patna",
    country: "India",
    category: "Culture",
    image: "/images/download (4).jpg",
    price: 399,
    rating: 4.8,
    reviews: 96,
    guests: 10,
    duration: "2 hours",
    hostId: "2",
    hostName: "Meera Singh",
    description:
      "Walk through the historic side of Patna and discover important landmarks, local stories and cultural places with an experienced local host.",
    highlights: [
      "Historic landmarks",
      "Local stories",
      "Walking tour",
      "Cultural insights",
      "Local guide",
      "Small group",
    ],
  },

  {
    id: "3",
    title: "Sunset Riverside Experience",
    location: "Ganga Ghat",
    city: "Patna",
    country: "India",
    category: "Nature",
    image: "/images/download (2).jpg",
    price: 299,
    rating: 4.9,
    reviews: 84,
    guests: 6,
    duration: "2 hours",
    hostId: "3",
    hostName: "Riya Verma",
    description:
      "Spend a peaceful evening beside the Ganga and enjoy beautiful sunset views, a relaxed riverside walk and a local perspective of the city.",
    highlights: [
      "Sunset views",
      "Riverside walk",
      "Photography",
      "Peaceful setting",
      "Local host",
      "Relaxed experience",
    ],
  },

  {
    id: "4",
    title: "Local Market Explorer",
    location: "Patna Market",
    city: "Patna",
    country: "India",
    category: "Shopping",
    image: "/images/download (5).jpg",
    price: 349,
    rating: 4.7,
    reviews: 73,
    guests: 8,
    duration: "2–3 hours",
    hostId: "4",
    hostName: "Kabir Sharma",
    description:
      "Explore vibrant local markets, discover regional products and experience the everyday shopping culture of Patna with someone who knows the city.",
    highlights: [
      "Local markets",
      "Shopping tips",
      "Regional products",
      "Local guide",
      "Hidden shops",
      "Flexible walk",
    ],
  },

  {
    id: "5",
    title: "Cafe Hopping",
    location: "Central Patna",
    city: "Patna",
    country: "India",
    category: "Cafe",
    image: "/images/Tour through coastal Mallorca.jpg",
    price: 599,
    rating: 4.9,
    reviews: 65,
    guests: 6,
    duration: "3 hours",
    hostId: "5",
    hostName: "Ananya Roy",
    description:
      "Discover charming cafes, local coffee and signature treats while exploring the city's growing cafe culture with a local.",
    highlights: [
      "Local cafes",
      "Coffee tasting",
      "Local desserts",
      "Hidden cafes",
      "Food recommendations",
      "Small group",
    ],
  },

  {
    id: "6",
    title: "Photography Trail",
    location: "Patna",
    city: "Patna",
    country: "India",
    category: "Experience",
    image: "/images/download (3).jpg",
    price: 449,
    rating: 4.8,
    reviews: 54,
    guests: 5,
    duration: "2 hours",
    hostId: "6",
    hostName: "Dev Raj",
    description:
      "Explore visually interesting streets, local life and hidden corners while capturing memorable photographs along the way.",
    highlights: [
      "Photography spots",
      "Local life",
      "Hidden locations",
      "Photo guidance",
      "City exploration",
      "Small group",
    ],
  },

  {
    id: "7",
    title: "Adventure & Rafting",
    location: "Soča Valley",
    city: "Bovec",
    country: "Slovenia",
    category: "Adventure",
    image:
      "/images/Whitewater rafting in Slovenia, on the emerald Soca River.jpg",
    price: 1299,
    rating: 4.9,
    reviews: 142,
    guests: 8,
    duration: "3–4 hours",
    hostId: "7",
    hostName: "Luka Martin",
    description:
      "Take on the beautiful turquoise waters of the Soča River with experienced local guides and enjoy an unforgettable outdoor adventure.",
    highlights: [
      "River rafting",
      "Safety equipment",
      "Professional guide",
      "Scenic views",
      "Adventure experience",
      "Small group",
    ],
  },

  {
    id: "8",
    title: "Mountain Escape",
    location: "Swiss Alps",
    city: "Interlaken",
    country: "Switzerland",
    category: "Nature",
    image: "/images/download (2).jpg",
    price: 1799,
    rating: 4.9,
    reviews: 112,
    guests: 8,
    duration: "5 hours",
    hostId: "8",
    hostName: "Noah Keller",
    description:
      "Explore breathtaking alpine landscapes, peaceful valleys and scenic mountain trails with a local guide.",
    highlights: [
      "Mountain trails",
      "Alpine views",
      "Nature walk",
      "Local guide",
      "Photography",
      "Scenic viewpoints",
    ],
  },

  {
    id: "9",
    title: "Desert Balloon Experience",
    location: "Dubai Desert",
    city: "Dubai",
    country: "UAE",
    category: "Adventure",
    image: "/images/download (1).jpg",
    price: 2499,
    rating: 4.8,
    reviews: 91,
    guests: 6,
    duration: "3 hours",
    hostId: "9",
    hostName: "Omar Hassan",
    description:
      "Rise above the desert at sunrise and experience sweeping views across the golden dunes from a hot air balloon.",
    highlights: [
      "Sunrise flight",
      "Desert views",
      "Professional pilot",
      "Photography",
      "Breakfast",
      "Small group",
    ],
  },

  {
    id: "10",
    title: "Northern Lights Experience",
    location: "Reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    category: "Nature",
    image: "/images/download(11).jpg",
    price: 2999,
    rating: 4.9,
    reviews: 156,
    guests: 8,
    duration: "4 hours",
    hostId: "10",
    hostName: "Elin Magnus",
    description:
      "Chase the northern lights away from the city and witness one of nature's most spectacular nighttime experiences.",
    highlights: [
      "Northern lights",
      "Night photography",
      "Local guide",
      "Warm drinks",
      "Scenic locations",
      "Small group",
    ],
  },
    {
    id: "11",
    title: "Venice Canal Ride",
    location: "Venice",
    city: "Venice",
    country: "Italy",
    category: "Culture",
    image: "/images/download(4).jpg",
    price: 1599,
    rating: 4.8,
    reviews: 0,
    guests: 8,
    duration: "2 hours",
    hostId: "11",
    hostName: "Marco Rossi",
    description:
      "Glide through Venice's historic canals and discover the city's architecture from the water.",
    highlights: [
      "Historic canal ride",
      "Venice architecture",
      "Local stories",
      "Scenic views",
      "Gondola experience",
      "Small group experience",
    ],
  },

  {
    id: "12",
    title: "Mountain Paragliding",
    location: "Interlaken",
    city: "Interlaken",
    country: "Switzerland",
    category: "Adventure",
    image: "/images/download(10).jpg",
    price: 3999,
    rating: 4.8,
    reviews: 0,
    guests: 6,
    duration: "2 hours",
    hostId: "12",
    hostName: "Noah Keller",
    description:
      "Fly above alpine valleys and turquoise lakes for an unforgettable high-altitude adventure.",
    highlights: [
      "Paragliding flight",
      "Alpine valley views",
      "Turquoise lake views",
      "Professional instructor",
      "Safety equipment",
      "Adventure experience",
    ],
  },
  
];