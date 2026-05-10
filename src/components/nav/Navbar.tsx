'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 2rem',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(250,245,240,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(110,59,71,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/bitebooklogo-new.png" alt="bitebook" width={155} height={52} style={{ objectFit: 'contain' }} />
      </Link>

      {/* Nav links — hidden on mobile */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
        {[
          { href: '/feed', label: 'feed' },
          { href: '/map', label: 'map' },
          { href: '/profile', label: 'profile' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#7A6268',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#6E3B47')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7A6268')}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: CTA + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <MagneticButton>
          <Link
            href="/log"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '100px',
              background: '#6E3B47',
              color: '#FAF5F0',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#4A2730')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6E3B47')}
          >
            + log a bite
          </Link>
        </MagneticButton>
        <Link href="/profile">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#E5DDD6',
              border: '2px solid #6E3B47',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#6E3B47',
              letterSpacing: '0.05em',
            }}
          >
            k
          </div>
        </Link>
      </div>
    </nav>
  )
}
