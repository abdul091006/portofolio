"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  FolderGit,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import {
  defaultPortfolioContent,
  type PortfolioContent,
  type Project,
  type WorkExperience,
} from "@/lib/portfolio-content";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type DashboardTab = "projects" | "experience";

const inputClass =
  "h-11 w-full rounded-sm border border-cyan-300/20 bg-[#050914] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15";
const textAreaClass =
  "min-h-28 w-full resize-y rounded-sm border border-cyan-300/20 bg-[#050914] px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15";

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.replace(/^\s+/, ""));
}

function splitLines(value: string) {
  return value.split("\n");
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function createBlankProject(): Project {
  return {
    id: createId("project"),
    title: "New Project",
    description: "",
    stack: ["Next.js", "TypeScript"],
    signal: "Technical build",
    image: "/project-nusaculture.webp",
    githubUrl: "https://github.com/abdul091006/new-project",
    accent: "#22d3ee",
  };
}

function createBlankExperience(): WorkExperience {
  return {
    id: createId("experience"),
    role: "Software Engineer",
    company: "Company Name",
    focus: "Product Engineering",
    period: "2026 - Present",
    summary: "",
    impact: ["Built production-ready features with a clean structure."],
    stack: ["Next.js", "TypeScript"],
    accent: "#22d3ee",
  };
}

function DashboardPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`clip-corner border border-cyan-300/20 bg-[#07111d] shadow-[0_0_40px_rgba(34,211,238,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "url";
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.68rem] uppercase text-cyan-200">
        {label}
      </span>
      <input
        className={inputClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.68rem] uppercase text-cyan-200">
        {label}
      </span>
      <textarea
        className={textAreaClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function ColorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.68rem] uppercase text-cyan-200">
        Accent
      </span>
      <div className="flex gap-2">
        <input
          aria-label="Accent color"
          className="h-11 w-14 rounded-sm border border-cyan-300/20 bg-[#050914] p-1"
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          className={inputClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
}

export default function PortfolioDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>("projects");
  const [content, setContent] = useState<PortfolioContent>(
    defaultPortfolioContent,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("Loading portfolio data...");

  const stats = useMemo(
    () => [
      { label: "Projects", value: content.projects.length },
      { label: "Experience", value: content.workExperiences.length },
      {
        label: "GitHub links",
        value: content.projects.filter((project) => project.githubUrl).length,
      },
    ],
    [content],
  );

  useEffect(() => {
    let ignore = false;

    async function loadContent() {
      try {
        const response = await fetch("/api/portfolio", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const payload = (await response.json()) as PortfolioContent;

        if (!ignore) {
          setContent(payload);
          setMessage("Dashboard online");
        }
      } catch {
        if (!ignore) {
          setContent(defaultPortfolioContent);
          setMessage("Using default local data");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      ignore = true;
    };
  }, []);

  function updateProject<K extends keyof Project>(
    id: string,
    key: K,
    value: Project[K],
  ) {
    setContent((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, [key]: value } : project,
      ),
    }));
  }

  function updateExperience<K extends keyof WorkExperience>(
    id: string,
    key: K,
    value: WorkExperience[K],
  ) {
    setContent((current) => ({
      ...current,
      workExperiences: current.workExperiences.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addProject() {
    setContent((current) => ({
      ...current,
      projects: [...current.projects, createBlankProject()],
    }));
  }

  function addExperience() {
    setContent((current) => ({
      ...current,
      workExperiences: [...current.workExperiences, createBlankExperience()],
    }));
  }

  function removeProject(id: string) {
    setContent((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }));
  }

  function removeExperience(id: string) {
    setContent((current) => ({
      ...current,
      workExperiences: current.workExperiences.filter((item) => item.id !== id),
    }));
  }

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("Saving...");

    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const payload = (await response.json()) as PortfolioContent;
      setContent(payload);
      setMessage("Saved to portfolio-content.json");
    } catch {
      setMessage("Save failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="cyber-section size-full" />
      </div>

      <form
        onSubmit={saveContent}
        className="relative mx-auto grid w-full max-w-7xl gap-6 px-5 py-6 md:px-8"
      >
        <header className="sticky top-0 z-30 -mx-5 border-b border-cyan-300/15 bg-[#05070d]/92 px-5 py-4 backdrop-blur-xl md:-mx-8 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="icon-button grid size-10 place-items-center rounded-sm border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 transition hover:border-cyan-200"
                aria-label="Back to portfolio"
                title="Back"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
              <div>
                <p className="font-mono text-xs uppercase text-cyan-300">
                  Admin console
                </p>
                <h1 className="text-2xl font-semibold text-white md:text-3xl">
                  Portfolio Dashboard
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-cyan-300/20 bg-[#07111d] px-3 py-2 font-mono text-xs uppercase text-slate-300">
                {isLoading ? "Syncing" : message}
              </span>
              <button
                type="button"
                onClick={() => setContent(defaultPortfolioContent)}
                className="ghost-action inline-flex h-10 items-center gap-2 rounded-sm border border-fuchsia-300/35 bg-fuchsia-300/10 px-3 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-200"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Reset
              </button>
              <button
                type="button"
                onClick={logout}
                className="ghost-action inline-flex h-10 items-center gap-2 rounded-sm border border-rose-300/35 bg-rose-300/10 px-3 text-sm font-semibold text-rose-100 transition hover:border-rose-200"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Logout
              </button>
              <button
                type="submit"
                disabled={isSaving || isLoading}
                className="primary-action inline-flex h-10 items-center gap-2 rounded-sm bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="size-4" aria-hidden="true" />
                )}
                Save
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
          <aside className="grid h-fit gap-4 lg:sticky lg:top-28">
            <DashboardPanel className="p-4">
              <div className="grid gap-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border border-white/10 bg-[#050914] px-3 py-3"
                  >
                    <span className="font-mono text-xs uppercase text-slate-400">
                      {stat.label}
                    </span>
                    <span className="font-mono text-lg text-cyan-200">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </DashboardPanel>

            <DashboardPanel className="grid gap-2 p-3">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`flex h-11 items-center gap-2 rounded-sm px-3 text-left text-sm font-semibold transition ${
                  activeTab === "projects"
                    ? "bg-cyan-300 text-slate-950"
                    : "bg-[#050914] text-slate-300 hover:text-cyan-200"
                }`}
              >
                <FolderGit className="size-4" aria-hidden="true" />
                Projects
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("experience")}
                className={`flex h-11 items-center gap-2 rounded-sm px-3 text-left text-sm font-semibold transition ${
                  activeTab === "experience"
                    ? "bg-cyan-300 text-slate-950"
                    : "bg-[#050914] text-slate-300 hover:text-cyan-200"
                }`}
              >
                <BriefcaseBusiness className="size-4" aria-hidden="true" />
                Experience
              </button>
            </DashboardPanel>
          </aside>

          <div className="grid gap-5">
            {activeTab === "projects" ? (
              <DashboardPanel className="p-4 md:p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase text-cyan-300">
                      Project registry
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Selected Projects
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addProject}
                    className="ghost-action inline-flex h-10 w-fit items-center gap-2 rounded-sm border border-cyan-300/35 bg-cyan-300/10 px-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add Project
                  </button>
                </div>

                <div className="grid gap-4">
                  {content.projects.map((project, index) => (
                    <article
                      key={project.id}
                      className="clip-corner border border-cyan-300/15 bg-[#08131f] p-4"
                      style={{ "--accent": project.accent } as React.CSSProperties}
                    >
                      <div className="mb-4 flex flex-col gap-3 border-b border-cyan-300/10 pb-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center border border-cyan-300/35 bg-cyan-300/10 font-mono text-xs text-cyan-200">
                            {formatIndex(index)}
                          </span>
                          <div>
                            <h3 className="font-semibold text-white">
                              {project.title || "Untitled Project"}
                            </h3>
                            <p className="font-mono text-xs uppercase text-slate-500">
                              {project.signal || "Technical build"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="icon-button grid size-9 place-items-center rounded-sm border border-lime-300/30 bg-lime-300/10 text-lime-100 transition hover:border-lime-200"
                              aria-label={`Open ${project.title} GitHub URL`}
                              title="Open GitHub URL"
                            >
                              <ExternalLink
                                className="size-4"
                                aria-hidden="true"
                              />
                            </a>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => removeProject(project.id)}
                            className="icon-button grid size-9 place-items-center rounded-sm border border-rose-300/30 bg-rose-300/10 text-rose-100 transition hover:border-rose-200"
                            aria-label={`Remove ${project.title}`}
                            title="Remove"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Field
                          label="Title"
                          value={project.title}
                          onChange={(value) =>
                            updateProject(project.id, "title", value)
                          }
                          required
                        />
                        <Field
                          label="Signal"
                          value={project.signal}
                          onChange={(value) =>
                            updateProject(project.id, "signal", value)
                          }
                        />
                        <Field
                          label="Image path"
                          value={project.image}
                          onChange={(value) =>
                            updateProject(project.id, "image", value)
                          }
                          placeholder="/project-nusaculture.webp"
                        />
                        <Field
                          label="GitHub URL"
                          value={project.githubUrl}
                          onChange={(value) =>
                            updateProject(project.id, "githubUrl", value)
                          }
                          placeholder="https://github.com/username/repo"
                          type="url"
                          required
                        />
                        <ColorField
                          value={project.accent}
                          onChange={(value) =>
                            updateProject(project.id, "accent", value)
                          }
                        />
                        <TextArea
                          label="Stack"
                          value={project.stack.join(", ")}
                          onChange={(value) =>
                            updateProject(project.id, "stack", splitList(value))
                          }
                          placeholder="Next.js, TypeScript, PostgreSQL"
                        />
                        <div className="md:col-span-2">
                          <TextArea
                            label="Description"
                            value={project.description}
                            onChange={(value) =>
                              updateProject(project.id, "description", value)
                            }
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </DashboardPanel>
            ) : (
              <DashboardPanel className="p-4 md:p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase text-cyan-300">
                      Work timeline
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Experience
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="ghost-action inline-flex h-10 w-fit items-center gap-2 rounded-sm border border-cyan-300/35 bg-cyan-300/10 px-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add Role
                  </button>
                </div>

                <div className="grid gap-4">
                  {content.workExperiences.map((item, index) => (
                    <article
                      key={item.id}
                      className="clip-corner border border-cyan-300/15 bg-[#08131f] p-4"
                    >
                      <div className="mb-4 flex flex-col gap-3 border-b border-cyan-300/10 pb-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center border border-cyan-300/35 bg-cyan-300/10 font-mono text-xs text-cyan-200">
                            {formatIndex(index)}
                          </span>
                          <div>
                            <h3 className="font-semibold text-white">
                              {item.role || "Untitled Role"}
                            </h3>
                            <p className="font-mono text-xs uppercase text-slate-500">
                              {item.company || "Company"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(item.id)}
                          className="icon-button grid size-9 place-items-center rounded-sm border border-rose-300/30 bg-rose-300/10 text-rose-100 transition hover:border-rose-200"
                          aria-label={`Remove ${item.role}`}
                          title="Remove"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Field
                          label="Role"
                          value={item.role}
                          onChange={(value) =>
                            updateExperience(item.id, "role", value)
                          }
                          required
                        />
                        <Field
                          label="Company"
                          value={item.company}
                          onChange={(value) =>
                            updateExperience(item.id, "company", value)
                          }
                          required
                        />
                        <Field
                          label="Focus"
                          value={item.focus}
                          onChange={(value) =>
                            updateExperience(item.id, "focus", value)
                          }
                        />
                        <Field
                          label="Period"
                          value={item.period}
                          onChange={(value) =>
                            updateExperience(item.id, "period", value)
                          }
                        />
                        <ColorField
                          value={item.accent}
                          onChange={(value) =>
                            updateExperience(item.id, "accent", value)
                          }
                        />
                        <TextArea
                          label="Stack"
                          value={item.stack.join(", ")}
                          onChange={(value) =>
                            updateExperience(item.id, "stack", splitList(value))
                          }
                          placeholder="React, Tailwind CSS, Vitest"
                        />
                        <div className="md:col-span-2">
                          <TextArea
                            label="Summary"
                            value={item.summary}
                            onChange={(value) =>
                              updateExperience(item.id, "summary", value)
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <TextArea
                            label="Impact"
                            value={item.impact.join("\n")}
                            onChange={(value) =>
                              updateExperience(
                                item.id,
                                "impact",
                                splitLines(value),
                              )
                            }
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </DashboardPanel>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
