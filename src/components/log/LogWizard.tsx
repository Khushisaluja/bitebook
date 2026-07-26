'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { addBite } from '@/lib/bites'
import StarRating from '@/components/app/StarRating'
import Stars from '@/components/app/Stars'
import { asset } from '@/lib/asset'

const VIBE_TAGS = [
  'cozy corner', 'rainy day solo', 'quiet luxury', 'solo dining',
  'golden hour', 'first sip ritual', 'hidden gem', 'date night',
  'worth the wait', 'comfort food', 'window seat', 'treat yourself',
]

const SAMPLE_PHOTOS = [
  '/dishes/miso-ramen.jpg',
  '/dishes/ricotta-pancakes.jpg',
  '/dishes/pistachio-tart.jpg',
  '/dishes/burrata-toast.jpg',
  '/dishes/ethiopian-pour-over.jpg',
  '/dishes/salted-caramel-crepe.jpg',
]

const RATING_WORD: Record<string, string> = {
  '0': 'tap the stars',
  '0.5': 'a mistake, honestly',
  '1': 'would not return',
  '1.5': 'forgettable',
  '2': 'just fine',
  '2.5': 'has potential',
  '3': 'solid, no notes needed',
  '3.5': 'really good',
  '4': 'i keep thinking about it',
  '4.5': 'cross-town good',
  '5': 'a new personal legend',
}

const label: React.CSSProperties = {
  display: 'block', fontSize: '0.68rem', fontWeight: 700, color: '#B8848F',
  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem',
}
const input: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1.5px solid rgba(110,59,71,0.25)', padding: '0.5rem 0',
  fontSize: '1.15rem', fontFamily: 'Satoshi, sans-serif', color: '#1A1015',
  outline: 'none', fontWeight: 600,
}

const primaryBtn: React.CSSProperties = {
  flex: 1, padding: '0.85rem', borderRadius: 100, background: '#6E3B47',
  color: '#FAF5F0', fontFamily: 'Satoshi, sans-serif', fontWeight: 700,
  fontSize: '0.92rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease',
}
const ghostBtn: React.CSSProperties = {
  padding: '0.85rem 1.3rem', borderRadius: 100, background: 'transparent',
  border: '1.5px solid rgba(110,59,71,0.25)', color: '#7A6268',
  fontFamily: 'Satoshi, sans-serif', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
}

export default function LogWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [photo, setPhoto] = useState<string | undefined>(undefined)
  const [cafe, setCafe] = useState('')
  const [dish, setDish] = useState('')
  const [rating, setRating] = useState(0)
  const [vibes, setVibes] = useState<string[]>([])
  const [note, setNote] = useState('')
  const dir = useRef(1)

  const next = () => { dir.current = 1; setStep((s) => s + 1) }
  const prev = () => { dir.current = -1; setStep((s) => s - 1) }

  const toggleVibe = (t: string) =>
    setVibes((p) => (p.includes(t) ? p.filter((x) => x !== t) : p.length < 4 ? [...p, t] : p))

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setPhoto(URL.createObjectURL(f))
  }

  const submit = () => {
    addBite({ cafe, dish, rating, vibes, note, photo })
    confetti({ particleCount: 130, spread: 82, origin: { y: 0.55 }, colors: ['#6E3B47', '#E5DDD6', '#B8848F', '#FAF5F0', '#C4A0A8'] })
    setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.5 }, colors: ['#6E3B47', '#B8848F'] }), 280)
    setDone(true)
  }

  const reset = () => {
    setDone(false); setStep(0); setPhoto(undefined); setCafe(''); setDish(''); setRating(0); setVibes([]); setNote('')
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ padding: '2.5rem 1.4rem', textAlign: 'center' }}>
        <div className="bb-card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: '#C4A0A8' }} className="bb-photo-grain">
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(photo)} alt={dish} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,16,21,0.72), transparent 55%)' }} />
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, textAlign: 'left', color: '#FAF5F0' }}>
              <div style={{ marginBottom: 6 }}><Stars value={rating} size={16} color="#FAF5F0" muted="rgba(250,245,240,0.35)" /></div>
              <p style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1.1 }}>{dish}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>{cafe}</p>
            </div>
          </div>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6E3B47', marginBottom: '0.4rem' }}>logged.</h2>
        <p style={{ color: '#7A6268', fontSize: '0.92rem', marginBottom: '1.6rem', lineHeight: 1.55 }}>
          it&rsquo;s in your diary and on your map now. kept for you, shared with your circle.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Link href="/feed" style={{ ...primaryBtn, textDecoration: 'none', textAlign: 'center' }}>see it in your feed</Link>
          <button onClick={reset} style={{ ...ghostBtn, width: '100%' }}>log another</button>
        </div>
      </motion.div>
    )
  }

  const canNext = step === 0 ? Boolean(dish && cafe) : step === 1 ? rating > 0 : true

  return (
    <div style={{ padding: '0.5rem 1.4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* progress */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#6E3B47' : 'rgba(110,59,71,0.15)', transition: 'background 0.3s ease' }} />
        ))}
      </div>
      <p style={{ ...label, marginBottom: '1.4rem' }}>step {step + 1} of 3</p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: dir.current * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir.current * -32 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1 }}
        >
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.9rem' }}>
              <div>
                <label style={label}>the plate</label>
                <div style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
                  <label style={{ flexShrink: 0, width: 76, height: 76, borderRadius: 16, border: '1.5px dashed rgba(110,59,71,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: '#6E3B47', cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4Z" /><circle cx="12" cy="12.5" r="3.2" /></svg>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700 }}>add</span>
                    <input type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
                  </label>
                  {SAMPLE_PHOTOS.map((p) => (
                    <button key={p} type="button" onClick={() => setPhoto(p)} style={{ flexShrink: 0, width: 76, height: 76, borderRadius: 16, overflow: 'hidden', padding: 0, border: photo === p ? '2.5px solid #6E3B47' : '2.5px solid transparent', cursor: 'pointer', background: '#E5DDD6' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset(p)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={label}>what did you eat?</label>
                <input value={dish} onChange={(e) => setDish(e.target.value)} placeholder="the dish or drink" style={input}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#6E3B47')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(110,59,71,0.25)')} />
              </div>
              <div>
                <label style={label}>where?</label>
                <input value={cafe} onChange={(e) => setCafe(e.target.value)} placeholder="café or restaurant" style={input}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#6E3B47')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(110,59,71,0.25)')} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', paddingTop: '0.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <label style={label}>rate the plate, not the place</label>
                <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1015' }}>{dish || 'this bite'}</p>
              </div>
              <StarRating value={rating} onChange={setRating} size={44} />
              <motion.p key={rating} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '1rem', fontWeight: 600, color: rating ? '#6E3B47' : '#B8848F', fontStyle: 'italic', minHeight: 24 }}>
                {rating ? `“${RATING_WORD[String(rating)]}”` : RATING_WORD['0']}
              </motion.p>
              <div style={{ width: '100%' }}>
                <label style={{ ...label, textAlign: 'center' }}>the vibe · up to 4</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center' }}>
                  {VIBE_TAGS.map((t) => (
                    <button key={t} type="button" onClick={() => toggleVibe(t)} className="bb-chip" data-active={vibes.includes(t)}>#{t}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={label}>the why <span style={{ fontWeight: 500, textTransform: 'none', letterSpacing: 0, color: '#C4A0A8' }}>· {280 - note.length} left</span></label>
                <textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 280))} rows={4} placeholder="what made this worth remembering?"
                  style={{ ...input, border: '1.5px solid rgba(110,59,71,0.25)', borderRadius: 14, padding: '0.8rem', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, resize: 'none' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6E3B47')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(110,59,71,0.25)')} />
              </div>
              {/* live preview */}
              <div>
                <label style={label}>preview</label>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', background: '#F0E6DC', borderRadius: 18, padding: '0.85rem' }}>
                  <div style={{ width: 62, height: 62, borderRadius: 12, overflow: 'hidden', background: '#E5DDD6', flexShrink: 0 }}>
                    {photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={asset(photo)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1015', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dish || 'your dish'}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6E3B47', fontWeight: 600, marginBottom: 4 }}>{cafe || 'the place'}</p>
                    <Stars value={rating} size={13} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* footer nav */}
      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.6rem' }}>
        {step > 0 && <button onClick={prev} style={ghostBtn}>back</button>}
        {step < 2 ? (
          <button onClick={next} disabled={!canNext} style={{ ...primaryBtn, background: canNext ? '#6E3B47' : '#E5DDD6', color: canNext ? '#FAF5F0' : '#B8848F', cursor: canNext ? 'pointer' : 'not-allowed' }}>
            {step === 0 ? 'next' : 'almost there'}
          </button>
        ) : (
          <button onClick={submit} style={primaryBtn}>log this bite ✦</button>
        )}
      </div>
    </div>
  )
}
