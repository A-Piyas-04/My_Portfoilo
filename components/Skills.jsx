'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const total = skillCategories.length
const pad = (n) => String(n).padStart(2, '0')

export default function Skills() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const labelsRef = useRef([])

  const focusMobile = (activeIdx) => {
    cardsRef.current.forEach((card, i) => {
      if (card) gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, opacity: i === activeIdx ? 1 : 0.6, duration: 0.3, overwrite: 'auto' })
    })
    labelsRef.current.forEach((el, i) => {
      if (el) gsap.to(el, { opacity: i === activeIdx ? 1 : 0, duration: 0.3, overwrite: 'auto' })
    })
  }

  const onScroll = (e) => {
    if (window.innerWidth >= 769) return
    const box = e.currentTarget
    const center = box.scrollLeft + box.offsetWidth / 2
    let best = 0
    let min = Infinity
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (d < min) {
        min = d
        best = i
      }
    })
    focusMobile(best)
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        const update = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return
            const offset = i - p
            const rad = (offset * 18 * Math.PI) / 180
            const radius = 1800
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              x: Math.sin(rad) * radius,
              y: radius - Math.cos(rad) * radius,
              z: -Math.abs(offset) * 50,
              rotationZ: offset * 18,
              scale: Math.max(0.4, 1 - Math.abs(offset) * 0.15),
              opacity: Math.max(0.1, 1 - Math.abs(offset) * 0.3),
              zIndex: Math.round(100 - Math.abs(offset) * 10),
            })
          })
          labelsRef.current.forEach((el, i) => {
            if (el) gsap.set(el, { opacity: Math.max(0, 1 - Math.abs(i - p)) })
          })
        }

        update(0)

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(total - 1) * 90}%`,
          pin: true,
          scrub: reduced ? true : 1,
          snap: reduced ? false : { snapTo: 1 / (total - 1), duration: 0.4, ease: 'power1.inOut' },
          onUpdate: (self) => update(self.progress * (total - 1)),
        })
      })

      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card) => card && gsap.set(card, { clearProps: 'all' }))
        focusMobile(0)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative flex min-h-screen flex-col overflow-hidden bg-netflix-black py-20 md:h-screen md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black via-[#140203] to-black" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {skillCategories.map((c, i) => (
          <span
            key={c.title}
            ref={(el) => (labelsRef.current[i] = el)}
            className="absolute select-none font-display text-[22vw] md:text-[17vw] uppercase leading-none text-transparent opacity-0"
            style={{ WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.14)'}` }}
          >
            Skills
          </span>
        ))}
      </div>

      <div className="container-custom relative z-10 md:absolute md:inset-x-0 md:top-24">
        <p className="eyebrow mb-3">Episode 04 &nbsp;|&nbsp; The Arsenal</p>
        <h2 className="section-title">
          Skills <span className="text-netflix-red">&amp;</span> Stack
        </h2>
      </div>

      <div
        onScroll={onScroll}
        className="hide-scrollbar relative z-10 mt-10 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] md:mt-0 md:block md:overflow-visible md:px-0"
        style={{ perspective: '1200px' }}
      >
        {skillCategories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative flex h-[460px] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 bg-[#141414]/95 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-colors duration-500 hover:border-netflix-red/80 sm:w-[360px] md:absolute md:left-1/2 md:top-[58%] md:h-[500px] md:w-[420px] md:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-netflix-red/15 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <span className="rounded-full border border-netflix-red/40 bg-netflix-red/10 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-netflix-red">
                {cat.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ {pad(i + 1)} / {pad(total)} ]
              </span>
            </div>

            <div className="relative">
              <h3 className="font-display text-5xl tracking-wide">{cat.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{cat.desc}</p>
            </div>

            <div className="relative flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-netflix-red/60 hover:bg-netflix-red/10"
                >
                  {s.icon && (
                    <Image
                      src={s.icon}
                      alt=""
                      width={14}
                      height={14}
                      className={`h-3.5 w-3.5 object-contain ${s.mono ? 'brightness-0 invert' : ''}`}
                    />
                  )}
                  {s.name}
                </span>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-netflix-red to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  )
}
