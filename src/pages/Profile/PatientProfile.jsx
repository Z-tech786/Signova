import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import { LoadingState } from '../../components/common/StatsCard.jsx'
import Modal from '../../components/common/Modal.jsx'
import { api } from '../../services/api.js'
import { useApp } from '../../context/AppContext.jsx'

export default function PatientProfile() {
  const nav = useNavigate()
  const { patient, setPatient, consent, setConsent } = useApp()
  const [consentOpen, setConsentOpen] = useState(false)

  useEffect(() => { if (!patient) api.getPatientProfile().then(setPatient) }, [])
  useEffect(() => { if (patient && consent === null) setConsentOpen(true) }, [patient])

  if (!patient) return <Shell title="My Profile"><LoadingState /></Shell>

  return (
    <Shell title="My Profile" subtitle="Personalization & consent">
      <div className="grid-2">
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18 }}>
            <div className="avatar" style={{ width: 64, height: 64, fontSize: '1.3rem' }}>ZA</div>
            <div>
              <h2>{patient.name}</h2>
              <p className="subtitle">{patient.id} · {patient.role}</p>
            </div>
          </div>
          <p><strong>Profile Personalized:</strong> {patient.personalized ? '✓ Yes' : 'No'}</p>
          <p><strong>Consent:</strong> {consent === false ? 'Not given' : 'Active'}</p>
          <p><strong>Signing Baseline:</strong> {patient.signingSpeedBaseline} signs/sec</p>
          <p><strong>Saved Exemplars:</strong> {patient.exemplars}</p>
        </div>
        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ marginBottom: 12 }}>Profile Menu</h2>
          {['My Profile', 'Sign Language Exemplars', 'Preferences', 'Notifications', 'Help & Support', 'About Signova'].map((item) => (
            <div key={item} className="list-row" style={{ padding: '12px 4px', cursor: 'pointer' }} onClick={() => item === 'About Signova' ? nav('/') : null}>
              <span style={{ flex: 1 }}>{item}</span><span style={{ color: 'var(--text-muted)' }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {consentOpen && (
        <Modal title="Profile Personalization Consent" onClose={() => setConsentOpen(false)}>
          <p style={{ lineHeight: 1.6, marginBottom: 18 }}>
            <ShieldCheck size={16} style={{ verticalAlign: -3 }} /> Would you like Signova to save your profile and confirmed sign examples to improve recognition during future visits?
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" onClick={() => { setConsent(true); setConsentOpen(false) }}>Allow Personalization</button>
            <button className="btn btn-ghost" onClick={() => { setConsent(false); setConsentOpen(false) }}>Continue Without Profile</button>
          </div>
        </Modal>
      )}
    </Shell>
  )
}
