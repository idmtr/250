import type { Metadata } from 'next'
import './globals.css'
import { Inter, Geist } from "next/font/google"
import { generateFaviconMetadata } from '@/lib/favicon'

// Initialize fonts at module scope
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

const geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist',
})

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://twofifty.co'
  
  return {
    ...generateFaviconMetadata({ baseUrl }),
    title: {
      default: 'TwoFifty Consulting',
      template: '%s | TwoFifty Consulting'
    },
    description: 'Digital Transformation Consulting'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
