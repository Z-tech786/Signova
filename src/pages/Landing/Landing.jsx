import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity } from 'lucide-react'
import WaveBackground from '../../components/common/WaveBackground.jsx'

export default function Landing() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
      <WaveBackground />
      <div style={{ maxWidth: 560 }}>
        <div style={{ display: 'inline-grid', placeItems: 'center', width: 74, height: 74, borderRadius: 22, background: 'linear-gradient(135deg, #536DFF, #8A5CFF)', boxShadow: '0 0 44px rgba(91,124,255,.6)', marginBottom: 26 }}>
          <Activity size={38} color="#fff" />
        </div>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', letterSpacing: 6, marginBottom: 18 }}>SIGNOVA</h1>
        <p style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, lineHeight: 1.3 }}>Your voice.<br />Our understanding.</p>
        <p className="subtitle" style={{ margin: '18px 0 34px' }}>A multimodal communication assistant for a more inclusive hospital experience.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '15px 42px' }} onClick={() => nav('/patient')}>Get Started</button>
          <button className="btn btn-ghost" onClick={() => nav('/staff')}>Staff Demo</button>
        </div>
        <p style={{ marginTop: 18, fontSize: '.8rem', color: 'var(--text-muted)' }}>PSL · Text · Speech — intake, urgency & routing, locally.</p>
      </div>
    </div>
  )
}
