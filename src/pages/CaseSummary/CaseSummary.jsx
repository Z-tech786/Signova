import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, FileText } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import { StatusBadge } from '../../components/common/Badges.jsx'
import Modal from '../../components/common/Modal.jsx'
import ConfidenceMeter from '../../components/common/ConfidenceMeter.jsx'
import { LoadingState } from '../../components/common/StatsCard.jsx'
import { api } from '../../services/api.js'

export default function CaseSummary() {
  const { id } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('Pending')
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  useEffect(() => { api.getCase(id).then(setData) }, [id])

  const acknowledge = async () => { await api.acknowledgeCase(id); setStatus('Acknowledged') }

  if (!data) return <Shell title="Case Summary"><LoadingState /></Shell>

  return (
    <Shell title="Case Summary" subtitle={`Case ${id}`} badge="Hospital Staff">
      <div className="card" style={{ padding: 24, borderColor: 'rgba(245,158,11,.45)', marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{ color: '#FBBF24', fontSize: '1.9rem' }}>{data.urgency} URGENCY</h1>
            <p className="subtitle">Recommended Department: <strong style={{ color: '#C4B5FD' }}>{data.department}</strong></p>
          </div>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: 26 }}>
          <h2 className="section-title">Structured Summary</h2>
          <div style={{ display: 'grid', gap: 10, fontSize: '.93rem' }}>
            <p><strong>Patient Name:</strong> {data.patientName} ({data.patientId})</p>
            <p><strong>Visit Status:</strong> {status === 'Acknowledged' ? 'Acknowledged' : data.visitStatus}</p>
            <p><strong>Chief Complaint:</strong> {data.chiefComplaint}</p>
            <p><strong>Duration:</strong> {data.duration}</p>
            <p><strong>Severity:</strong> {data.severity}</p>
            <p><strong>Urgency:</strong> {data.urgency}</p>
            <p><strong>Recommended Department:</strong> {data.department}</p>
            <p><strong>Recognition Confidence:</strong> {data.confidence}%</p>
          </div>
          <div style={{ marginTop: 12 }}><ConfidenceMeter value={data.confidence / 100} /></div>
        </div>

        <div className="card" style={{ padding: 26 }}>
          <h2 className="section-title">Protocol Evidence</h2>
          <p><strong>Protocol Clause:</strong> {data.protocolClause}</p>
          <p className="subtitle" style={{ marginTop: 10, lineHeight: 1.6 }}>{data.protocolText}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={acknowledge} disabled={status === 'Acknowledged'}>
              <CheckCircle2 size={16} /> {status === 'Acknowledged' ? '✓ Case acknowledged' : 'Acknowledge Case'}
            </button>
            <button className="btn btn-ghost" onClick={() => setTranscriptOpen(true)}><FileText size={16} /> View Full Transcript</button>
          </div>
        </div>
      </div>

      {transcriptOpen && (
        <Modal title="Full Transcript" onClose={() => setTranscriptOpen(false)} wide>
          <div style={{ display: 'grid', gap: 12 }}>
            {data.transcript.map((t, i) => (
              <div className="list-row" key={i} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px' }}>
                <span style={{ width: 52, color: 'var(--text-muted)', fontSize: '.8rem' }}>{t.time}</span>
                <span className="badge" style={{ background: 'rgba(91,124,255,.15)', color: '#A9BCFF', border: '1px solid var(--border)', minWidth: 92, textAlign: 'center' }}>{t.type}</span>
                <span style={{ flex: 1 }}>{t.text}</span>
                {t.confidence != null && <span style={{ color: 'var(--cyan)', fontSize: '.82rem' }}>Confidence {t.confidence}%</span>}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </Shell>
  )
}
