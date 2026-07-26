'use client'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import FeedCard, { type FeedCardProps } from '@/components/feed/FeedCard'
import { useBites, timeAgo } from '@/lib/bites'
import { SEED_BITES, MY_SEED_BITES, ME } from '@/lib/seed'
import { asset } from '@/lib/asset'

const SORTS = ['recent', 'top rated', 'from you'] as const
type Sort = (typeof SORTS)[number]

export default function FeedPage() {
  const [sort, setSort] = useState<Sort>('recent')
  const myBites = useBites()

  const cards = useMemo(() => {
    const mine: (FeedCardProps & { order: number })[] = [
      ...myBites.map((b, i) => ({
        id: b.id,
        user: ME,
        timeAgo: timeAgo(b.createdAt),
        cafe: b.cafe,
        dish: b.dish,
        rating: b.rating,
        vibes: b.vibes,
        note: b.note || 'logged a bite.',
        likes: b.likes,
        photo: b.photo,
        colorHex: b.colorHex,
        mine: true,
        order: i,
      })),
      ...MY_SEED_BITES.map((b, i) => ({
        id: b.id,
        user: ME,
        timeAgo: b.timeAgo,
        cafe: b.cafe,
        dish: b.dish,
        rating: b.rating,
        vibes: b.vibes,
        note: b.note,
        likes: b.likes,
        photo: b.photo,
        colorHex: b.colorHex,
        mine: true,
        order: myBites.length + i,
      })),
    ]
    const friends: (FeedCardProps & { order: number })[] = SEED_BITES.map((b, i) => ({
      id: b.id,
      user: b.user,
      timeAgo: b.timeAgo,
      cafe: b.cafe,
      dish: b.dish,
      rating: b.rating,
      vibes: b.vibes,
      note: b.note,
      likes: b.likes,
      photo: b.photo,
      colorHex: b.colorHex,
      mine: false,
      order: 100 + i,
    }))

    if (sort === 'from you') return mine
    const all = [...mine, ...friends]
    if (sort === 'top rated') return [...all].sort((a, b) => b.rating - a.rating || b.likes - a.likes)
    return [...all].sort((a, b) => a.order - b.order) // recent
  }, [myBites, sort])

  return (
    <main style={{ minHeight: '100%', background: '#FAF5F0', paddingBottom: '1.5rem' }}>
      {/* header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(250,245,240,0.9)', backdropFilter: 'blur(14px)', padding: '0.5rem 1.1rem 0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src={asset("/bitebook-submark.png")} alt="bitebook" width={26} height={26} style={{ objectFit: 'contain' }} />
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1015' }}>feed</h1>
          </div>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6E3B47', background: '#F0E6DC', borderRadius: 100, padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6E3B47' }} />
            8 friends
          </span>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#B8848F', marginTop: 3 }}>
          only the people you trust. no strangers, no leaderboards.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem' }}>
          {SORTS.map((s) => (
            <button key={s} className="bb-chip" data-active={sort === s} onClick={() => setSort(s)}>
              {s}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: '1rem 1.1rem 0' }}>
        {cards.map((c) => (
          <FeedCard key={c.id} {...c} />
        ))}
      </div>
    </main>
  )
}
