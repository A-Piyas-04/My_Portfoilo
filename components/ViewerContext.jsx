'use client'

import { createContext, useContext } from 'react'
import { viewerProfiles } from '@/data/portfolio'

export const ViewerContext = createContext({
  viewer: viewerProfiles[0],
  switchProfile: () => {},
})

export function useViewer() {
  return useContext(ViewerContext)
}
