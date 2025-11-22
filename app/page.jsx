import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

export const metadata = {
  title: 'Ahnaf Shahriar Pias - Software Developer | Home',
  description: 'Welcome to the portfolio of Ahnaf Shahriar Pias, a passionate Software Developer specializing in modern web development.',
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  )
}

