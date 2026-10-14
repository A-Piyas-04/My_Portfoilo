export const profile = {
  name: 'Ahnaf Shahriar Pias',
  firstName: 'AHNAF',
  lastName: 'SHAHRIAR PIAS',
  shortName: 'AHNAF',
  email: 'ahnafpias@iut-dhaka.edu',
  resume: '/images/Ahnaf_Shahriar_Pias_Resume.pdf',
  resumeFileName: 'Ahnaf_Shahriar_Pias_Resume.pdf',
  logo: '/images/logo.gif',
  photos: {
    primary: '/images/dp-3.png',
    secondary: '/images/dp-2.png',
    classic: '/images/dp.jpg',
  },
  headline: 'ML Engineering Intern @ Red-Dot Digital Limited',
  tagline:
    'Crafting elegant solutions to complex problems. Passionate about innovative web development, applied machine learning and exceptional user experiences.',
  bio: [
    "I'm a dedicated Software Developer with a passion for crafting elegant solutions to complex problems. My journey in software development began with a curiosity about how things work, which has evolved into a career focused on building innovative web applications.",
    "I specialize in modern web technologies and enjoy working across the full stack. Whether it's designing intuitive user interfaces or architecting robust backend systems, I bring attention to detail and a commitment to excellence to every project.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
  ],
}

export const roles = [
  'ORIGINAL SERIES // ML ENGINEERING INTERN',
  'FEATURE FILM // FULL-STACK DEVELOPER',
  'BLOCKBUSTER // AI DEVELOPER',
  'ACCLAIMED // ASPIRING SOFTWARE ENGINEER',
  'LIMITED SERIES // FRONTEND DESIGNER',
]

export const experience = [
  {
    role: 'ML Engineering Intern',
    company: 'Red-Dot Digital Limited',
    type: 'Internship',
    start: 'TBA',
    end: 'Present',
    current: true,
    summary:
      'Currently interning on the machine learning engineering team, building and shipping ML-powered features into production systems.',
    highlights: [
      'Details coming soon: responsibilities and highlights will be added here.',
    ],
    tags: ['Machine Learning', 'Python', 'Production ML'],
  },
]

export const education = [
  {
    season: 'Season 1',
    institution: 'Notre Dame College',
    degree: 'Higher Secondary Certificate (HSC)',
    detail: 'Dhaka, Bangladesh',
    status: 'Completed',
    note: null,
  },
  {
    season: 'Season 2',
    institution: 'Islamic University of Technology (IUT), Bangladesh',
    degree: 'Bachelor of Science in Software Engineering',
    detail: 'Department of Computer Science and Engineering',
    status: 'Undergraduate',
    note: 'International university established under the Organization of Islamic Cooperation (OIC), focusing on engineering and technology excellence.',
  },
]

export const strengths = [
  { title: 'Problem Solving', text: 'I thrive on tackling complex challenges and finding innovative solutions.' },
  { title: 'Fast Learner', text: 'Quick to adapt to new technologies and frameworks, always staying current.' },
  { title: 'Team Player', text: 'Excellent at collaborating and communicating with cross-functional teams.' },
]

export const expertise = [
  {
    number: '01',
    title: 'Full-Stack Development',
    text: 'Building end-to-end web platforms with React, Next.js, Vue, Node.js, Express and FastAPI, from intuitive interfaces to robust, role-based backends.',
    tag: 'UI & ARCHITECTURE',
  },
  {
    number: '02',
    title: 'AI & Machine Learning',
    text: 'Designing RAG pipelines, vector embeddings and agentic AI workflows with Gemini, now applied to production ML engineering at Red-Dot Digital.',
    tag: 'INTELLIGENCE & ML',
  },
  {
    number: '03',
    title: 'Data & Databases',
    text: 'Modelling and querying data across PostgreSQL, pgvector, PGlite, MongoDB, MySQL, Redis and SQLite, including in-browser SQL execution.',
    tag: 'DATA LAYER',
  },
  {
    number: '04',
    title: 'Automation & DevOps',
    text: 'Containerizing services with Docker, automating workflows with n8n and shipping to the cloud with Firebase and Vercel.',
    tag: 'DEVOPS & AUTOMATION',
  },
]

export const skillCategories = [
  {
    title: 'Languages',
    tag: 'CORE',
    desc: 'The languages I think and build in, from systems-level C++ to typed JavaScript and Python for ML.',
    skills: [
      { name: 'JavaScript', icon: '/images/skills/javascript.svg' },
      { name: 'TypeScript', icon: '/images/skills/typescript.svg' },
      { name: 'Python', icon: '/images/skills/python.svg' },
      { name: 'Java', icon: '/images/skills/java.svg' },
      { name: 'C++', icon: '/images/skills/cpp.svg' },
    ],
  },
  {
    title: 'Frameworks',
    tag: 'UI / SERVER',
    desc: 'Frameworks and libraries for interactive frontends, APIs, 3D scenes and desktop apps.',
    skills: [
      { name: 'React', icon: '/images/skills/react.svg' },
      { name: 'Next.js', icon: '/images/skills/nextjs.svg' },
      { name: 'Node.js', icon: '/images/skills/nodejs.svg' },
      { name: 'Express', icon: '/images/skills/express.svg' },
      { name: 'Vue.js', icon: '/images/skills/vue.svg' },
      { name: 'FastAPI', icon: '/images/skills/FastAPI.svg' },
      { name: 'Three.js' },
      { name: 'CustomTkinter' },
    ],
  },
  {
    title: 'Databases',
    tag: 'DATA LAYER',
    desc: 'Relational, document, key-value and vector stores, including Postgres running in the browser.',
    skills: [
      { name: 'MongoDB', icon: '/images/skills/mongodb.svg' },
      { name: 'PostgreSQL', icon: '/images/skills/postgresql.svg' },
      { name: 'MySQL', icon: '/images/skills/mysql.svg' },
      { name: 'Redis', icon: '/images/skills/redis.svg' },
      { name: 'SQLite' },
      { name: 'pgvector' },
      { name: 'PGlite' },
    ],
  },
  {
    title: 'AI & ML',
    tag: 'INTELLIGENCE',
    desc: 'Retrieval-augmented generation, embeddings and agentic systems grounded in real data.',
    skills: [{ name: 'RAG' }, { name: 'Vector Embeddings' }, { name: 'Gemini' }, { name: 'Agentic AI' }],
  },
  {
    title: 'Tools & Platforms',
    tag: 'PRODUCTIVITY',
    desc: 'Tooling for version control, containers, automation, auth and developer experience.',
    skills: [
      { name: 'Git', icon: '/images/skills/git.svg' },
      { name: 'Docker', icon: '/images/skills/docker.svg' },
      { name: 'n8n', icon: '/images/skills/n8n.svg' },
      { name: 'Firebase', icon: '/images/skills/Firebase.svg' },
      { name: 'Vite', icon: '/images/skills/Vite.js.svg' },
      { name: 'CodeMirror' },
      { name: 'RBAC' },
      { name: 'AST' },
    ],
  },
  {
    title: 'Soft Skills',
    tag: 'HUMAN',
    desc: 'How I work with people: clear communication, ownership and steady delivery.',
    skills: [
      { name: 'Problem Solving' },
      { name: 'Team Collaboration' },
      { name: 'Communication' },
      { name: 'Time Management' },
      { name: 'Adaptability' },
    ],
  },
]

export const projects = [
  {
    id: 2,
    title: 'NexusRide',
    category: 'Full-Stack Platform',
    description:
      'Transport subscription platform (FastAPI + React/Vite) with staff/subscriber dashboards, PostgreSQL, and RBAC across 4 user types. System design, Transport-Officer and faculty backend features, profile management.',
    tech: ['FastAPI', 'React', 'Vite', 'PostgreSQL', 'RBAC'],
    githubUrl: 'https://github.com/A-Piyas-04/Nexus-Ride',
  },
  {
    id: 3,
    title: 'SQLens',
    category: 'Developer Tools + AI',
    description:
      'Run real PostgreSQL queries in the browser; visualize schema and query execution with optional AI SQL hints. React, TypeScript, CodeMirror, pglite, AST; Express 5 + Gemini backend.',
    tech: ['React', 'TypeScript', 'CodeMirror', 'PGlite', 'Express', 'Gemini'],
    githubUrl: 'https://github.com/A-Piyas-04/SQLens',
    websiteUrl: 'https://sq-lens-phi.vercel.app/',
  },
  {
    id: 10,
    title: 'Blind75 Tracker',
    category: 'Desktop App',
    description:
      'Offline NeetCode Blind 75 tracker built with Python, CustomTkinter, and SQLite. Runs fully offline with no login or internet required.',
    tech: ['Python', 'CustomTkinter', 'SQLite'],
    githubUrl: 'https://github.com/A-Piyas-04/Blind75-NeetCode--tracker',
  },
  {
    id: 11,
    title: 'CareerPilot',
    category: 'AI Agent',
    description:
      'CV intelligence agent (chunk, embed, RAG retrieval, grounded Q&A) plus job-to-skill gap analysis with roadmap-to-goals mechanism.',
    tech: ['RAG', 'Vector Embeddings', 'Agentic AI'],
    githubUrl: 'https://github.com/A-Piyas-04/CareerPilot',
  },
  {
    id: 12,
    title: 'BackfireOS',
    category: 'AI + 3D Simulation',
    description:
      'Simulate page with counterfactual branching and Three.js animations; Banglish RAG pipeline (pgvector + BnSentMix embeddings) with 6 red-team AI personas.',
    tech: ['Three.js', 'RAG', 'pgvector', 'Embeddings'],
    githubUrl: 'https://github.com/adibqt/BackfireOS',
  },
  {
    id: 1,
    title: 'IUTverse',
    category: 'Campus Platform',
    description:
      'A comprehensive campus-centric platform designed to streamline communication, collaboration, and resource sharing for students at the Islamic University of Technology (IUT)',
    tech: ['Full Stack', 'Community'],
    githubUrl: 'https://github.com/A-Piyas-04/IUTverse',
  },
  {
    id: 7,
    title: 'TaskIt',
    category: 'Productivity',
    description: 'A category based task management application with neon aesthetic, built with Next.js and Firebase.',
    tech: ['Next.js', 'Firebase'],
    githubUrl: 'https://github.com/A-Piyas-04/taskit',
    websiteUrl: 'https://taskit-8zuo.vercel.app/',
  },
  {
    id: 8,
    title: 'NestUp-BD',
    category: 'Web Platform',
    description:
      'NestUp-BD is an all-in-one web platform designed to support Bangladeshi people relocating to new cities for exams or other events.',
    tech: ['Web Platform'],
    githubUrl: 'https://github.com/A-Piyas-04/NestUp-BD',
  },
  {
    id: 9,
    title: 'PHARMASYNC',
    category: 'Systems / CLI',
    description: 'A command-line based Pharmacy Management System implemented in C++.',
    tech: ['C++', 'CLI'],
    githubUrl: 'https://github.com/A-Piyas-04/PHARMASYNC',
  },
  {
    id: 4,
    title: 'Smoothie Maker Simulator',
    category: 'Desktop App',
    description:
      'A Java Swing application that lets users create and customize their own smoothies with various ingredients, flavors, and toppings.',
    tech: ['Java', 'Swing'],
    githubUrl: 'https://github.com/A-Piyas-04/Smoothie_Maker_Simulator',
  },
  {
    id: 5,
    title: 'Campus Lockdown',
    category: 'Game',
    description:
      'A top-down exploration game built with Python and Pygame, where you navigate a dark campus environment using limited visibility and a flashlight to survive and explore. (In Development)',
    tech: ['Python', 'Pygame'],
    githubUrl: 'https://github.com/A-Piyas-04/Campus_Lockdown',
  },
  {
    id: 6,
    title: 'Banking Management System',
    category: 'OOP System',
    description:
      'A simple banking management system following OOP principles which offers basic banking features that can be done from an online banking app.',
    tech: ['OOP'],
    githubUrl: 'https://github.com/A-Piyas-04/Banking-Management-System-Project-',
  },
]

export const socials = [
  { name: 'GitHub', href: 'https://github.com/A-Piyas-04', description: 'Check out my code' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ah-pias/', description: 'Connect professionally' },
  { name: 'X', href: 'https://x.com/ahnaf_ik2?t=ng3Fjvvcsa0wYBmTVfNNoA&s=07', description: 'Chat with me' },
  { name: 'Facebook', href: 'https://www.facebook.com/ahnafshahriar.pias', description: 'Follow my updates' },
]

export const viewerProfiles = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    avatar: '/images/dp-3.png',
    tint: 'from-[#E50914] to-[#6b0309]',
    tagline: 'Currently an ML Engineering Intern at Red-Dot Digital Limited and open to software engineering opportunities. The resume is one click away.',
    primaryCta: 'resume',
  },
  {
    id: 'developer',
    label: 'Developer',
    avatar: '/images/dp-2.png',
    tint: 'from-[#1f6feb] to-[#0b2a5c]',
    tagline: 'Full-stack and ML builder: RAG pipelines, in-browser Postgres, Three.js simulations. Dive into the code on GitHub.',
    primaryCta: 'github',
  },
  {
    id: 'collaborator',
    label: 'Collaborator',
    avatar: '/images/dp.jpg',
    tint: 'from-[#f5c518] to-[#7a5c00]',
    tagline: 'Have an idea worth building? I love shipping ambitious projects with great people. Let us talk.',
    primaryCta: 'contact',
  },
  {
    id: 'explorer',
    label: 'Explorer',
    avatar: '/images/dp-3.png',
    tint: 'from-[#2ea043] to-[#0d3d18]',
    tagline: 'Just browsing? Grab some popcorn and binge through the episodes of my developer journey.',
    primaryCta: 'projects',
  },
]
