'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '@/data/portfolio'
import { useViewer } from './ViewerContext'
import { scrollToId } from '@/lib/scroll'

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Now Streaming', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const { viewer, switchProfile } = useViewer()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const current = [...navLinks].reverse().find((l) => {
        const el = document.getElementById(l.id)
        return el && el.getBoundingClientRect().top <= 140
      })
      if (current) setActive(current.id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    setTimeout(() => scrollToId(id), menuOpen ? 150 : 0)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-netflix-black/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <nav className="container-custom flex h-16 md:h-[72px] items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <button type="button" onClick={() => go('home')} className="flex items-center gap-2" aria-label="Home">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-netflix-red/60">
              <Image src={profile.logo} alt="" fill sizes="36px" className="object-cover" unoptimized />
            </span>
            <span className="font-display text-3xl tracking-wider text-netflix-red drop-shadow-[0_0_12px_rgba(229,9,20,0.5)]">
              {profile.shortName}
            </span>
          </button>

          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  className={`text-sm transition-colors ${
                    active === l.id ? 'font-bold text-white' : 'text-white/70 hover:text-white/50'
                  }`}
                >
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }} className="hidden sm:inline-flex btn-netflix-red !px-4 !py-1.5 text-sm">
            Hire Me
          </a>

          <div className="relative hidden md:block" onMouseLeave={() => setProfileOpen(false)}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              onMouseEnter={() => setProfileOpen(true)}
              className="flex items-center gap-2"
              aria-label="Profile menu"
            >
              <span className={`relative block h-8 w-8 overflow-hidden rounded bg-gradient-to-br ${viewer.tint}`}>
                <Image src={viewer.avatar} alt={viewer.label} fill sizes="32px" className="object-cover object-top scale-110" />
              </span>
              <svg className={`h-3 w-3 text-white transition-transform ${profileOpen ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="currentColor">
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full pt-3"
                >
                  <div className="w-52 border border-white/10 bg-black/95 py-3 text-sm">
                    <p className="px-4 pb-2 text-white/50">Watching as <span className="text-white">{viewer.label}</span></p>
                    <button
                      type="button"
                      onClick={() => { setProfileOpen(false); switchProfile() }}
                      className="w-full px-4 py-2 text-left text-white/80 hover:underline"
                    >
                      Switch Profiles
                    </button>
                    <a href={profile.resume} download={profile.resumeFileName} className="block px-4 py-2 text-white/80 hover:underline">
                      Download Resume
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-netflix-black/98"
          >
            <ul className="container-custom py-4">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className={`flex w-full items-center justify-between border-l-4 px-4 py-3 text-left text-base ${
                      active === l.id ? 'border-netflix-red bg-white/5 font-bold text-white' : 'border-transparent text-white/70'
                    }`}
                  >
                    {l.name}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex gap-3 px-4">
                <button type="button" onClick={() => { setMenuOpen(false); switchProfile() }} className="text-sm text-white/60 underline">
                  Switch profile ({viewer.label})
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
