"use client"
import postcode from '@/dataset/states/postcode.json'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Postcode() {
    const params = useSearchParams();
    const city = params.get('city');
    const state = params.get('state');
    const area = params.get('area');
    const postcodeParams = params.get('postcode');
    const render = params.get('render');
    const data = postcode;

    function filteredData() {
        if (!Array.isArray(data)) {
            return <div className="text-center">Invalid data format</div>;
        }

        if (state) {
            const filteredByState = data.filter((item) => item.state.toLowerCase() === state.toLowerCase());

            const uniqueCities = new Set(filteredByState.map((item) => item.city));
            const uniqueCityNames = Array.from(uniqueCities).sort()

            return uniqueCityNames.map((item, index) => (
                <Link key={index} href={`?city=${item}`}>
                    <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
                </Link>

            ));
        }

        if (city) {
            const filteredByCity = data.filter((item) => item.city.toLowerCase() === city.toLowerCase());

            const uniqueArea = new Set(filteredByCity.map((item) => item.area));
            const uniqueAreaNames = Array.from(uniqueArea).sort()

            return uniqueAreaNames.map((item, index) => (
                <Link key={index} href={`?area=${item}`}>
                    <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
                </Link>
            ));
        }

        if (area) {
            const filteredByArea = data.filter((item) => item.area.toLowerCase() === area.toLowerCase());

            const uniquePostcode = new Set(filteredByArea.map((item) => item.postcode));
            const uniquePostcodeNames = Array.from(uniquePostcode).sort()

            return uniquePostcodeNames.map((item, index) => (
                <Link key={index} href={`?postcode=${item}`}>
                    <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
                </Link>
            ));
        }

        if (postcodeParams) {
            const filteredByPostcode = data.filter((item) => item.postcode.toString() === postcodeParams.toString());

            const uniqueArea = new Set(filteredByPostcode.map((item) => item.area));
            const uniqueAreaNames = Array.from(uniqueArea).sort()

            return uniqueAreaNames.map((item, index) => (
                <Link key={index} href={`?area=${item}`}>
                    <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
                </Link>
            ));
        }

        if (render == "all") {
            return data.map((item, index) => (
                <div key={index} className="rounded bg-white/5 py-2 m-1">
                    <div>State: {item.state}</div>
                    <div>City: {item.city}</div>
                    <div>Area: {item.area}</div>
                    <div>Postcode: {item.postcode}</div>
                </div>
            ));
        }

        const stateNames = new Set(data.map((item) => item.state));
        const uniqueStateNames = Array.from(stateNames).sort()

        return uniqueStateNames.map((item: any, index: any) => (
            <Link key={index} href={`?state=${item}`}>
                <div className="rounded bg-white/5 py-2 m-1">{item}</div>
            </Link>
        ))
    }

    return (
        <div className="text-center">
            <h1>Postcode</h1>
            <div className="rounded bg-white/5 py-2 m-1">Total loaded data: {(filteredData() as any).length}</div>
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:md:grid-cols-1 gap-1 mt-4">
                {filteredData()}
            </div>
        </div>
    )
}