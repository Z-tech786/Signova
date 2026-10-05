import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, placeholder = 'Type your message here…', maxLength = 500 }) {
  const [value, setValue] = useState('')
  const submit = () => { if (value.trim()) { onSend(value.trim()); setValue('') } }
  return (
    <div>
      <div className="chat-input">
        <input
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label="Message input"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <button className="send-btn" onClick={submit} aria-label="Send message"><Send size={18} /></button>
      </div>
      <p style={{ textAlign: 'right', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{value.length}/{maxLength}</p>
    </div>
  )
}
