import { Button } from '@/components/ui/button';
import { Nova_Square } from 'next/font/google';


const textFont = Nova_Square({
    weight: ['400'],
    subsets: ['latin'],
});

export default function Page() {
    return (
        <main className="flex flex-col min-h-screen justify-center bg-background items-center space-y-8">
            <div className="text-center bg-primary/5 p-12 space-y-4 h-fit w-full">
                <h1 className={`text-6xl ${textFont.className}`}>Malaysia API</h1>
                <p className="text-foreground/50 text-lg italic">Centralize and access to Malaysia's open data.</p>
            </div>
            <div className="space-x-4">
                <Button className="p-4 w-fit rounded-full">Get Started</Button>
                <Button variant="outline" className="p-4 w-fit rounded-full">Docs</Button>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-medium">Features</h2>
                <ul className="text-md">
                    <li>Centralize and provide easy access to various open data from the government of Malaysia</li>
                    <li>Combine data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly</li>
                </ul>
            </div>
        </main>
    )
}