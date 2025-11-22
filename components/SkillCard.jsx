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
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center group-hover:from-indigo-800 group-hover:to-purple-800 transition-colors border border-indigo-700/50 p-3">
          {skill.iconPath ? (
            <Image
              src={skill.iconPath}
              alt={skill.name}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : skill.icon ? (
            <span className="text-3xl">{skill.icon}</span>
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {skill.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>

      {/* Skill Level (optional) */}
      {skill.level && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{skill.level}%</p>
        </div>
      )}
    </motion.div>
  )
}
