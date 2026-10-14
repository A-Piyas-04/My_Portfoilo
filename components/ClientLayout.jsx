'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './Preloader'
import ProfileGate from './ProfileGate'
import CustomCursor from './CustomCursor'
import SmoothScroll from './SmoothScroll'
import { ViewerContext } from './ViewerContext'
import { viewerProfiles } from '@/data/portfolio'

const STORAGE_KEY = 'portfolio-viewer'

export default function ClientLayout({ children }) {
  const [stage, setStage] = useState('loading')
  const [viewer, setViewer] = useState(viewerProfiles[0])
  const siteRef = useRef(null)

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    const match = viewerProfiles.find((p) => p.id === saved)
    if (match) setViewer(match)
  }, [])

  useEffect(() => {
    if (stage !== 'ready' || !siteRef.current) return
    window.scrollTo(0, 0)
    const tween = gsap.fromTo(
      siteRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out', onComplete: () => ScrollTrigger.refresh() }
    )
    return () => tween.kill()
  }, [stage])

  const handleLoaded = useCallback(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    setStage(viewerProfiles.some((p) => p.id === saved) ? 'ready' : 'gate')
  }, [])

  const handleSelect = useCallback((p) => {
    sessionStorage.setItem(STORAGE_KEY, p.id)
    setViewer(p)
    setStage('ready')
  }, [])

  const switchProfile = useCallback(() => setStage('gate'), [])

  const value = useMemo(() => ({ viewer, switchProfile }), [viewer, switchProfile])

  return (
    <ViewerContext.Provider value={value}>
      <CustomCursor />
      {stage === 'loading' && <Preloader onComplete={handleLoaded} />}
      {stage === 'gate' && <ProfileGate onSelect={handleSelect} />}
      {stage === 'ready' && (
        <div ref={siteRef} style={{ opacity: 0 }}>
          <SmoothScroll />
          <div className="film-grain" aria-hidden="true" />
          {children}
        </div>
      )}
    </ViewerContext.Provider>
  )
}
