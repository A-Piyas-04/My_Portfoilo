'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { skillCategories } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'

const total = skillCategories.length
const pad = (n) => String(n).padStart(2, '0')
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

export default function Skills() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const cardsRef = useRef([])
  const labelsRef = useRef([])
  const state = useRef({ p: 0, tween: null, dragged: false })
  const geometry = useRef({ radius: 1800, angle: 18, cardW: 420 })
  const [active, setActive] = useState(0)
  useReveal(sectionRef)

  const render = useCallback(() => {
    const { p } = state.current
    const { radius, angle } = geometry.current
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const offset = i - p
      const deg = offset * angle
      const rad = (deg * Math.PI) / 180
      const x = Math.sin(rad) * radius
      const y = radius - Math.cos(rad) * radius
      const dist = Math.abs(offset)
      const scale = Math.max(0.55, 1 - dist * 0.12)
      card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${-dist * 60}px) rotate(${deg}deg) scale(${scale})`
      card.style.opacity = String(Math.max(0, 1 - dist * 0.32))
      card.style.zIndex = String(100 - Math.round(dist * 10))
      card.style.pointerEvents = dist > 2.2 ? 'none' : 'auto'
    })
    labelsRef.current.forEach((el, i) => {
      if (el) el.style.opacity = String(Math.max(0, 1 - Math.abs(i - p)))
    })
  }, [])

  const goTo = useCallback(
    (index, duration = 0.95) => {
      const target = clamp(index, 0, total - 1)
      setActive(target)
      state.current.tween?.kill()
      state.current.tween = gsap.to(state.current, {
        p: target,
        duration,
        ease: 'power3.out',
        onUpdate: render,
      })
    },
    [render]
  )

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      const cardW = w < 640 ? w * 0.78 : w < 1024 ? 360 : 420
      const radius = Math.min(1800, Math.max(900, w * 1.3))
      const angle = (Math.asin(Math.min(0.9, (cardW * 1.08) / radius)) * 180) / Math.PI
      geometry.current = { radius, angle, cardW }
      render()
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [render])

  useEffect(() => {
    const stage = stageRef.current
    const carousel = state.current
    let startX = 0
    let startP = 0
    let dragging = false
    let wheelAcc = 0
    let wheelTimer = null

    const down = (e) => {
      if (e.button !== undefined && e.button !== 0) return
      dragging = true
      state.current.dragged = false
      startX = e.clientX
      startP = state.current.p
      state.current.tween?.kill()
    }
    const move = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 6) state.current.dragged = true
      state.current.p = clamp(startP - dx / (geometry.current.cardW * 0.9), -0.35, total - 0.65)
      render()
    }
    const up = (e) => {
      if (!dragging) return
      dragging = false
      const dx = e.clientX - startX
      const base = Math.round(startP)
      if (Math.abs(dx) < 40) goTo(Math.round(state.current.p))
      else goTo(base + Math.sign(-dx) * Math.max(1, Math.round(Math.abs(dx) / (geometry.current.cardW * 0.9))))
    }

    const wheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      wheelAcc += e.deltaX
      if (Math.abs(wheelAcc) > 60) {
        goTo(Math.round(state.current.p) + Math.sign(wheelAcc))
        wheelAcc = 0
      }
      clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => (wheelAcc = 0), 180)
    }

    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    stage.addEventListener('wheel', wheel, { passive: false })
    return () => {
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      stage.removeEventListener('wheel', wheel)
      clearTimeout(wheelTimer)
      carousel.tween?.kill()
    }
  }, [goTo, render])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  const onCardClick = (i) => {
    if (state.current.dragged) return
    if (i !== active) goTo(i)
  }

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden bg-netflix-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black via-[#140203] to-black" />

      <div className="container-custom relative z-10">
        <div className="reveal grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-3">Episode 04 &nbsp;|&nbsp; The Arsenal</p>
            <h2 className="section-title">
              Skills <span className="text-netflix-red">&amp;</span> Stack
            </h2>
          </div>
          <p className="text-white/60 md:max-w-sm md:justify-self-end md:text-right">
            Drag, swipe or use the arrows to flip through the collection.
          </p>
        </div>
      </div>

      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skill categories"
        onKeyDown={onKeyDown}
        data-cursor="DRAG"
        data-lenis-prevent-horizontal
        className="reveal relative z-10 mt-8 h-[540px] select-none overflow-hidden focus:outline-none md:h-[620px]"
        style={{ perspective: '1400px', touchAction: 'pan-y' }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {skillCategories.map((c, i) => (
            <span
              key={c.title}
              ref={(el) => (labelsRef.current[i] = el)}
              className="absolute select-none font-display text-[26vw] uppercase leading-none text-transparent md:text-[17vw]"
              style={{
                WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.28)' : 'rgba(255,255,255,0.12)'}`,
                opacity: i === 0 ? 1 : 0,
              }}
            >
              Skills
            </span>
          ))}
        </div>

        {skillCategories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => onCardClick(i)}
            className="group absolute left-1/2 top-[44%] flex h-[440px] w-[78vw] flex-col justify-between overflow-hidden rounded-[28px] border border-white/15 p-7 shadow-[0_30px_60px_rgba(0,0,0,0.85)] transition-[border-color] duration-500 will-change-transform hover:border-netflix-red/80 sm:w-[360px] md:h-[500px] lg:w-[420px] md:p-10"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(229,9,20,0.16), transparent 45%), linear-gradient(160deg, #1b1b1b 0%, #121212 60%, #0d0d0d 100%)',
            }}
          >
            <div className="relative flex items-center justify-between">
              <span className="rounded-full border border-netflix-red/40 bg-netflix-red/10 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-netflix-red">
                {cat.tag}
              </span>
              <span className="font-mono text-xs text-white/40">
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/85"
                >
                  {s.icon && (
                    <Image
                      src={s.icon}
                      alt=""
                      width={14}
                      height={14}
                      draggable={false}
                      className={`h-3.5 w-3.5 object-contain ${s.mono ? 'brightness-0 invert' : ''}`}
                    />
                  )}
                  {s.name}
                </span>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-netflix-red to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      <div className="container-custom relative z-10 mt-2 flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous category"
          className="flex h-10 w-10 shrink-0 items-center sm:h-11 sm:w-11 justify-center rounded-full border border-white/20 text-white transition-colors hover:border-netflix-red hover:bg-netflix-red disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {skillCategories.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={c.title}
              aria-current={i === active}
              className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-3 ${
                i === active ? 'bg-netflix-red text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="hidden md:inline">{c.title}</span>
              <span className="md:hidden">{pad(i + 1)}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === total - 1}
          aria-label="Next category"
          className="flex h-10 w-10 shrink-0 items-center sm:h-11 sm:w-11 justify-center rounded-full border border-white/20 text-white transition-colors hover:border-netflix-red hover:bg-netflix-red disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
