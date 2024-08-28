"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    marker: {
        position: LatLngExpression | LatLngTuple,
        label: string
    }[]
    zoom?: number,
}

const Map = (props?: MapProps) => {
    const position = {
        center: [3.1685, 101.6512] as LatLngTuple,
        marker: [3.1685, 101.6512] as LatLngExpression,
    }

    return (
        <MapContainer
            center={[3.1685, 101.6512]}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                props && props?.marker.length > 0 && props.marker.map((item, index) => (
                    <Marker key={index} position={item.position} draggable={false}>
                        <Popup>{item.label}</Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    )
}

export default Map