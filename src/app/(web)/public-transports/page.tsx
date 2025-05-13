import { Suspense } from "react";
import { getVehicleTypes } from "@/actions/public-transport";
import PublicTransportClient from "./public-transport-client";

export default async function PublicTransportPage() {
    const { data: vehicleTypes, success } = await getVehicleTypes();

    return (
        <div className="flex flex-col min-h-screen bg-background/60 dark:bg-background/80">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Public Transport Tracking</h1>

                <Suspense fallback={<div>Loading vehicle types...</div>}>
                    {success && vehicleTypes ? (
                        <PublicTransportClient vehicleTypes={vehicleTypes} />
                    ) : (
                        <div className="p-4 bg-red-100 text-red-800 rounded-md">
                            Failed to load vehicle types. Please try again later.
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}