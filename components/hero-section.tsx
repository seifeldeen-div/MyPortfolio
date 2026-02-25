"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, ChevronDown, Github, Linkedin, Mail } from "lucide-react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Software Engineer & React Frontend Developer"
  const typingRef = useRef(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      if (typingRef.current < fullText.length) {
        setTypedText(fullText.slice(0, typingRef.current + 1))
        typingRef.current++
      } else {
        clearInterval(interval)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.15 195 / 0.5) 0%, oklch(0.55 0.2 260 / 0.2) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Scan lines */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.78 0.15 195 / 0.1) 2px, oklch(0.78 0.15 195 / 0.1) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-8 top-24 hidden h-16 w-16 border-l-2 border-t-2 border-primary/20 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-24 right-8 hidden h-16 w-16 border-b-2 border-r-2 border-primary/20 lg:block" aria-hidden="true" />

      <div className={`relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        {/* Status badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-xs text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </div>

        {/* Shield icon with animated ring */}
        <div className="group relative mb-6">
          <div className="absolute -inset-2 animate-spin rounded-2xl border border-dashed border-primary/20" style={{ animationDuration: "12s" }} aria-hidden="true" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_30px_oklch(0.78_0.15_195/0.3)]">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Name with glitch-style hover */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl">
          <span className="inline-block transition-transform duration-300 hover:scale-[1.02]">
            Seif Eldeen
          </span>
          <span className="neon-text block text-primary">Mohamed Attia</span>
        </h1>

        {/* Typing effect with terminal look */}
        <div className="mb-6 flex items-center rounded-lg border border-border/50 bg-deep-navy/60 px-4 py-2 font-mono text-sm backdrop-blur-sm sm:text-base md:text-lg">
          <span className="mr-2 text-primary/70">{"$"}</span>
          <span className="text-muted-foreground">{typedText}</span>
          <span
            className={`ml-0.5 inline-block h-5 w-[2px] bg-primary transition-opacity ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Highly motivated Computer Science student at Monufia University with
          hands-on experience in web development and problem-solving. Completed
          10+ projects and solved 200+ programming challenges.
        </p>

        {/* CTA buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleScroll("#projects")}
            className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_oklch(0.78_0.15_195/0.4)]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_100%] transition-[background-position] duration-500 group-hover:bg-[position:-100%_0]" aria-hidden="true" />
            View My Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {"->"}
            </span>
          </button>
          <button
            onClick={() => handleScroll("#contact")}
            className="flex items-center gap-2 rounded-lg border border-primary/40 bg-transparent px-6 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.78_0.15_195/0.15)]"
          >
            Contact Me
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/seifeldeen-div", icon: Github, label: "GitHub profile" },
            { href: "https://linkedin.com/in/seifeldeen-div", icon: Linkedin, label: "LinkedIn profile" },
            { href: "mailto:seifeldeen112006@gmail.com", icon: Mail, label: "Send email" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-1 hover:shadow-[0_0_20px_oklch(0.78_0.15_195/0.2)]"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => handleScroll("#about")}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll down"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              scroll
            </span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-primary" />
            </div>
          </div>
        </button>
      </div>
    </section>
  )
}
