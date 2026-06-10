'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, MessageSquare, GitBranch, Cpu, Phone, Link2 } from 'lucide-react'

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

const NAV_LINKS = [
  { href: '#solutions',    label: 'Solutions',     dropdown: false },
  { href: '/how-it-works', label: 'How It Works',  dropdown: false },
  { href: '/pricing',      label: 'Pricing',       dropdown: false },
  { href: '#about',        label: 'About',         dropdown: false },
]

const E = [0.22, 1, 0.36, 1] as const

/* ─── Solutions dropdown ────────────────────────────────────── */
function SolutionsDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="solutions-dropdown"
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.20, ease: E }}
      className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {SERVICES.map((s) => (
        <a
          key={s.href}
          href={s.href}
          onClick={onClose}
          className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 font-inter text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white"
        >
          <span className="text-white/35">{s.icon}</span>
          {s.name}
        </a>
      ))}
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
              <div
                className="relative"
                onMouseEnter={openSolutions}
                onMouseLeave={closeSolutions}
              >
                <button
                  type="button"
                  className="nav-link flex items-center gap-1 whitespace-nowrap px-3 font-inter text-[13px] text-white/45 transition-colors duration-200 hover:text-white"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  aria-expanded={solutionsOpen}
                >
                  Solutions
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-200"
                    style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <AnimatePresence>
                  {solutionsOpen && <SolutionsDropdown onClose={() => setSolutionsOpen(false)} />}
                </AnimatePresence>
              </div>

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
            className="fixed inset-0 z-[60] flex max-h-screen flex-col overflow-y-auto px-8 py-8 backdrop-blur-2xl"
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
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 300, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="flex flex-col">
                      {SERVICES.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          onClick={closeMobile}
                          className="block w-full pl-8 py-3 font-inter text-sm text-white/50 transition-colors hover:text-white"
                        >
                          {s.name}
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
