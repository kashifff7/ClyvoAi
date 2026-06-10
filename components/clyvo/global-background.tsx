'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/lib/device'

const ParticleCanvas = dynamic(() => import('./global-background-canvas'), { ssr: false })
const BeamsCanvas    = dynamic(() => import('./beams-background'), { ssr: false })

export function GlobalBackground() {
  const isMobile = useIsMobile()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient cyan orbs — pure CSS, always visible */}
      <div className="absolute" style={{
        width: isMobile ? 500 : 900, height: isMobile ? 500 : 900,
        top: -250, right: -250,
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        filter: 'blur(140px)',
        animation: 'float-a 14s ease-in-out infinite',
      }} />
      <div className="absolute" style={{
        width: isMobile ? 400 : 700, height: isMobile ? 400 : 700,
        bottom: -200, left: -200,
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
        filter: 'blur(120px)',
        animation: 'float-b 18s ease-in-out infinite',
      }} />

      {/* Beams — desktop only, lazy mounted */}
      {!isMobile && ready && (
        <>
          <BeamsCanvas />
          <div className="absolute inset-0">
            <ParticleCanvas />
          </div>
        </>
      )}
    </div>
  )
}
