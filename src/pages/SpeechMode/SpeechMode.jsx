import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shell from '../../components/layout/Shell.jsx'
import MicrophoneVisualizer from '../../components/communication/MicrophoneVisualizer.jsx'
import { api } from '../../services/api.js'

export default function SpeechMode() {
  const nav = useNavigate()
  const [state, setState] = useState('ready')
  const [heard, setHeard] = useState('')

  const toggle = () => {
    if (state === 'ready' || state === 'result') {
      setState('listening')
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SR) {
        const rec = new SR()
        rec.lang = 'en-US'
        rec.onresult = (e) => { setHeard(e.results[0][0].transcript); setState('processing'); finish(e.results[0][0].transcript) }
        rec.onerror = () => { simulate() }
        rec.start()
      } else setTimeout(simulate, 1800)
    } else if (state === 'listening') {
      setState('processing'); finish(heard)
    }
  }

  const simulate = () => setTimeout(async () => { const r = await api.recognizeSpeech(); setHeard(r.text); setState('processing'); finish(r.text) }, 900)
  const finish = async (text) => setTimeout(() => setState('result'), 1000)

  return (
    <Shell title="Speech Mode" subtitle="Speak naturally">
      <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <MicrophoneVisualizer state={state} onToggle={toggle} />
        {state === 'result' && (
          <div style={{ textAlign: 'center' }}>
            <p className="subtitle">I heard you say:</p>
            <h2 style={{ margin: '8px 0 16px', color: '#C4B5FD' }}>“{heard}”</h2>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => nav('/patient/chat')}>Yes, Correct</button>
              <button className="btn btn-ghost" onClick={() => setState('ready')}>No, Try Again</button>
            </div>
          </div>
        )}
      </div>
    </Shell>
  )
}
