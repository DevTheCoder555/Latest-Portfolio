import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About',           href: '#about'           },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Coding Profiles', href: '#coding-profiles' },
  { label: 'Contact',         href: '#contact'         },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
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
          fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 'clamp(0.9rem, 3vw, 1.05rem)',
          background: 'linear-gradient(90deg, var(--neon-purple), var(--cyan))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '0.15em',
        }}>
          AI DEVELOPER
        </div>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none' }} className="desktop-menu">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: 'var(--text-dim)', textDecoration: 'none',
                fontSize: '0.88rem', letterSpacing: '0.08em',
                fontWeight: 600, textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(l.href)
              }}
              onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 1001,
          }}
          className="hamburger-btn"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          background: 'rgba(2,4,10,0.98)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 999,
          maxHeight: mobileMenuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="mobile-menu"
      >
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(l.href)
            }}
            style={{
              padding: '1rem 2rem',
              color: 'var(--text-dim)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              fontWeight: 600,
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
          >
            {l.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
} 