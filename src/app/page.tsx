import Image from "next/image";
import { connection } from "next/server";
import { getPortfolioContent } from "@/lib/portfolio-store";
import type { WorkExperience } from "@/lib/portfolio-content";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  Mail,
  MapPin,
  Phone,
  Terminal,
} from "lucide-react";
import type { CSSProperties } from "react";
import {
  siErpnext,
  siFrappe,
  siGit,
  siGo,
  siGithub,
  siMysql,
  siNextdotjs,
  siPayloadcms,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

type TechStackItem = {
  label: string;
  category: string;
  icon: SimpleIcon;
  color: string;
};

type CyberStyle = CSSProperties & Record<`--${string}`, string>;

const techStack: TechStackItem[] = [
  { label: "Python", category: "Language", icon: siPython, color: "#3776ab" },
  {
    label: "Next.js",
    category: "Framework",
    icon: siNextdotjs,
    color: "#f8fbff",
  },
  { label: "Golang", category: "Language", icon: siGo, color: "#00add8" },
  {
    label: "Frappe Framework",
    category: "Enterprise",
    icon: siFrappe,
    color: "#0089ff",
  },
  {
    label: "ERPNext",
    category: "ERP",
    icon: siErpnext,
    color: "#5e64ff",
  },
  {
    label: "Payload CMS",
    category: "Headless CMS",
    icon: siPayloadcms,
    color: "#f8fbff",
  },
  {
    label: "TypeScript",
    category: "Language",
    icon: siTypescript,
    color: "#3178c6",
  },
  { label: "React", category: "UI", icon: siReact, color: "#61dafb" },
  {
    label: "Tailwind CSS",
    category: "Styling",
    icon: siTailwindcss,
    color: "#06b6d4",
  },
  { label: "MySQL", category: "Database", icon: siMysql, color: "#4479a1" },
  {
    label: "PostgreSQL",
    category: "Database",
    icon: siPostgresql,
    color: "#4169e1",
  },
  { label: "Git", category: "Versioning", icon: siGit, color: "#f05032" },
];

const codeRainColumns = [
  "0101<TS/>AUTH{}NEXT",
  "API::QUEUE::CACHE",
  "npm run build --strict",
  "CI/CD_GREEN_204",
  "git push origin main",
  "POST /api/portfolio 200",
  "SELECT * FROM systems",
  "deploy --zero-downtime",
  "JWT::SESSION::LOCKED",
  "trace_id=cyber_494",
  "use client // armed",
  "pnpm lint && build",
  "edge.signal.accepted",
  "cache.hit=true",
  "ship_secure_ui()",
  "VECTOR_INDEX_READY",
];

const signalItems = [
  "Frappe Framework",
  "ERPNext customization",
  "Backend workflows",
  "Headless web stacks",
  "Fast-learning engineer",
];

const signalLoop = Array.from({ length: 4 }, () => signalItems).flat();

const techRows = [
  techStack.slice(0, 8),
  [...techStack].slice(5, 13).reverse(),
  [
    ...techStack.slice(2, 6),
    ...techStack.slice(9, 13),
  ],
];

const linkedInLogoPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const profile = {
  name: "Muhammad Abdulrozak Ramadhani",
  email: "muhammaddhani494@gmail.com",
  phone: "+62 813-9213-7867",
  location: "Semarang City, Central Java, Indonesia",
  github: "https://github.com/abdul091006",
  linkedin: "https://www.linkedin.com/in/abdulrzz",
};

function groupWorkExperiences(workExperiences: WorkExperience[]) {
  return workExperiences.reduce<
    Array<{ company: string; roles: WorkExperience[] }>
  >((groups, item) => {
    const existingGroup = groups.find((group) => group.company === item.company);

    if (existingGroup) {
      existingGroup.roles.push(item);
      return groups;
    }

    groups.push({ company: item.company, roles: [item] });
    return groups;
  }, []);
}

function createRainStyle(index: number): CyberStyle {
  return {
    "--x": `${(index * 6.7) % 100}%`,
    "--duration": `${8 + (index % 6) * 1.7}s`,
    "--delay": `${index * -0.62}s`,
    "--size": `${11 + (index % 3)}px`,
  };
}

function MatrixRain() {
  return (
    <div className="matrix-rain pointer-events-none absolute inset-0" aria-hidden="true">
      {codeRainColumns.map((column, index) => (
        <span
          key={`${column}-${index}`}
          className="matrix-column"
          style={createRainStyle(index)}
        >
          {column}
        </span>
      ))}
    </div>
  );
}

function TechIcon({ item }: { item: TechStackItem }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${item.label} logo`}
      className="size-8"
      style={{ color: item.color }}
    >
      <path d={item.icon.path} fill="currentColor" />
    </svg>
  );
}

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path d={path} fill="currentColor" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs uppercase text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 text-base leading-7 text-slate-300">
        {description}
      </p>
    </div>
  );
}

function AngledPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`data-panel clip-corner relative overflow-hidden border border-cyan-300/20 bg-black/55 shadow-[0_0_40px_rgba(0,245,255,0.08)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export default async function Home() {
  await connection();

  const { projects, workExperiences, education, certifications } =
    await getPortfolioContent();
  const experienceGroups = groupWorkExperiences(workExperiences);
  const emailHref = `mailto:${profile.email}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <header className="cyber-header fixed inset-x-0 top-0 z-50 border-b border-cyan-300/15 bg-[#05070d]/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a
            href="#top"
            className="flex items-center gap-3 font-mono text-sm text-white"
            aria-label="Software engineer portfolio home"
          >
            <span className="grid size-8 place-items-center rounded-sm border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
              <Terminal className="size-4" aria-hidden="true" />
            </span>
            <span>ABDUL//PORTFOLIO</span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-cyan-200" href="#introduction">
              Intro
            </a>
            <a className="transition hover:text-cyan-200" href="#projects">
              Projects
            </a>
            <a className="transition hover:text-cyan-200" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-cyan-200" href="#education">
              Education
            </a>
            <a className="transition hover:text-cyan-200" href="#certification">
              Certification
            </a>
            <a className="transition hover:text-cyan-200" href="#stack">
              Stack
            </a>
            <a className="transition hover:text-cyan-200" href="#contact">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              title="GitHub"
              className="icon-button grid size-9 place-items-center rounded-sm border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <BrandIcon path={siGithub.path} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              title="LinkedIn"
              className="icon-button grid size-9 place-items-center rounded-sm border border-white/10 bg-white/5 text-[#0A66C2] transition hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <BrandIcon path={linkedInLogoPath} />
            </a>
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="relative flex min-h-[88svh] items-center justify-center overflow-hidden pt-16"
      >
        <Image
          src="/cyber-command-center.webp"
          alt="Cyberpunk software engineering command center"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(5,7,13,0.78),rgba(5,7,13,0.92)_58%,#05070d_100%)]" />
        <div className="hero-symmetry-field absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 cyber-scan opacity-45" />
        <MatrixRain />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-16 text-center md:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase text-cyan-200">
              <span className="border border-cyan-300/40 bg-cyan-300/10 px-3 py-2">
                Enterprise systems
              </span>
              <span className="border border-fuchsia-400/35 bg-fuchsia-400/10 px-3 py-2 text-fuchsia-200">
                Backend-focused
              </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              <span className="glitch-text block" data-text={profile.name}>
                {profile.name}
              </span>
              <span className="glitch-text block text-cyan-200" data-text="Software Engineer">
                Software Engineer
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Results-driven Software Engineer specializing in backend
              development, enterprise systems, and custom web architectures with
              Frappe Framework, ERPNext, and modern headless stacks.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#projects"
                className="primary-action inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-cyan-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.35)] transition hover:bg-lime-300"
              >
                View projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={emailHref}
                className="ghost-action inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-fuchsia-300/45 bg-black/35 px-5 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-200 hover:bg-fuchsia-300/10"
              >
                Contact me
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-cyan-300/15 bg-[#071019] py-5">
        <div className="signal-rail flex min-w-max font-mono text-xs uppercase text-slate-300">
          {[...signalLoop, ...signalLoop].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="signal-token inline-flex items-center gap-3 whitespace-nowrap px-5"
            >
              <span className="size-1.5 bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        className="cyber-section intro-section relative px-5 py-20 md:px-8"
        id="introduction"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1fr]">
            <div className="intro-portrait-frame mx-auto w-full max-w-xl">
              <Image
                src="/portrait-original-cutout-hd.webp"
                alt={`${profile.name} portrait`}
                width={1600}
                height={1600}
                unoptimized
                className="intro-portrait-image"
              />
            </div>

            <div className="intro-copy text-center">
              <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                {profile.name}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                I am a results-driven Software Engineer with professional
                experience in backend development, enterprise systems, and
                custom web architectures. My work focuses on designing,
                developing, and deploying scalable applications with Frappe
                Framework, ERPNext, Payload CMS, Next.js, Golang, and Python
                while learning new business logic quickly and turning it into
                reliable software.
              </p>
              <div className="mx-auto mt-6 grid max-w-3xl gap-3 font-mono text-xs text-slate-300 sm:grid-cols-2">
                <span className="inline-flex items-center justify-center gap-2 border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-center">
                  <MapPin className="size-4 text-cyan-200" aria-hidden="true" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center justify-center gap-2 border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-center">
                  <Phone className="size-4 text-cyan-200" aria-hidden="true" />
                  {profile.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="cyber-section border-y border-cyan-300/15 bg-[#090b12] px-5 py-20 md:px-8"
        id="projects"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow="Selected builds"
              title="Projects that show practical full-stack problem solving."
              description="Each build highlights the systems I like working on: data flows, clean interfaces, backend reliability, and developer-friendly architecture."
            />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-sm border border-lime-300/40 bg-lime-300/10 px-4 text-sm font-semibold text-lime-100 transition hover:border-lime-200 hover:bg-lime-300/20"
            >
              GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.githubUrl || "#projects"}
                target={project.githubUrl ? "_blank" : undefined}
                rel={project.githubUrl ? "noreferrer" : undefined}
                aria-label={`Open ${project.title} GitHub repository`}
                className="project-card cyber-card clip-corner flex min-h-[430px] flex-col border border-cyan-300/20 bg-[#07111d] p-0 transition hover:-translate-y-1 hover:border-fuchsia-300/45 hover:shadow-[0_20px_60px_rgba(217,70,239,0.12)]"
                style={{ "--accent": project.accent } as CyberStyle}
              >
                <div className="project-visual relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="project-visual-overlay" aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-6 flex items-center justify-between gap-4 border-b border-cyan-300/15 pb-4">
                    <p className="font-mono text-xs uppercase text-cyan-200">
                      {project.signal}
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase text-lime-200">
                      Repository
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold leading-8 text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1.5 font-mono text-xs text-cyan-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cyber-section experience-section px-5 py-20 md:px-8"
        id="experience"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Work experience"
            title="Work Experiences"
            description="This section follows my hands-on backend projects, integrations, and maintainable enterprise workflows."
          />

          <div className="mt-10 space-y-6">
            {experienceGroups.map((group, groupIndex) => (
              <article
                key={group.company}
                className="experience-company clip-corner grid gap-6 border border-cyan-300/20 bg-[#07111d] p-5 md:p-6 lg:grid-cols-[220px_1fr]"
                style={
                  {
                    "--accent": group.roles[0]?.accent ?? "#22d3ee",
                  } as CyberStyle
                }
              >
                <div className="experience-company-meta">
                    <span>0{groupIndex + 1}</span>
                  <h3>{group.company}</h3>
                  <p>
                    {group.roles.length > 1
                      ? `${group.roles.length} connected roles`
                      : "1 focused role"}
                  </p>
                </div>

                <div className="experience-role-list">
                  {group.roles.map((item) => (
                    <div
                      key={`${item.role}-${item.period}`}
                      className="experience-role"
                      style={{ "--accent": item.accent } as CyberStyle}
                    >
                      <div className="experience-role-head">
                        <div>
                          <p className="font-mono text-xs uppercase text-cyan-200">
                            {item.focus}
                          </p>
                          <h4>{item.role}</h4>
                        </div>
                        <span>{item.period}</span>
                      </div>

                      <p className="experience-summary">{item.summary}</p>

                      <div className="experience-impact-grid">
                        {item.impact.map((impact) => (
                          <p key={impact} className="experience-impact">
                            {impact}
                          </p>
                        ))}
                      </div>

                      <div className="experience-stack">
                        {item.stack.map((stack) => (
                          <span key={stack}>{stack}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cyber-section education-section border-y border-cyan-300/15 bg-[#090b12] px-5 py-20 md:px-8"
        id="education"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Education & training"
            title="A vocational foundation reinforced by full-stack, AI, and IoT programs."
            description="Formal and informal education, focused on information systems, application development, Python, Golang, Next.js, and AI"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {education.map((item, index) => (
              <article
                key={item.id}
                className="education-card clip-corner border border-cyan-300/20 bg-[#07111d] p-5"
                style={{ "--accent": item.accent } as CyberStyle}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase text-cyan-200">
                      {item.type}
                      {" // "}
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-8 text-white">
                      {item.institution}
                    </h3>
                  </div>
                  <BookOpen className="size-5 text-lime-200" aria-hidden="true" />
                </div>

                <p className="mt-3 font-mono text-xs uppercase text-lime-200">
                  {item.period}
                </p>
                <h4 className="mt-4 text-lg font-semibold text-white">
                  {item.program}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.summary}
                </p>

                <div className="mt-5 grid gap-3">
                  {item.highlights.map((highlight) => (
                    <p key={highlight} className="education-highlight">
                      {highlight}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cyber-section certification-section px-5 py-20 md:px-8"
        id="certification"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Certification"
            title="Verified learning milestones and competency proof."
            description="Certificates, covering web development, cloud fundamentals, AI, machine learning, data visualization, Python, JavaScript, React, Golang, and full-stack training."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification, index) => (
              <article
                key={certification.id}
                className="cert-card clip-corner border border-cyan-300/20 bg-[#07111d]"
                style={{ "--accent": certification.accent } as CyberStyle}
              >
                <div className="cert-visual relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={certification.image}
                    alt={`${certification.title} certificate`}
                    fill
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 47vw, 100vw"
                    className="object-contain p-3"
                  />
                  <div className="cert-scanline" aria-hidden="true" />
                </div>

                <div className="cert-content">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="font-mono text-xs uppercase text-cyan-200">
                      {certification.issuer}
                      {" // "}
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <Award
                      className="size-5 shrink-0 text-lime-200"
                      aria-hidden="true"
                    />
                  </div>

                  <h3>{certification.title}</h3>
                  <p>{certification.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cyber-section tech-section border-y border-cyan-300/15 bg-[#071019] px-5 py-20 md:px-8"
        id="stack"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <Bot className="size-5 text-cyan-200" aria-hidden="true" />
              <p className="font-mono text-xs uppercase text-cyan-300">
                Stack matrix
              </p>
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              A stack shaped by project work.
            </h2>
            <p className="mx-auto mt-4 text-base leading-7 text-slate-300">
              Backend, ERP, headless CMS, frontend, database, and AI
              fundamentals that support practical software delivery.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {techRows.map((row, rowIndex) => (
              <div
                key={`tech-row-${rowIndex}`}
                className={`tech-marquee ${
                  rowIndex % 2 === 1 ? "tech-marquee-reverse" : ""
                }`}
              >
                <div className="tech-track">
                  {[...row, ...row].map((item, index) => (
                    <div
                      key={`${item.label}-${rowIndex}-${index}`}
                      className="tech-card"
                      style={{ "--accent": item.color } as CyberStyle}
                    >
                      <TechIcon item={item} />
                      <div>
                        <p>{item.label}</p>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cyber-section relative px-5 py-20 md:px-8" id="contact">
        <div className="relative mx-auto max-w-7xl">
          <AngledPanel className="grid gap-8 p-6 text-center md:p-8 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase text-fuchsia-200">
                Open channel
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Let&apos;s build reliable software with clear business value.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
                I am open to software engineering opportunities, backend and
                enterprise system work, custom web architectures, and practical
                full-stack product development.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 font-mono text-xs text-slate-300">
                <span className="border border-cyan-300/20 bg-cyan-300/5 px-3 py-2">
                  {profile.email}
                </span>
                <span className="border border-cyan-300/20 bg-cyan-300/5 px-3 py-2">
                  {profile.phone}
                </span>
              </div>
            </div>

            <a
              href={emailHref}
              className="primary-action mx-auto inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-fuchsia-300 px-5 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(217,70,239,0.28)] transition hover:bg-cyan-300"
            >
              Email me
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </AngledPanel>
        </div>
      </section>
    </main>
  );
}
