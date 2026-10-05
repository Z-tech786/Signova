import React from 'react'
import { Hand, Loader2 } from 'lucide-react'

const LABEL = { idle: 'Avatar ready — awaiting response', speaking: 'Avatar speaking…', signing: 'Avatar signing the response…', loading: 'Preparing avatar response…' }

export default function AvatarPanel({ state = 'idle' }) {
  return (
    <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: '100%', maxWidth: 280, aspectRatio: '4/3', borderRadius: 16, display: 'grid', placeItems: 'center',
        background: 'radial-gradient(circle at 50% 30%, rgba(138,92,255,.25), rgba(6,26,58,.9))', border: '1px solid var(--border)',
      }}>
        {state === 'loading'
          ? <Loader2 size={44} color="#8A5CFF" style={{ animation: 'spin 1s linear infinite' }} />
          : <Hand size={56} color={state === 'idle' ? '#5F7196' : '#C4B5FD'} style={{ filter: state !== 'idle' ? 'drop-shadow(0 0 14px rgba(168,85,247,.8))' : 'none' }} />}
      </div>
      <p className="subtitle" style={{ fontSize: '.85rem' }}>{LABEL[state]}</p>
      <p style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>Avatar output · ready for animation stream</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
