"use client"

import { useState } from "react"
import { ExternalLink, Github, Layers, Globe, ShoppingCart, Stethoscope } from "lucide-react"

const projects = [
  {
    title: "Learn Hub Platform",
    description:
      "Developed a fully responsive educational platform serving 100+ users with course listings, registration forms, and interactive content. Implemented mobile-first design achieving 98% cross-browser compatibility and 3-second average page load time.",
    tools: ["HTML", "CSS", "JavaScript", "Git"],
    github: "https://github.com/seifeldeen-div/learnHub-Platform",
    live: "https://seifeldeen-div.github.io/learnHub-Platform/",
    icon: Layers,
    accent: "195",
  },
  {
    title: "Food Lover Restaurant",
    description:
      "Developed a full-featured restaurant web application that simulates real-world online ordering and table booking. Includes user authentication, product listing with category filtering, a dynamic shopping cart with tax calculation, favorites system, and table reservation management.",
    tools: ["HTML", "CSS", "JavaScript", "Git"],
    github: "https://github.com/seifeldeen-div/food-lover-restaurant",
    live: "https://seifeldeen-div.github.io/food-lover-restaurant/Restaurant%20web.html#home",
    icon: ShoppingCart,
    accent: "220",
  },
  {
    title: "Leion Landing Page",
    description:
      "Developed a fully responsive and modern website template for creative agencies and freelance designers. Features a clean and user-friendly interface, smooth scrolling, mobile-friendly navigation, and dedicated sections for portfolio, services, about, and contact.",
    tools: ["HTML", "CSS", "Git"],
    github: "https://github.com/seifeldeen-div/Leion-landing-page",
    live: "https://seifeldeen-div.github.io/Leion-landing-page/",
    icon: Globe,
    accent: "260",
  },
  {
    title: "MediCare+ Clinic Landing Page",
    description:
      "Designed MediCare+ Clinic to provide a seamless digital experience for patients and visitors, allowing easy access to medical specialties, doctor information, and appointment booking. Fully responsive with a modern and visually appealing interface.",
    tools: ["HTML", "CSS", "JavaScript", "Git"],
    github: "https://github.com/seifeldeen-div/MediaCare-Clinic",
    live: "https://seifeldeen-div.github.io/MediaCare-Clinic/",
    icon: Stethoscope,
    accent: "170",
  },
]

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setHoveredIndex(index)
  }

  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 03. Projects"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Featured <span className="neon-text text-primary">Work</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary/50" />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const ProjectIcon = project.icon
            const isHovered = hoveredIndex === i
            return (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Mouse-following spotlight */}
                {isHovered && (
                  <div
                    className="pointer-events-none absolute z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100 transition-opacity duration-300"
                    style={{
                      left: mousePos.x,
                      top: mousePos.y,
                      background: `radial-gradient(circle, oklch(0.78 0.15 ${project.accent} / 0.08) 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Top decorative bar */}
                <div
                  className="h-1 w-full transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `linear-gradient(90deg, oklch(0.55 0.2 ${project.accent}), oklch(0.78 0.15 195))`
                      : "oklch(0.25 0.03 260)",
                  }}
                />

                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_oklch(0.78_0.15_195/0.2)]"
                        style={{
                          background: `oklch(0.78 0.15 ${project.accent} / 0.1)`,
                          border: `1px solid oklch(0.78 0.15 ${project.accent} / ${isHovered ? "0.5" : "0.2"})`,
                        }}
                      >
                        <ProjectIcon
                          className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: `oklch(0.78 0.15 ${project.accent})` }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {"Project 0" + (i + 1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Tools */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_15px_oklch(0.78_0.15_195/0.15)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        {""}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Bottom accent line animation */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, oklch(0.55 0.2 ${project.accent}), oklch(0.78 0.15 195))`,
                    boxShadow: `0 0 10px oklch(0.78 0.15 ${project.accent} / 0.3)`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
