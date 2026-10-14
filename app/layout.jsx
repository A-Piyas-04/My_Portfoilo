import './globals.css'
import { Inter, Bebas_Neue } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' })

export const metadata = {
  title: 'Ahnaf Shahriar Pias - ML Engineering Intern & Software Developer',
  description:
    'Portfolio of Ahnaf Shahriar Pias, ML Engineering Intern at Red-Dot Digital Limited and full-stack / AI developer, showcasing projects, skills, and experience.',
  keywords: 'software developer, ML engineering, machine learning, full stack, portfolio, RAG, Next.js',
  authors: [{ name: 'Ahnaf Shahriar Pias' }],
  openGraph: {
    title: 'Ahnaf Shahriar Pias - ML Engineering Intern & Software Developer',
    description: 'A Netflix-inspired portfolio: projects, skills and experience.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${bebas.variable}`}>{children}</body>
    </html>
  )
}
