'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#solutions',    label: 'Solutions' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#about',        label: 'About' },
  { href: '#contact',      label: 'Apply' },
]

const E = [0.22, 1, 0.36, 1] as const

// Cyan → sky gradient (no violet)
const CTA_GRADIENT = 'linear-gradient(135deg, #00E5FF, #0EA5E9)'

export function Navigation() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Centered floating pill */}
      <motion.nav
        initial={{ y: -20, opacity: 0, x: '-50%' }}
        animate={{ y: 0,   opacity: 1, x: '-50%' }}
        transition={{ duration: 0.8, delay: 0.1, ease: E }}
        className="fixed top-5 left-1/2 z-50"
      >
        <div
          className="flex items-center gap-1 rounded-full border px-4 py-2.5 transition-all duration-500"
          style={{
            background:           scrolled ? 'rgba(2,2,5,0.90)' : 'rgba(255,255,255,0.05)',
            borderColor:          scrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.10)',
            backdropFilter:       'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow:            scrolled ? '0 8px 40px rgba(0,0,0,0.80)' : 'none',
          }}
        >
          {/* Logo */}
          <a href="#home" className="mr-3 flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-[#020205]"
              style={{ background: CTA_GRADIENT }}
            >
              C
            </span>
            <span className="hidden font-syne text-sm font-semibold text-white sm:block">
              Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-4 font-inter text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="ml-3 hidden rounded-full px-5 py-2.5 font-inter text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] md:block"
            style={{ background: CTA_GRADIENT }}
          >
            Book a Discovery Call
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
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
            className="fixed inset-0 z-[60] flex flex-col bg-[#020205]/96 px-8 py-8 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <a href="#home" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-[#020205]"
                  style={{ background: CTA_GRADIENT }}
                >
                  C
                </span>
                <span className="font-syne text-lg font-bold text-white">
                  Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: E }}
                  className="rounded-2xl px-5 py-4 font-syne text-2xl font-bold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full py-4 text-center font-inter text-base font-medium text-[#020205]"
                style={{ background: CTA_GRADIENT }}
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
