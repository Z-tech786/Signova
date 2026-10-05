import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shell from '../../components/layout/Shell.jsx'
import MessageBubble from '../../components/chat/MessageBubble.jsx'
import ChatInput from '../../components/chat/ChatInput.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { speak } from '../../utils/speech.js'

const OPENING = "Hello! 👋 I'm Signova, your hospital intake assistant. How can I help you today?"
const FOLLOWUPS = [
  'I understand. When did the chest pain begin?',
  'Understood — your chest pain started yesterday. On a scale, is it mild, moderate or severe?',
  'Do you also have shortness of breath, nausea, or difficulty breathing?',
  'Thanks for sharing your symptoms. I\'ll now determine the appropriate urgency and department.',
]

export default function Chat() {
  const nav = useNavigate()
  const { messages, addMessage, setMessages, context, setContext, recognition } = useApp()
  const [thinking, setThinking] = useState(false)
  const [turns, setTurns] = useState(0)
  const bottomRef = useRef(null)
  const ts = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    if (messages.length === 0) {
      addMessage({ from: 'assistant', text: OPENING, time: ts() })
      speak(OPENING)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])

  const send = (text) => {
    addMessage({ from: 'patient', text, time: ts() })
    setThinking(true)
    setTimeout(() => {
      const lower = text.toLowerCase()
      let ctx = context
      if (lower.includes('chest') || lower.includes('pain')) ctx = { complaint: 'Chest pain', duration: ctx?.duration || '—', severity: ctx?.severity || '—' }
      if (lower.includes('yesterday') || lower.includes('day')) ctx = { ...ctx, duration: '1 day' }
      if (lower.includes('moderate') || lower.includes('severe') || lower.includes('mild')) ctx = { ...ctx, severity: lower.includes('severe') ? 'Severe' : lower.includes('moderate') ? 'Moderate' : 'Mild' }
      setContext(ctx || { complaint: '—', duration: '—', severity: '—' })
      const reply = FOLLOWUPS[Math.min(turns, FOLLOWUPS.length - 1)]
      setTurns((t) => t + 1)
      addMessage({ from: 'assistant', text: reply, time: ts(), meta: recognition ? `Recognition confidence ${Math.round((recognition.confidence || 0.92) * 100)}%` : undefined })
      speak(reply)
      setThinking(false)
    }, 1100)
  }

  return (
    <Shell title="Conversation" subtitle="Hospital intake chat">
      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="chat-window">
            {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}
            {thinking && <div className="bubble assistant"><span className="typing"><span /><span /><span /></span></div>}
            <div ref={bottomRef} />
          </div>
          <ChatInput onSend={send} />
          <button className="btn btn-ghost" onClick={() => nav('/patient/routing')}>Finish & view assessment →</button>
        </div>
        <div>
          <div className="context-panel">
            <p className="label" style={{ marginBottom: 10 }}>Conversation Context</p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.8 }}>
              <strong>Chief complaint:</strong> {context?.complaint || '—'}<br />
              <strong>Duration:</strong> {context?.duration || '—'}<br />
              <strong>Severity:</strong> {context?.severity || '—'}
            </p>
          </div>
        </div>
      </div>
    </Shell>
  )
}
