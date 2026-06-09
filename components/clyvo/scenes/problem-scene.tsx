'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { MessageSquareOff, Building2 } from 'lucide-react'

const ALTERNATIVES = [
  {
    icon: MessageSquareOff,
    title: 'Generic AI Tools',
    description:
      "ChatGPT and off-the-shelf platforms weren't built for your processes, your data, or the way your business actually runs.",
  },
  {
    icon: Building2,
    title: 'Large IT Consultancies',
    description:
      'Slow timelines, bloated teams, and over-engineered solutions that cost a fortune and take months to ship.',
  },
]

export function ProblemScene() {
  return (
    <section id="solutions-scene" className="relative px-6 py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Rose background glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: '#F43F5E', opacity: 0.06, filter: 'blur(180px)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_440px]">

          {/* Left — slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          >
            <span
              className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: '#F43F5E' }}
            >
              The Problem
            </span>
            <h2 className="mt-5 text-balance font-syne text-5xl font-bold leading-tight tracking-[-0.03em] text-white md:text-6xl">
              Generic AI wasn&apos;t built for your business.
            </h2>
            <p className="mt-6 max-w-lg text-balance font-inter text-base font-light leading-relaxed text-white/50">
              Most B2B teams are stuck choosing between two bad options — neither designed
              around how their business actually operates.
            </p>
          </motion.div>

          {/* Right — cards stagger from right */}
          <div className="space-y-4">
            {ALTERNATIVES.map((alt, i) => (
              <motion.div
                key={alt.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: EASE_CINEMATIC }}
                className="problem-card rounded-3xl p-7"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(244,63,94,0.10)', color: '#F43F5E' }}
                >
                  <alt.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-syne text-base font-semibold text-white">{alt.title}</h3>
                <p className="mt-2 font-inter text-sm font-light leading-relaxed text-white/50">
                  {alt.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_CINEMATIC }}
          className="mt-16 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center md:p-12"
        >
          <p className="font-syne text-2xl font-bold text-white md:text-3xl">
            Clyvo AI is the{' '}
            <span style={{ color: '#00E5FF' }}>sharp, expert, custom</span>{' '}
            alternative.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
