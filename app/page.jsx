import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'
import CursorFollower from '@/components/CursorFollower'

export const metadata = {
  title: 'Ahnaf Shahriar Pias - Software Developer Portfolio',
  description: 'Portfolio website of Ahnaf Shahriar Pias, a Software Developer showcasing projects, skills, and experience.',
}

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
