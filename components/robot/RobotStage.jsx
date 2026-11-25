'use client'

import { Component, useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { robot, now } from './state'

const BLEED = 70
const RobotCanvas = dynamic(() => import('./RobotCanvas'), { ssr: false })

class RobotBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail?.()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function BubbleText() {
  return (
    <>
      <span className="robot-bubble-label">Your guide</span>
      <span className="robot-bubble-line text-3d-white">Wanna try what I&apos;ve built?</span>
      <span className="robot-bubble-cta">
        <span className="text-3d-red">Click me!</span>
      </span>
    </>
  )
}

// The hero's robot zone: a WebGL canvas (with bleed so jumps and arms never
// clip), an invisible button that follows the robot, and the speech bubble.
export default function RobotStage({ layout, onActivate, open }) {
  const stageRef = useRef(null)
  const buttonRef = useRef(null)
  const bubbleRef = useRef(null)
  const [load, setLoad] = useState(false)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(true)
  const [reduced, setReduced] = useState(false)

  // Lazy-load the robot once the page is idle.
  useEffect(() => {
    if (!hasWebGL()) {
      setFailed(true)
      return
    }
    let idle
    let timer
    const start = () => { timer = setTimeout(() => setLoad(true), 600) }
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(start, { timeout: 1500 })
    else timer = setTimeout(start, 300)
    return () => {
      if (idle) window.cancelIdleCallback?.(idle)
      clearTimeout(timer)
    }
  }, [])

  // Driver: stage geometry, pointer, reduced motion, visibility.
  useEffect(() => {
    const stage = stageRef.current
    robot.dom.button = buttonRef.current
    robot.dom.bubble = bubbleRef.current

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyReduced = () => {
      robot.reduced = mq.matches
      setReduced(mq.matches)
      robot.invalidate?.()
    }
    applyReduced()
    mq.addEventListener('change', applyReduced)

    const measure = () => {
      const rect = stage.getBoundingClientRect()
      robot.stage.rect.left = rect.left
      robot.stage.rect.top = rect.top
      robot.stage.w = Math.round(rect.width)
      robot.stage.h = Math.round(rect.height)
      robot.stage.layout = layout
      const vw = window.innerWidth
      robot.stage.S = layout === 'column' ? 230 : vw >= 640 ? 170 : 145
      robot.invalidate?.()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    const onScroll = () => {
      const rect = stage.getBoundingClientRect()
      robot.stage.rect.left = rect.left
      robot.stage.rect.top = rect.top
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    const refresh = setInterval(onScroll, 1500)

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      robot.pointer.x = e.clientX
      robot.pointer.y = e.clientY
      robot.pointer.has = true
      robot.pointer.movedAt = now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '80px' })
    io.observe(stage)

    return () => {
      mq.removeEventListener('change', applyReduced)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', onMove)
      clearInterval(refresh)
      robot.dom.button = null
      robot.dom.bubble = null
      robot.hovered = false
      robot.pressed = false
    }
  }, [layout])

  const activate = useCallback(() => {
    if (open || robot.presenting) return
    const rect = stageRef.current.getBoundingClientRect()
    const origin = robot.screen.ready
      ? { x: rect.left + robot.screen.faceX, y: rect.top + robot.screen.faceY }
      : { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    robot.presenting = true
    robot.presentAt = now()
    robot.hovered = false
    robot.invalidate?.()
    // Let the robot wind up before the hologram leaves its screen.
    setTimeout(() => onActivate(origin), robot.reduced || !robot.screen.ready ? 0 : 260)
  }, [open, onActivate])

  const hover = (on) => () => {
    robot.hovered = on
    if (on) robot.hoverAt = now()
    else robot.pressed = false
    robot.invalidate?.()
  }
  const press = (on) => () => {
    robot.pressed = on
    robot.invalidate?.()
  }

  if (failed) {
    return (
      <div ref={stageRef} className="relative flex h-full w-full items-center">
        <button
          type="button"
          onClick={() => {
            const r = stageRef.current.getBoundingClientRect()
            onActivate({ x: r.left + 40, y: r.top + r.height / 2 })
          }}
          aria-haspopup="dialog"
          data-cursor="TRY"
          className={`robot-bubble is-static ${layout === 'column' ? 'is-above' : 'is-right'}`}
          data-visible="true"
        >
          <BubbleText />
        </button>
      </div>
    )
  }

  return (
    <div ref={stageRef} className="robot-stage relative h-full w-full" data-layout={layout}>
      <div className="pointer-events-none absolute" style={{ inset: -BLEED }} aria-hidden="true">
        {load && (
          <RobotBoundary onFail={() => setFailed(true)}>
            <RobotCanvas active={active} reduced={reduced} />
          </RobotBoundary>
        )}
      </div>

      <div
        ref={bubbleRef}
        className={`robot-bubble ${layout === 'column' ? 'is-above' : 'is-right'}`}
        data-visible="false"
        data-cursor="TRY"
        aria-hidden="true"
        onClick={activate}
        onPointerEnter={hover(true)}
        onPointerLeave={hover(false)}
      >
        <BubbleText />
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={activate}
        onPointerEnter={hover(true)}
        onPointerLeave={hover(false)}
        onPointerDown={press(true)}
        onPointerUp={press(false)}
        onFocus={(e) => {
          // Keyboard focus makes the robot wave (its focus cue); focus handed
          // back when the hologram closes should not.
          if (robot.quietFocus) robot.quietFocus = false
          else if (e.currentTarget.matches(':focus-visible')) hover(true)()
        }}
        onBlur={hover(false)}
        aria-haspopup="dialog"
        aria-label="Wanna try what I've built? Open the live projects hologram"
        data-cursor="TRY"
        className="absolute left-0 top-0 bg-transparent outline-none"
        style={{ visibility: 'hidden', touchAction: 'manipulation' }}
      />
    </div>
  )
}
