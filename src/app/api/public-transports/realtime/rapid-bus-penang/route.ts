import GTFSRealtimeBindings from 'gtfs-realtime-bindings';

export async function GET(req: any, res: any) {
    try {
        // Sample GTFS-R URL from Malaysia's Open API
        const URL =
            'https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=rapid-bus-penang';

        // Fetch GTFS Realtime feed
        const response = await fetch(URL)

        if (!response.ok) return Response.json({ message: "API Limit" })
        const buffer = await response.arrayBuffer();

        const feed = GTFSRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
        const tripUpdates = feed.entity.filter((entity) => entity);

        return Response.json({ tripUpdates })
    }
    catch (error) {
        return Response.json({ error })

    }
}