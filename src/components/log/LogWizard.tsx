'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const VIBE_TAGS = [
  '#cozy corner', '#rainy day solo', '#quiet luxury', '#solo dining',
  '#golden hour', '#post-exam comfort', '#first sip ritual', '#hidden gem',
  '#late night cravings', '#aesthetic find', '#date night', '#monday blues cure',
  '#cold brew ritual', '#warm window seat', '#soft luxury',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1.5px solid rgba(110,59,71,0.25)',
  padding: '0.6rem 0',
  fontSize: '1.1rem',
  fontFamily: 'Satoshi, sans-serif',
  color: '#1A1015',
  outline: 'none',
  fontWeight: 500,
  transition: 'border-color 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  color: '#B8848F',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
}

export default function LogWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [cafe, setCafe] = useState('')
  const [dish, setDish] = useState('')
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [note, setNote] = useState('')
  const dir = useRef(1)

  const next = () => { dir.current = 1; setStep(s => s + 1) }
  const prev = () => { dir.current = -1; setStep(s => s - 1) }

  const toggleVibe = (tag: string) => {
    setSelectedVibes(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : prev.length < 5 ? [...prev, tag] : prev
    )
  }

  const submit = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#6E3B47', '#E5DDD6', '#B8848F', '#FAF5F0', '#C4A0A8'],
    })
    setTimeout(() => confetti({
      particleCount: 60,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#6E3B47', '#B8848F'],
    }), 300)
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', padding: '4rem 2rem' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#6E3B47', marginBottom: '0.75rem' }}>bite logged.</h2>
        <p style={{ color: '#7A6268', fontSize: '1rem', marginBottom: '2rem' }}>
          <em>{dish}</em> at {cafe} is now part of your story.
        </p>
        <button
          onClick={() => { setDone(false); setStep(0); setCafe(''); setDish(''); setSelectedVibes([]); setNote('') }}
          style={{
            background: 'none',
            border: '1.5px solid #6E3B47',
            color: '#6E3B47',
            padding: '0.6rem 1.5rem',
            borderRadius: 100,
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'none',
          }}
        >
          log another
        </button>
      </motion.div>
    )
  }

  const steps = [
    // Step 0: Where + What
    <div key="step0" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <label style={labelStyle}>where did you go?</label>
        <input
          value={cafe}
          onChange={e => setCafe(e.target.value)}
          placeholder="cafe or restaurant name"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderBottomColor = '#6E3B47')}
          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(110,59,71,0.25)')}
        />
      </div>
      <div>
        <label style={labelStyle}>what did you eat?</label>
        <input
          value={dish}
          onChange={e => setDish(e.target.value)}
          placeholder="dish or drink name"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderBottomColor = '#6E3B47')}
          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(110,59,71,0.25)')}
        />
      </div>
      <button
        onClick={next}
        disabled={!cafe || !dish}
        style={{
          alignSelf: 'flex-start',
          padding: '0.75rem 2rem',
          borderRadius: 100,
          background: !cafe || !dish ? '#E5DDD6' : '#6E3B47',
          color: !cafe || !dish ? '#B8848F' : '#FAF5F0',
          fontFamily: 'Satoshi, sans-serif',
          fontWeight: 600,
          fontSize: '0.9rem',
          border: 'none',
          cursor: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        next →
      </button>
    </div>,

    // Step 1: Vibe + Note
    <div key="step1" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <label style={labelStyle}>what was the vibe? (pick up to 5)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
          {VIBE_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleVibe(tag)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 100,
                border: '1.5px solid',
                borderColor: selectedVibes.includes(tag) ? '#6E3B47' : 'rgba(110,59,71,0.25)',
                background: selectedVibes.includes(tag) ? '#6E3B47' : 'transparent',
                color: selectedVibes.includes(tag) ? '#FAF5F0' : '#7A6268',
                fontSize: '0.78rem',
                fontFamily: 'Satoshi, sans-serif',
                fontWeight: 500,
                cursor: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={labelStyle}>
          capture the moment{' '}
          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            ({280 - note.length} left)
          </span>
        </label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value.slice(0, 280))}
          placeholder="what made this worth remembering?"
          rows={4}
          style={{
            ...inputStyle,
            borderBottom: 'none',
            border: '1.5px solid rgba(110,59,71,0.25)',
            borderRadius: 12,
            padding: '0.75rem',
            resize: 'none',
            lineHeight: 1.6,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#6E3B47')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(110,59,71,0.25)')}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={prev}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 100,
            background: 'transparent',
            border: '1.5px solid rgba(110,59,71,0.25)',
            color: '#7A6268',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'none',
          }}
        >
          ← back
        </button>
        <button
          onClick={next}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: 100,
            background: '#6E3B47',
            color: '#FAF5F0',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'none',
          }}
        >
          next →
        </button>
      </div>
    </div>,

    // Step 2: Confirm
    <div key="step2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ background: '#F0E6DC', borderRadius: 20, padding: '1.75rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          your bite
        </p>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1015', marginBottom: '0.25rem' }}>{dish}</h3>
        <p style={{ fontSize: '1rem', color: '#6E3B47', fontWeight: 600, marginBottom: '1rem' }}>{cafe}</p>
        {selectedVibes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {selectedVibes.map(v => (
              <span
                key={v}
                style={{ fontSize: '0.72rem', border: '1px solid rgba(110,59,71,0.3)', borderRadius: 100, padding: '2px 10px', color: '#6E3B47', fontWeight: 500 }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
        {note && (
          <p style={{ fontSize: '0.9rem', color: '#7A6268', lineHeight: 1.65, fontStyle: 'italic' }}>
            &ldquo;{note}&rdquo;
          </p>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={prev}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 100,
            background: 'transparent',
            border: '1.5px solid rgba(110,59,71,0.25)',
            color: '#7A6268',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'none',
          }}
        >
          ← back
        </button>
        <button
          onClick={submit}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: 100,
            background: '#6E3B47',
            color: '#FAF5F0',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'none',
            letterSpacing: '0.02em',
          }}
        >
          log this bite ✦
        </button>
      </div>
    </div>,
  ]

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2.5rem' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= step ? '#6E3B47' : 'rgba(110,59,71,0.15)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#B8848F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          step {step + 1} of 3
        </p>
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: dir.current * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir.current * -40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
