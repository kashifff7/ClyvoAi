'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { num: '01', title: 'Discovery Call',           description: 'A free 45-minute call to understand your business, pain points, systems, and goals. No hard sell.' },
  { num: '02', title: 'Scoping & Proposal',        description: 'A full solution architecture, deliverables, timeline, and pricing — laid out clearly before we begin.' },
  { num: '03', title: 'Build & Development',       description: 'Custom development with regular progress updates, so you always know exactly where things stand.' },
  { num: '04', title: 'Testing & QA',             description: 'Rigorous testing against real business scenarios, with client UAT included before anything goes live.' },
  { num: '05', title: 'Deployment & Integration', description: 'Live deployment into your environment with full system integration and complete handover documentation.' },
  { num: '06', title: 'Retainer & Optimisation',  description: 'Ongoing monitoring, model updates, retraining, and new feature development as your business evolves.' },
]

function StepItem({
  progress,
  step,
  index,
  total,
}: {
  progress: MotionValue<number>
  step: typeof STEPS[0]
  index: number
  total: number
}) {
  const sliceStart = 0.08 + (index / total) * 0.78
  const sliceEnd   = sliceStart + 0.10

  // 0 = upcoming, 1 = active, fades to 0.4 once passed
  const numOpacity = useTransform(
    progress,
    [Math.max(0, sliceStart - 0.03), sliceEnd, Math.min(1, sliceEnd + 0.28)],
    [0.20, 1, 0.40]
  )
  const contentOpacity = useTransform(progress, [sliceStart, sliceEnd], [0, 1])
  const contentX       = useTransform(progress, [sliceStart, sliceEnd], [28, 0])

  // Is the step "active" (currently in focus)?
  const dotScale = useTransform(
    progress,
    [Math.max(0, sliceStart - 0.02), sliceEnd, Math.min(1, sliceEnd + 0.15)],
    [0.6, 1.4, 1.0]
  )
  const dotGlow  = useTransform(
    progress,
    [Math.max(0, sliceStart - 0.02), sliceEnd, Math.min(1, sliceEnd + 0.15)],
    [0, 1, 0.3]
  )
  // Passed = completed
  const isCompleted = useTransform(progress, (v) => v > sliceEnd + 0.05)

  return (
    <div className="relative grid items-start gap-6 border-t border-white/8 py-10 first:border-0 first:pt-0 sm:grid-cols-[80px_1fr]">
      {/* Connector dot on left rail */}
      <motion.div
        className="absolute -left-[1.375rem] top-10 h-2.5 w-2.5 rounded-full first:top-0"
        style={{
          scale: dotScale,
          background: '#00E5FF',
          boxShadow: useTransform(dotGlow, (v) => `0 0 ${v * 16}px ${v * 6}px rgba(0,229,255,0.6)`),
        }}
      />

      {/* Step number */}
      <motion.div
        className="relative flex items-center gap-2"
        style={{ opacity: numOpacity }}
      >
        <motion.span
          className="font-mono text-4xl font-bold leading-none tracking-tight"
          style={{ color: '#00E5FF' }}
        >
          {step.num}
        </motion.span>
        {/* Checkmark when completed */}
        <motion.div style={{ opacity: useTransform(isCompleted, (v) => (v ? 1 : 0)) }}>
          <Check className="h-4 w-4" style={{ color: '#10B981' }} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, x: contentX }}
        className="will-change-transform"
      >
        <h3 className="font-syne text-xl font-semibold text-white">{step.title}</h3>
        <p className="mt-2 font-inter text-base font-light leading-relaxed text-white/50">
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export function OperatingLayerScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.90], [0, 1])

  return (
    <section ref={sectionRef} id="how-it-works-scene" className="relative px-6 py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Cyan left glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full"
        style={{ background: '#00E5FF', opacity: 0.05, filter: 'blur(180px)' }}
      />
      {/* Green right glow */}
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full"
        style={{ background: '#10B981', opacity: 0.06, filter: 'blur(180px)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
          className="mb-16"
        >
          <span className="gradient-label font-mono text-xs font-medium uppercase tracking-[0.2em]">
            How It Works
          </span>
          <h2
            className="mt-5 text-balance font-syne font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            A process built for results, not risk.
          </h2>
          <p className="mt-5 max-w-xl font-inter text-base font-light text-white/50">
            Six clear stages, full transparency throughout — from the first call to live and beyond.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="flex gap-10 sm:gap-16">
          {/* Vertical progress line */}
          <div className="relative hidden shrink-0 flex-col items-center sm:flex" style={{ width: 2 }}>
            <div className="absolute inset-0 rounded-full bg-white/8" />
            <motion.div
              className="timeline-line absolute top-0 w-full rounded-full will-change-transform"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex-1">
            {STEPS.map((step, i) => (
              <StepItem
                key={step.num}
                progress={scrollYProgress}
                step={step}
                index={i}
                total={STEPS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
