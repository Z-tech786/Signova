import React, { useState } from 'react'
import { FileText } from 'lucide-react'
import Modal from './Modal.jsx'

export default function ProtocolCitation({ clause, department, source, updated, text, symptomCategory }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="section-title"><FileText size={18} color="#8A5CFF" /> Grounded Recommendation</div>
      <div style={{ display: 'grid', gap: 6, fontSize: '.92rem' }}>
        <p><strong>Recommended Department:</strong> {department}</p>
        <p><strong>Protocol Reference:</strong> {source} — Clause {clause}</p>
        <p><strong>Status:</strong> <span style={{ color: 'var(--success)' }}>✓ Verified / Retrieved</span></p>
      </div>
      <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={() => setOpen(true)}>View Clause</button>
      {open && (
        <Modal title={`Protocol Clause ${clause}`} onClose={() => setOpen(false)}>
          <p className="subtitle" style={{ marginBottom: 12 }}><strong>Source:</strong> {source}</p>
          <p style={{ marginBottom: 8 }}><strong>Department:</strong> {department}</p>
          <p style={{ marginBottom: 8 }}><strong>Relevant symptoms:</strong> {symptomCategory || 'General'}</p>
          <p style={{ marginBottom: 8 }}><strong>Last updated:</strong> {updated || '—'}</p>
          <div className="context-panel" style={{ marginTop: 14 }}><p style={{ lineHeight: 1.6 }}>{text}</p></div>
        </Modal>
      )}
    </div>
  )
}
