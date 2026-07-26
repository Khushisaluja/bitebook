'use client'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useBites } from '@/lib/bites'
import { MY_SEED_BITES } from '@/lib/seed'
import Stars from '@/components/app/Stars'
import { asset } from '@/lib/asset'

const TABS = ['diary', 'loved', 'by rating'] as const

interface GridItem {
  id: string
  dish: string
  cafe: string
  rating: number
  photo?: string
  color: string
  vibes: string[]
}

export default function ProfileView() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('diary')
  const myBites = useBites()

  const items: GridItem[] = useMemo(
    () => [
      ...myBites.map((b) => ({ id: b.id, dish: b.dish, cafe: b.cafe, rating: b.rating, photo: b.photo, color: b.colorHex, vibes: b.vibes })),
      ...MY_SEED_BITES.map((b) => ({ id: b.id, dish: b.dish, cafe: b.cafe, rating: b.rating, photo: b.photo, color: b.colorHex, vibes: b.vibes })),
    ],
    [myBites]
  )

  const places = new Set(items.map((i) => i.cafe)).size
  const avg = items.length ? items.reduce((s, i) => s + i.rating, 0) / items.length : 0
  const topDish = [...items].sort((a, b) => b.rating - a.rating)[0]
  const topVibe = useMemo(() => {
    const counts: Record<string, number> = {}
    items.forEach((i) => i.vibes.forEach((v) => (counts[v] = (counts[v] || 0) + 1)))
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'quiet luxury'
  }, [items])

  const tasteDNA = useMemo(() => {
    const counts: Record<string, number> = {}
    items.forEach((i) => i.vibes.forEach((v) => (counts[v] = (counts[v] || 0) + 1)))
    const derived = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([v]) => v)
    return [...new Set([...derived, 'quiet luxury', 'rainy day solo', 'cozy corner', 'hidden gem', 'first sip ritual'])].slice(0, 5)
  }, [items])

  const shown = useMemo(() => {
    if (tab === 'loved') return items.filter((i) => i.rating >= 4.5)
    if (tab === 'by rating') return [...items].sort((a, b) => b.rating - a.rating)
    return items
  }, [items, tab])

  const share = () => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.35 }, colors: ['#6E3B47', '#E0A458', '#B8848F', '#FAF5F0'] })
  }

  const stats: [string, string][] = [
    [String(items.length), 'bites'],
    [avg.toFixed(1), 'avg ★'],
    [String(places), 'places'],
    ['1', 'city'],
  ]

  return (
    <main style={{ minHeight: '100%', background: '#FAF5F0', paddingBottom: '1.5rem' }}>
      {/* cover */}
      <div style={{ height: 118, background: 'linear-gradient(135deg, #6E3B47 0%, #B8848F 60%, #D4B896 100%)', position: 'relative' }} className="bb-photo-grain">
        <button aria-label="settings" style={{ position: 'absolute', top: 12, right: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(250,245,240,0.85)', border: 'none', color: '#6E3B47', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" /></svg>
        </button>
      </div>

      <div style={{ padding: '0 1.1rem' }}>
        {/* avatar + name */}
        {/* positioned so it paints above the cover, which is position:relative */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: -34, marginBottom: '0.85rem' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#6E3B47', border: '4px solid #FAF5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: '#FAF5F0' }}>k</div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#1A1015' }}>khushi</h1>
          <p style={{ fontSize: '0.82rem', color: '#B8848F', fontWeight: 600 }}>@khushi.eats · mumbai</p>
          <p style={{ fontSize: '0.88rem', color: '#5C4A50', lineHeight: 1.55, marginTop: '0.35rem' }}>
            eating my way through the city, one careful bite at a time.
          </p>
        </div>

        {/* stats */}
        <div style={{ display: 'flex', gap: '1.4rem', paddingBottom: '1.1rem', borderBottom: '1px solid rgba(110,59,71,0.1)', marginBottom: '1.25rem' }}>
          {stats.map(([n, l]) => (
            <div key={l}>
              <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#6E3B47', lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: '0.72rem', color: '#7A6268', fontWeight: 600, marginTop: 3 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* shareable taste card: the viral artifact */}
        <div style={{ position: 'relative', borderRadius: 22, padding: '1.3rem', marginBottom: '1.4rem', overflow: 'hidden', background: 'linear-gradient(150deg, #4A2730 0%, #6E3B47 55%, #7E4553 100%)', color: '#FAF5F0' }} className="bb-photo-grain">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E9C9A0' }}>your taste · 2026</span>
            <button onClick={share} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(250,245,240,0.15)', border: 'none', color: '#FAF5F0', borderRadius: 100, padding: '5px 11px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M16 6l-4-4-4 4M12 2v14" /></svg>
              share
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 0.6rem' }}>
            <div>
              <p style={{ fontSize: '1.7rem', fontWeight: 900, lineHeight: 1 }}>{items.length}</p>
              <p style={{ fontSize: '0.66rem', opacity: 0.72, fontWeight: 600, marginTop: 3 }}>bites remembered</p>
            </div>
            <div>
              <p style={{ fontSize: '1.7rem', fontWeight: 900, lineHeight: 1, display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>{avg.toFixed(1)}<span style={{ fontSize: '0.9rem', color: '#E9C9A0' }}>★</span></p>
              <p style={{ fontSize: '0.66rem', opacity: 0.72, fontWeight: 600, marginTop: 3 }}>you rate generously</p>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.15 }}>#{topVibe}</p>
              <p style={{ fontSize: '0.66rem', opacity: 0.72, fontWeight: 600, marginTop: 3 }}>your signature vibe</p>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topDish?.dish ?? 'nothing yet'}</p>
              <p style={{ fontSize: '0.66rem', opacity: 0.72, fontWeight: 600, marginTop: 3 }}>top of the year</p>
            </div>
          </div>
        </div>

        {/* taste DNA */}
        <p className="bb-eyebrow" style={{ marginBottom: '0.7rem' }}>taste DNA</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
          {tasteDNA.map((t, i) => (
            <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              style={{ fontSize: '0.78rem', border: '1.5px solid #6E3B47', borderRadius: 100, padding: '0.3rem 0.85rem', color: '#6E3B47', fontWeight: 600 }}>
              #{t}
            </motion.span>
          ))}
        </div>

        {/* diary tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {TABS.map((t) => (
            <button key={t} className="bb-chip" data-active={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#B8848F', fontSize: '0.85rem', padding: '2rem 0' }}>
            nothing here yet. log a bite you loved.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {shown.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 8) * 0.05 }}
                style={{ borderRadius: 16, overflow: 'hidden' }} className="bb-card">
                <div style={{ position: 'relative', aspectRatio: '1', background: b.color }} className="bb-photo-grain">
                  {b.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(b.photo)} alt={b.dish} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', bottom: 7, left: 7, background: 'rgba(250,245,240,0.92)', borderRadius: 100, padding: '2px 7px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Stars value={b.rating} size={10} />
                  </div>
                </div>
                <div style={{ padding: '0.55rem 0.65rem 0.7rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1A1015', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dish}</p>
                  <p style={{ fontSize: '0.7rem', color: '#6E3B47', fontWeight: 500 }}>{b.cafe}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* data portability wedge */}
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', marginTop: '1.4rem', padding: '0.75rem', borderRadius: 14, border: '1.5px solid rgba(110,59,71,0.18)', background: 'transparent', color: '#7A6268', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M8 11l4 4 4-4M4 21h16" /></svg>
          export your diary · always yours (CSV / JSON)
        </button>
      </div>
    </main>
  )
}
