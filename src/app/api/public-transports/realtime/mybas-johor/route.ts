import GTFSRealtimeBindings from 'gtfs-realtime-bindings';
import { NextResponse } from 'next/server';

export async function GET(req: any, res: any) {
    try {
        // Sample GTFS-R URL from Malaysia's Open API
        const URL =
            'https://api.data.gov.my/gtfs-realtime/vehicle-position/mybas-johor';

        // Fetch GTFS Realtime feed
        const response = await fetch(URL, { next: { revalidate: 1 } })

        if (!response.ok) return NextResponse.json({ message: "API Limit" })
        const buffer = await response.arrayBuffer();

        const feed = GTFSRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
        const tripUpdates = feed.entity.filter((entity) => entity);

        return NextResponse.json({ tripUpdates })
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}