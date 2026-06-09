'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function PageSkeleton() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-skeleton"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col justify-end bg-background px-8 pb-20 md:px-16 md:pb-32"
        >
          {/* Badge */}
          <div className="shimmer-bar mb-8 h-6 w-36 rounded-full" />
          {/* Headline lines */}
          <div className="space-y-4">
            <div className="shimmer-bar h-20 w-3/4 rounded-2xl md:h-28" />
            <div className="shimmer-bar h-20 w-2/3 rounded-2xl md:h-28" />
          </div>
          {/* Subheadline */}
          <div className="mt-8 space-y-2.5">
            <div className="shimmer-bar h-4 w-full max-w-md rounded-lg" />
            <div className="shimmer-bar h-4 w-5/6 max-w-md rounded-lg" />
          </div>
          {/* CTA buttons */}
          <div className="mt-10 flex gap-4">
            <div className="shimmer-bar h-14 w-52 rounded-full" />
            <div className="shimmer-bar h-14 w-44 rounded-full" style={{ opacity: 0.6 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
