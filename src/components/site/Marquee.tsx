'use client'
import { gsap, ScrollTrigger, useGsap, usePrefersReducedMotion } from '@/lib/gsap'
import { asset } from '@/lib/asset'

const ITEMS = [
  { text: 'a rainy tuesday pour-over', img: '/dishes/ethiopian-pour-over.jpg' },
  { text: 'forty minutes in the cold', em: 'worth it', img: '/dishes/miso-ramen.jpg' },
  { text: 'the tart you ate too slowly', img: '/dishes/pistachio-tart.jpg' },
  { text: 'a sunday that went nowhere', em: 'kept', img: '/dishes/ricotta-pancakes.jpg' },
  { text: 'a lane maps barely believes in', img: '/dishes/salted-caramel-crepe.jpg' },
  { text: 'burrata, and no plans after', img: '/dishes/burrata-toast.jpg' },
]

function Set({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="site-marquee-set" aria-hidden={hidden || undefined}>
      {ITEMS.map((it) => (
        <span className="site-marquee-item" key={it.text}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="site-marquee-dot" src={asset(it.img)} alt="" />
          {it.text}
          {it.em && <em>&nbsp;{it.em}</em>}
          <span style={{ color: 'var(--amber)', opacity: 0.5 }}>·</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const reduced = usePrefersReducedMotion()

  const scope = useGsap((root) => {
    if (reduced) return

    const row = root.querySelector<HTMLElement>('.site-marquee-row')!
    const loop = gsap.to(row, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 })

    // Scrolling shoves the strip along and shears it: the faster you move,
    // the more the type leans. It settles back the moment you stop.
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-14, 14, self.getVelocity() / 190)
        gsap.to(loop, { timeScale: 1 + Math.abs(v) * 0.55, duration: 0.4, overwrite: true })
        gsap.to(row, { skewX: -v * 0.55, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      },
    })

    return () => {
      loop.kill()
      st.kill()
    }
  }, [reduced])

  return (
    <section ref={scope} className="site-section site-ink site-grain site-marquee">
      <div className="site-marquee-row">
        <Set />
        <Set hidden />
      </div>
    </section>
  )
}
