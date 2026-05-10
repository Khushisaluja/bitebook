'use client'
import { useRef, useEffect, ReactNode } from 'react'

export default function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let isNear = false
    let cx = 0, cy = 0

    const updateRect = () => {
      const rect = el.getBoundingClientRect()
      cx = rect.left + rect.width / 2
      cy = rect.top + rect.height / 2
    }
    updateRect()

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const threshold = 100

      if (dist < threshold) {
        if (!isNear) {
          isNear = true
          el.style.transition = 'transform 0.1s ease'
        }
        const pull = (1 - dist / threshold) * 0.35
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
      } else if (isNear) {
        isNear = false
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        el.style.transform = 'translate(0px, 0px)'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [])

  return <div ref={ref} style={{ display: 'inline-block' }}>{children}</div>
}
