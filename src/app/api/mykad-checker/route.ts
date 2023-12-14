export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)

    try {
        const mykad = require('mykad');
        const id = searchParams.get('id')

        if (!mykad.isValid(id)) {
            return Response.json({ message: "Invalid MyKad format" })
        }

        const response = mykad.parse(id)

        return Response.json(response)
    }
    catch (error) {
        return Response.json({ error })

    }
}