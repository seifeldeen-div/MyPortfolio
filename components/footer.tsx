"use client"

import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { href: "https://github.com/seifeldeen-div", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/seifeldeen-div", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:seifeldeen112006@gmail.com", icon: Mail, label: "Email" },
]

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative border-t border-border bg-deep-navy/50 px-6 py-12">
      {/* Decorative top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.15 195 / 0.5), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Top area */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary">
                S.M
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                {"<SeifEldeen />"}
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Frontend Developer passionate about creating beautiful and functional web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-muted-foreground">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            Designed & Built with{" "}
            <Heart className="h-3 w-3 text-primary" />
            by Seif Eldeen Mohamed Attia
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        {/* Scroll to top */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
