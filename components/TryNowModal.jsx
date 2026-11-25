'use client'

import { useEffect, useRef } from 'react'
import { getLenis } from '@/lib/scroll'
import TryNowGrid, { usableProjects } from './TryNowGrid'

const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'

export default function TryNowModal({ onClose }) {
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const animationsRef = useRef([])
  const closingRef = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    const trigger = document.activeElement
    const lenis = getLenis()
    const wasStopped = lenis?.isStopped
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    animationsRef.current = [
      dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing }),
      panel.animate(
        [{ transform: reduced ? 'none' : 'scale(0.96)' }, { transform: reduced ? 'none' : 'scale(1)' }],
        { duration: 250, easing }
      ),
    ]
    return () => {
      animationsRef.current.forEach((animation) => animation.cancel())
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (!wasStopped) lenis?.start()
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  const dismiss = () => {
    if (closingRef.current) return
    closingRef.current = true
    const dialog = dialogRef.current
    const panel = panelRef.current
    const opacity = getComputedStyle(dialog).opacity
    const transform = getComputedStyle(panel).transform
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    animationsRef.current.forEach((animation) => animation.cancel())
    const fade = dialog.animate([{ opacity }, { opacity: 0 }], { duration: 250, easing, fill: 'forwards' })
    const scale = panel.animate([{ transform }, { transform: reduced ? 'none' : 'scale(0.96)' }], { duration: 250, easing, fill: 'forwards' })
    animationsRef.current = [fade, scale]
    fade.finished.then(onClose).catch(() => {})
  }

  return (
    <dialog
      ref={dialogRef}
      id="try-now-modal"
      aria-labelledby="try-now-title"
      aria-describedby="try-now-description"
      data-lenis-prevent
      className="try-now-dialog fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-3 text-white sm:p-6"
      onCancel={(event) => { event.preventDefault(); dismiss() }}
      onClick={(event) => { if (event.target === event.currentTarget) dismiss() }}
    >
      <div className="pointer-events-none fixed inset-0 bg-black/85" aria-hidden="true" />
      <div className="relative grid min-h-full place-items-center" onClick={(event) => { if (event.target === event.currentTarget) dismiss() }}>
        <div ref={panelRef} className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-netflix-dark shadow-[0_32px_100px_rgba(0,0,0,0.8)] sm:max-h-[calc(100dvh-3rem)]">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-8">
            <div>
              <p className="mb-2 text-sm font-semibold text-netflix-red">{usableProjects.length} projects ready to explore</p>
              <h2 id="try-now-title" className="font-display text-4xl tracking-wide sm:text-5xl">Try It Right Now</h2>
              <p id="try-now-description" className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">Open a web app, download a desktop tool, or install a plugin. Pick something and give it a try.</p>
            </div>
            <button type="button" autoFocus onClick={dismiss} aria-label="Close usable projects" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8"><TryNowGrid /></div>
        </div>
      </div>
    </dialog>
  )
}
