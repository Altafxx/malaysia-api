"use client"
import { useState, useEffect } from 'react';
import { Nova_Square } from 'next/font/google';

const textFont = Nova_Square({
    weight: '400',
    subsets: ['latin'],
});

const menu = <svg width="26" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" id="Capa_1" x="0px" y="0px">
    <g>
        <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
        <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z" />
        <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z" />
    </g>
</svg>

const cross = <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Bold"><path d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z" /></svg>

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleBodyOverflow = () => {
            document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        };

        handleBodyOverflow();

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <header className="min-w-max bg-white h-12 text-center">
            <div className="flex justify-between items-center px-8 md:px-12 xl:px-24 h-full">
                <div className={`${textFont.className} text-black text-lg hover:text-purple-800`}>
                    <b><a href='/'>Malaysia API</a></b>
                </div>
                <div className='sm:invisible text-black cursor-pointer' onClick={toggleMenu}>
                    {menu}
                </div>
                <div className={`hidden sm:block text-black ml-4 ${isMenuOpen ? 'hidden' : 'block'}`}>
                    <a href='/api/mykad-checker?id=451214-03-6557' className='hover:font-bold'>MyKad Parser</a>
                    <a href='/api/races' className='ml-4 hover:font-bold'>Etnics</a>
                </div>
                {isMenuOpen && (
                    <div className="sm:hidden text-black absolute top-0 left-0 right-0 bottom-0 bg-white z-10">
                        <div className='grid grid-cols-1 gap-6 mt-12 '>
                            <div>
                                <h3>Realtime</h3>
                                <ul>
                                    <li><a href='/api/public-transports/realtime/ktmb' className='block hover:font-bold'>KTMB</a></li>
                                    <li><a href='/api/public-transports/realtime/mybas-johor' className='block hover:font-bold'>MyBas Johor</a></li>
                                    <li><a href='/api/public-transports/realtime/rapid-bus-kl' className='block hover:font-bold'>Rapid Bus KL</a></li>
                                    <li><a href='/api/public-transports/realtime/rapid-bus-kuantan' className='block hover:font-bold'>Rapid Bus Kuantan</a></li>
                                    <li><a href='/api/public-transports/realtime/rapid-bus-penang' className='block hover:font-bold'>Rapid Bus Penang</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3>Tools</h3>
                                <ul>
                                    <li><a href='/api/mykad-checker?id=451214-03-6557' className='block hover:font-bold'>MyKad Parser</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3>Generic</h3>
                                <ul>
                                    <li><a href='/api/races' className='block hover:font-bold'>Etnics</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="absolute top-2 right-7 cursor-pointer h-full" onClick={toggleMenu}>
                            {cross}
                        </div>
                    </div>

                )}
            </div>
        </header>
    );
}