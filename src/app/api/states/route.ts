import data from '@/dataset/states/states.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams
        const state = params.get('state')

        if (state) {
            const findState = data.states.find((s) => s.name.toLowerCase() === state.toLowerCase().replace(/_|-/g, ' '));

            if (findState) {
                console.log("First");
                console.log(findState);
                return NextResponse.json(findState);
            }
        }

        return NextResponse.json(data.states)
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}