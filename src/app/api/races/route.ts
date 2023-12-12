import data from '@/app/dataset/races.json';

export async function GET(req: any, res: any) {
    try {
        return Response.json(data)
    }
    catch (error) {
        return Response.json({ error })

    }
}