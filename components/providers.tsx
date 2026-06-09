'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let lenis: { raf: (t: number) => void; on: (event: string, cb: () => void) => void; destroy: () => void } | null = null
    let rafId: number

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      } as ConstructorParameters<typeof Lenis>[0])

      // Connect Lenis scroll events to GSAP ScrollTrigger
      lenis.on('scroll', () => ScrollTrigger.update())

      // Drive Lenis via GSAP's ticker so ScrollTrigger pinning stays in sync
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // Also keep a native RAF fallback for initial load
      function raf(time: number) {
        rafId = requestAnimationFrame(raf)
        void time
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      gsap.ticker.remove((time) => { lenis?.raf(time * 1000) })
      ScrollTrigger.killAll()
    }
  }, [])

  return <>{children}</>
}
