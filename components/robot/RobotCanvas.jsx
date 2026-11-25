'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import RobotModel from './RobotModel'
import { PALETTE } from './materials'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-4, 1, 3]} intensity={0.55} color="#9db4ff" />
      <directionalLight position={[0.5, 2, -4]} intensity={3.2} color={PALETTE.glow} />
      <directionalLight position={[-3, 3, -3]} intensity={1.1} color="#ffffff" />
    </>
  )
}

export default function RobotCanvas({ active, reduced }) {
  const [shown, setShown] = useState(false)
  return (
    <Canvas
      aria-hidden="true"
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      camera={{ fov: 30, position: [0, 0, 10], near: 0.1, far: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: 'high-performance' }}
      onCreated={() => setShown(true)}
      style={{ pointerEvents: 'none', opacity: shown ? 1 : 0, transition: 'opacity 700ms ease' }}
    >
      <Lights />
      <RobotModel />
    </Canvas>
  )
}
