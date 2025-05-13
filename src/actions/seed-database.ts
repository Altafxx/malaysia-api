"use server";

import { db } from "@/lib/db-client";
import { VehicleType } from "@prisma/client";

// Sample data for vehicle types
const vehicleTypes = [
  { name: "KTMB" },
  { name: "Rapid Bus KL" },
  { name: "Rapid Bus Kuantan" },
  { name: "Rapid Bus Penang" },
  { name: "MyBas Johor" }
];

// Sample data for vehicles
const vehicles = [
  { label: "SCS19", vehicleTypeId: "KTMB" },
  { label: "SCS03", vehicleTypeId: "KTMB" },
  { label: "EMU22", vehicleTypeId: "KTMB" },
  { label: "WUY9570", vehicleTypeId: "Rapid Bus KL" },
  { label: "WA7449M", vehicleTypeId: "Rapid Bus KL" },
  { label: "CDD1442", vehicleTypeId: "Rapid Bus Kuantan" },
  { label: "CDH3787", vehicleTypeId: "Rapid Bus Kuantan" },
  { label: "JSG5652", vehicleTypeId: "MyBas Johor" },
  { label: "JSN4410", vehicleTypeId: "MyBas Johor" }
];

// Sample data for positions
const positions = [
  { latitude: 3.1685, longitude: 101.6512 },
  { latitude: 3.0836, longitude: 101.6571, bearing: 0, speed: 0 },
  { latitude: 2.9784, longitude: 101.7904, bearing: 0, speed: 23 },
  { latitude: 3.1791, longitude: 101.7003, bearing: 21, speed: 35.18 },
  { latitude: 3.1011, longitude: 101.6423, bearing: 195, speed: 16.67 },
  { latitude: 3.7113, longitude: 103.3251, bearing: 339, speed: 72.77 },
  { latitude: 3.8137, longitude: 103.3329, bearing: 160, speed: 20.37 },
  { latitude: 1.4970, longitude: 103.7441 },
  { latitude: 1.4950, longitude: 103.7434 }
];

// Function to seed vehicle types
async function seedVehicleTypes() {
  const existingTypes = await db.vehicleType.findMany();
  
  if (existingTypes.length > 0) {
    console.log(`Using ${existingTypes.length} existing vehicle types`);
    return existingTypes;
  }
  
  console.log("Creating vehicle types...");
  const createdTypes: VehicleType[] = [];
  
  for (const type of vehicleTypes) {
    const vehicleType = await db.vehicleType.create({
      data: type
    });
    createdTypes.push(vehicleType);
  }
  
  return createdTypes;
}

// Function to seed vehicles
async function seedVehicles(vehicleTypes: VehicleType[]) {
  const existingVehicles = await db.vehicle.count();
  
  if (existingVehicles > 0) {
    console.log(`Using ${existingVehicles} existing vehicles`);
    return;
  }
  
  console.log("Creating vehicles...");
  const vehicleTypeMap = new Map(vehicleTypes.map(vt => [vt.name, vt.id]));
  
  for (const vehicle of vehicles) {
    const vehicleTypeId = vehicleTypeMap.get(vehicle.vehicleTypeId);
    if (!vehicleTypeId) continue;
    
    await db.vehicle.create({
      data: {
        label: vehicle.label,
        vehicleTypeID: vehicleTypeId
      }
    });
  }
}

// Function to create a batch and trip updates
async function createBatchWithTripUpdates() {
  console.log("Creating batch with trip updates...");
  
  // Get all vehicle types
  const vehicleTypes = await db.vehicleType.findMany();
  const vehicleTypeMap = new Map(vehicleTypes.map(vt => [vt.name, vt.id]));
  
  // For each vehicle type, create a batch
  for (const [typeName, typeId] of vehicleTypeMap.entries()) {
    // Check if we already have batches for this vehicle type
    const existingBatches = await db.batch.findMany({
      where: { vehicleTypeID: typeId },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });
    
    // If we already have batches with data, skip
    if (existingBatches.length > 0) {
      const tripUpdateCount = await db.tripUpdate.count({
        where: { batchID: existingBatches[0].id },
      });
      
      if (tripUpdateCount > 0) {
        console.log(`Skipping ${typeName}: already has ${tripUpdateCount} trip updates`);
        continue;
      }
    }
    
    // Create a new batch
    const batch = await db.batch.create({
      data: { vehicleTypeID: typeId }
    });
    
    // Get vehicles for this type
    const typeVehicles = await db.vehicle.findMany({
      where: { vehicleTypeID: typeId }
    });
    
    // Create trip updates for each vehicle
    for (let i = 0; i < Math.min(typeVehicles.length, positions.length); i++) {
      const vehicle = typeVehicles[i];
      const position = positions[i];
      
      // Create trip
      const trip = await db.trip.create({
        data: {
          refID: `trip_${vehicle.label}_${Date.now()}`,
          startDate: "20250513",
          startTime: "12:00:00",
          routeID: `R${i + 1}`,
          directionID: i % 2
        }
      });
      
      // Create position
      const positionRecord = await db.position.create({
        data: {
          latitude: position.latitude,
          longitude: position.longitude,
          bearing: position.bearing,
          speed: position.speed
        }
      });
      
      // Create trip update
      await db.tripUpdate.create({
        data: {
          timestamp: Math.floor(Date.now() / 1000).toString(),
          tripID: trip.id,
          positionID: positionRecord.id,
          vehicleID: vehicle.id,
          batchID: batch.id
        }
      });
    }
    
    console.log(`Created batch for ${typeName} with ${Math.min(typeVehicles.length, positions.length)} trip updates`);
  }
}

// Main seed function
export async function seedDatabase() {
  try {
    const vehicleTypes = await seedVehicleTypes();
    await seedVehicles(vehicleTypes);
    await createBatchWithTripUpdates();
    
    return { success: true, message: "Database seeded successfully" };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error: "Failed to seed database" };
  }
}
