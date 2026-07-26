'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { asset } from '@/lib/asset'

const LINKS = [
  { href: '#diary', label: 'the diary' },
  { href: '#circle', label: 'your circle' },
  { href: '#craft', label: 'the details' },
]

export default function SiteNav() {
  const [stuck, setStuck] = useState(false)
  const [over, setOver] = useState<'paper' | 'ink'>('paper')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // hairline progress meter
      gsap.to('.site-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
      })

      ScrollTrigger.create({
        start: 60,
        end: 'max',
        onToggle: (self) => setStuck(self.isActive),
      })

      // Flip the bar to cream while a dark section sits behind it. Measured
      // from live geometry rather than cached trigger positions: pinned
      // sections are position:fixed mid-pin, and their real rect is exactly
      // the "what is behind the nav" answer we need.
      const inks = gsap.utils.toArray<HTMLElement>('.site-ink')
      const probe = 38 // px down the viewport, at the nav's optical centre
      const sync = () => {
        const onInk = inks.some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= probe && r.bottom > probe
        })
        setOver(onInk ? 'ink' : 'paper')
      }

      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: sync, onRefresh: sync })
      sync()
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <i className="site-progress" aria-hidden="true" />
      <nav className="site-nav" data-stuck={stuck} data-over={over}>
        <Link href="/" aria-label="bitebook home" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={asset("/bitebooklogo-new.png")}
            alt="bitebook"
            width={155}
            height={52}
            className="site-nav-mark"
            priority
          />
        </Link>

        <div className="site-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="site-nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <Link href="/feed" className="site-btn site-nav-cta">
          open the app
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </nav>
    </>
  )
}
