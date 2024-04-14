import data from '@/dataset/states/states.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Example usage
        const latitude = 3.0099800; // New York City
        const longitude = 101.6758100;
        const zoomLevel = 7;

        const mapUrl = generateOSMMapUrl(latitude, longitude, zoomLevel);
        // console.log(mapUrl);

        return NextResponse.redirect(mapUrl)
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}

function generateOSMMapUrl(lat: number, lng: number, zoom: number): string {
    // Base URL for OpenStreetMap tiles
    const baseUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    // Function to convert degrees to tile coordinates
    function deg2num(lat: number, lon: number, zoom: number) {
        const latRad = lat * Math.PI / 180;
        const n = Math.pow(2, zoom - 1);
        const xtile = Math.floor((lon + 180) / 360 * n);
        const ytile = Math.floor((1 - Math.tanh(latRad)) / 2 * n);
        return { x: xtile, y: ytile };
    }

    // Get tile coordinates from latitude and longitude
    const coords = deg2num(lat, lng, zoom);

    // Replace placeholders in base URL
    const url = baseUrl
        .replace("{s}", ["a", "b", "c"][Math.floor(Math.random() * 3)]) // Choose random tile server
        .replace("{z}", zoom.toString())
        .replace("{x}", coords.x.toString())
        .replace("{y}", coords.y.toString());
    return url;
}