'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })
    let raf: number
    const loop = () => {
      cx += (x - cx) * 0.06
      cy += (y - cy) * 0.06
      if (ref.current) {
        ref.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-0 hidden md:block"
      style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
  )
}
