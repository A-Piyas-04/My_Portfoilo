'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Task Manager Pro',
    description:
      'A comprehensive task management application with real-time collaboration features. Built with React and Node.js, featuring drag-and-drop functionality, team workspaces, and advanced filtering options.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    githubUrl: 'https://github.com',
    liveUrl: null,
    image: null,
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce frontend with shopping cart, payment integration, and product management. Features include user authentication, product search, and responsive design optimized for all devices.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: null,
  },
  {
    title: 'API Dashboard',
    description:
      'A powerful API monitoring and analytics dashboard. Provides real-time metrics, request logging, and performance insights. Built for developers to track and optimize their API usage.',
    techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'],
    githubUrl: 'https://github.com',
    liveUrl: null,
    image: null,
  },
  {
    title: 'Landing Page UI',
    description:
      'A beautiful, conversion-optimized landing page template. Features smooth animations, modern design patterns, and SEO optimization. Perfect for startups and businesses looking to make a strong first impression.',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: null,
  },
  {
    title: 'Full-Stack MERN App',
    description:
      'A complete full-stack application demonstrating MERN stack capabilities. Includes user authentication, CRUD operations, file uploads, and real-time updates. Showcases best practices in modern web development.',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    githubUrl: 'https://github.com',
    liveUrl: null,
    image: null,
  },
  {
    title: 'Developer Portfolio',
    description:
      'A responsive portfolio website showcasing projects, skills, and experience. Built with Next.js and Tailwind CSS, featuring smooth animations and optimized performance.',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com',
    liveUrl: null,
    image: null,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-gray-900">
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
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

