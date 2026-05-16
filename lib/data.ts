// ============================================================
// DATA LAYER — Portfolio Content
// ============================================================

// --- Navigation ---
export const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
] as const;

// --- Typewriter greetings (cycles through languages) ---
export const greetings = [
  "Hi, I'm Vidhan.",
  "नमस्ते, मैं विधान हूँ.",
  "Hola, soy Vidhan.",
  "Bonjour, je suis Vidhan.",
  "Hallo, ich bin Vidhan.",
  "Ciao, sono Vidhan.",
  "こんにちは、ヴィダンです。",
  "안녕하세요, 비단입니다.",
  "Olá, eu sou Vidhan.",
  "مرحبًا، أنا فيدان.",
  "Привет, я Видхан.",
  "Selam, ben Vidhan.",
  "Hoi, ik ben Vidhan.",
  "Γεια, είμαι ο Vidhan.",
  "Xin chào, tôi là Vidhan.",
  "สวัสดีครับ ผมชื่อ Vidhan",
] as const;

// --- Hero ---
export const heroData = {
  subtitle:
    "I build full-stack and AI applications across various platforms. When I'm not shipping code (which is rare xD), I'm probably hitting my next PR in the gym 💪🏻",
  ctaText: "Get in touch",
  ctaHref: "/contact",
} as const;

// --- Projects ---
export type ProjectCategory = "Personal Projects" | "Professional Work" | "Open Source Contributions";

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  tags: string[];
  links: { label: string; href: string }[];
  highlights: string[];
}

export const projectsData: Project[] = [
  {
    slug: "tensai",
    title: "tensAI — Enterprise Agentic RAG Platform",
    description: "Digital Specialist Engineer at Infosys, building an enterprise-grade agentic RAG platform on SAP BTP.",
    fullDescription: "tensAI is a sophisticated agentic RAG platform designed for enterprise scale. Built on SAP BTP, it enables seamless document ingestion, intelligent retrieval, and automated evaluation of AI responses. My work focused on architecting the core backend services, optimizing retrieval accuracy, and establishing robust evaluation frameworks to ensure high-fidelity grounded responses.",
    category: "Professional Work",
    tags: ["Python", "Flask", "SAP BTP", "RAG", "RAGAS", "Vector Search", "LLM"],
    links: [{ label: "Infosys", href: "https://www.infosys.com/" }],
    highlights: [
      "Owned the Flask backend for tensAI, building retrieval workflows, document ingestion services, and integrations across SAP services.",
      "Designed a hybrid retrieval pipeline combining BM25, dense vector search, and reranker, improving top-3 retrieval relevance by 38%.",
      "Built multi-format document parsers for PDF, PPTX, DOCX, and Excel, significantly improving grounding reliability in RAG workflows.",
      "Developed a RAGAS-based evaluation framework for automated hallucination monitoring, reducing evaluation turnaround time by 60%.",
    ],
  },
  {
    slug: "commentme",
    title: "Commentme — Manage & Automate Cluttered Codebase",
    description:
      "AI-based Codebase Comments and Notes Manager with a Cloud Vault synced with the CLI package tool.",
    fullDescription:
      "An AI-integrated ecosystem designed to clean up technical debt by managing scattered code comments and notes. It features a CLI tool for local management and a web dashboard for cloud synchronization, allowing teams to maintain a 'living documentation' without cluttering the actual source code.",
    category: "Personal Projects",
    tags: ["React", "Express", "MongoDB", "Tailwind", "Node.js", "Acorn", "OpenRouter", "PostHog"],
    links: [
      { label: "Live Site", href: "https://commentme-web.vercel.app/" },
      { label: "npm", href: "https://www.npmjs.com/package/commentme" },
    ],
    highlights: [
      "Built a custom parser using Acorn to intelligently extract and redact sensitive comments from local files.",
      "Integrated OpenRouter for context-aware code analysis and automated comment generation.",
      "Developed a robust CLI interface using Commander.js for seamless developer experience.",
      "Implemented a Cloud Vault for team-wide note sharing and version control.",
    ],
  },
  {
    slug: "chatpdf",
    title: "RAG Agent — ChatPDF",
    description: "A custom retrieval-augmented generation agent built with FastAPI, Inngest, Qdrant, Huggingface. Chat with any PDF.",
    fullDescription: "A RAG based AI assistant that allows you to upload PDFs and ask questions based on their content. It uses Qdrant as vector database and Inngest for observability features utilizing free models via Groq API",
    category: "Personal Projects",
    tags: ["Python/fastapi", "huggingface", "Qdrant", "Inngest", "llamaIndex", "groq"],
    links: [{ label: "GitHub", href: "https://github.com/Vidhanvyrs/ChatPDF" }],
    highlights: [
      "Inngest for Observability features.",
      "Integration with Groq for running open-source LLMs.",
      "Qdrant vector store for efficient document retrieval.",
    ],
  },
  {
    slug: "homingdotcom",
    title: "Homingdotcom — Real Estate Platform",
    description: "Platform for listing and discovering properties based on city, surroundings, and budget.",
    fullDescription: "A feature-rich real estate marketplace focused on local community insights and budget-based discovery. It provides users with deep surrounding data (schools, hospitals, parks) to help them make informed living decisions.",
    category: "Personal Projects",
    tags: ["React", "Express", "MongoDB", "Prisma", "Node.js"],
    links: [
      { label: "GitHub", href: "https://github.com/Vidhanvyrs/Homingdotcom" },
    ],
    highlights: [
      "Implemented advanced filtering logic using Prisma ORM for lightning-fast property searches.",
      "Integrated Google Maps API for interactive discovery and locality-based visualization.",
      "Designed a custom auth system for verified property listers and agents.",
      "Built a responsive mobile-first UI for property discovery on the go.",
    ],
  },
  {
    slug: "dimple",
    title: "Dimple — Social Media Web App",
    description: "A full-stack social media application with real-time features and music integration.",
    fullDescription: "Dimple is a comprehensive social media platform designed for seamless user interaction. It implements core social features like authentication, profile management, and content sharing, while also integrating a unique music discovery experience through third-party APIs.",
    category: "Personal Projects",
    tags: ["React", "TanStack Query", "Tailwind CSS", "Appwrite"],
    links: [{ label: "Github", href: "https://github.com/Vidhanvyrs/Dimplegram" }, { label: "Live", href: "https://dimplegram.vercel.app/" }],
    highlights: [
      "Built a Full Stack application implementing features like user authentication, profile creation, content sharing, and an embedded Spotify-like music player.",
      "Improved user experience with functionalities such as saving and liking posts, infinite scrolling, and responsive design.",
    ],
  },
  {
    slug: "acencore",
    title: "Acencore — AI Assisted Hiring Platform",
    description: "Revolutionizing recruitment with OrionAI. Automating manual tasks from sourcing to onboarding.",
    fullDescription: "Acencore is a comprehensive enterprise recruitment platform that leverages AI to streamline the entire hiring lifecycle. From automated candidate sourcing to AI-driven video interviews, it reduces time-to-hire by 40% and eliminates repetitive manual screening tasks.",
    category: "Professional Work",
    tags: ["Next.js", "Node.js", "Zegocloud", "Tailwind", "Redux", "GCP", "speech-to-text"],
    links: [{ label: "Live Site", href: "https://acencore-ui.vercel.app/" }],
    highlights: [
      "Architected the frontend using Next.js 14 and Redux Toolkit.",
      "Developed an AI video interview module using Zegocloud and Google Cloud Speech-to-Text.",
      "Built dynamic candidate evaluation dashboards with real-time scoring.",
    ],
  },
  {
    slug: "physioplus",
    title: "Physioplus — Healthcare Platform",
    description: "Platform for expert physiotherapy at home or in-clinic with personalized recovery care.",
    fullDescription: "A healthcare service platform connecting patients with specialized physiotherapists. It handles everything from booking sessions to tracking recovery progress through a dedicated patient-doctor portal.",
    category: "Professional Work",
    tags: ["React", "Express", "MongoDB", "Tailwind", "Node.js", "Firebase"],
    links: [{ label: "Live Site", href: "https://physioplushealthcare.com/" }],
    highlights: [
      "Led the frontend development team to ship the doctor booking portal within a tight 3-month timeline.",
      "Integrated Firebase for real-time appointment notifications and secure patient data storage.",
      "Developed a custom scheduling algorithm to optimize doctor availability and travel times for home visits.",
    ],
  },
  {
    slug: "stakehub",
    title: "Stakehub",
    description: "Transforming Private Equity with a transparent and accessible investment ecosystem.",
    fullDescription: "Stakehub is a Private Equity investment platform built to simplify the complex world of market investing. It provides a transparent and reliable ecosystem where investors can explore credible opportunities with confidence. During my tenure, I led a major architectural migration of the codebase from Tailwind CSS to SCSS for enhanced style modularity, developed key featured components, and performed rigorous QA testing to maintain high-quality frontend standards.",
    category: "Professional Work",
    tags: ["Next.js", "React.js", "SCSS", "Tailwind CSS", "CSS3"],
    links: [{ label: "View Product", href: "https://www.stakehub.in/" }],
    highlights: [
      "Migrated Codebase from TailwindCSS to SCSS",
      "Developed various featured components",
      "Rigorously conducted QA testing of the Frontend Components"
    ],
  },
  {
    slug: "jbbricks",
    title: "JB Bricks — Freelance Work",
    description: "Portfolio business website for a local brick manufacturing company, JB Bricks.",
    fullDescription: "A professional business portfolio for JB Bricks, a leading manufacturer of high-quality fly ash bricks. The website showcases their product range, manufacturing process, and technical specifications, providing a seamless way for customers to request quotes and contact the business.",
    category: "Professional Work",
    tags: ["HTML5", "CSS3", "JS", "Wordpress", "EmailJS"],
    links: [{ label: "View Product", href: "https://www.jbbricks.co.in/" }],
    highlights: [
      "Designed and developed a responsive business website showcasing brick products and manufacturing standards.",
      "Integrated EmailJS for direct customer inquiries and quotation requests.",
      "Optimized for local SEO to improve business visibility in the manufacturing sector.",
    ],
  },
  {
    slug: "activist.org",
    title: "Activist Org — Contribution",
    description: "Platform that enables people to safely engage in activism by discovering organizations and collaborating on political action.",
    fullDescription: "A community-focused platform for people who want to make a difference. It connects activists with organizations and events, providing tools for secure coordination and collaboration on social and political actions.",
    category: "Open Source Contributions",
    tags: ["Vue.js", "Tailwind CSS", "Open Source"],
    links: [{ label: "GitHub", href: "https://github.com/activist-org/activist/pulls?q=is%3Apr+is%3Aclosed+author%3AVidhanvyrs" }],
    highlights: [
      "Contributed to the frontend development using Vue.js and Tailwind CSS.",
      "Assisted in building community-focused tools for coordinating political and social action.",
    ],
  },
  {
    slug: "notionenhancer",
    title: "Notion Enhancer — Contribution",
    description: "An open-source customizer for the Notion desktop application.",
    fullDescription: "An all-in-one enhancement toolkit for Notion. It provides a modular framework for adding themes, plugins, and custom styling to the Notion desktop app, significantly improving the user experience for power users.",
    category: "Open Source Contributions",
    tags: ["Javascript", "CSS", "Open Source"],
    links: [{ label: "GitHub", href: "https://github.com/notion-enhancer/notion-enhancer/issues?q=is%3Aissue%20state%3Aclosed%20author%3AVidhanvyrs" }],
    highlights: [
      "Contributed to the development of themes and custom extensions for the Notion desktop app.",
      "Improved modularity and accessibility of the enhancement framework.",
    ],
  },
  // {
  //   slug: "keila",
  //   title: "Keila — Newsletter Tool",
  //   description: "An open-source email newsletter tool built with Elixir and Phoenix.",
  //   fullDescription: "Keila is a privacy-first, self-hostable alternative to Mailchimp. I contributed to the UI components and internationalization efforts to make it more accessible to a global audience.",
  //   category: "Open Source Contributions",
  //   tags: ["Elixir", "Phoenix", "LiveView", "Open Source"],
  //   links: [{ label: "GitHub", href: "https://github.com/ash-project/keila" }],
  //   highlights: [
  //     "Improved mobile responsiveness of the campaign editor using Tailwind CSS.",
  //     "Added support for complex email template variables in the previewer.",
  //   ],
  // },
];

// Re-map for featured projects on home page
export const featuredProjects = projectsData.filter(p =>
  ["commentme", "tensai", "homingdotcom"].includes(p.slug)
);

// --- Experience ---
export const experiencesData = [
  {
    title: "Digital Specialist Engineer",
    company: "Infosys",
    companyUrl: "https://www.infosys.com/",
    location: "India",
    date: "Jun 2025 - Present",
    description:
      "Owning the Flask backend for tensAI, an enterprise-grade agentic RAG platform on SAP BTP.",
    tags: ["Python", "Flask", "RAG", "SAP BTP", "Langchain", "RAGAS", "MERN"],
    bullets: [
      "Owned the Flask backend for tensAI, an enterprise-grade agentic RAG platform on SAP BTP, building retrieval workflows, document ingestion services, and integrations across SAP services and external APIs",
      "Designed a hybrid retrieval pipeline combining BM25, dense vector search, and reranker; improved top-3 retrieval relevance by 38% while reducing average LLM tokens by 27%.",
      "Built multi-format document parsers for PDF, PPTX, DOCX, and Excel ingestion, reducing parsing inconsistencies and improving grounding reliability.",
      "Developed a RAGAS-based evaluation framework for automated hallucination and retrieval-quality monitoring, reducing evaluation turnaround time by 60%.",
      "Completed professional training in MERN Stack, SAP BTP, CAPM, AI, and Automation through the Infosys Training Program.",
      "Trained and onboarded new team members on the project’s technology stack.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Acencore Technologies",
    companyUrl: "https://www.acencore.com/",
    location: "Remote",
    date: "Jul 2024 - Dec 2024",
    description:
      "Built the company's main website and led frontend development for an AI-assisted hiring platform.",
    tags: ["Next.js", "Node.js", "Redux", "Tailwind", "Zegocloud", "GCP"],
    bullets: [
      "Developed significant components for the AI-assisted hiring platform with OrionAI, automating recruitment workflows.",
      "Completed V-0 of the AI-driven video interview flow using Zegocloud and speech-to-text integration.",
      "Built the company's marketing website using Next.js, MagicUI, and Framer Motion.",
    ],
  },
  {
    title: "Front-end Developer",
    company: "StakeHub Infotech",
    companyUrl: "https://www.stakehub.in/",
    location: "Jaipur",
    date: "May 2024",
    description:
      "Temporary developer role migrating codebase and contributing to the unlisted-IPO trading platform.",
    tags: ["React", "Next.js", "SCSS", "Tailwind"],
    bullets: [
      "Migrated the entire codebase from Tailwind to SCSS for improved maintainability.",
      "Contributed new components to the unlisted-IPO trading platform.",
    ],
  },
  {
    title: "Junior Software Developer",
    company: "Physioplus Healthcare",
    companyUrl: "https://physioplushealthcare.com/",
    location: "Jaipur",
    date: "Sept 2023 - Dec 2023",
    description:
      "Collaborated on and led the frontend team for a doctor booking platform.",
    tags: ["React", "Express", "MongoDB", "Node.js", "Tailwind", "Firebase"],
    bullets: [
      "Collaborated and led the frontend team on building the first phase of doctor booking platform.",
      "Built the marketing website from scratch for the health-tech startup.",
    ],
  },
  {
    title: "Web Developer",
    company: "Devyut",
    companyUrl: "#",
    location: "Jaipur",
    date: "Part-time",
    description:
      "Part-time front-end developer during college, contributing to freelance projects.",
    tags: ["React", "JavaScript", "CSS", "WordPress"],
    bullets: [
      "Contributed to freelance projects for various clients.",
      "Mentored sophomores during their internships at the company.",
    ],
  },
  {
    title: "B.Tech CSE (AI)",
    company: "University",
    companyUrl: "#",
    location: "Jaipur, RJ",
    date: "2021 - 2025",
    description:
      "Pursued Bachelors of Technology in Computer Science Engineering with specialization in AI.",
    tags: [],
    bullets: [],
  },
] as const;

// --- Tech Stack (for About page pills) ---
export const techStack = [
  { emoji: "🤖", label: "Claude Code" },
  { emoji: "✨", label: "Cursor" },
  { emoji: "💚", label: "Node.js" },
  { emoji: "⚛️", label: "React.js" },
  { emoji: "▲", label: "Next.js" },
  { emoji: "🐍", label: "Python" },
  // { emoji: "🔥", label: "FastAPI" },
  { emoji: "🧪", label: "Flask" },
  { emoji: "🦜", label: "Langchain" },
  { emoji: "🧠", label: "RAG" },
  { emoji: "🤝", label: "Agentic Workflows" },
  { emoji: "📦", label: "Express.js" },
  { emoji: "🐳", label: "Docker" },
  // { emoji: "☁️", label: "AWS Lambda" },
  // { emoji: "🔄", label: "AWS SQS" },
  { emoji: "🍃", label: "MongoDB" },
  // { emoji: "🐘", label: "PostgreSQL" },
  { emoji: "🗄️", label: "MySQL" },
  { emoji: "💎", label: "Prisma" },
  { emoji: "🔺", label: "Redux" },
  { emoji: "🌊", label: "Tailwind CSS" },
  { emoji: "🅰️", label: "HTML" },
  { emoji: "🎨", label: "CSS" },
  { emoji: "💛", label: "Javascript" },
  // { emoji: "💙", label: "Typescript" },
  { emoji: "🔀", label: "Git" },
  { emoji: "🔥", label: "Firebase" },
  { emoji: "📝", label: "Appwrite" },
  { emoji: "🎞️", label: "Framer Motion" },
  // { emoji: "📡", label: "IoT" },
  // { emoji: "🔗", label: "Blockchain" },
] as const;

// --- Social Links (for footer and contact) ---
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Vidhanvyrs" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vidhan-solanki-dotlasher001/",
  },
  { label: "Twitter", href: "https://x.com/DotLasher" },
  { label: "Medium", href: "https://medium.com/@vidhanvyrs" },
  { label: "Dev.to", href: "https://dev.to/vidhanvyrs" },
] as const;

// --- Currently Section ---
export const currentlyData = [
  {
    label: "Building",
    value: "An Enterprise Level Agentic RAG Platform and my shitty portfolio lol",
  },
  {
    label: "Listening to",
    value: "Tame Impala and Ye also rumours on How AI is going to replace me 💀",
  },
  {
    label: "Reading",
    value: "Multiple md files meant for agents and silly X post",
  },
] as const;
