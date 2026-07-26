'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function FeedIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" {...S}>
      <path d="M4 5h16M4 12h16M4 19h9" />
    </svg>
  )
}
function MapIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" {...S}>
      <path d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 18.5 10.5C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}
function ListsIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" {...S}>
      <path d="M6.5 4h11a1 1 0 0 1 1 1v15l-6.5-3.4L5.5 20V5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

const TABS = [
  { href: '/feed', label: 'feed', icon: FeedIcon },
  { href: '/map', label: 'map', icon: MapIcon },
  { href: '/lists', label: 'lists', icon: ListsIcon },
  { href: '/profile', label: 'you', icon: ProfileIcon },
]

export default function TabBar() {
  const pathname = usePathname()

  return (
    <nav className="bb-tabbar" aria-label="primary">
      {/* first two tabs */}
      {TABS.slice(0, 2).map((t) => {
        const active = pathname === t.href
        const Icon = t.icon
        return (
          <Link key={t.href} href={t.href} className="bb-tab" data-active={active} aria-current={active ? 'page' : undefined}>
            <Icon />
            <span className="bb-tab-label">{t.label}</span>
            <span className="bb-tab-dot" />
          </Link>
        )
      })}

      {/* center log button */}
      <Link href="/log" className="bb-tab bb-tab-log" aria-label="log a bite">
        <span className="bb-tab-log-btn">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </Link>

      {/* last two tabs */}
      {TABS.slice(2).map((t) => {
        const active = pathname === t.href
        const Icon = t.icon
        return (
          <Link key={t.href} href={t.href} className="bb-tab" data-active={active} aria-current={active ? 'page' : undefined}>
            <Icon />
            <span className="bb-tab-label">{t.label}</span>
            <span className="bb-tab-dot" />
          </Link>
        )
      })}
    </nav>
  )
}
