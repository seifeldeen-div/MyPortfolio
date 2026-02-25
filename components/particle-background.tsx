"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
  pulseSpeed: number
  pulseOffset: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  const createParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 12000), 100)
    particlesRef.current = Array.from({ length: count }, () => {
      const baseOpacity = Math.random() * 0.4 + 0.1
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: baseOpacity,
        baseOpacity,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (particlesRef.current.length === 0) {
        createParticles(canvas.width, canvas.height)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 1

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const mouseRadius = 150

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction - particles gently push away
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 0.3
          p.vy += Math.sin(angle) * force * 0.3
        }

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Ensure minimum movement
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed < 0.1) {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulsing opacity
        p.opacity =
          p.baseOpacity +
          Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset) * 0.15

        // Draw particle with glow
        const glowSize = p.size * 3
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowSize
        )
        gradient.addColorStop(0, `rgba(0, 230, 255, ${p.opacity})`)
        gradient.addColorStop(0.4, `rgba(0, 200, 255, ${p.opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(0, 200, 255, 0)")

        ctx.beginPath()
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity * 1.5})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

          if (cdist < 140) {
            const alpha = 0.1 * (1 - cdist / 140)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 220, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Draw connections to mouse
        if (dist < mouseRadius * 1.5) {
          const alpha = 0.15 * (1 - dist / (mouseRadius * 1.5))
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", () => {
      resize()
      createParticles(canvas.width, canvas.height)
    })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
