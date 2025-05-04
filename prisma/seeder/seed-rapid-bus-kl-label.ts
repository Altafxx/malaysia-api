import { db } from "../../src/lib/db-client"
import rapidBusKLPlate from "@/data/plate-number/rapid-bus-kl"


export default async function vehicleSeeder() {
    const data = await Promise.all(
        rapidBusKLPlate.map(
            async (plate: string) => (
                await db.vehicle.create({
                    data: {
                        label: plate,
                        vehicleType: { connect: { name: "Rapid Bus KL" } }
                    }
                })

            ))
    )

    return { count: data.length }
}