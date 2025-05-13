"use client";

import { Batch, Position, Trip, TripUpdate, Vehicle } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type TripUpdateWithRelations = TripUpdate & {
  position: Position;
  trip: Trip;
  batch?: Batch | null;
};

interface VehicleHistoryProps {
  vehicleId: string;
  vehicleLabel: string;
  tripUpdates: TripUpdateWithRelations[];
  onClose: () => void;
}

export default function VehicleHistory({
  vehicleId,
  vehicleLabel,
  tripUpdates,
  onClose,
}: VehicleHistoryProps) {
  if (!tripUpdates || tripUpdates.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Vehicle History</CardTitle>
            <CardDescription>No history available for {vehicleLabel}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Vehicle History</CardTitle>
          <CardDescription>History for {vehicleLabel}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Speed</TableHead>
              <TableHead>Batch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tripUpdates.map((update) => {
              const timestamp = new Date(
                parseInt(update.timestamp) * 1000
              ).toLocaleString();
              
              return (
                <TableRow key={update.id}>
                  <TableCell>{timestamp}</TableCell>
                  <TableCell>{update.trip.routeID || "Unknown"}</TableCell>
                  <TableCell>
                    {update.position.latitude.toFixed(4)},{" "}
                    {update.position.longitude.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {update.position.speed
                      ? `${update.position.speed.toFixed(1)} km/h`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {update.batch
                      ? new Date(update.batch.createdAt).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
