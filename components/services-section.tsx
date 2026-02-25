"use client"

import { useState } from "react"
import { Monitor, Layout, Smartphone, Code, Palette, Zap } from "lucide-react"

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, performant web applications using modern technologies including React, HTML5, CSS3, and JavaScript with clean, maintainable code.",
    icon: Monitor,
    accent: "195",
  },
  {
    title: "Responsive Web Design",
    description:
      "Creating mobile-first designs that work flawlessly across all devices and screen sizes, ensuring 100% compatibility with modern browsers.",
    icon: Smartphone,
    accent: "210",
  },
  {
    title: "UI Component Development",
    description:
      "Designing and building reusable UI components following best practices, reducing development time and ensuring consistent user experiences.",
    icon: Layout,
    accent: "220",
  },
  {
    title: "Clean Code Architecture",
    description:
      "Writing semantic, well-structured, and scalable code following OOP principles, design patterns, and industry best practices for maintainability.",
    icon: Code,
    accent: "240",
  },
  {
    title: "Creative Web Design",
    description:
      "Crafting visually appealing interfaces with modern aesthetics, smooth animations, and engaging micro-interactions that captivate users.",
    icon: Palette,
    accent: "260",
  },
  {
    title: "Performance Optimization",
    description:
      "Optimizing web applications for speed and efficiency, implementing lazy loading, code splitting, and SEO-friendly structures for better rankings.",
    icon: Zap,
    accent: "180",
  },
]

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setHoveredIndex(index)
  }

  return (
    <section id="services" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 05. Services"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            What I <span className="neon-text text-primary">Offer</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary/50" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const ServiceIcon = service.icon
            const isHovered = hoveredIndex === i
            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:-translate-y-1"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Mouse-following glow */}
                {isHovered && (
                  <div
                    className="pointer-events-none absolute z-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: mousePos.x,
                      top: mousePos.y,
                      background: `radial-gradient(circle, oklch(0.78 0.15 ${service.accent} / 0.08) 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Number watermark */}
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-mono text-7xl font-bold text-foreground/[0.03] transition-colors duration-500 group-hover:text-primary/[0.08]"
                  aria-hidden="true"
                >
                  {"0" + (i + 1)}
                </span>

                <div className="relative z-10">
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_oklch(0.78_0.15_195/0.2)]"
                    style={{
                      background: `oklch(0.78 0.15 ${service.accent} / 0.1)`,
                      border: `1px solid oklch(0.78 0.15 ${service.accent} / ${isHovered ? "0.5" : "0.2"})`,
                    }}
                  >
                    <ServiceIcon
                      className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: `oklch(0.78 0.15 ${service.accent})` }}
                    />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, oklch(0.55 0.2 ${service.accent}), oklch(0.78 0.15 195))`,
                    boxShadow: `0 0 10px oklch(0.78 0.15 ${service.accent} / 0.3)`,
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
