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
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`
        );

        if (!response.ok) {
            console.error(`Geocoding failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();;

        if (data.status === 'OK') {
            return data.results[0].formatted_address;
        } else {
            console.error(`Geocoding failed with status: ${data.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error during geocoding:', error);
        return null;
    }
};

export default getGeocode;
