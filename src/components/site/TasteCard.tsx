'use client'
import { useEffect, useRef } from 'react'
import { gsap, useGsap, usePrefersReducedMotion } from '@/lib/gsap'

export default function TasteCard() {
  const reduced = usePrefersReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)

  const scope = useGsap<HTMLElement>(() => {
    if (reduced) return

    // counters roll up as the card arrives
    gsap.utils.toArray<HTMLElement>('.site-count').forEach((el) => {
      const end = Number(el.dataset.to)
      const dec = el.dataset.dec === '1'
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: () => {
          el.textContent = dec ? obj.v.toFixed(1) : String(Math.round(obj.v))
        },
      })
    })

    gsap.from('.site-tastecard', {
      y: 70,
      opacity: 0,
      rotateX: 12,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.site-tastecard-wrap', start: 'top 82%' },
    })

    gsap.from('.site-tastecopy > *', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.site-tastecopy', start: 'top 82%' },
    })
  }, [reduced])

  // pointer tilt + a glare that tracks the cursor
  useEffect(() => {
    const el = wrap.current
    if (!el || reduced) return
    const card = el.querySelector<HTMLElement>('.site-tastecard')!
    const glare = el.querySelector<HTMLElement>('.site-tastecard-glare')!

    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.7, ease: 'power3.out' })
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.7, ease: 'power3.out' })
    const gx = gsap.quickTo(glare, 'xPercent', { duration: 0.8, ease: 'power3.out' })
    const gy = gsap.quickTo(glare, 'yPercent', { duration: 0.8, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      rx(-py * 16)
      ry(px * 18)
      gx(px * 60)
      gy(py * 60)
    }
    const leave = () => {
      rx(0)
      ry(0)
      gx(0)
      gy(0)
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [reduced])

  return (
    <section
      ref={scope}
      className="site-section site-ink site-grain"
      style={{ padding: 'clamp(5rem, 10vw, 8.5rem) 0' }}
    >
      <div className="site-shell site-split">
        <div className="site-tastecopy">
          <div className="site-rule" style={{ marginBottom: '1.6rem' }}>
            <span className="site-eyebrow">iv · the artifact</span>
          </div>
          <h2 className="site-display site-d2" style={{ maxWidth: '13ch' }}>
            a year of eating, <span className="site-em">counted up</span>
          </h2>
          <p className="site-lede" style={{ marginTop: '1.4rem' }}>
            Every december the diary hands you back a card: what you ate, how generously you rate,
            the vibe you kept reaching for. The one thing here worth posting, and the only thing
            that leaves your circle, if you choose.
          </p>
        </div>

        <div className="site-tastecard-wrap" ref={wrap}>
          <div className="site-tastecard">
            <span className="site-tastecard-glare" />
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '0.63rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--amber-l)',
                }}
              >
                your taste · 2026
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(250,245,240,0.15)',
                  borderRadius: 100,
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                  <path d="M16 6l-4-4-4 4M12 2v14" />
                </svg>
                share
              </span>
            </div>

            <div className="site-tastecard-grid">
              <div className="site-tastecard-stat">
                <b>
                  <span className="site-count" data-to="142">
                    142
                  </span>
                </b>
                <span>bites remembered</span>
              </div>
              <div className="site-tastecard-stat">
                <b>
                  <span className="site-count" data-to="4.3" data-dec="1">
                    4.3
                  </span>
                  <span style={{ fontSize: '0.55em', color: 'var(--amber-l)' }}> ★</span>
                </b>
                <span>you rate generously</span>
              </div>
              <div className="site-tastecard-stat">
                <b style={{ fontSize: '1.32rem', lineHeight: 1.15 }}>#rainy day solo</b>
                <span>your signature vibe</span>
              </div>
              <div className="site-tastecard-stat">
                <b style={{ fontSize: '1.32rem', lineHeight: 1.15 }}>Pistachio Tart</b>
                <span>top of the year</span>
              </div>
              <div className="site-tastecard-stat">
                <b>
                  <span className="site-count" data-to="38">
                    38
                  </span>
                </b>
                <span>places, one city</span>
              </div>
              <div className="site-tastecard-stat">
                <b>
                  <span className="site-count" data-to="9">
                    9
                  </span>
                </b>
                <span>friends along for it</span>
              </div>
            </div>

            <p
              style={{
                position: 'relative',
                zIndex: 2,
                marginTop: '1.8rem',
                paddingTop: '1.1rem',
                borderTop: '1px solid rgba(250,245,240,0.18)',
                fontSize: '0.72rem',
                opacity: 0.6,
              }}
            >
              bitebook · @khushi.eats · bombay
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
