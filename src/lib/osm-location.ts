interface Location {
    lat: number;
    lng: number;
}

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface GeocodeResult {
    formatted_address: string;
    address_components: AddressComponent[];
    status: string; // Add the status property here
}

const getGeocode = async (location: Location, apiKey: string): Promise<string | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}`
        );

        if (!response.ok) {
            return location.lat.toFixed(4) + ',' + location.lng.toFixed(4);
        }

        const data = await response.json();
        return data.display_name;
    } catch (error) {
        console.error('Failed to fetch geocode data');
        console.dir(error);
        return location.lat.toFixed(4) + ',' + location.lng.toFixed(4);
    }
};

export default getGeocode;
