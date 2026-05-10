'use client'
import { useEffect, useRef } from 'react'

export default function DotGridBackground() {
  const gridRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const target = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.06)
      current.current.y = lerp(current.current.y, target.current.y, 0.06)
      const el = gridRef.current
      if (el) {
        el.style.transformOrigin = `${current.current.x * 100}% ${current.current.y * 100}%`
        el.style.transform = `scale(1.1)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    animRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', overflow: 'hidden',
        background: '#FAF5F0',
      }}
    >
      <div
        ref={gridRef}
        style={{
          position: 'absolute', inset: '-10%',
          width: '120%', height: '120%',
          backgroundImage: 'radial-gradient(circle, rgba(110,59,71,0.22) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          willChange: 'transform, transform-origin',
        }}
      />
    </div>
  )
}
