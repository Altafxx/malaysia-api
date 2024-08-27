import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import '@/styles/globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from '@/components/providers/theme'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>

    </html>
  )
}
