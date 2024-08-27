import GTFSRealtimeBindings from 'gtfs-realtime-bindings';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Sample GTFS-R URL from Malaysia's Open API
        const URL =
            'https://api.data.gov.my/gtfs-realtime/vehicle-position/ktmb';

        // Fetch GTFS Realtime feed
        const response = await fetch(URL, { next: { revalidate: 1 } })

        if (!response.ok) return NextResponse.json({ message: "API Limit" })
        const buffer = await response.arrayBuffer();

        const feed = GTFSRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
        const tripUpdates = feed.entity.filter((entity) => entity);

        const map = tripUpdates.flatMap((entity) => {
            return {
                tripId: entity.vehicle?.trip?.tripId,
                routeId: entity.vehicle?.trip?.routeId,
                label: entity.vehicle?.vehicle?.label,
                lat: entity.vehicle?.position?.latitude,
                lng: entity.vehicle?.position?.longitude
            }
        });


        return NextResponse.json({ tripUpdates, map })
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}