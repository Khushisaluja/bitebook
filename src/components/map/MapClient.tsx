'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { useBites, useWants } from '@/lib/bites'
import { SEED_BITES, MY_SEED_BITES, MAP_CENTER } from '@/lib/seed'
import Stars from '@/components/app/Stars'

type Kind = 'friends' | 'mine' | 'want'
interface Spot {
  id: string
  name: string
  lat: number
  lng: number
  dish: string
  rating: number
  category: string
  kind: Kind
}

const FILTERS = ['all', 'mine', 'want to try', 'cafes', 'restaurants', 'hidden'] as const

// Deterministically scatter a spot without real coords around the city centre.
function place(id: string, i: number): [number, number] {
  let h = 0
  for (let c = 0; c < id.length; c++) h = (h * 31 + id.charCodeAt(c)) >>> 0
  const angle = ((h % 360) + i * 47) * (Math.PI / 180)
  const radius = 0.014 + ((h % 100) / 100) * 0.022
  return [MAP_CENTER[0] + Math.sin(angle) * radius, MAP_CENTER[1] + Math.cos(angle) * radius]
}

const PIN: Record<Kind, string> = {
  friends: `<div style="width:15px;height:15px;border-radius:50%;background:#6E3B47;border:2.5px solid #FAF5F0;box-shadow:0 2px 8px rgba(110,59,71,0.45)"></div>`,
  mine: `<div style="width:19px;height:19px;border-radius:50%;background:#E0A458;border:3px solid #FAF5F0;box-shadow:0 2px 10px rgba(224,164,88,0.6)"></div>`,
  want: `<div style="width:15px;height:15px;border-radius:50%;background:#FAF5F0;border:2.5px solid #6E3B47;box-shadow:0 2px 8px rgba(110,59,71,0.3)"></div>`,
}

export default function MapClient() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<import('leaflet').Map | null>(null)
  const layerRef = useRef<import('leaflet').LayerGroup | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [active, setActive] = useState<string | null>(null)
  const myBites = useBites()
  const wants = useWants()

  const spots: Spot[] = useMemo(() => {
    const mine: Spot[] = [
      ...myBites.map((b, i) => {
        const [lat, lng] = place(b.id, i)
        return { id: b.id, name: b.cafe, lat, lng, dish: b.dish, rating: b.rating, category: 'mine', kind: 'mine' as Kind }
      }),
      ...MY_SEED_BITES.map((b) => ({ id: b.id, name: b.cafe, lat: b.lat, lng: b.lng, dish: b.dish, rating: b.rating, category: b.category, kind: 'mine' as Kind })),
    ]
    const friends: Spot[] = SEED_BITES.map((b) => ({ id: b.id, name: b.cafe, lat: b.lat, lng: b.lng, dish: b.dish, rating: b.rating, category: b.category, kind: 'friends' as Kind }))
    const want: Spot[] = wants.map((w, i) => {
      const [lat, lng] = place(w.id, i + 3)
      return { id: w.id, name: w.cafe, lat, lng, dish: w.dish, rating: 0, category: 'want', kind: 'want' as Kind }
    })
    return [...mine, ...friends, ...want]
  }, [myBites, wants])

  const filtered = useMemo(() => {
    if (filter === 'all') return spots
    if (filter === 'mine') return spots.filter((s) => s.kind === 'mine')
    if (filter === 'want to try') return spots.filter((s) => s.kind === 'want')
    return spots.filter((s) => s.category === filter)
  }, [spots, filter])

  // init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapRef.current) return
      const map = L.map(mapRef.current, { center: MAP_CENTER, zoom: 13, zoomControl: false })
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap · CARTO', subdomains: 'abcd', maxZoom: 19,
      }).addTo(map)
      mapInstance.current = map
    })()
    return () => {
      cancelled = true
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  }, [])

  // redraw markers on filter/data change
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      const map = mapInstance.current
      if (!map || cancelled) return
      if (layerRef.current) map.removeLayer(layerRef.current)
      const group = L.layerGroup()
      filtered.forEach((s) => {
        const icon = L.divIcon({ className: '', html: PIN[s.kind], iconSize: [18, 18], iconAnchor: [9, 9] })
        const stars = s.kind === 'want' ? 'want to try' : `${'★'.repeat(Math.round(s.rating))} ${s.rating.toFixed(1)}`
        L.marker([s.lat, s.lng], { icon })
          .addTo(group)
          .bindPopup(
            `<div style="font-family:Satoshi,sans-serif;min-width:150px">
              <p style="font-size:0.58rem;font-weight:700;color:${s.kind === 'mine' ? '#E0A458' : '#B8848F'};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3px">${s.kind === 'mine' ? 'your bite' : s.kind === 'want' ? 'on your list' : 'a friend loved'} · ${stars}</p>
              <p style="font-size:0.9rem;font-weight:800;color:#1A1015">${s.name}</p>
              <p style="font-size:0.8rem;color:#7A6268">${s.dish}</p>
            </div>`,
            { closeButton: false, className: 'bitebook-popup' }
          )
      })
      group.addTo(map)
      layerRef.current = group
    })()
    return () => { cancelled = true }
  }, [filtered])

  const flyTo = async (s: Spot) => {
    setActive(s.id)
    mapInstance.current?.flyTo([s.lat, s.lng], 15, { duration: 0.9 })
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />

      {/* header + filters */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0.6rem 0.9rem', background: 'linear-gradient(to bottom, rgba(240,230,220,0.95), rgba(240,230,220,0))', zIndex: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#1A1015' }}>your map</h1>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6E3B47', background: 'rgba(250,245,240,0.9)', borderRadius: 100, padding: '4px 10px' }}>
            {spots.filter((s) => s.kind !== 'want').length} eaten · {wants.length} to try
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {FILTERS.map((f) => (
            <button key={f} className="bb-chip" data-active={filter === f} onClick={() => setFilter(f)} style={{ background: filter === f ? '#6E3B47' : 'rgba(250,245,240,0.92)' }}>{f}</button>
          ))}
        </div>
      </div>

      {/* legend */}
      <div style={{ position: 'absolute', top: 92, right: 12, zIndex: 500, background: 'rgba(250,245,240,0.92)', backdropFilter: 'blur(6px)', borderRadius: 12, padding: '0.5rem 0.65rem', display: 'flex', flexDirection: 'column', gap: 5, fontSize: '0.64rem', fontWeight: 600, color: '#5C4A50' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><i style={{ width: 9, height: 9, borderRadius: '50%', background: '#E0A458' }} /> you</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><i style={{ width: 9, height: 9, borderRadius: '50%', background: '#6E3B47' }} /> friends</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FAF5F0', border: '2px solid #6E3B47' }} /> to try</span>
      </div>

      {/* bottom spot carousel */}
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, zIndex: 500, display: 'flex', gap: '0.6rem', overflowX: 'auto', padding: '0 0.9rem', scrollbarWidth: 'none' }}>
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => flyTo(s)}
            style={{
              flexShrink: 0, width: 190, textAlign: 'left', cursor: 'pointer',
              background: 'rgba(250,245,240,0.96)', backdropFilter: 'blur(10px)',
              border: active === s.id ? '1.5px solid #6E3B47' : '1.5px solid rgba(110,59,71,0.1)',
              borderRadius: 16, padding: '0.7rem 0.85rem', boxShadow: '0 6px 20px -8px rgba(74,39,48,0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: s.kind === 'mine' ? '#E0A458' : s.kind === 'want' ? 'transparent' : '#6E3B47', border: s.kind === 'want' ? '2px solid #6E3B47' : 'none' }} />
              <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1A1015', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: '#7A6268', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5 }}>{s.dish}</p>
            {s.kind === 'want' ? (
              <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#6E3B47' }}>◦ want to try</span>
            ) : (
              <Stars value={s.rating} size={12} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
