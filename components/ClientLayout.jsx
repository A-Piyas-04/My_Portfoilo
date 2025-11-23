'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <div key="content">
          {children}
        </div>
      )}
    </>
  )
}
