import type { Metadata } from 'next'
import './globals.css'
import SplashScreen from '@/components/SplashScreen'
import Navbar from '@/components/nav/Navbar'

export const metadata: Metadata = {
  title: 'bitebook',
  description: 'a social food diary for those who eat with intention. not reviews. not ratings. just you and your bites.',
  openGraph: {
    title: 'bitebook',
    description: 'your bites, your story.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SplashScreen />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
