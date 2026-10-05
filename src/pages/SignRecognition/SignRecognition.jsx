import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Pause, RotateCcw, Square, ArrowLeft, Info } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import CameraPanel from '../../components/communication/CameraPanel.jsx'
import ClarificationCard from '../../components/clarification/ClarificationCard.jsx'
import ConfidenceMeter from '../../components/common/ConfidenceMeter.jsx'
import { LoadingState } from '../../components/common/StatsCard.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { api } from '../../services/api.js'

export default function SignRecognition() {
  const nav = useNavigate()
  const { setRecognition, showToast } = useApp()
  const [demo, setDemo] = useState(false)
  const [active, setActive] = useState(true)
  const [state, setState] = useState('listening') // listening | detecting | recognized | lowconf
  const [result, setResult] = useState(null)
  const [step, setStep] = useState(0)

  const capture = async () => {
    setState('detecting')
    const r = demo ? await api.recognizeSignDemo(step) : await api.recognizeSign()
    setStep((s) => s + 1)
    if (r.confidence >= 0.8) {
      setResult(r); setState('recognized'); setRecognition(r)
    } else {
      setResult(r); setState('lowconf'); setRecognition(r)
    }
  }

  const confirm = () => { showToast('Sign confirmed: ' + result.text); nav('/patient/chat') }

  return (
    <Shell title="Sign Recognition" subtitle="Pakistan Sign Language · live intake">
      <div className="grid-2">
        <div>
          <CameraPanel active={active} demo={demo} />
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={capture} disabled={state === 'detecting'}><Camera size={16} /> Capture</button>
            <button className="btn btn-ghost" onClick={() => setActive(false)}><Pause size={16} /> Pause</button>
            <button className="btn btn-ghost" onClick={() => { setState('listening'); setResult(null) }}><RotateCcw size={16} /> Retry</button>
            <button className="btn btn-ghost" onClick={() => setDemo(true)}><Square size={16} /> Demo Mode</button>
            <button className="btn btn-ghost" onClick={() => nav('/patient')}><ArrowLeft size={16} /> Back</button>
          </div>
        </div>

        <div className="card" style={{ padding: 26 }}>
          <h2 style={{ marginBottom: 14 }}>Recognition</h2>
          {state === 'listening' && <p className="subtitle"><Info size={14} /> Listening for your sign… position yourself inside the camera frame.</p>}
          {state === 'detecting' && <LoadingState text="Signing detected… analyzing gesture" />}
          {state === 'recognized' && result && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p className="label">Recognized</p>
              <h1 style={{ fontSize: '2.2rem', margin: '10px 0', color: '#C4B5FD' }}>{result.text}</h1>
              <p className="subtitle">Confidence: {Math.round(result.confidence * 100)}%</p>
              <div style={{ margin: '16px 0' }}><ConfidenceMeter value={result.confidence} /></div>
              <button className="btn btn-primary" onClick={confirm}>Yes, that's correct →</button>
            </div>
          )}
          {state === 'lowconf' && result && (
            <ClarificationCard
              options={result.alternatives}
              onSelect={(o) => { setResult({ text: o.text, confidence: o.confidence }); setState('recognized'); showToast(`Confirmed: ${o.text}`) }}
              onRetry={() => setState('listening')}
            />
          )}
        </div>
      </div>
    </Shell>
  )
}
