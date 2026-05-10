'use client'
import dynamic from 'next/dynamic'

const MapClient = dynamic(
  () => import('@/components/map/MapClient'),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: 'calc(100vh - 64px)', background: '#F0E6DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#B8848F', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem' }}>loading map...</p>
      </div>
    ),
  }
)

export default function MapPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      <MapClient />
    </main>
  )
}
