'use client'
import { gsap, ScrollTrigger, useGsap, usePrefersReducedMotion } from '@/lib/gsap'
import { BiteCard } from '@/components/site/mock/AppScreens'
import { SEED_BITES } from '@/lib/seed'

export default function Gallery() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap<HTMLElement>((root) => {
    if (reduced) return

    const track = root.querySelector<HTMLElement>('.site-gallery-track')!
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48)

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 0.75,
        invalidateOnRefresh: true,
      },
    })

    // cards lift into place the first time the section arrives
    gsap.from('.site-gallery-card', {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: root, start: 'top 65%' },
    })

    return () => ScrollTrigger.refresh()
  }, [reduced])

  return (
    <section
      id="circle"
      ref={scope}
      className="site-section site-paper site-grain site-gallery"
      data-reduced={reduced}
    >
      <div className="site-gallery-inner">
        <div className="site-shell" style={{ marginBottom: 'clamp(2rem, 4vw, 3.4rem)' }}>
          <div className="site-rule" style={{ marginBottom: '1.6rem' }}>
            <span className="site-eyebrow">ii · your circle</span>
          </div>
          <h2 className="site-display site-d3" style={{ maxWidth: '24ch' }}>
            what eight people you trust <span className="site-em">actually ate</span> this week
          </h2>
        </div>

        <div className="site-gallery-track">
          {SEED_BITES.map((b) => (
            <div className="site-gallery-card" key={b.id}>
              <BiteCard bite={b} compact />
            </div>
          ))}
          <div
            className="site-gallery-card"
            style={{ display: 'flex', alignItems: 'center', flex: '0 0 250px' }}
          >
            <p className="site-body" style={{ maxWidth: '22ch' }}>
              …and nothing from anyone you haven&rsquo;t added yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
