'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { profile, education, strengths } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'

export default function About() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section ref={ref} id="about" className="section-padding relative overflow-hidden bg-netflix-black">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-netflix-red/10 blur-[140px]" />

      <div className="container-custom relative">
        <div className="reveal mb-14 flex flex-col gap-3">
          <p className="eyebrow">Episode 01 &nbsp;|&nbsp; Synopsis</p>
          <h2 className="section-title">
            The Director&apos;s <span className="text-netflix-red">Cut</span>
          </h2>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal relative isolate mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#2a0205] via-netflix-dark to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(229,9,20,0.45),transparent_60%)]" />
              <Image
                src={profile.photos.secondary}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 90vw, 450px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl tracking-wide">{profile.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">Starring</p>
                </div>
                <span className="rounded-sm border border-white/30 px-2 py-0.5 text-[10px] font-bold tracking-widest text-white/70">4K</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg border border-netflix-red/40" />
          </div>

          <div>
            <div className="space-y-5">
              {profile.bio.map((p, i) => (
                <p key={i} className="reveal text-base md:text-lg leading-relaxed text-white/75">
                  {p}
                </p>
              ))}
            </div>

            <div className="reveal mt-8 text-sm">
              <span className="text-white/50">Genres: </span>
              {strengths.map((s, i) => (
                <span key={s.title} className="text-white">
                  {s.title}
                  {i < strengths.length - 1 && <span className="mx-2 text-netflix-red">&bull;</span>}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {strengths.map((s) => (
                <div
                  key={s.title}
                  className="reveal group rounded-md border border-white/10 bg-netflix-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/60"
                >
                  <div className="mb-3 h-1 w-8 bg-netflix-red transition-all duration-300 group-hover:w-14" />
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="reveal mb-6 flex items-end justify-between border-b border-white/10 pb-4">
            <h3 className="text-2xl md:text-3xl font-bold">Episodes</h3>
            <span className="rounded-sm border border-white/20 bg-netflix-card px-3 py-1.5 text-sm text-white/80">
              Academic Background
            </span>
          </div>

          <ol className="divide-y divide-white/10">
            {[...education].reverse().map((ed, i) => (
              <li
                key={ed.institution}
                className="reveal group grid grid-cols-[auto_1fr] items-center gap-4 rounded-md px-2 py-6 transition-colors hover:bg-white/[0.04] md:grid-cols-[3rem_10rem_1fr] md:gap-6 md:px-4"
              >
                <span className="hidden md:block text-3xl font-light text-white/40">{education.length - i}</span>
                <div className="relative h-20 w-32 md:h-24 md:w-40 overflow-hidden rounded bg-gradient-to-br from-netflix-deep to-black">
                  <span className="absolute inset-0 flex items-center justify-center font-display text-4xl text-white/90">
                    {ed.season.replace('Season ', 'S0')}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg className="h-10 w-10 rounded-full border-2 border-white p-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4v16l14-8z" />
                    </svg>
                  </span>
                  {ed.status !== 'Completed' && <span className="absolute bottom-0 left-0 h-1 w-2/3 bg-netflix-red" />}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-bold text-white">{ed.institution}</h4>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        ed.status === 'Completed' ? 'text-white/50' : 'text-[#46d369]'
                      }`}
                    >
                      {ed.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-netflix-red">{ed.degree}</p>
                  <p className="mt-1 text-sm text-white/55">
                    {ed.detail}
                    {ed.note && <> &mdash; {ed.note}</>}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
