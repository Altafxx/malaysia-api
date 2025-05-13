"use server";

import { db } from "@/lib/db-client";

/**
 * Fetches all vehicle types
 */
export async function getVehicleTypes() {
  try {
    const vehicleTypes = await db.vehicleType.findMany();
    return { success: true, data: vehicleTypes };
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    return { success: false, error: "Failed to fetch vehicle types" };
  }
}

/**
 * Fetches the latest batch for a specific vehicle type
 */
export async function getLatestBatch(vehicleTypeId: string) {
  try {
    // First, find batches that have trip updates
    const batchesWithTripUpdates = await db.batch.findMany({
      where: {
        vehicleTypeID: vehicleTypeId,
        TripUpdate: {
          some: {} // This ensures the batch has at least one trip update
        }
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
      include: {
        TripUpdate: {
          include: {
            position: true,
            vehicle: true,
            trip: true,
          },
        },
      },
    });

    console.log("tu", batchesWithTripUpdates)

    if (batchesWithTripUpdates.length > 0) {
      return { success: true, data: batchesWithTripUpdates[0] };
    }

    // If no batches with trip updates, try to find any batch
    const latestBatch = await db.batch.findFirst({
      where: {
        vehicleTypeID: vehicleTypeId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        TripUpdate: {
          include: {
            position: true,
            vehicle: true,
            trip: true,
          },
        },
      },
    });

    if (!latestBatch) {
      return { success: false, error: "No batches found for this vehicle type" };
    }

    return { success: true, data: latestBatch };
  } catch (error) {
    console.error("Error fetching latest batch:", error);
    return { success: false, error: "Failed to fetch latest batch" };
  }
}

/**
 * Fetches all batches for a specific vehicle type
 */
export async function getBatchesByVehicleType(vehicleTypeId: string) {
  try {
    const batches = await db.batch.findMany({
      where: {
        vehicleTypeID: vehicleTypeId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { TripUpdate: true }
        }
      }
    });

    // Filter out batches with no trip updates
    const batchesWithData = batches.filter(batch => batch._count.TripUpdate > 0);

    return { success: true, data: batchesWithData };
  } catch (error) {
    console.error("Error fetching batches:", error);
    return { success: false, error: "Failed to fetch batches" };
  }
}

/**
 * Fetches a specific batch with all its trip updates
 */
export async function getBatchDetails(batchId: string) {
  try {
    const batch = await db.batch.findUnique({
      where: {
        id: batchId,
      },
      include: {
        vehicleType: true,
        TripUpdate: {
          include: {
            position: true,
            vehicle: true,
            trip: true,
          },
        },
      },
    });

    // If no batch found or no trip updates, return error
    if (!batch || !batch.TripUpdate || batch.TripUpdate.length === 0) {
      console.log("No trip updates found for batch:", batchId);
      return { success: false, error: "No vehicle data found for this batch" };
    }

    return { success: true, data: batch };
  } catch (error) {
    console.error("Error fetching batch details:", error);
    return { success: false, error: "Failed to fetch batch details" };
  }
}

/**
 * Fetches vehicle history (all trip updates for a specific vehicle)
 */
export async function getVehicleHistory(vehicleId: string) {
  try {
    const tripUpdates = await db.tripUpdate.findMany({
      where: {
        vehicleID: vehicleId,
      },
      include: {
        position: true,
        trip: true,
        batch: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: tripUpdates };
  } catch (error) {
    console.error("Error fetching vehicle history:", error);
    return { success: false, error: "Failed to fetch vehicle history" };
  }
}
