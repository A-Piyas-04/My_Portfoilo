'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { expertise } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Expertise() {
  const ref = useRef(null)
  const cardsRef = useRef([])
  useReveal(ref)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = cardsRef.current.filter(Boolean)
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.92 - i * 0.02,
          y: -15 - i * 8,
          filter: 'blur(5px)',
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 75%',
            end: `top ${110 + (i + 1) * 24}px`,
            scrub: true,
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const onMove = (e) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section ref={ref} id="expertise" className="section-padding relative bg-netflix-black">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-netflix-red/10 blur-[140px]" />

      <div className="container-custom relative">
        <div className="reveal mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-3">Episode 03 &nbsp;|&nbsp; Core Competencies</p>
            <h2 className="section-title">
              Technical <span className="text-netflix-red">Capabilities</span>
            </h2>
          </div>
          <p className="text-white/60 md:text-right md:max-w-md md:justify-self-end">
            Merging full-stack engineering, data systems and applied AI into production-ready platforms.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {expertise.map((item, i) => (
            <div
              key={item.number}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={onMove}
              className="group sticky mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1f0a0c] via-[#121212] to-[#0a0a0a] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] will-change-transform"
              style={{ top: `${110 + i * 24}px` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(229,9,20,0.18), transparent 60%)' }}
              />
              <div className="absolute left-0 top-0 h-full w-1 bg-netflix-red" />

              <div className="relative flex items-start justify-between">
                <span className="rounded-full border border-netflix-red/40 bg-netflix-red/10 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-netflix-red">
                  {item.tag}
                </span>
                <span className="font-display text-6xl md:text-8xl leading-none text-outline">{item.number}</span>
              </div>

              <div className="relative mt-6 md:mt-10 grid gap-4 md:grid-cols-[1fr_1.2fr] md:items-end">
                <h3 className="font-display text-4xl md:text-5xl tracking-wide">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
