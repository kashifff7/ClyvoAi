'use client'

// Light theme global background — subtle noise texture and soft gradient orbs.
// No WebGL — keeps performance clean on light background.

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Soft warm orb top-right */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        top: '-15vw', right: '-15vw',
        background: 'radial-gradient(circle, rgba(0,102,204,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float-a 14s ease-in-out infinite',
      }} />
      {/* Soft cool orb bottom-left */}
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        bottom: '-10vw', left: '-10vw',
        background: 'radial-gradient(circle, rgba(0,82,163,0.04) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'float-b 18s ease-in-out infinite',
      }} />
      {/* Subtle noise texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        opacity: 0.018,
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
