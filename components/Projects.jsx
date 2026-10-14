'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as rawProjects } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const GAP = 24
const pad = (n) => String(n).padStart(2, '0')

const projects = rawProjects.map((p, i) => ({
  ...p,
  episode: `S01 E${pad(i + 1)}`,
  match: 99 - ((i * 7) % 6),
}))

function relatedTo(project) {
  const scored = projects
    .filter((p) => p.id !== project.id)
    .map((p) => ({
      p,
      score: p.tech.filter((t) => project.tech.includes(t)).length + (p.category === project.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, 3).map((s) => s.p)
}

function computeLayout(width) {
  const cols = width >= 1100 ? 4 : 3
  const cardW = Math.min(300, (width - GAP * (cols - 1)) / cols)
  const cardH = Math.round(cardW * 0.7)
  const rows = Math.ceil(projects.length / cols)
  return { cols, rows, cardW, cardH, height: rows * cardH + (rows - 1) * GAP + 60 }
}

function gridTarget(i, { cols, rows, cardW, cardH }) {
  const row = Math.floor(i / cols)
  const col = i % cols
  const inRow = row === rows - 1 ? projects.length - row * cols : cols
  const rowShift = ((cols - inRow) * (cardW + GAP)) / 2
  return {
    x: (col - (cols - 1) / 2) * (cardW + GAP) + rowShift,
    y: (row - (rows - 1) / 2) * (cardH + GAP),
  }
}

function CardBody({ project, compact = false }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0d0d0d] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-colors duration-300 group-hover:border-netflix-red/70">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-netflix-red/15 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center justify-between text-[10px] font-bold tracking-wider">
        <span className="rounded-sm bg-netflix-red px-1.5 py-0.5">{project.episode}</span>
        <span className="flex items-center gap-2">
          <span className="text-[#46d369]">{project.match}% Match</span>
          <span className="rounded-sm border border-white/30 px-1 text-white/70">{project.websiteUrl ? 'LIVE' : 'HD'}</span>
        </span>
      </div>
      <div className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-netflix-red">{project.category}</p>
        <h3 className={`font-display tracking-wide leading-none mt-1 ${compact ? 'text-3xl' : 'text-[1.7rem]'}`}>{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-white/55">{project.description}</p>
      </div>
      <div className="relative flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="rounded-sm bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70 border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const folderBackRef = useRef(null)
  const folderFrontRef = useRef(null)
  const cardsRef = useRef([])
  const [layout, setLayout] = useState(() => computeLayout(1200))
  const [selected, setSelected] = useState(null)
  useReveal(sectionRef)

  useEffect(() => {
    const el = stageRef.current
    let last = 0
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (w && Math.abs(w - last) > 20) {
        last = w
        setLayout(computeLayout(w))
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = cardsRef.current.filter(Boolean)
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.set([folderBackRef.current, folderFrontRef.current], { xPercent: -50, yPercent: -50 })
        gsap.set(folderFrontRef.current, { transformOrigin: 'bottom center' })
        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          scale: 0.75,
          rotation: () => gsap.utils.random(-7, 7),
          zIndex: (i) => 10 + i,
        })

        const spread = (tl) =>
          tl.to(cards, {
            x: (i) => gridTarget(i, layout).x,
            y: (i) => gridTarget(i, layout).y,
            rotation: () => gsap.utils.random(-2, 2),
            scale: 1,
            duration: 1.3,
            stagger: { amount: 0.4, from: 'center' },
            ease: 'expo.out',
          })

        if (reduced) {
          gsap.set(folderFrontRef.current, { rotationX: -130, opacity: 0 })
          gsap.set(folderBackRef.current, { opacity: 0 })
          gsap.set(cards, {
            x: (i) => gridTarget(i, layout).x,
            y: (i) => gridTarget(i, layout).y,
            rotation: 0,
            scale: 1,
            zIndex: 70,
          })
          return
        }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: stageRef.current, start: 'top 65%', toggleActions: 'play none none reverse' },
        })
        tl.to(folderFrontRef.current, { rotationX: -130, duration: 1, ease: 'power3.inOut' })
          .to(cards, { y: -150, scale: 0.85, zIndex: 70, duration: 0.5, stagger: 0.03, ease: 'back.out(1.4)' }, '-=0.5')
        spread(tl)
        tl.to([folderBackRef.current, folderFrontRef.current], { opacity: 0.12, scale: 0.8, duration: 0.8 }, '-=1.1')
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [layout])

  const open = useCallback((p) => setSelected(p), [])
  const close = useCallback(() => setSelected(null), [])

  const cardProps = (p) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `More info about ${p.title}`,
    onClick: () => open(p),
    onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open(p)),
  })

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden bg-netflix-black">
      <div className="pointer-events-none absolute inset-x-0 top-10 flex justify-center select-none">
        <span className="font-display text-[20vw] leading-none text-white/[0.03]">ORIGINALS</span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-netflix-red/10 blur-[150px]" />

      <div className="container-custom relative">
        <div className="reveal mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-3">Episode 05 &nbsp;|&nbsp; The Archive</p>
            <h2 className="section-title">
              Portfolio <span className="text-netflix-red">Originals</span>
            </h2>
          </div>
          <p className="text-white/60 md:max-w-md md:justify-self-end md:text-right">
            {projects.length} episodes and counting. Click any title for the full synopsis, cast and links.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative hidden md:block"
          style={{ height: layout.height, perspective: '1400px' }}
        >
          <div
            ref={folderBackRef}
            className="absolute left-1/2 top-1/2 z-0 h-[230px] w-[340px] rounded-xl border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#161616] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute -top-6 left-0 h-7 w-32 rounded-t-lg border border-b-0 border-white/10 bg-[#2a2a2a] px-3 pt-1.5 text-[10px] font-bold tracking-[0.2em] text-white/50">
              ARCHIVE
            </div>
          </div>

          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (cardsRef.current[i] = el)}
              {...cardProps(p)}
              className="group absolute left-1/2 top-1/2 cursor-pointer will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red rounded-xl"
              style={{ width: layout.cardW, height: layout.cardH }}
            >
              <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.06]">
                <CardBody project={p} />
              </div>
            </div>
          ))}

          <div
            ref={folderFrontRef}
            className="absolute left-1/2 top-1/2 z-50 mt-6 h-[190px] w-[350px] rounded-xl border border-white/10 bg-gradient-to-b from-[#3a3a3a] via-[#222] to-[#151515] shadow-[0_-10px_40px_rgba(0,0,0,0.6)]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="font-display text-6xl leading-none text-netflix-red drop-shadow-[0_0_20px_rgba(229,9,20,0.5)]">N</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/40">ORIGINALS</span>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:hidden">
          {projects.map((p) => (
            <div key={p.id} {...cardProps(p)} className="reveal group aspect-[16/11] w-[78vw] shrink-0 snap-center">
              <CardBody project={p} compact />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selected}
        related={selected ? relatedTo(selected) : []}
        onClose={close}
        onSelect={open}
      />
    </section>
  )
}
