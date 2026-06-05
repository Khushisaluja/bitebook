'use client'
import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

function TiltPhone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const nx = (e.clientX - left - width / 2) / (width / 2)
    const ny = (e.clientY - top - height / 2) / (height / 2)
    el.style.transition = 'transform 0.06s ease'
    el.style.transform = `perspective(1000px) rotateX(${-ny * 9}deg) rotateY(${nx * 12}deg) scale(1.04)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ willChange: 'transform', display: 'flex', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

// Realistic CSS "food photos" — layered gradients per dish
const DISH_BG: Record<string, string> = {
  coffee: 'radial-gradient(circle at 50% 42%, #E9D4B8 0%, #C9A06E 30%, #8A5A33 62%, #5E3A1E 100%)',
  ramen: 'radial-gradient(circle at 50% 45%, #E8A24C 0%, #C9742E 45%, #8F4A1E 100%)',
  pancakes: 'linear-gradient(150deg, #F0C97A 0%, #D99B49 55%, #B5722F 100%)',
  matcha: 'radial-gradient(circle at 45% 40%, #CFE0A6 0%, #A9C96E 45%, #6E8F3E 100%)',
  berry: 'radial-gradient(circle at 50% 45%, #E8A6B8 0%, #C76A86 50%, #8F3A56 100%)',
}

function StatusBar() {
  return (
    <div style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', position: 'relative', zIndex: 3 }}>
      <span style={{ fontSize: '0.5rem', fontWeight: 800, color: '#1A1015', letterSpacing: '0.02em' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* signal */}
        <svg width="11" height="8" viewBox="0 0 11 8"><g fill="#1A1015">
          <rect x="0" y="5" width="1.6" height="3" rx="0.5" /><rect x="3" y="3.5" width="1.6" height="4.5" rx="0.5" /><rect x="6" y="2" width="1.6" height="6" rx="0.5" /><rect x="9" y="0.5" width="1.6" height="7.5" rx="0.5" />
        </g></svg>
        {/* wifi */}
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 2.6 A7 7 0 0 1 10 2.6" stroke="#1A1015" strokeWidth="1.1" strokeLinecap="round" /><path d="M3 4.4 A4 4 0 0 1 8 4.4" stroke="#1A1015" strokeWidth="1.1" strokeLinecap="round" /><circle cx="5.5" cy="6.6" r="0.9" fill="#1A1015" /></svg>
        {/* battery */}
        <div style={{ width: 15, height: 7.5, borderRadius: 2, border: '1px solid #1A1015', padding: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: 1, background: '#1A1015' }} />
          <div style={{ position: 'absolute', right: -2.2, top: '32%', height: '36%', width: 1.4, borderRadius: 1, background: '#1A1015' }} />
        </div>
      </div>
    </div>
  )
}

function PhoneMockup({ type }: { type: 'feed' | 'map' | 'profile' }) {
  return (
    <div style={{
      width: 240, height: 430, borderRadius: 38,
      background: '#FAF5F0', border: '7px solid #1A1015',
      boxShadow: '16px 16px 0 #6E3B47', overflow: 'hidden',
      position: 'relative', flexShrink: 0,
    }}>
      {/* notch */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 78, height: 16, background: '#1A1015', borderRadius: '0 0 11px 11px', zIndex: 4 }} />
      <StatusBar />

      {type === 'feed' && (
        <div style={{ height: 'calc(100% - 24px)', display: 'flex', flexDirection: 'column' }}>
          {/* app header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 12px 8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#1A1015', letterSpacing: '-0.02em' }}>bitebook</span>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#EDE2D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>🔔</div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { dish: 'coffee', emoji: '☕', name: 'mira m.', handle: '@mira.sips', cafe: 'Blue Tokai', dishName: 'Ethiopian Pour Over', rating: '9.1', tags: ['#cozy', '#ritual'], likes: 84 },
              { dish: 'ramen', emoji: '🍜', name: 'arjun t.', handle: '@arjuneats', cafe: 'Naaru', dishName: 'Miso Ramen', rating: '8.7', tags: ['#rainy day'], likes: 132 },
              { dish: 'pancakes', emoji: '🥞', name: 'priya k.', handle: '@priyabites', cafe: 'Fig & Maple', dishName: 'Ricotta Pancakes', rating: '9.4', tags: ['#sunday slow'], likes: 201 },
            ].map((c, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 2px 10px rgba(26,16,21,0.06)', flexShrink: 0 }}>
                {/* user row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 7px' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg,#C4A0A8,#6E3B47)', flexShrink: 0 }} />
                  <div style={{ lineHeight: 1.1 }}>
                    <p style={{ fontSize: '0.5rem', fontWeight: 800, color: '#1A1015' }}>{c.name}</p>
                    <p style={{ fontSize: '0.42rem', color: '#9A8288' }}>{c.handle}</p>
                  </div>
                </div>
                {/* photo */}
                <div style={{ height: 88, background: DISH_BG[c.dish], position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.9rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>{c.emoji}</span>
                  <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(26,16,21,0.78)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontSize: '0.42rem' }}>⭐</span>
                    <span style={{ fontSize: '0.46rem', fontWeight: 800, color: '#FAF5F0' }}>{c.rating}</span>
                  </div>
                </div>
                {/* caption */}
                <div style={{ padding: '6px 8px 8px' }}>
                  <p style={{ fontSize: '0.55rem', fontWeight: 800, color: '#1A1015', letterSpacing: '-0.01em' }}>{c.dishName}</p>
                  <p style={{ fontSize: '0.45rem', color: '#7A6268', marginTop: 1 }}>📍 {c.cafe}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {c.tags.map(t => (
                        <span key={t} style={{ fontSize: '0.42rem', background: '#F2E9E2', borderRadius: 100, padding: '1px 5px', color: '#6E3B47', fontWeight: 700 }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9A8288' }}>
                      <span style={{ fontSize: '0.5rem', display: 'flex', alignItems: 'center', gap: 1.5 }}>❤️<span style={{ fontSize: '0.42rem', fontWeight: 700 }}>{c.likes}</span></span>
                      <span style={{ fontSize: '0.5rem' }}>🔖</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'map' && (
        <div style={{ height: 'calc(100% - 24px)', position: 'relative', overflow: 'hidden', background: '#EDE4DA' }}>
          {/* search bar */}
          <div style={{ position: 'absolute', top: 8, left: 10, right: 10, height: 22, background: '#FFFFFF', borderRadius: 100, boxShadow: '0 2px 8px rgba(26,16,21,0.1)', display: 'flex', alignItems: 'center', gap: 5, padding: '0 9px', zIndex: 3 }}>
            <span style={{ fontSize: '0.5rem' }}>🔍</span>
            <span style={{ fontSize: '0.48rem', color: '#9A8288', fontWeight: 600 }}>search your map…</span>
          </div>
          {/* map base */}
          <svg width="100%" height="100%" viewBox="0 0 240 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            {/* park */}
            <path d="M0,250 Q60,230 120,255 L150,400 L0,400 Z" fill="#CFDDB8" opacity="0.85" />
            {/* water */}
            <path d="M180,0 Q220,60 200,140 Q240,200 230,260 L240,260 L240,0 Z" fill="#AECBD6" opacity="0.8" />
            {/* roads */}
            <g stroke="#FFFFFF" strokeWidth="9" fill="none" opacity="0.95">
              <path d="M-10,90 Q90,70 250,110" />
              <path d="M-10,200 Q110,185 250,215" />
              <path d="M-10,320 Q120,300 250,330" />
              <path d="M55,-10 L72,410" />
              <path d="M150,-10 L165,410" />
            </g>
            <g stroke="#E3D6CA" strokeWidth="4" fill="none">
              <path d="M-10,140 Q120,128 250,150" />
              <path d="M105,-10 L118,410" />
            </g>
          </svg>
          {/* pins */}
          {[
            { x: 70, y: 92, emoji: '☕', active: true },
            { x: 150, y: 150, emoji: '🍜' },
            { x: 96, y: 196, emoji: '🥐' },
            { x: 172, y: 96, emoji: '🍰' },
            { x: 60, y: 240, emoji: '🧋' },
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-100%)', zIndex: p.active ? 3 : 2 }}>
              <div style={{
                width: p.active ? 26 : 20, height: p.active ? 26 : 20, borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)', background: p.active ? '#6E3B47' : '#FAF5F0',
                border: `2px solid ${p.active ? '#FAF5F0' : '#6E3B47'}`,
                boxShadow: '0 3px 7px rgba(26,16,21,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ transform: 'rotate(45deg)', fontSize: p.active ? '0.7rem' : '0.55rem' }}>{p.emoji}</span>
              </div>
            </div>
          ))}
          {/* current location dot */}
          <div style={{ position: 'absolute', left: 118, top: 280, width: 12, height: 12, borderRadius: '50%', background: '#3B82F6', border: '2.5px solid #FFFFFF', boxShadow: '0 0 0 5px rgba(59,130,246,0.2)', zIndex: 2 }} />
          {/* bottom preview card */}
          <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, background: '#FFFFFF', borderRadius: 14, boxShadow: '0 4px 16px rgba(26,16,21,0.14)', padding: 8, display: 'flex', gap: 8, alignItems: 'center', zIndex: 3 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: DISH_BG.coffee, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>☕</div>
            <div style={{ flex: 1, lineHeight: 1.25 }}>
              <p style={{ fontSize: '0.56rem', fontWeight: 800, color: '#1A1015' }}>Blue Tokai</p>
              <p style={{ fontSize: '0.44rem', color: '#7A6268' }}>coffee roasters · 0.3 km</p>
              <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                <span style={{ fontSize: '0.42rem', background: '#F2E9E2', borderRadius: 100, padding: '1px 5px', color: '#6E3B47', fontWeight: 700 }}>#quiet corner</span>
              </div>
            </div>
            <span style={{ fontSize: '0.5rem', color: '#6E3B47', fontWeight: 800 }}>›</span>
          </div>
        </div>
      )}

      {type === 'profile' && (
        <div style={{ height: 'calc(100% - 24px)', overflow: 'hidden' }}>
          {/* cover */}
          <div style={{ height: 56, background: 'linear-gradient(120deg,#6E3B47,#B8848F)', position: 'relative' }} />
          <div style={{ padding: '0 12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: -22 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#C4A0A8,#6E3B47)', border: '3px solid #FAF5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF5F0', fontWeight: 900, fontSize: '1.1rem' }}>k</div>
              <div style={{ paddingBottom: 4 }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 900, color: '#1A1015', lineHeight: 1.1 }}>khushi</p>
                <p style={{ fontSize: '0.46rem', color: '#7A6268' }}>@khushi.eats</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 4px 10px', textAlign: 'center' }}>
              {[['127', 'bites'], ['34', 'cafes'], ['8', 'cities'], ['1.2k', 'followers']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 900, color: '#1A1015' }}>{n}</p>
                  <p style={{ fontSize: '0.42rem', color: '#9A8288', fontWeight: 600 }}>{l}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.46rem', color: '#B8848F', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>taste dna</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {['#quiet luxury', '#cozy corner', '#rainy day', '#hidden gem', '#ritual'].map(t => (
                <span key={t} style={{ fontSize: '0.42rem', background: '#F2E9E2', borderRadius: 100, padding: '2px 7px', color: '#6E3B47', fontWeight: 700 }}>{t}</span>
              ))}
            </div>

            <p style={{ fontSize: '0.46rem', color: '#B8848F', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>recent bites</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              {[
                { bg: DISH_BG.coffee, emoji: '☕' }, { bg: DISH_BG.ramen, emoji: '🍜' }, { bg: DISH_BG.matcha, emoji: '🍵' },
                { bg: DISH_BG.berry, emoji: '🍰' }, { bg: DISH_BG.pancakes, emoji: '🥞' }, { bg: DISH_BG.coffee, emoji: '🧋' },
              ].map((g, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 8, background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{g.emoji}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const FEATURES = [
  {
    type: 'feed' as const,
    label: '01 / the feed',
    title: 'Scroll Through Taste.',
    desc: 'Not algorithms. Not sponsored posts. Just honest bites from people who eat the way you wish you could describe it. Finally.',
    reverse: false,
  },
  {
    type: 'map' as const,
    label: '02 / the map',
    title: 'Your City, Bitten.',
    desc: "Every spot visited, every hidden gem, every quiet corner worth a return trip. Your palate, mapped. No crumbs left behind.",
    reverse: true,
  },
  {
    type: 'profile' as const,
    label: '03 / taste dna',
    title: 'All You.',
    desc: 'Top 5 vibes. Monthly recap capsule. Your taste, evolving with every bite you log. No forks given.',
    reverse: false,
  },
]

export default function FeatureHighlights() {
  return (
    <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        {FEATURES.map((f) => (
          <motion.div
            key={f.type}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexDirection: f.reverse ? 'row-reverse' : 'row',
              alignItems: 'center', gap: '5rem', flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B8848F', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {f.label}
              </p>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900,
                color: '#1A1015', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem',
              }}>
                {f.title}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#7A6268', lineHeight: 1.75, maxWidth: 400 }}>
                {f.desc}
              </p>
            </div>
            <TiltPhone>
              <PhoneMockup type={f.type} />
            </TiltPhone>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
