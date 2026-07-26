'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWants, addWant, removeWant } from '@/lib/bites'
import { MY_LISTS, SEED_BITES } from '@/lib/seed'
import Stars from '@/components/app/Stars'
import { asset } from '@/lib/asset'

const TABS = ['want to try', 'my lists'] as const

export default function ListsView() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('want to try')
  const [adding, setAdding] = useState(false)
  const [dish, setDish] = useState('')
  const [cafe, setCafe] = useState('')
  const [reason, setReason] = useState('')
  const wants = useWants()

  const byId = useMemo(() => Object.fromEntries(SEED_BITES.map((b) => [b.id, b])), [])

  const save = () => {
    if (!dish || !cafe) return
    addWant({ dish, cafe, reason })
    setDish(''); setCafe(''); setReason(''); setAdding(false)
  }

  return (
    <main style={{ minHeight: '100%', background: '#FAF5F0', paddingBottom: '1.5rem' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(250,245,240,0.9)', backdropFilter: 'blur(14px)', padding: '0.55rem 1.1rem 0.7rem' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1015', marginBottom: '0.55rem' }}>lists</h1>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {TABS.map((t) => (
            <button key={t} className="bb-chip" data-active={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
      </header>

      <div style={{ padding: '1rem 1.1rem 0' }}>
        {tab === 'want to try' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {/* add */}
            {adding ? (
              <div className="bb-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <input value={dish} onChange={(e) => setDish(e.target.value)} placeholder="dish you want to try" style={fieldStyle} autoFocus />
                <input value={cafe} onChange={(e) => setCafe(e.target.value)} placeholder="where" style={fieldStyle} />
                <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="why / who recommended it (optional)" style={fieldStyle} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={save} style={{ flex: 1, padding: '0.6rem', borderRadius: 100, background: '#6E3B47', color: '#FAF5F0', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>add</button>
                  <button onClick={() => setAdding(false)} style={{ padding: '0.6rem 1rem', borderRadius: 100, background: 'transparent', color: '#7A6268', border: '1.5px solid rgba(110,59,71,0.2)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '0.85rem', borderRadius: 16, border: '1.5px dashed rgba(110,59,71,0.35)', background: 'transparent', color: '#6E3B47', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                add somewhere to try
              </button>
            )}

            <AnimatePresence initial={false}>
              {wants.map((w) => (
                <motion.div
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: -12, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bb-card"
                  style={{ padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1A1015' }}>{w.dish}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6E3B47', fontWeight: 600 }}>{w.cafe}</p>
                    {w.reason && <p style={{ fontSize: '0.75rem', color: '#B8848F', fontStyle: 'italic', marginTop: 2 }}>{w.reason}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => removeWant(w.id)} title="mark as eaten" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FAF5F0', background: '#6E3B47', border: 'none', borderRadius: 100, padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                      ✓ ate it
                    </button>
                    <button onClick={() => removeWant(w.id)} title="remove" style={{ fontSize: '0.68rem', color: '#B8848F', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>remove</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {wants.length === 0 && (
              <p style={{ textAlign: 'center', color: '#B8848F', fontSize: '0.85rem', padding: '2.5rem 1rem', lineHeight: 1.6 }}>
                nothing on the list, and that&rsquo;s a good sign.<br />you&rsquo;ve eaten everywhere you meant to.
              </p>
            )}
            <p style={{ fontSize: '0.72rem', color: '#C4A0A8', textAlign: 'center', marginTop: '0.5rem' }}>
              marking a spot as eaten clears it from here, just like crossing it off.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MY_LISTS.map((list) => {
              const bites = list.biteIds.map((id) => byId[id]).filter(Boolean)
              const avg = bites.reduce((s, b) => s + b.rating, 0) / (bites.length || 1)
              return (
                <div key={list.id} className="bb-card" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', height: 118 }}>
                    {bites.slice(0, 3).map((b) => (
                      <div key={b.id} style={{ flex: 1, position: 'relative' }} className="bb-photo-grain">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset(b.photo)} alt={b.dish} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '0.9rem 1rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#1A1015' }}>{list.title}</h3>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Stars value={avg} size={12} /><span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6E3B47' }}>{avg.toFixed(1)}</span></span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#7A6268', marginTop: 2 }}>{list.blurb}</p>
                    <p style={{ fontSize: '0.7rem', color: '#B8848F', marginTop: 6 }}>{bites.length} places</p>
                  </div>
                </div>
              )
            })}
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '0.85rem', borderRadius: 16, border: '1.5px dashed rgba(110,59,71,0.35)', background: 'transparent', color: '#6E3B47', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              start a new list
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

const fieldStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1.5px solid rgba(110,59,71,0.2)', padding: '0.4rem 0',
  fontSize: '0.95rem', fontFamily: 'Satoshi, sans-serif', color: '#1A1015', outline: 'none', fontWeight: 500,
}
