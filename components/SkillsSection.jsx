'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'

const skillCategories = {
  Languages: [
    { name: 'JavaScript', iconPath: '/images/skills/javascript.svg' },
    { name: 'TypeScript', iconPath: '/images/skills/typescript.svg' },
    { name: 'Python', iconPath: '/images/skills/python.svg' },
    { name: 'Java', iconPath: '/images/skills/java.svg' },
    { name: 'C++', iconPath: '/images/skills/cpp.svg' },
  ],
  Frameworks: [
    { name: 'React', iconPath: '/images/skills/react.svg' },
    { name: 'Next.js', iconPath: '/images/skills/nextjs.svg' },
    { name: 'Node.js', iconPath: '/images/skills/nodejs.svg' },
    { name: 'Express', iconPath: '/images/skills/express.svg' },
    { name: 'Vue.js', iconPath: '/images/skills/vue.svg' },
    { name: 'FastAPI', iconPath: '/images/skills/FastAPI.svg' },
  ],
  Databases: [
    { name: 'MongoDB', iconPath: '/images/skills/mongodb.svg' },
    { name: 'PostgreSQL', iconPath: '/images/skills/postgresql.svg' },
    { name: 'MySQL', iconPath: '/images/skills/mysql.svg' },
    { name: 'Redis', iconPath: '/images/skills/redis.svg' },
  ],
  'Tools & Platforms': [
    { name: 'Git', iconPath: '/images/skills/git.svg' },
    { name: 'Docker', iconPath: '/images/skills/docker.svg' },
    { name: 'n8n', iconPath: '/images/skills/n8n.svg' },
    { name: 'Firebase', iconPath: '/images/skills/Firebase.svg' },
    { name: 'Vite', iconPath: '/images/skills/Vite.js.svg' },
  ],
  'Soft Skills': [
    { name: 'Problem Solving', icon: '💡' },
    { name: 'Team Collaboration', icon: '🤝' },
    { name: 'Communication', icon: '💬' },
    { name: 'Time Management', icon: '⏰' },
    { name: 'Adaptability', icon: '🔄' },
  ],
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Skills & Expertise"
            subtitle="Technologies and skills I bring to every project"
            center
          />
        </motion.div>

        <div className="space-y-16 mt-12">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
