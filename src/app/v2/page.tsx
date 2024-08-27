export default function Page() {
    return (
        <main className="flex flex-col min-h-screen justify-center items-center bg-black p-24 space-y-8">
            <div className="text-center bg-white/5 p-12 h-fit">
                <h1 className="text-white text-4xl">Malaysia API</h1>
                <p className="text-white text-lg">Malaysia API is an open-source project built with Next.js that aims to centralize and provide easy access to various open data from the government of Malaysia. The project combines data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly.</p>
            </div>
            <button className="bg-white text-black p-4 rounded-lg w-fit">Get Started</button>
            <div className="text-center">
                <h2 className="text-white text-2xl">Features</h2>
                <ul className="text-white text-lg">
                    <li>Centralize and provide easy access to various open data from the government of Malaysia</li>
                    <li>Combine data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly</li>
                </ul>
            </div>
        </main>
    )
}