import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import MessageBubble from '../../components/chat/MessageBubble.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { api } from '../../services/api.js'
import { speak } from '../../utils/speech.js'

const QUICK = ['I have a fever', 'I need a doctor', 'My chest hurts', 'I have a headache', 'I need medicine', 'Other']

export default function TextMode() {
  const nav = useNavigate()
  const { messages, addMessage, setContext } = useApp()
  const [value, setValue] = useState('')
  const [thinking, setThinking] = useState(false)
  const ts = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const send = async (text) => {
    if (!text.trim()) return
    addMessage({ from: 'patient', text, time: ts() })
    setValue('')
    setThinking(true)
    const r = await api.sendMessage(text)
    setContext(r.context)
    addMessage({ from: 'assistant', text: r.reply, time: ts() })
    speak(r.reply)
    setThinking(false)
  }

  return (
    <Shell title="Text Mode" subtitle="Type your message">
      <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="chat-window">
          {messages.length === 0 && <p className="subtitle">No messages yet. Describe how you feel.</p>}
          {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}
          {thinking && <div className="bubble assistant"><span className="typing"><span /><span /><span /></span></div>}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {QUICK.map((q) => <button key={q} className="chip" onClick={() => setValue(q)}>{q}</button>)}
        </div>
        <div className="chat-input">
          <input value={value} maxLength={500} placeholder="Type your message here…" aria-label="Message"
            onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(value)} />
          <button className="send-btn" onClick={() => send(value)} aria-label="Send"><Send size={18} /></button>
        </div>
        <p style={{ textAlign: 'right', fontSize: '.72rem', color: 'var(--text-muted)' }}>{value.length}/500</p>
        <button className="btn btn-ghost" onClick={() => nav('/patient/routing')}>Continue to assessment →</button>
      </div>
    </Shell>
  )
}
