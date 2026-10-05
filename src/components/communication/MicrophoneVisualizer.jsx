import React from 'react'
import { Mic } from 'lucide-react'

export default function MicrophoneVisualizer({ state, onToggle }) {
  const listening = state === 'listening'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <button
        className={`mic-ring ${listening ? 'listening' : ''}`}
        onClick={onToggle}
        aria-label={listening ? 'Stop listening' : 'Start listening'}
        style={{ cursor: 'pointer' }}
      >
        <Mic size={54} color={listening ? '#22D3EE' : '#8A5CFF'} />
      </button>
      <p style={{ color: 'var(--text-secondary)' }}>
        {state === 'ready' && 'Tap the microphone to speak.'}
        {state === 'listening' && 'Listening… speak clearly and naturally.'}
        {state === 'processing' && 'Processing your speech…'}
        {state === 'result' && 'Is this correct?'}
      </p>
    </div>
  )
}
