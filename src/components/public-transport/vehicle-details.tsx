"use client";

import { Position, Trip, TripUpdate, Vehicle } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type TripUpdateWithRelations = TripUpdate & {
  position: Position;
  vehicle: Vehicle;
  trip: Trip;
};

interface VehicleDetailsProps {
  tripUpdate: TripUpdateWithRelations | null;
  onClose: () => void;
}

export default function VehicleDetails({
  tripUpdate,
  onClose,
}: VehicleDetailsProps) {
  if (!tripUpdate) {
    return null;
  }

  const { vehicle, position, trip } = tripUpdate;
  const timestamp = new Date(parseInt(tripUpdate.timestamp) * 1000).toLocaleString();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Vehicle Details</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm">Vehicle</h3>
            <p>{vehicle.label}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Route</h3>
            <p>{trip.routeID || "Unknown"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Position</h3>
            <p>
              {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Speed</h3>
            <p>{position.speed ? `${position.speed.toFixed(1)} km/h` : "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Bearing</h3>
            <p>{position.bearing ? `${position.bearing}°` : "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm">Timestamp</h3>
            <p>{timestamp}</p>
          </div>
          {trip.startDate && (
            <div>
              <h3 className="font-medium text-sm">Start Date</h3>
              <p>{trip.startDate}</p>
            </div>
          )}
          {trip.startTime && (
            <div>
              <h3 className="font-medium text-sm">Start Time</h3>
              <p>{trip.startTime}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
