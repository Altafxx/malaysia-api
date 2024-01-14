import data from '@/dataset/ethnics.json';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        return NextResponse.json(data)
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}