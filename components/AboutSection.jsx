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
          <div className="max-w-4xl mx-auto mt-12">
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
                    Islamic University of Technology (IUT)
                  </h3>
                  <p className="text-indigo-300 font-medium mb-3">
                    Bachelor of Science in Software Engineering
                  </p>
                  <p className="text-gray-400 mb-4">
                    Department of Computer Science and Engineering
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                      <span className="text-gray-300">CGPA: </span>
                      <span className="text-indigo-300 font-semibold">3.87</span>
                    </div>
                    <div className="bg-slate-700/50 px-3 py-1 rounded-full">
                      <span className="text-gray-300">Status: </span>
                      <span className="text-green-400 font-semibold">Undergraduate</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <strong className="text-indigo-300">About IUT:</strong> The Islamic University of Technology is an international university 
                  established under the auspices of the Organization of Islamic Cooperation (OIC). 
                  It serves as a center of excellence in engineering, technology, and applied sciences, 
                  fostering innovation and research across the Islamic world.
                </p>
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
              <div className="text-4xl mb-4">💡</div>
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
              <div className="text-4xl mb-4">🚀</div>
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
              <div className="text-4xl mb-4">🤝</div>
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
