'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getLenis } from '@/lib/scroll'
import { usableProjects, TRY_KINDS } from './TryNowGrid'
import { robot, now } from './robot/state'

const EASE_OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const EASE_IN = 'cubic-bezier(0.6, 0, 0.8, 0.2)'

function hull(points) {
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
  const lower = []
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
    lower.push(p)
  }
  const upper = []
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
    upper.push(p)
  }
  upper.pop()
  lower.pop()
  return lower.concat(upper)
}

function materialize(dx, dy) {
  const at = (transform, opacity, glow, offset) => ({ transform, opacity, filter: `brightness(${glow})`, ...(offset != null && { offset }) })
  return [
    at(`translate(${dx}px, ${dy}px) scale(0.02, 0.02)`, 0, 3),
    at(`translate(${dx * 0.15}px, ${dy * 0.15}px) scale(0.92, 0.012)`, 1, 3, 0.36),
    at('translate(0px, 0px) scale(1, 1.035)', 0.85, 1.7, 0.66),
    at('translate(0px, 0px) scale(1, 1)', 0.45, 1.3, 0.78),
    at('translate(0px, 0px) scale(1, 1)', 1, 1.1, 0.86),
    at('translate(0px, 0px) scale(1, 1)', 0.7, 1, 0.92),
    at('translate(0px, 0px) scale(1, 1)', 1, 1),
  ]
}

function KindIcon({ kind, className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {kind.icon}
    </svg>
  )
}

// "Holo-Deck": the robot projects a hologram of the usable projects. Projects
// sit on a rotating 3D ring; the front one is inspected below.
export default function HoloDeck({ origin, onClose }) {
  const items = usableProjects
  const n = items.length
  const step = 360 / n

  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const backdropRef = useRef(null)
  const beamRef = useRef(null)
  const ringStageRef = useRef(null)
  const wrapRef = useRef(null)
  const animsRef = useRef([])
  const closingRef = useRef(false)
  const openingRef = useRef(true)
  const reducedRef = useRef(false)
  const originRef = useRef(origin)
  const dragRef = useRef({ x: 0, moved: false, id: null })
  const firstRef = useRef(true)

  const [turn, setTurn] = useState(-n)
  const [spinIn, setSpinIn] = useState(true)
  const [beam, setBeam] = useState(null)
  const [ring, setRing] = useState({ w: 180, h: 230, r: 260 })

  const active = ((turn % n) + n) % n
  const project = items[active]
  const kind = TRY_KINDS[project.tryNow.kind] ?? TRY_KINDS.web

  const makeRoom = useCallback(() => {
    const wrap = wrapRef.current
    const o = originRef.current
    const vw = window.innerWidth
    wrap.style.paddingLeft = vw >= 1024 && o.x < vw * 0.4 ? `${Math.round(o.x + 110)}px` : ''
  }, [])

  const layoutBeam = useCallback(() => {
    const panel = panelRef.current
    if (!panel) return
    const o = originRef.current
    const rect = panel.getBoundingClientRect()
    const corners = [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.right, y: rect.bottom },
      { x: rect.left, y: rect.bottom },
    ]
    const shape = hull([o, ...corners])
    const i = shape.indexOf(o)
    // When the robot sits under the panel (small screens) only the flare shows.
    const edges = i >= 0 ? [shape[(i + shape.length - 1) % shape.length], shape[(i + 1) % shape.length]] : []
    setBeam({
      points: i >= 0 ? shape.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') : '',
      edges,
      ox: o.x,
      oy: o.y,
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      w: window.innerWidth,
      h: window.innerHeight,
    })
    robot.presentTarget.x = rect.left + rect.width / 2
    robot.presentTarget.y = rect.top + Math.min(rect.height * 0.35, 260)
    robot.presentTarget.has = true
  }, [])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    reducedRef.current = reduced
    if (!originRef.current) originRef.current = { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 }
    const previousOverflow = document.body.style.overflow
    const trigger = document.activeElement
    const lenis = getLenis()
    const wasStopped = lenis?.isStopped

    dialog.showModal()
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    robot.presenting = true
    makeRoom()
    layoutBeam()

    const o = originRef.current
    const rect = panel.getBoundingClientRect()
    const dx = o.x - (rect.left + rect.width / 2)
    const dy = o.y - (rect.top + rect.height / 2)

    if (reduced) {
      animsRef.current = [dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 })]
      openingRef.current = false
      setTurn(0)
      setSpinIn(false)
    } else {
      const open = panel.animate(materialize(dx, dy), { duration: 1100, easing: EASE_OUT })
      animsRef.current = [
        open,
        backdropRef.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: EASE_OUT }),
        beamRef.current.animate(
          [
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1, offset: 0.45 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          { duration: 1100, easing: EASE_OUT }
        ),
      ]
      open.finished.then(() => { openingRef.current = false; layoutBeam() }).catch(() => {})
    }

    const spin = setTimeout(() => setTurn(0), reduced ? 0 : 380)
    const settle = setTimeout(() => setSpinIn(false), reduced ? 0 : 2100)
    return () => {
      clearTimeout(spin)
      clearTimeout(settle)
      animsRef.current.forEach((a) => a.cancel())
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (!wasStopped) lenis?.start()
      robot.presenting = false
      robot.presentTarget.has = false
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        robot.quietFocus = true
        trigger.focus({ preventScroll: true })
        robot.quietFocus = false
      }
    }
  }, [layoutBeam, makeRoom])

  // Ring geometry follows the stage width.
  useEffect(() => {
    const stage = ringStageRef.current
    const fit = () => {
      const w = stage.clientWidth
      const cw = Math.round(Math.min(196, Math.max(128, w * 0.24)))
      const ch = Math.round(cw * 1.28)
      const r = Math.round((cw + 26) / (2 * Math.tan(Math.PI / n)))
      setRing({ w: cw, h: ch, r })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    const onResize = () => {
      if (openingRef.current || closingRef.current) return
      makeRoom()
      layoutBeam()
    }
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [n, layoutBeam, makeRoom])

  // The robot reacts whenever a new project comes to the front.
  useEffect(() => {
    if (firstRef.current) { firstRef.current = false; return }
    robot.reactAt = now()
  }, [active])

  const go = useCallback((delta) => setTurn((t) => t + delta), [])
  const goTo = useCallback(
    (i) => {
      let d = (((i - active) % n) + n) % n
      if (d > n / 2) d -= n
      if (d) setTurn((t) => t + d)
    },
    [active, n]
  )

  const dismiss = () => {
    if (closingRef.current) return
    closingRef.current = true
    robot.presenting = false
    robot.presentEndAt = now()
    const dialog = dialogRef.current
    const panel = panelRef.current
    const transform = getComputedStyle(panel).transform
    const opacity = getComputedStyle(panel).opacity
    animsRef.current.forEach((a) => a.cancel())

    if (reducedRef.current) {
      const fade = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
      animsRef.current = [fade]
      fade.finished.then(onClose).catch(() => {})
      return
    }
    const o = originRef.current
    const rect = panel.getBoundingClientRect()
    const dx = o.x - (rect.left + rect.width / 2)
    const dy = o.y - (rect.top + rect.height / 2)
    const collapse = panel.animate(
      [
        { transform: transform === 'none' ? 'translate(0px, 0px) scale(1, 1)' : transform, opacity, filter: 'brightness(1)' },
        { transform: 'translate(0px, 0px) scale(0.96, 0.012)', opacity: 1, filter: 'brightness(2.6)', offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.02, 0.02)`, opacity: 0, filter: 'brightness(3)' },
      ],
      { duration: 650, easing: EASE_IN, fill: 'forwards' }
    )
    animsRef.current = [
      collapse,
      beamRef.current.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }], { duration: 650, easing: EASE_IN, fill: 'forwards' }),
      backdropRef.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, delay: 150, easing: EASE_OUT, fill: 'forwards' }),
    ]
    collapse.finished.then(onClose).catch(() => {})
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, moved: false, id: e.pointerId }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (d.id === e.pointerId && Math.abs(e.clientX - d.x) > 10) d.moved = true
  }
  const onPointerUp = (e) => {
    const d = dragRef.current
    if (d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    d.id = null
  }

  const o = beam ?? { ox: 0, oy: 0 }
  const hole = beam
    ? `radial-gradient(circle at ${beam.ox}px ${beam.oy}px, rgba(4,0,1,0) 0px, rgba(4,0,1,0.25) 90px, rgba(4,0,1,0.88) 300px)`
    : 'rgba(4,0,1,0.88)'

  return (
    <dialog
      ref={dialogRef}
      id="holo-deck"
      aria-labelledby="holo-title"
      aria-describedby="holo-desc"
      data-lenis-prevent
      className="holo-dialog fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-3 text-white sm:p-6"
      onCancel={(e) => { e.preventDefault(); dismiss() }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
      onKeyDown={onKeyDown}
      onScroll={() => { if (!openingRef.current && !closingRef.current) layoutBeam() }}
    >
      <div ref={backdropRef} className="pointer-events-none fixed inset-0" style={{ background: hole }} aria-hidden="true">
        <div className="holo-backdrop-grid absolute inset-0" />
      </div>

      <svg
        className="pointer-events-none fixed inset-0 h-full w-full"
        viewBox={`0 0 ${beam?.w ?? 1} ${beam?.h ?? 1}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="holo-beam" gradientUnits="userSpaceOnUse" x1={o.ox} y1={o.oy} x2={beam?.cx ?? 0} y2={beam?.cy ?? 0}>
            <stop offset="0" stopColor="#ffd0c8" stopOpacity="0.75" />
            <stop offset="0.25" stopColor="#ff2b3a" stopOpacity="0.32" />
            <stop offset="1" stopColor="#E50914" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="holo-flare">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="0.3" stopColor="#ff6b74" stopOpacity="0.6" />
            <stop offset="1" stopColor="#E50914" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g ref={beamRef} className="holo-beam" style={{ transformOrigin: `${o.ox}px ${o.oy}px`, transformBox: 'view-box' }}>
          {beam && (
            <>
              {beam.points && <polygon points={beam.points} fill="url(#holo-beam)" />}
              {beam.edges.map((p, i) => (
                <line key={i} x1={beam.ox} y1={beam.oy} x2={p.x} y2={p.y} className="holo-beam-edge" />
              ))}
              <circle cx={beam.ox} cy={beam.oy} r="46" fill="url(#holo-flare)" className="holo-flare" />
            </>
          )}
        </g>
      </svg>

      <div ref={wrapRef} className="relative grid min-h-full place-items-center" onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}>
        <div ref={panelRef} className="holo-panel relative w-full max-w-5xl overflow-hidden rounded-2xl">
          <span className="holo-corner left-3 top-3 border-l-2 border-t-2" aria-hidden="true" />
          <span className="holo-corner right-3 top-3 border-r-2 border-t-2" aria-hidden="true" />
          <span className="holo-corner bottom-3 left-3 border-b-2 border-l-2" aria-hidden="true" />
          <span className="holo-corner bottom-3 right-3 border-b-2 border-r-2" aria-hidden="true" />
          <div className="holo-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="holo-sweep pointer-events-none absolute inset-x-0 top-0 h-24" aria-hidden="true" />

          <div className="relative p-5 sm:p-7">
            <div className="holo-rise flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff5a64]">
                  <span className="holo-signal" aria-hidden="true"><i /><i /><i /></span>
                  Holo-deck <span className="text-white/30">{'//'}</span> {n} ready to use
                </p>
                <h2 id="holo-title" className="mt-2 font-display text-4xl leading-none tracking-wide sm:text-5xl">
                  Try My Products
                </h2>
                <p id="holo-desc" className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
                  Spin the ring and pick one. Web apps open in your browser; tools, skills and plugins are ready to install.
                </p>
              </div>
              <button
                type="button"
                autoFocus
                onClick={dismiss}
                aria-label="Close the projects hologram"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ff3b47]/40 bg-white/5 transition-colors hover:bg-[#ff3b47]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              ref={ringStageRef}
              className="holo-ring-stage relative mt-4 select-none overflow-hidden"
              style={{ height: ring.h + 64, touchAction: 'pan-y' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { dragRef.current.id = null }}
            >
              <div className="holo-pedestal" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className="holo-pillars" aria-hidden="true" />
              <div className="absolute left-1/2 top-[44%] h-0 w-0" style={{ perspective: '1100px', perspectiveOrigin: '50% 40%' }}>
                <div
                  className="relative preserve-3d"
                  style={{
                    transform: `translateZ(${-ring.r}px) rotateY(${-turn * step}deg)`,
                    transition: `transform ${spinIn ? 1.7 : 0.75}s ${EASE_OUT}`,
                  }}
                >
                  {items.map((p, i) => {
                    const k = TRY_KINDS[p.tryNow.kind] ?? TRY_KINDS.web
                    const rel = (((i - turn) * step) % 360 + 540) % 360 - 180
                    const facing = (Math.cos((rel * Math.PI) / 180) + 1) / 2
                    const isActive = i === active
                    return (
                      <button
                        key={p.id}
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => { if (!dragRef.current.moved) goTo(i) }}
                        className={`holo-card ${isActive ? 'is-active' : ''}`}
                        style={{
                          width: ring.w,
                          height: ring.h,
                          marginLeft: -ring.w / 2,
                          marginTop: -ring.h / 2,
                          transform: `rotateY(${i * step}deg) translateZ(${ring.r}px)`,
                          opacity: 0.14 + 0.86 * Math.pow(facing, 1.6),
                        }}
                      >
                        <span className="flex items-center justify-end">
                          <span className="holo-card-dot" />
                        </span>
                        <span className="holo-card-icon">
                          <KindIcon kind={k} className="h-6 w-6" />
                        </span>
                        <span className="mt-auto block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#ff5a64]">{k.tag}</span>
                        <span className="mt-1 block font-display leading-none tracking-wide text-white" style={{ fontSize: Math.round(ring.w * 0.135) }}>{p.title}</span>
                        <span className="mt-1 block text-[11px] leading-tight text-white/50">{p.category}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="holo-rise relative -mt-2 flex items-center justify-center gap-3 [animation-delay:120ms]">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="holo-arrow">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="flex items-center gap-1.5" role="group" aria-label="Choose a project">
                {items.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={p.title}
                    aria-current={i === active ? 'true' : undefined}
                    className={`holo-dot ${i === active ? 'is-active' : ''}`}
                  >
                    <KindIcon kind={TRY_KINDS[p.tryNow.kind] ?? TRY_KINDS.web} className="h-3 w-3" />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Next project" className="holo-arrow">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>

            <div className="holo-inspector holo-rise relative mt-6 grid gap-5 p-5 sm:p-6 md:grid-cols-[1.35fr_1fr] md:gap-8 [animation-delay:200ms]" aria-live="polite">
              <div key={`${project.id}-info`} className="holo-glitch-in min-w-0">
                <h3 className="holo-title break-words font-display text-5xl leading-none tracking-wide sm:text-6xl" data-text={project.title}>
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/65">{project.description}</p>
              </div>
              <div key={`${project.id}-act`} className="holo-glitch-in flex min-w-0 flex-col gap-4 [animation-delay:90ms]">
                <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <span className="holo-chip">
                    <KindIcon kind={kind} className="h-3 w-3" /> {kind.tag}
                  </span>
                  <span className="holo-chip is-live">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#46d369]" aria-hidden="true" /> Available now
                  </span>
                </div>
                {project.tryNow.note && <p className="text-xs leading-relaxed text-white/50">{project.tryNow.note}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 6).map((t) => (
                    <span key={t} className="holo-tech">{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a href={project.tryNow.url} target="_blank" rel="noopener noreferrer" className="holo-launch">
                    <KindIcon kind={kind} className="h-4 w-4 shrink-0" />
                    {project.tryNow.label}
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Source code for ${project.title}`}
                    className="btn-netflix-ghost !px-4 !py-2.5 text-sm"
                  >
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
