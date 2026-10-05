import React from 'react'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import ConfidenceMeter from '../common/ConfidenceMeter.jsx'

export default function ClarificationCard({ options = [], question = 'Is this correct?', onSelect, onRetry, message }) {
  return (
    <div className="card" style={{ padding: 24, borderColor: 'rgba(245,158,11,.45)', boxShadow: '0 0 24px rgba(245,158,11,.12)' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
        <AlertTriangle size={20} color="#F59E0B" />
        <h2>{message || "I'm not completely sure what you signed."}</h2>
      </div>
      <p className="subtitle" style={{ marginBottom: 16 }}>Possible matches:</p>
      {options.map((o, i) => (
        <button key={i} className="chip" onClick={() => onSelect(o)} style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 10, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <strong>{i + 1}. {o.text}</strong><span>{Math.round(o.confidence * 100)}%</span>
          </div>
          <ConfidenceMeter value={o.confidence} />
        </button>
      ))}
      <p className="subtitle" style={{ margin: '14px 0 12px' }}>{question}</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => onSelect(options[0])}><ShieldCheck size={16} /> Yes, Correct</button>
        <button className="btn btn-ghost" onClick={onRetry}>No, Try Again</button>
      </div>
    </div>
  )
}
