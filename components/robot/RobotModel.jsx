'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { robot, now } from './state'
import { EXPRESSIONS } from './expressions'
import { createFaceMaterial } from './faceMaterial'
import {
  PALETTE,
  createMaterials,
  createFlameMaterial,
  createPortalMaterial,
  createGroundMaterial,
  createStudioEnvironment,
} from './materials'

export const BLEED = 70 // canvas extends this far past the stage on every side
const VIEW_H = 2 * 10 * Math.tan((15 * Math.PI) / 180) // world units visible at z = 0
const FACE_W = 0.74
const FACE_H = 0.46
const TAU = Math.PI * 2

// ---------------------------------------------------------------------------
// Acts: little performances the robot cycles through on its own.
// ---------------------------------------------------------------------------
const ACTS = {
  hello: { dur: 2.6, w: 1, phases: [{ at: 0, expr: 'happy', gesture: 'wave', look: 'mouse', main: 'mouse' }] },
  bubble: {
    dur: 3.2,
    w: 0,
    phases: [
      { at: 0, expr: 'excited', gesture: 'point', look: 'bubble', main: 'bubble' },
      { at: 1.7, expr: 'wink', gesture: 'point', look: 'mouse', main: 'bubble' },
    ],
  },
  love: { dur: 3, w: 1, move: 'bounce', phases: [{ at: 0, expr: 'love', gesture: 'hug', look: 'camera', tilt: 0.12 }] },
  star: { dur: 2.6, w: 1, move: 'hop', phases: [{ at: 0, expr: 'starstruck', gesture: 'celebrate', look: 'camera' }] },
  laugh: { dur: 2.4, w: 1, move: 'shake', phases: [{ at: 0, expr: 'laugh', gesture: 'belly', look: 'camera', pitch: -0.15 }] },
  wink: { dur: 2.2, w: 1, phases: [{ at: 0, expr: 'wink', gesture: 'thumbsUp', look: 'mouse', main: 'mouse' }] },
  dizzy: {
    dur: 3,
    w: 0.8,
    move: 'spin2',
    phases: [
      { at: 0, expr: 'surprised', gesture: 'armsUp', look: 'camera' },
      { at: 0.35, expr: 'dizzy', gesture: 'dizzy', look: 'camera', tilt: 0.2 },
      { at: 2.4, expr: 'happy', gesture: 'shrug', look: 'mouse' },
    ],
  },
  curious: { dur: 2.8, w: 1, phases: [{ at: 0, expr: 'curious', gesture: 'think', look: 'mouse', tilt: 0.28, main: 'mouse' }] },
  cool: { dur: 2.8, w: 1, phases: [{ at: 0, expr: 'cool', gesture: 'fingerGuns', look: 'camera', tilt: -0.1 }] },
  flip: {
    dur: 2.3,
    w: 0.9,
    move: 'flip',
    phases: [
      { at: 0, expr: 'excited', gesture: 'armsUp', look: 'camera' },
      { at: 1.05, expr: 'joy', gesture: 'tada', look: 'camera' },
    ],
  },
  peekaboo: {
    dur: 3,
    w: 0.8,
    phases: [
      { at: 0, expr: 'shy', gesture: 'cover', look: 'camera', pitch: 0.25 },
      { at: 1.5, expr: 'joy', gesture: 'tada', look: 'camera', bump: true },
    ],
  },
  shy: { dur: 2.6, w: 0.8, phases: [{ at: 0, expr: 'shy', gesture: 'shrug', look: 'mouse', tilt: -0.22 }] },
  grr: {
    dur: 2.2,
    w: 0.7,
    phases: [
      { at: 0, expr: 'angry', gesture: 'flex', look: 'camera', main: 'mouse' },
      { at: 1.3, expr: 'joy', gesture: 'flex', look: 'camera', main: 'mouse' },
    ],
  },
  glitch: {
    dur: 2.4,
    w: 0.6,
    move: 'shake',
    phases: [
      { at: 0, expr: 'ko', gesture: 'dizzy', look: 'camera' },
      { at: 1.2, expr: 'surprised', gesture: 'armsUp', look: 'camera', bump: true },
      { at: 1.7, expr: 'happy', gesture: 'rest', look: 'mouse' },
    ],
  },
  worried: { dur: 2.4, w: 0.6, phases: [{ at: 0, expr: 'worried', gesture: 'shrug', look: 'mouse', tilt: 0.15 }] },
  teleport: { dur: 1.9, w: 0.7, move: 'teleport', phases: [{ at: 0, expr: 'excited', gesture: 'tada', look: 'camera' }] },
  wander: { dur: 1.5, w: 1, move: 'jump', phases: [{ at: 0, expr: 'happy', gesture: 'jumpUp', look: 'camera' }] },
  glide: { dur: 1.4, w: 0.8, move: 'glide', phases: [{ at: 0, expr: 'neutral', gesture: 'rest', look: 'mouse' }] },
  wake: {
    dur: 1.8,
    w: 0,
    move: 'hop',
    phases: [
      { at: 0, expr: 'surprised', gesture: 'armsUp', look: 'camera' },
      { at: 0.7, expr: 'happy', gesture: 'wave', look: 'mouse', main: 'mouse' },
    ],
  },
  bye: {
    dur: 2,
    w: 0,
    move: 'hop',
    phases: [{ at: 0, expr: 'joy', gesture: 'wave', look: 'mouse', main: 'mouse' }],
  },
}
const RANDOM_ACTS = Object.keys(ACTS).filter((k) => ACTS[k].w > 0)

// ---------------------------------------------------------------------------
// Arm poses: shoulder euler + elbow euler + finger length. z angles are
// "outward" and get mirrored per side.
// ---------------------------------------------------------------------------
function setPose(o, sx, sy, sz, ex, ey, ez, f) {
  o.sx = sx; o.sy = sy; o.sz = sz; o.ex = ex; o.ey = ey; o.ez = ez; o.f = f; o.aim = false
}

function armPose(name, s, main, t, o) {
  const sway = Math.sin(t * 1.7 + s) * 0.05
  setPose(o, 0.05 + sway, 0, 0.22 + sway * 0.5, -0.3, 0, 0, 1)
  switch (name) {
    case 'wave':
      if (main) setPose(o, -0.2, 0, 2.55, 0, 0, 0.5 * Math.sin(t * 9), 1)
      break
    case 'point':
      if (main) { o.aim = true; o.f = 1.25 }
      break
    case 'present':
      o.aim = true; o.f = 0.55
      break
    case 'thumbsUp':
      if (main) setPose(o, -1.25, 0, 0.35, -1.25, 0, 0, 0.45)
      break
    case 'think':
      if (main) setPose(o, -1.05, 0, -0.5, -1.95, 0, 0, 0.6)
      break
    case 'shrug':
      setPose(o, 0.1, 0, 0.8 + 0.08 * Math.sin(t * 6), -1.35, 0, -0.2, 0.7)
      break
    case 'celebrate':
      setPose(o, 0, 0, 2.85 + 0.12 * Math.sin(t * 14 + s), 0, 0, 0.12 * Math.sin(t * 14), 1)
      break
    case 'hug':
      setPose(o, -0.9, 0, -0.3, -1.6, 0, 0, 0.6)
      break
    case 'belly':
      setPose(o, -0.45, 0, 0.1 + 0.06 * Math.sin(t * 20), -1.25, 0, 0, 0.6)
      break
    case 'cover':
      setPose(o, -2.3, 0, -0.34, -0.75, 0, 0, 0.7)
      break
    case 'tada':
      setPose(o, -0.1, 0, 1.45, 0, 0, 0.35, 1.1)
      break
    case 'armsUp':
      setPose(o, 0, 0, 2.3, 0, 0, 0.5, 1)
      break
    case 'jumpUp':
      setPose(o, -0.2, 0, 1.9, 0, 0, 0.3, 1)
      break
    case 'flex':
      if (main) setPose(o, 0, 0, 1.55, 0, 0, 1.75 + 0.15 * Math.sin(t * 8), 0.5)
      else setPose(o, 0.1, 0, 0.7, -0.2, 0, -1.9, 0.5)
      break
    case 'fingerGuns':
      setPose(o, -1.45 + 0.14 * Math.max(0, Math.sin(t * 5 + s)), 0, 0.3, -0.15, 0, 0, 1.25)
      break
    case 'dizzy':
      setPose(o, 0.2 * Math.sin(t * 4 + s), 0, 0.9 + 0.4 * Math.sin(t * 5 + s * 1.3), -0.5, 0, 0.2 * Math.sin(t * 6), 1)
      break
    case 'sleep':
      setPose(o, 0.12, 0, 0.1, -0.1, 0, 0, 0.9)
      break
    default:
      break
  }
}

const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const clamp01 = (v) => clamp(v, 0, 1)
const backOut = (k) => { const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2) }
const rand = (a, b) => a + Math.random() * (b - a)

function computeSpots(layout, w, h, S) {
  const k = S / 1.85
  if (layout === 'column') {
    const minX = 0.45 * S
    const maxX = w - 0.45 * S
    const maxY = h - 0.98 * k
    return [
      [0.5, 0.74], [0.32, 0.7], [0.68, 0.76], [0.44, 0.67],
    ].map(([fx, fy]) => [clamp(w * fx, minX, Math.max(minX, maxX)), Math.min(h * fy, maxY)])
  }
  const y = clamp(h * 0.57, 1.3 * k, h - 0.98 * k)
  return [[0.5 * S, y], [0.66 * S, y - 0.04 * h], [0.42 * S, y + 0.02 * h]]
}

// ---------------------------------------------------------------------------

// Phone-style glass: a rounded rectangle with a soft bevel, centred on z = 0.
function roundedPanel(w, h, radius, depth) {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  shape.moveTo(x + radius, y)
  shape.lineTo(x + w - radius, y)
  shape.quadraticCurveTo(x + w, y, x + w, y + radius)
  shape.lineTo(x + w, y + h - radius)
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  shape.lineTo(x + radius, y + h)
  shape.quadraticCurveTo(x, y + h, x, y + h - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - 0.024,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 12,
  })
  geo.translate(0, 0, -(depth - 0.024) / 2)
  return geo
}

function buildGeometries() {
  return {
    torso: new THREE.CapsuleGeometry(0.29, 0.2, 8, 24),
    belt: new THREE.TorusGeometry(0.262, 0.035, 12, 48),
    chestRing: new THREE.TorusGeometry(0.075, 0.012, 8, 32),
    chestDisc: new THREE.CircleGeometry(0.056, 32),
    neck: new THREE.CylinderGeometry(0.07, 0.09, 0.12, 16),
    head: new RoundedBoxGeometry(0.9, 0.62, 0.44, 5, 0.12),
    visor: roundedPanel(0.8, 0.52, 0.1, 0.03),
    face: new THREE.PlaneGeometry(FACE_W, FACE_H),
    ear: new THREE.CylinderGeometry(0.085, 0.085, 0.07, 24),
    earRing: new THREE.TorusGeometry(0.068, 0.01, 8, 32),
    key: new THREE.BoxGeometry(0.11, 0.024, 0.06),
    stalk: new THREE.CylinderGeometry(0.012, 0.016, 0.2, 8),
    tip: new THREE.SphereGeometry(0.036, 16, 12),
    joint: new THREE.SphereGeometry(0.075, 20, 14),
    elbow: new THREE.SphereGeometry(0.055, 16, 12),
    upper: new THREE.CapsuleGeometry(0.055, 0.15, 6, 14),
    fore: new THREE.CapsuleGeometry(0.05, 0.12, 6, 14),
    palm: new THREE.SphereGeometry(0.062, 16, 12),
    finger: new THREE.CapsuleGeometry(0.018, 0.06, 4, 8),
    thumb: new THREE.CapsuleGeometry(0.016, 0.04, 4, 8),
    nozzle: new THREE.CylinderGeometry(0.12, 0.16, 0.1, 24),
    nozzleRing: new THREE.TorusGeometry(0.15, 0.014, 8, 40),
    flame: new THREE.ConeGeometry(0.12, 0.55, 24, 1, true),
    portal: new THREE.PlaneGeometry(1.7, 1.7),
    ground: new THREE.PlaneGeometry(1.8, 1.8),
  }
}

function Arm({ side, g, m, refs }) {
  return (
    <group ref={(o) => (refs.shoulder = o)} position={[side * 0.37, 0.12, 0]}>
      <mesh geometry={g.joint} material={m.trim} />
      <mesh geometry={g.upper} material={m.shell} position={[0, -0.13, 0]} />
      <group ref={(o) => (refs.elbow = o)} position={[0, -0.26, 0]}>
        <mesh geometry={g.elbow} material={m.trim} />
        <mesh geometry={g.fore} material={m.shell} position={[0, -0.11, 0]} />
        <group position={[0, -0.23, 0]}>
          <mesh geometry={g.palm} material={m.trim} scale={[1, 0.85, 0.8]} />
          <group ref={(o) => (refs.finger = o)} position={[0, -0.035, 0.02]}>
            <mesh geometry={g.finger} material={m.trim} position={[0, -0.045, 0]} />
          </group>
          <mesh geometry={g.thumb} material={m.trim} position={[-side * 0.05, -0.01, 0.03]} rotation={[0.3, 0, -side * 0.9]} />
        </group>
      </group>
    </group>
  )
}

export default function RobotModel() {
  const { gl, size, invalidate } = useThree()
  const g = useMemo(buildGeometries, [])
  const m = useMemo(() => {
    const base = createMaterials()
    return {
      ...base,
      face: createFaceMaterial({ colorA: PALETTE.eyeA, colorB: PALETTE.eyeB, pink: PALETTE.pink, aspect: FACE_W / FACE_H }),
      flame: createFlameMaterial(),
      portal: createPortalMaterial(),
      ground: createGroundMaterial(),
    }
  }, [])

  const r = useRef({ arms: [{ side: -1 }, { side: 1 }] }).current

  useEffect(() => {
    const env = createStudioEnvironment(gl)
    for (const mat of [m.shell, m.trim, m.visor]) {
      mat.envMap = env.texture
      mat.needsUpdate = true
    }
    robot.invalidate = invalidate
    return () => {
      env.dispose()
      Object.values(g).forEach((geo) => geo.dispose())
      Object.values(m).forEach((mat) => mat.dispose())
      if (robot.invalidate === invalidate) robot.invalidate = null
      robot.screen.ready = false
      const { button, bubble } = robot.dom
      if (button) button.style.visibility = 'hidden'
      if (bubble) bubble.dataset.visible = 'false'
    }
  }, [gl, g, m, invalidate])

  // Frame-loop state. Everything is preallocated.
  const S = useRef(null)
  if (!S.current) {
    const t = now()
    S.current = {
      t0: t,
      pos: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      bub: { x: 0, y: 0, init: false },
      spots: [],
      spotKey: '',
      spot: 0,
      move: { type: 'portalIn', start: t, dur: 1.4, fx: 0, fy: 0, tx: 0, ty: 0 },
      appear: 0,
      portal: { x: 0, y: 0, open: 0 },
      sy: 1,
      spin: 0,
      spinFrom: 0,
      spinTo: 0,
      spinStart: 0,
      spinDur: 0,
      flip: 0,
      shake: 0,
      bounce: 0,
      bump: -10,
      act: null,
      actName: '',
      actStart: 0,
      phase: -1,
      history: [],
      sinceBubble: 0,
      queue: ['hello', 'bubble'],
      nextActAt: t + 99,
      sleeping: false,
      sleepAt: 0,
      expr: new Float32Array(EXPRESSIONS.neutral),
      exprName: 'neutral',
      gesture: 'rest',
      main: 1,
      look: 'mouse',
      tilt: 0,
      pitchBias: 0,
      lookYaw: 0,
      lookPitch: 0,
      headTilt: 0,
      yaw: 0,
      power: 0.4,
      blinkAt: t + 2,
      antenna: { a: 0, v: 0 },
      wasHovered: false,
      wasPresenting: false,
      lastReact: -10,
      swap: 0,
      bubbleShown: false,
      bubbleSize: { w: 0, h: 0, at: -10 },
      settledAt: -10,
      v1: new THREE.Vector3(),
      v2: new THREE.Vector3(),
      q1: new THREE.Quaternion(),
      q2: new THREE.Quaternion(),
      e1: new THREE.Euler(),
      down: new THREE.Vector3(0, -1, 0),
      pose: { sx: 0, sy: 0, sz: 0, ex: 0, ey: 0, ez: 0, f: 1, aim: false },
    }
  }

  useFrame((state, rawDt) => {
    const s = S.current
    const t = now()
    const reduced = robot.reduced
    const dt = Math.min(rawDt, 0.05)
    const st = robot.stage
    if (!st.w || !st.h || !r.root) return

    const SIZE = st.S
    const k = SIZE / 1.85 // px per robot unit
    const ppu = size.height / VIEW_H
    const scale = k / ppu
    const a9 = reduced ? 1 : 1 - Math.exp(-9 * dt)
    const a10 = reduced ? 1 : 1 - Math.exp(-10 * dt)
    const cw = size.width
    const ch = size.height
    const toWX = (px) => (px + BLEED - cw / 2) / ppu
    const toWY = (py) => -(py + BLEED - ch / 2) / ppu
    const rect = st.rect

    // Spots inside the hero stage.
    const key = `${st.layout}:${st.w}:${st.h}:${SIZE}`
    if (key !== s.spotKey) {
      s.spotKey = key
      s.spots = computeSpots(st.layout, st.w, st.h, SIZE)
      s.spot = Math.min(s.spot, s.spots.length - 1)
      const [hx, hy] = s.spots[s.spot]
      if (!robot.screen.ready || reduced) { s.pos.x = hx; s.pos.y = hy; s.prev.x = hx; s.prev.y = hy }
      if (s.move.type === 'portalIn') {
        s.portal.x = hx; s.portal.y = hy
        s.move.tx = hx; s.move.ty = hy
        if (!robot.screen.ready) s.move.start = t
      }
      s.bub.init = false
    }
    if (reduced && s.settledAt < 0) s.settledAt = t
    const anchor = s.spots[s.spot]

    const hovered = robot.hovered
    const presenting = robot.presenting
    const pointer = robot.pointer
    const mouseX = pointer.x - rect.left
    const mouseY = pointer.y - rect.top

    // ---------------------------------------------------------------- moves
    let power = 0.35
    s.sy = 1
    if (reduced) {
      s.move.type = null
      s.appear = 1
      s.portal.open = 0
      s.pos.x = anchor[0]
      s.pos.y = anchor[1]
    } else if (s.move.type) {
      const mv = s.move
      const kk = clamp01((t - mv.start) / mv.dur)
      if (mv.type === 'glide') {
        const e = ease(kk)
        s.pos.x = mv.fx + (mv.tx - mv.fx) * e
        s.pos.y = mv.fy + (mv.ty - mv.fy) * e - Math.sin(Math.PI * kk) * 0.08 * SIZE
        power = 0.6
      } else if (mv.type === 'jump') {
        const e = 0.5 - 0.5 * Math.cos(Math.PI * kk)
        s.pos.x = mv.fx + (mv.tx - mv.fx) * e
        s.pos.y = mv.fy + (mv.ty - mv.fy) * e - Math.sin(Math.PI * kk) * (mv.arc ?? 0.38) * SIZE
        if (kk < 0.12) s.sy = 1 - 0.2 * Math.sin((Math.PI * kk) / 0.12)
        else if (kk < 0.85) s.sy = 1 + 0.12 * Math.sin((Math.PI * (kk - 0.12)) / 0.73)
        else s.sy = 1 - 0.2 * Math.sin((Math.PI * (kk - 0.85)) / 0.15)
        if (mv.flip) s.flip = -TAU * ease(clamp01((kk - 0.12) / 0.73))
        power = 1
      } else if (mv.type === 'teleport' || mv.type === 'portalIn') {
        const first = mv.type === 'teleport'
        const kp = first ? kk : 0.5 + kk * 0.5
        if (kp < 0.5) {
          s.portal.x = mv.fx; s.portal.y = mv.fy
          s.portal.open = clamp01(kp / 0.16)
          const out = clamp01((kp - 0.12) / 0.34)
          s.appear = 1 - ease(out)
          s.spin = ease(out) * TAU * 1.5
          s.pos.x = mv.fx; s.pos.y = mv.fy
        } else {
          s.portal.x = mv.tx; s.portal.y = mv.ty
          s.pos.x = mv.tx; s.pos.y = mv.ty
          const open = clamp01((kp - 0.5) / 0.1)
          const close = clamp01((kp - 0.9) / 0.1)
          s.portal.open = open * (1 - close)
          const grow = clamp01((kp - 0.55) / 0.33)
          s.appear = backOut(grow)
          s.spin = (1 - ease(grow)) * -TAU * 1.5
        }
        power = 0.8
      }
      if (kk >= 1) {
        if (mv.type === 'portalIn') s.settledAt = t
        s.move.type = null
        s.flip = 0
        s.spin = 0
        s.appear = 1
        s.portal.open = 0
      }
    } else {
      // Settled: spring toward the anchor with a slow drift so it never sits still.
      const dx = Math.sin(t * 0.45) * 0.06 * SIZE
      const dy = Math.sin(t * 0.7 + 1) * 0.03 * SIZE
      s.pos.x += (anchor[0] + dx - s.pos.x) * a9
      s.pos.y += (anchor[1] + dy - s.pos.y) * a9
    }

    const startMove = (type, toSpot, extra) => {
      const from = s.pos
      const to = s.spots[toSpot]
      s.spot = toSpot
      Object.assign(s.move, { type, start: t, dur: type === 'glide' ? 0.9 : type === 'jump' ? 0.95 : 1.25, fx: from.x, fy: from.y, tx: to[0], ty: to[1], arc: undefined, flip: false }, extra)
    }
    const otherSpot = () => {
      if (s.spots.length < 2) return s.spot
      let i = s.spot
      while (i === s.spot) i = Math.floor(Math.random() * s.spots.length)
      return i
    }
    const startSpin = (turns, dur) => {
      s.spinFrom = 0; s.spinTo = turns * TAU; s.spinStart = t; s.spinDur = dur
    }

    // Spin acts (yaw) happen while settled.
    if (s.spinDur > 0) {
      const kk = clamp01((t - s.spinStart) / s.spinDur)
      s.spin = s.spinFrom + (s.spinTo - s.spinFrom) * ease(kk)
      if (kk >= 1) { s.spinDur = 0; s.spin = 0 }
    }

    // ------------------------------------------------------------ director
    let expr = 'neutral'
    let gesture = 'rest'
    let look = 'mouse'
    let main = 0
    let tilt = 0
    let pitchBias = 0
    const settled = !s.move.type || s.move.type === 'jump' || s.move.type === 'glide'
    const introDone = s.settledAt > 0

    if (presenting && !s.wasPresenting) {
      s.act = null
      s.sleeping = false
      if (!reduced) startMove('jump', s.spot, { arc: 0.16, dur: 0.6 })
    }
    if (!presenting && s.wasPresenting) {
      s.queue.unshift('bye')
      s.nextActAt = t + 0.2
    }
    if (hovered && !s.wasHovered) {
      s.sleeping = false
      s.swap = 0.6
    }
    s.wasPresenting = presenting
    s.wasHovered = hovered

    const startAct = (name) => {
      const act = ACTS[name]
      s.act = act
      s.actName = name
      s.actStart = t
      s.phase = -1
      s.history.unshift(name)
      s.history.length = Math.min(s.history.length, 4)
      s.sinceBubble = name === 'bubble' ? 0 : s.sinceBubble + 1
      if (reduced || !act.move) return
      if (act.move === 'hop') startMove('jump', s.spot, { arc: 0.22, dur: 0.7 })
      else if (act.move === 'jump') startMove('jump', otherSpot())
      else if (act.move === 'glide') startMove('glide', otherSpot())
      else if (act.move === 'teleport') startMove('teleport', otherSpot(), { dur: 1.6 })
      else if (act.move === 'flip') startMove('jump', s.spot, { arc: 0.5, dur: 1.05, flip: true })
      else if (act.move === 'spin2') startSpin(2, 1.6)
    }
    const pickAct = () => {
      if (s.queue.length) return s.queue.shift()
      if (s.sinceBubble >= 2) return 'bubble'
      let total = 0
      for (const n of RANDOM_ACTS) if (!s.history.includes(n)) total += ACTS[n].w
      let x = Math.random() * total
      for (const n of RANDOM_ACTS) {
        if (s.history.includes(n)) continue
        x -= ACTS[n].w
        if (x <= 0) return n
      }
      return 'hello'
    }

    if (!introDone && !reduced) {
      expr = 'surprised'
      gesture = 'tada'
      look = 'camera'
      if (s.move.type === null) s.settledAt = t
    } else if (presenting) {
      const since = t - robot.presentAt
      expr = since < 0.5 ? 'excited' : 'presenting'
      if (t - robot.reactAt < 0.45) expr = 'joy'
      gesture = 'present'
      look = robot.presentTarget.has ? 'present' : 'camera'
    } else if (reduced) {
      expr = hovered ? 'joy' : 'happy'
      gesture = hovered ? 'wave' : 'rest'
      main = hovered ? 0 : 1
    } else if (hovered) {
      expr = t - robot.hoverAt < 0.18 ? 'surprised' : 'joy'
      gesture = 'wave'
      look = 'mouse'
    } else if (s.sleeping) {
      expr = 'sleepy'
      gesture = 'sleep'
      look = 'camera'
      pitchBias = 0.3
      tilt = 0.15
      if (pointer.movedAt > s.sleepAt + 0.3) {
        s.sleeping = false
        startAct('wake')
      }
    }

    if (introDone && !presenting && !hovered && !s.sleeping && !reduced) {
      if (s.act) {
        const el = t - s.actStart
        const phases = s.act.phases
        let pi = 0
        for (let i = 0; i < phases.length; i++) if (phases[i].at <= el) pi = i
        if (pi !== s.phase) {
          s.phase = pi
          if (phases[pi].bump) s.bump = t
        }
        const ph = phases[pi]
        expr = ph.expr
        gesture = ph.gesture
        look = ph.look || 'mouse'
        tilt = ph.tilt || 0
        pitchBias = ph.pitch || 0
        main = ph.main === 'bubble' ? 2 : ph.main === 'mouse' ? 0 : 1
        if (s.act.move === 'shake') s.shake = 1
        if (s.act.move === 'bounce') s.bounce = 1
        if (el >= s.act.dur) {
          s.act = null
          s.nextActAt = t + rand(1.3, 2.8)
        }
      } else {
        expr = Math.sin(t * 0.3) > 0.2 ? 'happy' : 'neutral'
        if (t >= s.nextActAt) startAct(pickAct())
        else if (t - pointer.movedAt > 18 && t - s.actStart > 6 && t - s.settledAt > 6) {
          s.sleeping = true
          s.sleepAt = t
        }
      }
    }
    if (introDone && s.nextActAt > t + 50) s.nextActAt = t + 0.6

    s.shake += ((s.act?.move === 'shake' && !hovered && !presenting ? 1 : 0) - s.shake) * a10
    s.bounce += ((s.act?.move === 'bounce' && !hovered && !presenting ? 1 : 0) - s.bounce) * a10

    // Bubble geometry (needed for pointing at it).
    const bubbleEl = robot.dom.bubble
    if (bubbleEl && t - s.bubbleSize.at > 1.5) {
      s.bubbleSize.w = bubbleEl.offsetWidth
      s.bubbleSize.h = bubbleEl.offsetHeight
      s.bubbleSize.at = t
    }
    const bw = s.bubbleSize.w
    const bh = s.bubbleSize.h
    if (!s.bub.init) { s.bub.x = anchor[0]; s.bub.y = anchor[1]; s.bub.init = true }
    s.bub.x += (anchor[0] - s.bub.x) * (reduced ? 1 : 1 - Math.exp(-5 * dt))
    s.bub.y += (anchor[1] - s.bub.y) * (reduced ? 1 : 1 - Math.exp(-5 * dt))
    let bx
    let by
    if (st.layout === 'column') {
      bx = clamp(s.bub.x - bw / 2, -12, st.w - bw + 12)
      by = Math.max(-BLEED * 0.4, s.bub.y - 1.3 * k - bh - 8)
    } else {
      bx = s.bub.x + 0.58 * k + 6
      by = clamp(s.bub.y - 0.66 * k - bh / 2, 0, Math.max(0, st.h - bh))
    }
    const bubbleCX = bx + bw / 2
    const bubbleCY = by + bh / 2

    // Main arm side: 0 = toward mouse, 1 = toward content/bubble side, 2 = bubble.
    let side = 1
    if (main === 0 && pointer.has) side = mouseX < s.pos.x ? -1 : 1
    else if (main === 2) side = bubbleCX < s.pos.x - 12 ? -1 : 1
    s.main = side

    // Look target.
    let lx = null
    let ly = null
    if (look === 'mouse' && pointer.has) { lx = mouseX; ly = mouseY }
    else if (look === 'bubble') { lx = bubbleCX; ly = bubbleCY }
    else if (look === 'present') { lx = robot.presentTarget.x - rect.left; ly = robot.presentTarget.y - rect.top }

    // Expression blending + screen glitch on change.
    if (expr !== s.exprName) {
      s.exprName = expr
      s.swap = Math.max(s.swap, 0.55)
    }
    s.swap = reduced ? 0 : Math.max(0, s.swap - dt * 3.5)
    const target = EXPRESSIONS[expr] || EXPRESSIONS.neutral
    for (let i = 0; i < s.expr.length; i++) s.expr[i] += (target[i] - s.expr[i]) * a10

    // Blink.
    let blink = 1
    if (!reduced) {
      if (t > s.blinkAt + 0.16) s.blinkAt = t + rand(2.5, 5)
      if (t >= s.blinkAt) blink = Math.max(0.06, 1 - Math.sin((Math.PI * (t - s.blinkAt)) / 0.16))
    }

    // --------------------------------------------------------- transforms
    const vx = (s.pos.x - s.prev.x) / Math.max(dt, 1e-4)
    const vy = (s.pos.y - s.prev.y) / Math.max(dt, 1e-4)
    s.vel.x += (vx - s.vel.x) * a10
    s.vel.y += (vy - s.vel.y) * a10
    s.prev.x = s.pos.x
    s.prev.y = s.pos.y

    const root = r.root
    const wx = toWX(s.pos.x)
    const wy = toWY(s.pos.y)
    root.position.set(wx, wy, 0)

    // Head look in world space.
    let yawT = 0
    let pitchT = 0
    if (lx !== null) {
      const hx = wx
      const hy = wy + 0.66 * scale
      const dx = toWX(lx) - hx
      const dy = toWY(ly) - hy
      yawT = clamp(Math.atan2(dx, 4), -0.5, 0.5)
      pitchT = clamp(-Math.atan2(dy, 4), -0.4, 0.4)
    }
    pitchT += pitchBias
    s.lookYaw += (yawT - s.lookYaw) * a9
    s.lookPitch += (pitchT - s.lookPitch) * a9
    s.headTilt += (tilt + (gesture === 'think' ? 0.2 * s.main : 0) - s.headTilt) * a9

    // Facing.
    const moving = Math.abs(s.vel.x) > 40
    const yawGoal = moving ? clamp(s.vel.x * 0.003, -0.6, 0.6) : s.lookYaw * (gesture === 'point' || gesture === 'present' ? 0.45 : 0.25)
    s.yaw += (yawGoal - s.yaw) * a9
    root.rotation.set(s.flip, s.yaw + s.spin, 0)

    const appear = reduced ? 1 : s.appear
    const press = robot.pressed ? 0.88 : 1
    const sy = s.sy * press
    const sx = 1 / Math.sqrt(Math.max(sy, 0.5))
    root.scale.set(scale * sx * appear, scale * sy * appear, scale * sx * appear)

    // Body bob, lean, extras.
    const body = r.body
    const bumpK = clamp01((t - s.bump) / 0.35)
    const bob = reduced ? 0 : Math.sin(t * (s.sleeping ? 1.1 : 2.1)) * 0.035 + s.bounce * Math.abs(Math.sin(t * 7)) * 0.07 + Math.sin(Math.PI * bumpK) * 0.08
    body.position.set(reduced ? 0 : Math.sin(t * 40) * 0.025 * s.shake, bob, 0)
    const presentBump = presenting ? Math.max(0, 1 - (t - robot.reactAt) / 0.4) * 0.05 : 0
    body.position.y += presentBump
    body.rotation.x = clamp(s.vel.y * 0.0012, -0.35, 0.35) + (s.sleeping ? 0.12 : 0)
    body.rotation.z = clamp(-s.vel.x * 0.0008, -0.3, 0.3) + (reduced ? 0 : Math.sin(t * 1.3) * 0.03 + Math.sin(t * 30) * 0.04 * s.shake)

    // Head.
    const head = r.head
    head.rotation.set(s.lookPitch, s.lookYaw - s.yaw * 0.5, s.headTilt + (gesture === 'shrug' ? 0.12 * Math.sin(t * 3) : 0))

    // Antenna: spring that swings against horizontal motion.
    const ant = s.antenna
    const antT = clamp(-s.vel.x * 0.0015, -0.5, 0.5) + (reduced ? 0 : Math.sin(t * 3) * 0.06)
    ant.v += (antT - ant.a) * 60 * dt
    ant.v *= Math.exp(-6 * dt)
    ant.a += ant.v * dt
    r.antenna.rotation.z = reduced ? 0 : ant.a

    // Arms.
    const pose = s.pose
    for (const arm of r.arms) {
      const isMain = arm.side === s.main
      armPose(gesture, arm.side, isMain, t, pose)
      if (pose.aim) {
        let tx = lx
        let ty = ly
        if (gesture === 'point' && main === 2) { tx = bubbleCX; ty = bubbleCY }
        if (tx === null) { pose.aim = false; armPose('rest', arm.side, isMain, t, pose) }
        else {
          arm.shoulder.getWorldPosition(s.v1)
          s.v2.set(toWX(tx) - s.v1.x, toWY(ty) - s.v1.y, 0)
          s.v2.z += s.v2.length() * 0.35
          s.v2.normalize()
          body.getWorldQuaternion(s.q1).invert()
          s.v2.applyQuaternion(s.q1)
          s.q2.setFromUnitVectors(s.down, s.v2)
          arm.shoulder.quaternion.slerp(s.q2, a9)
          s.q2.identity()
          arm.elbow.quaternion.slerp(s.q2, a9)
        }
      }
      if (!pose.aim) {
        s.e1.set(pose.sx, pose.sy, pose.sz * arm.side)
        s.q2.setFromEuler(s.e1)
        arm.shoulder.quaternion.slerp(s.q2, a9)
        s.e1.set(pose.ex, pose.ey, pose.ez * arm.side)
        s.q2.setFromEuler(s.e1)
        arm.elbow.quaternion.slerp(s.q2, a9)
      }
      arm.finger.scale.y += (pose.f - arm.finger.scale.y) * a9
    }

    // Thruster and glows.
    power += clamp(-s.vel.y * 0.003, 0, 0.6)
    if (s.sleeping) power = 0.2
    s.power += (power - s.power) * a10
    m.flame.uniforms.uTime.value = t
    m.flame.uniforms.uPower.value = s.power
    r.flame.scale.y = 0.6 + s.power * 0.6

    const excited = hovered || presenting || expr === 'excited' || expr === 'starstruck' || expr === 'joy'
    m.glow.emissiveIntensity = (presenting ? 3.2 : 2.2) + (reduced ? 0 : Math.sin(t * (excited ? 7 : 2.5)) * (excited ? 0.8 : 0.35))

    // Face uniforms.
    const fu = m.face.uniforms
    fu.uE.value = s.expr
    fu.uTime.value = reduced ? 0 : t
    fu.uBlink.value = blink
    fu.uSwap.value = s.swap
    fu.uLook.value.set(clamp(s.lookYaw / 0.5, -1, 1), clamp(-s.lookPitch / 0.4, -1, 1))
    fu.uIntensity.value = presenting ? 1.45 : 1.25

    // Portal + ground glow (world space, at the feet).
    m.portal.uniforms.uTime.value = t
    m.portal.uniforms.uOpen.value = s.portal.open
    r.portal.visible = s.portal.open > 0.001
    r.portal.position.set(toWX(s.portal.x), toWY(s.portal.y + 0.62 * k), -0.2)
    r.portal.scale.setScalar(scale)
    r.ground.position.set(wx, toWY(anchor[1] + 0.95 * k), -0.6)
    r.ground.scale.setScalar(scale)
    m.ground.uniforms.uStrength.value = (0.14 + s.power * 0.22) * appear

    // ------------------------------------------------------------ DOM sync
    const faceX = s.pos.x
    const faceY = s.pos.y - 0.66 * k * appear
    robot.screen.x = s.pos.x
    robot.screen.y = s.pos.y
    robot.screen.faceX = faceX
    robot.screen.faceY = faceY
    robot.screen.size = SIZE
    robot.screen.ready = true

    const btn = robot.dom.button
    if (btn) {
      const w = SIZE * 0.62
      const h = SIZE * 0.95
      btn.style.width = `${w}px`
      btn.style.height = `${h}px`
      btn.style.transform = `translate3d(${(s.pos.x - w / 2).toFixed(1)}px, ${(s.pos.y - 0.32 * k - h / 2).toFixed(1)}px, 0)`
      if (btn.style.visibility !== 'visible') btn.style.visibility = 'visible'
    }

    if (bubbleEl) {
      bubbleEl.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0)`
      if (st.layout === 'column') bubbleEl.style.setProperty('--tail', `${clamp(s.pos.x - bx, 28, bw - 28).toFixed(1)}px`)
      else bubbleEl.style.setProperty('--tail', `${clamp(faceY - by, 22, bh - 22).toFixed(1)}px`)
      const show = introDone && (reduced || t - s.settledAt > 0.4) && !presenting && appear > 0.9
      if (show !== s.bubbleShown) {
        s.bubbleShown = show
        bubbleEl.dataset.visible = show ? 'true' : 'false'
      }
    }
  })

  return (
    <>
      <group ref={(o) => (r.root = o)}>
        <group ref={(o) => (r.body = o)}>
          <mesh geometry={g.torso} material={m.shell} scale={[1, 1, 0.86]} />
          <mesh geometry={g.belt} material={m.trim} position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.86, 1]} />
          <group position={[0, 0.08, 0.252]}>
            <mesh geometry={g.chestRing} material={m.glow} />
            <mesh geometry={g.chestDisc} material={m.glow} position={[0, 0, 0.002]} />
          </group>

          <group position={[0, 0.36, 0]}>
            <mesh geometry={g.neck} material={m.trim} />
            <group ref={(o) => (r.head = o)} position={[0, 0.3, 0]}>
              <mesh geometry={g.head} material={m.shell} />
              <mesh geometry={g.visor} material={m.visor} position={[0, -0.005, 0.215]} />
              <mesh geometry={g.face} material={m.face} position={[0, -0.005, 0.232]} />
              <mesh geometry={g.key} material={m.trim} position={[-0.2, 0.31, 0]} />
              <mesh geometry={g.key} material={m.trim} position={[-0.05, 0.31, 0]} scale={[0.6, 1, 1]} />
              {[-1, 1].map((sd) => (
                <group key={sd} position={[sd * 0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <mesh geometry={g.ear} material={m.trim} />
                  <mesh geometry={g.earRing} material={m.glow} position={[0, sd * -0.037, 0]} rotation={[Math.PI / 2, 0, 0]} />
                </group>
              ))}
              <group ref={(o) => (r.antenna = o)} position={[0.18, 0.3, 0]}>
                <mesh geometry={g.stalk} material={m.trim} position={[0, 0.1, 0]} />
                <mesh geometry={g.tip} material={m.glow} position={[0, 0.22, 0]} />
              </group>
            </group>
          </group>

          {r.arms.map((arm) => (
            <Arm key={arm.side} side={arm.side} g={g} m={m} refs={arm} />
          ))}

          <group position={[0, -0.42, 0]}>
            <mesh geometry={g.nozzle} material={m.trim} />
            <mesh geometry={g.nozzleRing} material={m.glow} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <group ref={(o) => (r.flame = o)} position={[0, -0.05, 0]}>
              <mesh geometry={g.flame} material={m.flame} position={[0, -0.275, 0]} rotation={[Math.PI, 0, 0]} />
            </group>
          </group>
        </group>
      </group>
      <mesh ref={(o) => (r.portal = o)} geometry={g.portal} material={m.portal} rotation={[-1.2, 0, 0]} visible={false} />
      <mesh ref={(o) => (r.ground = o)} geometry={g.ground} material={m.ground} rotation={[-1.25, 0, 0]} />
    </>
  )
}
