'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import SkillCard from '@/components/SkillCard'

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

export default function Skills() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <SectionHeader
              title="Skills & Expertise"
              subtitle="Technologies and skills I bring to every project"
              center
            />
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom space-y-16">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
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
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

