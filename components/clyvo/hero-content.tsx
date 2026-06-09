'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'

const E = [0.22, 1, 0.36, 1] as const

// Deterministic white particles
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left:     `${(i * 41) % 100}%`,
    bottom:   `${(rand * 80).toFixed(2)}%`,
    size:     1 + (i % 3) * 0.4,
    duration: `${10 + (i % 7) * 1.8}s`,
    delay:    `${(i % 9) * -1.3}s`,
    opacity:  0.10 + (i % 4) * 0.05,
  }
})

const WORDS = [
  { text: 'Custom', line: 0 },
  { text: 'AI.',    line: 0 },
  { text: 'Real',     line: 1 },
  { text: 'Results.', line: 1 },
]

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const headlineScale    = useTransform(scrollYProgress, [0, 0.35], [1, 0.92])
  const headlineOpacity  = useTransform(scrollYProgress, [0, 0.40], [1, 0])
  const subtextOpacity   = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const orbScale         = useTransform(scrollYProgress, [0, 0.50], [1, 1.40])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <div ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Animated glows — scale with scroll */}
      <motion.div
        style={{ scale: orbScale }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        {/* Strong cyan right glow */}
        <div
          className="animate-hero-blob-a absolute"
          style={{
            right: 0, top: 0,
            width: 900, height: 900,
            background: 'radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle bottom-left echo */}
        <div
          className="animate-hero-blob-b absolute"
          style={{
            left: '-5%', bottom: '-5%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* SVG noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* 60px grid */}
      <div className="hero-grid pointer-events-none absolute inset-0" />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #000000 100%)' }}
      />

      {/* White particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: p.left, bottom: p.bottom,
              width: p.size, height: p.size,
              opacity: p.opacity,
              animation: `particle-rise ${p.duration} ${p.delay} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content — bottom-left */}
      <motion.div
        style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: 'bottom left' }}
        className="absolute bottom-0 left-8 max-w-[90vw] pb-20 will-change-transform md:left-16 md:pb-28"
      >
        {/* Apple-style badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: E }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="font-inter text-xs font-medium text-white/50 tracking-[0.15em]">
            Custom AI Agency · B2B
          </span>
        </motion.div>

        {/* Headline — cinematic size */}
        <h1
          className="font-syne font-extrabold leading-[0.92] text-white"
          style={{ fontSize: 'clamp(4.5rem, 9vw, 9rem)', letterSpacing: '-0.05em', textShadow: '0 0 80px rgba(0,229,255,0.30)' }}
        >
          <span className="block whitespace-nowrap">
            {WORDS.filter(w => w.line === 0).map((w, i) => (
              <motion.span
                key={w.text}
                className="mr-[0.18em] inline-block last:mr-0 overflow-hidden"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.09, ease: E }}
              >
                {w.text}
              </motion.span>
            ))}
          </span>
          <span className="block whitespace-nowrap text-white/20">
            {WORDS.filter(w => w.line === 1).map((w, i) => (
              <motion.span
                key={w.text}
                className="mr-[0.18em] inline-block last:mr-0 overflow-hidden"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, delay: 0.65 + i * 0.09, ease: E }}
              >
                {w.text}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Descriptor */}
        <motion.div style={{ opacity: subtextOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: E }}
            className="mt-5 max-w-[420px] font-inter text-lg font-light leading-[1.75] text-white/45"
          >
            We build end-to-end AI systems for B2B businesses — from scratch,
            for your exact operations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: E }}
            className="mt-7 font-mono text-sm tracking-widest text-white/20"
          >
            100% Custom &nbsp;·&nbsp; B2B Only &nbsp;·&nbsp; Setup + Retainer
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: E }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="btn-active group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-inter text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.03]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book a Free Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#solutions"
            className="btn-active inline-flex items-center rounded-full border-2 border-white/20 px-8 py-4 font-inter text-base font-medium text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5"
          >
            See What We Build
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom-right */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 right-10 hidden items-end gap-3 md:flex"
      >
        <span
          className="font-mono text-[9px] tracking-[0.4em] text-white/20"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4 text-white/25" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
