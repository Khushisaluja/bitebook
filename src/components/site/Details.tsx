'use client'
import { useState } from 'react'
import { gsap, useGsap, usePrefersReducedMotion } from '@/lib/gsap'

// The exact copy the product shows next to each rating, so the landing page
// teaches the real vocabulary rather than inventing marketing words.
const RATING_WORD: Record<string, string> = {
  '0': 'tap the stars',
  '0.5': 'a mistake, honestly',
  '1': 'would not return',
  '1.5': 'forgettable',
  '2': 'just fine',
  '2.5': 'has potential',
  '3': 'solid, no notes needed',
  '3.5': 'really good',
  '4': 'i keep thinking about it',
  '4.5': 'cross-town good',
  '5': 'a new personal legend',
}

function Star({ fill, size = 30 }: { fill: number; size?: number }) {
  const id = `d-star-${Math.round(fill * 100)}-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#6E3B47" />
          <stop offset={`${fill * 100}%`} stopColor="rgba(110,59,71,0.18)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.2l2.9 6.26 6.86.62-5.18 4.55 1.55 6.71L12 17.3l-6.13 3.64 1.55-6.71L2.24 9.08l6.86-.62z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}

/** Half-star picker, lifted straight from the log flow. */
function RatingDemo() {
  const [value, setValue] = useState(4.5)

  return (
    <>
      <div className="site-stars" role="group" aria-label="try the half-star rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ position: 'relative', display: 'inline-flex' }}>
            <Star fill={gsap.utils.clamp(0, 1, value - (i - 1))} />
            {[0.5, 1].map((half) => (
              <button
                key={half}
                type="button"
                className="site-star"
                aria-label={`${i - 1 + half} stars`}
                onMouseEnter={() => setValue(i - 1 + half)}
                onFocus={() => setValue(i - 1 + half)}
                onClick={() => setValue(i - 1 + half)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  left: half === 0.5 ? 0 : '50%',
                  width: '50%',
                  background: 'transparent',
                }}
              />
            ))}
          </span>
        ))}
      </div>
      <span className="site-star-word">&ldquo;{RATING_WORD[String(value)]}&rdquo;</span>
    </>
  )
}

const VIBES = ['rainy day solo', 'quiet luxury', 'first sip ritual', 'worth the wait', 'window seat', 'golden hour']

export default function Details() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap<HTMLElement>(() => {
    if (reduced) return
    gsap.from('.site-detail', {
      y: 46,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.site-details', start: 'top 78%' },
    })
  }, [reduced])

  return (
    <section
      id="craft"
      ref={scope}
      className="site-section site-paper site-grain"
      style={{ padding: 'clamp(5rem, 11vw, 9rem) 0 clamp(6rem, 12vw, 10rem)' }}
    >
      <div className="site-shell">
        <div className="site-rule" style={{ marginBottom: '1.6rem' }}>
          <span className="site-eyebrow">iii · the details</span>
        </div>
        <h2 className="site-display site-d2" style={{ maxWidth: '16ch', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          small decisions, <span className="site-em">made carefully</span>
        </h2>

        <div className="site-details">
          {/* half stars */}
          <div className="site-detail site-detail-wide">
            <h4>half stars, because 3 and 4 are different meals</h4>
            <p>
              Every rating carries the words the app gives it. Hover the stars. This is the real
              control.
            </p>
            <div className="site-detail-foot">
              <RatingDemo />
            </div>
          </div>

          {/* vibes */}
          <div className="site-detail site-detail-tall">
            <h4>vibes, not cuisines</h4>
            <p>
              You don&rsquo;t remember &ldquo;continental&rdquo;. You remember that it was raining
              and you had nowhere to be. Up to four per bite.
            </p>
            <div className="site-detail-foot" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {VIBES.map((v, i) => (
                <span key={v} className="bb-chip" data-active={i === 0 || i === 2}>
                  #{v}
                </span>
              ))}
            </div>
          </div>

          {/* privacy */}
          <div className="site-detail site-detail-third">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--mul)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.9rem' }}>
              <rect x="4" y="10" width="16" height="10" rx="2.5" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <h4>friends only, always</h4>
            <p>No public profile. No discover tab. Nothing to farm.</p>
          </div>

          {/* export */}
          <div className="site-detail site-detail-third">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--mul)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.9rem' }}>
              <path d="M12 3v12M8 11l4 4 4-4M4 21h16" />
            </svg>
            <h4>your diary, portable</h4>
            <p>Export everything to CSV or JSON. It was never ours to keep.</p>
          </div>

          {/* the note */}
          <div className="site-detail site-detail-third">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--mul)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.9rem' }}>
              <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H15l5 5v9.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5Z" />
              <path d="M8 12h8M8 16h5" />
            </svg>
            <h4>280 characters</h4>
            <p>Long enough to say why. Short enough that you actually will.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
