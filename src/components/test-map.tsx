"use client"

import { LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function TestMap({ location }: { location?: number[] }) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    console.log(location)

    if (!location) {
        return <p>No location provided</p>
    }

    return (
        <>
            <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
                <Map posix={location as LatLngTuple} />
            </div>
        </>
    )
}