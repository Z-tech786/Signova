import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [patient, setPatient] = useState(null)          // current patient profile
  const [mode, setMode] = useState(null)                // sign | text | speech
  const [messages, setMessages] = useState([])          // conversation
  const [context, setContext] = useState(null)          // conversational memory panel
  const [recognition, setRecognition] = useState(null)
  const [urgency, setUrgency] = useState(null)
  const [department, setDepartment] = useState(null)
  const [consent, setConsent] = useState(null)
  const [cases, setCases] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3200) }
  const addMessage = (msg) => setMessages((m) => [...m, { ...msg, id: Date.now() + Math.random() }])
  const resetSession = () => { setMessages([]); setContext(null); setRecognition(null); setUrgency(null); setDepartment(null); setMode(null) }

  return (
    <AppContext.Provider value={{
      patient, setPatient, mode, setMode, messages, addMessage, setMessages,
      context, setContext, recognition, setRecognition, urgency, setUrgency,
      department, setDepartment, consent, setConsent, cases, setCases, toast, showToast, resetSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
