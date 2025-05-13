"use client";

import { useEffect, useState } from "react";
import { Batch, Position, Trip, TripUpdate, Vehicle, VehicleType } from "@prisma/client";
import { getBatchDetails, getBatchesByVehicleType, getLatestBatch, getVehicleHistory } from "@/actions/public-transport";
import VehicleTypeSelector from "@/components/public-transport/vehicle-type-selector";
import BatchSelector from "@/components/public-transport/batch-selector";
import VehicleMap from "@/components/public-transport/vehicle-map";
import VehicleDetails from "@/components/public-transport/vehicle-details";
import VehicleHistory from "@/components/public-transport/vehicle-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TripUpdateWithRelations = TripUpdate & {
  position: Position;
  vehicle: Vehicle;
  trip: Trip;
};

type BatchWithTripUpdates = Batch & {
  TripUpdate: TripUpdateWithRelations[];
};

interface PublicTransportClientProps {
  vehicleTypes: VehicleType[];
}

export default function PublicTransportClient({
  vehicleTypes,
}: PublicTransportClientProps) {
  // State
  const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState<string | null>(
    vehicleTypes.length > 0 ? vehicleTypes[0].id : null
  );
  const [batches, setBatches] = useState<Batch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<BatchWithTripUpdates | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedTripUpdate, setSelectedTripUpdate] = useState<TripUpdateWithRelations | null>(null);
  const [vehicleHistory, setVehicleHistory] = useState<(TripUpdate & { position: Position; trip: Trip; batch?: Batch | null })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("map");

  // Load batches when vehicle type changes
  useEffect(() => {
    if (selectedVehicleTypeId) {
      loadBatches(selectedVehicleTypeId);
    }
  }, [selectedVehicleTypeId]);

  // Load batches for a vehicle type
  const loadBatches = async (vehicleTypeId: string) => {
    setIsLoading(true);
    try {
      console.log("Loading batches for vehicle type:", vehicleTypeId);
      const { data, success } = await getBatchesByVehicleType(vehicleTypeId);

      if (success && data && data.length > 0) {
        console.log(`Found ${data.length} batches with data`);
        setBatches(data);

        // Load the latest batch
        await loadBatchDetails(data[0].id);
      } else {
        console.log("No batches found or no batches with trip updates");
        setBatches([]);
        setCurrentBatch(null);
      }
    } catch (error) {
      console.error("Error loading batches:", error);
      setBatches([]);
      setCurrentBatch(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Load batch details
  const loadBatchDetails = async (batchId: string) => {
    setIsLoading(true);
    try {
      console.log("Loading batch details for batch:", batchId);
      const { data, success, error } = await getBatchDetails(batchId);

      if (success && data && data.TripUpdate && data.TripUpdate.length > 0) {
        console.log(`Found batch with ${data.TripUpdate.length} trip updates`);
        setCurrentBatch(data as BatchWithTripUpdates);

        // Clear selected vehicle when batch changes
        setSelectedVehicleId(null);
        setSelectedTripUpdate(null);
        setVehicleHistory([]);
      } else {
        console.log("No trip updates found in batch:", error || "Unknown error");
        setCurrentBatch(null);

        // Try to load the next batch if this one has no data
        const currentBatchIndex = batches.findIndex(b => b.id === batchId);
        if (currentBatchIndex >= 0 && currentBatchIndex < batches.length - 1) {
          console.log("Trying next batch...");
          await loadBatchDetails(batches[currentBatchIndex + 1].id);
        }
      }
    } catch (error) {
      console.error("Error loading batch details:", error);
      setCurrentBatch(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle vehicle click
  const handleVehicleClick = async (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);

    // Find the trip update for this vehicle in the current batch
    if (currentBatch && currentBatch.TripUpdate) {
      const tripUpdate = currentBatch.TripUpdate.find(
        (update) => update.vehicleID === vehicleId
      );

      if (tripUpdate) {
        setSelectedTripUpdate(tripUpdate);

        // Load vehicle history
        try {
          const { data, success } = await getVehicleHistory(vehicleId);
          if (success && data) {
            setVehicleHistory(data);
          }
        } catch (error) {
          console.error("Error loading vehicle history:", error);
        }
      }
    }
  };

  // Handle closing vehicle details
  const handleCloseVehicleDetails = () => {
    setSelectedVehicleId(null);
    setSelectedTripUpdate(null);
    setVehicleHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Type Selector */}
      <VehicleTypeSelector
        vehicleTypes={vehicleTypes}
        selectedVehicleTypeId={selectedVehicleTypeId}
        onVehicleTypeSelect={setSelectedVehicleTypeId}
      />

      {isLoading ? (
        <div className="p-8 text-center border rounded-lg">
          <div className="animate-pulse">Loading vehicle data...</div>
        </div>
      ) : (
        <>
          {/* Batch Selector */}
          {batches.length > 0 ? (
            <BatchSelector
              batches={batches}
              onBatchChange={loadBatchDetails}
              currentBatchId={currentBatch?.id}
            />
          ) : (
            <div className="p-4 bg-amber-100 text-amber-800 rounded-md">
              No batches found for this vehicle type. Please select a different vehicle type.
            </div>
          )}

          {/* Main Content */}
          {currentBatch && currentBatch.TripUpdate && currentBatch.TripUpdate.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map and Vehicle Details */}
              <div className="lg:col-span-2 space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="map">Map View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="map" className="space-y-4">
                    <VehicleMap
                      batch={currentBatch}
                      onVehicleClick={handleVehicleClick}
                    />
                  </TabsContent>
                  <TabsContent value="list">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-2 text-left">Vehicle</th>
                            <th className="p-2 text-left">Route</th>
                            <th className="p-2 text-left">Position</th>
                            <th className="p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentBatch.TripUpdate.map((update) => (
                            <tr
                              key={update.id}
                              className={`border-t hover:bg-muted/50 ${selectedVehicleId === update.vehicleID ? 'bg-muted/80' : ''}`}
                            >
                              <td className="p-2">{update.vehicle.label}</td>
                              <td className="p-2">{update.trip.routeID || "Unknown"}</td>
                              <td className="p-2">
                                {update.position.latitude.toFixed(4)}, {update.position.longitude.toFixed(4)}
                              </td>
                              <td className="p-2">
                                <button
                                  onClick={() => handleVehicleClick(update.vehicleID)}
                                  className="text-blue-600 hover:underline"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Vehicle Details and History */}
              <div className="space-y-4">
                {selectedTripUpdate && (
                  <VehicleDetails
                    tripUpdate={selectedTripUpdate}
                    onClose={handleCloseVehicleDetails}
                  />
                )}

                {selectedVehicleId && vehicleHistory.length > 0 && selectedTripUpdate && (
                  <VehicleHistory
                    vehicleId={selectedVehicleId}
                    vehicleLabel={selectedTripUpdate.vehicle.label}
                    tripUpdates={vehicleHistory}
                    onClose={handleCloseVehicleDetails}
                  />
                )}

                {!selectedVehicleId && (
                  <div className="p-8 text-center border rounded-lg bg-muted/30">
                    <p>Select a vehicle on the map to view details</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border rounded-lg">
              <p className="text-lg font-medium mb-2">No vehicle data available</p>
              <p className="text-muted-foreground">
                {batches.length > 0
                  ? "There are no trip updates in the selected batch. Please try another batch or vehicle type."
                  : "Please select a vehicle type to view data."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
