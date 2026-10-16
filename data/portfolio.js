export const profile = {
  name: 'Ahnaf Shahriar Pias',
  firstName: 'AHNAF',
  lastName: 'SHAHRIAR PIAS',
  shortName: 'AHNAF',
  email: 'ahnafpias@iut-dhaka.edu',
  resume: '/images/Ahnaf_Shahriar_Pias_Resume.pdf',
  resumeFileName: 'Ahnaf_Shahriar_Pias_Resume.pdf',
  logo: '/images/dp-2.png',
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
      { name: 'Next.js', icon: '/images/skills/nextjs.svg', mono: true },
      { name: 'Node.js', icon: '/images/skills/nodejs.svg' },
      { name: 'Express', icon: '/images/skills/express.svg', mono: true },
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
      { name: 'Git', icon: '/images/skills/git.svg', mono: true },
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

export const projectGenres = ['AI & Machine Learning', 'Full-Stack & Web', 'DevOps', 'Mobile Apps', 'Desktop, Games & Systems']

export const projects = [
  {
    id: 2,
    title: 'NexusRide',
    featured: true,
    genres: ['Full-Stack & Web'],
    category: 'Full-Stack Platform',
    description:
      'Transport subscription platform (FastAPI + React/Vite) with staff/subscriber dashboards, PostgreSQL, and RBAC across 4 user types. System design, Transport-Officer and faculty backend features, profile management.',
    tech: ['FastAPI', 'React', 'Vite', 'PostgreSQL', 'RBAC'],
    githubUrl: 'https://github.com/A-Piyas-04/Nexus-Ride',
  },
  {
    id: 3,
    title: 'SQLens',
    featured: true,
    genres: ['Full-Stack & Web'],
    category: 'Developer Tools',
    description:
      'Run real PostgreSQL queries in the browser; visualize schema and query execution with optional AI SQL hints. React, TypeScript, CodeMirror, pglite, AST; Express 5 + Gemini backend.',
    tech: ['React', 'TypeScript', 'CodeMirror', 'PGlite', 'Express', 'Gemini'],
    githubUrl: 'https://github.com/A-Piyas-04/SQLens',
    websiteUrl: 'https://sq-lens-phi.vercel.app/',
  },
  {
    id: 10,
    title: 'Blind75 Tracker',
    featured: true,
    genres: ['Desktop, Games & Systems'],
    category: 'Desktop App',
    description:
      'Offline NeetCode Blind 75 tracker built with Python, CustomTkinter, and SQLite. Runs fully offline with no login or internet required.',
    tech: ['Python', 'CustomTkinter', 'SQLite'],
    githubUrl: 'https://github.com/A-Piyas-04/Blind75-NeetCode--tracker',
  },
  {
    id: 11,
    title: 'CareerPilot',
    featured: true,
    genres: ['AI & Machine Learning'],
    category: 'AI Agent',
    description:
      'CV intelligence agent (chunk, embed, RAG retrieval, grounded Q&A) plus job-to-skill gap analysis with roadmap-to-goals mechanism.',
    tech: ['RAG', 'Vector Embeddings', 'Agentic AI'],
    githubUrl: 'https://github.com/A-Piyas-04/CareerPilot',
  },
  {
    id: 12,
    title: 'BackfireOS',
    featured: true,
    genres: ['AI & Machine Learning', 'Full-Stack & Web'],
    category: 'AI + 3D Simulation',
    description:
      'Simulate page with counterfactual branching and Three.js animations; Banglish RAG pipeline (pgvector + BnSentMix embeddings) with 6 red-team AI personas.',
    tech: ['Three.js', 'RAG', 'pgvector', 'Embeddings'],
    githubUrl: 'https://github.com/adibqt/BackfireOS',
  },
  {
    id: 13,
    title: 'Recoil AI',
    genres: ['AI & Machine Learning', 'Full-Stack & Web'],
    category: 'AI Red-Team Tool',
    description:
      'Predicts how a marketing campaign could backfire before launch. Four AI red-team agents (Activist, Journalist, Competitor, Meme Creator), a mock meme generator, a 0-100 backfire risk score and a pre-mortem headline generator, all in a single LLM request with switchable Gemini/OpenAI providers.',
    tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Gemini', 'Docker'],
    githubUrl: 'https://github.com/A-Piyas-04/Recoil-AI',
  },
  {
    id: 14,
    title: 'ScholarGrid',
    genres: ['AI & Machine Learning', 'Full-Stack & Web'],
    category: 'Research Explorer',
    status: 'coming-soon',
    description:
      'Turns recent arXiv computer-science papers into an interactive semantic research landscape. An offline pipeline embeds titles and abstracts, clusters them with UMAP + HDBSCAN, labels areas with c-TF-IDF and tracks publication growth; a Streamlit app offers semantic search, trends, investigation leads and BibTeX export.',
    tech: ['Python', 'Sentence Transformers', 'UMAP', 'HDBSCAN', 'Streamlit'],
    githubUrl: 'https://github.com/A-Piyas-04/PaperPorteHobe',
  },
  {
    id: 15,
    title: 'SATD Embedding Study',
    genres: ['AI & Machine Learning'],
    category: 'ML Research',
    description:
      'Tests whether frozen modern embeddings (Qwen3, E5, BGE-M3) with an XGBoost head can replace BiLSTM/BERT for detecting and categorizing Self-Admitted Technical Debt across comments, issues, commits and pull requests. Beat the BERT baseline on categorization, then classified 458k unseen GitHub issues on a 2xT4 Kaggle pipeline.',
    tech: ['Python', 'Vector Embeddings', 'XGBoost', 'Kaggle'],
    githubUrl: 'https://github.com/A-Piyas-04/SATD-embedding-DP2',
  },
  {
    id: 16,
    title: 'Cross-Platform Sentiment',
    genres: ['AI & Machine Learning'],
    category: 'NLP Research',
    description:
      'Studies how sentiment classifiers trained on Reddit generalize to Twitter. TF-IDF baselines (LR, SVM, Naive Bayes, Random Forest), linguistic-compression and calibration (ECE) analysis, plus a CORAL domain-adaptation experiment. The best SVM drops from 0.72 to 0.653 F1 across platforms.',
    tech: ['Python', 'scikit-learn', 'NLTK', 'pandas'],
    githubUrl: 'https://github.com/A-Piyas-04/cross-platform-sentiment',
  },
  {
    id: 17,
    title: 'PulseGrid',
    genres: ['DevOps'],
    category: 'Microservices / DevOps',
    description:
      'Habit tracker deliberately split into three FastAPI microservices behind an Nginx API gateway, with Prometheus metrics, a provisioned Grafana dashboard (request rate, p95 latency, 5xx rate) and GitHub Actions CI that tests and builds every service.',
    tech: ['FastAPI', 'Docker', 'Nginx', 'Prometheus', 'Grafana'],
    githubUrl: 'https://github.com/A-Piyas-04/PulseGrid',
  },
  {
    id: 21,
    title: 'PixelFlow',
    genres: ['DevOps'],
    category: 'Async Pipeline / DevOps',
    description:
      'Asynchronous image processing pipeline: uploads go through Nginx to FastAPI, jobs are queued on RabbitMQ, and a Pillow worker produces thumbnails, resizes and watermarks while Redis tracks job status. Includes a monitoring dashboard for queue depth and service health, plus GitHub Actions CI that publishes images to GHCR.',
    tech: ['FastAPI', 'RabbitMQ', 'Redis', 'Nginx', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/A-Piyas-04/PixelFlow',
  },
  {
    id: 18,
    title: 'woTask',
    genres: ['Desktop, Games & Systems'],
    category: 'Desktop App',
    description:
      'An offline, local-first task manager that puts work in 3D space: each project is a constellation and every task a glass sphere sized and lit by priority, with chained tasks, a command palette, full keyboard control and Bangla support. Ships as a 2.3 MB Windows installer.',
    tech: ['Tauri', 'Rust', 'React Three Fiber', 'TypeScript', 'SQLite'],
    githubUrl: 'https://github.com/A-Piyas-04/woTask',
  },
  {
    id: 19,
    title: 'Firdaws',
    genres: ['Mobile Apps'],
    category: 'Mobile App',
    description:
      'An Islamic daily companion app with GPS prayer times and reminders, a Qibla compass, a mood-based Qur\'anic ayah jar, a dhikr counter, a nearby mosque finder and sourced daily history stories, all built around one signature wood-ring dial.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    githubUrl: 'https://github.com/A-Piyas-04/Firdaws',
  },
  {
    id: 20,
    title: 'Campus Horror',
    genres: ['Desktop, Games & Systems'],
    category: 'Game',
    status: 'coming-soon',
    description:
      'A 2.5D horror game in Godot set on a faithfully reconstructed university campus. Landmarks are modelled in Blender and rendered into game art, with zone-based maps, save/load and a night mode with a lantern.',
    tech: ['Godot', 'GDScript', 'Blender'],
    githubUrl: 'https://github.com/A-Piyas-04/CampusHorror',
  },
  {
    id: 1,
    title: 'IUTverse',
    featured: true,
    genres: ['Full-Stack & Web'],
    category: 'Campus Platform',
    description:
      'A comprehensive campus-centric platform designed to streamline communication, collaboration, and resource sharing for students at the Islamic University of Technology (IUT)',
    tech: ['Full Stack', 'Community'],
    githubUrl: 'https://github.com/A-Piyas-04/IUTverse',
  },
  {
    id: 7,
    title: 'TaskIt',
    featured: true,
    genres: ['Full-Stack & Web'],
    category: 'Productivity',
    description: 'A category based task management application with neon aesthetic, built with Next.js and Firebase.',
    tech: ['Next.js', 'Firebase'],
    githubUrl: 'https://github.com/A-Piyas-04/taskit',
    websiteUrl: 'https://taskit-8zuo.vercel.app/',
  },
  {
    id: 8,
    title: 'NestUp-BD',
    featured: true,
    genres: ['Full-Stack & Web'],
    category: 'Web Platform',
    description:
      'NestUp-BD is an all-in-one web platform designed to support Bangladeshi people relocating to new cities for exams or other events.',
    tech: ['Web Platform'],
    githubUrl: 'https://github.com/A-Piyas-04/NestUp-BD',
  },
  {
    id: 9,
    title: 'PHARMASYNC',
    genres: ['Desktop, Games & Systems'],
    category: 'Systems / CLI',
    description: 'A command-line based Pharmacy Management System implemented in C++.',
    tech: ['C++', 'CLI'],
    githubUrl: 'https://github.com/A-Piyas-04/PHARMASYNC',
  },
  {
    id: 4,
    title: 'Smoothie Maker Simulator',
    genres: ['Desktop, Games & Systems'],
    category: 'Desktop App',
    description:
      'A Java Swing application that lets users create and customize their own smoothies with various ingredients, flavors, and toppings.',
    tech: ['Java', 'Swing'],
    githubUrl: 'https://github.com/A-Piyas-04/Smoothie_Maker_Simulator',
  },
  {
    id: 6,
    title: 'Banking Management System',
    genres: ['Desktop, Games & Systems'],
    category: 'OOP System',
    description:
      'A simple banking management system following OOP principles which offers basic banking features that can be done from an online banking app.',
    tech: ['OOP'],
    githubUrl: 'https://github.com/A-Piyas-04/Banking-Management-System-Project-',
  },
  {
    id: 22,
    title: 'Aqua Vault',
    genres: ['Desktop, Games & Systems'],
    category: 'Game',
    status: 'coming-soon',
    description:
      'A cozy browser game set in a Bangladeshi monsoon village. Dig canals so rain reaches the rice paddy, store it in a reservoir, turn falling water into power, clean it for homes, and grow a living pond and wetland until the village is in bloom. Static Next.js + Canvas 2D, playable with mouse, touch and keyboard.',
    tech: ['Next.js', 'TypeScript', 'Canvas 2D'],
    githubUrl: 'https://github.com/A-Piyas-04/aqua-vault',
  },
  {
    id: 23,
    title: 'Bellwether Index',
    genres: ['Desktop, Games & Systems'],
    category: 'Game',
    status: 'coming-soon',
    description:
      'An upcoming game built around reading early signals and acting on them before the rest of the map catches up. Currently in active development.',
    tech: ['In Development'],
    githubUrl: 'https://github.com/A-Piyas-04/The-Bellwether-Index',
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
