'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(scopeRef, selector = '.reveal') {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.set(selector, { opacity: 0, y: 48 })
      ScrollTrigger.batch(selector, {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 1.3,
            stagger: 0.12,
            ease: 'expo.out',
            overwrite: true,
            force3D: true,
          }),
      })
    }, scopeRef)
    return () => ctx.revert()
  }, [scopeRef, selector])
}
