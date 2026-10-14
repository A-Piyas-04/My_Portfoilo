'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { gsap } from 'gsap'
import { profile, roles, socials, experience } from '@/data/portfolio'
import { useViewer } from './ViewerContext'
import { scrollToId } from '@/lib/scroll'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const currentJob = experience.find((e) => e.current)

function PlayIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4v16a1 1 0 001.524.852l13-8a1 1 0 000-1.704l-13-8A1 1 0 006 4z" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
    </svg>
  )
}

function PrimaryCta({ type }) {
  const github = socials.find((s) => s.name === 'GitHub')
  if (type === 'github') {
    return (
      <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-netflix">
        <PlayIcon /> View GitHub
      </a>
    )
  }
  if (type === 'contact' || type === 'projects') {
    return (
      <button type="button" onClick={() => scrollToId(type)} className="btn-netflix">
        <PlayIcon /> {type === 'contact' ? 'Start a Project' : 'Play Projects'}
      </button>
    )
  }
  return (
    <a href={profile.resume} download={profile.resumeFileName} className="btn-netflix">
      <PlayIcon /> Play Resume
    </a>
  )
}

export default function Hero() {
  const { viewer } = useViewer()
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const spotlightRef = useRef(null)
  const contentRef = useRef(null)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower = (navigator.hardwareConcurrency || 8) <= 2
    setShow3D(!reduced && !lowPower)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(
          contentRef.current.querySelectorAll('.hero-anim'),
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.1 }
        )
        .fromTo(
          card,
          { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
          { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: 'back.out(1.2)' },
          '-=0.9'
        )
    }, section)

    if (reduced || !window.matchMedia('(pointer: fine)').matches) return () => ctx.revert()

    const xTilt = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' })
    const yTilt = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' })
    const glareX = gsap.quickTo(glareRef.current, 'x', { duration: 0.3, ease: 'power2.out' })
    const glareY = gsap.quickTo(glareRef.current, 'y', { duration: 0.3, ease: 'power2.out' })

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`

      const c = card.getBoundingClientRect()
      const cx = c.left + c.width / 2
      const cy = c.top + c.height / 2
      const dx = clampUnit((e.clientX - cx) / (c.width / 2))
      const dy = clampUnit((e.clientY - cy) / (c.height / 2))
      xTilt(dx * 14)
      yTilt(-dy * 14)
      glareX(e.clientX - c.left - c.width / 2)
      glareY(e.clientY - c.top - c.height / 2)
    }
    const onEnter = () => gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 })
    const onLeave = () => {
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 })
      xTilt(0)
      yTilt(0)
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen overflow-hidden bg-netflix-black pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(229,9,20,0.22),transparent_60%)]" />
      {show3D && <HeroScene />}

      <div className="pointer-events-none absolute inset-x-0 top-[18%] select-none overflow-hidden opacity-[0.07]">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...roles, ...roles].map((r, i) => (
            <span key={i} className="mx-8 font-display text-[9vw] leading-none text-white">
              {r} &bull;
            </span>
          ))}
        </div>
      </div>

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0"
        style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.18) 0%, transparent 65%)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-netflix-black to-transparent" />

      <div ref={contentRef} className="container-custom relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="hero-anim mb-5 flex items-center gap-3">
              <span className="font-display text-4xl leading-none text-netflix-red">N</span>
              <span className="text-xs font-bold uppercase tracking-[0.45em] text-white/70">Developer Series</span>
            </div>

            <h1 className="hero-anim font-display uppercase leading-[0.85] tracking-wide">
              <span className="block text-7xl sm:text-8xl xl:text-[9.5rem] text-white">{profile.firstName}</span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-outline">{profile.lastName}</span>
            </h1>

            <div className="hero-anim mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold">
              <span className="text-[#46d369]">98% Match</span>
              <span className="text-white/80">2026</span>
              <span className="border border-white/40 px-1.5 text-[11px] text-white/80">16+</span>
              <span className="text-white/80">S01</span>
              <span className="rounded-sm border border-white/40 px-1.5 text-[11px] text-white/80">HD</span>
            </div>

            {currentJob && (
              <div className="hero-anim mt-5 inline-flex items-center gap-3 rounded-sm bg-white/5 py-2 pl-2 pr-4 backdrop-blur-sm border-l-4 border-netflix-red">
                <span className="rounded-sm bg-netflix-red px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  New Episode
                </span>
                <span className="text-sm text-white/90">
                  {currentJob.role} @ <span className="font-semibold text-white">{currentJob.company}</span>
                </span>
              </div>
            )}

            <p key={viewer.id} className="hero-anim mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
              {viewer.tagline}
            </p>

            <div className="hero-anim mt-8 flex flex-wrap gap-3">
              <PrimaryCta type={viewer.primaryCta} />
              <button type="button" onClick={() => scrollToId('about')} className="btn-netflix-ghost">
                <InfoIcon /> More Info
              </button>
            </div>
          </div>

          <div className="perspective-1000 mx-auto w-full max-w-[380px]">
            <div ref={cardRef} className="preserve-3d relative aspect-[2/3] w-full will-change-transform">
              <div className="absolute -inset-6 rounded-[2rem] bg-netflix-red/30 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#3a0306] via-[#160102] to-black shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(229,9,20,0.55),transparent_60%)]" />
                <span className="absolute left-1/2 top-[6%] -translate-x-1/2 select-none font-display text-[10rem] leading-none text-netflix-red/25">
                  N
                </span>
                <Image
                  src={profile.photos.primary}
                  alt={profile.name}
                  fill
                  priority
                  sizes="380px"
                  className="object-cover object-top translate-y-[8%] scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-col items-center bg-netflix-red px-1.5 py-1 leading-none shadow-lg">
                  <span className="text-[8px] font-black tracking-wider">TOP</span>
                  <span className="font-display text-xl">10</span>
                </div>
                <span className="absolute right-3 top-3 rounded-sm bg-black/60 px-2 py-1 text-[10px] font-bold tracking-widest text-white/80 backdrop-blur">
                  FEATURED DEV
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <p className="font-display text-4xl tracking-wider text-white">{profile.firstName}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-netflix-red">
                    {currentJob ? currentJob.role : 'Software Developer'}
                  </p>
                </div>

                <div
                  ref={glareRef}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -ml-[70%] -mt-[70%] rounded-full mix-blend-overlay"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 45%)' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-anim mt-14 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
          <span>Engineered for scale</span>
          <button type="button" onClick={() => scrollToId('about')} className="hidden sm:inline hover:text-white">
            Scroll to explore &darr;
          </button>
          <span>[ Portfolio Release v3.0 ]</span>
        </div>
      </div>
    </section>
  )
}

function clampUnit(v) {
  return Math.max(-1, Math.min(1, v))
}
