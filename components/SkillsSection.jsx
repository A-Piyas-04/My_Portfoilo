'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'

const skillCategories = {
  Languages: [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Java', level: 75 },
    { name: 'C++', level: 70 },
  ],
  Frameworks: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 85 },
    { name: 'Vue.js', level: 75 },
  ],
  Databases: [
    { name: 'MongoDB', level: 85 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'MySQL', level: 75 },
    { name: 'Redis', level: 70 },
  ],
  'Tools & Platforms': [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'CI/CD', level: 75 },
    { name: 'Linux', level: 80 },
  ],
  'Soft Skills': [
    { name: 'Problem Solving' },
    { name: 'Team Collaboration' },
    { name: 'Communication' },
    { name: 'Time Management' },
    { name: 'Adaptability' },
  ],
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-gray-800">
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

