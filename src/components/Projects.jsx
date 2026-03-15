import { useState } from 'react'
import { useReveal } from './useReveal'

const PROJECTS = [
  {
    title: 'Result Analysis System',
    desc:  'A system that analyzes student results using Excel data and generates detailed result analytics with visual dashboards.',
    tags:  ['React', 'Excel API', 'Data Analytics', 'Vercel'],
    live:  'https://result-analysis-new.vercel.app/',
    bg:    'linear-gradient(135deg,#1a0533,#0a1a33)',
    
  },
  {
    title: 'OSS Website',
    desc:  'A modern responsive website built using React with reusable components, clean UI patterns, and modern design principles.',
    tags:  ['React', 'CSS', 'Responsive', 'Vercel'],
    live:  'https://oss-website-swart.vercel.app/',
    bg:    'linear-gradient(135deg,#0a2030,#180a33)',
  },
]

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 14, overflow: 'hidden',
        background: 'var(--glass)',
        border: `1px solid ${hov ? 'rgba(168,85,247,0.4)' : 'var(--glass-border)'}`,
        transition: 'all 0.4s',
        transform: hov ? 'translateY(-8px)' : 'none',
        boxShadow: hov ? '0 20px 60px rgba(168,85,247,0.2)' : 'none',
      }}
    >
      <div style={{ width: '100%', height: 180, background: project.bg, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src={project.live}
          title={project.title}
          style={{ width: '100%', height: 180, border: 0, pointerEvents: 'none', transform: 'scale(1.1)', opacity: 0.85 }}
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
          {project.title}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href={project.live} target="_blank" rel="noreferrer"
             className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
            🚀 Live Demo
          </a>

        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="projects" className="section-wrap">
      <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
        <p className="sec-label">// 03. projects</p>
        <h2 className="sec-title">Featured Work</h2>
        <div className="sec-divider" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '2rem' }}>
        {PROJECTS.map(p => <ProjectCard key={p.title} project={p} />)}
      </div>
    </section>
  )
}
