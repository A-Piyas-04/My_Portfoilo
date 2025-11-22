# Deployment Guide

## 🚀 Deploying to Vercel

This portfolio is optimized for Vercel deployment. Follow these steps:

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Configure Environment Variables

1. In your Vercel project dashboard, go to Settings → Environment Variables
2. Add the following variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. Redeploy your project

## 📧 EmailJS Setup

### Step 1: Create EmailJS Account

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Verify your email address

### Step 2: Create Email Service

1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

### Step 3: Create Email Template

1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template structure:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
4. Save and copy your **Template ID**

### Step 4: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Add to Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

## 🎨 Customization Guide

### Changing Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Update these values to your brand colors
        600: '#your-color',
        // ... other shades
      },
    },
  },
}
```

### Updating Personal Information

1. **Name & Title:** `app/page.jsx` (HeroSection component)
2. **Bio:** `app/about/page.jsx`
3. **Projects:** `app/projects/page.jsx` (projects array)
4. **Skills:** `app/skills/page.jsx` (skillCategories object)
5. **Social Links:** 
   - `components/Footer.jsx`
   - `app/contact/page.jsx`

### Adding Project Images

1. Place images in `public/images/`
2. Update project objects in `app/projects/page.jsx`:
```javascript
{
  // ... other fields
  image: '/images/project-name.jpg',
}
```

### Modifying Animations

Framer Motion animations are in each component. Look for:
- `motion` components
- `variants` objects
- `initial`, `animate`, `whileInView` props

Adjust timing, delays, and effects as needed.

## 🔧 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Notes

- The site is configured for static export (no server required)
- All images should be optimized before adding
- Update social media links with your actual profiles
- Replace placeholder email addresses
- Add your actual CV/Resume file for download

