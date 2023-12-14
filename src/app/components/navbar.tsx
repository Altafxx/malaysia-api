import { Nova_Square } from 'next/font/google';

const textFont = Nova_Square({
    weight: '400',
    subsets: ['latin'],
});

export default function Navbar() {
    return (
        <header className="min-w-max bg-white h-12 text-center">
            <div className="flex justify-between items-center px-8 md:px-12 xl:px-24 h-full">
                <div className={`${textFont.className} text-black text-lg hover:text-purple-800`}>
                    <b><a href='/'>Malaysia API</a></b>
                </div>
                <div className="text-black ml-4">
                    <a href='/api/mykad-checker?id=451214-03-6557' className='hover:font-bold'>MyKad Parser</a>
                    <a href='/api/races' className='ml-4 hover:font-bold'>Races</a>
                </div>
            </div>
        </header>
    );
}