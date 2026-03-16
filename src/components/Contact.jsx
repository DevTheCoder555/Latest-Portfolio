import { useState } from 'react'
import { useReveal } from './useReveal'

// In development  → uses http://localhost:3001/api/send-email
// After deploying → set VITE_BACKEND_URL=https://your-render-app.onrender.com in Vercel env vars
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/send-email`
  : 'http://localhost:3001/api/send-email'

export default function Contact() {
  const [headRef, headVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [infoRef, infoVisible] = useReveal()

  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 4000)
      } else {
        throw new Error(data.message || 'Server error')
      }
    } catch (err) {
      const errorMsg = err.message.includes('fetch') 
        ? 'Backend not running. Start server.js first.' 
        : err.message
      setErrMsg(errorMsg)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const inputStyle = {
    width: '100%', 
    padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: 8, 
    color: 'var(--text)', 
    fontSize: '16px', // Prevents iOS zoom on input
    fontFamily: "'Rajdhani',sans-serif", 
    outline: 'none', 
    resize: 'vertical',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <section id="contact" className="section-wrap">
      <div ref={headRef} className={`reveal${headVisible ? ' visible' : ''}`}>
        <p className="sec-label">// 06. get_in_touch</p>
        <h2 className="sec-title">Contact Me</h2>
        <div className="sec-divider" />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.5fr', 
        gap: '3rem', 
        alignItems: 'start' 
      }} className="contact-grid">
        {/* Info */}
        <div ref={infoRef} className={`reveal${infoVisible ? ' visible' : ''}`}>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ 
              fontFamily: "'Orbitron',monospace", 
              fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
              marginBottom: '1.5rem', 
              color: 'var(--cyan)' 
            }}>
              Let's Build Together
            </h3>
            <p style={{ 
              color: 'var(--text-dim)', 
              fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', 
              lineHeight: 1.7, 
              marginBottom: '2rem' 
            }}>
              Have a project in mind? Want to collaborate? Or just want to say hi? I'd love to hear from you!
            </p>
            {[
              { icon: '✉️', label: 'Email',    val: 'devgupta51006@gmail.com', href: 'mailto:devgupta51006@gmail.com' },
              { icon: '📱', label: 'Phone',    val: '+91 9310716030' },
              { icon: '📍', label: 'Location', val: 'India 🇮🇳' },
              { icon: '🎓', label: 'College',  val: 'AKGEC, Ghaziabad' },
            ].map(item => (
              <div key={item.label} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '0.75rem', 
                marginBottom: '1.25rem' 
              }}>
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: 8, 
                  background: 'rgba(168,85,247,0.1)', 
                  border: '1px solid rgba(168,85,247,0.3)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '1.2rem', 
                  flexShrink: 0 
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--text-dim)', 
                    letterSpacing: '0.1em', 
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem'
                  }}>
                    {item.label}
                  </div>
                  {item.href
                    ? <a href={item.href} style={{ 
                        fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', 
                        color: 'var(--text)', 
                        textDecoration: 'none',
                        wordBreak: 'break-word'
                      }}>
                        {item.val}
                      </a>
                    : <span style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>
                        {item.val}
                      </span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div ref={formRef} className={`glass reveal${formVisible ? ' visible' : ''}`} style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            {[
              { id: 'name',    label: 'Your Name',      type: 'text',  ph: 'John Doe' },
              { id: 'email',   label: 'Email Address',  type: 'email', ph: 'john@example.com' },
            ].map(f => (
              <div key={f.id} style={{ marginBottom: '1.25rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', 
                  letterSpacing: '0.1em', 
                  color: 'var(--text-dim)', 
                  marginBottom: '0.5rem', 
                  textTransform: 'uppercase' 
                }}>
                  {f.label}
                </label>
                <input
                  type={f.type} 
                  name={f.id} 
                  value={form[f.id]}
                  onChange={handleChange} 
                  placeholder={f.ph} 
                  required
                  style={inputStyle}
                  onFocus={e => { 
                    e.target.style.borderColor = 'var(--neon-purple)' 
                    e.target.style.boxShadow = '0 0 15px var(--glow-purple)' 
                  }}
                  onBlur={e  => { 
                    e.target.style.borderColor = 'var(--glass-border)' 
                    e.target.style.boxShadow = 'none' 
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ 
                display: 'block', 
                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', 
                letterSpacing: '0.1em', 
                color: 'var(--text-dim)', 
                marginBottom: '0.5rem', 
                textTransform: 'uppercase' 
              }}>
                Message
              </label>
              <textarea
                name="message" 
                value={form.message} 
                onChange={handleChange}
                placeholder="Hey Devyansh, let's collaborate on..." 
                required
                style={{ ...inputStyle, minHeight: 120 }}
                onFocus={e => { 
                  e.target.style.borderColor = 'var(--neon-purple)' 
                  e.target.style.boxShadow = '0 0 15px var(--glow-purple)' 
                }}
                onBlur={e  => { 
                  e.target.style.borderColor = 'var(--glass-border)' 
                  e.target.style.boxShadow = 'none' 
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer'
              }}>
              {status === 'loading' ? '⏳ Sending...' : status === 'success' ? '✅ Sent!' : '🚀 Send Message'}
            </button>

            {status === 'success' && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem 1rem', 
                borderRadius: 8, 
                background: 'rgba(16,185,129,0.1)', 
                border: '1px solid rgba(16,185,129,0.3)', 
                color: '#10b981', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                animation: 'fadeUp 0.3s ease'
              }}>
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem 1rem', 
                borderRadius: 8, 
                background: 'rgba(239,68,68,0.1)', 
                border: '1px solid rgba(239,68,68,0.3)', 
                color: '#ef4444', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                animation: 'fadeUp 0.3s ease',
                wordBreak: 'break-word'
              }}>
                ❌ {errMsg}
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  )
}