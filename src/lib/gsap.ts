'use client'
// ---------------------------------------------------------------------------
// GSAP singleton for the marketing site. Plugins are registered once, on the
// client only, and every component animates inside a scoped gsap.context() so
// React strict-mode double-mounts (and route changes) clean up after themselves.
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  // Scroll-linked pins jitter less when ScrollTrigger ignores the mobile
  // address-bar resize that fires on every scroll direction change.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger, SplitText }

/** Editorial easing: slow out, long settle. Used everywhere for coherence. */
export const EASE = 'power3.out'
export const EASE_SOFT = 'expo.out'

/**
 * Runs `setup` inside a gsap.context scoped to the returned ref, after webfonts
 * have settled (SplitText mis-measures against a fallback face otherwise).
 * The scoped root element is handed to `setup` so callers never have to reach
 * back into the ref they are in the middle of declaring.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (root: T) => void | (() => void),
  deps: unknown[] = []
) {
  const scope = useRef<T>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined
    let cancelled = false

    const start = () => {
      const root = scope.current
      if (cancelled || !root) return
      ctx = gsap.context(() => setup(root), scope)
      ScrollTrigger.refresh()
    }

    if (document.fonts?.status === 'loaded') start()
    else document.fonts?.ready.then(start).catch(start)

    return () => {
      cancelled = true
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}

/**
 * Media query as state. Reports false on the server and during hydration, so
 * the markup always agrees with the server render, then adapts on mount.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/** True when the visitor asked the OS to keep motion to a minimum. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
