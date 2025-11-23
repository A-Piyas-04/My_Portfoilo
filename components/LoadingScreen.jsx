'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('')
  
  useEffect(() => {
    const loadingTexts = [
      'INITIALIZING SYSTEM...',
      'LOADING NEURAL NETWORKS...',
      'ESTABLISHING CONNECTION...',
      'ACCESSING MAINFRAME...',
      'DECRYPTING DATA...',
      'SYSTEM READY'
    ]
    const duration = 3300 // 3.3 seconds
    const interval = 50 // Update every 50ms
    const steps = duration / interval
    const increment = 100 / steps

    let currentStep = 0
    let textIndex = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(currentStep * increment, 100)
      setProgress(newProgress)

      // Change text at different progress points
      const textProgress = Math.floor((newProgress / 100) * loadingTexts.length)
      if (textProgress !== textIndex && textProgress < loadingTexts.length) {
        textIndex = textProgress
        setCurrentText(loadingTexts[textIndex])
      }

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1920 1080">
        {/* Horizontal Lines */}
        <motion.line
          x1="0" y1="200" x2="1920" y2="200"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.line
          x1="0" y1="400" x2="1920" y2="400"
          stroke="url(#gradient2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.line
          x1="0" y1="600" x2="1920" y2="600"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Vertical Lines */}
        <motion.line
          x1="300" y1="0" x2="300" y2="1080"
          stroke="url(#gradient3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.line
          x1="800" y1="0" x2="800" y2="1080"
          stroke="url(#gradient2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.line
          x1="1400" y1="0" x2="1400" y2="1080"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.8)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Central Logo/Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-24 h-24 mx-auto">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-cyan-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 border-2 border-purple-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Core */}
            <motion.div
              className="absolute inset-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Glowing Effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.h1
            className="text-3xl font-bold text-cyan-400 mb-2 font-mono tracking-wider"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(0, 255, 255, 0.5)",
                "0 0 20px rgba(0, 255, 255, 0.8)",
                "0 0 10px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AHNAF SHAHRIAR PIAS
          </motion.h1>
          <motion.p
            className="text-purple-400 font-mono text-sm tracking-widest"
            key={currentText}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentText}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-80 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {/* Progress Bar Container */}
          <div className="relative h-2 bg-gray-800 rounded-full border border-cyan-400/30 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10" />
            
            {/* Progress Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Animated Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between mt-2 text-xs font-mono">
            <span className="text-cyan-400">LOADING</span>
            <span className="text-purple-400">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: ['0vh', '100vh'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{ y: ['100vh', '0vh'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
