'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 20
const ROWS = 20
const SPACING = 1.4

function WaveTiles() {
  const meshRefs = useRef<THREE.Mesh[]>([])
  const timeRef = useRef(0)

  const tiles = []
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      tiles.push({ id: i * ROWS + j, x: (i - COLS / 2) * SPACING, z: (j - ROWS / 2) * SPACING })
    }
  }

  useFrame(() => {
    timeRef.current += 0.006
    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const col = Math.floor(idx / ROWS)
      const row = idx % ROWS
      const x = (col - COLS / 2) * SPACING
      const z = (row - ROWS / 2) * SPACING
      mesh.position.y = Math.sin(timeRef.current + x * 0.4 + z * 0.4) * 1.5
    })
  })

  return (
    <>
      {tiles.map((tile, idx) => (
        <mesh
          key={tile.id}
          ref={el => { if (el) meshRefs.current[idx] = el }}
          position={[tile.x, 0, tile.z]}
        >
          <boxGeometry args={[1.1, 0.08, 1.1]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#222222"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 15, 0]} intensity={2} color="#ffffff" />
      <pointLight position={[10, 8, -10]} intensity={0.5} color="#00E5FF" />
    </>
  )
}

export default function GridWave() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 18, 22], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <WaveTiles />
      </Canvas>
    </div>
  )
}
