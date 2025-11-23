'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionHeader from './SectionHeader'

export default function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('ahnafpias@iut-dhaka.edu')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/A-Piyas-04',
      description: 'Check out my code',
      color: 'from-slate-800 to-slate-900',
      hoverColor: 'from-cyan-900/50 to-purple-900/50',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/ah-pias/',
      description: 'Connect professionally',
      color: 'from-slate-800 to-slate-900',
      hoverColor: 'from-cyan-900/50 to-purple-900/50',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/ahnaf_ik2?t=ng3Fjvvcsa0wYBmTVfNNoA&s=07',
      description: 'Chat with me',
      color: 'from-slate-800 to-slate-900',
      hoverColor: 'from-cyan-900/50 to-purple-900/50',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path 
            d="M17.53 2.25H21.03L14.21 10.20L22.18 21.75H15.92L10.89 14.86L5.19 21.75H1.68L8.88 13.25L1.19 2.25H7.61L12.20 8.53L17.53 2.25ZM16.37 19.87H18.12L7.06 4.01H5.19L16.37 19.87Z"
          />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/ahnafshahriar.pias',
      description: 'Follow my updates',
      color: 'from-slate-800 to-slate-900',
      hoverColor: 'from-cyan-900/50 to-purple-900/50',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.675 0h-21.35C.593 0 0 .588 0 1.312v21.377C0 23.412.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.142v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.588 1.324-1.311V1.312C24 .588 23.405 0 22.675 0"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Let's Connect"
            subtitle="Ready to collaborate? Reach out through any of these channels and let's create something amazing together!"
            center
          />
        </motion.div>

        {/* Enhanced Social Links Grid */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Main Card */}
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${social.color} shadow-2xl border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:shadow-3xl`}>
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
                    initial={false}
                  />
                  
                  {/* Neon Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-500"
                    initial={false}
                  />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon Container */}
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-cyan-400 border border-cyan-400/30 group-hover:border-cyan-400/80 group-hover:text-cyan-300 transition-all duration-500"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0px rgba(0, 255, 255, 0)",
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                          "0 0 0px rgba(0, 255, 255, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {social.icon}
                    </motion.div>

                    {/* Platform Name */}
                    <motion.h3 
                      className="text-xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                      animate={{ 
                        textShadow: ["0 0 0px rgba(34, 211, 238, 0)", "0 0 10px rgba(34, 211, 238, 0.8)", "0 0 0px rgba(34, 211, 238, 0)"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {social.name}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {social.description}
                    </p>

                    {/* Animated Arrow */}
                    <motion.div
                      className="mt-4 flex justify-center"
                      animate={{ 
                        x: [0, 4, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg className="w-5 h-5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Floating Particles */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{ 
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                {/* Hover Ring Effect */}
                <motion.div
                  className="absolute -inset-2 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-500"
                  animate={{ 
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xl text-gray-300 mb-6">
            Don&apos;t see your preferred platform? Drop me an email directly!
          </p>
          <motion.button
            onClick={copyEmailToClipboard}
            className={`inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg ${
              emailCopied 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/20' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/20 hover:shadow-indigo-500/30'
            } text-white`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: emailCopied ? '0 20px 40px rgba(34, 197, 94, 0.3)' : '0 20px 40px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {emailCopied ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            {emailCopied ? 'Email Copied!' : 'ahnafpias@iut-dhaka.edu'}
            {!emailCopied && (
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </motion.svg>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

