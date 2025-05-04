-- DropForeignKey
ALTER TABLE "TripUpdate" DROP CONSTRAINT "TripUpdate_batchID_fkey";

-- AlterTable
ALTER TABLE "TripUpdate" ALTER COLUMN "batchID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TripUpdate" ADD CONSTRAINT "TripUpdate_batchID_fkey" FOREIGN KEY ("batchID") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
