'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const pos = useRef({ x: -200, y: -200 })
  const hovering = useRef(false)
  const clicking = useRef(false)
  const rafId = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onDown = () => {
      clicking.current = true
      if (outerRef.current) {
        outerRef.current.style.transform = outerRef.current.style.transform + ' scale(0.7)'
      }
    }
    const onUp = () => { clicking.current = false }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [data-magnetic]')) {
        hovering.current = true
        if (outerRef.current) {
          outerRef.current.style.width = '56px'
          outerRef.current.style.height = '56px'
          outerRef.current.style.backgroundColor = 'rgba(110,59,71,0.18)'
          outerRef.current.style.mixBlendMode = 'normal'
        }
        if (innerRef.current) innerRef.current.style.opacity = '0'
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [data-magnetic]')) {
        hovering.current = false
        if (outerRef.current) {
          outerRef.current.style.width = '40px'
          outerRef.current.style.height = '40px'
          outerRef.current.style.backgroundColor = 'rgba(110,59,71,0.08)'
        }
        if (innerRef.current) innerRef.current.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12)
      const size = hovering.current ? 56 : 40
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #6E3B47',
          backgroundColor: 'rgba(110,59,71,0.08)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#6E3B47',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.15s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
