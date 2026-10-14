'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { profile } from '@/data/portfolio'

const RIBBONS = 14

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const ribbonsRef = useRef([])
  const lettersRef = useRef([])
  const glowRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.timeline({ onComplete })
          .from(lettersRef.current, { opacity: 0, duration: 0.4 })
          .to(rootRef.current, { opacity: 0, duration: 0.3, delay: 0.4 })
        return
      }

      gsap.timeline({ onComplete })
        .fromTo(
          lettersRef.current,
          { opacity: 0, scale: 2.4, filter: 'blur(16px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.07, ease: 'expo.out' }
        )
        .fromTo(glowRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.5')
        .to(lettersRef.current, { scale: 1.08, duration: 0.6, ease: 'sine.inOut' })
        .set(ribbonsRef.current, { opacity: 1 })
        .fromTo(
          ribbonsRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.5, stagger: { each: 0.025, from: 'center' }, ease: 'power3.in' },
          '-=0.2'
        )
        .to(lettersRef.current, { scale: 6, opacity: 0, filter: 'blur(20px)', duration: 0.6, ease: 'power3.in' }, '<')
        .to(ribbonsRef.current, {
          scaleY: 0,
          transformOrigin: 'bottom center',
          duration: 0.5,
          stagger: { each: 0.02, from: 'edges' },
          ease: 'power3.out',
        })
        .to(rootRef.current, { opacity: 0, duration: 0.35 }, '-=0.25')
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      <div
        ref={glowRef}
        className="absolute w-[60vw] h-[30vw] rounded-full bg-netflix-red/25 blur-[100px] opacity-0"
      />

      <div className="absolute inset-0 flex">
        {Array.from({ length: RIBBONS }).map((_, i) => (
          <span
            key={i}
            ref={(el) => (ribbonsRef.current[i] = el)}
            className="h-full flex-1 opacity-0"
            style={{
              background: `linear-gradient(180deg, ${i % 2 ? '#B20710' : '#E50914'} 0%, #5c0207 100%)`,
              boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.45)',
            }}
          />
        ))}
      </div>

      <h1 className="relative flex font-display text-[22vw] md:text-[14vw] leading-none text-netflix-red drop-shadow-[0_0_40px_rgba(229,9,20,0.55)]">
        {profile.shortName.split('').map((ch, i) => (
          <span key={i} ref={(el) => (lettersRef.current[i] = el)} className="inline-block opacity-0">
            {ch}
          </span>
        ))}
      </h1>
    </div>
  )
}
