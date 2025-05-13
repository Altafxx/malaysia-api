import { db } from "../../src/lib/db-client";
import ktmbData from "../../src/data/sample/ktmb.json";
import rapidBusKLData from "../../src/data/sample/rapid-bus-kl.json";
import rapidBusKuantanData from "../../src/data/sample/rapid-bus-kuantan.json";
import mybasJohorData from "../../src/data/sample/mybas-johor.json";

interface TripUpdateData {
  id: string;
  vehicle: {
    trip: {
      tripId: string;
      startDate?: string;
      startTime?: string;
      routeId?: string;
      directionId?: number;
    };
    position: {
      latitude: number;
      longitude: number;
      bearing?: number;
      speed?: number;
    };
    timestamp: string;
    vehicle: {
      id: string;
      label?: string;
      licensePlate?: string;
    };
  };
}

async function createVehicleType(name: string) {
  return await db.vehicleType.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function createVehicle(label: string, vehicleTypeId: string) {
  return await db.vehicle.upsert({
    where: { label },
    update: { vehicleTypeID: vehicleTypeId },
    create: {
      label,
      vehicleTypeID: vehicleTypeId,
    },
  });
}

async function createTrip(tripId: string, startDate?: string, startTime?: string, routeId?: string, directionId?: number) {
  // Check if trip already exists
  const existingTrip = await db.trip.findFirst({
    where: {
      refID: tripId,
    },
  });

  if (existingTrip) {
    return existingTrip;
  }

  // Create new trip if it doesn't exist
  return await db.trip.create({
    data: {
      refID: tripId,
      startDate,
      startTime,
      routeID: routeId,
      directionID: directionId,
    },
  });
}

async function createPosition(latitude: number, longitude: number, bearing?: number, speed?: number) {
  // Check if a very similar position already exists (within a small margin)
  const margin = 0.0001; // Small margin for floating point comparison
  const existingPosition = await db.position.findFirst({
    where: {
      AND: [
        { latitude: { gte: latitude - margin, lte: latitude + margin } },
        { longitude: { gte: longitude - margin, lte: longitude + margin } },
      ],
    },
  });

  if (existingPosition) {
    return existingPosition;
  }

  // Create new position if it doesn't exist
  return await db.position.create({
    data: {
      latitude,
      longitude,
      bearing,
      speed,
    },
  });
}

async function createBatch(vehicleTypeId: string) {
  return await db.batch.create({
    data: {
      vehicleTypeID: vehicleTypeId,
    },
  });
}

async function createTripUpdate(
  timestamp: string,
  tripId: string,
  positionId: string,
  vehicleId: string,
  batchId: string
) {
  // Check if a similar trip update already exists
  const existingTripUpdate = await db.tripUpdate.findFirst({
    where: {
      AND: [
        { timestamp },
        { tripID: tripId },
        { vehicleID: vehicleId },
      ],
    },
  });

  if (existingTripUpdate) {
    return existingTripUpdate;
  }

  // Create new trip update if it doesn't exist
  return await db.tripUpdate.create({
    data: {
      timestamp,
      tripID: tripId,
      positionID: positionId,
      vehicleID: vehicleId,
      batchID: batchId,
    },
  });
}

async function seedSampleData(
  vehicleTypeName: string,
  data: { tripUpdates: TripUpdateData[] }
) {
  try {
    // Create or get vehicle type
    const vehicleType = await createVehicleType(vehicleTypeName);

    // Check if we already have batches for this vehicle type
    const existingBatches = await db.batch.findMany({
      where: { vehicleTypeID: vehicleType.id },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    // If we already have batches, check if we have enough data
    if (existingBatches.length > 0) {
      const existingBatch = existingBatches[0];

      // Count trip updates in the latest batch
      const tripUpdateCount = await db.tripUpdate.count({
        where: { batchID: existingBatch.id },
      });

      // If we have a reasonable amount of data, use the existing batch and skip seeding
      if (tripUpdateCount > 10) {
        console.log(`Using existing batch for ${vehicleTypeName} with ${tripUpdateCount} trip updates`);
        return { success: true, batchId: existingBatch.id, skipped: true };
      }
    }

    console.log(`Creating new batch for ${vehicleTypeName}`);
    // Create a new batch
    const batch = await createBatch(vehicleType.id);

    // Process each trip update (limit to 20 to avoid creating too much data)
    const limitedUpdates = data.tripUpdates.slice(0, 20);
    console.log(`Processing ${limitedUpdates.length} trip updates for ${vehicleTypeName}`);

    for (const update of limitedUpdates) {
      const vehicleData = update.vehicle;

      // Get or create vehicle
      const vehicleLabel = vehicleData.vehicle.label || vehicleData.vehicle.licensePlate || vehicleData.vehicle.id;
      const vehicle = await createVehicle(vehicleLabel, vehicleType.id);

      // Create trip
      const trip = await createTrip(
        vehicleData.trip.tripId,
        vehicleData.trip.startDate,
        vehicleData.trip.startTime,
        vehicleData.trip.routeId,
        vehicleData.trip.directionId
      );

      // Create position
      const position = await createPosition(
        vehicleData.position.latitude,
        vehicleData.position.longitude,
        vehicleData.position.bearing,
        vehicleData.position.speed
      );

      // Create trip update
      await createTripUpdate(
        vehicleData.timestamp,
        trip.id,
        position.id,
        vehicle.id,
        batch.id
      );
    }

    return { success: true, batchId: batch.id, skipped: false };
  } catch (error) {
    console.error(`Error seeding ${vehicleTypeName} data:`, error);
    return { success: false, error };
  }
}

export default async function seedAllSampleData() {
  try {
    // Seed KTMB data
    const ktmbResult = await seedSampleData("KTMB", ktmbData);

    // Seed Rapid Bus KL data
    const rapidBusKLResult = await seedSampleData("Rapid Bus KL", rapidBusKLData);

    // Seed Rapid Bus Kuantan data
    const rapidBusKuantanResult = await seedSampleData("Rapid Bus Kuantan", rapidBusKuantanData);

    // Seed MyBas Johor data
    const mybasJohorResult = await seedSampleData("MyBas Johor", mybasJohorData);

    return {
      ktmb: ktmbResult,
      rapidBusKL: rapidBusKLResult,
      rapidBusKuantan: rapidBusKuantanResult,
      mybasJohor: mybasJohorResult,
    };
  } catch (error) {
    console.error("Error seeding sample data:", error);
    return { success: false, error };
  }
}
