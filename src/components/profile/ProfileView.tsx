'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const TASTE_DNA = ['#quiet luxury', '#rainy day solo', '#cozy corner', '#hidden gem', '#first sip ritual']

const BITES = [
  { dish: 'Ethiopian Pour Over', cafe: 'Blue Tokai', color: '#C4A0A8' },
  { dish: 'Truffle Ramen', cafe: 'Naaru', color: '#8B8BA8' },
  { dish: 'Ricotta Pancakes', cafe: 'Fig & Maple', color: '#D4A8B8' },
  { dish: 'Salted Caramel Crêpe', cafe: 'Suzette', color: '#D4B896' },
  { dish: 'Burrata Toast', cafe: 'Perch', color: '#B8C4A8' },
  { dish: 'Pistachio Tart', cafe: 'La Folie', color: '#C8B8D8' },
]

const TABS = ['all bites', 'favorites', 'cafes']

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState('all bites')

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
      {/* Cover */}
      <div
        style={{
          height: 160,
          borderRadius: '0 0 24px 24px',
          background: 'linear-gradient(135deg, #B8848F 0%, #E5DDD6 100%)',
          marginBottom: '-36px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            borderRadius: 'inherit',
          }}
        />
      </div>

      {/* Avatar */}
      <div style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#6E3B47',
            border: '4px solid #FAF5F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            fontWeight: 900,
            color: '#FAF5F0',
          }}
        >
          k
        </div>
      </div>

      {/* Name + Bio */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1015', letterSpacing: '-0.02em' }}>khushi</h1>
        <p style={{ fontSize: '0.88rem', color: '#B8848F', fontWeight: 500, marginBottom: '0.5rem' }}>@khushi.eats</p>
        <p style={{ fontSize: '0.95rem', color: '#7A6268', lineHeight: 1.6 }}>
          eating my way through the city, one careful bite at a time.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(110,59,71,0.1)' }}>
        {[['127', 'bites'], ['34', 'cafes'], ['8', 'cities']].map(([n, l]) => (
          <div key={l}>
            <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#6E3B47', lineHeight: 1 }}>{n}</p>
            <p style={{ fontSize: '0.78rem', color: '#7A6268', fontWeight: 500, marginTop: 2 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Taste DNA */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>taste DNA</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {TASTE_DNA.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              style={{
                fontSize: '0.82rem',
                border: '1.5px solid #6E3B47',
                borderRadius: 100,
                padding: '0.35rem 1rem',
                color: '#6E3B47',
                fontWeight: 600,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Monthly Capsule */}
      <div style={{ background: '#F0E6DC', borderRadius: 20, padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B8848F', letterSpacing: '0.1em', textTransform: 'uppercase' }}>may 2026</p>
          <span style={{ fontSize: '0.8rem', color: '#6E3B47', fontWeight: 700 }}>12 bites</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', height: 48 }}>
          {([
            ['#quiet luxury', 8],
            ['#cozy corner', 6],
            ['#rainy day', 4],
            ['#hidden gem', 3],
            ['#ritual', 2],
          ] as [string, number][]).map(([label, h]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
              <div
                style={{
                  width: '100%',
                  height: `${h * 5}px`,
                  background: '#6E3B47',
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.6 + h * 0.04,
                }}
              />
              <p style={{ fontSize: '0.45rem', color: '#7A6268', textAlign: 'center', lineHeight: 1.2 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: 100,
              border: '1.5px solid',
              borderColor: activeTab === tab ? '#6E3B47' : 'rgba(110,59,71,0.2)',
              background: activeTab === tab ? '#6E3B47' : 'transparent',
              color: activeTab === tab ? '#FAF5F0' : '#7A6268',
              fontSize: '0.8rem',
              fontFamily: 'Satoshi, sans-serif',
              fontWeight: 600,
              cursor: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bite Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {BITES.map((bite, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(110,59,71,0.07)' }}
          >
            <div style={{ height: 120, background: bite.color }} />
            <div style={{ padding: '0.75rem', background: '#FAF5F0' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1015', marginBottom: 2 }}>{bite.dish}</p>
              <p style={{ fontSize: '0.75rem', color: '#6E3B47', fontWeight: 500 }}>{bite.cafe}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
