'use client'

import { motion } from 'framer-motion'

export default function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="card text-center group"
    >
      {/* Icon */}
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
          {skill.icon ? (
            <span className="text-3xl">{skill.icon}</span>
          ) : (
            <span className="text-2xl font-bold text-primary-600">
              {skill.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>

      {/* Skill Level (optional) */}
      {skill.level && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="bg-primary-600 h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{skill.level}%</p>
        </div>
      )}
    </motion.div>
  )
}

