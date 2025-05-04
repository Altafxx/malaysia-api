-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleTypeID" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripUpdate" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "tripID" TEXT NOT NULL,
    "positionID" TEXT NOT NULL,
    "vehicleID" TEXT NOT NULL,
    "batchID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "refID" TEXT NOT NULL,
    "startDate" TEXT,
    "startTime" TEXT,
    "routeID" TEXT,
    "directionID" INTEGER,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "bearing" INTEGER,
    "speed" DOUBLE PRECISION,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "vehicleTypeID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_label_key" ON "Vehicle"("label");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_vehicleTypeID_fkey" FOREIGN KEY ("vehicleTypeID") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUpdate" ADD CONSTRAINT "TripUpdate_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUpdate" ADD CONSTRAINT "TripUpdate_positionID_fkey" FOREIGN KEY ("positionID") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUpdate" ADD CONSTRAINT "TripUpdate_vehicleID_fkey" FOREIGN KEY ("vehicleID") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripUpdate" ADD CONSTRAINT "TripUpdate_batchID_fkey" FOREIGN KEY ("batchID") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeID_fkey" FOREIGN KEY ("vehicleTypeID") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
