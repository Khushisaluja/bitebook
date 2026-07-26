'use client'
import { gsap, SplitText, useGsap, usePrefersReducedMotion } from '@/lib/gsap'

export default function Manifesto() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap<HTMLElement>((root) => {
    const copy = root.querySelector<HTMLElement>('.site-manifesto-copy')!

    if (reduced) {
      copy.style.color = 'var(--txt)'
      return
    }

    const split = SplitText.create(copy, { type: 'words', wordsClass: 'site-word' })

    // Words take ink one after another as the paragraph crosses the viewport.
    gsap.to(split.words, {
      color: '#1a1015',
      ease: 'none',
      stagger: 1,
      duration: 2,
      scrollTrigger: {
        trigger: copy,
        start: 'top 78%',
        end: 'bottom 55%',
        scrub: 0.6,
      },
    })

    gsap.from('.site-manifesto-side', {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: copy, start: 'top 70%' },
    })

    return () => split.revert()
  }, [reduced])

  return (
    <section ref={scope} className="site-section site-paper site-grain site-manifesto">
      <div className="site-shell">
        <div className="site-rule" style={{ marginBottom: 'clamp(3rem, 7vw, 5.5rem)' }}>
          <span className="site-eyebrow">i · why a diary</span>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
        >
          <p className="site-manifesto-copy">
            not reviews. not stars for strangers. bitebook is the notebook you keep in your coat
            pocket. the rainy tuesday you found the pour-over. the tart so precise it felt rude
            to eat it fast.
          </p>

          <div
            className="site-manifesto-side"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 4rem', alignItems: 'flex-start' }}
          >
            {[
              ['private by default', 'nothing you write is public. your circle is people you added, one at a time.'],
              ['rate the plate', 'half stars, on the dish. never a 1 to 5 verdict on somebody’s livelihood.'],
              ['yours to take', 'export the whole diary to CSV or JSON whenever you like. no hostages.'],
            ].map(([h, p]) => (
              <div key={h} style={{ maxWidth: '26ch' }}>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '1.28rem',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {h}
                </h3>
                <p className="site-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
