'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Stars from '@/components/app/Stars'
import { useLikedIds, toggleLike } from '@/lib/bites'
import { asset } from '@/lib/asset'

export interface FeedCardProps {
  id: string | number
  user: { name: string; handle: string; initials: string }
  timeAgo: string
  cafe: string
  dish: string
  rating: number
  vibes: string[]
  note: string
  likes: number
  photo?: string
  colorHex: string
  mine?: boolean
}

export default function FeedCard({
  id,
  user,
  timeAgo,
  cafe,
  dish,
  rating,
  vibes,
  note,
  likes: initialLikes,
  photo,
  colorHex,
  mine,
}: FeedCardProps) {
  const likedIds = useLikedIds()
  const liked = likedIds.includes(String(id))
  const likes = initialLikes + (liked ? 1 : 0)
  const [animating, setAnimating] = useState(false)

  const handleLike = () => {
    toggleLike(String(id))
    if (!liked) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 600)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bb-card"
      style={{ overflow: 'hidden' }}
    >
      {/* author */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem 0.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: mine ? '#6E3B47' : '#E5DDD6', color: mine ? '#FAF5F0' : '#6E3B47', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900 }}>
            {user.initials}
          </div>
          <div style={{ lineHeight: 1.25 }}>
            <p style={{ fontSize: '0.83rem', fontWeight: 700, color: '#1A1015' }}>
              {user.name}
              {mine && <span style={{ color: '#B8848F', fontWeight: 600 }}> · you</span>}
            </p>
            <p style={{ fontSize: '0.72rem', color: '#B8848F' }}>{cafe}</p>
          </div>
        </div>
        <span style={{ fontSize: '0.72rem', color: '#B8848F' }}>{timeAgo}</span>
      </header>

      {/* photo */}
      <div className="bb-photo-grain" style={{ position: 'relative', aspectRatio: '4 / 5', background: colorHex }}>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(photo)} alt={dish} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,16,21,0.5) 0%, transparent 42%)' }} />
        {/* rating chip */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(250,245,240,0.94)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '5px 11px' }}>
          <Stars value={rating} size={13} />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6E3B47' }}>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* body */}
      <div style={{ padding: '0.95rem 1rem 1.1rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1A1015', letterSpacing: '-0.01em', marginBottom: '0.55rem' }}>{dish}</h3>

        {vibes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.7rem' }}>
            {vibes.map((v) => (
              <span key={v} style={{ fontSize: '0.7rem', border: '1px solid rgba(110,59,71,0.28)', borderRadius: 100, padding: '2px 9px', color: '#6E3B47', fontWeight: 500 }}>
                #{v}
              </span>
            ))}
          </div>
        )}

        {note && (
          <p style={{ fontSize: '0.88rem', color: '#5C4A50', lineHeight: 1.6 }}>{note}</p>
        )}

        {/* actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.95rem', color: '#7A6268' }}>
          <button
            onClick={handleLike}
            aria-pressed={liked}
            aria-label="like"
            style={{ background: 'none', border: 'none', padding: '0.3rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', animation: animating ? 'heartBeat 0.5s ease' : 'none' }}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill={liked ? '#6E3B47' : 'none'} stroke={liked ? '#6E3B47' : '#7A6268'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8.5 2A9.8 9.8 0 0 1 12 20.5Z" />
            </svg>
          </button>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: 20 }}>{likes.toLocaleString()}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#B8848F', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 21v-5a8 8 0 1 1 16 0v5" /><path d="M2 21h20" />
            </svg>
            friends only
          </span>
        </div>
      </div>
    </motion.article>
  )
}
