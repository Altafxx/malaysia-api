import data from '@/dataset/states/postcode.json';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams
        const postcode = params.get('postcode')
        const area = params.get('area')
        const city = params.get('city')
        const state = params.get('state')
        const filter = params.getAll('filter')

        if (postcode || area || state || city) {
            let filteredData;
            if (Array.isArray(data)) {
                filteredData = data.filter((item) =>
                    (postcode ? item.postcode.toString() === postcode.toString() : true) &&
                    (area ? item.area.toUpperCase().includes(area.toUpperCase()) : true) &&
                    (city ? item.city.toUpperCase().includes(city.toUpperCase()) : true) &&
                    (state ? item.state.toUpperCase() === state.toUpperCase() : true)
                );

                if (filter.length > 0) {
                    filteredData = filteredData.map((item) => {
                        const filteredItem = {} as any
                        filter.forEach((key) => {
                            filteredItem[key] = item[key]
                        })
                        return filteredItem
                    })
                }

            } else {
                console.error("Data is not an expected array format");
            }
            return NextResponse.json(filteredData);
        }

        return NextResponse.json(data)
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}