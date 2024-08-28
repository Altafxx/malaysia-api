// import getGeocode from "@/lib/googlemaps"
import TestMap from "@/components/test-map"
import getGeocode from "@/lib/osm-location"
import dynamic from "next/dynamic"
import { useMemo } from "react"
async function getData() {
    const res = await fetch(`${process.env.URL}/api/public-transports/realtime/ktmb`, { next: { revalidate: 10 } })

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

export default async function KTMB() {
    const data = await getData()

    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP || '';
    if (!apiKey) {
        console.error('Google Maps API key is not defined. Please set the NEXT_PUBLIC_GOOGLE_MAP environment variable.');
    }

    const location = async (lat: number, lng: number) => await getGeocode({ lat: lat, lng: lng }, apiKey);
    const map = (lat: number, lng: number) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;

    const date = (ts: number) => {
        const time = new Date(ts * 1000);

        const timezoneOffset = 8 * 60;
        time.setMinutes(time.getMinutes() + timezoneOffset);

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const year = time.getUTCFullYear();
        const month = months[time.getUTCMonth()];
        const day = time.getUTCDate();
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();

        const timezoneAbbreviation = `(GMT${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset / 60})`;

        const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${timezoneAbbreviation}`;

        return formattedDate;
    };

    if (!Array.isArray(data.tripUpdates)) {
        return <div className="text-center">Invalid data format</div>;
    }

    if (data.tripUpdates.length === 0) {
        return <div className="text-center">
            <h1>KTMB</h1>
            <h3 className=" text-white/50">No data retrieved</h3>
        </div>
    }

    const markers = await data.tripUpdates.map((item: any) => {
        return {
            position: [item.vehicle.position.latitude, item.vehicle.position.longitude],
            label: item.vehicle.vehicle.label,
        }
    });


    return (
        <main className="flex flex-col min-h-screen justify-center bg-background items-center px-24">
            <div className="flex-col text-center max-w-7xl">
                <h1>KTMB</h1>
                {
                    markers.length > 0 && <TestMap marker={markers} />
                }
                <div className="grid 2xl:grid-cols-6 xl:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-1 mt-4">
                    {data && data?.tripUpdates.map((item: any, index: any) => (
                        <div key={index} className="rounded-lg bg-white/5 py-4 m-1 p-4">
                            <p><b>{item.vehicle.vehicle.label}</b></p>
                            <p suppressHydrationWarning>{date(item.vehicle.timestamp).toString()}</p>
                            <div className="relative">
                                <div className="relative mx-auto rounded-lg overflow-hidden my-2 shadow-md shadow-black">
                                    {/* <TestMap location={[item.vehicle.position.latitude, item.vehicle.position.longitude]} zoom={15} /> */}
                                    {/* <img src={map(item.vehicle.position.latitude, item.vehicle.position.longitude)} className="object-cover" /> */}
                                </div>
                                {/* <div className="relative mx-auto rounded-lg overflow-hidden my-2 shadow-md shadow-black">
<img src={map(item.vehicle.position.latitude, item.vehicle.position.longitude)} className="object-cover" />
</div> */}
                                <div className="inline-flex items-center rounded-full bg-purple-700 px-3 py-1">
                                    <img src="/tachometer.svg" height={20} width={20} className="mr-2" />
                                    <p>{Math.round(item.vehicle.position.speed)} KM/H</p>
                                </div>
                                <div className="bg-black/75 rounded-bl-md rounded-br-md py-1">
                                    <p className="truncate mx-5">{location(item.vehicle.position.latitude, item.vehicle.position.longitude)}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
