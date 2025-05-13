"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { Batch, Position, Trip, TripUpdate, Vehicle } from "@prisma/client";

type TripUpdateWithRelations = TripUpdate & {
  position: Position;
  vehicle: Vehicle;
  trip: Trip;
};

type BatchWithTripUpdates = Batch & {
  TripUpdate: TripUpdateWithRelations[];
};

interface VehicleMapProps {
  batch: BatchWithTripUpdates | null;
  onVehicleClick: (vehicleId: string) => void;
}

export default function VehicleMap({ batch, onVehicleClick }: VehicleMapProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Dynamically import the Map component to avoid SSR issues with Leaflet
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    []
  );

  // Convert trip updates to map markers
  const markers = useMemo(() => {
    if (!batch || !batch.TripUpdate || batch.TripUpdate.length === 0) {
      return [];
    }

    console.log(`Creating markers for ${batch.TripUpdate.length} trip updates`);

    return batch.TripUpdate.map((update) => {
      // Log each vehicle's data for debugging
      console.log(`Vehicle: ${update.vehicle.label}, Position: ${update.position.latitude}, ${update.position.longitude}`);

      return {
        position: [
          update.position.latitude,
          update.position.longitude,
        ] as LatLngExpression,
        label: `${update.vehicle.label} - ${update.trip.routeID || "Unknown Route"
          }`,
        vehicleId: update.vehicleID,
      };
    });
  }, [batch]);

  // Handle marker click
  const handleMarkerClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleClick(vehicleId);
  };

  if (!batch || markers.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-8 text-center">
        <p>No vehicle data available for this batch</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border">
      <Map
        markers={markers}
        zoom={12}
        onMarkerClick={handleMarkerClick}
        selectedMarker={selectedVehicle}
      />
    </div>
  );
}
