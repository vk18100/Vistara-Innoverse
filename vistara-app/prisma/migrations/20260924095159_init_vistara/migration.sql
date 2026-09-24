-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('RAZORPAY', 'STRIPE', 'CASH', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('BOOKING', 'LOCAL_PLAN', 'TRANSPORT', 'GUIDE', 'EXPERIENCE', 'REFUND', 'OTHER');

-- CreateEnum
CREATE TYPE "StayDurationType" AS ENUM ('OVERNIGHT', 'THREE_HOURS', 'SIX_HOURS', 'NINE_HOURS');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BLOCKED', 'BOOKED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('BASE', 'SEASONAL', 'WEEKEND', 'FESTIVAL', 'SPECIAL', 'DISCOUNT');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PlanPurchaseStatus" AS ENUM ('PENDING', 'PAID', 'UNLOCKED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('DRAFT', 'PLANNED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "JourneyTransportMode" AS ENUM ('SELF', 'GUIDE', 'BIKE', 'AUTO', 'CAR', 'INTERCITY');

-- CreateEnum
CREATE TYPE "StopStatus" AS ENUM ('PENDING', 'ARRIVED', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('BIKE', 'AUTO', 'CAR', 'SUV', 'VAN', 'BUS', 'TRAIN', 'OTHER');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('REQUESTED', 'DISPATCHING', 'ACCEPTED', 'DRIVER_ARRIVING', 'ARRIVED', 'OTP_PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_DRIVER');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('OFFLINE', 'AVAILABLE', 'BUSY', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "GuideBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CouponStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SupportTicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SupportPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('IDENTITY', 'OWNERSHIP', 'PROPERTY_CERTIFICATE', 'ADDRESS_PROOF', 'TAX_DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VerificationResultStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'REVIEW_REQUIRED');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('PROPERTY', 'PLACE', 'EXPERIENCE', 'GUIDE', 'LOCAL_PLAN');

-- CreateEnum
CREATE TYPE "ReviewTargetType" AS ENUM ('PROPERTY', 'PLACE', 'RESTAURANT', 'EXPERIENCE', 'GUIDE', 'DRIVER');

-- CreateEnum
CREATE TYPE "SearchType" AS ENUM ('PROPERTY', 'PLACE', 'RESTAURANT', 'EXPERIENCE', 'GUIDE', 'TRANSPORT');

-- CreateEnum
CREATE TYPE "UserEventType" AS ENUM ('SEARCH', 'VIEW_PROPERTY', 'VIEW_PLACE', 'VIEW_GUIDE', 'VIEW_EXPERIENCE', 'SAVE_PROPERTY', 'SAVE_PLACE', 'BOOKING_STARTED', 'BOOKING_COMPLETED', 'PLAN_VIEWED', 'PLAN_PURCHASED', 'JOURNEY_CREATED', 'RIDE_REQUESTED', 'PAYMENT_COMPLETED');

-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'VERIFY', 'REJECT', 'SUSPEND', 'RESTORE', 'REFUND', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActivityType" ADD VALUE 'SEARCH';
ALTER TYPE "ActivityType" ADD VALUE 'LOCAL_PLAN_PURCHASED';
ALTER TYPE "ActivityType" ADD VALUE 'JOURNEY_CREATED';
ALTER TYPE "ActivityType" ADD VALUE 'RIDE_REQUESTED';
ALTER TYPE "ActivityType" ADD VALUE 'RIDE_COMPLETED';
ALTER TYPE "ActivityType" ADD VALUE 'PAYMENT_COMPLETED';

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'NO_SHOW';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExploreType" ADD VALUE 'CAFE';
ALTER TYPE "ExploreType" ADD VALUE 'EVENT';
ALTER TYPE "ExploreType" ADD VALUE 'CULTURE';
ALTER TYPE "ExploreType" ADD VALUE 'RELIGIOUS';
ALTER TYPE "ExploreType" ADD VALUE 'NATURE';
ALTER TYPE "ExploreType" ADD VALUE 'MARKET';
ALTER TYPE "ExploreType" ADD VALUE 'SHOPPING';
ALTER TYPE "ExploreType" ADD VALUE 'TOURIST_ESSENTIAL';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'TRANSPORT';
ALTER TYPE "NotificationType" ADD VALUE 'JOURNEY';
ALTER TYPE "NotificationType" ADD VALUE 'GUIDE';
ALTER TYPE "NotificationType" ADD VALUE 'SUPPORT';

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'PARTIALLY_REFUNDED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyType" ADD VALUE 'HOSTEL';
ALTER TYPE "PropertyType" ADD VALUE 'DORMITORY';
ALTER TYPE "PropertyType" ADD VALUE 'HOMESTAY';
ALTER TYPE "PropertyType" ADD VALUE 'COTTAGE';
ALTER TYPE "PropertyType" ADD VALUE 'FARM_STAY';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'GUIDE';
ALTER TYPE "UserRole" ADD VALUE 'DRIVER';

-- AlterTable
ALTER TABLE "AccountActivity" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Amenity" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "baseAmount" DECIMAL(10,2),
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cleaningFee" DECIMAL(10,2),
ADD COLUMN     "discountAmount" DECIMAL(10,2),
ADD COLUMN     "durationType" "StayDurationType" NOT NULL DEFAULT 'OVERNIGHT',
ADD COLUMN     "serviceFee" DECIMAL(10,2),
ADD COLUMN     "taxAmount" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "ExploreImage" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ExploreItem" ADD COLUMN     "area" TEXT,
ADD COLUMN     "openingHours" JSONB,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "priceLevel" INTEGER,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "data" JSONB;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "area" TEXT,
ADD COLUMN     "cleaningFee" DECIMAL(10,2),
ADD COLUMN     "latitude" DECIMAL(10,7),
ADD COLUMN     "longitude" DECIMAL(10,7),
ADD COLUMN     "serviceFee" DECIMAL(10,2),
ADD COLUMN     "state" TEXT,
ADD COLUMN     "taxPercentage" DECIMAL(5,2),
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PropertyImage" ADD COLUMN     "altText" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PropertyVerification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "cleanlinessRating" INTEGER,
ADD COLUMN     "communicationRating" INTEGER,
ADD COLUMN     "locationRating" INTEGER,
ADD COLUMN     "valueRating" INTEGER;

-- CreateTable
CREATE TABLE "VerificationDocument" (
    "id" SERIAL NOT NULL,
    "verificationId" INTEGER NOT NULL,
    "type" "DocumentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "rejectionReason" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "VerificationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationResult" (
    "id" SERIAL NOT NULL,
    "verificationId" INTEGER NOT NULL,
    "documentId" INTEGER,
    "status" "VerificationResultStatus" NOT NULL DEFAULT 'PENDING',
    "score" DOUBLE PRECISION,
    "extractedData" JSONB,
    "reasons" JSONB,
    "reviewedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingGuest" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "BookingGuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAvailability" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "price" DECIMAL(10,2),
    "minNights" INTEGER NOT NULL DEFAULT 1,
    "maxGuests" INTEGER,

    CONSTRAINT "PropertyAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyDurationOption" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "duration" "StayDurationType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PropertyDurationOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyPricingRule" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "type" "PricingType" NOT NULL,
    "name" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "percentage" DECIMAL(5,2),
    "fixedAmount" DECIMAL(10,2),
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PropertyPricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewIntelligence" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "sentiment" TEXT,
    "sentimentScore" DOUBLE PRECISION,
    "summary" TEXT,
    "aspects" JSONB,
    "pros" JSONB,
    "cons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewIntelligence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceBooking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchQuery" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "type" "SearchType" NOT NULL,
    "query" TEXT,
    "city" TEXT,
    "area" TEXT,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "guests" INTEGER,
    "minPrice" DECIMAL(10,2),
    "maxPrice" DECIMAL(10,2),
    "category" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchResult" (
    "id" SERIAL NOT NULL,
    "searchId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "rank" INTEGER,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalPlan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT,
    "status" "PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "price" DECIMAL(10,2) NOT NULL,
    "durationHours" INTEGER,
    "coverImage" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalPlanPlace" (
    "id" SERIAL NOT NULL,
    "planId" INTEGER NOT NULL,
    "exploreId" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "recommendedMinutes" INTEGER,
    "notes" TEXT,

    CONSTRAINT "LocalPlanPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalPlanPurchase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PlanPurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "purchasedAt" TIMESTAMP(3),
    "unlockedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "paymentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocalPlanPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "localPlanId" INTEGER,
    "title" TEXT,
    "status" "JourneyStatus" NOT NULL DEFAULT 'DRAFT',
    "transportMode" "JourneyTransportMode" NOT NULL DEFAULT 'SELF',
    "startLocation" TEXT,
    "startLatitude" DECIMAL(10,7),
    "startLongitude" DECIMAL(10,7),
    "endLocation" TEXT,
    "endLatitude" DECIMAL(10,7),
    "endLongitude" DECIMAL(10,7),
    "estimatedDistance" DECIMAL(10,2),
    "estimatedMinutes" INTEGER,
    "estimatedCost" DECIMAL(10,2),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyStop" (
    "id" SERIAL NOT NULL,
    "journeyId" INTEGER NOT NULL,
    "exploreId" INTEGER,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "plannedArrival" TIMESTAMP(3),
    "plannedDeparture" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "status" "StopStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,

    CONSTRAINT "JourneyStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "journeyId" INTEGER NOT NULL,
    "provider" TEXT,
    "profile" TEXT,
    "distanceMeters" INTEGER,
    "durationSeconds" INTEGER,
    "geometry" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutePoint" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "exploreId" INTEGER,
    "sequence" INTEGER NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerId" INTEGER,
    "licenseNumber" TEXT,
    "status" "DriverStatus" NOT NULL DEFAULT 'OFFLINE',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTrips" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "currentLatitude" DECIMAL(10,7),
    "currentLongitude" DECIMAL(10,7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "providerId" INTEGER,
    "driverId" INTEGER,
    "type" "TransportType" NOT NULL,
    "make" TEXT,
    "model" TEXT,
    "registration" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverAvailability" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DriverAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportFareRule" (
    "id" SERIAL NOT NULL,
    "providerId" INTEGER,
    "transportType" "TransportType" NOT NULL,
    "city" TEXT NOT NULL,
    "baseFare" DECIMAL(10,2) NOT NULL,
    "perKm" DECIMAL(10,2) NOT NULL,
    "perMinute" DECIMAL(10,2),
    "minimumFare" DECIMAL(10,2),
    "nightSurcharge" DECIMAL(5,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TransportFareRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER,
    "vehicleId" INTEGER,
    "journeyId" INTEGER,
    "transportType" "TransportType" NOT NULL,
    "status" "RideStatus" NOT NULL DEFAULT 'REQUESTED',
    "pickupAddress" TEXT NOT NULL,
    "pickupLatitude" DECIMAL(10,7),
    "pickupLongitude" DECIMAL(10,7),
    "destination" TEXT NOT NULL,
    "destinationLatitude" DECIMAL(10,7),
    "destinationLongitude" DECIMAL(10,7),
    "estimatedFare" DECIMAL(10,2),
    "finalFare" DECIMAL(10,2),
    "distanceKm" DECIMAL(10,2),
    "otp" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancellationReason" TEXT,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideStop" (
    "id" SERIAL NOT NULL,
    "rideId" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "arrivedAt" TIMESTAMP(3),
    "departedAt" TIMESTAMP(3),

    CONSTRAINT "RideStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "bio" TEXT,
    "languages" JSONB,
    "specialties" JSONB,
    "experienceYears" INTEGER,
    "hourlyRate" DECIMAL(10,2),
    "halfDayRate" DECIMAL(10,2),
    "fullDayRate" DECIMAL(10,2),
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideAvailability" (
    "id" SERIAL NOT NULL,
    "guideId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GuideAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideBooking" (
    "id" SERIAL NOT NULL,
    "guestId" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,
    "journeyId" INTEGER,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "GuideBookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "rideId" INTEGER,
    "guideBookingId" INTEGER,
    "provider" "PaymentProvider" NOT NULL,
    "type" "PaymentType" NOT NULL,
    "providerOrderId" TEXT,
    "providerPaymentId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT,
    "providerId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "invoiceNumber" TEXT NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cancellation" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "reason" TEXT,
    "refundAmount" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cancellation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "percentage" DECIMAL(5,2),
    "fixedAmount" DECIMAL(10,2),
    "minOrderAmount" DECIMAL(10,2),
    "maxDiscount" DECIMAL(10,2),
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "CouponStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponUsage" (
    "id" SERIAL NOT NULL,
    "couponId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouponUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyNearbyPlace" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "exploreId" INTEGER NOT NULL,
    "distanceKm" DECIMAL(8,2),

    CONSTRAINT "PropertyNearbyPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "RecommendationType" NOT NULL,
    "propertyId" INTEGER,
    "exploreId" INTEGER,
    "guideId" INTEGER,
    "planId" INTEGER,
    "score" DOUBLE PRECISION,
    "reason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEvent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "type" "UserEventType" NOT NULL,
    "propertyId" INTEGER,
    "exploreId" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "SupportTicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "SupportPriority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicketMessage" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportTicketMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "action" "AdminAction" NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" INTEGER,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerificationDocument_verificationId_idx" ON "VerificationDocument"("verificationId");

-- CreateIndex
CREATE INDEX "VerificationDocument_type_idx" ON "VerificationDocument"("type");

-- CreateIndex
CREATE INDEX "VerificationResult_verificationId_idx" ON "VerificationResult"("verificationId");

-- CreateIndex
CREATE INDEX "VerificationResult_status_idx" ON "VerificationResult"("status");

-- CreateIndex
CREATE INDEX "BookingGuest_bookingId_idx" ON "BookingGuest"("bookingId");

-- CreateIndex
CREATE INDEX "PropertyAvailability_date_idx" ON "PropertyAvailability"("date");

-- CreateIndex
CREATE INDEX "PropertyAvailability_status_idx" ON "PropertyAvailability"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAvailability_propertyId_date_key" ON "PropertyAvailability"("propertyId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyDurationOption_propertyId_duration_key" ON "PropertyDurationOption"("propertyId", "duration");

-- CreateIndex
CREATE INDEX "PropertyPricingRule_propertyId_idx" ON "PropertyPricingRule"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyPricingRule_startDate_endDate_idx" ON "PropertyPricingRule"("startDate", "endDate");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewIntelligence_reviewId_key" ON "ReviewIntelligence"("reviewId");

-- CreateIndex
CREATE INDEX "ExperienceBooking_userId_idx" ON "ExperienceBooking"("userId");

-- CreateIndex
CREATE INDEX "ExperienceBooking_experienceId_idx" ON "ExperienceBooking"("experienceId");

-- CreateIndex
CREATE INDEX "SearchQuery_userId_idx" ON "SearchQuery"("userId");

-- CreateIndex
CREATE INDEX "SearchQuery_city_idx" ON "SearchQuery"("city");

-- CreateIndex
CREATE INDEX "SearchQuery_createdAt_idx" ON "SearchQuery"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SearchResult_searchId_propertyId_key" ON "SearchResult"("searchId", "propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalPlan_slug_key" ON "LocalPlan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LocalPlanPlace_planId_exploreId_key" ON "LocalPlanPlace"("planId", "exploreId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalPlanPlace_planId_sequence_key" ON "LocalPlanPlace"("planId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "LocalPlanPurchase_paymentId_key" ON "LocalPlanPurchase"("paymentId");

-- CreateIndex
CREATE INDEX "LocalPlanPurchase_userId_idx" ON "LocalPlanPurchase"("userId");

-- CreateIndex
CREATE INDEX "LocalPlanPurchase_planId_idx" ON "LocalPlanPurchase"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalPlanPurchase_userId_planId_key" ON "LocalPlanPurchase"("userId", "planId");

-- CreateIndex
CREATE INDEX "Journey_userId_idx" ON "Journey"("userId");

-- CreateIndex
CREATE INDEX "Journey_status_idx" ON "Journey"("status");

-- CreateIndex
CREATE INDEX "JourneyStop_exploreId_idx" ON "JourneyStop"("exploreId");

-- CreateIndex
CREATE UNIQUE INDEX "JourneyStop_journeyId_sequence_key" ON "JourneyStop"("journeyId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Route_journeyId_key" ON "Route"("journeyId");

-- CreateIndex
CREATE UNIQUE INDEX "RoutePoint_routeId_sequence_key" ON "RoutePoint"("routeId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_userId_key" ON "DriverProfile"("userId");

-- CreateIndex
CREATE INDEX "DriverProfile_status_idx" ON "DriverProfile"("status");

-- CreateIndex
CREATE INDEX "DriverProfile_providerId_idx" ON "DriverProfile"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_key" ON "Vehicle"("registration");

-- CreateIndex
CREATE INDEX "Vehicle_type_idx" ON "Vehicle"("type");

-- CreateIndex
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");

-- CreateIndex
CREATE INDEX "DriverAvailability_driverId_startTime_endTime_idx" ON "DriverAvailability"("driverId", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "TransportFareRule_city_transportType_idx" ON "TransportFareRule"("city", "transportType");

-- CreateIndex
CREATE INDEX "Ride_userId_idx" ON "Ride"("userId");

-- CreateIndex
CREATE INDEX "Ride_driverId_idx" ON "Ride"("driverId");

-- CreateIndex
CREATE INDEX "Ride_status_idx" ON "Ride"("status");

-- CreateIndex
CREATE INDEX "Ride_journeyId_idx" ON "Ride"("journeyId");

-- CreateIndex
CREATE UNIQUE INDEX "RideStop_rideId_sequence_key" ON "RideStop"("rideId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "GuideProfile_userId_key" ON "GuideProfile"("userId");

-- CreateIndex
CREATE INDEX "GuideProfile_city_idx" ON "GuideProfile"("city");

-- CreateIndex
CREATE INDEX "GuideProfile_isVerified_idx" ON "GuideProfile"("isVerified");

-- CreateIndex
CREATE INDEX "GuideAvailability_guideId_startTime_endTime_idx" ON "GuideAvailability"("guideId", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "GuideBooking_journeyId_key" ON "GuideBooking"("journeyId");

-- CreateIndex
CREATE INDEX "GuideBooking_guestId_idx" ON "GuideBooking"("guestId");

-- CreateIndex
CREATE INDEX "GuideBooking_guideId_idx" ON "GuideBooking"("guideId");

-- CreateIndex
CREATE INDEX "GuideBooking_status_idx" ON "GuideBooking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_bookingId_key" ON "PaymentTransaction"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_rideId_key" ON "PaymentTransaction"("rideId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_guideBookingId_key" ON "PaymentTransaction"("guideBookingId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_userId_idx" ON "PaymentTransaction"("userId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_status_idx" ON "PaymentTransaction"("status");

-- CreateIndex
CREATE INDEX "PaymentTransaction_providerOrderId_idx" ON "PaymentTransaction"("providerOrderId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_providerPaymentId_idx" ON "PaymentTransaction"("providerPaymentId");

-- CreateIndex
CREATE INDEX "Refund_paymentId_idx" ON "Refund"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_paymentId_key" ON "Invoice"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_bookingId_key" ON "Invoice"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Cancellation_bookingId_key" ON "Cancellation"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CouponUsage_bookingId_key" ON "CouponUsage"("bookingId");

-- CreateIndex
CREATE INDEX "CouponUsage_userId_idx" ON "CouponUsage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CouponUsage_couponId_userId_bookingId_key" ON "CouponUsage"("couponId", "userId", "bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyNearbyPlace_propertyId_exploreId_key" ON "PropertyNearbyPlace"("propertyId", "exploreId");

-- CreateIndex
CREATE INDEX "Recommendation_userId_type_idx" ON "Recommendation"("userId", "type");

-- CreateIndex
CREATE INDEX "Recommendation_score_idx" ON "Recommendation"("score");

-- CreateIndex
CREATE INDEX "UserEvent_userId_createdAt_idx" ON "UserEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "UserEvent_type_createdAt_idx" ON "UserEvent"("type", "createdAt");

-- CreateIndex
CREATE INDEX "UserEvent_propertyId_idx" ON "UserEvent"("propertyId");

-- CreateIndex
CREATE INDEX "UserEvent_exploreId_idx" ON "UserEvent"("exploreId");

-- CreateIndex
CREATE INDEX "SupportTicket_userId_idx" ON "SupportTicket"("userId");

-- CreateIndex
CREATE INDEX "SupportTicket_status_idx" ON "SupportTicket"("status");

-- CreateIndex
CREATE INDEX "SupportTicket_priority_idx" ON "SupportTicket"("priority");

-- CreateIndex
CREATE INDEX "SupportTicketMessage_ticketId_createdAt_idx" ON "SupportTicketMessage"("ticketId", "createdAt");

-- CreateIndex
CREATE INDEX "AdminAuditLog_adminId_idx" ON "AdminAuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AdminAuditLog_entity_entityId_idx" ON "AdminAuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AdminAuditLog_createdAt_idx" ON "AdminAuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AccountActivity_userId_createdAt_idx" ON "AccountActivity"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_guestId_idx" ON "Booking"("guestId");

-- CreateIndex
CREATE INDEX "Booking_propertyId_idx" ON "Booking"("propertyId");

-- CreateIndex
CREATE INDEX "Booking_checkIn_checkOut_idx" ON "Booking"("checkIn", "checkOut");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "ExploreImage_exploreId_idx" ON "ExploreImage"("exploreId");

-- CreateIndex
CREATE INDEX "ExploreItem_city_idx" ON "ExploreItem"("city");

-- CreateIndex
CREATE INDEX "ExploreItem_area_idx" ON "ExploreItem"("area");

-- CreateIndex
CREATE INDEX "ExploreItem_type_idx" ON "ExploreItem"("type");

-- CreateIndex
CREATE INDEX "ExploreItem_status_idx" ON "ExploreItem"("status");

-- CreateIndex
CREATE INDEX "ExploreItem_isFeatured_idx" ON "ExploreItem"("isFeatured");

-- CreateIndex
CREATE INDEX "ExploreItem_isHiddenGem_idx" ON "ExploreItem"("isHiddenGem");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE INDEX "Property_hostId_idx" ON "Property"("hostId");

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");

-- CreateIndex
CREATE INDEX "Property_area_idx" ON "Property"("area");

-- CreateIndex
CREATE INDEX "Property_type_idx" ON "Property"("type");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_verificationStatus_idx" ON "Property"("verificationStatus");

-- CreateIndex
CREATE INDEX "PropertyImage_propertyId_idx" ON "PropertyImage"("propertyId");

-- CreateIndex
CREATE INDEX "PropertyVerification_userId_idx" ON "PropertyVerification"("userId");

-- CreateIndex
CREATE INDEX "PropertyVerification_identityStatus_idx" ON "PropertyVerification"("identityStatus");

-- CreateIndex
CREATE INDEX "PropertyVerification_ownershipStatus_idx" ON "PropertyVerification"("ownershipStatus");

-- CreateIndex
CREATE INDEX "PropertyVerification_certificateStatus_idx" ON "PropertyVerification"("certificateStatus");

-- CreateIndex
CREATE INDEX "Review_propertyId_idx" ON "Review"("propertyId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "VerificationDocument" ADD CONSTRAINT "VerificationDocument_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "PropertyVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationResult" ADD CONSTRAINT "VerificationResult_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "PropertyVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingGuest" ADD CONSTRAINT "BookingGuest_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAvailability" ADD CONSTRAINT "PropertyAvailability_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyDurationOption" ADD CONSTRAINT "PropertyDurationOption_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyPricingRule" ADD CONSTRAINT "PropertyPricingRule_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewIntelligence" ADD CONSTRAINT "ReviewIntelligence_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceBooking" ADD CONSTRAINT "ExperienceBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceBooking" ADD CONSTRAINT "ExperienceBooking_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchQuery" ADD CONSTRAINT "SearchQuery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchResult" ADD CONSTRAINT "SearchResult_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "SearchQuery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchResult" ADD CONSTRAINT "SearchResult_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalPlanPlace" ADD CONSTRAINT "LocalPlanPlace_planId_fkey" FOREIGN KEY ("planId") REFERENCES "LocalPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalPlanPlace" ADD CONSTRAINT "LocalPlanPlace_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalPlanPurchase" ADD CONSTRAINT "LocalPlanPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalPlanPurchase" ADD CONSTRAINT "LocalPlanPurchase_planId_fkey" FOREIGN KEY ("planId") REFERENCES "LocalPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalPlanPurchase" ADD CONSTRAINT "LocalPlanPurchase_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_localPlanId_fkey" FOREIGN KEY ("localPlanId") REFERENCES "LocalPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyStop" ADD CONSTRAINT "JourneyStop_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyStop" ADD CONSTRAINT "JourneyStop_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "TransportProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "TransportProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverAvailability" ADD CONSTRAINT "DriverAvailability_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportFareRule" ADD CONSTRAINT "TransportFareRule_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "TransportProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideStop" ADD CONSTRAINT "RideStop_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideProfile" ADD CONSTRAINT "GuideProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideAvailability" ADD CONSTRAINT "GuideAvailability_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "GuideProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideBooking" ADD CONSTRAINT "GuideBooking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideBooking" ADD CONSTRAINT "GuideBooking_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "GuideProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideBooking" ADD CONSTRAINT "GuideBooking_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_guideBookingId_fkey" FOREIGN KEY ("guideBookingId") REFERENCES "GuideBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancellation" ADD CONSTRAINT "Cancellation_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsage" ADD CONSTRAINT "CouponUsage_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsage" ADD CONSTRAINT "CouponUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsage" ADD CONSTRAINT "CouponUsage_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyNearbyPlace" ADD CONSTRAINT "PropertyNearbyPlace_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyNearbyPlace" ADD CONSTRAINT "PropertyNearbyPlace_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "GuideProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_planId_fkey" FOREIGN KEY ("planId") REFERENCES "LocalPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_exploreId_fkey" FOREIGN KEY ("exploreId") REFERENCES "ExploreItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicketMessage" ADD CONSTRAINT "SupportTicketMessage_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "SupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
