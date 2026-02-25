"use client"

import { useEffect, useRef, useState } from "react"
import { User, MapPin, GraduationCap, Code2, Trophy, Terminal } from "lucide-react"

const stats = [
  { label: "Projects Completed", value: 10, suffix: "+", icon: Code2 },
  { label: "Problems Solved", value: 200, suffix: "+", icon: Terminal },
  { label: "Training Hours", value: 120, suffix: "+", icon: Trophy },
]

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span className="text-2xl font-bold text-foreground tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTermLine, setActiveTermLine] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveTermLine((prev) => (prev < 8 ? prev + 1 : prev))
    }, 200)
    return () => clearInterval(interval)
  }, [isVisible])

  const terminalLines = [
    { type: "command", text: '$ cat profile.json' },
    { type: "output", text: '{' },
    { type: "output", text: '  "name": "Seif Eldeen M. Attia",' },
    { type: "output", text: '  "role": "React Frontend Developer",' },
    { type: "output", text: '  "location": "Egypt",' },
    { type: "output", text: '  "languages": ["Arabic", "English", "French"],' },
    { type: "output", text: '  "status": "Open to Work"' },
    { type: "output", text: '}' },
  ]

  return (
    <section id="about" className="relative px-6 py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 01. About Me"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Who I <span className="neon-text text-primary">Am</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary/50" />
        </div>

        <div className="flex flex-col items-start gap-12 lg:flex-row">
          {/* Left: Info card */}
          <div className="w-full lg:w-1/2">
            <div className="glow-border rounded-2xl bg-card/50 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Seif Eldeen Mohamed</h3>
                  <p className="font-mono text-xs text-primary">Frontend Developer</p>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                Highly motivated Computer Science student at Monufia University with
                hands-on experience in web development and problem-solving. I am
                passionate about creating responsive, user-friendly web applications
                and continuously improving my skills through real-world projects and
                competitive programming.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>Shebin El-Kom, Monufia, Egypt</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                  <span>B.Sc. Computer Science - Monufia University (2024 - Present)</span>
                </div>
              </div>

              {/* Animated Terminal block */}
              <div className="mt-6 overflow-hidden rounded-lg border border-border bg-deep-navy/80 font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-muted-foreground">about.sh</span>
                </div>
                <div className="p-4">
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      className={`transition-all duration-300 ${i <= activeTermLine ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {line.type === "command" ? (
                        <p className="text-muted-foreground">
                          <span className="text-primary">$</span> {line.text.replace("$ ", "")}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          {line.text.includes('"') ? (
                            <>
                              {line.text.split('"').map((part, j) =>
                                j % 2 === 1 ? (
                                  <span key={j} className={j === 1 ? "text-primary" : "text-neon-cyan"}>
                                    {'"'}{part}{'"'}
                                  </span>
                                ) : (
                                  <span key={j}>{part}</span>
                                )
                              )}
                            </>
                          ) : (
                            line.text
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats + highlights */}
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glow-border group flex flex-col items-center rounded-xl bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <stat.icon className="mb-3 h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                  <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="glow-border rounded-2xl bg-card/50 p-8 backdrop-blur-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <Trophy className="h-5 w-5 text-primary" />
                Certifications & Training
              </h3>
              <div className="flex flex-col gap-4">
                <div className="group rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all duration-300 hover:border-primary/30">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      Digital Egypt Pioneers Initiative
                    </h4>
                    <span className="font-mono text-xs text-primary">Nov 2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Software Development - React Frontend Web Developer
                  </p>
                </div>
                <div className="group rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all duration-300 hover:border-primary/30">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      NTI - Web Design Track
                    </h4>
                    <span className="font-mono text-xs text-primary">Dec 2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    120+ hours of intensive training in HTML, CSS, JavaScript, and Bootstrap.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick highlights */}
            <div className="glow-border rounded-2xl bg-card/50 p-8 backdrop-blur-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <Code2 className="h-5 w-5 text-primary" />
                Key Highlights
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                {[
                  "Built 8+ reusable UI components following React best practices, reducing development time by 30%",
                  "Contributed to 15+ pull requests with 95% approval rate",
                  "Achieved 100% score on Banking System OOP project with 8+ classes and 20+ methods",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
