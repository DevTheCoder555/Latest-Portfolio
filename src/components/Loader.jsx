import { useState, useEffect } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-overlay${hidden ? ' hidden' : ''}`}>
      <div className="loader-text">DEVYANSH GUPTA</div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <p className="loader-hint">INITIALIZING PORTFOLIO...</p>
    </div>
  )
}
