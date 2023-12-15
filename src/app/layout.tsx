import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Malaysia API - Centralize Open Data of Malaysia',
  description: 'Malaysia API is an open-source project built with Next.js that aims to centralize and provide easy access to various open data from the government of Malaysia. The project combines data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly.',
  twitter: {
    card: "summary_large_image",
    title: "Malaysia API - Centralize Open Data of Malaysia",
    description: "Malaysia API is an open-source project built with Next.js that aims to centralize and provide easy access to various open data from the government of Malaysia. The project combines data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly.",
    creator: "@danielminho_",
    images: "image_url_not_avaiable_yet",
  },
  openGraph: {
    type: "website",
    url: "https://malaysia-api.danielaltaf.dev/",
    title: 'Malaysia API - Centralize Open Data of Malaysia',
    description: 'Malaysia API is an open-source project built with Next.js that aims to centralize and provide easy access to various open data from the government of Malaysia. The project combines data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly.',
    images: "image_url_not_avaiable_yet",
  },
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
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  )
}
