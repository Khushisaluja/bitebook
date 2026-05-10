'use client'
import { motion } from 'framer-motion'

function PhoneMockup({ type }: { type: 'feed' | 'map' | 'profile' }) {
  return (
    <div
      style={{
        width: 240,
        height: 420,
        borderRadius: 36,
        background: '#FAF5F0',
        border: '6px solid #1A1015',
        boxShadow: '16px 16px 0 #6E3B47',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Status bar */}
      <div style={{ height: 28, background: '#1A1015', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 60, height: 4, borderRadius: 2, background: '#FAF5F0', opacity: 0.4 }} />
      </div>

      {type === 'feed' && (
        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { color: '#C4A0A8', name: 'mira m.', cafe: 'Blue Tokai' },
            { color: '#B8CBA8', name: 'arjun t.', cafe: 'Naaru' },
            { color: '#D4B896', name: 'priya k.', cafe: 'Fig & Maple' },
          ].map((c, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', background: '#F0E6DC' }}>
              <div style={{ height: 80, background: c.color }} />
              <div style={{ padding: '0.5rem' }}>
                <p style={{ fontSize: '0.55rem', fontWeight: 700, color: '#1A1015' }}>{c.name} · {c.cafe}</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {['#cozy', '#ritual'].map(t => (
                    <span key={t} style={{ fontSize: '0.45rem', background: '#E5DDD6', borderRadius: 100, padding: '1px 5px', color: '#6E3B47', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'map' && (
        <div style={{ height: '100%', background: '#E8DCD4', position: 'relative', overflow: 'hidden' }}>
          {/* Fake map lines */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <path d="M0,80 Q120,60 240,90" stroke="#D4C4B8" strokeWidth="12" fill="none" />
            <path d="M0,150 Q80,140 160,160 Q200,170 240,155" stroke="#D4C4B8" strokeWidth="8" fill="none" />
            <path d="M60,0 L70,200" stroke="#D4C4B8" strokeWidth="8" />
            <path d="M140,0 L150,200" stroke="#D4C4B8" strokeWidth="8" />
          </svg>
          {/* Pins */}
          {[{ x: 60, y: 80 }, { x: 140, y: 140 }, { x: 90, y: 160 }, { x: 170, y: 90 }].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: 10, height: 10, borderRadius: '50%', background: '#6E3B47', border: '2px solid #FAF5F0', boxShadow: '0 2px 6px rgba(110,59,71,0.4)' }} />
          ))}
        </div>
      )}

      {type === 'profile' && (
        <div style={{ padding: '1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#6E3B47', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF5F0', fontWeight: 900, fontSize: '1rem' }}>k</div>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#1A1015' }}>khushi</p>
            <p style={{ fontSize: '0.5rem', color: '#7A6268' }}>@khushi.eats</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0.75rem' }}>
            {[['127', 'bites'], ['34', 'cafes'], ['8', 'cities']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 900, color: '#6E3B47' }}>{n}</p>
                <p style={{ fontSize: '0.45rem', color: '#7A6268' }}>{l}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.5rem', color: '#7A6268', marginBottom: '0.5rem', fontWeight: 600 }}>taste DNA</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {['#quiet luxury', '#cozy corner', '#rainy day', '#hidden gem', '#ritual'].map(t => (
              <span key={t} style={{ fontSize: '0.4rem', background: '#E5DDD6', borderRadius: 100, padding: '2px 6px', color: '#6E3B47', fontWeight: 600 }}>{t}</span>
            ))}
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
    title: 'scroll through taste.',
    desc: "not algorithms. not sponsored posts. just honest bites from people who eat the way you wish you could describe it.",
    reverse: false,
  },
  {
    type: 'map' as const,
    label: '02 / the map',
    title: 'your city, bitten.',
    desc: "every spot you've visited, every hidden gem, every quiet corner worth returning to. your palate, mapped.",
    reverse: true,
  },
  {
    type: 'profile' as const,
    label: '03 / taste DNA',
    title: 'all you.',
    desc: 'top 5 vibes. monthly recap capsule. your taste, evolving with every bite you log.',
    reverse: false,
  },
]

export default function FeatureHighlights() {
  return (
    <section style={{ background: '#FAF5F0', padding: '4rem 2rem' }}>
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
              alignItems: 'center',
              gap: '5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B8848F', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{f.label}</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#1A1015', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                {f.title}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#7A6268', lineHeight: 1.75, maxWidth: 400 }}>{f.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PhoneMockup type={f.type} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
