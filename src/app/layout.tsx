import type { Metadata } from 'next'
import { Sansita } from 'next/font/google'
import './globals.css'

const textFont = Sansita({ weight: ["400", "700", "900"], subsets: ['latin'], display: "swap" })

export const metadata: Metadata = {
  title: 'Malaysia API',
  description: 'Centralize open data from the government of Malaysia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${textFont.className}, min-h-screen p-24`}>{children}</body>
    </html>
  )
}
