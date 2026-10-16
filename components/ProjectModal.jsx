'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SocialIcon from './SocialIcon'
import { getLenis } from '@/lib/scroll'

export default function ProjectModal({ project, related, onClose, onSelect }) {
  const isOpen = Boolean(project)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/80 px-3 py-8 md:py-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.div
            key={project.id}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-netflix-dark shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-netflix-dark text-white hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-br from-netflix-deep via-[#2a0205] to-black">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_26px,rgba(255,255,255,0.035)_26px_28px)]" />
              <span className="absolute -right-6 -top-10 select-none font-display text-[16rem] leading-none text-black/25">
                {project.episode.split(' ')[1]}
              </span>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-netflix-dark to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:left-10">
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                  <span className="font-display text-2xl leading-none text-netflix-red">N</span> {project.category}
                </p>
                <h3 className="font-display text-5xl md:text-6xl tracking-wide">{project.title}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-netflix !py-2">
                    <SocialIcon name="GitHub" className="h-5 w-5" /> Source
                  </a>
                  {project.websiteUrl && (
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-netflix-ghost !py-2">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4v16l14-8z" />
                      </svg>
                      Watch Live
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-8 p-6 md:grid-cols-[1.6fr_1fr] md:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                  <span className="text-[#46d369]">{project.match}% Match</span>
                  <span className="text-white/70">{project.episode}</span>
                  {project.status === 'coming-soon' ? (
                    <span className="rounded-sm bg-white px-1.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-black">
                      Coming Soon
                    </span>
                  ) : (
                    <>
                      <span className="rounded-sm border border-white/40 px-1.5 text-[11px] text-white/80">HD</span>
                      {project.websiteUrl && (
                        <span className="rounded-sm bg-netflix-red px-1.5 text-[11px] font-bold">LIVE</span>
                      )}
                    </>
                  )}
                </div>
                <p className="mt-4 leading-relaxed text-white/80">{project.description}</p>
              </div>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-white/45">Cast: </span>
                  <span className="text-white/85">{project.tech.join(', ')}</span>
                </p>
                <p>
                  <span className="text-white/45">Genres: </span>
                  <span className="text-white/85">{project.genres.join(', ')}</span>
                </p>
                <p>
                  <span className="text-white/45">This show is: </span>
                  <span className="text-white/85">{project.category}</span>
                </p>
              </div>
            </div>

            {related.length > 0 && (
              <div className="px-6 pb-8 md:px-10">
                <h4 className="mb-4 text-xl font-bold">More Like This</h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelect(r)}
                      className="rounded-md bg-netflix-card p-4 text-left transition-colors hover:bg-white/10"
                    >
                      <p className="text-xs font-semibold text-[#46d369]">{r.match}% Match</p>
                      <p className="mt-1 font-bold">{r.title}</p>
                      <p className="mt-1 line-clamp-3 text-xs text-white/55">{r.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
