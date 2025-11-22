import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import SkillCard from '@/components/SkillCard'

export const metadata = {
  title: 'About Me - Ahnaf Shahriar Pias',
  description: 'Learn about Ahnaf Shahriar Pias, a Software Developer with expertise in modern web technologies and a passion for building innovative solutions.',
}

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
    title: 'Bachelor\'s Degree',
    organization: 'Computer Science',
    description: 'Graduated with honors, specializing in software engineering and web development.',
  },
]

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="About Me"
                subtitle="Passionate about creating digital experiences that make a difference"
                center
              />
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  I&apos;m a dedicated Software Developer with a passion for crafting elegant
                  solutions to complex problems. My journey in software development began
                  with a curiosity about how things work, which has evolved into a career
                  focused on building innovative web applications.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  I specialize in modern web technologies and enjoy working across the
                  full stack. Whether it&apos;s designing intuitive user interfaces or
                  architecting robust backend systems, I bring attention to detail and
                  a commitment to excellence to every project.
                </p>
                <p className="text-lg text-gray-700">
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                  contributing to open-source projects, or sharing knowledge with the
                  developer community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strengths Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              title="My Strengths"
              subtitle="What drives me and makes me unique"
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="card text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Problem Solving</h3>
                <p className="text-gray-600">
                  I thrive on tackling complex challenges and finding innovative solutions.
                </p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Learner</h3>
                <p className="text-gray-600">
                  Quick to adapt to new technologies and frameworks, always staying current.
                </p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Team Player</h3>
                <p className="text-gray-600">
                  Excellent at collaborating and communicating with cross-functional teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="section-padding">
          <div className="container-custom">
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
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              title="Timeline"
              subtitle="My journey so far"
              center
            />
            <div className="max-w-3xl mx-auto mt-12">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform md:-translate-x-1/2" />

                {/* Timeline Items */}
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start mb-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                      }`}
                    >
                      <div className="card">
                        <div className="text-primary-600 font-bold text-lg mb-1">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">
                          {item.organization}
                        </p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

