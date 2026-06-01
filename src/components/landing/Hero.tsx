'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Cards live ONLY in the left/right gutters (no center column) so they never
// collide with the centered hero text. They flip on hover to reveal a photo
// of the dish from /public/dishes/<slug>.jpg.
const BG_CARDS = [
  // left gutter
  { top: '9%',  left: '2%',   rot: '-4deg', color: '#C4A0A8', label: 'Blue Tokai',  dish: 'Ethiopian Pour Over',   tag: '#quiet corner',  slug: 'ethiopian-pour-over',   w: 198, h: 150 },
  { top: '33%', left: '4.5%', rot: '2deg',  color: '#C8B8A8', label: 'Fig & Maple',  dish: 'Ricotta Pancakes',      tag: '#sunday slow',   slug: 'ricotta-pancakes',      w: 178, h: 144 },
  { top: '56%', left: '1.5%', rot: '-2deg', color: '#D4B896', label: 'Kopi Klub',    dish: 'Cold Brew Float',       tag: '#golden hour',   slug: 'cold-brew-float',       w: 184, h: 148 },
  { top: '79%', left: '6%',   rot: '4deg',  color: '#C8A8B0', label: 'La Folie',     dish: 'Pistachio Tart',        tag: '#quiet luxury',  slug: 'pistachio-tart',        w: 170, h: 140 },
  // right gutter
  { top: '13%', right: '3%',   rot: '3deg',  color: '#B8CBA8', label: 'Perch',        dish: 'Burrata Toast',         tag: '#soft luxury',   slug: 'burrata-toast',         w: 190, h: 148 },
  { top: '37%', right: '1.5%', rot: '-3deg', color: '#B8C4A8', label: 'Naaru',        dish: 'Miso Ramen',            tag: '#cozy corner',   slug: 'miso-ramen',            w: 194, h: 150 },
  { top: '60%', right: '5%',   rot: '5deg',  color: '#A8B8C8', label: 'Suzette',      dish: 'Salted Caramel Crêpe',  tag: '#rainy day solo',slug: 'salted-caramel-crepe',  w: 182, h: 146 },
  { top: '81%', right: '2.5%', rot: '-1deg', color: '#D8C8B8', label: 'Smoke House',  dish: 'Pulled Pork Slider',    tag: '#late night',    slug: 'pulled-pork-slider',    w: 168, h: 140 },
]

const PUNS = [
  'fork yeah 🍴',
  'sip. log. devour.',
  'no crumb left behind 🍞',
  'eat first, caption later',
  'spilling the (chai) tea ☕',
  'bite me (the app) 😋',
]

const words = ['Taste', 'Has', 'a', 'Memory.']

// Photo for the flipped card back. Uses next/image so the GitHub Pages
// basePath is prepended automatically. Tries common extensions, then
// gracefully unmounts (revealing the colour + caption underneath) if the
// photo hasn't been added to /public/dishes yet.
const DISH_EXTS = ['jpg', 'png', 'jpeg', 'webp']
function DishPhoto({ slug, alt }: { slug: string; alt: string }) {
  const [extIdx, setExtIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <Image
      className="bb-flip-photo"
      src={`/dishes/${slug}.${DISH_EXTS[extIdx]}`}
      alt={alt}
      fill
      sizes="200px"
      style={{ objectFit: 'cover' }}
      onError={() => {
        if (extIdx < DISH_EXTS.length - 1) setExtIdx(extIdx + 1)
        else setFailed(true)
      }}
    />
  )
}

function PunBadge() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % PUNS.length)
        setShow(true)
      }, 280)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -5 }}
      transition={{ duration: 0.22 }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        background: 'rgba(110,59,71,0.07)',
        border: '1px solid rgba(110,59,71,0.18)',
        borderRadius: 100, padding: '0.35rem 1rem',
        fontSize: '0.78rem', fontWeight: 600, color: '#6E3B47',
        marginBottom: '1.75rem', letterSpacing: '0.02em',
        minWidth: 180, justifyContent: 'center',
      }}
    >
      {PUNS[idx]}
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const section = sectionRef.current
      const content = contentRef.current
      if (!section || !content) return
      const { left, top, width, height } = section.getBoundingClientRect()
      const nx = (e.clientX - left) / width - 0.5
      const ny = (e.clientY - top) / height - 0.5
      content.style.transform = `translate(${nx * -14}px, ${ny * -10}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', paddingTop: 64,
      }}
    >
      {/* Floating flip cards — left/right gutters only. Hover flips to a dish photo. */}
      <div className="bb-hero-cards" aria-hidden="true">
        {BG_CARDS.map((card, i) => (
          <div
            key={i}
            className="bb-flip-trigger"
            tabIndex={0}
            style={{
              position: 'absolute',
              top: card.top, left: card.left,
              right: (card as { right?: string }).right,
              width: card.w, height: card.h,
              transform: `rotate(${card.rot})`,
              animation: `float ${5 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
              ['--r' as string]: card.rot,
            } as React.CSSProperties}
          >
            <div className="bb-flip">
              {/* FRONT — restaurant / dish / tag */}
              <div
                className="bb-flip-face"
                style={{
                  background: card.color,
                  padding: '1rem',
                  boxShadow: '0 8px 32px rgba(26,16,21,0.10)',
                }}
              >
                <span className="bb-flip-hint">↺</span>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1A1015', opacity: 0.7, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {card.label}
                </p>
                <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1A1015', marginBottom: 10 }}>{card.dish}</p>
                <span style={{ fontSize: '0.65rem', background: 'rgba(26,16,21,0.1)', borderRadius: 100, padding: '2px 8px', color: '#1A1015', fontWeight: 500 }}>
                  {card.tag}
                </span>
              </div>

              {/* BACK — dish photo (falls back to colour + caption if missing) */}
              <div
                className="bb-flip-face bb-flip-back"
                style={{
                  background: card.color,
                  boxShadow: '0 14px 40px rgba(26,16,21,0.22)',
                }}
              >
                <DishPhoto slug={card.slug} alt={card.dish} />
                <div className="bb-flip-caption">
                  <p style={{ fontSize: '0.62rem', fontWeight: 700, opacity: 0.8, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2 }}>{card.dish}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero content — parallax moves opposite cursor */}
      <div
        ref={contentRef}
        style={{
          textAlign: 'center', position: 'relative', zIndex: 10,
          padding: '0 1.5rem', maxWidth: 700,
          transition: 'transform 0.12s ease-out', willChange: 'transform',
        }}
      >
        <PunBadge />

        <h1 style={{
          fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', fontWeight: 900,
          lineHeight: 1.0, letterSpacing: '-0.03em', color: '#1A1015',
          marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap',
          gap: '0.25em', justifyContent: 'center',
        }}>
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', color: word === 'Memory.' ? '#6E3B47' : '#1A1015' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', fontWeight: 400,
            color: '#7A6268', lineHeight: 1.65, maxWidth: 500,
            margin: '0 auto 2.5rem',
          }}
        >
          A social food diary for those who eat with intention.
          <br />Not reviews. Not ratings. Just you, your bites, and the occasional second order.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/log"
            style={{
              display: 'inline-block', padding: '0.85rem 2rem',
              borderRadius: '100px', background: '#6E3B47',
              color: '#FAF5F0', fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none', letterSpacing: '0.02em',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4A2730'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(110,59,71,0.38)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6E3B47'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            Start Your Diary
          </Link>
          <Link
            href="/feed"
            style={{
              display: 'inline-block', padding: '0.85rem 2rem',
              borderRadius: '100px', background: 'transparent',
              color: '#6E3B47', fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none', border: '1.5px solid #6E3B47',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(110,59,71,0.07)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = '' }}
          >
            Browse Bites
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '-15vh', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
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
