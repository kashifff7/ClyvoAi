'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

// Deterministic particles — no Math.random(), multi-color cycling
const ACCENT_COLORS = ['#00E5FF', '#0EA5E9', '#F59E0B', '#10B981', '#00E5FF', '#0EA5E9']
const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left:     `${(i * 37) % 100}%`,
    top:      `${(rand * 100).toFixed(2)}%`,
    size:     1 + (i % 3) * 0.6,
    duration: 5 + (i % 6),
    delay:    (i % 8) * 0.35,
    color:    ACCENT_COLORS[i % ACCENT_COLORS.length],
  }
})

const HEADLINE_WORDS = ['Your', 'industry', 'knowledge', '+', 'our', 'AI', 'expertise', '=', 'real', 'results.']
const ACCENT_WORDS   = new Set(['+', '='])

// Full spectrum gradient (cyan→sky, no violet/rose)
const CTA_GRADIENT = 'linear-gradient(135deg, #00E5FF, #0EA5E9)'

export function FutureScene() {
  return (
    <section id="contact-scene" className="relative overflow-hidden px-6 py-44 sm:py-56">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Multi-color background glows — animate breathing */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="animate-breathe absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full"
          style={{ background: 'rgba(0,229,255,0.10)', filter: 'blur(140px)' }}
        />
        <div
          className="animate-breathe absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full"
          style={{ background: 'rgba(14,165,233,0.10)', filter: 'blur(140px)', animationDelay: '2s' }}
        />
        <div
          className="animate-breathe absolute -bottom-20 right-20 h-[500px] w-[500px] rounded-full"
          style={{ background: 'rgba(245,158,11,0.10)', filter: 'blur(140px)', animationDelay: '4s' }}
        />
        <div
          className="animate-breathe absolute -bottom-20 left-20 h-[400px] w-[400px] rounded-full"
          style={{ background: 'rgba(16,185,129,0.10)', filter: 'blur(140px)', animationDelay: '1s' }}
        />
      </div>

      {/* Rising particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color }}
            animate={{ opacity: [0.04, 0.45, 0.04], y: [0, -30, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="gradient-label font-mono text-xs font-medium uppercase tracking-[0.2em]"
        >
          What&apos;s Next
        </motion.span>

        {/* Word-by-word headline reveal */}
        <h2
          className="mt-5 font-syne font-extrabold tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 1.08 }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`mr-[0.22em] inline-block last:mr-0${ACCENT_WORDS.has(word) ? ' gradient-label' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.055, ease: EASE_CINEMATIC }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_CINEMATIC }}
          className="mt-6 max-w-xl font-inter text-base font-light text-white/50"
        >
          Start with a free 45-minute discovery call. No commitment. No hard sell. Just clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_CINEMATIC }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="btn-active group inline-flex items-center gap-2 rounded-full px-8 py-4 font-inter text-sm font-medium text-[#020205] transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            style={{ background: CTA_GRADIENT }}
          >
            Book Your Free Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="btn-active inline-flex items-center rounded-full border border-white/20 bg-transparent px-8 py-4 font-inter text-sm font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
          >
            Submit an Application
          </a>
        </motion.div>
      </div>
    </section>
  )
}
