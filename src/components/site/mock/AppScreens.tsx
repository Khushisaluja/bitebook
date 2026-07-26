// ---------------------------------------------------------------------------
// Static captures of the real product screens (/feed, /log, /map, /lists,
// /profile) for the marketing walkthrough. These deliberately reuse the app's
// own class names (bb-card, bb-chip, bb-tabbar…) and its seed data, so the
// mockups can never drift into "marketing art" that the product doesn't match.
//
// Server components on purpose: no interactivity, no client JS.
// ---------------------------------------------------------------------------
import Stars from '@/components/app/Stars'
import { SEED_BITES, MY_SEED_BITES, MY_LISTS } from '@/lib/seed'
import { asset } from '@/lib/asset'

const C = {
  paper: '#FAF5F0',
  paper2: '#F0E6DC',
  paper3: '#E5DDD6',
  mul: '#6E3B47',
  mulL: '#B8848F',
  amber: '#E0A458',
  txt: '#1A1015',
  muted: '#7A6268',
  body: '#5C4A50',
}

/* ------------------------------------------------------------------ shell */

function StatusBar() {
  return (
    <div className="bb-statusbar" style={{ height: 40 }} aria-hidden="true">
      <span>9:41</span>
      <span className="bb-statusbar-icons">
        <svg width="16" height="10" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="15" height="10" viewBox="0 0 16 12" fill="currentColor">
          <path
            d="M8 2.6c2.3 0 4.4.9 6 2.4l-1.4 1.5A6.6 6.6 0 0 0 8 5.6c-1.8 0-3.4.7-4.6 1.9L2 6C3.6 4.5 5.7 3.6 8 3.6Z"
            opacity="0.9"
          />
          <path d="M8 7c1.1 0 2.1.4 2.9 1.2L8 11 5.1 8.2A4.1 4.1 0 0 1 8 7Z" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2.5" width="15" height="7" rx="1.3" fill="currentColor" />
          <rect x="21.5" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}

const ICON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const TABS = [
  {
    key: 'feed',
    label: 'feed',
    path: <path d="M4 5h16M4 12h16M4 19h9" />,
  },
  {
    key: 'map',
    label: 'map',
    path: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 18.5 10.5C18.5 15.4 12 21 12 21Z" />
        <circle cx="12" cy="10.5" r="2.2" />
      </>
    ),
  },
  {
    key: 'lists',
    label: 'lists',
    path: <path d="M6.5 4h11a1 1 0 0 1 1 1v15l-6.5-3.4L5.5 20V5a1 1 0 0 1 1-1Z" />,
  },
  {
    key: 'profile',
    label: 'you',
    path: (
      <>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </>
    ),
  },
]

function TabBar({ active }: { active: string }) {
  const tab = (t: (typeof TABS)[number]) => (
    <span key={t.key} className="bb-tab" data-active={active === t.key}>
      <svg width="21" height="21" viewBox="0 0 24 24" {...ICON}>
        {t.path}
      </svg>
      <span className="bb-tab-label">{t.label}</span>
      <span className="bb-tab-dot" />
    </span>
  )

  return (
    <nav className="bb-tabbar" style={{ padding: '0.45rem 0.7rem 0.6rem' }} aria-hidden="true">
      {TABS.slice(0, 2).map(tab)}
      <span className="bb-tab bb-tab-log">
        <span className="bb-tab-log-btn" style={{ width: 50, height: 50, borderRadius: 18 }}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </span>
      {TABS.slice(2).map(tab)}
    </nav>
  )
}

function Screen({
  tab,
  children,
  fade = true,
}: {
  tab: string
  children: React.ReactNode
  fade?: boolean
}) {
  return (
    <div className="site-screen">
      <StatusBar />
      <div className="site-screen-scroll">
        <div className="site-screen-inner">{children}</div>
        {fade && <div className="site-screen-fade" />}
      </div>
      <TabBar active={tab} />
    </div>
  )
}

/* ------------------------------------------------------------- shared bits */

function ScreenHeader({
  title,
  badge,
  sub,
  chips,
  activeChip,
}: {
  title: string
  badge?: React.ReactNode
  sub?: string
  chips?: string[]
  activeChip?: string
}) {
  return (
    <header style={{ padding: '0.35rem 1rem 0.6rem', background: C.paper }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.28rem', fontWeight: 900, letterSpacing: '-0.03em', color: C.txt }}>
          {title}
        </h1>
        {badge}
      </div>
      {sub && <p style={{ fontSize: '0.74rem', color: C.mulL, marginTop: 3 }}>{sub}</p>}
      {chips && (
        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.6rem' }}>
          {chips.map((c) => (
            <span key={c} className="bb-chip" data-active={c === activeChip}>
              {c}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: '0.64rem',
        fontWeight: 700,
        color: C.mul,
        background: C.paper2,
        borderRadius: 100,
        padding: '4px 9px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------- feed card */

export function BiteCard({
  bite,
  compact = false,
}: {
  bite: (typeof SEED_BITES)[number]
  compact?: boolean
}) {
  return (
    <article className="bb-card" style={{ overflow: 'hidden' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 0.9rem 0.6rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div
            style={{
              width: 31,
              height: 31,
              borderRadius: '50%',
              background: C.paper3,
              color: C.mul,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            {bite.user.initials}
          </div>
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <p style={{ fontSize: '0.79rem', fontWeight: 700, color: C.txt }}>{bite.user.name}</p>
            <p style={{ fontSize: '0.68rem', color: C.mulL }}>{bite.cafe}</p>
          </div>
        </div>
        <span style={{ fontSize: '0.68rem', color: C.mulL, flexShrink: 0 }}>{bite.timeAgo}</span>
      </header>

      <div
        className="bb-photo-grain"
        style={{ position: 'relative', aspectRatio: compact ? '1 / 1' : '4 / 5', background: bite.colorHex }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(bite.photo)}
          alt={bite.dish}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(26,16,21,0.5) 0%, transparent 42%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 11,
            left: 11,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(250,245,240,0.94)',
            borderRadius: 100,
            padding: '4px 10px',
          }}
        >
          <Stars value={bite.rating} size={12} />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: C.mul }}>
            {bite.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div style={{ padding: '0.85rem 0.9rem 1rem' }}>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: C.txt,
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
          }}
        >
          {bite.dish}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.6rem' }}>
          {bite.vibes.slice(0, compact ? 2 : 3).map((v) => (
            <span
              key={v}
              style={{
                fontSize: '0.66rem',
                border: '1px solid rgba(110,59,71,0.28)',
                borderRadius: 100,
                padding: '2px 8px',
                color: C.mul,
                fontWeight: 500,
              }}
            >
              #{v}
            </span>
          ))}
        </div>
        <p
          style={{
            fontSize: '0.83rem',
            color: C.body,
            lineHeight: 1.58,
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {bite.note}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: '0.85rem',
            color: C.muted,
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.9a4.4 4.4 0 0 1 8.5 2A9.8 9.8 0 0 1 12 20.5Z" />
          </svg>
          <span style={{ fontSize: '0.76rem', fontWeight: 600 }}>{bite.likes}</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.68rem',
              color: C.mulL,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 21v-5a8 8 0 1 1 16 0v5" />
              <path d="M2 21h20" />
            </svg>
            friends only
          </span>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ /feed */

export function FeedScreen() {
  return (
    <Screen tab="feed">
      <ScreenHeader
        title="feed"
        badge={
          <Pill>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.mul }} />8 friends
          </Pill>
        }
        sub="only the people you trust. no strangers, no leaderboards."
        chips={['recent', 'top rated', 'from you']}
        activeChip="recent"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', padding: '0.85rem 1rem 0' }}>
        <BiteCard bite={SEED_BITES[0]} />
        <BiteCard bite={SEED_BITES[1]} />
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------- /log */

const VIBE_TAGS = [
  'cozy corner',
  'rainy day solo',
  'quiet luxury',
  'solo dining',
  'golden hour',
  'first sip ritual',
  'hidden gem',
  'date night',
]

export function LogScreen() {
  return (
    <Screen tab="log" fade={false}>
      <div style={{ padding: '0.4rem 1.2rem 1.4rem' }}>
        <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.45rem' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: i <= 1 ? C.mul : 'rgba(110,59,71,0.15)',
              }}
            />
          ))}
        </div>
        <p className="bb-eyebrow" style={{ marginBottom: '1.2rem' }}>
          step 2 of 3
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="bb-eyebrow" style={{ marginBottom: '0.5rem' }}>
              rate the plate, not the place
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: C.txt }}>Spicy Miso Ramen</p>
          </div>

          {/* the big rating control, mid-interaction */}
          <div style={{ display: 'flex', gap: 5 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id={`mockstar-${i}`}>
                    <stop offset={`${i <= 4 ? 100 : 50}%`} stopColor={C.mul} />
                    <stop offset={`${i <= 4 ? 100 : 50}%`} stopColor="rgba(110,59,71,0.18)" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2.2l2.9 6.26 6.86.62-5.18 4.55 1.55 6.71L12 17.3l-6.13 3.64 1.55-6.71L2.24 9.08l6.86-.62z"
                  fill={`url(#mockstar-${i})`}
                />
              </svg>
            ))}
          </div>
          <p style={{ fontSize: '0.98rem', fontWeight: 600, color: C.mul, fontStyle: 'italic' }}>
            &ldquo;cross-town good&rdquo;
          </p>

          <div style={{ width: '100%' }}>
            <p className="bb-eyebrow" style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
              the vibe · up to 4
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
              {VIBE_TAGS.map((t) => (
                <span
                  key={t}
                  className="bb-chip"
                  data-active={t === 'cozy corner' || t === 'rainy day solo'}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.55rem', marginTop: '1.5rem' }}>
          <span
            style={{
              padding: '0.8rem 1.2rem',
              borderRadius: 100,
              border: '1.5px solid rgba(110,59,71,0.25)',
              color: C.muted,
              fontWeight: 700,
              fontSize: '0.88rem',
            }}
          >
            back
          </span>
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.8rem',
              borderRadius: 100,
              background: C.mul,
              color: C.paper,
              fontWeight: 700,
              fontSize: '0.88rem',
            }}
          >
            almost there
          </span>
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------- /map */

const PINS = [
  { x: 46, y: 38, kind: 'mine' },
  { x: 24, y: 52, kind: 'friends' },
  { x: 68, y: 30, kind: 'friends' },
  { x: 33, y: 24, kind: 'friends' },
  { x: 74, y: 58, kind: 'want' },
  { x: 56, y: 66, kind: 'friends' },
  { x: 18, y: 33, kind: 'want' },
  { x: 62, y: 47, kind: 'mine' },
] as const

const PIN_STYLE: Record<string, React.CSSProperties> = {
  mine: { width: 17, height: 17, background: C.amber, border: `3px solid ${C.paper}`, boxShadow: '0 2px 10px rgba(224,164,88,0.6)' },
  friends: { width: 14, height: 14, background: C.mul, border: `2.5px solid ${C.paper}`, boxShadow: '0 2px 8px rgba(110,59,71,0.45)' },
  want: { width: 14, height: 14, background: C.paper, border: `2.5px solid ${C.mul}`, boxShadow: '0 2px 8px rgba(110,59,71,0.3)' },
}

function MapCanvas() {
  // A hand-drawn stand-in for the Leaflet tiles, tinted with the same
  // sepia/saturation treatment the real map applies to its tile pane.
  return (
    <svg
      viewBox="0 0 360 640"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <rect width="360" height="640" fill="#EFE3D8" />
      {/* water */}
      <path d="M0 470 C70 440 120 500 190 486 C250 474 300 512 360 496 L360 640 L0 640 Z" fill="#D8DCD4" opacity="0.75" />
      {/* park */}
      <path d="M212 118 C258 104 300 128 302 168 C304 208 262 226 228 214 C196 202 186 132 212 118 Z" fill="#CBD3BC" opacity="0.85" />
      {/* blocks */}
      <g fill="#E5D7C9" opacity="0.85">
        {[
          [18, 60, 90, 76], [126, 44, 64, 92], [22, 168, 70, 88], [110, 158, 92, 70],
          [232, 250, 96, 74], [30, 274, 84, 96], [140, 262, 72, 82], [244, 40, 88, 56],
          [46, 392, 100, 62], [176, 372, 118, 70], [22, 500, 92, 58],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="6" />
        ))}
      </g>
      {/* roads */}
      <g stroke="#F7EFE6" strokeLinecap="round" fill="none">
        <path d="M0 148 H360" strokeWidth="11" />
        <path d="M0 350 H360" strokeWidth="9" />
        <path d="M0 250 H360" strokeWidth="6" />
        <path d="M0 462 H360" strokeWidth="6" />
        <path d="M112 0 V640" strokeWidth="11" />
        <path d="M226 0 V640" strokeWidth="9" />
        <path d="M300 0 V640" strokeWidth="6" />
        <path d="M56 0 V640" strokeWidth="5" />
        <path d="M0 40 L360 120" strokeWidth="7" opacity="0.9" />
      </g>
      <g stroke="#E0D0BF" strokeWidth="0.8" opacity="0.6" fill="none">
        <path d="M0 200 H360M0 300 H360M0 410 H360M160 0 V640M264 0 V640" />
      </g>
    </svg>
  )
}

export function MapScreen() {
  const spots = [SEED_BITES[2], SEED_BITES[4], SEED_BITES[5]]

  return (
    <Screen tab="map" fade={false}>
      <div style={{ position: 'absolute', inset: 0, background: C.paper2, overflow: 'hidden' }}>
        <MapCanvas />

        {PINS.map((p, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              ...PIN_STYLE[p.kind],
            }}
          />
        ))}

        {/* header + filters */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '0.5rem 0.85rem 1.2rem',
            background: 'linear-gradient(to bottom, rgba(240,230,220,0.96), rgba(240,230,220,0))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '1.28rem', fontWeight: 900, letterSpacing: '-0.03em', color: C.txt }}>
              your map
            </h1>
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                color: C.mul,
                background: 'rgba(250,245,240,0.9)',
                borderRadius: 100,
                padding: '4px 9px',
              }}
            >
              11 eaten · 2 to try
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', overflow: 'hidden' }}>
            {['all', 'mine', 'want to try', 'cafes'].map((f) => (
              <span
                key={f}
                className="bb-chip"
                data-active={f === 'all'}
                style={{ background: f === 'all' ? C.mul : 'rgba(250,245,240,0.92)' }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* legend */}
        <div
          style={{
            position: 'absolute',
            top: 86,
            right: 11,
            background: 'rgba(250,245,240,0.92)',
            borderRadius: 12,
            padding: '0.45rem 0.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            fontSize: '0.6rem',
            fontWeight: 600,
            color: C.body,
          }}
        >
          {[
            ['you', { background: C.amber }],
            ['friends', { background: C.mul }],
            ['to try', { background: C.paper, border: `2px solid ${C.mul}` }],
          ].map(([label, style]) => (
            <span key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <i style={{ width: 8, height: 8, borderRadius: '50%', ...(style as React.CSSProperties) }} />
              {label as string}
            </span>
          ))}
        </div>

        {/* bottom spot carousel */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            gap: '0.5rem',
            padding: '0 0.85rem',
            overflow: 'hidden',
          }}
        >
          {spots.map((s, i) => (
            <div
              key={s.id}
              style={{
                flexShrink: 0,
                width: 172,
                background: 'rgba(250,245,240,0.96)',
                border: i === 0 ? `1.5px solid ${C.mul}` : '1.5px solid rgba(110,59,71,0.1)',
                borderRadius: 16,
                padding: '0.6rem 0.75rem',
                boxShadow: '0 6px 20px -8px rgba(74,39,48,0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.mul, flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: '0.81rem',
                    fontWeight: 800,
                    color: C.txt,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.cafe}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: C.muted,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 5,
                }}
              >
                {s.dish}
              </p>
              <Stars value={s.rating} size={11} />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* ----------------------------------------------------------------- /lists */

const WANTS = [
  { dish: 'Burnt Basque Cheesecake', cafe: 'Subko Bakery', reason: 'sara has mentioned it four times now' },
  { dish: 'Khow Suey', cafe: 'Bombay Canteen', reason: 'for the first properly cold evening' },
]

export function ListsScreen() {
  const byId = Object.fromEntries(SEED_BITES.map((b) => [b.id, b]))

  return (
    <Screen tab="lists">
      <ScreenHeader title="lists" chips={['want to try', 'my lists']} activeChip="my lists" />
      <div style={{ padding: '0.85rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {MY_LISTS.map((list) => {
          const bites = list.biteIds.map((id) => byId[id]).filter(Boolean)
          const avg = bites.reduce((s, b) => s + b.rating, 0) / (bites.length || 1)
          return (
            <div key={list.id} className="bb-card" style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', height: 104 }}>
                {bites.slice(0, 3).map((b) => (
                  <div key={b.id} style={{ flex: 1, position: 'relative' }} className="bb-photo-grain">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(b.photo)} alt={b.dish} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div style={{ padding: '0.8rem 0.9rem 0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: C.txt }}>{list.title}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <Stars value={avg} size={11} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: C.mul }}>{avg.toFixed(1)}</span>
                  </span>
                </div>
                <p style={{ fontSize: '0.77rem', color: C.muted, marginTop: 2 }}>{list.blurb}</p>
                <p style={{ fontSize: '0.67rem', color: C.mulL, marginTop: 5 }}>{bites.length} places</p>
              </div>
            </div>
          )
        })}

        {WANTS.map((w) => (
          <div
            key={w.dish}
            className="bb-card"
            style={{ padding: '0.8rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.89rem', fontWeight: 800, color: C.txt }}>{w.dish}</p>
              <p style={{ fontSize: '0.74rem', color: C.mul, fontWeight: 600 }}>{w.cafe}</p>
              <p style={{ fontSize: '0.71rem', color: C.mulL, fontStyle: 'italic', marginTop: 2 }}>{w.reason}</p>
            </div>
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 700,
                color: C.paper,
                background: C.mul,
                borderRadius: 100,
                padding: '5px 11px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ✓ ate it
            </span>
          </div>
        ))}
      </div>
    </Screen>
  )
}

/* --------------------------------------------------------------- /profile */

export function ProfileScreen() {
  const items = MY_SEED_BITES
  const stats: [string, string][] = [
    ['11', 'bites'],
    ['4.5', 'avg ★'],
    ['9', 'places'],
    ['1', 'city'],
  ]

  return (
    <Screen tab="profile">
      <div
        className="bb-photo-grain"
        style={{
          height: 96,
          background: 'linear-gradient(135deg, #6E3B47 0%, #B8848F 60%, #D4B896 100%)',
          position: 'relative',
        }}
      />
      <div style={{ padding: '0 1rem' }}>
        {/* positioned so it paints above the cover, which is position:relative */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: -30, marginBottom: '0.7rem' }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: '50%',
              background: C.mul,
              border: `4px solid ${C.paper}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.35rem',
              fontWeight: 900,
              color: C.paper,
            }}
          >
            k
          </div>
        </div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.02em', color: C.txt }}>khushi</h1>
        <p style={{ fontSize: '0.77rem', color: C.mulL, fontWeight: 600 }}>@khushi.eats · mumbai</p>
        <p style={{ fontSize: '0.83rem', color: C.body, lineHeight: 1.5, marginTop: '0.3rem' }}>
          eating my way through the city, one careful bite at a time.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            padding: '0.95rem 0 1rem',
            borderBottom: '1px solid rgba(110,59,71,0.1)',
            marginBottom: '1.1rem',
          }}
        >
          {stats.map(([n, l]) => (
            <div key={l}>
              <p style={{ fontSize: '1.15rem', fontWeight: 900, color: C.mul, lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: '0.68rem', color: C.muted, fontWeight: 600, marginTop: 3 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* the shareable taste card */}
        <div
          className="bb-photo-grain"
          style={{
            position: 'relative',
            borderRadius: 20,
            padding: '1.15rem',
            marginBottom: '1.2rem',
            overflow: 'hidden',
            background: 'linear-gradient(150deg, #4A2730 0%, #6E3B47 55%, #7E4553 100%)',
            color: C.paper,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#E9C9A0',
              }}
            >
              your taste · 2026
            </span>
            <span
              style={{
                background: 'rgba(250,245,240,0.15)',
                borderRadius: 100,
                padding: '4px 10px',
                fontSize: '0.66rem',
                fontWeight: 700,
              }}
            >
              share
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem 0.5rem' }}>
            {[
              ['11', 'bites remembered'],
              ['4.5 ★', 'you rate generously'],
              ['#quiet luxury', 'your signature vibe'],
              ['Pistachio Tart', 'top of the year'],
            ].map(([a, b], i) => (
              <div key={b}>
                <p style={{ fontSize: i < 2 ? '1.5rem' : '0.9rem', fontWeight: i < 2 ? 900 : 800, lineHeight: 1.1 }}>
                  {a}
                </p>
                <p style={{ fontSize: '0.62rem', opacity: 0.72, fontWeight: 600, marginTop: 3 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="bb-eyebrow" style={{ marginBottom: '0.6rem' }}>
          taste DNA
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
          {['quiet luxury', 'rainy day solo', 'cozy corner', 'hidden gem'].map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.74rem',
                border: `1.5px solid ${C.mul}`,
                borderRadius: 100,
                padding: '0.28rem 0.8rem',
                color: C.mul,
                fontWeight: 600,
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
          {items.map((b) => (
            <div key={b.id} className="bb-card" style={{ borderRadius: 15, overflow: 'hidden' }}>
              <div className="bb-photo-grain" style={{ position: 'relative', aspectRatio: '1', background: b.colorHex }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(b.photo)}
                  alt={b.dish}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    left: 6,
                    background: 'rgba(250,245,240,0.92)',
                    borderRadius: 100,
                    padding: '2px 6px',
                    display: 'inline-flex',
                  }}
                >
                  <Stars value={b.rating} size={9} />
                </span>
              </div>
              <div style={{ padding: '0.5rem 0.6rem 0.6rem' }}>
                <p
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: C.txt,
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {b.dish}
                </p>
                <p style={{ fontSize: '0.67rem', color: C.mul, fontWeight: 500 }}>{b.cafe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}
