'use client'
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
  { quote: "Finally a place where my food memories don't disappear into a camera roll.", handle: '@mira.eats', initials: 'ME' },
  { quote: "I found my food twin through Bitebook. We've been exploring the city together since.", handle: '@the_quiet_fork', initials: 'TF' },
  { quote: "It's less about the place and more about the feeling. Bitebook actually gets that.", handle: '@hungrypages', initials: 'HP' },
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function TiltCard({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const nx = (e.clientX - left - width / 2) / (width / 2)
    const ny = (e.clientY - top - height / 2) / (height / 2)
    el.style.transition = 'transform 0.06s ease'
    el.style.transform = `perspective(900px) rotateX(${-ny * 7}deg) rotateY(${nx * 7}deg) translateY(-4px) scale(1.02)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)'
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}

export default function SocialProof() {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(12400, 2, started)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: '#F0E6DC', padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          the proof is in the pudding
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 900, color: '#6E3B47', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {count.toLocaleString()}+
          </p>
          <p style={{ fontSize: '1.1rem', color: '#7A6268', fontWeight: 400, marginTop: '0.5rem', marginBottom: '4rem' }}>
            Bites logged across 24 cities — and counting 🫶
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <TiltCard>
                <div style={{
                  background: '#FAF5F0', borderRadius: 20, padding: '1.75rem',
                  boxShadow: '0 2px 20px rgba(110,59,71,0.06)',
                  height: '100%',
                }}>
                  <p style={{ fontSize: '1rem', color: '#1A1015', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: '#E5DDD6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 700, color: '#6E3B47',
                    }}>
                      {t.initials}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#6E3B47', fontWeight: 600 }}>{t.handle}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
