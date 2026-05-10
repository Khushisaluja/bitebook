'use client'

const TAGS = [
  '#cozy corner', '#rainy day solo', '#quiet luxury', '#solo dining',
  '#golden hour brunch', '#post-exam comfort', '#first sip ritual',
  '#hidden gem', '#late night cravings', '#aesthetic find', '#date night',
  '#monday blues cure', '#cold brew ritual', '#warm window seat',
]

export default function MarqueeStrip() {
  const content = [...TAGS, ...TAGS, ...TAGS, ...TAGS]

  return (
    <div
      style={{
        background: '#6E3B47',
        padding: '1rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          animation: 'marquee 28s linear infinite',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {content.map((tag, i) => (
          <span
            key={i}
            style={{
              color: '#FAF5F0',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '0.25rem 0.75rem',
              border: '1px solid rgba(250,245,240,0.25)',
              borderRadius: '100px',
              whiteSpace: 'nowrap',
              opacity: 0.9,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
