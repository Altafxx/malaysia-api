import ethnic from '@/dataset/ethnics.json'

export default function Ethnics() {
    const data = ethnic;

    if (!Array.isArray(data.ethnics)) {
        return <div className="text-center">Invalid data format</div>;
    }

    return (
        <div className="text-center">
            <h1>Ethnics</h1>
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:md:grid-cols-1 gap-1 mt-4">
                {data?.ethnics.map((item: any, index: any) => (
                    <div key={index} className="rounded bg-white/5 py-2 m-1">{item}</div>
                ))}
            </div>
        </div>
    );
}
