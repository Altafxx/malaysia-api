import { db } from "@/lib/db-client";

export default async function PublicTransportPage() {
    const data = await db.vehicleType.findMany()

    const plate = await db.vehicle.findMany({
        where: {
            vehicleType: {
                name: "Rapid Bus KL"
            }
        }
    })

    return (
        <div className="flex flex-col min-h-screen justify-center bg-background/60 dark:bg-background/80 items-center">
            <h1>Public Transport</h1>
            <p>Public transport page content</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plate.map((item) => (
                    <div key={item.id}>{item.label}</div>
                ))}
            </div>
        </div>
    );
}