'use client'
import { motion } from 'framer-motion'

const VALUES = [
  {
    icon: '◎',
    title: 'save bites',
    desc: 'every cafe, every dish, every sip. your palate, captured exactly as you experienced it.',
  },
  {
    icon: '◇',
    title: 'own your taste',
    desc: 'no follower counts. no ratings. just your archive, growing more you with every entry.',
  },
  {
    icon: '⟡',
    title: 'discover through taste',
    desc: 'find people who eat like you think. your food twins are out there, somewhere, sipping the same thing.',
  },
]

export default function ValueStrip() {
  return (
    <section style={{ background: '#FAF5F0', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <span style={{ fontSize: '1.8rem', color: '#B8848F' }}>{v.icon}</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#6E3B47', letterSpacing: '-0.01em' }}>{v.title}</h3>
              <p style={{ fontSize: '1rem', color: '#7A6268', lineHeight: 1.7, fontWeight: 400 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
