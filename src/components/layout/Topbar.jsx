import React from 'react'
import { Bell, Search, Volume2, VolumeX } from 'lucide-react'

export default function Topbar({ title, subtitle, badge }) {
  const [tts, setTts] = React.useState(localStorage.getItem('signova_tts') !== 'off')
  const toggleTts = () => {
    const next = !tts
    setTts(next)
    localStorage.setItem('signova_tts', next ? 'on' : 'off')
  }
  return (
    <header className="topbar">
      <div style={{ minWidth: 200 }}>
        <h1 style={{ fontSize: '1.15rem' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div className="search-box">
        <Search size={16} />
        <input placeholder="Search patients, protocols…" aria-label="Search" />
      </div>
      <span className="badge-pill"><span className="status-dot" /> SYSTEM · LOCAL / READY</span>
      {badge && <span className="badge-pill" style={{ color: '#C4B5FD', borderColor: 'rgba(168,85,247,.4)', background: 'rgba(168,85,247,.12)' }}>{badge}</span>}
      <button className="icon-btn" onClick={toggleTts} aria-label="Toggle speech output" title="Toggle speech output">
        {tts ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <button className="icon-btn" aria-label="Notifications"><Bell size={18} /><span className="dot" /></button>
      <div className="avatar" aria-label="Profile avatar">ZA</div>
    </header>
  )
}
