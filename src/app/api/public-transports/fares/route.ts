// https://myrapid.com.my/bus-train/rapid-kl/integrated-fare-table/
// https://jp.mapit.myrapid.com.my/endpoint/geoservice/fares?agency=rapidkl&from=MR1&to=BRT3
// https://kltransit.wordpress.com/2021/09/30/why-mrt-sungai-buloh-kg-01-is-crucial-for-klang-valley-connectivity/
// https://moovitapp.com/index/en/public_transit-line-T101-Kuala_Lumpur-1082-1775731-194025303-0
// https://mrt.com.my/feeder_bus/t100.htm

import { NextResponse } from "next/server"

export async function GET() {
    try {
        return NextResponse.json("Soon")
    }
    catch (error) {
        return NextResponse.json({ error })

    }
}