export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED";

export type Booking = {
  id: number;
  bookingId: string;

  stayId: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  nights: number;

  pricePerNight: number;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  guest: {
    name: string;
    email: string;
    phone: string;
  };
};

export const bookings: Booking[] = [
  {
    id: 1,
    bookingId: "VST-2026-000001",

    stayId: "forest-house",

    checkIn: "2026-10-20",
    checkOut: "2026-10-23",

    guests: 4,
    nights: 3,

    pricePerNight: 8500,
    subtotal: 25500,
    serviceFee: 1500,
    taxes: 4860,
    totalAmount: 31860,

    status: "CONFIRMED",
    paymentStatus: "PAID",

    guest: {
      name: "Guest User",
      email: "guest@example.com",
      phone: "+91 9876543210",
    },
  },

  {
    id: 2,
    bookingId: "VST-2026-000002",

    stayId: "heritage-villa",

    checkIn: "2026-11-02",
    checkOut: "2026-11-05",

    guests: 2,
    nights: 3,

    pricePerNight: 6800,
    subtotal: 20400,
    serviceFee: 1200,
    taxes: 3672,
    totalAmount: 25272,

    status: "CONFIRMED",
    paymentStatus: "PAID",

    guest: {
      name: "Guest User",
      email: "guest@example.com",
      phone: "+91 9876543210",
    },
  },
];