'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig)
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseXRelative = (e.clientX - rect.left) / width - 0.5
      const mouseYRelative = (e.clientY - rect.top) / height - 0.5
      mouseX.set(mouseXRelative)
      mouseY.set(mouseYRelative)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Advanced text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const name = "Ahnaf Shahriar Pias"
  const nameParts = name.split(' ')

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 pt-20"
    >
      {/* Parallax background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient with parallax */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
            y: scrollY * 0.3,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Floating particles with parallax */}
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: scrollY * (0.1 + Math.random() * 0.2),
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          y: scrollY * 0.1,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Greeting with typing effect */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.span
                className="text-indigo-400 font-semibold text-lg md:text-xl inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Hello, I&apos;m
              </motion.span>
              <motion.span
                className="inline-block ml-2 text-purple-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
              >
                |
              </motion.span>
            </motion.div>

            {/* Advanced Animated Name with 3D effect - Reduced glow */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-tight"
              style={{ perspective: '1000px' }}
            >
              <span className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                {nameParts.map((part, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block relative"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 15px rgba(99, 102, 241, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {index === nameParts.length - 1 ? (
                      <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {part}
                      </span>
                    ) : (
                      <span className="text-white">{part}</span>
                    )}
                    {/* Reduced glow effect */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Title with animated underline */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Software Developer
                <motion.span
                  className="block h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
              </motion.h2>
            </motion.div>

            {/* Tagline with fade-in */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting elegant solutions to complex problems. Passionate about building
              innovative web applications and delivering exceptional user experiences.
            </motion.p>

            {/* CTA Button with glow effect */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="/cv.pdf"
                download
                className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.a>
            </motion.div>

            {/* Scroll Indicator with enhanced animation */}
            <motion.div
              variants={itemVariants}
              className="mt-20"
            >
              <motion.a
                href="#about"
                className="flex flex-col items-center text-gray-400 hover:text-indigo-400 transition-colors group"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-sm mb-2 group-hover:text-indigo-400 transition-colors">Scroll to explore</span>
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ x, y, transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl">
              {/* Profile Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/dp.jpg"
                  alt="Ahnaf Shahriar Pias"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
              </div>
              
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.5) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Floating orbs */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-2xl pointer-events-none"
                  style={{
                    width: 100 + i * 50,
                    height: 100 + i * 50,
                    left: `${20 + i * 20}%`,
                    top: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
