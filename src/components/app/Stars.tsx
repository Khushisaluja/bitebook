// Read-only half-star rating display. `value` is 0.5–5 in half steps.
interface StarsProps {
  value: number
  size?: number
  color?: string
  muted?: string
  gap?: number
}

export default function Stars({
  value,
  size = 15,
  color = '#6E3B47',
  muted = 'rgba(110,59,71,0.18)',
  gap = 2,
}: StarsProps) {
  return (
    <span style={{ display: 'inline-flex', gap, lineHeight: 0 }} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i)) // 0, 0.5 or 1
        const id = `star-${i}-${Math.round(fill * 10)}`
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor={color} />
                <stop offset={`${fill * 100}%`} stopColor={muted} />
              </linearGradient>
            </defs>
            <path
              d="M12 2.2l2.9 6.26 6.86.62-5.18 4.55 1.55 6.71L12 17.3l-6.13 3.64 1.55-6.71L2.24 9.08l6.86-.62z"
              fill={`url(#${id})`}
            />
          </svg>
        )
      })}
    </span>
  )
}
