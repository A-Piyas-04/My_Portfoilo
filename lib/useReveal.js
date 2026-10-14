'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(scopeRef, selector = '.reveal') {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(selector, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 40, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }
          ),
      })
      gsap.set(selector, { opacity: 0 })
    }, scopeRef)
    return () => ctx.revert()
  }, [scopeRef, selector])
}
