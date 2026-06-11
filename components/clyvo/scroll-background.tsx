'use client'

import { useScroll, useTransform, useMotionValueEvent } from 'motion/react'

// Light theme — stays near #f8f8f6, barely shifts
const STOPS  = [0,         0.15,      0.30,      0.45,      0.60,      0.75,      0.90,      1.00]
const COLORS = ['#f8f8f6','#f8f8f6','#f7f8f6','#f6f8f8','#f6f8f7','#f7f8f6','#f6f8f8','#f8f8f6']

export function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const bg = useTransform(scrollYProgress, STOPS, COLORS)
  useMotionValueEvent(bg, 'change', (latest) => {
    document.body.style.backgroundColor = latest
  })
  return null
}
