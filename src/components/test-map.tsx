"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function TestMap({ marker, zoom = 19 }: { marker?: { position: LatLngExpression | LatLngTuple, label: string }[], zoom?: number }) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])


    if (!marker) {
        return <p>No location provided</p>
    }

    return (
        <>
            <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
                <Map marker={marker} zoom={zoom} />
            </div>
        </>
    )
}