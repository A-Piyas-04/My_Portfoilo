'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 96 // Navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-indigo-500/20'
          : 'bg-slate-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 md:h-24">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1, rotate: 48, transition: { duration: 0.24 } }}
              whileTap={{ scale: 1.1, transition: { duration: 0.15 } }}
              className="relative"
            >
              <div className="w-12 h-12 relative rounded-full overflow-hidden shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/30 logo-glow">
                <Image
                  src="/images/logo.gif"
                  alt="Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Animated glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-30 blur-sm"
                animate={{ 
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.1, 0.15, 0.15],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Inner glow */}
              {/* <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              /> */}
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => {
              const sectionId = link.href.substring(1)
              const isActive = activeSection === sectionId
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm'
                    }`}
                    whileHover={!isActive ? { 
                      backgroundColor: 'rgba(30, 41, 59, 0.8)',
                      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)'
                    } : {}}
                  >
                    {link.name}
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.div>
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-all duration-300"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-indigo-500/20"
          >
            <div className="container-custom py-6 space-y-3">
              {navLinks.map((link, index) => {
                const sectionId = link.href.substring(1)
                const isActive = activeSection === sectionId
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                      whileHover={!isActive ? { 
                        x: 8,
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)'
                      } : { x: 8 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        <motion.svg
                          className="w-5 h-5 opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </div>
                    </motion.div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
