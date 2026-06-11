import Image from 'next/image'

const LOGO_FILTER = [
  'invert(0)',
  'sepia(1)',
  'saturate(5)',
  'hue-rotate(155deg)',
  'drop-shadow(0 0 5px rgba(0,229,255,0.95))',
  'drop-shadow(0 0 14px rgba(0,229,255,0.60))',
  'drop-shadow(0 0 28px rgba(0,229,255,0.25))',
].join(' ')

function LogoBadge() {
  return (
    <Image
      src="/logo.png"
      alt="Clyvo AI"
      width={32}
      height={32}
      style={{
        objectFit:    'contain',
        flexShrink:   0,
        filter:       LOGO_FILTER,
        mixBlendMode: 'normal',
        animation:    'logo-float-3d 5s ease-in-out infinite',
      }}
    />
  )
}

const NAV_LINKS = [
  { href: '#solutions',    label: 'Solutions' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#about',        label: 'About' },
  { href: '#contact',      label: 'Apply' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-transparent">
      {/* Main footer row */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <a href="#home" className="flex items-center gap-2.5">
            <LogoBadge />
            <span className="font-syne text-lg font-semibold text-black">Clyvo</span>
            <span className="font-syne text-lg font-semibold" style={{ color: '#0066cc' }}>AI</span>
          </a>
          <p className="font-inter text-sm text-black/35">Custom AI. Real Results.</p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="font-inter text-sm text-black/45 transition-colors duration-200 hover:text-black/65"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA — clean white */}
        <a
          href="#contact"
          className="shrink-0 rounded-full bg-white px-5 py-2.5 font-inter text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
        >
          Book a Discovery Call
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 font-inter text-xs text-black/25 sm:flex-row">
          <p>© 2026 Clyvo AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-black/55">Privacy</a>
            <a href="#" className="transition-colors hover:text-black/55">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
