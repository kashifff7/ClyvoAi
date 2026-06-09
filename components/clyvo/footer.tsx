const NAV_LINKS = [
  { href: '#solutions',    label: 'Solutions' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#about',        label: 'About' },
  { href: '#contact',      label: 'Apply' },
]

// Section hover accent colors matching each nav section
const LINK_ACCENTS: Record<string, string> = {
  '#solutions':    '#F43F5E',
  '#how-it-works': '#10B981',
  '#pricing':      '#00E5FF',
  '#about':        '#F59E0B',
  '#contact':      '#0EA5E9',
}

const LOGO_GRADIENT  = 'linear-gradient(135deg, #00E5FF, #0EA5E9)'
const TOP_GRADIENT   = 'linear-gradient(90deg, #00E5FF, #0EA5E9, #F59E0B, #10B981)'

export function Footer() {
  return (
    <footer className="relative bg-transparent">
      {/* Top gradient line — full spectrum */}
      <div className="h-px w-full" style={{ background: TOP_GRADIENT }} />

      {/* Main footer row */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <a href="#home" className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-[#020205]"
              style={{ background: LOGO_GRADIENT }}
            >
              C
            </span>
            <span className="font-syne text-lg font-semibold text-white">Clyvo</span>
            <span className="font-syne text-lg font-semibold" style={{ color: '#00E5FF' }}>AI</span>
          </a>
          <p className="font-inter text-sm text-white/30">Custom AI. Real Results.</p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="group font-inter text-sm text-white/40 transition-colors duration-200"
                >
                  <span
                    className="transition-[color] duration-200 group-hover:text-white/80"
                    style={{ ['--accent' as string]: LINK_ACCENTS[link.href] ?? '#00E5FF' }}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="shrink-0 rounded-full px-5 py-2.5 font-inter text-sm font-medium text-[#020205] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: LOGO_GRADIENT }}
        >
          Book a Discovery Call
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 font-inter text-xs text-white/20 sm:flex-row">
          <p>© 2026 Clyvo AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/50">Privacy</a>
            <a href="#" className="transition-colors hover:text-white/50">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
