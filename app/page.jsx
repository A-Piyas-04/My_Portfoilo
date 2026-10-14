import ClientLayout from '@/components/ClientLayout'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Expertise from '@/components/Expertise'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ClientLayout>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Expertise />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ClientLayout>
  )
}
