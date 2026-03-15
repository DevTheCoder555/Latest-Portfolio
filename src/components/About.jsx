import { useEffect, useRef, useState } from 'react'
import { useReveal } from './useReveal'

function Counter({ target, duration = 1500 }) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let s = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      s = Math.min(s + step, target)
      setVal(Math.floor(s))
      if (s >= target) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [started, target, duration])

  return <span ref={ref}>{val}+</span>
}

const timeline = [
  { year: '2022', title: 'High School(91%)', sub: '  ST.MARY"S CONVENT SCHOOL,GHAZIABAD', color: 'var(--neon-purple)', glow: 'var(--glow-purple)' },
  { year: '2024', title: ' Higher Secondary(93%) ', sub: 'BRIGHTLAND SCHOOL,GHAZIABAD', color: 'var(--cyan)', glow: 'var(--glow-cyan)' },
  { year: '2024-2028(ONGOING)', title: 'B.Tech-(CSE-AIML)', sub: 'AJAY KUMAR GARG ENGINEERING COLLEGE,GHAZIABAD', color: 'var(--neon-blue)', glow: 'var(--glow-blue)' },
]

export default function About() {
  const [headRef, headVisible] = useReveal()
  const [cardRef, cardVisible] = useReveal()
  const [tlRef, tlVisible]     = useReveal()

  return (
    <section id="about">
      <div className="section-wrap">
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <p className="sec-label">// 01. about_me</p>
          <h2 className="sec-title">Who Am I?</h2>
          <div className="sec-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}
             className="about-grid">
          {/* Info card */}
          <div ref={cardRef} className={`glass reveal${cardVisible ? ' visible' : ''}`} style={{ padding: '2rem' }}>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              I am a passionate Computer Science student specializing in{' '}
              <strong style={{ color: 'var(--neon-purple)' }}>AI & Machine Learning</strong>.
              I enjoy building modern web applications, solving DSA problems, and exploring AI technologies.
            </p>
            {[
              ['Name', 'Devyansh Gupta'],
              ['Degree', 'B.Tech 2nd Year — CSE (AI & ML)'],
              ['College', 'AKGEC, Ghaziabad'],
              ['Location', 'India 🇮🇳'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', display: 'inline-block' }} />
                <strong>{k}:</strong>&nbsp;{v}
              </div>
            ))}
            <div key="email" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', display: 'inline-block' }} />
              <strong>Email:</strong>&nbsp;
              <a href="mailto:devgupta51006@gmail.com" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                devgupta51006@gmail.com
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '2rem' }}>
              {[
                { num: 5,   label: 'Projects Built' },
                { num: 14,  label: 'Technologies'   },
                { num: 100, label: 'DSA Problems'   },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '1.5rem 1rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 10 }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(90deg,var(--neon-purple),var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <Counter target={s.num} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={tlRef} className={`reveal${tlVisible ? ' visible' : ''}`}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Education Timeline
            </p>
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg,var(--neon-purple),var(--cyan))' }} />
              {timeline.map((t, i) => (
                <div key={i} style={{ position: 'relative', padding: '1rem 0 1rem 1.5rem' }}>
                  <div style={{ position: 'absolute', left: '-0.45rem', top: '1.25rem', width: 10, height: 10, borderRadius: '50%', background: t.color, boxShadow: `0 0 10px ${t.glow}`, border: '2px solid var(--bg)' }} />
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: 'var(--cyan)', marginBottom: '0.25rem' }}>{t.year}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.15rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-grid{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
