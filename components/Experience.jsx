'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { experience, profile } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'

export default function Experience() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="experience" className="section-padding relative overflow-hidden bg-netflix-dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(229,9,20,0.15),transparent_55%)]" />

      <div className="container-custom relative">
        <div className="reveal mb-12 flex flex-col gap-3">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-netflix-red animate-pulse-red" />
            Episode 02 &nbsp;|&nbsp; Live
          </p>
          <h2 className="section-title">
            Now <span className="text-netflix-red">Streaming</span>
          </h2>
        </div>

        <div className="space-y-8">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="reveal group relative overflow-hidden rounded-lg border border-white/10 bg-netflix-card shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="grid md:grid-cols-[1fr_1.3fr]">
                <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-netflix-deep via-[#3a0306] to-black">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_22px,rgba(255,255,255,0.03)_22px_24px)]" />
                  <span className="absolute -left-4 bottom-0 select-none font-display text-[11rem] leading-[0.8] text-black/30">
                    S01
                  </span>
                  <Image
                    src={profile.photos.primary}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain object-bottom opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-netflix-card/90 md:to-netflix-card" />
                  {job.current && (
                    <span className="absolute left-4 top-4 rounded-sm bg-netflix-red px-2.5 py-1 text-[11px] font-black uppercase tracking-wider shadow-lg">
                      New Episode
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col justify-center p-7 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">{job.type}</p>
                  <h3 className="mt-2 font-display text-4xl md:text-5xl tracking-wide">{job.role}</h3>
                  <p className="mt-1 text-lg font-semibold text-netflix-red">{job.company}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
                    <span className="font-semibold text-[#46d369]">Currently Airing</span>
                    <span>
                      {job.start} &ndash; {job.end}
                    </span>
                  </div>

                  <p className="mt-5 text-white/75 leading-relaxed">{job.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-white/60">
                        <span className="mt-2 h-1 w-3 shrink-0 bg-netflix-red" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  {job.current && (
                    <div className="mt-8">
                      <div className="h-1 w-full overflow-hidden rounded bg-white/15">
                        <div className="h-full w-1/3 bg-netflix-red" />
                      </div>
                      <p className="mt-2 text-xs text-white/40">Season in progress &middot; more episodes coming soon</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
