import { useEffect, useRef } from 'react'

export default function NeuralNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const nc = canvasRef.current
    const nctx = nc.getContext('2d')
    let nw, nh, nodes = [], nmx, nmy, animId

    function nResize() {
      nw = nc.width = nc.offsetWidth
      nh = nc.height = nc.offsetHeight
      nmx = nw / 2; nmy = nh / 2
    }
    nResize()

    class NNode {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * nw; this.y = Math.random() * nh
        this.vx = (Math.random() - 0.5) * 0.6; this.vy = (Math.random() - 0.5) * 0.6
        this.r = Math.random() * 3 + 2; this.pulse = Math.random() * Math.PI * 2
        this.col = Math.random() > 0.5 ? [168, 85, 247] : [6, 182, 212]
      }
      update() {
        this.pulse += 0.04
        this.x += this.vx; this.y += this.vy
        const dx = this.x - nmx, dy = this.y - nmy, d = Math.hypot(dx, dy)
        if (d < 150) { this.vx += dx / d * 0.04; this.vy += dy / d * 0.04 }
        if (this.x < 0 || this.x > nw) this.vx *= -1
        if (this.y < 0 || this.y > nh) this.vy *= -1
        const spd = Math.hypot(this.vx, this.vy)
        if (spd > 1.5) { this.vx /= spd; this.vy /= spd }
      }
      draw() {
        const pr = this.r + Math.sin(this.pulse) * 1.5
        const g = nctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pr * 3)
        g.addColorStop(0, `rgba(${this.col},0.9)`)
        g.addColorStop(1, `rgba(${this.col},0)`)
        nctx.beginPath(); nctx.arc(this.x, this.y, pr * 3, 0, Math.PI * 2)
        nctx.fillStyle = g; nctx.fill()
        nctx.beginPath(); nctx.arc(this.x, this.y, pr, 0, Math.PI * 2)
        nctx.fillStyle = `rgba(${this.col},1)`; nctx.fill()
      }
    }

    for (let i = 0; i < 70; i++) nodes.push(new NNode())

    const onMove = e => {
      const r = nc.getBoundingClientRect()
      nmx = e.clientX - r.left; nmy = e.clientY - r.top
    }
    nc.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', nResize, { passive: true })

    function animate() {
      nctx.clearRect(0, 0, nw, nh)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < 140) {
            nctx.beginPath()
            nctx.moveTo(nodes[i].x, nodes[i].y)
            nctx.lineTo(nodes[j].x, nodes[j].y)
            nctx.strokeStyle = `rgba(168,85,247,${0.35 * (1 - d / 140)})`
            nctx.lineWidth = 0.8; nctx.stroke()
          }
        }
      }
      nodes.forEach(n => { n.update(); n.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      nc.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', nResize)
    }
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 400, display: 'flex', alignItems: 'center', background: 'linear-gradient(180deg,var(--bg) 0%,#050818 100%)', padding: '4rem 0' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: 600, margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(90deg,var(--neon-purple),var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Neural Network Visualization
        </h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Move your mouse to interact with the neural network — simulating AI thought processes.
        </p>
        <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Canvas API', 'WebGL', 'Interactive'].map(t => (
            <span key={t} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
