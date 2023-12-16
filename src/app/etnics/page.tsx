import etnics from '@/dataset/etnics.json';

export default function Etnics() {
    const data = etnics;

    if (!Array.isArray(data.etnics)) {
        return <div className="text-center">Invalid data format</div>;
    }

    return (
        <div className="text-center">
            <h1>Etnics</h1>
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:md:grid-cols-1 gap-1 mt-4">
                {data?.etnics.map((item: any, index: any) => (
                    <div key={index} className="rounded bg-white/5 py-1 m-1">{item}</div>
                ))}
            </div>
        </div>
    );
}
