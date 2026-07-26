'use client'
import Link from 'next/link'
import LogWizard from '@/components/log/LogWizard'

export default function LogPage() {
  return (
    <main style={{ minHeight: '100%', background: '#FAF5F0', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1.1rem 0.4rem' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1015' }}>log a bite</h1>
        <Link href="/feed" aria-label="close" style={{ width: 34, height: 34, borderRadius: '50%', background: '#F0E6DC', color: '#6E3B47', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </Link>
      </header>
      <div style={{ flex: 1 }}>
        <LogWizard />
      </div>
    </main>
  )
}
