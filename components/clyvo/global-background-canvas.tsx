'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 60
const SEEDS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  x: (((i * 9301 + 49297) % 233280) / 233280 - 0.5) * 24,
  y: (((i * 6271 + 49297) % 233280) / 233280 - 0.5) * 24,
  z: (((i * 1103 + 49297) % 233280) / 233280 - 0.5) * 6,
}))

function buildCircleTexture(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width  = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0,    'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.70, 'rgba(255,255,255,0.3)')
  gradient.addColorStop(1,    'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function ParticleField() {
  const pointsRef  = useRef<THREE.Points>(null)
  const mouseTarget = useRef({ x: 0, y: 0 })

  const { size } = useThree()

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    SEEDS.forEach((s, i) => {
      arr[i * 3]     = s.x
      arr[i * 3 + 1] = s.y
      arr[i * 3 + 2] = s.z
    })
    return arr
  }, [])

  const circleTexture = useMemo(() => buildCircleTexture(), [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x =  (e.clientX / window.innerWidth  - 0.5) * 1.2
      mouseTarget.current.y =  (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useFrame(({ clock }) => {
    const pts = pointsRef.current
    if (!pts) return

    const t = clock.getElapsedTime()

    pts.rotation.y = t * 0.008
    pts.rotation.x = Math.sin(t * 0.003) * 0.06

    pts.position.x += (mouseTarget.current.x * 0.6 - pts.position.x) * 0.025
    pts.position.y += (-mouseTarget.current.y * 0.4 - pts.position.y) * 0.025
  })

  const pointSize = Math.min(0.13, (size.width / 1920) * 0.16)

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={pointSize}
        color="#ffffff"
        transparent
        opacity={0.40}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.02}
      />
    </points>
  )
}

export default function GlobalBackgroundCanvas() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 12], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.25]}
    >
      <ParticleField />
    </Canvas>
  )
}
