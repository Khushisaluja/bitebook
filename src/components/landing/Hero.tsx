'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'

const BG_CARDS = [
  { top: '8%', left: '3%', rot: '-4deg', color: '#C4A0A8', label: 'Blue Tokai', dish: 'Ethiopian Pour Over', tag: '#quiet corner', w: 200 },
  { top: '15%', right: '4%', rot: '3deg', color: '#B8CBA8', label: 'Perch', dish: 'Burrata Toast', tag: '#soft luxury', w: 190 },
  { top: '55%', left: '2%', rot: '-2deg', color: '#D4B896', label: 'Kopi Klub', dish: 'Cold Brew Float', tag: '#golden hour', w: 180 },
  { top: '65%', right: '5%', rot: '5deg', color: '#A8B8C8', label: 'Suzette', dish: 'Salted Caramel Crêpe', tag: '#rainy day solo', w: 210 },
  { top: '30%', left: '6%', rot: '2deg', color: '#C8B8A8', label: 'Fig & Maple', dish: 'Ricotta Pancakes', tag: '#sunday slow', w: 175 },
  { top: '40%', right: '2%', rot: '-3deg', color: '#B8C4A8', label: 'Naaru', dish: 'Miso Ramen', tag: '#cozy corner', w: 195 },
  { top: '78%', left: '8%', rot: '4deg', color: '#C8A8B0', label: 'La Folie', dish: 'Pistachio Tart', tag: '#quiet luxury', w: 185 },
  { top: '20%', left: '45%', rot: '-1deg', color: '#D8C8B8', label: 'Smoke House', dish: 'Pulled Pork Slider', tag: '#late night', w: 165 },
]

const words = ['taste', 'has', 'a', 'memory.']

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#FAF5F0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 64,
      }}
    >
      {/* Floating background cards */}
      {BG_CARDS.map((card, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: card.top,
            left: card.left,
            right: (card as { right?: string }).right,
            width: card.w,
            background: card.color,
            borderRadius: 16,
            padding: '1rem',
            opacity: 0.55,
            transform: `rotate(${card.rot})`,
            animation: `float ${5 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
            ['--r' as string]: card.rot,
            boxShadow: '0 8px 32px rgba(26,16,21,0.08)',
          } as React.CSSProperties}
        >
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1A1015', opacity: 0.7, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {card.label}
          </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#1A1015', marginBottom: 8 }}>{card.dish}</p>
          <span style={{ fontSize: '0.65rem', background: 'rgba(26,16,21,0.1)', borderRadius: 100, padding: '2px 8px', color: '#1A1015', fontWeight: 500 }}>
            {card.tag}
          </span>
        </div>
      ))}

      {/* Hero content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1.5rem', maxWidth: 700 }}>
        {/* Headline with stagger */}
        <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#1A1015', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}>
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', color: word === 'memory.' ? '#6E3B47' : '#1A1015' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', fontWeight: 400, color: '#7A6268', lineHeight: 1.65, maxWidth: 500, margin: '0 auto 2.5rem' }}
        >
          a social food diary for those who eat with intention.
          <br />not reviews. not ratings. just you and your bites.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagneticButton>
            <Link
              href="/log"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                borderRadius: '100px',
                background: '#6E3B47',
                color: '#FAF5F0',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#4A2730')}
              onMouseLeave={e => (e.currentTarget.style.background = '#6E3B47')}
            >
              start your diary
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/feed"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2rem',
                borderRadius: '100px',
                background: 'transparent',
                color: '#6E3B47',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                border: '1.5px solid #6E3B47',
                letterSpacing: '0.02em',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(110,59,71,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              browse bites
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ position: 'absolute', bottom: '-15vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#B8848F', letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #B8848F, transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
