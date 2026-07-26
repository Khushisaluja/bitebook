'use client'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, SplitText, useGsap, usePrefersReducedMotion } from '@/lib/gsap'
import { asset } from '@/lib/asset'

const COLS = [
  {
    head: 'the app',
    links: [
      ['/feed', 'feed'],
      ['/map', 'map'],
      ['/lists', 'lists'],
      ['/profile', 'your diary'],
      ['/log', 'log a bite'],
    ],
  },
  {
    head: 'bitebook',
    links: [
      ['#diary', 'how it works'],
      ['#circle', 'your circle'],
      ['#craft', 'the details'],
    ],
  },
  {
    head: 'the fine print',
    links: [
      ['#', 'privacy, the short version'],
      ['#', 'export your data'],
      ['#', 'hello@bitebook.app'],
    ],
  },
]

export default function Closing() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap<HTMLElement>((root) => {
    if (reduced) return

    const head = root.querySelector<HTMLElement>('.site-close-head')!
    const split = SplitText.create(head, { type: 'chars', mask: 'chars' })

    gsap.from(split.chars, {
      yPercent: 116,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.028,
      scrollTrigger: { trigger: head, start: 'top 82%' },
    })

    gsap.from('.site-close-sub', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: head, start: 'top 72%' },
    })

    // the wordmark rises out of the page edge on the way in
    gsap.from('.site-wordmark', {
      yPercent: 40,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.site-wordmark', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
    })

    return () => split.revert()
  }, [reduced])

  return (
    <footer ref={scope} className="site-section site-ink site-grain">
      <div className="site-shell site-close">
        <div className="site-rule site-close-sub" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <span className="site-eyebrow">v · begin</span>
        </div>

        <h2 className="site-close-head">start your diary</h2>

        <p
          className="site-lede site-close-sub"
          style={{ margin: '2rem auto 0', textAlign: 'center', color: 'rgba(250,245,240,0.62)' }}
        >
          Free while it&rsquo;s small. Log one bite tonight. The diary is more convincing than any
          landing page.
        </p>

        <div
          className="site-close-sub"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center', marginTop: '2.2rem' }}
        >
          <Link href="/log" className="site-btn site-btn-amber">
            log your first bite
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link href="/feed" className="site-btn site-btn-ghost">
            see a sample diary
          </Link>
        </div>
      </div>

      <div className="site-shell site-footer">
        <div className="site-footer-cols">
          {COLS.map((col) => (
            <nav key={col.head} className="site-footer-col">
              <span className="site-eyebrow" style={{ marginBottom: '0.4rem' }}>
                {col.head}
              </span>
              {col.links.map(([href, label]) =>
                href.startsWith('/') ? (
                  <Link key={label} href={href}>
                    {label}
                  </Link>
                ) : (
                  <a key={label} href={href}>
                    {label}
                  </a>
                )
              )}
            </nav>
          ))}

          <div className="site-footer-col" style={{ marginLeft: 'auto', maxWidth: '24ch' }}>
            <Image
              src={asset("/bitebooklogo-new.png")}
              alt="bitebook"
              width={155}
              height={52}
              style={{ height: 34, width: 'auto', objectFit: 'contain', filter: 'invert(1) brightness(1.9) saturate(0)' }}
            />
            <p style={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'rgba(250,245,240,0.5)' }}>
              a social food diary for people who eat with intention.
            </p>
          </div>
        </div>

        <div className="site-colophon">
          <span>© 2026 bitebook</span>
          <span>set in instrument serif &amp; satoshi</span>
          <span>made in bombay, for people who remember meals</span>
        </div>

        <span className="site-wordmark" aria-hidden="true">
          bitebook
        </span>
      </div>
    </footer>
  )
}
