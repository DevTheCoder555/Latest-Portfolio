import { useEffect, useRef, useState } from 'react'
import { useReveal } from './useReveal'

const SKILLS = [
  { name: 'Java',        icon: '☕', cat: 'Language', lvl: 80 },
  { name: 'Python',      icon: '🐍', cat: 'Language', lvl: 75 },
  { name: 'JavaScript',  icon: '🟡', cat: 'Language', lvl: 85 },
  { name: 'React',       icon: '⚛️', cat: 'Frontend', lvl: 88 },
  { name: 'HTML',        icon: '🌐', cat: 'Frontend', lvl: 92 },
  { name: 'CSS',         icon: '🎨', cat: 'Frontend', lvl: 85 },
  { name: 'Tailwind',    icon: '🌊', cat: 'Frontend', lvl: 80 },
  { name: 'Node.js',     icon: '🟢', cat: 'Backend',  lvl: 65 },
  { name: 'REST APIs',   icon: '🔌', cat: 'Backend',  lvl: 70 },
  { name: 'ML Basics',   icon: '🧠', cat: 'AI/ML',    lvl: 60 },
  { name: 'AI Tools',    icon: '🤖', cat: 'AI/ML',    lvl: 65 },
  { name: 'Git',         icon: '📦', cat: 'Tools',    lvl: 80 },
  { name: 'GitHub',      icon: '🐙', cat: 'Tools',    lvl: 82 },
  { name: 'VS Code',     icon: '💻', cat: 'Tools',    lvl: 90 },
]

function SkillCard({ skill, animate }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '1.25rem', borderRadius: 10, textAlign: 'center',
        background: hov ? 'rgba(168,85,247,0.08)' : 'var(--glass)',
        border: `1px solid ${hov ? 'rgba(168,85,247,0.5)' : 'var(--glass-border)'}`,
        transition: 'all 0.3s',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? '0 10px 30px var(--glow-purple)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{skill.icon}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {skill.cat}
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
        {skill.name}
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden', marginTop: '0.5rem' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: 'linear-gradient(90deg,var(--neon-purple),var(--cyan))',
          width: animate ? `${skill.lvl}%` : '0%',
          transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 0 6px var(--cyan)',
        }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const [headRef, headVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()

  return (
    <div style={{ background: 'rgba(5,8,18,0.5)' }}>
      <div className="section-wrap" id="skills">
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <p className="sec-label">// 02. skill_set</p>
          <h2 className="sec-title">Tech Arsenal</h2>
          <div className="sec-divider" />
        </div>

        <div
          ref={gridRef}
          className={`reveal${gridVisible ? ' visible' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '1rem' }}
        >
          {SKILLS.map(s => <SkillCard key={s.name} skill={s} animate={gridVisible} />)}
        </div>
      </div>
    </div>
  )
}
