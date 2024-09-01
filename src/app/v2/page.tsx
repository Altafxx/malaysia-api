"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Nova_Square } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkScroll } from 'react-scroll';


const textFont = Nova_Square({
    weight: ['400'],
    subsets: ['latin'],
});

export default function Page() {
    return (
        <main className="flex flex-col min-h-screen justify-center bg-background/80 items-center">
            <Image src="/hero.jpg" alt="hero" width={1920} height={1080} className='flex fixed top-0 -z-10 min-h-screen min-w-screen object-cover' />
            <div className="flex flex-col text-center justify-center min-h-screen space-y-8 w-full">
                <div className='space-y-4'>
                    <h1 className={`text-7xl line-clamp-2 md:text-9xl ${textFont.className}`}>Nakhoda API</h1>
                    <p className="text-foreground/50 text-md md:text-lg italic">Centralize access to Malaysia's open data</p>
                </div>
                <div className="space-x-4 select-none">
                    <Button asChild className="py-6 w-40 rounded-full bg-blue-900 transition-all hover:bg-blue-800/80 hover:cursor-pointer">
                        <LinkScroll to="feature" smooth={true} duration={500}> Explore </LinkScroll>
                    </Button>
                    <Button asChild variant="outline" className="py-6 w-40 bg-blue-900/10 hover:bg-black/5 outline outline-1 outline-blue-800/50 rounded-full">
                        <Link href="/docs">Docs</Link>
                    </Button>
                </div>
            </div>
            <div id="feature" className="min-h-screen text-center space-y-8 flex flex-col justify-center py-12">
                <h2 className="text-4xl font-medium">Features</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 px-4 md:px-48 gap-8'>
                    <Card className='hover:scale-105 transition-all'>
                        <CardHeader>
                            <CardTitle>
                                Realtime Transportation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Realtime update for KTMB, MyBas Johor, Rapid Bus KL, Rapid Bus Kuantan and Rapid Bus Penang</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className='hover:scale-105 transition-all'>
                        <CardHeader>
                            <CardTitle>
                                MyKad Parser
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Validate, parse, generate, and format Malaysian Identity Card (MyKad) numbers</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className='hover:scale-105 transition-all'>
                        <CardHeader>
                            <CardTitle>
                                Ethnic
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Long list of ethnic diversity in Malaysia</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className='hover:scale-105 transition-all'>
                        <CardHeader>
                            <CardTitle>
                                Postcode
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Detailed list of Malaysia's postcode, street name, district, area and state</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className='relative overflow-clip hover:scale-105 transition-all'>
                        <div className='absolute bg-card/70 min-w-full min-h-full top-0 left-0 text-center content-center z-10'>
                            <div>Coming Soon!</div>
                        </div>
                        <CardHeader className='blur-sm select-none'>
                            <CardTitle>
                                Stations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='blur-sm select-none'>
                            <CardDescription>Listing of airports, bus stop, MRT stations, LRT stations, Monorel stations, KTM stations and Beam station</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className='relative overflow-clip hover:scale-105 transition-all'>
                        <div className='absolute bg-card/70 min-w-full min-h-full top-0 left-0 text-center content-center z-10'>
                            <div>Coming Soon!</div>
                        </div>
                        <CardHeader className='blur-sm select-none'>
                            <CardTitle>
                                Public Holidays
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='blur-sm select-none'>
                            <CardDescription>Public holidays listing in Malaysia on state and national level</CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <ul className="text-md">
                </ul>
            </div>
        </main>
    )
}