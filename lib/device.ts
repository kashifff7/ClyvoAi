'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

export function useIsLowEnd(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false)
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const concurrency = navigator.hardwareConcurrency ?? 8
    const memory = nav.deviceMemory ?? 8
    setIsLowEnd(concurrency <= 4 || memory <= 4)
  }, [])
  return isLowEnd
}
