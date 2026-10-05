import React, { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import { UrgencyBadge } from '../../components/common/Badges.jsx'
import Modal from '../../components/common/Modal.jsx'
import { LoadingState } from '../../components/common/StatsCard.jsx'
import { api } from '../../services/api.js'

export default function PatientHistory() {
  const [visits, setVisits] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => { api.getPatientHistory().then(setVisits) }, [])

  return (
    <Shell title="Patient History" subtitle="Past visits & personal info">
      <h2 className="section-title"><Calendar size={18} /> Past Visits</h2>
      {!visits ? <LoadingState /> : visits.map((v) => (
        <div className="card glow-card list-row" key={v.id} style={{ marginBottom: 12, borderRadius: 16 }}>
          <div style={{ flex: 1 }}>
            <strong>{v.department}</strong>
            <p className="subtitle">{v.date} · {v.complaint} · {v.duration}</p>
          </div>
          <UrgencyBadge level={v.urgency} />
          <button className="btn btn-ghost" onClick={() => setSelected(v)}>View</button>
        </div>
      ))}

      {selected && (
        <Modal title={`Visit ${selected.id} — ${selected.department}`} onClose={() => setSelected(null)}>
          <div style={{ display: 'grid', gap: 8, fontSize: '.93rem' }}>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Chief complaint:</strong> {selected.complaint}</p>
            <p><strong>Duration:</strong> {selected.duration}</p>
            <p><strong>Severity:</strong> {selected.severity}</p>
            <p><strong>Urgency:</strong> {selected.urgency}</p>
            <p><strong>Department:</strong> {selected.department}</p>
            <p><strong>Protocol clause:</strong> {selected.protocol}</p>
            <p><strong>Recognition confidence:</strong> {selected.confidence}%</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </div>
        </Modal>
      )}
    </Shell>
  )
}
