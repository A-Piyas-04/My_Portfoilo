'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import SkillCard from './SkillCard'

// Icon mapping for all skills
const skillIcons = {
  'JavaScript': 'JS',
  'TypeScript': 'TS',
  'Python': '🐍',
  'Java': '☕',
  'C++': 'C++',
  'React': '⚛️',
  'Next.js': '▲',
  'Node.js': '🟢',
  'Express': '🚂',
  'Vue.js': '💚',
  'MongoDB': '🍃',
  'PostgreSQL': '🐘',
  'MySQL': '🗄️',
  'Redis': '🔴',
  'Git': '📦',
  'Docker': '🐳',
  'AWS': '☁️',
  'CI/CD': '🔄',
  'Linux': '🐧',
  'n8n': '🔗',
  'Problem Solving': '💡',
  'Team Collaboration': '🤝',
  'Communication': '💬',
  'Time Management': '⏰',
  'Adaptability': '🔄',
}

const skillCategories = {
  Languages: [
    { name: 'JavaScript', level: 90, icon: skillIcons['JavaScript'] },
    { name: 'TypeScript', level: 85, icon: skillIcons['TypeScript'] },
    { name: 'Python', level: 80, icon: skillIcons['Python'] },
    { name: 'Java', level: 75, icon: skillIcons['Java'] },
    { name: 'C++', level: 70, icon: skillIcons['C++'] },
  ],
  Frameworks: [
    { name: 'React', level: 95, icon: skillIcons['React'] },
    { name: 'Next.js', level: 90, icon: skillIcons['Next.js'] },
    { name: 'Node.js', level: 85, icon: skillIcons['Node.js'] },
    { name: 'Express', level: 85, icon: skillIcons['Express'] },
    { name: 'Vue.js', level: 75, icon: skillIcons['Vue.js'] },
  ],
  Databases: [
    { name: 'MongoDB', level: 85, icon: skillIcons['MongoDB'] },
    { name: 'PostgreSQL', level: 80, icon: skillIcons['PostgreSQL'] },
    { name: 'MySQL', level: 75, icon: skillIcons['MySQL'] },
    { name: 'Redis', level: 70, icon: skillIcons['Redis'] },
  ],
  'Tools & Platforms': [
    { name: 'Git', level: 90, icon: skillIcons['Git'] },
    { name: 'Docker', level: 80, icon: skillIcons['Docker'] },
    { name: 'AWS', level: 75, icon: skillIcons['AWS'] },
    { name: 'CI/CD', level: 75, icon: skillIcons['CI/CD'] },
    { name: 'Linux', level: 80, icon: skillIcons['Linux'] },
    { name: 'n8n', level: 85, icon: skillIcons['n8n'] },
  ],
  'Soft Skills': [
    { name: 'Problem Solving', icon: skillIcons['Problem Solving'] },
    { name: 'Team Collaboration', icon: skillIcons['Team Collaboration'] },
    { name: 'Communication', icon: skillIcons['Communication'] },
    { name: 'Time Management', icon: skillIcons['Time Management'] },
    { name: 'Adaptability', icon: skillIcons['Adaptability'] },
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
