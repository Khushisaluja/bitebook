'use client'
import { useState } from 'react'

// Interactive half-star input (Letterboxd-style). Tap the left half of a star
// for a .5, the right half for a full star. Keyboard: ←/→ adjust by 0.5.
interface StarRatingProps {
  value: number
  onChange: (v: number) => void
  size?: number
}

export default function StarRating({ value, onChange, size = 40 }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)
  const shown = hover ?? value

  const pick = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const half = e.clientX - rect.left < rect.width / 2
    onChange(i + (half ? 0.5 : 1))
  }
  const track = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const half = e.clientX - rect.left < rect.width / 2
    setHover(i + (half ? 0.5 : 1))
  }

  return (
    <div
      role="slider"
      aria-valuemin={0.5}
      aria-valuemax={5}
      aria-valuenow={value}
      aria-label="your rating"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange(Math.min(5, value + 0.5)) }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange(Math.max(0.5, value - 0.5)) }
      }}
      style={{ display: 'inline-flex', gap: 6, outline: 'none' }}
      onMouseLeave={() => setHover(null)}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, shown - i))
        const id = `si-${i}-${Math.round(fill * 10)}`
        return (
          <button
            key={i}
            type="button"
            onClick={(e) => pick(i, e)}
            onMouseMove={(e) => track(i, e)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: 0 }}
            aria-label={`${i + 1} stars`}
          >
            <svg width={size} height={size} viewBox="0 0 24 24">
              <defs>
                <linearGradient id={id}>
                  <stop offset={`${fill * 100}%`} stopColor="#6E3B47" />
                  <stop offset={`${fill * 100}%`} stopColor="rgba(110,59,71,0.16)" />
                </linearGradient>
              </defs>
              <path
                d="M12 2.2l2.9 6.26 6.86.62-5.18 4.55 1.55 6.71L12 17.3l-6.13 3.64 1.55-6.71L2.24 9.08l6.86-.62z"
                fill={`url(#${id})`}
                stroke="rgba(110,59,71,0.28)"
                strokeWidth={fill > 0 && fill < 1 ? 0 : 0}
              />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
