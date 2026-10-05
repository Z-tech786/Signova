import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hand, Keyboard, Mic, ScanLine, UserCheck } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import Modal from '../../components/common/Modal.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { api } from '../../services/api.js'

export default function PatientHome() {
  const nav = useNavigate()
  const { setMode, setPatient, showToast } = useApp()
  const [scanOpen, setScanOpen] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const go = (m) => { setMode(m); nav(`/patient/${m === 'sign' ? 'sign' : m}`) }

  const scan = async () => {
    setScanning(true); setNotFound(false)
    const found = await api.lookupPatient('P-1042')
    setScanning(false)
    if (found) {
      setPatient(found)
      showToast(`Welcome back, ${found.name}. Personalized recognition profile ready.`)
      setScanOpen(false)
    } else setNotFound(true)
  }

  return (
    <Shell title="Hello! 👋" subtitle="How would you like to communicate today?">
      <div className="mode-grid">
        <button className="card glow-card mode-card" onClick={() => go('sign')}>
          <span className="mode-icon"><Hand size={28} /></span>
          <h2>SIGN LANGUAGE</h2>
          <p className="subtitle">Use your PSL gestures for communication.</p>
        </button>
        <button className="card glow-card mode-card" onClick={() => go('text')}>
          <span className="mode-icon"><Keyboard size={28} /></span>
          <h2>TYPE A MESSAGE</h2>
          <p className="subtitle">Type your message and get an instant response.</p>
        </button>
        <button className="card glow-card mode-card" onClick={() => go('speech')}>
          <span className="mode-icon"><Mic size={28} /></span>
          <h2>SPEAK</h2>
          <p className="subtitle">Speak naturally and we'll handle the rest.</p>
        </button>
      </div>

      <div className="card" style={{ marginTop: 26, padding: 22, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <UserCheck size={26} color="#22D3EE" />
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong>Returning patient?</strong>
          <p className="subtitle">Scan your Patient ID to load your personalized recognition profile.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => setScanOpen(true)}><ScanLine size={16} /> Scan Patient ID</button>
      </div>

      {scanOpen && (
        <Modal title="Scan Patient ID" onClose={() => setScanOpen(false)}>
          <div style={{ textAlign: 'center', padding: '10px 0 18px' }}>
            <div style={{ width: 130, height: 130, border: '2px dashed rgba(34,211,238,.5)', borderRadius: 18, margin: '0 auto 16px', display: 'grid', placeItems: 'center' }}>
              <ScanLine size={44} color="#22D3EE" />
            </div>
            {scanning ? <p className="subtitle">Scanning…</p> : <p className="subtitle">Align the patient ID card inside the frame.</p>}
            {notFound && <p style={{ color: '#FB7185', marginTop: 10 }}>Patient profile not found. <button className="chip" onClick={() => { setScanOpen(false); showToast('Continuing as new patient.') }}>Continue as new patient</button></p>}
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={scan} disabled={scanning}>Simulate Scan</button>
        </Modal>
      )}
    </Shell>
  )
}
