// import { LinkedIn, GitHub } from "lucide-react";
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
)

const SOCIALS = [
  {
    href:    'https://www.linkedin.com/in/devyansh-gupta-2a9615385/',
    label:   'LinkedIn',
    icon:    <LinkedInIcon />,
    hoverColor:  '#0a66c2',
    hoverShadow: 'rgba(10,102,194,0.5)',
  },
  {
    href:    'https://github.com/DevTheCoder555',
    label:   'GitHub',
   icon: (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.69.24 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
),
    hoverColor:  'var(--neon-purple)',
    hoverShadow: 'rgba(168,85,247,0.5)',
  },
]

function SocialBtn({ s }) {
  const [hov, setHov] = React.useState(false)

  return (
    <a
      href={s.href}
      target={s.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={s.label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 48, height: 48, borderRadius: 10,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? s.hoverColor : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
        color: hov ? s.hoverColor : 'var(--text-dim)',
        boxShadow: hov ? `0 0 20px ${s.hoverShadow}` : 'none',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      {s.icon}
    </a>
  )
}

import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      background: '#020408',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '2.5rem 2rem',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1.25rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {SOCIALS.map(s => <SocialBtn key={s.label} s={s} />)}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textAlign: 'center' }}>
          © Devyansh Gupta. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}
