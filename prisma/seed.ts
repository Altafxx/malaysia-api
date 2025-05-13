import { db } from '../src/lib/db-client'
import vehicleTypeSeeder from './seeder/seed-vehicle-type'
import seedSampleData from './seeder/seed-sample-data'

async function main() {
    await db.$connect()

    try {
        // Check if we already have vehicle types
        const existingVehicleTypes = await db.vehicleType.count();

        // Only seed vehicle types if we don't have any
        if (existingVehicleTypes === 0) {
            console.log("Seeding vehicle types...")
            const vehicleType = await vehicleTypeSeeder()
            console.log({ vehicleType })
        } else {
            console.log(`Using ${existingVehicleTypes} existing vehicle types`)
        }

        // Seed sample data for testing (our updated function will check if data already exists)
        console.log("Checking sample data...")
        const sampleData = await seedSampleData()
        console.log("Sample data process completed:", sampleData)
    } catch (error) {
        console.error("Error during seeding:", error)
    }
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })
