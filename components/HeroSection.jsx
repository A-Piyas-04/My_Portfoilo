'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {

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

  const name = "AHNAF SHAHRIAR PIAS"
  const nameWords = name.split(' ')

  // Geometric shapes for background - More shapes with increased visibility
  const geometricShapes = [
    // Hexagons
    { type: 'hexagon', x: '10%', y: '20%', size: 120, delay: 0 },
    { type: 'hexagon', x: '90%', y: '75%', size: 100, delay: 1.5 },
    { type: 'hexagon', x: '5%', y: '50%', size: 90, delay: 2 },
    { type: 'hexagon', x: '95%', y: '30%', size: 110, delay: 0.8 },
    { type: 'hexagon', x: '75%', y: '85%', size: 85, delay: 2.5 },
    
    // Triangles
    { type: 'triangle', x: '85%', y: '15%', size: 100, delay: 0.5 },
    { type: 'triangle', x: '20%', y: '10%', size: 80, delay: 1.2 },
    { type: 'triangle', x: '80%', y: '60%', size: 95, delay: 1.8 },
    { type: 'triangle', x: '30%', y: '90%', size: 75, delay: 2.2 },
    
    // Circles
    { type: 'circle', x: '15%', y: '70%', size: 80, delay: 1 },
    { type: 'circle', x: '70%', y: '25%', size: 70, delay: 1.5 },
    { type: 'circle', x: '50%', y: '80%', size: 90, delay: 0.7 },
    { type: 'circle', x: '25%', y: '35%', size: 65, delay: 2.3 },
    { type: 'circle', x: '60%', y: '5%', size: 75, delay: 1.3 },
    
    // Lines
    { type: 'line', x: '50%', y: '10%', width: 200, delay: 0.3 },
    { type: 'line', x: '5%', y: '50%', width: 150, delay: 0.8 },
    { type: 'line', x: '95%', y: '50%', width: 180, delay: 1.2 },
    { type: 'line', x: '20%', y: '90%', width: 160, delay: 1.7 },
    { type: 'line', x: '80%', y: '5%', width: 140, delay: 2.1 },
  ]

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Subtle glassmorphism background */}
      <div className="absolute inset-0 z-0">
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

      {/* Futuristic Geometric Shapes - Increased visibility and quantity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Hexagons */}
        {geometricShapes.filter(s => s.type === 'hexagon').map((shape, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.4, 0.5, 0.4],
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              delay: shape.delay,
            }}
          >
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" className="text-indigo-400/50">
              <polygon
                points="50,5 90,25 90,75 50,95 10,75 10,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        ))}

        {/* Triangles */}
        {geometricShapes.filter(s => s.type === 'triangle').map((shape, i) => (
          <motion.div
            key={`tri-${i}`}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.35, 0.45, 0.35],
              rotate: [0, -360],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              delay: shape.delay,
            }}
          >
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" className="text-purple-400/50">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        ))}

        {/* Circles */}
        {geometricShapes.filter(s => s.type === 'circle').map((shape, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border-2 border-indigo-400/40"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ 
              opacity: [0.3, 0.45, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: shape.delay,
            }}
          />
        ))}

        {/* Lines */}
        {geometricShapes.filter(s => s.type === 'line').map((shape, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.width,
              height: '2px',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: shape.delay,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Professions - Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <motion.p
                className="text-indigo-400/80 font-medium text-sm md:text-base tracking-wider uppercase mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I Am A
              </motion.p>
              
              <div className="space-y-4">
                {['Full-Stack Software Developer', 'Automation Developer', 'Tech enthusiast'].map((profession, index) => (
                  <motion.div
                    key={profession}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                    className="group"
                  >
                    <h3 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 italic"
                      style={{ fontFamily: 'var(--font-playfair), "Georgia", serif' }}
                    >
                      {profession}
                    </h3>
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mt-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image - Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full" style={{ transform: 'scale(1.6)', transformOrigin: 'center' }}>
              <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-md rounded-2xl overflow-hidden">
                <Image
                  src="/images/dp.jpg"
                  alt="Ahnaf Shahriar Pias"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Name - Right Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-right space-y-6 order-3"
          >
            {/* Greeting - Subtle fade in */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <motion.p
                className="text-indigo-400/80 font-medium text-sm md:text-base tracking-wider uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hello, I&apos;m
              </motion.p>
            </motion.div>

            {/* Name - Reduced size with unique font */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{ fontFamily: '"Consolas", "Courier New", monospace' }}
              variants={itemVariants}
            >
              <span className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-end">
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
                          style={{ transformOrigin: 'right' }}
                        />
                      </span>
                    ) : (
                      <span className="text-white">{word}</span>
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Tagline - Fade in */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Crafting elegant solutions to complex problems. Passionate about innovative web development and exceptional user experiences.
            </motion.p>

            {/* CTA Buttons - Elegant design */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end pt-4"
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
        </div>
      </div>
    </section>
  )
}
