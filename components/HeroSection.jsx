'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroSection() {
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

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 pt-20"
    >
      {/* New background animation - Wave pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated wave layers */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(99, 102, 241, 0.1) 2px,
                rgba(99, 102, 241, 0.1) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(139, 92, 246, 0.1) 2px,
                rgba(139, 92, 246, 0.1) 4px
              )
            `,
            y: scrollY * 0.2,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Circular gradient orbs */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 400 + i * 100,
              height: 400 + i * 100,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
              background: `radial-gradient(circle, rgba(${99 + i * 20}, ${102 + i * 10}, ${241 - i * 20}, 0.15) 0%, transparent 70%)`,
              y: scrollY * (0.1 + i * 0.05),
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
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
                href="/images/Ahnaf_Shahriar_Pias_Resume.pdf"
                download="Ahnaf_Shahriar_Pias_Resume.pdf"
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

          {/* Profile Image - No animations */}
          <div className="relative">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
