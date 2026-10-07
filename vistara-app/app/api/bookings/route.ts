import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";

import { requireAuth } from "@/lib/guard";



// =========================================================

// HELPERS

// =========================================================



function parseDate(value: unknown) {

  if (!value) return null;



  const date = new Date(String(value));



  if (Number.isNaN(date.getTime())) {

    return null;

  }



  return date;

}



function numberValue(value: unknown) {

  const number = Number(value);



  return Number.isFinite(number)

    ? number

    : 0;

}



function getBookingType(body: any) {

  return String(

    body?.bookingType ||

      body?.type ||

      "STAY"

  ).toUpperCase();

}



// =========================================================

// GET

// GET /api/bookings

// =========================================================



export async function GET(

  req: NextRequest

) {

  try {

    // -------------------------------------------------------

    // AUTH

    // -------------------------------------------------------



    const { user, response } =

      await requireAuth(req);



    if (response) {

      return response;

    }



    if (!user?.id) {

      return NextResponse.json(

        {

          success: false,

          message: "Unauthorized",

        },

        { status: 401 }

      );

    }



    // -------------------------------------------------------

    // FETCH EVERYTHING BELONGING TO USER

    // -------------------------------------------------------



    const [

      stayBookings,

      experienceBookings,

      guideBookings,

      rides,

      localPlanPurchases,

    ] = await Promise.all([

      // =====================================================

      // STAY

      // =====================================================



      prisma.booking.findMany({

        where: {

          guestId: user.id,

        },



        include: {

          property: {

            include: {

              images: {

                orderBy: {

                  isPrimary: "desc",

                },

              },

            },

          },

        },



        orderBy: {

          createdAt: "desc",

        },

      }),



      // =====================================================

      // EXPERIENCE

      // =====================================================



      prisma.experienceBooking.findMany({

        where: {

          userId: user.id,

        },



        include: {

          experience: {

            include: {

              explore: {

                include: {

                  images: {

                    orderBy: {

                      isPrimary: "desc",

                    },

                  },

                },

              },

            },

          },

        },



        orderBy: {

          createdAt: "desc",

        },

      }),



      // =====================================================

      // GUIDE

      // =====================================================



      prisma.guideBooking.findMany({

        where: {

          guestId: user.id,

        },



        include: {

          guide: {

            include: {

              user: {

                select: {

                  id: true,

                  name: true,

                  email: true,

                },

              },

            },

          },

        },



        orderBy: {

          createdAt: "desc",

        },

      }),



      // =====================================================

      // DRIVER / RIDE

      // =====================================================



      prisma.ride.findMany({

        where: {

          userId: user.id,

        },



        include: {

          driver: {

            include: {

              user: {

                select: {

                  id: true,

                  name: true,

                  email: true,

                },

              },

            },

          },



          vehicle: true,



          stops: {

            orderBy: {

              sequence: "asc",

            },

          },



          payment: true,

        },




        orderBy: {

          requestedAt: "desc",

        },

      }),



      // =====================================================

      // LOCAL PLAN

      // =====================================================



      prisma.localPlanPurchase.findMany({

        where: {

          userId: user.id,

        },



        include: {

          plan: true,

        },



        orderBy: {

          createdAt: "desc",

        },

      }),

    ]);



    // -------------------------------------------------------

    // NORMALIZE FOR FRONTEND

    // -------------------------------------------------------



    const normalizedStayBookings =

      stayBookings.map(

        (booking) => ({

          id: booking.id,

          bookingId: booking.id,



          bookingType: "STAY",



          title:

            booking.property.title,



          name:

            booking.property.title,



          location:

            booking.property.city,



          city:

            booking.property.city,



          image:

            booking.property.images?.[0]

              ?.url || "",



          property: {

            id: booking.property.id,

            title:

              booking.property.title,

            city:

              booking.property.city,

            address:

              booking.property.address,



            images:

              booking.property.images,

          },



          checkIn:

            booking.checkIn,



          checkOut:

            booking.checkOut,



          guests:

            booking.guests,



          nights:

            booking.nights,



          pricePerNight:

            Number(

              booking.property.pricePerNight

            ),



          baseAmount:

            Number(

              booking.baseAmount || 0

            ),



          cleaningFee:

            Number(

              booking.cleaningFee || 0

            ),



          serviceFee:

            Number(

              booking.serviceFee || 0

            ),



          taxAmount:

            Number(

              booking.taxAmount || 0

            ),



          totalAmount:

            Number(

              booking.totalAmount

            ),



          status:

            booking.status,



          paymentStatus:

            booking.paymentStatus,



          createdAt:

            booking.createdAt,



          updatedAt:

            booking.updatedAt,

        })

      );



    // -------------------------------------------------------

    // EXPERIENCE NORMALIZED

    // -------------------------------------------------------



    const normalizedExperienceBookings =

      experienceBookings.map(

        (booking) => ({

          id: booking.id,



          bookingId:

            `EXP-${booking.id}`,



          bookingType:

            "EXPERIENCE",



          title:

            booking.experience.explore

              .title,



          name:

            booking.experience.explore

              .title,



          location:

            booking.experience.explore

              .city,



          city:

            booking.experience.explore

              .city,



          image:

            booking.experience.explore

              .images?.[0]?.url ||

            booking.experience.explore

              .coverImage ||

            "",



          date:

            booking.bookingDate,



          bookingDate:

            booking.bookingDate,



          guests:

            booking.guests,



          amount:

            Number(

              booking.amount

            ),



          price:

            Number(

              booking.amount

            ),



          totalAmount:

            Number(

              booking.amount

            ),



          status:

            booking.status,



          createdAt:

            booking.createdAt,



          metadata: {

            experienceId:

              booking.experienceId,



            exploreId:

              booking.experience

                .exploreId,

          },

        })

      );



    // -------------------------------------------------------

    // GUIDE NORMALIZED

    // -------------------------------------------------------



    const normalizedGuideBookings =

      guideBookings.map(

        (booking) => ({

          id: booking.id,



          bookingId:

            `GUIDE-${booking.id}`,



          bookingType:

            "GUIDE",



          title:

            booking.guide.user?.name ||

            booking.guide.city ||

            "Local Guide",



          name:

            booking.guide.user?.name ||

            "Local Guide",



          location:

            booking.guide.city,



          city:

            booking.guide.city,
          image: "",



          date:

            booking.startTime,



          startTime:

            booking.startTime,



          endTime:

            booking.endTime,



          guests:

            booking.guests,



          amount:

            Number(

              booking.amount

            ),



          price:

            Number(

              booking.amount

            ),



          totalAmount:

            Number(

              booking.amount

            ),



          status:

            booking.status,



          createdAt:

            booking.createdAt,



          metadata: {

            guideId:

              booking.guideId,



            journeyId:

              booking.journeyId,

          },

        })

      );



    // -------------------------------------------------------

    // DRIVER NORMALIZED

    // -------------------------------------------------------



    const normalizedRides =

      rides.map(

        (ride) => ({

          id: ride.id,



          bookingId:

            `RIDE-${ride.id}`,



          bookingType:

            "DRIVER",



          title:

            ride.driver?.user?.name ||

            "Vistara Driver",



          name:

            ride.driver?.user?.name ||

            "Vistara Driver",



          location:

            ride.pickupAddress,



          pickup:

            ride.pickupAddress,



          destination:

            ride.destination,



          passengers:

            1,



          price:

            Number(

              ride.finalFare ??

                ride.estimatedFare ??

                0

            ),



          totalAmount:

            Number(

              ride.finalFare ??

                ride.estimatedFare ??

                0

            ),



          estimatedFare:

            Number(

              ride.estimatedFare ||

                0

            ),



          finalFare:

            ride.finalFare

              ? Number(

                  ride.finalFare

                )

              : null,



          status:

            ride.status,



          paymentStatus:

            ride.payment

              ? ride.payment.status

              : "NOT_REQUIRED",



          requestedAt:

            ride.requestedAt,



          createdAt:

            ride.requestedAt,



          driverId:

            ride.driverId,



          vehicleId:

            ride.vehicleId,



          vehicle:

            ride.vehicle

              ? {

                  id:

                    ride.vehicle.id,



                  type:

                    ride.vehicle.type,



                  capacity:

                    ride.vehicle.capacity,



                  make:

                    ride.vehicle.make,



                  model:

                    ride.vehicle.model,



                  registration:

                    ride.vehicle.registration,

                }

              : null,



          driver:

            ride.driver

              ? {

                  id:

                    ride.driver.id,



                  user:

                    ride.driver.user

                      ? {

                          id:

                            ride.driver

                              .user

                              .id,



                          name:

                            ride.driver

                              .user

                              .name,

                        }

                      : null,

                }

              : null,



          metadata: {

            pickup:

              ride.pickupAddress,



            destination:

              ride.destination,



            rideId:

              ride.id,



            journeyId:

              ride.journeyId,

          },

        })

      );



    // -------------------------------------------------------

    // LOCAL PLAN NORMALIZED

    // -------------------------------------------------------



    const normalizedLocalPlans =

      localPlanPurchases.map(

        (purchase) => ({

          id: purchase.id,



          bookingId:

            `PLAN-${purchase.id}`,



          bookingType:

            "LOCAL_PLAN",



          title:

            purchase.plan.title,



          name:

            purchase.plan.title,



          location:

            purchase.plan.city,



          city:

            purchase.plan.city,



          image:

            purchase.plan.coverImage ||

            "",



          price:

            Number(

              purchase.amount

            ),



          amount:

            Number(

              purchase.amount

            ),



          totalAmount:

            Number(

              purchase.amount

            ),



          status:

            purchase.status,



          createdAt:

            purchase.createdAt,



          purchasedAt:

            purchase.purchasedAt,



          unlockedAt:

            purchase.unlockedAt,



          expiresAt:

            purchase.expiresAt,



          metadata: {

            planId:

              purchase.planId,



            slug:

              purchase.plan.slug,

          },

        })

      );



    // -------------------------------------------------------

    // COMBINE

    // -------------------------------------------------------



    const bookings = [

      ...normalizedStayBookings,

      ...normalizedExperienceBookings,

      ...normalizedGuideBookings,

      ...normalizedRides,

      ...normalizedLocalPlans,

    ].sort(

      (a: any, b: any) => {

        const dateA = new Date(

          a.createdAt ||

            a.requestedAt ||

            0

        ).getTime();



        const dateB = new Date(

          b.createdAt ||

            b.requestedAt ||

            0

        ).getTime();



        return dateB - dateA;

      }

    );



    // -------------------------------------------------------

    // RESPONSE

    // -------------------------------------------------------



    return NextResponse.json({

      success: true,



      bookings,



      counts: {

        total:

          bookings.length,



        stays:

          normalizedStayBookings

            .length,



        experiences:

          normalizedExperienceBookings

            .length,



        guides:

          normalizedGuideBookings

            .length,



        rides:

          normalizedRides.length,



        localPlans:

          normalizedLocalPlans

            .length,

      },

    });

  } catch (error) {

    console.error(

      "GET_BOOKINGS_ERROR:",

      error

    );



    return NextResponse.json(

      {

        success: false,

        message:

          "Failed to fetch bookings",

      },

      { status: 500 }

    );

  }

}



// =========================================================

// POST

// =========================================================



export async function POST(

  req: NextRequest

) {

  try {

    // -------------------------------------------------------

    // AUTH

    // -------------------------------------------------------



    const { user, response } =

      await requireAuth(req);



    if (response) {

      return response;

    }



    if (!user?.id) {

      return NextResponse.json(

        {

          success: false,

          message: "Unauthorized",

        },

        { status: 401 }

      );

    }



    // -------------------------------------------------------

    // BODY

    // -------------------------------------------------------



    const body =

      await req.json();



    const bookingType =

      getBookingType(body);



    // =======================================================

    // STAY

    // =======================================================



    if (

      bookingType ===

      "STAY"

    ) {

      const {

        propertyId,

        stayTitle,

        checkIn,

        checkOut,

        guests,

      } = body;



      const checkInDate =

        parseDate(checkIn);



      const checkOutDate =

        parseDate(checkOut);



      const guestCount =

        Number(guests);



      if (

        !checkInDate ||

        !checkOutDate

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid check-in and check-out dates are required",

          },

          { status: 400 }

        );

      }



      if (

        checkOutDate <=

        checkInDate

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Check-out must be after check-in",

          },

          { status: 400 }

        );

      }



      if (

        !Number.isInteger(

          guestCount

        ) ||

        guestCount <= 0

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid guest count is required",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // FIND PROPERTY

      // -----------------------------------------------------



      let property = null;



      const numericPropertyId =

        Number(propertyId);



      if (

        propertyId &&

        Number.isInteger(

          numericPropertyId

        ) &&

        numericPropertyId > 0

      ) {

        property =

          await prisma.property.findUnique(

            {

              where: {

                id: numericPropertyId,

              },

            }

          );

      }



      // -----------------------------------------------------

      // FALLBACK BY TITLE

      // -----------------------------------------------------



      if (

        !property &&

        stayTitle

      ) {

        property =

          await prisma.property.findFirst(

            {

              where: {

                title: {

                  equals:

                    String(

                      stayTitle

                    ),

                  mode: "insensitive",

                },

              },

            }

          );

      }



      if (!property) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Stay/property not found",

          },

          { status: 404 }

        );

      }



      // -----------------------------------------------------

      // VERIFIED PROPERTY

      // -----------------------------------------------------



      if (

        property.status !==

        "VERIFIED"

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "This stay is not available for booking",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // GUEST LIMIT

      // -----------------------------------------------------



      if (

        guestCount >

        property.guests

      ) {

        return NextResponse.json(

          {

            success: false,

            message: `Maximum ${property.guests} guests allowed`,

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // NIGHTS

      // -----------------------------------------------------



      const millisecondsPerDay =

        1000 *

        60 *

        60 *

        24;



      const nights = Math.ceil(

        (checkOutDate.getTime() -

          checkInDate.getTime()) /

          millisecondsPerDay

      );



      if (nights <= 0) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Invalid stay duration",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // CONFLICT

      // -----------------------------------------------------



      const conflict =

        await prisma.booking.findFirst(

          {

            where: {

              propertyId:

                property.id,



              status: {

                in: [

                  "PENDING",

                  "CONFIRMED",

                ],

              },



              checkIn: {

                lt: checkOutDate,

              },



              checkOut: {

                gt: checkInDate,

              },

            },

          }

        );



      if (conflict) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Stay is already booked for these dates",

          },

          { status: 409 }

        );

      }



      // -----------------------------------------------------

      // PRICE

      // -----------------------------------------------------



      const baseAmount =

        Number(

          property.pricePerNight

        ) * nights;



      const serviceFee =

        Number(

          property.serviceFee ||

            0

        );



      const cleaningFee =

        Number(

          property.cleaningFee ||

            0

        );



      const taxPercentage =

        Number(

          property.taxPercentage ||

            0

        );



      const subtotal =

        baseAmount +

        serviceFee +

        cleaningFee;



      const taxAmount =

        (subtotal *

          taxPercentage) /

        100;



      const totalAmount =

        subtotal +

        taxAmount;



      // -----------------------------------------------------

      // CREATE BOOKING

      // -----------------------------------------------------



      const booking =

        await prisma.booking.create(

          {

            data: {

              guestId:

                user.id,



              propertyId:

                property.id,



              checkIn:

                checkInDate,



              checkOut:

                checkOutDate,



              guests:

                guestCount,



              nights,



              baseAmount,



              cleaningFee,



              serviceFee,



              taxAmount,



              totalAmount,



              status:

                "CONFIRMED",



              // No real Razorpay payment

              paymentStatus:

                "PENDING",

            },



            include: {

              property: {

                include: {

                  images: {

                    orderBy: {

                      isPrimary:

                        "desc",

                    },

                  },

                },

              },

            },

          }

        );



      return NextResponse.json(

        {

          success: true,



          bookingId:

            booking.id,



          booking,



          bookingType:

            "STAY",

        },

        { status: 201 }

      );

    }



    // =======================================================

    // DRIVER

    // =======================================================



    if (

      bookingType ===

      "DRIVER"

    ) {

      const {

        driverId,

        pickup,

        destination,

        price,

      } = body;



      const driverProfileId =

        Number(driverId);



      if (

        !Number.isInteger(

          driverProfileId

        ) ||

        driverProfileId <= 0

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid driver is required",

          },

          { status: 400 }

        );

      }



      if (

        !pickup ||

        !destination

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Pickup and destination are required",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // DRIVER

      // -----------------------------------------------------



      const driver =

        await prisma.driverProfile.findUnique(

          {

            where: {

              id: driverProfileId,

            },



            include: {

              vehicles: {

                where: {

                  status:

                    "ACTIVE",

                },



                orderBy: {

                  id: "asc",

                },



                take: 1,

              },

            },

          }

        );



      if (!driver) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Driver not found",

          },

          { status: 404 }

        );

      }



      // -----------------------------------------------------

      // DRIVER STATUS

      // -----------------------------------------------------



      if (

        driver.status !==

        "AVAILABLE"

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Driver is not currently available",

          },

          { status: 400 }

        );

      }



      const vehicle =

        driver.vehicles[0];



      if (!vehicle) {

        return NextResponse.json(

          {

            success: false,

            message:

              "No active vehicle assigned to this driver",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // CREATE RIDE

      // -----------------------------------------------------



      const ride =

        await prisma.ride.create(

          {

            data: {

              userId:

                user.id,



              driverId:

                driver.id,



              vehicleId:

                vehicle.id,



              transportType:

                vehicle.type,



              status:

                "REQUESTED",



              pickupAddress:

                String(

                  pickup

                ).trim(),



              destination:

                String(

                  destination

                ).trim(),



              estimatedFare:

                numberValue(

                  price

                ),

            },



            include: {

              driver: {

                include: {

                  user: {

                    select: {

                      id: true,

                      name: true,

                      email: true,

                    },

                  },

                },

              },



              vehicle: true,

            },

          }

        );



      return NextResponse.json(

        {

          success: true,



          bookingId:

            `RIDE-${ride.id}`,



          rideId:

            ride.id,



          bookingType:

            "DRIVER",



          ride,

        },

        { status: 201 }

      );

    }



    // =======================================================

    // EXPERIENCE

    // =======================================================



    if (

      bookingType ===

      "EXPERIENCE"

    ) {

      const {

        experienceId,

        date,

        bookingDate,

        guests,

        price,

      } = body;



      const id =

        Number(

          experienceId

        );



      const guestCount =

        Number(

          guests

        );



      const experienceDate =

        parseDate(

          bookingDate ||

            date

        );



      if (

        !Number.isInteger(

          id

        ) ||

        id <= 0

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid experience is required",

          },

          { status: 400 }

        );

      }



      if (

        !experienceDate

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid experience date is required",

          },

          { status: 400 }

        );

      }



      if (

        !Number.isInteger(

          guestCount

        ) ||

        guestCount <= 0

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid guest count is required",

          },

          { status: 400 }

        );

      }



      const experience =

        await prisma.experience.findUnique(

          {

            where: {

              id,

            },

          }

        );



      if (!experience) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Experience not found",

          },

          { status: 404 }

        );

      }



      if (

        experience.maxGuests &&

        guestCount >

          experience.maxGuests

      ) {

        return NextResponse.json(

          {

            success: false,

            message: `Maximum ${experience.maxGuests} guests allowed`,

          },

          { status: 400 }

        );

      }



      const amount =

        numberValue(

          price

        ) ||

        Number(

          experience.price ||

            0

        ) *

          guestCount;



      const booking =

        await prisma.experienceBooking.create(

          {

            data: {

              userId:

                user.id,



              experienceId:

                experience.id,



              bookingDate:

                experienceDate,



              guests:

                guestCount,



              amount,



              status:

                "CONFIRMED",

            },



            include: {

              experience: {

                include: {

                  explore: true,

                },

              },

            },

          }

        );



      return NextResponse.json(

        {

          success: true,



          bookingId:

            `EXP-${booking.id}`,



          bookingType:

            "EXPERIENCE",



          booking,

        },

        { status: 201 }

      );

    }



    // =======================================================

    // GUIDE

    // =======================================================



    if (

      bookingType ===

      "GUIDE"

    ) {

      const {

        guideId,

        date,

        startTime,

        endTime,

        time,

        guests,

        price,

      } = body;



      const id =

        Number(

          guideId

        );



      const guestCount =

        Number(

          guests || 1

        );



      if (

        !Number.isInteger(

          id

        ) ||

        id <= 0

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid guide is required",

          },

          { status: 400 }

        );

      }



      const guide =

        await prisma.guideProfile.findUnique(

          {

            where: {

              id,

            },

          }

        );



      if (!guide) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Guide not found",

          },

          { status: 404 }

        );

      }



      if (

        !guide.isActive

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Guide is currently unavailable",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // START TIME

      // -----------------------------------------------------



      const rawStart =

        startTime ||

        time;



      let startDate =

        parseDate(

          rawStart

        );



      // If frontend sends date + "10:00"

      if (

        !startDate &&

        date &&

        rawStart

      ) {

        startDate =

          parseDate(

            `${date}T${rawStart}`

          );

      }



      if (!startDate) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Valid guide start time is required",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // END TIME

      // -----------------------------------------------------



      let endDate =

        parseDate(

          endTime

        );



      if (

        !endDate &&

        date &&

        endTime

      ) {

        endDate =

          parseDate(

            `${date}T${endTime}`

          );

      }



      // If no end time supplied,

      // default to one hour

      // -----------------------------------------------------



      if (!endDate) {

        endDate =

          new Date(

            startDate.getTime() +

              60 *

                60 *

                1000

          );

      }



      if (

        endDate <=

        startDate

      ) {

        return NextResponse.json(

          {

            success: false,

            message:

              "Guide end time must be after start time",

          },

          { status: 400 }

        );

      }



      // -----------------------------------------------------

      // GUIDE PRICE

      // -----------------------------------------------------



      const durationHours =

        Math.max(

          1,

          Math.ceil(

            (endDate.getTime() -

              startDate.getTime()) /

              (1000 *

                60 *

                60)

          )

        );



      const hourlyRate =

        Number(

          guide.hourlyRate ||

            0

        );



      const amount =

        numberValue(

          price

        ) ||

        hourlyRate *

          durationHours;



      // -----------------------------------------------------

      // CREATE GUIDE BOOKING

      // -----------------------------------------------------



      const booking =

        await prisma.guideBooking.create(

          {

            data: {

              guestId:

                user.id,



              guideId:

                guide.id,



              startTime:

                startDate,



              endTime:

                endDate,



              guests:

                guestCount,



              amount,



              status:

                "CONFIRMED",

            },



            include: {

              guide: {

                include: {

                  user: {

                    select: {

                      id: true,

                      name: true,

                      email: true,

                    },

                  },

                },

              },

            },

          }

        );



      return NextResponse.json(

        {

          success: true,



          bookingId:

            `GUIDE-${booking.id}`,



          bookingType:

            "GUIDE",



          booking,

        },

        { status: 201 }

      );

    }



    // =======================================================

    // LOCAL PLAN

    // =======================================================



    if (

      bookingType ===

      "LOCAL_PLAN"

    ) {

      return NextResponse.json(

        {

          success: false,



          message:

            "Local Plan uses /api/local-plans/purchases. It is an unlock purchase, not a normal booking.",

        },

        { status: 400 }

      );

    }



    // =======================================================

    // EXPLORE

    // =======================================================



    if (

      bookingType ===

      "EXPLORE"

    ) {

      return NextResponse.json(

        {

          success: false,



          message:

            "Explore is a discovery page. Purchase a Local Plan to unlock the Explore journey.",

        },

        { status: 400 }

      );

    }



    // =======================================================

    // UNKNOWN

    // =======================================================



    return NextResponse.json(

      {

        success: false,

        message:

          `Unsupported booking type: ${bookingType}`,

      },

      { status: 400 }

    );

  } catch (error) {

    console.error(

      "POST_BOOKING_ERROR:",

      error

    );



    return NextResponse.json(

      {

        success: false,

        message:

          "Failed to create booking",

      },

      { status: 500 }

    );

  }

}