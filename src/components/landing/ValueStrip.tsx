'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const VALUES = [
  {
    icon: '🔖',
    title: 'Save Bites',
    desc: 'Every café, every dish, every sip — your palate, archived. Because good food deserves better than a blurry camera roll and a forgotten voice note to self.',
  },
  {
    icon: '🫀',
    title: 'Own Your Taste',
    desc: 'No follower counts. No star ratings. Just your archive, getting more you with every entry. Main character energy, fully unlocked.',
  },
  {
    icon: '🤝',
    title: 'Find Your Food Twin',
    desc: "Your taste DNA is out there, vibing with strangers. Find people who eat like you think — they're sipping the same obscure pour-over, somewhere.",
  },
]

export default function ValueStrip() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '0.72rem', fontWeight: 700, color: '#B8848F',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '3rem', textAlign: 'center',
          }}
        >
          what&apos;s cooking
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  background: hovered === i ? 'rgba(250,245,240,0.92)' : 'rgba(250,245,240,0)',
                  borderRadius: 20, padding: '1.75rem',
                  border: `1px solid ${hovered === i ? 'rgba(110,59,71,0.12)' : 'transparent'}`,
                  transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hovered === i ? '0 16px 48px rgba(110,59,71,0.12)' : 'none',
                  transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}
              >
                <motion.span
                  animate={{
                    scale: hovered === i ? 1.25 : 1,
                    rotate: hovered === i ? 12 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: '2rem', display: 'inline-block', width: 'fit-content' }}
                >
                  {v.icon}
                </motion.span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#6E3B47', letterSpacing: '-0.01em' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#7A6268', lineHeight: 1.7, fontWeight: 400 }}>
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
