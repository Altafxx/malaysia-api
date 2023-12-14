import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from './components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Malaysia API',
  description: 'Centralize open data of Malaysia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen text-justify`}>
        <Navbar />
        <main className='py-12 px-8 md:px-12 xl:px-24'>
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}
