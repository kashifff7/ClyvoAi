'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Building, Building2, Landmark, CheckCircle2 } from 'lucide-react'

const CLIENT_TYPES = [
  {
    icon: Building,
    range: '10–200 employees',
    title: 'SMBs',
    description: 'Automate operations, reduce manual work, and compete with larger players using AI.',
    iconBg:   'rgba(0,229,255,0.10)',
    iconColor: '#00E5FF',
    hoverBorder: 'rgba(0,229,255,0.40)',
    hoverGlow:   'rgba(0,229,255,0.15)',
    rangeColor:  'rgba(0,229,255,0.70)',
  },
  {
    icon: Building2,
    range: '200–2,000 employees',
    title: 'Mid-Market',
    description: 'Custom AI that integrates cleanly into your existing enterprise systems.',
    iconBg:   'rgba(14,165,233,0.10)',
    iconColor: '#0EA5E9',
    hoverBorder: 'rgba(14,165,233,0.40)',
    hoverGlow:   'rgba(14,165,233,0.15)',
    rangeColor:  'rgba(14,165,233,0.70)',
  },
  {
    icon: Landmark,
    range: 'Complex environments',
    title: 'Enterprise',
    description: 'Complex requirements, multi-system environments, and bespoke AI infrastructure.',
    iconBg:   'rgba(245,158,11,0.10)',
    iconColor: '#F59E0B',
    hoverBorder: 'rgba(245,158,11,0.40)',
    hoverGlow:   'rgba(245,158,11,0.15)',
    rangeColor:  'rgba(245,158,11,0.70)',
  },
]

const IDEAL_TRAITS = [
  'A B2B business with repetitive, manual processes',
  'Existing systems and tools already in use',
  'A decision-maker who understands ROI',
  'Ready to move fast — not waiting for a committee',
]

export function CommandCenterScene() {
  return (
    <section id="about-scene" className="relative px-6 py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Amber center-bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[440px] w-[640px] -translate-x-1/2 rounded-full"
        style={{ background: '#F59E0B', opacity: 0.06, filter: 'blur(180px)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          className="mb-16 text-center"
        >
          <span
            className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: '#F59E0B' }}
          >
            Who We Work With
          </span>
          <h2
            className="mt-5 text-balance font-syne font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            Built for B2B businesses of every size
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-inter text-base font-light text-white/50">
            Whatever stage you&apos;re at, we scope the engagement to match the scale
            and complexity of your operations.
          </p>
        </motion.div>

        {/* Cards — perspective 3D entrance */}
        <div style={{ perspective: 1000 }} className="grid gap-5 sm:grid-cols-3">
          {CLIENT_TYPES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE_CINEMATIC }}
              whileHover={{
                y: -6,
                boxShadow: `0 24px 60px ${c.hoverGlow}`,
                borderColor: c.hoverBorder,
              }}
              className="cursor-default rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-[background,border-color] duration-300 will-change-transform hover:bg-white/[0.06]"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: c.iconBg, color: c.iconColor }}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-syne text-lg font-semibold text-white">{c.title}</h3>
              <span
                className="mt-1 block font-mono text-xs uppercase tracking-[0.15em]"
                style={{ color: c.rangeColor }}
              >
                {c.range}
              </span>
              <p className="mt-3 font-inter text-sm font-light leading-relaxed text-white/50">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ideal fit banner — amber left border */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMATIC }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-10"
          style={{ borderLeft: '4px solid #F59E0B' }}
        >
          <span
            className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: '#F59E0B' }}
          >
            Your Ideal Fit
          </span>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {IDEAL_TRAITS.map((trait) => (
              <li key={trait} className="flex items-start gap-3 font-inter text-sm font-light text-white/60">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: '#00E5FF' }}
                />
                {trait}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
