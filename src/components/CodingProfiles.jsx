import { useReveal } from './useReveal'

const DSA_TAGS = ['Arrays','Strings','LinkedList','Trees','DP','Graphs','Sorting','Recursion']

function ContribGrid() {
  const cells = Array.from({ length: 182 }, () => {
    const r = Math.random()
    return r > 0.7 ? 'l4' : r > 0.5 ? 'l3' : r > 0.3 ? 'l2' : r > 0.15 ? 'l1' : ''
  })

  const colors = { '': 'rgba(255,255,255,0.05)', l1: 'rgba(168,85,247,0.2)', l2: 'rgba(168,85,247,0.4)', l3: 'rgba(168,85,247,0.7)', l4: 'var(--neon-purple)' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(26,1fr)', gap: 2, marginTop: '1rem' }}>
      {cells.map((l, i) => (
        <div key={i} style={{ aspectRatio: 1, borderRadius: 2, background: colors[l] }} />
      ))}
    </div>
  )
}

function StatBox({ value, label, color }) {
  return (
    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1.5rem', color }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{label}</div>
    </div>
  )
}

export default function CodingProfiles() {
  const [headRef, headVisible] = useReveal()
  const [ghRef,   ghVisible]   = useReveal()
  const [dsaRef,  dsaVisible]  = useReveal()

  return (
    <div style={{ background: 'rgba(5,8,18,0.5)' }} id="coding-profiles">
      <div className="section-wrap">
        <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
          <p className="sec-label">// 04. coding_profiles</p>
          <h2 className="sec-title">GitHub & DSA</h2>
          <div className="sec-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="cp-grid">
          {/* GitHub */}
          <div ref={ghRef} className={`glass reveal${ghVisible ? ' visible' : ''}`} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,var(--neon-purple),var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🐙</div>
              <div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1rem', fontWeight: 700 }}>DevTheCoder555</div>
                <a href="https://github.com/DevTheCoder555" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--cyan)', textDecoration: 'none' }}>
                  github.com/DevTheCoder555
                </a>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              Passionate developer building React apps, exploring AI/ML and contributing to open source.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <StatBox value="5+" label="Repositories" color="var(--neon-purple)" />
              <StatBox value="2+" label="Live Projects"  color="var(--cyan)" />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '1.5rem', fontFamily: "'JetBrains Mono',monospace" }}>
              Contribution Activity (2024–2025)
            </p>
            <ContribGrid />
            <a href="https://github.com/DevTheCoder555" target="_blank" rel="noreferrer"
               className="btn btn-outline"
               style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              View GitHub Profile →
            </a>
          </div>

          {/* DSA */}
          <div ref={dsaRef} className={`glass reveal${dsaVisible ? ' visible' : ''}`} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--neon-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🎯</div>
              <div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '1rem', fontWeight: 700 }}>coderdev-555</div>
                <a href="https://codolio.com/profile/coderdev-555" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--cyan)', textDecoration: 'none' }}>
                  codolio.com/profile/coderdev-555
                </a>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
              Actively solving Data Structures & Algorithms problems to sharpen problem-solving skills.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <StatBox value="100+" label="DSA Problems" color="var(--cyan)" />
              <StatBox value="Active" label="Status"      color="var(--neon-blue)" />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem', fontWeight: 600 }}>Topics Covered:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {DSA_TAGS.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            <a href="https://codolio.com/profile/coderdev-555" target="_blank" rel="noreferrer"
               className="btn btn-outline"
               style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', borderColor: 'var(--cyan)' }}>
              View DSA Profile →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .cp-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  )
}
