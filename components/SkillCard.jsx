'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="card text-center group"
    >
      {/* Icon - SVG Logo */}
      <div className="mb-4 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center group-hover:from-indigo-800 group-hover:to-purple-800 transition-colors border border-indigo-700/50 p-4">
          {skill.iconPath ? (
            <Image
              src={skill.iconPath}
              alt={skill.name}
              width={56}
              height={56}
              className="object-contain"
            />
          ) : skill.icon ? (
            <span className="text-4xl">{skill.icon}</span>
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {skill.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
    </motion.div>
  )
}
