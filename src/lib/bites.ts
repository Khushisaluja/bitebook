'use client'
import { useSyncExternalStore } from 'react'

// ---------------------------------------------------------------------------
// Tiny localStorage-backed store for logged bites, liked posts, and the
// want-to-try list. This app is a static export (no backend), so everything
// the user "saves" lives in the browser. useSyncExternalStore keeps every
// component on a page in sync and renders an empty snapshot during SSR.
// ---------------------------------------------------------------------------

export interface Bite {
  id: string
  cafe: string
  dish: string
  rating: number // 0.5 – 5, in half-star steps (dish-level, the core unit)
  vibes: string[]
  note: string
  photo?: string // object URL / data URL / seed path
  colorHex: string
  createdAt: number
  likes: number
}

export interface WantSpot {
  id: string
  cafe: string
  dish: string
  reason: string
  addedAt: number
}

const BITES_KEY = 'bitebook.bites.v2'
const LIKES_KEY = 'bitebook.likes.v1'
const WANTS_KEY = 'bitebook.wants.v1'

// Card colours new bites cycle through, matching the site palette.
const PALETTE = ['#C4A0A8', '#8B8BA8', '#D4A8B8', '#D4B896', '#B8C4A8', '#C8B8D8']

const SEED_WANTS: WantSpot[] = [
  { id: 'want-seed-1', cafe: 'Ekaa', dish: 'the tasting menu', reason: 'priya has not stopped talking about it', addedAt: 0 },
  { id: 'want-seed-2', cafe: 'Bombay Sweet Shop', dish: 'ghevar', reason: 'saw it on the map near home', addedAt: 0 },
  { id: 'want-seed-3', cafe: 'Americano', dish: 'cacio e pepe', reason: 'arjun gave it a 5', addedAt: 0 },
]

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota / privacy mode: ignore */
  }
  emit()
}

// Cached snapshots so getSnapshot returns a stable reference between writes
// (useSyncExternalStore requires this to avoid infinite re-renders).
let bitesCache: Bite[] | null = null
let likesCache: string[] | null = null
let wantsCache: WantSpot[] | null = null

// --- bites -----------------------------------------------------------------

function getBites(): Bite[] {
  if (bitesCache === null) bitesCache = read<Bite[]>(BITES_KEY, [])
  return bitesCache
}

export function addBite(input: {
  cafe: string
  dish: string
  rating: number
  vibes: string[]
  note: string
  photo?: string
}): Bite {
  const current = getBites()
  const bite: Bite = {
    id: `bite-${Date.now()}`,
    cafe: input.cafe.trim(),
    dish: input.dish.trim(),
    rating: input.rating,
    vibes: input.vibes,
    note: input.note.trim(),
    photo: input.photo,
    colorHex: PALETTE[current.length % PALETTE.length],
    createdAt: Date.now(),
    likes: 0,
  }
  const nextList = [bite, ...current]
  bitesCache = nextList
  write(BITES_KEY, nextList)
  return bite
}

// --- likes -----------------------------------------------------------------

function getLikedIds(): string[] {
  if (likesCache === null) likesCache = read<string[]>(LIKES_KEY, [])
  return likesCache
}

export function toggleLike(id: string) {
  const current = getLikedIds()
  const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current]
  likesCache = next
  write(LIKES_KEY, next)
}

// --- want to try -----------------------------------------------------------

function getWants(): WantSpot[] {
  if (wantsCache === null) {
    const stored = read<WantSpot[] | null>(WANTS_KEY, null)
    wantsCache = stored ?? SEED_WANTS
  }
  return wantsCache
}

export function addWant(input: { cafe: string; dish: string; reason: string }): WantSpot {
  const current = getWants()
  const want: WantSpot = {
    id: `want-${Date.now()}`,
    cafe: input.cafe.trim(),
    dish: input.dish.trim(),
    reason: input.reason.trim(),
    addedAt: Date.now(),
  }
  const next = [want, ...current]
  wantsCache = next
  write(WANTS_KEY, next)
  return want
}

// Remove a want-to-try (used both by "remove" and by "mark as eaten", which
// auto-clears the entry, the beloved Letterboxd-style watchlist touch).
export function removeWant(id: string) {
  const next = getWants().filter((w) => w.id !== id)
  wantsCache = next
  write(WANTS_KEY, next)
}

// --- subscriptions ---------------------------------------------------------

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === BITES_KEY) bitesCache = null
    if (e.key === LIKES_KEY) likesCache = null
    if (e.key === WANTS_KEY) wantsCache = null
    cb()
  }
  if (typeof window !== 'undefined') window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage)
  }
}

const EMPTY: Bite[] = []
const EMPTY_IDS: string[] = []
const EMPTY_WANTS: WantSpot[] = []

export function useBites(): Bite[] {
  return useSyncExternalStore(subscribe, getBites, () => EMPTY)
}

export function useLikedIds(): string[] {
  return useSyncExternalStore(subscribe, getLikedIds, () => EMPTY_IDS)
}

export function useWants(): WantSpot[] {
  return useSyncExternalStore(subscribe, getWants, () => EMPTY_WANTS)
}

// Relative "time ago" from a timestamp, e.g. "just now", "3h", "2d".
export function timeAgo(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000))
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  const d = Math.floor(h / 24)
  return `${d}d`
}
