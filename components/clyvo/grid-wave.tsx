'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── constants ───────────────────────────────────────────────────────────────
const GRID    = 24
const SPACING = 1.4
const COUNT   = GRID * GRID   // 576 tiles

// Pre-compute grid centre positions and phase offsets once (not per frame)
const TILE_DATA = Array.from({ length: COUNT }, (_, i) => {
  const xi = Math.floor(i / GRID)
  const zi = i % GRID
  return {
    x:     (xi - GRID / 2 + 0.5) * SPACING,
    z:     (zi - GRID / 2 + 0.5) * SPACING,
    phase: xi * 0.5 + zi * 0.5,   // wave phase offset per tile
  }
})

// ─── wave mesh ───────────────────────────────────────────────────────────────
function TileWave() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy   = useMemo(() => new THREE.Object3D(), [])

  const geo = useMemo(() => new THREE.BoxGeometry(1, 0.08, 1), [])
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:       new THREE.Color('#00E5FF'),
        transparent: true,
        opacity:     0.12,
        wireframe:   false,
        depthWrite:  false,
      }),
    []
  )

  // Dispose on unmount
  useEffect(() => () => { geo.dispose(); mat.dispose() }, [geo, mat])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()

    for (let i = 0; i < COUNT; i++) {
      const { x, z, phase } = TILE_DATA[i]
      // Wave formula specified: y = sin(time + x*0.5 + z*0.5) * 0.6
      dummy.position.set(x, Math.sin(t * 0.35 + phase) * 1.8, z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    // Entire grid tilts slightly so we look across it at angle
    <group rotation={[-0.5, 0, 0] as [number, number, number]}>
      <instancedMesh ref={meshRef} args={[geo, mat, COUNT]} />
    </group>
  )
}

// ─── canvas wrapper (exported, imported dynamically with ssr:false) ───────────
export default function GridWave() {
  return (
    <div
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        opacity:       0.35,
      }}
    >
      <Canvas
        camera={{ position: [0, 18, 22], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.2]}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1.0} color="#00E5FF" />
        <TileWave />
      </Canvas>
    </div>
  )
}
