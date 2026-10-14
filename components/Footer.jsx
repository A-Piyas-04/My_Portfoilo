'use client'

import { useState } from 'react'
import { profile, socials } from '@/data/portfolio'
import { scrollToId } from '@/lib/scroll'
import SocialIcon from './SocialIcon'

const columns = [
  [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
  ],
  [
    { name: 'Now Streaming', id: 'experience' },
    { name: 'Capabilities', id: 'expertise' },
  ],
  [
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
  ],
  [{ name: 'Contact', id: 'contact' }],
]

export default function Footer() {
  const [code, setCode] = useState(null)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-netflix-black py-14 text-sm text-white/50">
      <div className="container-custom max-w-5xl">
        <div className="mb-6 flex gap-5">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-white/70 transition-colors hover:text-netflix-red"
            >
              <SocialIcon name={s.name} className="h-6 w-6" />
            </a>
          ))}
        </div>

        <p className="mb-6">
          Questions?{' '}
          <a href={`mailto:${profile.email}`} className="underline hover:text-white">
            {profile.email}
          </a>
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
          {columns.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map((l) => (
                <li key={l.id}>
                  <button type="button" onClick={() => scrollToId(l.id)} className="text-left underline-offset-2 hover:underline">
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCode(Math.random().toString(16).slice(2, 8).toUpperCase())}
          className="mt-8 border border-white/40 px-3 py-1.5 text-xs hover:text-white"
        >
          {code ? `Service Code: ${code}-ML-INTERN` : 'Service Code'}
        </button>

        <p className="mt-6 text-xs">
          &copy; {year} {profile.name}. All rights reserved. Inspired by Netflix, built with Next.js, GSAP and Three.js.
        </p>
      </div>
    </footer>
  )
}
