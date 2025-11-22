'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'

const technologies = [
  { name: 'JavaScript', icon: 'JS' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Git', icon: '📦' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Tailwind CSS', icon: '💨' },
]

const timeline = [
  {
    year: '2024',
    title: 'Software Developer',
    organization: 'Current Position',
    description: 'Building scalable web applications and contributing to innovative projects.',
  },
  {
    year: '2023',
    title: 'Full Stack Developer',
    organization: 'Previous Role',
    description: 'Developed and maintained multiple web applications using modern technologies.',
  },
  {
    year: '2022',
    title: 'Hackathon Winner',
    organization: 'Tech Innovation Challenge',
    description: 'Led a team to build an innovative solution that won first place.',
  },
  {
    year: '2021',
    title: 'Bachelor&apos;s Degree',
    organization: 'Computer Science',
    description: 'Graduated with honors, specializing in software engineering and web development.',
  },
]

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
    <section id="about" className="section-padding bg-gray-800">
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

        {/* Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
              className="card text-center"
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
              className="card text-center"
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
              className="card text-center"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Team Player</h3>
              <p className="text-gray-400">
                Excellent at collaborating and communicating with cross-functional teams.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <SectionHeader
            title="Tools & Technologies"
            subtitle="Technologies I work with"
            center
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
            {technologies.map((tech, index) => (
              <SkillCard key={tech.name} skill={tech} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <SectionHeader
            title="Timeline"
            subtitle="My journey so far"
            center
          />
          <div className="relative mt-12">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-500/30 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary-500 rounded-full border-4 border-gray-800 shadow-lg transform md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                  }`}
                >
                  <div className="card">
                    <div className="text-primary-400 font-bold text-lg mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary-400 font-medium mb-2">
                      {item.organization}
                    </p>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

