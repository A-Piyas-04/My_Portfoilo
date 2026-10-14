'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const xDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.05, ease: 'power2.out' })
    const yDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.05, ease: 'power2.out' })
    const xRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.18, ease: 'power3.out' })
    const yRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.18, ease: 'power3.out' })
    const xGlow = gsap.quickTo(glowRef.current, 'x', { duration: 0.6, ease: 'power3.out' })
    const yGlow = gsap.quickTo(glowRef.current, 'y', { duration: 0.6, ease: 'power3.out' })

    const move = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      xGlow(e.clientX)
      yGlow(e.clientY)
    }

    const over = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor="hover"]')
      gsap.to(ringRef.current, {
        scale: interactive ? 1.8 : 1,
        backgroundColor: interactive ? 'rgba(229,9,20,0.15)' : 'rgba(229,9,20,0)',
        duration: 0.25,
      })
    }

    const leave = () => gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 65%)', marginLeft: -250, marginTop: -250 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-10 w-10 rounded-full border border-netflix-red/80"
        style={{ marginLeft: -20, marginTop: -20 }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-netflix-red"
        style={{ marginLeft: -4, marginTop: -4 }}
      />
    </>
  )
}
