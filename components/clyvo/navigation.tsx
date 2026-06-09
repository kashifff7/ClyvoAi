'use client'

import Image from 'next/image'
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

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <a href="#home" className="mr-2 flex items-center gap-2">
            <LogoBadge size={36} />
            <span className="hidden font-syne text-sm font-semibold text-white sm:block whitespace-nowrap">
              Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center md:flex">
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

          {/* Desktop CTA — clean white */}
          <a
            href="#contact"
            className="ml-2 hidden whitespace-nowrap rounded-full border border-white/20 bg-white px-5 py-2 font-inter text-[13px] font-medium text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] md:block"
          >
            Book a Discovery Call
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:text-white md:hidden"
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
            className="fixed inset-0 z-[60] flex flex-col px-8 py-8 backdrop-blur-2xl"
            style={{ background: 'rgba(0,0,0,0.96)' }}
          >
            <div className="flex items-center justify-between">
              <a href="#home" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <LogoBadge size={40} />
                <span className="font-syne text-lg font-bold text-white">
                  Clyvo <span style={{ color: '#00E5FF' }}>AI</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white"
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
                  className="rounded-xl px-5 py-4 font-syne text-2xl font-bold text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
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
