import { useState, useEffect } from 'react'

const links = [
  { label: 'About',           href: '#about'           },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Coding Profiles', href: '#coding-profiles' },
  { label: 'Contact',         href: '#contact'         },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(2,4,10,0.95)' : 'rgba(2,4,10,0.7)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      transition: 'background 0.3s',
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: '1.05rem',
        background: 'linear-gradient(90deg, var(--neon-purple), var(--cyan))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        letterSpacing: '0.15em',
      }}>
        AI DEVELOPER
      </div>

      <ul className="hide-mobile" style={{ display: 'flex', gap: '1.8rem', listStyle: 'none' }}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{
              color: 'var(--text-dim)', textDecoration: 'none',
              fontSize: '0.88rem', letterSpacing: '0.08em',
              fontWeight: 600, textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
