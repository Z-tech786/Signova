import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Hand, MessageSquare, Mic, Type, Keyboard } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import ClarificationCard from '../../components/clarification/ClarificationCard.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function ClarificationPage() {
  const nav = useNavigate()
  const { setRecognition, showToast } = useApp()
  const options = [
    { text: 'Chest Pain', confidence: 0.71 },
    { text: 'Shortness of Breath', confidence: 0.18 },
  ]
  return (
    <Shell title="Clarification" subtitle="Confidence-based confirmation">
      <div style={{ maxWidth: 640 }}>
        <ClarificationCard
          options={options}
          onSelect={(o) => { setRecognition({ text: o.text, confidence: o.confidence }); showToast(`Confirmed: ${o.text}`); nav('/patient/chat') }}
          onRetry={() => { showToast('Please try signing again.'); nav('/patient/sign') }}
        />
        <div className="card" style={{ padding: 20, marginTop: 18 }}>
          <p className="label" style={{ marginBottom: 10 }}>Input channels covered</p>
          <p className="subtitle" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span><Hand size={14} /> Sign</span><span><Keyboard size={14} /> Text</span><span><Mic size={14} /> Speech</span><span><MessageSquare size={14} /> Chat</span><span><Type size={14} /> Memory</span>
          </p>
        </div>
      </div>
    </Shell>
  )
}
