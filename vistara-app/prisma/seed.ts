import {
  PrismaClient,
  UserRole,
  PropertyType,
  PropertyStatus,
  VerificationStatus,
  ExploreType,
  ExploreStatus,
  VerificationLevel,
  TransportType,
  DriverStatus,
  VehicleStatus,
  BookingStatus,
  GuideBookingStatus,
  PlanStatus,
  PlanPurchaseStatus,
  JourneyStatus,
  JourneyTransportMode,
} from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DIRECT_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding Vistara...\n");

  // =========================================================
  // USERS
  // =========================================================

  const host = await prisma.user.upsert({
    where: {
      email: "host@vistara.com",
    },
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
    where: {
      email: "guest@vistara.com",
    },
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

  // =========================================================
  // DRIVER USER
  // =========================================================

  const driverUser = await prisma.user.upsert({
    where: {
      email: "driver@vistara.com",
    },
    update: {},
    create: {
      name: "Rahul Kumar",
      email: "driver@vistara.com",
      password: "demo-password",
      role: UserRole.DRIVER,

      profile: {
        create: {
          firstName: "Rahul",
          lastName: "Kumar",
          bio: "Verified Vistara driver",
          city: "Patna",
          country: "India",
        },
      },
    },
  });

  // =========================================================
  // GUIDE USER
  // =========================================================

  const guideUser = await prisma.user.upsert({
    where: {
      email: "guide@vistara.com",
    },
    update: {},
    create: {
      name: "Aarav Singh",
      email: "guide@vistara.com",
      password: "demo-password",
      role: UserRole.GUIDE,

      profile: {
        create: {
          firstName: "Aarav",
          lastName: "Singh",
          bio: "Local Patna travel guide",
          city: "Patna",
          country: "India",
        },
      },
    },
  });

  console.log("✅ Users created");

  // =========================================================
  // AMENITIES
  // =========================================================

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
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });

    amenities.push(amenity);
  }

  console.log("✅ Amenities created");

  // =========================================================
  // STAYS / PROPERTIES
  // =========================================================

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

  const properties = [];

  for (const item of propertyData) {
    let property = await prisma.property.findFirst({
      where: {
        title: item.title,
        hostId: host.id,
      },
    });

    if (!property) {
      property = await prisma.property.create({
        data: {
          hostId: host.id,

          title: item.title,

          description:
            item.description,

          type: item.type,

          status:
            PropertyStatus.VERIFIED,

          address:
            item.address,

          city:
            item.city,

          country:
            "India",

          guests:
            item.guests,

          bedrooms:
            item.bedrooms,

          bathrooms:
            item.bathrooms,

          pricePerNight:
            item.price,

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
            create: amenities
              .slice(0, 5)
              .map((amenity) => ({
                amenityId:
                  amenity.id,
              })),
          },

          verification: {
            create: {
              userId:
                host.id,

              identityStatus:
                VerificationStatus.VERIFIED,

              ownershipStatus:
                VerificationStatus.VERIFIED,

              certificateStatus:
                VerificationStatus.VERIFIED,

              submittedAt:
                new Date(),

              verifiedAt:
                new Date(),

              notes:
                "Demo verified property",
            },
          },
        },
      });
    }

    properties.push(property);

    console.log(
      `🏠 Stay: ${property.title}`
    );
  }

  // =========================================================
  // EXPLORE CATEGORIES
  // =========================================================

  const categoryData = [
    {
      name: "Heritage",
      slug: "heritage",
      description:
        "Historic and cultural places",
    },

    {
      name: "Food",
      slug: "food",
      description:
        "Local food and restaurants",
    },

    {
      name: "Nature",
      slug: "nature",
      description:
        "Nature and peaceful places",
    },

    {
      name: "Culture",
      slug: "culture",
      description:
        "Local culture and traditions",
    },

    {
      name: "Religious",
      slug: "religious",
      description:
        "Spiritual and religious places",
    },
  ];

  const categories = [];

  for (const item of categoryData) {
    const category =
      await prisma.exploreCategory.upsert({
        where: {
          slug: item.slug,
        },

        update: {},

        create: {
          name:
            item.name,

          slug:
            item.slug,

          description:
            item.description,
        },
      });

    categories.push(category);
  }

  console.log(
    "✅ Explore categories created"
  );

  // =========================================================
  // EXPLORE ITEMS
  // =========================================================

  const exploreData = [
    {
      title: "Gandhi Ghat",
      slug: "gandhi-ghat",
      description:
        "A peaceful riverside destination on the banks of the Ganga, famous for its evening Ganga Aarti.",
      type: ExploreType.RELIGIOUS,
      address: "Gandhi Ghat, Patna",
      city: "Patna",
      state: "Bihar",
      country: "India",
      coverImage:
        "/images/explore/gandhi-ghat.jpg",
      rating: 4.8,
      reviewCount: 120,
      verificationLevel:
        VerificationLevel.VISTARA_VERIFIED,
      isHiddenGem: false,
      isFeatured: true,
      categorySlugs: [
        "religious",
        "culture",
      ],
    },

    {
      title: "Patna Museum",
      slug: "patna-museum",
      description:
        "Explore Bihar's history, art, archaeology and cultural heritage at one of Patna's iconic museums.",
      type: ExploreType.CULTURE,
      address: "Vidyapati Marg, Patna",
      city: "Patna",
      state: "Bihar",
      country: "India",
      coverImage:
        "/images/explore/patna-museum.jpg",
      rating: 4.6,
      reviewCount: 89,
      verificationLevel:
        VerificationLevel.VISTARA_VERIFIED,
      isHiddenGem: false,
      isFeatured: true,
      categorySlugs: [
        "heritage",
        "culture",
      ],
    },

    {
      title: "Takht Sri Patna Sahib",
      slug: "takht-sri-patna-sahib",
      description:
        "A major Sikh pilgrimage site and an important cultural landmark in Patna.",
      type: ExploreType.RELIGIOUS,
      address: "Patna City, Patna",
      city: "Patna",
      state: "Bihar",
      country: "India",
      coverImage:
        "/images/explore/patna-sahib.jpg",
      rating: 4.9,
      reviewCount: 150,
      verificationLevel:
        VerificationLevel.VISTARA_VERIFIED,
      isHiddenGem: false,
      isFeatured: true,
      categorySlugs: [
        "religious",
        "heritage",
      ],
    },

    {
      title: "Patna Local Food Walk",
      slug: "patna-local-food-walk",
      description:
        "Discover authentic Patna street food, local flavours and hidden food spots.",
      type: ExploreType.EXPERIENCE,
      address: "Boring Road, Patna",
      city: "Patna",
      state: "Bihar",
      country: "India",
      coverImage:
        "/images/explore/food-walk.jpg",
      rating: 4.7,
      reviewCount: 56,
      verificationLevel:
        VerificationLevel.COMMUNITY_VERIFIED,
      isHiddenGem: true,
      isFeatured: true,
      categorySlugs: [
        "food",
        "culture",
      ],
    },

    {
      title: "Ganga Riverside Sunset",
      slug: "ganga-riverside-sunset",
      description:
        "A peaceful riverside location for sunset views and relaxed evening walks.",
      type: ExploreType.NATURE,
      address: "Ganga Riverside, Patna",
      city: "Patna",
      state: "Bihar",
      country: "India",
      coverImage:
        "/images/explore/ganga-sunset.jpg",
      rating: 4.7,
      reviewCount: 42,
      verificationLevel:
        VerificationLevel.COMMUNITY_VERIFIED,
      isHiddenGem: true,
      isFeatured: false,
      categorySlugs: [
        "nature",
      ],
    },
  ];

  const explores = [];

  for (const item of exploreData) {
    const explore =
      await prisma.exploreItem.upsert({
        where: {
          slug: item.slug,
        },

        update: {
          title:
            item.title,

          description:
            item.description,

          status:
            ExploreStatus.PUBLISHED,

          city:
            item.city,

          state:
            item.state,

          country:
            item.country,

          coverImage:
            item.coverImage,

          rating:
            item.rating,

          reviewCount:
            item.reviewCount,

          verificationLevel:
            item.verificationLevel,

          isHiddenGem:
            item.isHiddenGem,

          isFeatured:
            item.isFeatured,
        },

        create: {
          title:
            item.title,

          slug:
            item.slug,

          description:
            item.description,

          type:
            item.type,

          status:
            ExploreStatus.PUBLISHED,

          address:
            item.address,

          city:
            item.city,

          state:
            item.state,

          country:
            item.country,

          coverImage:
            item.coverImage,

          rating:
            item.rating,

          reviewCount:
            item.reviewCount,

          verificationLevel:
            item.verificationLevel,

          isHiddenGem:
            item.isHiddenGem,

          isFeatured:
            item.isFeatured,
        },
      });

    // -------------------------------------------------------
    // CATEGORIES
    // -------------------------------------------------------

    for (const slug of item.categorySlugs) {
      const category =
        categories.find(
          (c) => c.slug === slug
        );

      if (!category) continue;

      await prisma.exploreCategoryItem.upsert({
        where: {
          exploreId_categoryId: {
            exploreId:
              explore.id,

            categoryId:
              category.id,
          },
        },

        update: {},

        create: {
          exploreId:
            explore.id,

          categoryId:
            category.id,
        },
      });
    }

    // -------------------------------------------------------
    // IMAGE
    // -------------------------------------------------------

    const existingImage =
      await prisma.exploreImage.findFirst({
        where: {
          exploreId:
            explore.id,

          isPrimary: true,
        },
      });

    if (!existingImage) {
      await prisma.exploreImage.create({
        data: {
          exploreId:
            explore.id,

          url:
            item.coverImage,

          isPrimary: true,

          altText:
            item.title,
        },
      });
    }

    explores.push(explore);

    console.log(
      `📍 Explore: ${explore.title}`
    );
  }

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const foodExplore =
    explores.find(
      (item) =>
        item.slug ===
        "patna-local-food-walk"
    );

  if (foodExplore) {
    const existingExperience =
      await prisma.experience.findUnique({
        where: {
          exploreId:
            foodExplore.id,
        },
      });

    if (!existingExperience) {
      await prisma.experience.create({
        data: {
          exploreId:
            foodExplore.id,

          durationMinutes:
            180,

          price:
            799,

          maxGuests:
            6,

          meetingPoint:
            "Boring Road, Patna",

          bookingUrl:
            null,
        },
      });
    }

    console.log(
      "🎯 Experience created"
    );
  }

  // =========================================================
  // DRIVER PROFILE
  // =========================================================

  let driverProfile =
    await prisma.driverProfile.findUnique({
      where: {
        userId:
          driverUser.id,
      },
    });

  if (!driverProfile) {
    driverProfile =
      await prisma.driverProfile.create({
        data: {
          userId:
            driverUser.id,

          status:
            DriverStatus.AVAILABLE,

          licenseNumber:
            "BR01-DEMO-12345",

          rating:
            4.9,

          totalTrips:
            248,

          isVerified:
            true,
        },
      });
  }

  // =========================================================
  // DRIVER VEHICLE
  // =========================================================

  let vehicle =
    await prisma.vehicle.findFirst({
      where: {
        driverId:
          driverProfile.id,
      },
    });

  if (!vehicle) {
    vehicle =
      await prisma.vehicle.create({
        data: {
          driverId:
            driverProfile.id,

          type:
            TransportType.CAR,

          make:
            "Maruti",

          model:
            "Dzire",

          registration:
            "BR01AB1234",

          capacity:
            4,

          status:
            VehicleStatus.ACTIVE,
        },
      });
  }

  console.log(
    `🚗 Driver: ${driverUser.name}`
  );

  // =========================================================
  // GUIDE PROFILE
  // =========================================================

  let guideProfile =
    await prisma.guideProfile.findUnique({
      where: {
        userId:
          guideUser.id,
      },
    });

  if (!guideProfile) {
    guideProfile =
      await prisma.guideProfile.create({
        data: {
          userId:
            guideUser.id,

          city:
            "Patna",

          bio:
            "Local Patna guide helping travelers discover hidden gems, culture, food and heritage.",

          languages: [
            "Hindi",
            "English",
          ],

          specialties: [
            "Heritage",
            "Food",
            "Culture",
            "Local Experiences",
          ],

          experienceYears:
            5,

          hourlyRate:
            500,

          halfDayRate:
            1800,

          fullDayRate:
            3000,

          rating:
            4.9,

          reviewCount:
            72,

          isVerified:
            true,

          isActive:
            true,
        },
      });
  }

  console.log(
    `🧑‍🏫 Guide: ${guideUser.name}`
  );

  // =========================================================
  // LOCAL PLAN
  // =========================================================

  let localPlan =
    await prisma.localPlan.findUnique({
      where: {
        slug:
          "patna-heritage-day",
      },
    });

  if (!localPlan) {
    localPlan =
      await prisma.localPlan.create({
        data: {
          title:
            "Patna Heritage Day",

          slug:
            "patna-heritage-day",

          description:
            "A curated local journey through Patna's heritage, culture, food and riverside places.",

          city:
            "Patna",

          area:
            "Patna",

          status:
            PlanStatus.PUBLISHED,

          price:
            499,

          durationHours:
            8,

          coverImage:
            "/images/plans/patna-heritage.jpg",

          isFeatured:
            true,
        },
      });
  }

  // -------------------------------------------------------
  // LOCAL PLAN PLACES
  // -------------------------------------------------------

  const planPlaces = [
    "gandhi-ghat",
    "patna-museum",
    "takht-sri-patna-sahib",
    "patna-local-food-walk",
  ];

  for (
    let i = 0;
    i < planPlaces.length;
    i++
  ) {
    const explore =
      explores.find(
        (item) =>
          item.slug ===
          planPlaces[i]
      );

    if (!explore) continue;

    await prisma.localPlanPlace.upsert({
      where: {
        planId_exploreId: {
          planId:
            localPlan.id,

          exploreId:
            explore.id,
        },
      },

      update: {
        sequence:
          i + 1,
      },

      create: {
        planId:
          localPlan.id,

        exploreId:
          explore.id,

        sequence:
          i + 1,

        recommendedMinutes:
          90,
      },
    });
  }

  console.log(
    `🗺️ Local Plan: ${localPlan.title}`
  );

  // =========================================================
  // EXPERIENCE BOOKING
  // =========================================================

  if (foodExplore) {
    const experience =
      await prisma.experience.findUnique({
        where: {
          exploreId:
            foodExplore.id,
        },
      });

    if (experience) {
      const existing =
        await prisma.experienceBooking.findFirst({
          where: {
            userId:
              guest.id,

            experienceId:
              experience.id,
          },
        });

      if (!existing) {
        await prisma.experienceBooking.create({
          data: {
            userId:
              guest.id,

            experienceId:
              experience.id,

            bookingDate:
              new Date(
                "2026-10-20T17:00:00"
              ),

            guests:
              2,

            amount:
              1598,

            status:
              BookingStatus.CONFIRMED,
          },
        });
      }
    }
  }

  console.log(
    "🎟️ Experience booking created"
  );

  // =========================================================
  // GUIDE BOOKING
  // =========================================================

  const existingGuideBooking =
    await prisma.guideBooking.findFirst({
      where: {
        guestId:
          guest.id,

        guideId:
          guideProfile.id,
      },
    });

  if (!existingGuideBooking) {
    await prisma.guideBooking.create({
      data: {
        guestId:
          guest.id,

        guideId:
          guideProfile.id,

        startTime:
          new Date(
            "2026-10-21T10:00:00"
          ),

        endTime:
          new Date(
            "2026-10-21T14:00:00"
          ),

        guests:
          2,

        amount:
          2000,

        status:
          GuideBookingStatus.CONFIRMED,
      },
    });
  }

  console.log(
    "🧑‍🏫 Guide booking created"
  );

  // =========================================================
  // DRIVER RIDE
  // =========================================================

  const existingRide =
    await prisma.ride.findFirst({
      where: {
        userId:
          guest.id,

        driverId:
          driverProfile.id,
      },
    });

  if (!existingRide) {
    await prisma.ride.create({
      data: {
        userId:
          guest.id,

        driverId:
          driverProfile.id,

        vehicleId:
          vehicle.id,

        transportType:
          TransportType.CAR,

        status:
          "REQUESTED",

        pickupAddress:
          "Patna Junction",

        destination:
          "Gandhi Ghat",

        estimatedFare:
          450,

        // These work after adding
        // the new Ride fields
        bookingDate:
          new Date(
            "2026-10-22"
          ),

        bookingTime:
          new Date(
            "2026-10-22T10:00:00"
          ),

        passengers:
          2,

        notes:
          "Demo Vistara ride",
      },
    });
  }

  console.log(
    "🚕 Driver ride created"
  );

  // =========================================================
  // LOCAL PLAN PURCHASE
  // =========================================================

  const existingPlanPurchase =
    await prisma.localPlanPurchase.findUnique({
      where: {
        userId_planId: {
          userId:
            guest.id,

          planId:
            localPlan.id,
        },
      },
    });

  if (!existingPlanPurchase) {
    await prisma.localPlanPurchase.create({
      data: {
        userId:
          guest.id,

        planId:
          localPlan.id,

        amount:
          Number(
            localPlan.price
          ),

        status:
          PlanPurchaseStatus.UNLOCKED,

        purchasedAt:
          new Date(),

        unlockedAt:
          new Date(),
      },
    });
  }

  console.log(
    "🔓 Local Plan unlocked"
  );

  // =========================================================
  // JOURNEY
  // =========================================================

  let journey =
    await prisma.journey.findFirst({
      where: {
        userId:
          guest.id,

        localPlanId:
          localPlan.id,
      },
    });

  if (!journey) {
    journey =
      await prisma.journey.create({
        data: {
          userId:
            guest.id,

          localPlanId:
            localPlan.id,

          title:
            "Patna Heritage Journey",

          status:
            JourneyStatus.PLANNED,

          transportMode:
            JourneyTransportMode.SELF,

          startLocation:
            "Patna Junction",

          endLocation:
            "Gandhi Ghat",
        },
      });
  }

  // =========================================================
  // JOURNEY STOPS
  // =========================================================

  for (
    let i = 0;
    i < planPlaces.length;
    i++
  ) {
    const explore =
      explores.find(
        (item) =>
          item.slug ===
          planPlaces[i]
      );

    if (!explore) continue;

    const existingStop =
      await prisma.journeyStop.findFirst({
        where: {
          journeyId:
            journey.id,

          exploreId:
            explore.id,
        },
      });

    if (!existingStop) {
      await prisma.journeyStop.create({
        data: {
          journeyId:
            journey.id,

          exploreId:
            explore.id,

          sequence:
            i + 1,

          name:
            explore.title,

          address:
            explore.address,

          durationMinutes:
            60,

          status:
            "PENDING",
        },
      });
    }
  }

  console.log(
    "🧭 Journey created"
  );

  // =========================================================
  // STAY BOOKING
  // =========================================================

  const firstProperty =
    properties[0];

  if (firstProperty) {
    const existingStayBooking =
      await prisma.booking.findFirst({
        where: {
          guestId:
            guest.id,

          propertyId:
            firstProperty.id,
        },
      });

    if (!existingStayBooking) {
      await prisma.booking.create({
        data: {
          guestId:
            guest.id,

          propertyId:
            firstProperty.id,

          checkIn:
            new Date(
              "2026-10-18T14:00:00"
            ),

          checkOut:
            new Date(
              "2026-10-20T11:00:00"
            ),

          guests:
            2,

          nights:
            2,

          baseAmount:
            Number(
              firstProperty.pricePerNight
            ) * 2,

          serviceFee:
            300,

          cleaningFee:
            200,

          taxAmount:
            0,

          totalAmount:
            Number(
              firstProperty.pricePerNight
            ) *
              2 +
            300 +
            200,

          status:
            BookingStatus.CONFIRMED,

          paymentStatus:
            "PENDING",
        },
      });
    }
  }

  console.log(
    "🏠 Stay booking created"
  );

  // =========================================================
  // FINAL
  // =========================================================

  console.log("\n🎉 VISTARA SEED COMPLETED!");
  console.log("--------------------------------");
  console.log("🏠 Stays");
  console.log("📍 Explore");
  console.log("🎯 Experience");
  console.log("🧑‍🏫 Guide");
  console.log("🚗 Driver");
  console.log("🗺️ Local Plan");
  console.log("🧭 Journey");
  console.log("🎟️ Demo Bookings");
  console.log("--------------------------------");
}

main()
  .catch((error) => {
    console.error(
      "\n❌ Seed failed:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });