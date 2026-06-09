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

export function ImpactScene() {
  return (
    <section id="pricing-scene" className="relative px-6 py-32 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          className="mb-16"
        >
          <span className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35">
            Pricing
          </span>
          <h2 className="mt-5 text-balance font-syne text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
            One model. Full accountability.
          </h2>
          <p className="mt-5 max-w-xl font-inter text-base font-light leading-[1.75] text-white/45">
            A one-time setup fee to build your system, and a monthly retainer
            to keep it running and improving.
          </p>
        </motion.div>

        {/* Cards with subtle divider */}
        <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-0">
          {/* Subtle vertical divider */}
          <div
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 sm:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          />

          {PLAN.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_CINEMATIC }}
              className={`border border-white/[0.10] bg-[#0d0d0d] p-8 transition-all duration-300
                hover:border-white/[0.15]
                ${i === 0
                  ? 'rounded-xl sm:rounded-r-none'
                  : 'rounded-xl sm:rounded-l-none'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.10]">
                  <p.icon className="h-5 w-5 text-white/50" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-semibold text-white">{p.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/35">
                    {p.note}
                  </span>
                </div>
              </div>

              <p className="mt-5 font-inter text-sm font-light leading-[1.75] text-white/45">
                {p.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 font-inter text-sm font-light text-white/50">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
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
          <p className="font-inter text-base font-light text-white/35">
            No fixed package tiers. Every solution is scoped to your real problem.
          </p>
          <a
            href="#contact"
            className="btn-active group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-inter text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book a Discovery Call — it&apos;s free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
