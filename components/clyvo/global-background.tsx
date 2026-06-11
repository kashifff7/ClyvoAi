'use client'

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div style={{
        position: 'absolute', width: '55vw', height: '55vw',
        top: '-15vw', right: '-15vw',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'float-a 16s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: '45vw', height: '45vw',
        bottom: '-10vw', left: '-10vw',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        filter: 'blur(100px)', animation: 'float-b 20s ease-in-out infinite',
      }} />
    </div>
  )
}
