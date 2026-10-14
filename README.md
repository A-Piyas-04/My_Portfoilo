# Portfolio Website - Ahnaf Shahriar Pias

A Netflix-inspired, cinematic portfolio built with Next.js 14, Tailwind CSS, GSAP and Three.js.

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Netflix black / crimson theme)
- **Animation:** GSAP + ScrollTrigger, Lenis smooth scrolling, Framer Motion (modal / menus)
- **3D:** Three.js via @react-three/fiber (hero light tunnel)
- **Deployment:** Vercel (optimized)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.jsx          # Root layout, fonts, metadata
│   ├── page.jsx            # Home page (composes all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── ClientLayout.jsx    # Preloader -> "Who's watching?" gate -> site
│   ├── Preloader.jsx       # Netflix-style intro
│   ├── ProfileGate.jsx     # Viewer profile picker (changes hero copy + CTA)
│   ├── Navbar.jsx / Footer.jsx
│   ├── Hero.jsx            # 3D tilt poster, marquee, spotlight
│   ├── HeroScene.jsx       # Three.js particle / ring tunnel (lazy loaded)
│   ├── About.jsx           # Director's Cut + education episodes
│   ├── Experience.jsx      # "Now Streaming" current role
│   ├── Expertise.jsx       # Stacked scroll cards
│   ├── Skills.jsx          # Pinned arc carousel
│   ├── Projects.jsx        # Folder-open project archive
│   ├── ProjectModal.jsx    # "More Info" project modal
│   └── Contact.jsx
├── data/
│   └── portfolio.js        # ALL content: profile, experience, skills, projects, socials
├── lib/                    # scroll + reveal helpers
└── public/
    └── images/             # Photos, logo, resume, skill icons
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure EmailJS (for contact form):
   - Copy `.env.example` to `.env.local`
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and template
   - Add your credentials to `.env.local`

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out/` directory (static export).

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide and EmailJS setup
- **[Customization Guide](./DEPLOYMENT.md#-customization-guide)** - How to customize colors, content, and animations

## ✨ Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized with metadata
- ✅ Contact form with EmailJS integration
- ✅ Modern, clean UI with Tailwind CSS
- ✅ Accessible and performant
- ✅ Static export ready for Vercel

## 🎨 Customization

### Quick Updates

- **All content (bio, experience, education, skills, projects, socials):** `data/portfolio.js`
- **Colors & fonts:** `tailwind.config.js`, `app/layout.jsx`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed customization instructions.

## 📝 License

This project is open source and available for personal use.

