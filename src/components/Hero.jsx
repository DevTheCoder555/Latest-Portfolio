import { useEffect, useRef, useState } from 'react'
import { PROFILE_IMG, RESUME_PDF } from '../assets'

const PHRASES = [
  'B.Tech CSE AIML Student',
  'Full Stack Developer',
  'React Developer',
  'AI/ML Enthusiast',
]

const FLOAT_ICONS = ['⚛️','🐍','☕','🔷','🤖','💻','🧠','🚀','⚡','🎯','🔧','📊']

function useTyping() {
  const [text, setText] = useState('')
  const state = useRef({ pi: 0, ci: 0, del: false })

  useEffect(() => {
    let timer
    function tick() {
      const s = state.current
      if (!s.del) {
        s.ci++
        setText(PHRASES[s.pi].slice(0, s.ci))
        if (s.ci === PHRASES[s.pi].length) {
          s.del = true
          timer = setTimeout(tick, 1800)
          return
        }
      } else {
        s.ci--
        setText(PHRASES[s.pi].slice(0, s.ci))
        if (s.ci === 0) {
          s.del = false
          s.pi = (s.pi + 1) % PHRASES.length
        }
      }
      timer = setTimeout(tick, s.del ? 45 : 75)
    }
    timer = setTimeout(tick, 2600)
    return () => clearTimeout(timer)
  }, [])

  return text
}

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], pmx, pmy, animId

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      pmx = W / 2; pmy = H / 2
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H
        this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4
        this.r = Math.random() * 1.5 + 0.5
        this.a = Math.random() * 0.5 + 0.1
        this.c = Math.random() > 0.5 ? '168,85,247' : '6,182,212'
      }
      update() {
        this.x += this.vx; this.y += this.vy
        const dx = this.x - pmx, dy = this.y - pmy
        const d = Math.hypot(dx, dy)
        if (d < 100) { this.x += dx / d * 0.5; this.y += dy / d * 0.5 }
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill()
      }
    }

    for (let i = 0; i < 180; i++) particles.push(new Particle())

    const onMouseMove = e => { pmx = e.clientX; pmy = e.clientY }
    canvas.addEventListener('mousemove', onMouseMove, { passive: true })

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(168,85,247,${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.update(); p.draw() })
      drawLines()
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}

function FloatingIcons() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {FLOAT_ICONS.map((ic, i) => (
        <span key={i} style={{
          position: 'absolute',
          fontSize: '1.5rem',
          opacity: 0.15,
          left: `${(i * 7.7 + 5) % 90}%`,
          top: `${(i * 11.3 + 10) % 85}%`,
          animation: `floatIcon ${6 + (i % 3) * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }}>
          {ic}
        </span>
      ))}
      <style>{`
        @keyframes floatIcon {
          0%,100%{transform:translateY(0) rotate(0deg)}
          33%{transform:translateY(-20px) rotate(10deg)}
          66%{transform:translateY(10px) rotate(-5deg)}
        }
      `}</style>
    </div>
  )
}

function downloadResume() {
  try {
    const byteChars = atob(RESUME_PDF)
    const byteNums = new Uint8Array(byteChars.length)
    for (let i = 0; i < byteChars.length; i++) byteNums[i] = byteChars.charCodeAt(i)
    const blob = new Blob([byteNums], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'Devyansh_Gupta_Resume.pdf'
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  } catch (e) { console.error('Download error:', e) }
}

export default function Hero() {
  const typedText = useTyping()

  return (
    <div id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleCanvas />
      <FloatingIcons />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto', padding: '0 2rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: '4rem', width: '100%',
      }}
      className="hero-grid"
      >
        {/* Text */}
        <div style={{ animation: 'fadeUp 1s ease 0.5s both' }}>
          <p style={{
            fontSize: '1.2rem', color: 'var(--text-dim)',
            marginBottom: '0.5rem', letterSpacing: '0.05em',
            animation: 'fadeUp 1s ease 0.7s both',
          }}>
            👋 Hello World, I'm
          </p>
          <h1 style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 900,
            fontSize: 'clamp(2rem,5vw,4rem)', lineHeight: 1.1,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg,#fff 0%,var(--neon-purple) 50%,var(--cyan) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeUp 1s ease 0.5s both',
          }}>
            Devyansh<br />Gupta
          </h1>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem',
            color: 'var(--cyan)', marginBottom: '2rem', minHeight: '1.6em',
            animation: 'fadeUp 1s ease 0.9s both',
          }}>
            {typedText}
            <span style={{ animation: 'blink 1s infinite', display: 'inline-block' }}>|</span>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            animation: 'fadeUp 1s ease 1.1s both',
          }}>
            <a href="#projects" className="btn btn-primary">🚀 View Projects</a>
            <a href="#contact" className="btn btn-outline">💬 Contact Me</a>
            <button onClick={downloadResume} className="btn btn-download">⬇ Download Resume</button>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeUp 1s ease 0.6s both' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 280, height: 340, borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 0 40px var(--glow-purple), 0 0 80px rgba(59,130,246,0.1)',
              position: 'relative',
            }}>
              <img
                src={PROFILE_IMG}
                alt="Devyansh Gupta"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.1)' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent,rgba(2,4,10,0.92))',
                padding: '1.5rem 1rem',
              }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1rem', color: '#fff', fontWeight: 700 }}>
                  Devyansh Gupta
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--cyan)' }}>AI/ML · Full Stack Dev</div>
              </div>
            </div>
            {[
              { style: { top: -10, right: -20, borderColor: 'var(--neon-purple)' }, icon: '⚡', label: 'React Dev', color: 'var(--neon-purple)', delay: '0s' },
              { style: { bottom: 60, left: -25, borderColor: 'var(--cyan)' }, icon: '🧠', label: 'AI/ML', color: 'var(--cyan)', delay: '1s' },
              { style: { top: '40%', right: -30, borderColor: 'var(--neon-blue)' }, icon: '💻', label: 'B.Tech CSE', color: 'var(--neon-blue)', delay: '2s' },
            ].map((b, i) => (
              <div key={i} style={{
                position: 'absolute', ...b.style,
                background: 'rgba(2,4,10,0.9)', border: `1px solid ${b.style.borderColor}`,
                borderRadius: 8, padding: '0.4rem 0.7rem',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                backdropFilter: 'blur(10px)',
                animation: `floatBadge 3s ease-in-out infinite`,
                animationDelay: b.delay,
              }}>
                <span>{b.icon}</span>
                <span style={{ color: b.color, fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem' }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @media(max-width:768px){
          .hero-grid { grid-template-columns:1fr !important; text-align:center; }
          .hero-grid > div:last-child { justify-content:center; }
        }
      `}</style>
    </div>
  )
}
