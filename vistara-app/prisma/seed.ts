import {
  PrismaClient,
  UserRole,
  PropertyType,
  PropertyStatus,
  VerificationStatus,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DIRECT_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Vistara...");

  // USERS
  const host = await prisma.user.upsert({
    where: { email: "host@vistara.com" },
    update: {},
    create: {
      name: "Vistara Host",
      email: "host@vistara.com",
      password: "demo-password",
      role: UserRole.HOST,
      profile: {
        create: {
          firstName: "Vistara",
          lastName: "Host",
          bio: "Verified Vistara property host",
          city: "Patna",
          country: "India",
        },
      },
    },
  });

  const guest = await prisma.user.upsert({
    where: { email: "guest@vistara.com" },
    update: {},
    create: {
      name: "Demo Guest",
      email: "guest@vistara.com",
      password: "demo-password",
      role: UserRole.GUEST,
      profile: {
        create: {
          firstName: "Demo",
          lastName: "Guest",
          city: "Patna",
          country: "India",
        },
      },
    },
  });

  // AMENITIES
  const amenityNames = [
    "Wi-Fi",
    "Air Conditioning",
    "Free Parking",
    "Kitchen",
    "Workspace",
    "Swimming Pool",
    "Breakfast",
    "Garden",
  ];

  const amenities = [];

  for (const name of amenityNames) {
    const amenity = await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    amenities.push(amenity);
  }

  // PROPERTIES
  const propertyData = [
    {
      title: "Peaceful Heritage Stay",
      description:
        "A calm and comfortable stay for travelers looking to explore Patna while enjoying a peaceful private space.",
      city: "Patna",
      address: "Boring Road, Patna",
      price: 2500,
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      type: PropertyType.GUEST_HOUSE,
      image: "/images/stay1.jpg",
    },
    {
      title: "Modern Riverside Villa",
      description:
        "A premium villa with modern interiors, spacious rooms and a relaxing environment.",
      city: "Patna",
      address: "Gandhi Ghat, Patna",
      price: 4500,
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      type: PropertyType.VILLA,
      image: "/images/stay2.jpg",
    },
    {
      title: "Elegant City Apartment",
      description:
        "A modern apartment located close to major city attractions, restaurants and local experiences.",
      city: "Patna",
      address: "Fraser Road, Patna",
      price: 3200,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      type: PropertyType.APARTMENT,
      image: "/images/stay3.jpg",
    },
  ];

  for (const item of propertyData) {
    const property = await prisma.property.create({
      data: {
        hostId: host.id,
        title: item.title,
        description: item.description,
        type: item.type,
        status: PropertyStatus.VERIFIED,
        address: item.address,
        city: item.city,
        country: "India",
        guests: item.guests,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        pricePerNight: item.price,
        rating: 4.8,
        reviewCount: 24,

        images: {
          create: [
            {
              url: item.image,
              isPrimary: true,
            },
          ],
        },

        amenities: {
          create: amenities.slice(0, 5).map((amenity) => ({
            amenityId: amenity.id,
          })),
        },

        verification: {
          create: {
            userId: host.id,
            identityStatus: VerificationStatus.VERIFIED,
            ownershipStatus: VerificationStatus.VERIFIED,
            certificateStatus: VerificationStatus.VERIFIED,
            submittedAt: new Date(),
            verifiedAt: new Date(),
            notes: "Demo verified property",
          },
        },
      },
    });

    console.log(`✅ Created: ${property.title}`);
  }

  console.log("🎉 Vistara seed completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });