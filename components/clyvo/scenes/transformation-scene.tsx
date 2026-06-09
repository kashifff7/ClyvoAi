'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Bot, Workflow, Brain, Phone, Plug } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SERVICES = [
  {
    num: '01', icon: Bot,
    title: 'AI Chatbots & Assistants',
    description: 'Custom-trained agents for support, sales qualification, and onboarding — integrated into your existing platforms.',
  },
  {
    num: '02', icon: Workflow,
    title: 'Workflow & Process Automation',
    description: 'End-to-end automation of repetitive processes — lead routing, document handling, approvals, data entry elimination.',
  },
  {
    num: '03', icon: Brain,
    title: 'Custom AI Model Development',
    description: 'Bespoke ML and LLM models trained on your data — predictive analytics, classification, content generation.',
  },
  {
    num: '04', icon: Phone,
    title: 'AI Voice Agents',
    description: 'Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification.',
  },
  {
    num: '05', icon: Plug,
    title: 'System Integrations',
    description: 'AI connected into your existing stack — Salesforce, HubSpot, SAP, NetSuite, APIs, and databases.',
  },
]

const WORDS_HEADLINE = ['Five', 'capabilities.', 'Infinite', 'applications.']

export function TransformationScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
        },
      })

      return () => { tween.scrollTrigger?.kill(); tween.kill() }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services-scene"
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Cyan background glow */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{ background: '#00E5FF', opacity: 0.08, filter: 'blur(180px)' }}
      />

      {/* Header */}
      <div className="relative px-8 pb-10 pt-20 text-center md:px-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: '#00E5FF' }}
        >
          What We Build
        </motion.span>

        <h2
          className="mt-5 font-syne font-bold tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          {WORDS_HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              className="mr-[0.22em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE_CINEMATIC }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_CINEMATIC }}
          className="mx-auto mt-4 max-w-xl font-inter text-base font-light text-white/50"
        >
          Every engagement is built from scratch around your business.
        </motion.p>
      </div>

      {/* Horizontal scrolling track */}
      <div className="relative overflow-visible px-8 md:px-16">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} />
          ))}
          {/* Trailing spacer */}
          <div className="w-16 shrink-0" />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_CINEMATIC }}
      className="group relative flex w-[340px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,229,255,0.40)] hover:bg-[rgba(0,229,255,0.06)]"
      style={{ minHeight: 320 }}
    >
      {/* Top border on hover */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, #00E5FF, #0EA5E9)' }}
      />

      <span
        className="font-syne text-3xl font-bold tracking-tight"
        style={{ color: '#00E5FF' }}
      >
        {s.num}
      </span>

      <div
        className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: 'rgba(0,229,255,0.10)', color: '#00E5FF' }}
      >
        <s.icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 font-syne text-xl font-semibold text-white">{s.title}</h3>
      <p className="mt-3 font-inter text-sm font-light leading-relaxed text-white/50">
        {s.description}
      </p>

      <div className="mt-auto pt-6">
        <span
          className="font-inter text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: '#00E5FF' }}
        >
          Learn more →
        </span>
      </div>
    </motion.div>
  )
}
