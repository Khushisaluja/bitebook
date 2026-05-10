'use client'
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

const SPOTS = [
  { id: 1, name: 'Blue Tokai Coffee', lat: 19.017, lng: 72.856, dish: 'Ethiopian Pour Over', vibe: '#quiet corner', category: 'cafes' },
  { id: 2, name: 'Perch Wine Bar', lat: 19.022, lng: 72.832, dish: 'Burrata Toast', vibe: '#soft luxury', category: 'restaurants' },
  { id: 3, name: 'Naaru', lat: 18.999, lng: 72.841, dish: 'Truffle Ramen', vibe: '#cozy corner', category: 'restaurants' },
  { id: 4, name: 'Fig & Maple', lat: 19.012, lng: 72.848, dish: 'Ricotta Pancakes', vibe: '#sunday slow', category: 'cafes' },
  { id: 5, name: 'Suzette', lat: 19.034, lng: 72.839, dish: 'Salted Caramel Crêpe', vibe: '#hidden gem', category: 'hidden' },
  { id: 6, name: 'La Folie', lat: 18.992, lng: 72.828, dish: 'Pistachio Tart', vibe: '#quiet luxury', category: 'hidden' },
  { id: 7, name: 'Kopi Klub', lat: 19.026, lng: 72.862, dish: 'Cold Brew Float', vibe: '#golden hour', category: 'cafes' },
]

const FILTERS = ['all', 'cafes', 'restaurants', 'hidden']

type Spot = typeof SPOTS[0]

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSpot, setActiveSpot] = useState<Spot | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center: [19.012, 72.848],
        zoom: 13,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      SPOTS.forEach((spot) => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#6E3B47;border:2.5px solid #FAF5F0;box-shadow:0 2px 8px rgba(110,59,71,0.4);transition:transform 0.2s ease;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })

        L.marker([spot.lat, spot.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Satoshi,sans-serif;min-width:180px">
              <p style="font-size:0.65rem;font-weight:700;color:#B8848F;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">${spot.vibe}</p>
              <p style="font-size:0.95rem;font-weight:700;color:#1A1015;margin-bottom:2px">${spot.name}</p>
              <p style="font-size:0.82rem;color:#7A6268">${spot.dish}</p>
            </div>`,
            { closeButton: false, className: 'bitebook-popup' }
          )
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const filtered = activeFilter === 'all' ? SPOTS : SPOTS.filter(s => s.category === activeFilter)

  const flyToSpot = async (spot: Spot) => {
    setActiveSpot(spot)
    if (mapInstanceRef.current) {
      const L = (await import('leaflet')).default
      void L
      ;(mapInstanceRef.current as { flyTo: (latlng: [number, number], zoom: number, options: { duration: number }) => void })
        .flyTo([spot.lat, spot.lng], 15, { duration: 1 })
    }
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <div style={{ width: 300, background: '#FAF5F0', borderRight: '1px solid rgba(110,59,71,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(110,59,71,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1A1015', marginBottom: '1rem' }}>your map</h2>
          {/* Filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: 100,
                  border: '1.5px solid',
                  borderColor: activeFilter === f ? '#6E3B47' : 'rgba(110,59,71,0.2)',
                  background: activeFilter === f ? '#6E3B47' : 'transparent',
                  color: activeFilter === f ? '#FAF5F0' : '#7A6268',
                  fontSize: '0.75rem',
                  fontFamily: 'Satoshi, sans-serif',
                  fontWeight: 600,
                  cursor: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Spot list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {filtered.map(spot => (
            <div
              key={spot.id}
              onClick={() => flyToSpot(spot)}
              style={{
                padding: '0.9rem',
                borderRadius: 14,
                cursor: 'none',
                background: activeSpot?.id === spot.id ? '#F0E6DC' : 'transparent',
                transition: 'background 0.15s ease',
                marginBottom: 4,
              }}
              onMouseEnter={e => {
                if (activeSpot?.id !== spot.id) e.currentTarget.style.background = 'rgba(110,59,71,0.04)'
              }}
              onMouseLeave={e => {
                if (activeSpot?.id !== spot.id) e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1015', marginBottom: 2 }}>{spot.name}</p>
                  <p style={{ fontSize: '0.78rem', color: '#7A6268' }}>{spot.dish}</p>
                </div>
                <span style={{ fontSize: '0.65rem', background: '#E5DDD6', borderRadius: 100, padding: '2px 8px', color: '#6E3B47', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {spot.vibe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  )
}
