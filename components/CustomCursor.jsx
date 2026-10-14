'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const TRAIL = 22

function labelFor(target) {
  const el = target.closest('[data-cursor], a, button, [role="button"]')
  if (!el) return null
  if (el.dataset.cursor) return el.dataset.cursor
  if (el.tagName === 'A' && el.target === '_blank') return 'OPEN'
  if (el.hasAttribute('download')) return 'SAVE'
  return 'PLAY'
}

export default function CustomCursor() {
  const pointerRef = useRef(null)
  const badgeRef = useRef(null)
  const labelRef = useRef(null)
  const canvasRef = useRef(null)
  const rippleRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const head = { ...mouse }
    const points = Array.from({ length: TRAIL }, () => ({ ...mouse }))
    let visible = false
    let hovering = false

    const xPointer = gsap.quickTo(pointerRef.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const yPointer = gsap.quickTo(pointerRef.current, 'y', { duration: 0.12, ease: 'power3.out' })
    const xBadge = gsap.quickTo(badgeRef.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const yBadge = gsap.quickTo(badgeRef.current, 'y', { duration: 0.45, ease: 'power3.out' })

    const render = () => {
      head.x += (mouse.x - head.x) * 0.35
      head.y += (mouse.y - head.y) * 0.35
      points.unshift({ x: head.x, y: head.y })
      points.length = TRAIL

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      if (!visible || hovering) return

      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        const t = 1 - i / points.length
        ctx.strokeStyle = `rgba(229, 9, 20, ${t * 0.55})`
        ctx.lineWidth = t * 7
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
    gsap.ticker.add(render)

    const move = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      xPointer(e.clientX)
      yPointer(e.clientY)
      xBadge(e.clientX)
      yBadge(e.clientY)
      if (!visible) {
        visible = true
        gsap.to([pointerRef.current], { opacity: 1, duration: 0.3 })
      }
    }

    const over = (e) => {
      const label = labelFor(e.target)
      const next = Boolean(label)
      if (next && labelRef.current) labelRef.current.textContent = label
      if (next === hovering) return
      hovering = next
      gsap.to(badgeRef.current, {
        scale: hovering ? 1 : 0,
        opacity: hovering ? 1 : 0,
        duration: 0.45,
        ease: hovering ? 'back.out(2)' : 'power3.out',
      })
      gsap.to(pointerRef.current, {
        scale: hovering ? 0 : 1,
        opacity: hovering ? 0 : 1,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    const down = (e) => {
      gsap.to(hovering ? badgeRef.current : pointerRef.current, { scale: 0.8, duration: 0.15 })
      gsap.fromTo(
        rippleRef.current,
        { x: e.clientX, y: e.clientY, scale: 0, opacity: 0.8 },
        { scale: 1, opacity: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
    const up = () => gsap.to(hovering ? badgeRef.current : pointerRef.current, { scale: 1, duration: 0.35, ease: 'back.out(3)' })

    const leave = () => {
      visible = false
      gsap.to([pointerRef.current, badgeRef.current], { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('resize', resize)
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      gsap.ticker.remove(render)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('resize', resize)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[198] h-screen w-screen" />

      <div
        ref={rippleRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] -ml-8 -mt-8 h-16 w-16 rounded-full border-2 border-netflix-red opacity-0"
      />

      <div
        ref={badgeRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] -ml-9 -mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-netflix-red/90 opacity-0 shadow-[0_0_30px_rgba(229,9,20,0.6)]"
        style={{ transform: 'scale(0)' }}
      >
        <span ref={labelRef} className="font-display text-lg tracking-[0.15em] text-white">
          PLAY
        </span>
      </div>

      <div ref={pointerRef} className="pointer-events-none fixed left-0 top-0 z-[200] opacity-0" style={{ transformOrigin: '0 0' }}>
        <svg width="26" height="28" viewBox="0 0 26 28" className="drop-shadow-[0_0_8px_rgba(229,9,20,0.9)]">
          <path d="M1 1 L24 11 L13.5 13.5 L9 26 Z" fill="#E50914" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M1 1 L13.5 13.5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  )
}
