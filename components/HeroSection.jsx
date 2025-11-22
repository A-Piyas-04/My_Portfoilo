'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Animated text variants for name
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  const name = "Ahnaf Shahriar Pias"
  const nameParts = name.split(' ')

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-primary-400 font-semibold mb-4 text-lg"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Animated Name */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              variants={itemVariants}
            >
              <span className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {nameParts.map((part, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {index === nameParts.length - 1 ? (
                      <span className="text-primary-400">{part}</span>
                    ) : (
                      <span className="text-white">{part}</span>
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Title with typing effect */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              Software Developer
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Crafting elegant solutions to complex problems. Passionate about building
              innovative web applications and delivering exceptional user experiences.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
                href="/cv.pdf"
                download
                className="btn-secondary border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-20"
            >
              <motion.a
                href="#about"
                className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 z-10" />
              
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                    ASP
                  </div>
                  <p className="text-gray-300 text-sm">Your Photo Here</p>
                </div>
              </div>

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
