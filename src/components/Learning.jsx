import { useState } from 'react'
import { useReveal } from './useReveal'

const ITEMS = [
  { icon: '🧮', title: 'Data Structures & Algorithms', desc: 'Mastering problem-solving with arrays, trees, graphs, DP, and competitive programming fundamentals.' },
  { icon: '⚛️', title: 'Full Stack with React',        desc: 'Building modern scalable web applications using React, Node.js, REST APIs, and modern tooling.' },
  { icon: '🤖', title: 'AI & Machine Learning',        desc: 'Exploring neural networks, ML algorithms, deep learning concepts, and AI-powered application development.' },
]

export default function Learning() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="learning" className="section-wrap">
      <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
        <p className="sec-label">// 05. currently_learning</p>
        <h2 className="sec-title">Learning Journey</h2>
        <div className="sec-divider" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="learn-grid">
        {ITEMS.map((item, i) => {
          const [hov, setHov] = useState(false)
          return (
            <div key={i}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                padding: '2rem', textAlign: 'center', borderRadius: 12,
                background: 'var(--glass)',
                border: `1px solid ${hov ? 'var(--cyan)' : 'var(--glass-border)'}`,
                transition: 'all 0.3s',
                transform: hov ? 'translateY(-4px)' : 'none',
                boxShadow: hov ? '0 0 30px var(--glow-cyan)' : 'none',
              }}
            >
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>{item.icon}</span>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          )
        })}
      </div>

      <style>{`@media(max-width:768px){ .learn-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  )
}
