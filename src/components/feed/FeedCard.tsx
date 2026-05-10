'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface FeedCardProps {
  id: number
  user: { name: string; handle: string; initials: string }
  timeAgo: string
  cafe: string
  dish: string
  vibes: string[]
  note: string
  likes: number
  colorHex: string
}

export default function FeedCard({ user, timeAgo, cafe, dish, vibes, note, likes: initialLikes, colorHex }: FeedCardProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [animating, setAnimating] = useState(false)

  const handleLike = () => {
    setLiked(prev => !prev)
    setLikes(prev => liked ? prev - 1 : prev + 1)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#FAF5F0',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 2px 24px rgba(110,59,71,0.07)',
        border: '1px solid rgba(110,59,71,0.06)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem 0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#E5DDD6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: '#6E3B47' }}>
            {user.initials}
          </div>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1015' }}>{user.name}</p>
            <p style={{ fontSize: '0.75rem', color: '#7A6268' }}>{user.handle}</p>
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#B8848F' }}>{timeAgo}</span>
      </div>

      {/* Photo */}
      <div style={{ position: 'relative', paddingTop: '125%', background: colorHex }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(26,16,21,0.4))' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <span style={{ background: 'rgba(250,245,240,0.9)', borderRadius: 100, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 600, color: '#6E3B47', backdropFilter: 'blur(8px)' }}>
            {cafe}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1015', marginBottom: '0.6rem' }}>{dish}</p>

        {/* Vibe tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
          {vibes.map((v) => (
            <span key={v} style={{ fontSize: '0.72rem', border: '1px solid rgba(110,59,71,0.3)', borderRadius: 100, padding: '2px 10px', color: '#6E3B47', fontWeight: 500 }}>
              {v}
            </span>
          ))}
        </div>

        {/* Note */}
        <p style={{ fontSize: '0.9rem', color: '#7A6268', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {note}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={handleLike}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              fontSize: '1.25rem',
              cursor: 'none',
              animation: animating ? 'heartBeat 0.5s ease' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'transform 0.1s ease',
              color: liked ? '#6E3B47' : '#1A1015',
            }}
          >
            {liked ? '♥' : '♡'}
          </button>
          <span style={{ fontSize: '0.82rem', color: '#7A6268', fontWeight: 500 }}>{likes.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  )
}
