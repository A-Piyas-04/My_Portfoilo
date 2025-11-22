# Portfolio Website - Ahnaf Shahriar Pias

A modern, responsive portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Email Service:** EmailJS
- **Deployment:** Vercel (optimized)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.jsx          # Root layout with metadata
│   ├── page.jsx            # Home page
│   ├── about/
│   │   └── page.jsx        # About page
│   ├── projects/
│   │   └── page.jsx        # Projects page
│   ├── skills/
│   │   └── page.jsx        # Skills page
│   ├── contact/
│   │   ├── layout.jsx     # Contact page metadata
│   │   └── page.jsx        # Contact page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.jsx          # Navigation component
│   ├── Footer.jsx          # Footer component
│   ├── HeroSection.jsx     # Hero section component
│   ├── ProjectCard.jsx     # Project card component
│   ├── SkillCard.jsx       # Skill card component
│   └── SectionHeader.jsx   # Section header component
├── public/
│   └── images/             # Image assets
└── .env.example            # Environment variables template
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

- **Personal Info:** `app/page.jsx` (HeroSection)
- **Projects:** `app/projects/page.jsx`
- **Skills:** `app/skills/page.jsx`
- **Social Links:** `components/Footer.jsx` and `app/contact/page.jsx`
- **Colors:** `tailwind.config.js`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed customization instructions.

## 📝 License

This project is open source and available for personal use.

