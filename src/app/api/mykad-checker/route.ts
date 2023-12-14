export async function GET(req: any, res: any) {
    try {
        const mykad = require('mykad');
        const id = req.nextUrl.searchParams.get('id')

        // if (!mykad.isValid(id)) {
        //     return Response.json({ message: "Invalid MyKad format" })
        // }

        // const response = mykad.parse(id)

        return Response.json(id)
    }
    catch (error) {
        return Response.json({ error })

    }
}