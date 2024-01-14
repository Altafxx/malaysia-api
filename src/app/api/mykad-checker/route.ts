import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const mykad = require('mykad');
        const id = searchParams.get('id')

        if (!mykad.isValid(id)) {
            return NextResponse.json({ message: "Invalid MyKad format" })
        }

        const response = mykad.parse(id)

        return NextResponse.json(response)
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}