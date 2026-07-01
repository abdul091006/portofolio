export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  signal: string;
  image: string;
  githubUrl: string;
  accent: string;
};

export type WorkExperience = {
  id: string;
  role: string;
  company: string;
  focus: string;
  period: string;
  summary: string;
  impact: string[];
  stack: string[];
  accent: string;
};

export type EducationItem = {
  id: string;
  program: string;
  institution: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  accent: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  accent: string;
};

export type PortfolioContent = {
  projects: Project[];
  workExperiences: WorkExperience[];
  education: EducationItem[];
  certifications: Certification[];
};

export const defaultPortfolioContent: PortfolioContent = {
  projects: [
    {
      id: "nusaculture",
      title: "NusaCulture",
      description:
        "An Indonesian culture exploration platform with a visual carousel, interactive map, bilingual content, favorites, and quizzes to make cultural learning feel more engaging.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "React Player"],
      signal: "Interactive cultural learning",
      image: "/project-nusaculture.webp",
      githubUrl: "https://github.com/abdul091006/NusaCulture",
      accent: "#f7c948",
    },
    {
      id: "indonate",
      title: "Indonate",
      description:
        "A crowdfunding backend for donation campaigns, covering JWT authentication, campaign CRUD, transactions, Midtrans Sandbox payment URLs, and payment status webhooks.",
      stack: ["Go", "Gin", "GORM", "MySQL", "Midtrans"],
      signal: "Donation payment flow",
      image: "/project-indonate.webp",
      githubUrl: "https://github.com/abdul091006/donation",
      accent: "#fb7185",
    },
    {
      id: "courseforge-lms",
      title: "CourseForge LMS",
      description:
        "A Payload CMS-based learning management system with a course builder, video and quiz modules, participation tracking, and certificate route for an end-to-end learning flow.",
      stack: ["Next.js", "Payload CMS", "PostgreSQL", "TypeScript", "Puppeteer"],
      signal: "Modular course engine",
      image: "/project-courseforge-lms.webp",
      githubUrl: "https://github.com/abdul091006/lms-youtube",
      accent: "#a3e635",
    },
    {
      id: "assetvault-dam",
      title: "AssetVault DAM",
      description:
        "A digital asset management workspace for uploads, folders, tags, search, asset details, and user-scoped access with S3 storage integration.",
      stack: ["Next.js", "Payload CMS", "S3", "PostgreSQL", "TypeScript"],
      signal: "User-scoped media ops",
      image: "/project-assetvault-dam.webp",
      githubUrl: "https://github.com/abdul091006/DAM-app",
      accent: "#38bdf8",
    },
    {
      id: "clipper-ai",
      title: "Clipper AI",
      description:
        "An AI video clipping pipeline that turns long YouTube videos into portrait shorts with subtitles, moment ranking, captions, and downloadable artifacts.",
      stack: ["Node.js", "Go", "Python", "FFmpeg", "Docker"],
      signal: "Async AI video pipeline",
      image: "/project-clipper-ai.webp",
      githubUrl: "https://github.com/abdul091006/clipper_ai",
      accent: "#ff6658",
    },
    {
      id: "manga-recap-ai",
      title: "Manga Recap AI",
      description:
        "An AI studio for turning manga chapters into full recap videos and shorts, with series memory, source upload, queue jobs, and progress dashboard.",
      stack: ["Next.js", "Go Fiber", "Python", "MinIO", "Gemini"],
      signal: "Story-memory recap pipeline",
      image: "/project-manga-recap-ai.webp",
      githubUrl: "https://github.com/abdul091006/manga_recap_ai",
      accent: "#ff5f4f",
    },
  ],
  workExperiences: [
    {
      id: "software-engineer-data-andalan-utama",
      role: "Software Engineer",
      company: "PT Data Andalan Utama",
      focus: "Enterprise ERP Development",
      period: "Mar 2026 - Present",
      summary:
        "Focused on enterprise application development and customization using ERPNext and the Frappe Framework.",
      impact: [
        "Developed and maintained backend functionality, integrations, and data processing workflows to support business operations.",
        "Participated in system analysis, implementation, and optimization to keep ERP solutions scalable and maintainable.",
        "Worked with cross-functional teams to deliver software aligned with client and business requirements.",
      ],
      stack: [
        "Frappe Framework",
        "ERPNext",
        "Python",
        "Backend Development",
        "Enterprise Systems",
      ],
      accent: "#22d3ee",
    },
    {
      id: "software-engineer-internship-data-andalan-utama",
      role: "Software Engineer Internship",
      company: "PT Data Andalan Utama",
      focus: "Full-stack Web Development",
      period: "May 2025 - Feb 2026",
      summary:
        "Learned and worked with modern web technologies such as Payload CMS, Next.js, Frappe Framework, and ERPNext.",
      impact: [
        "Developed mini projects during the internship to strengthen problem-solving skills and practical full-stack development experience.",
        "Handled backend implementation, feature enhancements, bug fixing, and system customization tasks.",
        "Built practical understanding of headless stacks, enterprise workflows, and maintainable web application architecture.",
      ],
      stack: [
        "Payload CMS",
        "Next.js",
        "Frappe Framework",
        "ERPNext",
        "Full-stack Development",
      ],
      accent: "#bef264",
    },
  ],
  education: [
    {
      id: "smkn-7-semarang",
      program: "Information Systems, Networking, and Applications",
      institution: "SMKN 7 Semarang",
      period: "2022 - 2026",
      type: "Formal Education",
      summary:
        "Vocational education focused on information systems, networking, and application development.",
      highlights: [
        "Contributed to developing a website for alumni data management.",
        "Contributed to developing the student council election website.",
      ],
      accent: "#22d3ee",
    },
    {
      id: "smkdev-gits-academy",
      program: "Full-stack Developer",
      institution: "SMKDEV X GITS Academy",
      period: "Jun 2024 - Sept 2024",
      type: "Informal Education",
      summary:
        "Learned full-stack web development, starting with frontend development using Next.js and continuing with backend development using Golang.",
      highlights: [
        "Collaborated on a final group project by implementing a web application based on a provided UI/UX design.",
      ],
      accent: "#a3e635",
    },
    {
      id: "samsung-innovation-campus",
      program: "Artificial Intelligence & Internet of Things",
      institution: "Samsung Innovation Campus",
      period: "Jan 2025 - Apr 2025",
      type: "Informal Education",
      summary:
        "Studied AI and IoT fundamentals, including basic Python programming, IoT simulation, design thinking, project planning, and ESP32 prototyping.",
      highlights: [
        "Practiced hardware prototyping and project planning for AI and IoT-based solutions.",
      ],
      accent: "#38bdf8",
    },
    {
      id: "sanber-campus-itb",
      program: "Artificial Intelligence",
      institution: "Sanber Campus X ITB",
      period: "Feb 2025 - Jun 2025",
      type: "Informal Education",
      summary:
        "Learned AI and data science fundamentals, including Python, statistics, data analysis, SQL, machine learning, NLP, and LLM prompt engineering.",
      highlights: [
        "Practiced data manipulation, visualization, model evaluation, text preprocessing, semantic search, RAG concepts, version control, and deployment workflows.",
      ],
      accent: "#d946ef",
    },
  ],
  certifications: [
    {
      id: "bnsp-junior-web-developer",
      title: "Junior Web Developer",
      issuer: "BNSP / LSP Teknologi Digital",
      date: "Dec 2022",
      image: "/cert-bnsp-junior-web-developer.webp",
      accent: "#22d3ee",
    },
    {
      id: "smkdev-gits-academy",
      title: "Full-stack Developer Course Completed",
      issuer: "SMKDEV X GITS Academy",
      date: "Sept 2024",
      image: "/cert-smkdev-gits-academy.webp",
      accent: "#f59e0b",
    },
    {
      id: "udemy-go-lang",
      title: "Pemrograman Go-Lang: Pemula sampai Mahir",
      issuer: "Udemy",
      date: "Dec 2024",
      image: "/cert-udemy-go-lang.webp",
      accent: "#a855f7",
    },
    {
      id: "dicoding-aws-cloud",
      title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
      issuer: "Dicoding Indonesia",
      date: "Dec 2024",
      image: "/cert-dicoding-aws-cloud.webp",
      accent: "#38bdf8",
    },
    {
      id: "dicoding-dasar-ai",
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia",
      date: "Feb 2025",
      image: "/cert-dicoding-dasar-ai.webp",
      accent: "#22d3ee",
    },
    {
      id: "dicoding-machine-learning-pemula",
      title: "Belajar Machine Learning untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "Feb 2025",
      image: "/cert-dicoding-machine-learning-pemula.webp",
      accent: "#14b8a6",
    },
    {
      id: "dicoding-python",
      title: "Memulai Pemrograman dengan Python",
      issuer: "Dicoding Indonesia",
      date: "Jan 2025",
      image: "/cert-dicoding-python.webp",
      accent: "#facc15",
    },
    {
      id: "dicoding-visualisasi-data",
      title: "Belajar Dasar Visualisasi Data",
      issuer: "Dicoding Indonesia",
      date: "Jan 2025",
      image: "/cert-dicoding-visualisasi-data.webp",
      accent: "#38bdf8",
    },
    {
      id: "dicoding-javascript",
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding Indonesia",
      date: "Nov 2022",
      image: "/cert-dicoding-javascript.webp",
      accent: "#f7df1e",
    },
    {
      id: "dicoding-react",
      title: "Belajar Membuat Aplikasi Web dengan React",
      issuer: "Dicoding Indonesia",
      date: "Jan 2023",
      image: "/cert-dicoding-react.webp",
      accent: "#61dafb",
    },
    {
      id: "dicoding-web-pemrograman",
      title: "Belajar Dasar Pemrograman Web",
      issuer: "Dicoding Indonesia",
      date: "Oct 2022",
      image: "/cert-dicoding-web-pemrograman.webp",
      accent: "#bef264",
    },
  ],
};

function createId(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || fallback;
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeColor(value: unknown, fallback: string) {
  const color = String(value ?? "").trim();

  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return color;
  }

  return fallback;
}

function normalizeUrl(value: unknown) {
  const url = String(value ?? "").trim();

  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:"
      ? parsedUrl.toString()
      : "";
  } catch {
    return "";
  }
}

export function normalizePortfolioContent(input: unknown): PortfolioContent {
  const source =
    input && typeof input === "object"
      ? (input as Partial<PortfolioContent>)
      : defaultPortfolioContent;

  const projectsSource = Array.isArray(source.projects)
    ? source.projects
    : defaultPortfolioContent.projects;
  const workSource = Array.isArray(source.workExperiences)
    ? source.workExperiences
    : defaultPortfolioContent.workExperiences;
  const educationSource = Array.isArray(source.education)
    ? source.education
    : defaultPortfolioContent.education;
  const certificationSource = Array.isArray(source.certifications)
    ? source.certifications
    : defaultPortfolioContent.certifications;

  return {
    projects: projectsSource.map((project, index) => ({
      id: createId(
        String(project.id || project.title || ""),
        `project-${index + 1}`,
      ),
      title: String(project.title ?? "").trim() || `Project ${index + 1}`,
      description: String(project.description ?? "").trim(),
      stack: normalizeStringArray(project.stack),
      signal: String(project.signal ?? "").trim() || "Technical build",
      image: String(project.image ?? "").trim() || "/project-nusaculture.webp",
      githubUrl: normalizeUrl(project.githubUrl),
      accent: normalizeColor(project.accent, "#22d3ee"),
    })),
    workExperiences: workSource.map((item, index) => ({
      id: createId(
        String(item.id || `${item.role}-${item.company}` || ""),
        `experience-${index + 1}`,
      ),
      role: String(item.role ?? "").trim() || `Role ${index + 1}`,
      company: String(item.company ?? "").trim() || "Company",
      focus: String(item.focus ?? "").trim() || "Engineering",
      period: String(item.period ?? "").trim() || "Present",
      summary: String(item.summary ?? "").trim(),
      impact: normalizeStringArray(item.impact),
      stack: normalizeStringArray(item.stack),
      accent: normalizeColor(item.accent, "#22d3ee"),
    })),
    education: educationSource.map((item, index) => ({
      id: createId(
        String(item.id || `${item.program}-${item.institution}` || ""),
        `education-${index + 1}`,
      ),
      program: String(item.program ?? "").trim() || `Program ${index + 1}`,
      institution: String(item.institution ?? "").trim() || "Institution",
      period: String(item.period ?? "").trim() || "Present",
      type: String(item.type ?? "").trim() || "Education",
      summary: String(item.summary ?? "").trim(),
      highlights: normalizeStringArray(item.highlights),
      accent: normalizeColor(item.accent, "#22d3ee"),
    })),
    certifications: certificationSource.map((item, index) => ({
      id: createId(
        String(item.id || `${item.title}-${item.issuer}` || ""),
        `certification-${index + 1}`,
      ),
      title: String(item.title ?? "").trim() || `Certification ${index + 1}`,
      issuer: String(item.issuer ?? "").trim() || "Credential issuer",
      date: String(item.date ?? "").trim() || "Issued",
      image:
        String(item.image ?? "").trim() ||
        "/cert-bnsp-junior-web-developer.webp",
      accent: normalizeColor(item.accent, "#22d3ee"),
    })),
  };
}
