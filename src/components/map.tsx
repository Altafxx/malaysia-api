"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, LatLngTuple, Icon, DivIcon } from 'leaflet';
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    markers: {
        position: LatLngExpression | LatLngTuple,
        label: string,
        vehicleId?: string
    }[]
    zoom?: number,
    onMarkerClick?: (vehicleId: string) => void,
    selectedMarker?: string | null
}

// Component to handle map center and zoom changes
function MapController({ center, zoom }: { center?: LatLngTuple, zoom?: number }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, zoom || map.getZoom());
        } else if (zoom) {
            map.setZoom(zoom);
        }
    }, [center, zoom, map]);

    return null;
}

const Map = ({ markers = [], zoom = 7, onMarkerClick, selectedMarker }: MapProps) => {
    // Default center is Kuala Lumpur
    const defaultCenter: LatLngTuple = [3.1685, 101.6512];

    console.log(`Rendering map with ${markers.length} markers`);

    // Calculate center based on markers if available
    const center = markers.length > 0
        ? markers.reduce((acc, marker) => {
            try {
                const pos = marker.position as LatLngTuple;
                return [acc[0] + pos[0] / markers.length, acc[1] + pos[1] / markers.length] as LatLngTuple;
            } catch (error) {
                console.error("Error processing marker position:", error, marker);
                return acc;
            }
        }, [0, 0] as LatLngTuple)
        : defaultCenter;

    // Validate center coordinates
    const validCenter = (
        !isNaN(center[0]) && !isNaN(center[1]) &&
        Math.abs(center[0]) <= 90 && Math.abs(center[1]) <= 180
    ) ? center : defaultCenter;

    return (
        <MapContainer
            center={validCenter}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
        >
            <MapController center={validCenter} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.filter(item => {
                // Validate marker position
                try {
                    const pos = item.position as LatLngTuple;
                    return (
                        pos &&
                        pos.length === 2 &&
                        !isNaN(pos[0]) &&
                        !isNaN(pos[1]) &&
                        Math.abs(pos[0]) <= 90 &&
                        Math.abs(pos[1]) <= 180
                    );
                } catch (error) {
                    console.error("Invalid marker position:", error, item);
                    return false;
                }
            }).map((item, index) => {
                const isSelected = selectedMarker && item.vehicleId === selectedMarker;

                return (
                    <Marker
                        key={index}
                        position={item.position}
                        draggable={false}
                        eventHandlers={{
                            click: () => {
                                if (onMarkerClick && item.vehicleId) {
                                    onMarkerClick(item.vehicleId);
                                }
                            }
                        }}
                        opacity={isSelected ? 1 : 0.7}
                        zIndexOffset={isSelected ? 1000 : 0}
                    >
                        <Popup>{item.label}</Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    )
}

export default Map