"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "JavaScript", level: 85, category: "language", color: "195" },
  { name: "React", level: 70, category: "framework", color: "200" },
  { name: "HTML5", level: 95, category: "language", color: "195" },
  { name: "CSS3", level: 90, category: "language", color: "210" },
  { name: "Java", level: 75, category: "language", color: "260" },
  { name: "Python", level: 70, category: "language", color: "220" },
  { name: "C++", level: 70, category: "language", color: "240" },
  { name: "Bootstrap", level: 80, category: "framework", color: "260" },
  { name: "Git & GitHub", level: 85, category: "tool", color: "195" },
  { name: "Trae", level: 90, category: "tool", color: "210" },
  { name: "VS Code", level: 95, category: "tool", color: "210" },
  { name: "Cursor", level: 80, category: "tool", color: "195" },
  { name: "Responsive Design", level: 95, category: "concept", color: "195" },
  { name: "OOP", level: 80, category: "concept", color: "240" },
  { name: "Data Structures", level: 75, category: "concept", color: "220" },
  { name: "Algorithm", level: 75, category: "concept", color: "260" },
]

const categories = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks" },
  { key: "tool", label: "Tools" },
  { key: "concept", label: "Concepts" },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative px-6 py-24 md:py-32" ref={sectionRef}>
      {/* Grid overlay */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 02. Skills & Technologies"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            My <span className="neon-text text-primary">Tech Stack</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary/50" />
        </div>

        {/* Category filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative rounded-lg px-5 py-2.5 font-mono text-xs transition-all duration-300 ${
                activeCategory === cat.key
                  ? "border border-primary/50 bg-primary/15 text-primary shadow-[0_0_20px_oklch(0.78_0.15_195/0.15)]"
                  : "border border-border bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {activeCategory === cat.key && (
                <span className="absolute -top-px left-1/2 h-px w-8 -translate-x-1/2 bg-primary shadow-[0_0_10px_oklch(0.78_0.15_195/0.5)]" />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((skill, i) => {
            const isHovered = hoveredSkill === skill.name
            return (
              <div
                key={skill.name}
                className={`group rounded-xl border bg-card/50 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 ${
                  isHovered ? "border-primary/40 shadow-[0_0_25px_oklch(0.78_0.15_195/0.1)]" : "border-border"
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 60}ms`,
                  transitionDuration: "600ms",
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-xs font-bold transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `oklch(0.78 0.15 ${skill.color} / 0.1)`,
                        border: `1px solid oklch(0.78 0.15 ${skill.color} / 0.3)`,
                        color: `oklch(0.78 0.15 ${skill.color})`,
                      }}
                    >
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </div>
                  <span
                    className="font-mono text-xs font-semibold transition-all duration-300"
                    style={{ color: `oklch(0.78 0.15 ${skill.color})` }}
                  >
                    {isVisible ? `${skill.level}%` : "0%"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 overflow-hidden rounded-full bg-secondary/50">
                  <div
                    className="skill-fill relative h-full overflow-hidden rounded-full"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, oklch(0.55 0.2 ${skill.color}), oklch(0.78 0.15 ${skill.color}))`,
                      boxShadow: `0 0 12px oklch(0.78 0.15 ${skill.color} / 0.4)`,
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    {/* Shimmer effect */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)]"
                      style={{
                        animation: isHovered ? "shimmer 1.5s ease-in-out infinite" : "none",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional skills tags */}
        <div className="mt-12 text-center">
          <p className="mb-4 font-mono text-xs text-muted-foreground">Also experienced with:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Adobe Photoshop",
              "Canva",
              "Agile Methodology",
              "Version Control",
              "SEO",
              "Accessibility",
              "Microsoft Office",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
