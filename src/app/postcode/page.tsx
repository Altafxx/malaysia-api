"use client"
import postcode from '@/dataset/states/postcode.json'
import { useSearchParams } from 'next/navigation';

export default function Postcode() {
    const params = useSearchParams();
    const city = params.get('city');
    const state = params.get('state');
    const data = postcode;

    function filteredData() {
        if (!Array.isArray(data)) {
            return <div className="text-center">Invalid data format</div>;
        }

        if (city) {
            const filteredByCity = data.filter((item) => item.city.toLowerCase() === city.toLowerCase());

            console.log(filteredByCity);
            const uniquePostcode = new Set(filteredByCity.map((item) => item.postcode));
            const uniquePostcodeNames = Array.from(uniquePostcode)

            return uniquePostcodeNames.map((postcode, index) => (
                <div key={index} className="rounded bg-white/5 py-2 m-1">{postcode}</div>
            ));
        }

        if (state) {
            const filteredByState = data.filter((item) => item.state.toLowerCase() === state.toLowerCase());

            const uniqueCities = new Set(filteredByState.map((item) => item.city));
            const uniqueCityNames = Array.from(uniqueCities)

            return uniqueCityNames.map((cityName, index) => (
                <div key={index} className="rounded bg-white/5 py-2 m-1">{cityName}</div>
            ));
        }

        const stateNames = new Set(data.map((item) => item.state));
        const uniqueStateNames = Array.from(stateNames);

        return uniqueStateNames.map((item: any, index: any) => (
            <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
        ))
    }

    return (
        <div className="text-center">
            <h1>Postcode</h1>
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:md:grid-cols-1 gap-1 mt-4">
                {filteredData()}
            </div>
        </div>
    )
}