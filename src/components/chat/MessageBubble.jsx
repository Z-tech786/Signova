import React from 'react'

export default function MessageBubble({ msg }) {
  const mine = msg.from === 'patient'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
      <div className={`bubble ${mine ? 'patient' : 'assistant'}`}>
        {msg.text}
        {msg.meta && <div className="bubble-meta">{msg.meta}</div>}
      </div>
      <span className="bubble-meta" style={{ padding: '0 6px' }}>{msg.time}</span>
    </div>
  )
}
