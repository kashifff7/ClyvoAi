'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { ArrowRight, Hammer, RefreshCw } from 'lucide-react'

const PLAN = [
  {
    icon: Hammer,
    title: 'Setup Fee',
    note: 'Priced per project',
    description: 'A one-time investment covering everything from discovery through to live deployment.',
    deliverables: ['Discovery & scoping', 'Solution design', 'Development & testing', 'Deployment & handover'],
    side: 'left',
  },
  {
    icon: RefreshCw,
    title: 'Monthly Retainer',
    note: 'Ongoing partnership',
    description: 'Your AI system running, improving, and adapting to your business as it evolves.',
    deliverables: ['Monitoring & maintenance', 'Model updates & retraining', 'New feature development', 'Priority support'],
    side: 'right',
  },
]

// Cyan → sky gradient (no violet)
const CARD_GRADIENT = 'linear-gradient(90deg, #00E5FF, #0EA5E9)'

export function ImpactScene() {
  return (
    <section id="pricing-scene" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Cyan left glow */}
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full"
        style={{ background: '#00E5FF', opacity: 0.05, filter: 'blur(180px)' }}
      />
      {/* Sky right glow */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full"
        style={{ background: '#0EA5E9', opacity: 0.05, filter: 'blur(180px)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          className="mb-16 text-center"
        >
          <span className="gradient-label font-mono text-xs font-medium uppercase tracking-[0.2em]">
            Pricing
          </span>
          <h2
            className="mt-5 text-balance font-syne font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            One model. Full accountability.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-inter text-base font-light text-white/50">
            A one-time setup fee to build your system, and a monthly retainer
            to keep it running and improving.
          </p>
        </motion.div>

        {/* Cards with glowing divider */}
        <div className="relative grid gap-5 sm:grid-cols-2 sm:gap-0">
          {/* Glowing vertical divider */}
          <div
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 sm:block"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,229,255,0.50), rgba(14,165,233,0.50), transparent)',
              boxShadow: '0 0 16px 1px rgba(0,229,255,0.18)',
            }}
          />

          {PLAN.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_CINEMATIC }}
              className={`group relative border border-white/10 bg-white/[0.04] p-8 transition-all duration-500
                hover:border-white/20 hover:bg-white/[0.07]
                ${i === 0
                  ? 'rounded-3xl sm:rounded-r-none'
                  : 'rounded-3xl sm:rounded-l-none'
                }`}
            >
              {/* Gradient top border on hover */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: CARD_GRADIENT }}
              />

              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(0,229,255,0.10)', color: '#00E5FF' }}
                >
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-semibold text-white">{p.title}</h3>
                  <span
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'rgba(0,229,255,0.70)' }}
                  >
                    {p.note}
                  </span>
                </div>
              </div>

              <p className="mt-5 font-inter text-sm font-light leading-relaxed text-white/50">
                {p.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 font-inter text-sm font-light text-white/60">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: '#00E5FF' }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_CINEMATIC }}
          className="mt-16 flex flex-col items-center gap-6 text-center"
        >
          <p className="font-inter text-base font-light text-white/40">
            No fixed package tiers. Every solution is scoped to your real problem.
          </p>
          <a
            href="#contact"
            className="btn-active group inline-flex items-center gap-2 rounded-full px-8 py-4 font-inter text-sm font-medium text-[#020205] transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            style={{ background: CARD_GRADIENT }}
          >
            Book a Discovery Call — it&apos;s free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
