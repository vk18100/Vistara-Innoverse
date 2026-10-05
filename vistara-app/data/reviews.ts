export type Review = {
  id: string;
  propertyId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    propertyId: "patna-heritage-stay",
    userName: "Ananya Sharma",
    userImage: "/images/profile.jpg",
    rating: 5,
    comment:
      "A very comfortable and peaceful stay. The location was convenient and the host was very helpful.",
    date: "September 2026",
  },
  {
    id: "review-2",
    propertyId: "patna-heritage-stay",
    userName: "Rahul Verma",
    userImage: "/images/profile.jpg",
    rating: 4,
    comment:
      "The property was clean and comfortable. Everything we needed was available during our stay.",
    date: "August 2026",
  },
  {
    id: "review-3",
    propertyId: "patna-heritage-stay",
    userName: "Priya Singh",
    userImage: "/images/profile.jpg",
    rating: 5,
    comment:
      "Really enjoyed the stay. The place felt homely and the host was welcoming.",
    date: "July 2026",
  },
];