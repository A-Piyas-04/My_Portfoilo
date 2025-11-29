'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="About Me"
            subtitle="Passionate about creating digital experiences that make a difference"
            center
          />
        </motion.div>

        {/* Biography Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mt-12"
        >
          <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              I&apos;m a dedicated Software Developer with a passion for crafting elegant
              solutions to complex problems. My journey in software development began
              with a curiosity about how things work, which has evolved into a career
              focused on building innovative web applications.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              I specialize in modern web technologies and enjoy working across the
              full stack. Whether it&apos;s designing intuitive user interfaces or
              architecting robust backend systems, I bring attention to detail and
              a commitment to excellence to every project.
            </p>
            <p className="text-lg text-gray-300">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community.
            </p>
          </motion.div>
        </motion.div>

        {/* Academic Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <SectionHeader
            title="Academic Background"
            subtitle="Educational foundation and achievements"
            center
          />
          <div className="max-w-4xl mx-auto mt-12 space-y-8">
            {/* University Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-slate-800/50 to-indigo-900/30 border-indigo-500/30"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">🎓</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Islamic University of Technology (IUT) , Bangladesh
                  </h3>
                  <p className="text-indigo-300 font-medium mb-3">
                    Bachelor of Science in &quot;Software Engineering&quot;
                  </p>
                  <p className="text-gray-400 mb-4">
                    Department of Computer Science and Engineering
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">

                    <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                      <span className="text-gray-300">Status: </span>
                      <span className="text-green-400 font-semibold">Undergraduate</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-gray-400 text-sm leading-relaxed">
                  International university established under the Organization of Islamic Cooperation (OIC),
                  focusing on engineering and technology excellence.
                </p>
              </div>
            </motion.div>

            {/* College Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card bg-gradient-to-br from-slate-800/50 to-green-900/30 border-green-500/30"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">📚</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Notre Dame College
                  </h3>
                  <p className="text-green-300 font-medium mb-3">
                    Higher Secondary Certificate (HSC)
                  </p>
                  <p className="text-gray-400 mb-4">
                    Dhaka, Bangladesh
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">

                    <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                      <span className="text-gray-300">Status: </span>
                      <span className="text-blue-400 font-semibold">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <SectionHeader
            title="My Strengths"
            subtitle="What drives me and makes me unique"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card text-center bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/30"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Problem Solving</h3>
              <p className="text-gray-400">
                I thrive on tackling complex challenges and finding innovative solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card text-center bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/30"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Learner</h3>
              <p className="text-gray-400">
                Quick to adapt to new technologies and frameworks, always staying current.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card text-center bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/30"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Team Player</h3>
              <p className="text-gray-400">
                Excellent at collaborating and communicating with cross-functional teams.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
