'use client'
import { useState } from 'react'
import FeedCard from '@/components/feed/FeedCard'

const FEED_MODES = ['hot', 'nearby', 'for you']

const MOCK_FEED = [
  {
    id: 1,
    user: { name: 'priya m.', handle: '@priya.eats', initials: 'PM' },
    timeAgo: '2h',
    cafe: 'Blue Tokai Coffee',
    dish: 'Ethiopian Pour Over',
    vibes: ['#rainy day solo', '#first sip ritual', '#quiet corner'],
    note: "the kind of coffee that makes you think you're in a wes anderson film. sat there for three hours and felt entirely like myself. the barista remembered my name.",
    likes: 47,
    colorHex: '#C4A0A8',
  },
  {
    id: 2,
    user: { name: 'arjun t.', handle: '@arjun_bites', initials: 'AT' },
    timeAgo: '5h',
    cafe: 'Naaru',
    dish: 'Truffle Ramen',
    vibes: ['#cozy corner', '#cold night comfort', '#worth the wait'],
    note: 'waited 40 minutes. would wait 80. the broth is what winter feels like when it is finally done being hard.',
    likes: 112,
    colorHex: '#8B8BA8',
  },
  {
    id: 3,
    user: { name: 'sara k.', handle: '@thequietfork', initials: 'SK' },
    timeAgo: '1d',
    cafe: 'Fig & Maple',
    dish: 'Ricotta Pancakes + Hibiscus Latte',
    vibes: ['#sunday slow', '#aesthetic brunch', '#golden hour'],
    note: 'the hibiscus latte is the color of sunset and tastes like a saturday that goes on forever. i have returned three times.',
    likes: 203,
    colorHex: '#D4A8B8',
  },
  {
    id: 4,
    user: { name: 'ruhan d.', handle: '@ruhan.explores', initials: 'RD' },
    timeAgo: '2d',
    cafe: 'Suzette',
    dish: 'Salted Caramel Crêpe',
    vibes: ['#hidden gem', '#late afternoon', '#solo dining'],
    note: "tucked in a lane that google maps almost doesn't believe in. the crêpe is paper thin and the filling to crêpe ratio is, frankly, unhinged (in the best way).",
    likes: 88,
    colorHex: '#D4B896',
  },
  {
    id: 5,
    user: { name: 'mira v.', handle: '@mira.eats', initials: 'MV' },
    timeAgo: '3d',
    cafe: 'Perch Wine Bar',
    dish: 'Burrata + Heirloom Tomato',
    vibes: ['#soft luxury', '#date night', '#quiet luxury'],
    note: 'the kind of place that makes you feel like you have figured something out about yourself. the burrata is improbably fresh. i did not want to leave.',
    likes: 176,
    colorHex: '#B8C4A8',
  },
]

export default function FeedPage() {
  const [mode, setMode] = useState('hot')

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', background: '#FAF5F0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1A1015', marginBottom: '1.75rem', letterSpacing: '-0.02em' }}>
          the feed
        </h1>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            position: 'sticky',
            top: 64,
            background: 'rgba(250,245,240,0.9)',
            backdropFilter: 'blur(12px)',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            zIndex: 100,
          }}
        >
          {FEED_MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 100,
                border: mode === m ? '1.5px solid #6E3B47' : '1.5px solid rgba(110,59,71,0.2)',
                background: mode === m ? '#6E3B47' : 'transparent',
                color: mode === m ? '#FAF5F0' : '#7A6268',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'none',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em',
                fontFamily: 'Satoshi, sans-serif',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {MOCK_FEED.map((card) => (
            <FeedCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </main>
  )
}
