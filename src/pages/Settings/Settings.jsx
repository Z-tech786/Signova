import React from 'react'
import Shell from '../../components/layout/Shell.jsx'

function Toggle({ label, defaultOn }) {
  const [on, setOn] = React.useState(defaultOn)
  return (
    <div className="list-row" style={{ padding: '14px 4px' }}>
      <span style={{ flex: 1 }}>{label}</span>
      <button role="switch" aria-checked={on} onClick={() => setOn(!on)} style={{ width: 46, height: 26, borderRadius: 99, background: on ? 'linear-gradient(90deg,#5B7CFF,#8A5CFF)' : '#1E293B', position: 'relative', transition: 'var(--transition)' }}>
        <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'var(--transition)' }} />
      </button>
    </div>
  )
}

export default function Settings() {
  return (
    <Shell title="Settings" subtitle="Preferences & privacy">
      <div className="grid-2">
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ marginBottom: 10 }}>Preferences</h2>
          <Toggle label="Sound" defaultOn />
          <Toggle label="Speech output (text-to-speech)" defaultOn />
          <Toggle label="Animations" defaultOn />
          <Toggle label="Notifications" defaultOn />
        </div>
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ marginBottom: 10 }}>Accessibility & Privacy</h2>
          <Toggle label="High contrast mode" defaultOn={false} />
          <Toggle label="Save sign exemplars locally" defaultOn />
          <Toggle label="Share structured summary with staff" defaultOn />
          <p className="subtitle" style={{ marginTop: 14, fontSize: '.83rem' }}>Signova runs locally. No data leaves the device without your consent.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 26, marginTop: 22 }}>
        <h2>About Signova</h2>
        <p className="subtitle" style={{ marginTop: 8 }}>An Autonomous Multimodal Communication Assistant for Hospitals — PSL, text and speech intake, urgency flagging and department routing. Frontend demo build.</p>
      </div>
    </Shell>
  )
}
