'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.json')
        const data = await response.json()
        setProjects(data.projects)
      } catch (error) {
        console.error('Error loading projects:', error)
        // Fallback to empty array if JSON fails to load
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="My Projects"
            subtitle="A collection of projects I've built and contributed to"
            center
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

