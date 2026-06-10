'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, MessageSquare, GitBranch, Cpu, Phone, Link2, ArrowRight } from 'lucide-react'

/* ─── Logo filter chain ─────────────────────────────────────── */
const LOGO_FILTER = [
  'invert(1)',
  'sepia(1)',
  'saturate(5)',
  'hue-rotate(155deg)',
  'drop-shadow(0 0 5px rgba(0,229,255,0.95))',
  'drop-shadow(0 0 14px rgba(0,229,255,0.60))',
  'drop-shadow(0 0 28px rgba(0,229,255,0.25))',
].join(' ')

function LogoBadge({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Clyvo AI"
      width={size}
      height={size}
      style={{
        objectFit:    'contain',
        flexShrink:   0,
        filter:       LOGO_FILTER,
        mixBlendMode: 'screen',
        animation:    'logo-float-3d 5s ease-in-out infinite',
      }}
    />
  )
}

/* ─── Data ──────────────────────────────────────────────────── */
const SERVICES = [
  {
    href:  '/services/ai-chatbots',
    icon:  <MessageSquare className="h-4 w-4" />,
    name:  'AI Chatbots & Assistants',
    desc:  'Conversations that convert 24/7',
  },
  {
    href:  '/services/workflow-automation',
    icon:  <GitBranch className="h-4 w-4" />,
    name:  'Workflow Automation',
    desc:  'Eliminate repetitive manual work',
  },
  {
    href:  '/services/custom-ai-models',
    icon:  <Cpu className="h-4 w-4" />,
    name:  'Custom AI Models',
    desc:  'AI trained on your own data',
  },
  {
    href:  '/services/voice-agents',
    icon:  <Phone className="h-4 w-4" />,
    name:  'AI Voice Agents',
    desc:  'Handle calls like your best rep',
  },
  {
    href:  '/services/system-integrations',
    icon:  <Link2 className="h-4 w-4" />,
    name:  'System Integrations',
    desc:  'Connect AI to your full stack',
  },
]

const QUICK_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing',      label: 'Pricing'      },
  { href: '/apply',        label: 'Apply Now'    },
  { href: '/book',         label: 'Book a Call'  },
]

const NAV_LINKS = [
  { href: '#solutions',    label: 'Solutions',     dropdown: false },
  { href: '/how-it-works', label: 'How It Works',  dropdown: false },
  { href: '/pricing',      label: 'Pricing',       dropdown: false },
  { href: '#about',        label: 'About',         dropdown: false },
]

const E = [0.22, 1, 0.36, 1] as const

/* ─── Mega menu ─────────────────────────────────────────────── */
function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="mega-menu"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.20, ease: E }}
      className="absolute top-full left-1/2 z-50 mt-3 w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl"
      style={{
        background:           'rgba(8,8,8,0.97)',
        border:               '1px solid rgba(255,255,255,0.10)',
        backdropFilter:       'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        boxShadow:            '0 24px 64px rgba(0,0,0,0.60)',
      }}
    >
      <div className="grid grid-cols-[1fr_160px]">
        {/* Left — services */}
        <div className="p-4">
          <p className="mb-2 px-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Our Services
          </p>
          {SERVICES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 hover:bg-white/[0.04]"
              style={{ borderLeft: '2px solid transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = '#00E5FF' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = 'transparent' }}
            >
              <span className="mt-0.5 shrink-0 text-white/35 group-hover:text-[#00E5FF] transition-colors">
                {s.icon}
              </span>
              <div>
                <div className="font-inter text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                  {s.name}
                </div>
                <div className="font-inter text-[11px] text-white/30">{s.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Right — quick links */}
        <div
          className="flex flex-col p-4"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="mb-2 font-inter text-[10px] font-semibold uppercase tracking-widest text-white/25">
            Quick Links
          </p>
          {QUICK_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="group flex items-center justify-between rounded-lg px-3 py-2 font-inter text-xs text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              {l.label}
              <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main component ────────────────────────────────────────── */
export function Navigation() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [solutionsOpen,  setSolutionsOpen]  = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function openSolutions()  {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setSolutionsOpen(true)
  }
  function closeSolutions() {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 120)
  }
  function closeMobile()    { setMobileOpen(false); setMobileExpanded(false) }

  return (
    <>
      {/* Floating pill nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0, x: '-50%' }}
        animate={{ y: 0,   opacity: 1, x: '-50%' }}
        transition={{ duration: 0.8, delay: 0.1, ease: E }}
        className="fixed top-5 left-1/2 z-50"
      >
        {/* Relative wrapper so MegaMenu can use absolute positioning */}
        <div className="relative">
          <div
            className="flex items-center gap-1 rounded-full border px-4 py-2"
            style={{
              background:           'rgba(255,255,255,0.04)',
              borderColor:          'rgba(255,255,255,0.10)',
              backdropFilter:       'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow:            '0 4px 32px rgba(0,0,0,0.40)',
            }}
          >
            {/* Logo */}
            <a href="/" className="mr-2 flex items-center gap-2">
              <LogoBadge size={36} />
              <span className="hidden font-syne text-sm font-semibold text-white sm:block whitespace-nowrap">
                Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center md:flex">
              {/* Solutions — dropdown trigger */}
              <button
                type="button"
                className="nav-link flex items-center gap-1 whitespace-nowrap px-3 font-inter text-[13px] text-white/45 transition-colors duration-200 hover:text-white"
                onMouseEnter={openSolutions}
                onMouseLeave={closeSolutions}
                onClick={() => setSolutionsOpen((v) => !v)}
                aria-expanded={solutionsOpen}
              >
                Solutions
                <ChevronDown
                  className="h-3 w-3 transition-transform duration-200"
                  style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link whitespace-nowrap px-3 font-inter text-[13px] text-white/45 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="/book"
              className="ml-2 hidden whitespace-nowrap rounded-full border border-white/20 bg-white px-5 py-2 font-inter text-[13px] font-medium text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] md:block"
            >
              Book a Discovery Call
            </a>

            {/* Mobile hamburger — 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-white/50 hover:text-white md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Mega menu dropdown — hover zone covers both trigger and panel */}
          <div
            onMouseEnter={openSolutions}
            onMouseLeave={closeSolutions}
          >
            <AnimatePresence>
              {solutionsOpen && <MegaMenu onClose={() => setSolutionsOpen(false)} />}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: E }}
            className="fixed inset-0 z-[60] flex flex-col px-8 py-8 backdrop-blur-2xl"
            style={{ background: 'rgba(0,0,0,0.96)' }}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2.5" onClick={closeMobile}>
                <LogoBadge size={40} />
                <span className="font-syne text-lg font-bold text-white">
                  Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
                </span>
              </a>
              <button
                type="button"
                onClick={closeMobile}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-10 flex flex-col gap-1 overflow-y-auto">
              {/* Solutions accordion */}
              <button
                type="button"
                onClick={() => setMobileExpanded((v) => !v)}
                className="flex items-center justify-between rounded-xl px-5 py-4 font-syne text-2xl font-bold text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                Solutions
                <ChevronDown
                  className="h-5 w-5 transition-transform duration-200"
                  style={{ transform: mobileExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {mobileExpanded && (
                  <motion.div
                    key="mobile-solutions"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: E }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 flex flex-col gap-1 py-1">
                      {SERVICES.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                          style={{ borderLeft: '2px solid rgba(0,229,255,0.30)' }}
                        >
                          <span className="text-white/35">{s.icon}</span>
                          <div>
                            <div className="font-syne text-base font-semibold">{s.name}</div>
                            <div className="font-inter text-xs text-white/30">{s.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: E }}
                  className="rounded-xl px-5 py-4 font-syne text-2xl font-bold text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="/book"
                onClick={closeMobile}
                className="block rounded-full bg-white py-4 text-center font-inter text-base font-medium text-black"
              >
                Book a Discovery Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
