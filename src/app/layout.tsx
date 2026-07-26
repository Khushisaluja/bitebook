import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

// The editorial voice of the marketing site. Satoshi (loaded in globals.css)
// stays the product's face, so the page and the app read as one object.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'bitebook · keep every bite worth remembering',
  description:
    'a private food diary for people who eat with intention. log what you ate, how it felt and where, then share it only with the handful of people whose taste you trust.',
  openGraph: {
    title: 'bitebook',
    description: 'your bites, your story.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>{children}</body>
    </html>
  )
}
