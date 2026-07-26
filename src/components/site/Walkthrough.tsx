'use client'
import { useState } from 'react'
import { gsap, useGsap, useMediaQuery, usePrefersReducedMotion } from '@/lib/gsap'
import {
  FeedScreen,
  LogScreen,
  MapScreen,
  ListsScreen,
  ProfileScreen,
} from '@/components/site/mock/AppScreens'

const CHAPTERS = [
  {
    key: 'feed',
    n: '01',
    label: 'the feed',
    title: ['a feed with no', 'strangers in it.'],
    copy: 'Eight people, added one at a time. No leaderboards, no sponsored plates, no restaurant replying to your review. Just what the people you trust actually ate this week.',
    tags: ['friends only', 'no algorithm', 'chronological'],
    Screen: FeedScreen,
  },
  {
    key: 'log',
    n: '02',
    label: 'logging',
    title: ['twenty seconds,', 'start to finish.'],
    copy: 'Photo, place, dish, half-star rating. Then the part that matters: why it was worth remembering. Rate the plate, never the place.',
    tags: ['half stars', 'up to 4 vibes', '280 characters'],
    Screen: LogScreen,
  },
  {
    key: 'map',
    n: '03',
    label: 'the map',
    title: ['your city,', 'filling in.'],
    copy: 'Every bite drops a pin. Amber is yours, mulberry is a friend’s, hollow is somewhere you still mean to go. A year in, it reads like a map of how you lived.',
    tags: ['pins by taste', 'want-to-try layer', 'offline-first'],
    Screen: MapScreen,
  },
  {
    key: 'lists',
    n: '04',
    label: 'lists',
    title: ['the places you keep', 'meaning to try.'],
    copy: 'Someone mentions a bakery in passing and it goes straight on the list, with who told you and why. Mark it eaten and it crosses itself off.',
    tags: ['curated lists', 'want to try', 'shared with friends'],
    Screen: ListsScreen,
  },
  {
    key: 'you',
    n: '05',
    label: 'you',
    title: ['a year of taste,', 'on one card.'],
    copy: 'Your diary, counted up: bites remembered, how generously you rate, your signature vibe, the single best thing you ate. Made to screenshot.',
    tags: ['taste DNA', 'shareable card', 'CSV / JSON export'],
    Screen: ProfileScreen,
  },
]

function Chapter({ c, isStatic }: { c: (typeof CHAPTERS)[number]; isStatic?: boolean }) {
  return (
    <article className="site-walk-chapter" data-static={isStatic}>
      <span className="site-eyebrow">
        {c.n} · {c.label}
      </span>
      <h3>
        {c.title.map((line) => (
          <span key={line} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h3>
      <p>{c.copy}</p>
      <div className="site-walk-tags">
        {c.tags.map((t) => (
          <span key={t} className="site-walk-tag">
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-phone-wrap">
      <div className="site-phone">
        <div className="site-phone-screen">
          <div className="site-phone-notch" />
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Walkthrough() {
  const reduced = usePrefersReducedMotion()
  // A pinned 100svh stage can't hold the copy and a phone side by side on a
  // narrow screen, so below the two-column breakpoint the chapters simply stack.
  const narrow = useMediaQuery('(max-width: 939px)')
  const stacked = reduced || narrow
  const [active, setActive] = useState(0)

  const scope = useGsap<HTMLElement>((root) => {
    if (stacked) return

    const q = gsap.utils.selector(root)
    const screens = q<HTMLElement>('.site-screen')
    const chapters = q<HTMLElement>('.site-walk-chapter')
    const n = CHAPTERS.length

    // Each screen wipes up over the last instead of cross-fading, so two dense
    // UIs are never translucent at the same time. No ghosting, no seams.
    screens.forEach((s, i) => {
      gsap.set(s, {
        zIndex: i,
        opacity: 1,
        clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
      })
    })
    gsap.set(chapters.slice(1), { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.site-walk-stage',
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.65,
        onUpdate: (self) => {
          // +0.25 keeps the rail in step with the copy, which hands over
          // slightly before the chapter boundary
          setActive(gsap.utils.clamp(0, n - 1, Math.floor(self.progress * n + 0.25)))
        },
      },
    })

    // One dwell per chapter; the hand-off happens in the last third of each.
    for (let i = 1; i < n; i++) {
      const at = i - 0.34
      tl.to(
        screens[i],
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.34, ease: 'power2.inOut' },
        at
      )
        // copy hands over cleanly: the old line is gone before the new arrives
        .to(chapters[i - 1], { opacity: 0, y: -30, duration: 0.16 }, at)
        .to(chapters[i], { opacity: 1, y: 0, duration: 0.24 }, at + 0.17)
    }
    // hold the last chapter on screen for its full beat
    tl.to({}, { duration: 0.34 }, n - 0.34)

    // the device turns slowly through the whole sequence
    gsap.fromTo(
      '.site-phone',
      { rotateY: 11, rotateX: 3 },
      {
        rotateY: -11,
        rotateX: -2,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 1 },
      }
    )
  }, [stacked])

  if (stacked) {
    return (
      <section id="diary" className="site-section site-ink site-grain" style={{ padding: '6rem 0' }}>
        <div className="site-shell">
          {CHAPTERS.map((c) => (
            <div
              key={c.key}
              className="site-walk-grid"
              style={{ marginBottom: '5.5rem', minHeight: 0 }}
            >
              <div style={{ position: 'relative' }}>
                <Chapter c={c} isStatic />
              </div>
              <Phone>
                <c.Screen />
              </Phone>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="diary"
      ref={scope}
      className="site-section site-ink site-grain site-walk"
      style={{ height: `${CHAPTERS.length * 100}svh` }}
    >
      <div className="site-walk-stage">
        <div className="site-shell site-walk-grid">
          <div className="site-walk-copy">
            {CHAPTERS.map((c) => (
              <Chapter key={c.key} c={c} />
            ))}
          </div>

          <Phone>
            {CHAPTERS.map((c) => (
              <c.Screen key={c.key} />
            ))}
          </Phone>
        </div>

        <div className="site-rail" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <span key={c.key} className="site-rail-item" data-on={i === active}>
              <i />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
