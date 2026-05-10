'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const ENTRIES = [
  { emoji: '☕', place: 'Blue Tokai', dish: 'Ethiopian Pour Over', date: '12 mar', tag: '#quiet corner', note: 'sat here for 3 hours. just existing.', bg: '#FBF0E6', rot: -2 },
  { emoji: '🍜', place: 'Naaru', dish: 'Miso Ramen', date: '8 mar', tag: '#cozy corner', note: 'the broth felt like a hug', bg: '#EBF0F7', rot: 1.5 },
  { emoji: '🥑', place: 'Perch', dish: 'Burrata Toast', date: '5 mar', tag: '#soft luxury', note: 'aesthetic. and actually good.', bg: '#EEF6EA', rot: -1 },
  { emoji: '🍰', place: 'La Folie', dish: 'Pistachio Tart', date: '28 feb', tag: '#quiet luxury', note: 'worth every rupee. no regrets.', bg: '#F5EAF4', rot: 2 },
  { emoji: '🥞', place: 'Fig & Maple', dish: 'Ricotta Pancakes', date: '23 feb', tag: '#sunday slow', note: 'the kind of sunday that resets you', bg: '#FBF4E5', rot: -1.5 },
  { emoji: '🧋', place: 'Kopi Klub', dish: 'Cold Brew Float', date: '18 feb', tag: '#golden hour', note: 'ordered twice. no shame.', bg: '#F1EDDF', rot: 0.5 },
  { emoji: '🥐', place: 'Bombay Baking Co.', dish: 'Almond Croissant', date: '10 feb', tag: '#ritual', note: 'tuesday routine, officially unlocked', bg: '#FAF1E5', rot: -2.5 },
  { emoji: '🫖', place: 'Chaayos', dish: 'Masala Chai', date: '3 feb', tag: '#everyday magic', note: 'the chai that stopped time', bg: '#F6EDE1', rot: 1 },
  { emoji: '🍷', place: 'Suzette', dish: 'Crêpe Caramel', date: '28 jan', tag: '#rainy day', note: 'window seat. watched the rain.', bg: '#EDE8F6', rot: -0.5 },
]

export default function DiaryGrid() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ background: '#F7F2EC', padding: '7rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            your diary
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 900,
            color: '#1A1015', letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            Every Bite,{' '}
            <span style={{ color: '#6E3B47', fontStyle: 'italic' }}>Remembered.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#9A8288', fontWeight: 400, marginTop: '0.5rem' }}>
            Hover over a page.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                opacity: hovered === null ? 1 : hovered === i ? 1 : 0.5,
                scale: hovered === i ? 1.04 : 1,
                rotate: hovered === i ? entry.rot * -0.6 : entry.rot,
                y: hovered === i ? -8 : 0,
                boxShadow: hovered === i
                  ? '0 16px 48px rgba(26,16,21,0.14)'
                  : '0 2px 12px rgba(26,16,21,0.05)',
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: entry.bg, borderRadius: 14, padding: '1.4rem', position: 'relative', overflow: 'hidden', cursor: 'default' }}
            >
              {/* Diary lines */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(110,59,71,0.065) 27px, rgba(110,59,71,0.065) 28px)',
              }} />
              {/* Margin line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 28, width: 1, background: 'rgba(200,100,110,0.15)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem', position: 'relative' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 2 }}>
                  {entry.date}
                </span>
                <motion.span
                  animate={{ y: hovered === i ? -4 : 0, scale: hovered === i ? 1.15 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '2rem', lineHeight: 1, display: 'block' }}
                >
                  {entry.emoji}
                </motion.span>
              </div>

              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {entry.place}
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1015', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: '0.65rem' }}>
                  {entry.dish}
                </p>
                <p style={{ fontSize: '0.72rem', color: '#7A6268', fontStyle: 'italic', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {entry.note}
                </p>
                <span style={{ display: 'inline-block', fontSize: '0.6rem', fontWeight: 700, background: 'rgba(110,59,71,0.1)', color: '#6E3B47', borderRadius: 100, padding: '3px 10px', letterSpacing: '0.03em' }}>
                  {entry.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.85rem', color: '#9A8288', fontWeight: 500 }}
        >
          12,400+ entries logged. Yours is next.
        </motion.p>
      </div>
    </section>
  )
}
