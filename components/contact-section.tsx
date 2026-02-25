"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle2 } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    const mailtoLink = `mailto:seifeldeen112006@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`
    window.open(mailtoLink, "_blank")

    setTimeout(() => {
      setIsSending(false)
      setSent(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSent(false), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "seifeldeen112006@gmail.com",
      href: "mailto:seifeldeen112006@gmail.com",
      isLink: true,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+20 1551313454",
      href: "tel:+201551313454",
      isLink: true,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Shebin El-Kom, Monufia, Egypt",
      href: null,
      isLink: false,
    },
  ]

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      {/* Grid overlay */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-sm text-primary">
            {"// 06. Contact"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Get In <span className="neon-text text-primary">Touch</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-primary/50" />
          <p className="mx-auto max-w-xl text-muted-foreground">
            {
              "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
            }
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Contact info */}
          <div className="flex w-full flex-col gap-6 lg:w-1/3">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="glow-border group rounded-xl bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:shadow-[0_0_15px_oklch(0.78_0.15_195/0.2)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                {item.isLink && item.href ? (
                  <a
                    href={item.href}
                    className="break-all font-mono text-xs text-primary transition-opacity hover:opacity-80"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-mono text-xs text-muted-foreground">{item.value}</p>
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/seifeldeen-div"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/seifeldeen-div"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="w-full lg:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="glow-border rounded-2xl bg-card/50 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className={`mb-2 block font-mono text-xs transition-colors duration-300 ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:shadow-[0_0_15px_oklch(0.78_0.15_195/0.1)]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className={`mb-2 block font-mono text-xs transition-colors duration-300 ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:shadow-[0_0_15px_oklch(0.78_0.15_195/0.1)]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className={`mb-2 block font-mono text-xs transition-colors duration-300 ${focusedField === "subject" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:shadow-[0_0_15px_oklch(0.78_0.15_195/0.1)]"
                  placeholder="Project Collaboration"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className={`mb-2 block font-mono text-xs transition-colors duration-300 ${focusedField === "message" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full resize-none rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:shadow-[0_0_15px_oklch(0.78_0.15_195/0.1)]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.78_0.15_195/0.4)] disabled:opacity-50"
              >
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_100%] transition-[background-position] duration-500 group-hover:bg-[position:-100%_0]" aria-hidden="true" />
                {sent ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Message Sent!
                  </span>
                ) : isSending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
