-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "bookingDate" TIMESTAMP(3),
ADD COLUMN     "bookingTime" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "passengers" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Ride_bookingDate_idx" ON "Ride"("bookingDate");
