'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/lib/device'

// Lazy-load the heavy WebGL canvas — don't block initial paint
const BeamsCanvas = dynamic(() => import('./beams-background'), { ssr: false })
const ParticleCanvas = dynamic(() => import('./global-background-canvas'), { ssr: false })

export function GlobalBackground() {
  const isMobile = useIsMobile()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    // NOTE: no overflow-hidden here — the canvas is fixed positioned and must
    // NOT be clipped by its parent. Use pointer-events-none so it never
    // intercepts clicks.
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Ambient cyan gradient orbs — CSS only, zero perf cost */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        top: '-20vw', right: '-20vw',
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        filter: 'blur(140px)',
        animation: 'float-a 14s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        bottom: '-15vw', left: '-15vw',
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
        filter: 'blur(120px)',
        animation: 'float-b 18s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Beams WebGL — desktop only, mounted after initial paint */}
      {!isMobile && ready && (
        <>
          <BeamsCanvas />
          <ParticleCanvas />
        </>
      )}
    </div>
  )
}
