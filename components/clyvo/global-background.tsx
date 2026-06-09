import dynamic from 'next/dynamic'

const ParticleCanvas = dynamic(
  () => import('./global-background-canvas'),
  { ssr: false }
)

const GridWaveCanvas = dynamic(
  () => import('./grid-wave'),
  { ssr: false }
)

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ── Ambient colour orbs ── */}
      <div
        className="animate-float-a absolute"
        style={{
          width: 900, height: 900, top: -250, right: -250,
          background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="animate-float-b absolute"
        style={{
          width: 700, height: 700, bottom: -200, left: -200,
          background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="animate-float-c absolute"
        style={{
          width: 500, height: 500, top: '40%', right: '8%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── 3-D levitating tile wave (replaces flat CSS grid) ── */}
      <GridWaveCanvas />

      {/* ── Three.js particle field ── */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>
    </div>
  )
}
