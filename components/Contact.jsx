'use client'

import { useRef, useState } from 'react'
import { profile, socials } from '@/data/portfolio'
import { useReveal } from '@/lib/useReveal'
import SocialIcon from './SocialIcon'

export default function Contact() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  useReveal(ref)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden border-t-8 border-[#232323] bg-netflix-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(229,9,20,0.45),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #E50914, transparent)' }}
      />

      <div className="container-custom relative section-padding text-center">
        <p className="reveal eyebrow mb-4">Final Episode &nbsp;|&nbsp; Let&apos;s Connect</p>
        <h2 className="reveal mx-auto max-w-4xl text-4xl md:text-6xl font-black leading-tight">
          Unlimited ideas, projects, and collaborations.
        </h2>
        <p className="reveal mt-4 text-lg md:text-2xl text-white/80">Starts with a hello. Reply anytime.</p>
        <p className="reveal mt-8 text-base md:text-lg text-white/70">
          Ready to build? Copy my email to start your next project together.
        </p>

        <div className="reveal mx-auto mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center rounded-md border border-white/30 bg-black/50 px-4 py-4 text-left backdrop-blur">
            <div className="min-w-0">
              <p className="text-[11px] text-white/50">Email address</p>
              <p className="truncate text-base text-white">{profile.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className={`btn-netflix-red !px-7 text-xl md:text-2xl ${copied ? '!bg-[#2ea043]' : ''}`}
          >
            {copied ? 'Copied!' : 'Get Started'}
            {!copied && (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group relative overflow-hidden rounded-lg border border-white/10 bg-netflix-card/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/70 hover:bg-[#1f1f1f]"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-netflix-red transition-transform duration-300 group-hover:scale-x-100" />
              <span className="text-white/70 transition-colors group-hover:text-netflix-red">
                <SocialIcon name={s.name} className="h-7 w-7" />
              </span>
              <p className="mt-4 font-bold">{s.name}</p>
              <p className="text-xs text-white/50">{s.description}</p>
            </a>
          ))}
        </div>

        <a href={profile.resume} download={profile.resumeFileName} className="reveal mt-10 inline-flex items-center gap-2 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download the full script (Resume PDF)
        </a>
      </div>
    </section>
  )
}
