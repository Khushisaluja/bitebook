'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#1A1015', padding: '4rem 2rem 2rem', color: '#FAF5F0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <Image src="/bitebooklogo-new.png" alt="bitebook" width={140} height={48} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9, marginBottom: 16 }} />
            <p style={{ fontSize: '0.9rem', color: 'rgba(250,245,240,0.5)', lineHeight: 1.7, maxWidth: 260 }}>
              a social food diary for those who eat with intention.
            </p>
          </div>
          {/* Links */}
          {[
            { title: 'explore', links: [{ href: '/feed', label: 'feed' }, { href: '/map', label: 'map' }, { href: '/profile', label: 'profile' }] },
            { title: 'log', links: [{ href: '/log', label: 'log a bite' }] },
            { title: 'company', links: [{ href: '#', label: 'about' }, { href: '#', label: 'blog' }, { href: '#', label: 'privacy' }] },
          ].map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(250,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => (
                  <Link key={l.label} href={l.href} style={{ fontSize: '0.9rem', color: 'rgba(250,245,240,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#B8848F')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,245,240,0.7)')}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submark */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <Image src="/bitebook-submark.png" alt="" width={32} height={32} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.25 }} />
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(250,245,240,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(250,245,240,0.3)' }}>© 2026 bitebook. all rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Instagram */}
            <a href="#" style={{ color: 'rgba(250,245,240,0.4)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#B8848F')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,245,240,0.4)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" style={{ color: 'rgba(250,245,240,0.4)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#B8848F')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,245,240,0.4)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
