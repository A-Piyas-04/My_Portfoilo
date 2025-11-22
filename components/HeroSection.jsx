'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  // Text reveal for name
  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.4,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const name = "Ahnaf Shahriar Pias"
  const nameWords = name.split(' ')

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Subtle glassmorphism background */}
      <div className="absolute inset-0">
        {/* Base gradient - softer and more subtle */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #0f172a 100%)',
          }}
        />
        
        {/* Subtle animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
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

        {/* Glassmorphism effect - subtle blur overlay */}
        <div 
          className="absolute inset-0 backdrop-blur-[1px]"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.2) 100%)',
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-8"
          >
            {/* Greeting - Subtle fade in */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <motion.p
                className="text-indigo-400/80 font-medium text-sm md:text-base tracking-wider uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hello, I&apos;m
              </motion.p>
            </motion.div>

            {/* Name - Text reveal animation */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight"
              variants={itemVariants}
            >
              <span className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                {nameWords.map((word, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={nameVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {index === nameWords.length - 1 ? (
                      <span className="relative">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                          {word}
                        </span>
                        {/* Glowing underline */}
                        <motion.span
                          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 1.2, ease: 'easeOut' }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </span>
                    ) : (
                      <span className="text-white">{word}</span>
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle - Slide up with fade */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Software Developer
              </motion.h2>
            </motion.div>

            {/* Tagline - Fade in */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Crafting elegant solutions to complex problems. Passionate about innovative web development and exceptional user experiences.
            </motion.p>

            {/* CTA Buttons - Elegant design */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              {/* Download CV Button - Primary */}
              <motion.a
                href="/images/Ahnaf_Shahriar_Pias_Resume.pdf"
                download="Ahnaf_Shahriar_Pias_Resume.pdf"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </motion.svg>
                </span>
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.a>

              {/* Hire Me Button - Secondary */}
              <motion.a
                href="#contact"
                className="group px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-200 font-semibold rounded-xl hover:bg-slate-800/70 hover:border-indigo-500/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Hire Me
                  <motion.svg
                    className="w-5 h-5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Scroll Indicator - Subtle */}
            <motion.div
              variants={itemVariants}
              className="pt-12"
            >
              <motion.a
                href="#about"
                className="flex flex-col items-center text-slate-500 hover:text-indigo-400 transition-colors group"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-xs mb-2 tracking-wider uppercase">Scroll to explore</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 4, 0] }}
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

          {/* Profile Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Refined Image Card with glassmorphism */}
            <div className="relative w-full max-w-md">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50" />
              
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm shadow-2xl">
                {/* Profile Image */}
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/dp.jpg"
                    alt="Ahnaf Shahriar Pias"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
