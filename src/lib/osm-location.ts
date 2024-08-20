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
            console.error(`Geocoding failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();

        return data.display_name;
    } catch (error) {

        return null;
    }
};

export default getGeocode;
