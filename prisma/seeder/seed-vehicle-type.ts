import vehicleType from "@/data/vehicle-type"
import { db } from "../../src/lib/db-client"

export default async function vehicleTypeSeeder() {
    return await db.vehicleType.createMany({
        data: vehicleType
    })
}