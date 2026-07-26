'use client'
import dynamic from 'next/dynamic'

const MapClient = dynamic(() => import('@/components/map/MapClient'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', background: '#F0E6DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#B8848F', fontSize: '0.9rem', fontWeight: 600 }}>loading your map…</p>
    </div>
  ),
})

export default function MapPage() {
  return (
    <main style={{ height: '100%' }}>
      <MapClient />
    </main>
  )
}
