// data/explore.ts

export type ExploreCategory =
  | "Heritage"
  | "Nature"
  | "Food"
  | "Local Life"
  | "Adventure"
  | "Culture"
  | "Religious"
  | "Shopping"
  | "Cafes"
  | "Experiences"
  | "Events"
  | "Local Markets";

export interface Experience {
  id: number;
  slug: string;

  title: string;
  location: string;
  city: string;
  state: string;

  category: ExploreCategory;

  duration: string;
  price: number;
  priceLabel: string;

  rating: number;
  reviews: number;

  image: string;

  description: string;

  tags: string[];

  // Used for Explore preview
  preview: string;

  // Exact details can be shown after Local Plan purchase
  exactLocation: string;

  // Suitable for filtering/recommendation
  interests: string[];

  featured?: boolean;
}

export const experiences: Experience[] = [
  {
    id: 1,
    slug: "golghar-heritage-walk",

    title: "Golghar Heritage Walk",
    location: "Patna, Bihar",
    city: "Patna",
    state: "Bihar",

    category: "Heritage",

    duration: "2 hours",
    price: 699,
    priceLabel: "From ₹699",

    rating: 4.9,
    reviews: 128,

    image: "/images/golghar.jpg",

    description:
      "Discover Patna through its iconic heritage, architecture and local stories.",

    tags: ["Heritage", "History", "Walking Tour", "Local Stories"],

    preview:
      "Explore one of Patna's iconic landmarks and discover the stories surrounding the old city.",

    exactLocation: "Golghar Heritage Area, Patna, Bihar",

    interests: ["History", "Architecture", "Local Culture"],

    featured: true,
  },

  {
    id: 2,
    slug: "jaipur-palace-discovery",

    title: "Jaipur Palace Discovery",
    location: "Jaipur, Rajasthan",
    city: "Jaipur",
    state: "Rajasthan",

    category: "Heritage",

    duration: "3 hours",
    price: 999,
    priceLabel: "From ₹999",

    rating: 4.8,
    reviews: 214,

    image: "/images/hawamahal.jpg",

    description:
      "Walk through Jaipur's royal streets, architecture and cultural landmarks.",

    tags: ["Palace", "Heritage", "Architecture", "Culture"],

    preview:
      "Discover Jaipur's royal side through historic streets, architecture and cultural stories.",

    exactLocation: "Old Jaipur Heritage District, Jaipur, Rajasthan",

    interests: ["History", "Architecture", "Culture"],

    featured: true,
  },

  {
    id: 3,
    slug: "qutub-heritage-trail",

    title: "Qutub Heritage Trail",
    location: "Delhi, India",
    city: "Delhi",
    state: "Delhi",

    category: "Heritage",

    duration: "2 hours",
    price: 799,
    priceLabel: "From ₹799",

    rating: 4.8,
    reviews: 176,

    image: "/images/kutub.jpg.jpg",

    description:
      "Explore historic architecture and stories from Delhi's fascinating past.",

    tags: ["History", "Architecture", "Heritage", "Walking Tour"],

    preview:
      "Walk through historic Delhi and discover architectural stories from another era.",

    exactLocation: "Qutub Heritage Area, New Delhi",

    interests: ["History", "Architecture", "Heritage"],

    featured: true,
  },

  {
    id: 4,
    slug: "local-cafe-coffee-trail",

    title: "Local Café & Coffee Trail",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",

    category: "Food",

    duration: "3 hours",
    price: 899,
    priceLabel: "From ₹899",

    rating: 4.7,
    reviews: 142,

    image: "/images/coffeebin.jpg",

    description:
      "Taste local coffee and discover neighbourhood cafés loved by locals.",

    tags: ["Coffee", "Cafes", "Food", "Local Favourite"],

    preview:
      "Discover neighbourhood cafés and experience Bengaluru's local coffee culture.",

    exactLocation: "Central Bengaluru Café District",

    interests: ["Coffee", "Food", "Cafes"],

    featured: true,
  },

  {
    id: 5,
    slug: "countryside-farm-experience",

    title: "Countryside Farm Experience",
    location: "Bihar, India",
    city: "Patna",
    state: "Bihar",

    category: "Local Life",

    duration: "3 hours",
    price: 799,
    priceLabel: "From ₹799",

    rating: 4.8,
    reviews: 96,

    image: "/images/farm.jpg",

    description:
      "Spend time with local communities and experience rural life.",

    tags: ["Farm", "Local Life", "Rural", "Community"],

    preview:
      "Step away from the city and experience everyday rural life through a local community.",

    exactLocation: "Rural outskirts of Patna, Bihar",

    interests: ["Local Life", "Nature", "Community"],

    featured: true,
  },

  {
    id: 6,
    slug: "hidden-heritage-house",

    title: "Hidden Heritage House",
    location: "Rajasthan, India",
    city: "Jaipur",
    state: "Rajasthan",

    category: "Heritage",

    duration: "2 hours",
    price: 699,
    priceLabel: "From ₹699",

    rating: 4.7,
    reviews: 84,

    image: "/images/blackhouse.jpg",

    description:
      "Step inside a lesser-known architectural gem away from the usual tourist routes.",

    tags: ["Hidden Gem", "Architecture", "Heritage", "Local"],

    preview:
      "Discover a lesser-known heritage space away from the usual tourist trail.",

    exactLocation: "Hidden Heritage Quarter, Jaipur, Rajasthan",

    interests: ["Architecture", "Hidden Gems", "History"],
  },

  {
    id: 7,
    slug: "coastal-escape",

    title: "Coastal Escape",
    location: "Goa, India",
    city: "Goa",
    state: "Goa",

    category: "Nature",

    duration: "3 hours",
    price: 899,
    priceLabel: "From ₹899",

    rating: 4.8,
    reviews: 203,

    image: "/images/beachhouse.jpg.jpg",

    description:
      "Slow down with coastal views, peaceful surroundings and local experiences.",

    tags: ["Beach", "Nature", "Relaxation", "Coastal"],

    preview:
      "Escape the busy tourist spots and enjoy a slower coastal experience.",

    exactLocation: "North Goa Coastal Area",

    interests: ["Nature", "Beach", "Relaxation"],

    featured: true,
  },

  {
    id: 8,
    slug: "city-lights-discovery",

    title: "City Lights Discovery",
    location: "Dubai",
    city: "Dubai",
    state: "Dubai",

    category: "Adventure",

    duration: "4 hours",
    price: 1499,
    priceLabel: "From ₹1,499",

    rating: 4.8,
    reviews: 318,

    image: "/images/dubai.jpg",

    description:
      "Experience Dubai after sunset through local highlights and city views.",

    tags: ["Night", "City", "Adventure", "Photography"],

    preview:
      "See Dubai after sunset and discover the city's most vibrant evening experiences.",

    exactLocation: "Downtown Dubai",

    interests: ["Nightlife", "Adventure", "Photography"],

    featured: true,
  },

  {
    id: 9,
    slug: "ancient-temple-trail",

    title: "Ancient Temple Trail",
    location: "India",
    city: "Patna",
    state: "Bihar",

    category: "Religious",

    duration: "3 hours",
    price: 799,
    priceLabel: "From ₹799",

    rating: 4.9,
    reviews: 117,

    image: "/images/krantaktemple.jpg",

    description:
      "Discover architecture, rituals and stories surrounding an ancient temple.",

    tags: ["Temple", "Spiritual", "Architecture", "History"],

    preview:
      "Explore an ancient place of worship and learn about its architecture and traditions.",

    exactLocation: "Ancient Temple Heritage Area, Bihar",

    interests: ["Spiritual", "History", "Culture"],

    featured: true,
  },

  {
    id: 10,
    slug: "local-home-experience",

    title: "Local Home Experience",
    location: "Patna, Bihar",
    city: "Patna",
    state: "Bihar",

    category: "Local Life",

    duration: "2 hours",
    price: 599,
    priceLabel: "From ₹599",

    rating: 4.8,
    reviews: 73,

    image: "/images/house.jpg",

    description:
      "Meet locals and experience the city through everyday life and traditions.",

    tags: ["Local Home", "Culture", "Community", "Food"],

    preview:
      "Meet local people and experience the destination from a more personal perspective.",

    exactLocation: "Local Residential Area, Patna, Bihar",

    interests: ["Local Life", "Culture", "Food"],

    featured: true,
  },

  {
    id: 11,
    slug: "grand-city-discovery",

    title: "Grand City Discovery",
    location: "India",
    city: "Delhi",
    state: "Delhi",

    category: "Adventure",

    duration: "4 hours",
    price: 1099,
    priceLabel: "From ₹1,099",

    rating: 4.7,
    reviews: 154,

    image: "/images/big.jpg",

    description:
      "See the city through places and experiences most travellers miss.",

    tags: ["City Tour", "Hidden Gems", "Adventure", "Local"],

    preview:
      "Explore a different side of the city through lesser-known places and local highlights.",

    exactLocation: "Central Delhi Discovery Route",

    interests: ["Adventure", "Hidden Gems", "City Life"],
  },

  {
    id: 12,
    slug: "hidden-gem-escape",

    title: "Hidden Gem Escape",
    location: "Patna, Bihar",
    city: "Patna",
    state: "Bihar",

    category: "Nature",

    duration: "3 hours",
    price: 699,
    priceLabel: "From ₹699",

    rating: 4.9,
    reviews: 91,

    image: "/images/download.jpg",

    description:
      "Find a quiet corner and experience the destination differently.",

    tags: ["Hidden Gem", "Nature", "Peaceful", "Local"],

    preview:
      "Find a quieter side of Patna and enjoy a local escape away from crowded places.",

    exactLocation: "Hidden Nature Spot, Patna, Bihar",

    interests: ["Nature", "Peaceful", "Hidden Gems"],

    featured: true,
  },
];

export const categories: ExploreCategory[] = [
  "Heritage",
  "Nature",
  "Food",
  "Local Life",
  "Adventure",
  "Culture",
  "Religious",
  "Shopping",
  "Cafes",
  "Experiences",
  "Events",
  "Local Markets",
];