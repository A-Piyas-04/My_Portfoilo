'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as rawProjects, projectGenres } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const GAP = 24
const FOLDER_LIMIT = 8
const PAGE_SIZE = 12
const OTHER_GENRE = 'More Originals'
const pad = (n) => String(n).padStart(2, '0')

const projects = rawProjects.map((p, i) => ({
  ...p,
  genres: p.genres?.length ? p.genres : [OTHER_GENRE],
  episode: `S01 E${pad(i + 1)}`,
  match: 99 - ((i * 7) % 6),
}))

const featured = (() => {
  const marked = projects.filter((p) => p.featured)
  return (marked.length ? marked : projects).slice(0, FOLDER_LIMIT)
})()

const genres = (() => {
  const found = new Set(projects.flatMap((p) => p.genres))
  const ordered = projectGenres.filter((g) => found.has(g))
  const extra = [...found].filter((g) => !projectGenres.includes(g))
  return [...ordered, ...extra]
})()

function relatedTo(project) {
  return projects
    .filter((p) => p.id !== project.id)
    .map((p) => ({
      p,
      score:
        p.tech.filter((t) => project.tech.includes(t)).length +
        p.genres.filter((g) => project.genres.includes(g)).length * 2,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.p)
}

function matchesQuery(p, q) {
  if (!q) return true
  const hay = `${p.title} ${p.category} ${p.description} ${p.tech.join(' ')}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => hay.includes(word))
}

function computeLayout(width) {
  const cols = width >= 1100 ? 4 : 3
  const cardW = Math.min(300, (width - GAP * (cols - 1)) / cols)
  const cardH = Math.round(cardW * 0.7)
  const rows = Math.ceil(featured.length / cols)
  return { cols, rows, cardW, cardH, height: rows * cardH + (rows - 1) * GAP + 60 }
}

function gridTarget(i, { cols, rows, cardW, cardH }) {
  const row = Math.floor(i / cols)
  const col = i % cols
  const inRow = row === rows - 1 ? featured.length - row * cols : cols
  const rowShift = ((cols - inRow) * (cardW + GAP)) / 2
  return {
    x: (col - (cols - 1) / 2) * (cardW + GAP) + rowShift,
    y: (row - (rows - 1) / 2) * (cardH + GAP),
  }
}

function CardBody({ project, compact = false }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-colors duration-300 group-hover:border-netflix-red/70"
      style={{ background: 'radial-gradient(circle at 100% 0%, rgba(229,9,20,0.14), transparent 45%), linear-gradient(150deg, #1c1c1c, #141414 55%, #0d0d0d)' }}
    >
      <div className="relative flex items-center justify-between text-[10px] font-bold tracking-wider">
        <span className="rounded-sm bg-netflix-red px-1.5 py-0.5">{project.episode}</span>
        <span className="flex items-center gap-2">
          <span className="text-[#46d369]">{project.match}% Match</span>
          <span className="rounded-sm border border-white/30 px-1 text-white/70">{project.websiteUrl ? 'LIVE' : 'HD'}</span>
        </span>
      </div>
      <div className="relative">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-netflix-red">{project.category}</p>
        <h3 className={`mt-1 font-display leading-none tracking-wide ${compact ? 'text-3xl' : 'text-[1.7rem]'}`}>{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-white/55">{project.description}</p>
      </div>
      <div className="relative flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="rounded-sm border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function cardProps(p, open) {
  return {
    role: 'button',
    tabIndex: 0,
    'data-cursor': 'VIEW',
    'aria-label': `More info about ${p.title}`,
    onClick: () => open(p),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open(p)
      }
    },
  }
}

function FeaturedFolder({ open }) {
  const scopeRef = useRef(null)
  const stageRef = useRef(null)
  const folderBackRef = useRef(null)
  const folderFrontRef = useRef(null)
  const cardsRef = useRef([])
  const [layout, setLayout] = useState(() => computeLayout(1200))

  useEffect(() => {
    let last = 0
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (w && Math.abs(w - last) > 20) {
        last = w
        setLayout(computeLayout(w))
      }
    })
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = cardsRef.current.filter(Boolean)
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const toGrid = { x: (i) => gridTarget(i, layout).x, y: (i) => gridTarget(i, layout).y }
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
          force3D: true,
        })

        if (reduced) {
          gsap.set([folderBackRef.current, folderFrontRef.current], { opacity: 0 })
          gsap.set(cards, { ...toGrid, rotation: 0, scale: 1, zIndex: 70 })
          return
        }

        gsap
          .timeline({
            scrollTrigger: { trigger: stageRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
            defaults: { force3D: true },
          })
          .to(folderFrontRef.current, { rotationX: -130, duration: 1.1, ease: 'power3.inOut' })
          .to(cards, { y: -150, scale: 0.85, zIndex: 70, duration: 0.6, stagger: 0.04, ease: 'power3.out' }, '-=0.55')
          .to(cards, {
            ...toGrid,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            stagger: { amount: 0.35, from: 'center' },
            ease: 'expo.out',
          })
          .to([folderBackRef.current, folderFrontRef.current], { opacity: 0.1, scale: 0.8, duration: 0.9, ease: 'power2.out' }, '-=1.3')
      })
    }, scopeRef)
    return () => ctx.revert()
  }, [layout])

  return (
    <div ref={scopeRef} className="hidden md:block">
      <h3 className="reveal mb-4 flex items-center gap-3 text-xl font-bold">
        <span className="font-display text-3xl leading-none text-netflix-red">N</span> Top Picks For You
      </h3>
      <div ref={stageRef} className="relative" style={{ height: layout.height, perspective: '1400px' }}>
        <div
          ref={folderBackRef}
          className="absolute left-1/2 top-1/2 z-0 h-[230px] w-[340px] rounded-xl border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#161616] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute -top-6 left-0 h-7 w-32 rounded-t-lg border border-b-0 border-white/10 bg-[#2a2a2a] px-3 pt-1.5 text-[10px] font-bold tracking-[0.2em] text-white/50">
            TOP PICKS
          </div>
        </div>

        {featured.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => (cardsRef.current[i] = el)}
            {...cardProps(p, open)}
            className="group absolute left-1/2 top-1/2 rounded-xl will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
            style={{ width: layout.cardW, height: layout.cardH }}
          >
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
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
    </div>
  )
}

function ProjectRow({ title, items, open, className = '' }) {
  const scrollerRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [updateEdges, items])

  const page = (dir) => {
    const el = scrollerRef.current
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <div className={`reveal group/row relative ${className}`}>
      <h3 className="mb-3 flex items-baseline gap-3 text-lg font-bold md:text-xl">
        {title}
        <span className="text-xs font-semibold text-white/40">{items.length} titles</span>
      </h3>
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          data-lenis-prevent-horizontal
          className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 pt-1 md:gap-4"
        >
          {items.map((p) => (
            <div
              key={p.id}
              {...cardProps(p, open)}
              className="group aspect-[16/11] w-[78vw] shrink-0 snap-start rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red sm:w-[300px]"
            >
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]">
                <CardBody project={p} compact />
              </div>
            </div>
          ))}
        </div>

        {!edges.start && (
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label={`Scroll ${title} left`}
            className="absolute -left-4 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-netflix-black to-transparent opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 md:flex"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {!edges.end && (
          <button
            type="button"
            onClick={() => page(1)}
            aria-label={`Scroll ${title} right`}
            className="absolute -right-4 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-netflix-black to-transparent opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 md:flex"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

function Browse({ open }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const gridRef = useRef(null)

  const filtering = query.trim() !== '' || genre !== 'All'
  const results = useMemo(
    () => projects.filter((p) => (genre === 'All' || p.genres.includes(genre)) && matchesQuery(p, query.trim())),
    [query, genre]
  )

  useEffect(() => setVisible(PAGE_SIZE), [query, genre])

  useEffect(() => {
    if (!filtering || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-grid-card]')
    gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out', overwrite: true })
    ScrollTrigger.refresh()
  }, [filtering, results, visible])

  return (
    <div className="mt-16 md:mt-20">
      <div className="reveal mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-2xl font-bold md:text-3xl">
          Browse all <span className="text-netflix-red">{projects.length}</span> episodes
        </h3>
        <label className="relative block w-full lg:w-80">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, tech, genres"
            className="w-full rounded-md border border-white/20 bg-black/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
          />
        </label>
      </div>

      <div className="reveal hide-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" data-lenis-prevent-horizontal>
        {['All', ...genres].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              genre === g ? 'border-white bg-white text-black' : 'border-white/20 text-white/70 hover:border-white/60 hover:text-white'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {filtering ? (
        <div>
          {results.length === 0 ? (
            <p className="py-12 text-center text-white/50">
              Your search for &ldquo;{query}&rdquo; did not have any matches. Try a different title or technology.
            </p>
          ) : (
            <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {results.slice(0, visible).map((p) => (
                <div
                  key={p.id}
                  data-grid-card
                  {...cardProps(p, open)}
                  className="group aspect-[16/11] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
                >
                  <div className="h-full w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]">
                    <CardBody project={p} compact />
                  </div>
                </div>
              ))}
            </div>
          )}
          {visible < results.length && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-netflix-ghost">
                Load {Math.min(PAGE_SIZE, results.length - visible)} more
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <ProjectRow title="Top Picks For You" items={featured} open={open} className="md:hidden" />
          {genres.map((g) => (
            <ProjectRow key={g} title={g} items={projects.filter((p) => p.genres.includes(g))} open={open} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)
  useReveal(sectionRef)

  const open = useCallback((p) => setSelected(p), [])
  const close = useCallback(() => setSelected(null), [])

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden bg-netflix-black">
      <div className="pointer-events-none absolute inset-x-0 top-10 flex select-none justify-center">
        <span className="font-display text-[20vw] leading-none text-white/[0.03]">ORIGINALS</span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[25%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.12),transparent_65%)]" />

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

        <FeaturedFolder open={open} />
        <Browse open={open} />
      </div>

      <ProjectModal project={selected} related={selected ? relatedTo(selected) : []} onClose={close} onSelect={open} />
    </section>
  )
}
