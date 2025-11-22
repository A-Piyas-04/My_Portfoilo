import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ahnaf Shahriar Pias - Software Developer',
  description: 'Personal portfolio website of Ahnaf Shahriar Pias, a Software Developer showcasing projects, skills, and experience.',
  keywords: 'software developer, portfolio, web development, programming',
  authors: [{ name: 'Ahnaf Shahriar Pias' }],
  openGraph: {
    title: 'Ahnaf Shahriar Pias - Software Developer',
    description: 'Personal portfolio website showcasing projects, skills, and experience.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

