import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar'

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
      </body>
    </html>
  )
}
