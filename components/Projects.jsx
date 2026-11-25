'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as rawProjects, projectGenres, projectStatusLabels, tryNowIds } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'
import ProjectModal from './ProjectModal'
import TryNowGrid from './TryNowGrid'

gsap.registerPlugin(ScrollTrigger)

const PAGE_SIZE = 12
const OTHER_GENRE = 'More Originals'
const pad = (n) => String(n).padStart(2, '0')

const projects = rawProjects.map((p, i) => ({
  ...p,
  genres: p.genres?.length ? p.genres : [OTHER_GENRE],
  episode: `S01 E${pad(i + 1)}`,
  match: 99 - ((i * 7) % 6),
}))

const tryNow = tryNowIds.map((id) => projects.find((p) => p.id === id)).filter((p) => p?.tryNow)

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

function CardBody({ project, compact = false }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-colors duration-300 group-hover:border-netflix-red/70"
      style={{ background: 'radial-gradient(circle at 100% 0%, rgba(229,9,20,0.14), transparent 45%), linear-gradient(150deg, #1c1c1c, #141414 55%, #0d0d0d)' }}
    >
      <div className="relative flex items-center justify-between text-[10px] font-bold tracking-wider">
        <span className="rounded-sm bg-netflix-red px-1.5 py-0.5">{project.episode}</span>
        <span className="flex items-center gap-2">
          <span className="text-[#46d369]">{project.match}% Match</span>
          {projectStatusLabels[project.status] ? (
            <span className="rounded-sm bg-white px-1 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-black">
              {projectStatusLabels[project.status]}
            </span>
          ) : (
            <span className="rounded-sm border border-white/30 px-1 text-white/70">{project.websiteUrl && project.websiteVerified !== false ? 'LIVE' : 'HD'}</span>
          )}
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

function TryNow({ open }) {
  if (!tryNow.length) return null

  return (
    <div id="try-now">
      <div className="reveal mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-netflix-red opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-netflix-red" />
            </span>
            Now Streaming
          </p>
          <h3 className="text-2xl font-bold md:text-3xl">Try It Right Now</h3>
        </div>
        <p className="text-sm text-white/55 md:max-w-sm md:text-right">
          Live in the browser or ready to run on your machine. No waitlist, just press play.
        </p>
      </div>

      <TryNowGrid onInfo={(p) => open(projects.find((project) => project.id === p.id))} />
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

        <TryNow open={open} />
        <Browse open={open} />
      </div>

      <ProjectModal project={selected} related={selected ? relatedTo(selected) : []} onClose={close} onSelect={open} />
    </section>
  )
}
