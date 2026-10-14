'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Preloader from './Preloader'
import ProfileGate from './ProfileGate'
import CustomCursor from './CustomCursor'
import { ViewerContext } from './ViewerContext'
import { viewerProfiles } from '@/data/portfolio'

const STORAGE_KEY = 'portfolio-viewer'

export default function ClientLayout({ children }) {
  const [stage, setStage] = useState('loading')
  const [viewer, setViewer] = useState(viewerProfiles[0])

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    const match = viewerProfiles.find((p) => p.id === saved)
    if (match) setViewer(match)
  }, [])

  const handleLoaded = useCallback(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    setStage(viewerProfiles.some((p) => p.id === saved) ? 'ready' : 'gate')
  }, [])

  const handleSelect = useCallback((p) => {
    sessionStorage.setItem(STORAGE_KEY, p.id)
    setViewer(p)
    setStage('ready')
    window.scrollTo(0, 0)
  }, [])

  const switchProfile = useCallback(() => setStage('gate'), [])

  const value = useMemo(() => ({ viewer, switchProfile }), [viewer, switchProfile])

  return (
    <ViewerContext.Provider value={value}>
      {stage === 'loading' && <Preloader onComplete={handleLoaded} />}
      {stage === 'gate' && <ProfileGate onSelect={handleSelect} />}
      {stage === 'ready' && (
        <>
          <CustomCursor />
          <div className="film-grain" aria-hidden="true" />
          {children}
        </>
      )}
    </ViewerContext.Provider>
  )
}
