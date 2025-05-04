import { db } from '../src/lib/db-client'
import vehicleDetailSeeder from './seeder/seed-rapid-bus-kl-label'
import vehicleTypeSeeder from './seeder/seed-vehicle-type'


async function main() {
    await db.$connect()

    const vehicleType = await vehicleTypeSeeder()

    // const vehicleDetail = await vehicleDetailSeeder()



    console.log({ vehicleType })
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
