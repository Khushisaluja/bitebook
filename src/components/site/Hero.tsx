'use client'
import Link from 'next/link'
import { gsap, SplitText, useGsap, usePrefersReducedMotion, EASE_SOFT } from '@/lib/gsap'
import { asset } from '@/lib/asset'

// Four prints from the seed diary, pinned to the page like photographs
// taped into a notebook. Positions are hand-set for a deliberate,
// slightly-off-grid cluster rather than a tidy row.
const PRINTS = [
  { src: '/dishes/ethiopian-pour-over.jpg', cap: 'blue tokai · 4.5', top: '24%', right: '2%', w: 186, rot: -4.5, depth: 0.16 },
  { src: '/dishes/miso-ramen.jpg', cap: 'naaru · 5.0', bottom: '14%', right: '18%', w: 176, rot: -7, depth: 0.24 },
  { src: '/dishes/ricotta-pancakes.jpg', cap: 'fig & maple · 4.0', bottom: '5%', right: '3%', w: 204, rot: 4.5, depth: 0.1 },
  // sits last so it layers on top of the ramen print
  { src: '/dishes/salted-caramel-crepe.jpg', cap: 'suzette · 3.5', bottom: '30%', right: '26%', w: 138, rot: 8, depth: 0.34 },
] as const

export default function Hero() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap<HTMLElement>((root) => {
    if (reduced) return

    const q = gsap.utils.selector(root)
    const heads = q<HTMLElement>('.site-hero-head .site-display')

    // Split each headline line into characters that rise out of their mask.
    const splits = heads.map((el) => SplitText.create(el, { type: 'chars', mask: 'chars' }))
    const chars = splits.flatMap((s) => s.chars)

    const tl = gsap.timeline({ defaults: { ease: EASE_SOFT } })

    tl.from('.site-hero-meta > *', { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.06 })
      .from(chars, { yPercent: 118, duration: 1.15, stagger: 0.014 }, 0.15)
      .from('.site-hero-foot > *', { y: 26, opacity: 0, duration: 1, stagger: 0.09 }, 0.55)
      .from('.site-scrollcue', { opacity: 0, duration: 0.8 }, 0.9)
      .from(
        '.site-print',
        {
          y: 60,
          opacity: 0,
          scale: 0.94,
          rotate: (i: number) => PRINTS[i].rot + (i % 2 ? 9 : -9),
          duration: 1.3,
          stagger: 0.1,
        },
        0.3
      )

    // Depth: each print drifts at its own rate as the hero scrolls away.
    q<HTMLElement>('.site-print').forEach((el, i) => {
      gsap.to(el, {
        yPercent: -34 - PRINTS[i].depth * 90,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    })

    // The type itself lifts and dims: the page turning.
    gsap.to('.site-hero-type', {
      yPercent: -14,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 },
    })

    return () => splits.forEach((s) => s.revert())
  }, [reduced])

  return (
    <header ref={scope} className="site-section site-paper site-grain site-ruled site-hero">
      <div className="site-shell">
        <div className="site-hero-meta">
          <span>bitebook</span>
          <span>a private food diary</span>
          <span>est. mmxxvi · bombay</span>
        </div>

        <div className="site-hero-type">
          <h1 className="site-hero-head">
            <span className="site-line">
              <span className="site-display site-d1">keep every bite</span>
            </span>
            <span className="site-line">
              <span className="site-display site-d1">
                worth <span className="site-em">remembering</span>
              </span>
            </span>
          </h1>

          <div className="site-hero-foot">
            <div style={{ maxWidth: '44ch' }}>
              <p className="site-lede">
                not a review site. a notebook. log what you ate, how it tasted and the exact
                weather of that afternoon. then share it with the eight people whose taste you
                actually trust.
              </p>
              <div className="site-hero-cta" style={{ marginTop: '1.6rem' }}>
                <Link href="/log" className="site-btn">
                  start your diary
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </Link>
                <a href="#diary" className="site-btn site-btn-ghost">
                  look inside
                </a>
              </div>
            </div>

            <dl style={{ display: 'flex', gap: '2.2rem' }}>
              {[
                ['11', 'bites logged'],
                ['8', 'friends, no strangers'],
                ['0', 'ads, ever'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dd className="site-num" style={{ fontSize: '2.1rem', lineHeight: 1, color: 'var(--mul)' }}>
                    {n}
                  </dd>
                  <dt
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--mul-l)',
                      marginTop: '0.5rem',
                      maxWidth: '11ch',
                    }}
                  >
                    {l}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="site-scrollcue">
          <i />
          scroll to open
        </div>
      </div>

      <div className="site-prints" aria-hidden="true">
        {PRINTS.map((p) => (
          <figure
            key={p.src}
            className="site-print"
            style={{
              top: 'top' in p ? p.top : undefined,
              bottom: 'bottom' in p ? p.bottom : undefined,
              right: p.right,
              width: p.w,
              rotate: `${p.rot}deg`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(p.src)} alt="" style={{ aspectRatio: '4 / 5' }} />
            <figcaption>{p.cap}</figcaption>
          </figure>
        ))}
      </div>
    </header>
  )
}
