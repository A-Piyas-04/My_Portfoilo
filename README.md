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
│   ├── about/page.jsx      # About page
│   ├── projects/page.jsx   # Projects page
│   ├── skills/page.jsx     # Skills page
│   ├── contact/page.jsx    # Contact page
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
└── styles/
    └── globals.css         # Additional global styles (if needed)
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure EmailJS (for contact form):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and template
   - Add your credentials to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

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

## 🚢 Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Add your environment variables in Vercel dashboard
5. Deploy!

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette. The primary color scheme is defined in the `colors.primary` object.

### Content

- **Personal Info:** Update name, title, and bio in respective page components
- **Projects:** Edit project data in `app/projects/page.jsx`
- **Skills:** Modify skill categories in `app/skills/page.jsx`
- **Social Links:** Update links in `components/Footer.jsx` and `components/Navbar.jsx`

### Animations

Framer Motion animations can be customized in individual components. Look for `motion` components and `variants` objects.

## 📝 License

This project is open source and available for personal use.

