"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, GraduationCap, Award } from "lucide-react"

const timeline = [
  {
    type: "work",
    title: "React Frontend Web Developer",
    organization: "Digital Egypt Pioneers Initiative",
    location: "Menoufia, Egypt",
    date: "Nov 2025 - Present",
    details: [
      "Developed 5+ responsive web pages using HTML, CSS, and JavaScript, achieving 100% mobile compatibility",
      "Built 8+ reusable UI components following React best practices, reducing development time by 30%",
      "Implemented form validation and interactive features for 3+ projects, improving UX and reducing error rates by 25%",
      "Collaborated with a team of 10+ developers using Git/GitHub, contributing to 15+ pull requests with 95% approval rate",
    ],
    icon: Briefcase,
  },
  {
    type: "cert",
    title: "Web Design Track",
    organization: "National Telecommunication Institute (NTI)",
    location: "Egypt",
    date: "Dec 2025 - Present",
    details: [
      "Completed 120+ hours of intensive training in HTML, CSS, JavaScript, and Bootstrap",
      "Built 6+ projects demonstrating proficiency in responsive design and modern web development practices",
    ],
    icon: Award,
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    organization: "Faculty of Computer and Information, Monufia University",
    location: "Shebin El-Kom, Monufia, Egypt",
    date: "Aug 2024 - Present",
    details: [
      "Computer Science Department",
      "Focused on algorithms, data structures, OOP, and web development",
    ],
    icon: GraduationCap,
  },
]

export default function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      {/* Grid overlay */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 04. Experience & Education"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            My <span className="neon-text text-primary">Journey</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary/50" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - animated fill */}
          <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" aria-hidden="true" />
          <div
            className="absolute left-6 top-0 w-px bg-primary/50 transition-all duration-1000 ease-out md:left-1/2 md:-translate-x-px"
            style={{
              height: `${(visibleItems.size / timeline.length) * 100}%`,
              boxShadow: "0 0 8px oklch(0.78 0.15 195 / 0.3)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => {
              const TimelineIcon = item.icon
              const isLeft = i % 2 === 0
              const isVis = visibleItems.has(i)

              return (
                <div
                  key={item.title}
                  ref={(el) => { itemRefs.current[i] = el }}
                  data-index={i}
                  className={`relative flex flex-col md:flex-row ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon on timeline */}
                  <div
                    className={`absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl border bg-deep-navy transition-all duration-500 md:left-1/2 ${
                      isVis
                        ? "border-primary/60 shadow-[0_0_20px_oklch(0.78_0.15_195/0.3)] scale-100"
                        : "border-border scale-75 opacity-50"
                    }`}
                  >
                    <TimelineIcon className={`h-5 w-5 transition-colors duration-500 ${isVis ? "text-primary" : "text-muted-foreground"}`} />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 w-full transition-all duration-700 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-8" : "md:pl-8"
                    } ${
                      isVis
                        ? "translate-y-0 opacity-100"
                        : `translate-y-8 opacity-0 ${isLeft ? "md:-translate-x-4" : "md:translate-x-4"}`
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_25px_oklch(0.78_0.15_195/0.1)]">
                      {/* Date badge */}
                      <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        {item.date}
                      </span>

                      <h3 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mb-1 text-sm text-primary">{item.organization}</p>
                      <p className="mb-4 font-mono text-xs text-muted-foreground">{item.location}</p>

                      <ul className="flex flex-col gap-2">
                        {item.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline end dot */}
          <div className="absolute bottom-0 left-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-deep-navy shadow-[0_0_10px_oklch(0.78_0.15_195/0.3)] md:left-1/2" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
