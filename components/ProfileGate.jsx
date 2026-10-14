'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { viewerProfiles } from '@/data/portfolio'

export default function ProfileGate({ onSelect }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gate-anim', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const choose = (profileItem) => {
    gsap.to(rootRef.current, {
      opacity: 0,
      scale: 1.15,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => onSelect(profileItem),
    })
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-netflix-dark px-6"
    >
      <h2 className="gate-anim font-sans text-3xl md:text-6xl font-medium text-white mb-10 md:mb-14 text-center">
        Who&apos;s watching?
      </h2>

      <div className="flex flex-wrap justify-center gap-5 md:gap-8 max-w-4xl">
        {viewerProfiles.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => choose(p)}
            className="gate-anim group flex flex-col items-center gap-3 focus:outline-none"
          >
            <div
              className={`relative w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden bg-gradient-to-br ${p.tint} ring-0 ring-white transition-all duration-200 group-hover:ring-4 group-focus-visible:ring-4`}
            >
              <Image
                src={p.avatar}
                alt={p.label}
                fill
                sizes="144px"
                className="object-cover object-top scale-110 transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            <span className="text-sm md:text-lg text-white/50 transition-colors group-hover:text-white">
              {p.label}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => choose(viewerProfiles[3])}
        className="gate-anim mt-12 md:mt-16 border border-white/40 px-6 py-2 text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 hover:border-white hover:text-white transition-colors"
      >
        Skip
      </button>
    </div>
  )
}
