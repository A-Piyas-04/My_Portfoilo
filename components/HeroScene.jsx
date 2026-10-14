'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLES = 2200
const DEPTH = 80
const RINGS = 14

function Particles() {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLES * 3)
    const colors = new Float32Array(PARTICLES * 3)
    const red = new THREE.Color('#E50914')
    const white = new THREE.Color('#ffffff')
    for (let i = 0; i < PARTICLES; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.5 + Math.random() * 9
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = -Math.random() * DEPTH
      const c = Math.random() > 0.82 ? white : red
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((_, delta) => {
    const arr = ref.current.geometry.attributes.position.array
    const step = Math.min(delta, 0.05) * 9
    for (let i = 2; i < arr.length; i += 3) {
      arr[i] += step
      if (arr[i] > 5) arr[i] -= DEPTH
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.z += delta * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLES} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLES} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Rings() {
  const group = useRef()
  const spacing = DEPTH / RINGS

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05) * 6
    group.current.children.forEach((ring) => {
      ring.position.z += step
      if (ring.position.z > 5) ring.position.z -= DEPTH
      const t = THREE.MathUtils.clamp((ring.position.z + DEPTH) / DEPTH, 0, 1)
      ring.material.opacity = t * t * 0.55
    })
  })

  return (
    <group ref={group}>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * spacing]}>
          <torusGeometry args={[11, 0.025, 8, 120]} />
          <meshBasicMaterial color="#E50914" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x += (pointer.x * 1.8 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 1.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, -30)
  })
  return null
}

export default function HeroScene() {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    if (wrapRef.current) observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <fog attach="fog" args={['#0a0a0a', 10, 60]} />
        <Particles />
        <Rings />
        <CameraRig />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
