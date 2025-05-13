"use client";

import { VehicleType } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VehicleTypeSelectorProps {
  vehicleTypes: VehicleType[];
  selectedVehicleTypeId: string | null;
  onVehicleTypeSelect: (vehicleTypeId: string) => void;
}

export default function VehicleTypeSelector({
  vehicleTypes,
  selectedVehicleTypeId,
  onVehicleTypeSelect,
}: VehicleTypeSelectorProps) {
  if (!vehicleTypes || vehicleTypes.length === 0) {
    return <div>No vehicle types available</div>;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((vehicleType) => (
            <Button
              key={vehicleType.id}
              variant={
                selectedVehicleTypeId === vehicleType.id ? "default" : "outline"
              }
              onClick={() => onVehicleTypeSelect(vehicleType.id)}
              className={cn(
                "transition-all",
                selectedVehicleTypeId === vehicleType.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              )}
            >
              {vehicleType.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
