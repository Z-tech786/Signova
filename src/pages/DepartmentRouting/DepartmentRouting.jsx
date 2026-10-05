import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Shell from '../../components/layout/Shell.jsx'
import { UrgencyBadge } from '../../components/common/Badges.jsx'
import ProtocolCitation from '../../components/common/ProtocolCitation.jsx'
import { LoadingState } from '../../components/common/StatsCard.jsx'
import { api } from '../../services/api.js'
import { useApp } from '../../context/AppContext.jsx'

export default function DepartmentRouting() {
  const nav = useNavigate()
  const { setUrgency, setDepartment, showToast } = useApp()
  const [urgency, setU] = useState(null)
  const [dept, setD] = useState(null)
  const [protocol, setP] = useState(null)

  useEffect(() => {
    (async () => {
      const u = await api.getUrgency()
      const d = await api.getDepartmentRecommendation()
      const p = await api.getProtocolClause(d.clause)
      setU(u); setD(d); setP(p); setUrgency(u); setDepartment(d)
    })()
  }, [])

  return (
    <Shell title="Assessment Result" subtitle="Intake urgency & department routing">
      {(!urgency || !dept) ? <LoadingState text="Preparing intake assessment…" /> : (
        <>
          <div className="card" style={{ padding: 26, borderColor: 'rgba(245,158,11,.45)' }}>
            <p className="label">Intake Urgency Assessment</p>
            <h1 style={{ fontSize: '2.4rem', color: '#FBBF24', margin: '8px 0' }}>{urgency.level} URGENCY</h1>
            <p className="subtitle">Reason: {urgency.reason}</p>
            <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: 8 }}>This is an intake urgency flag, not a medical diagnosis.</p>
          </div>

          <div className="grid-2" style={{ marginTop: 22 }}>
            <div className="card" style={{ padding: 26 }}>
              <p className="label">Recommended Department</p>
              <h2 style={{ fontSize: '1.8rem', margin: '8px 0', color: '#C4B5FD' }}>{dept.department.toUpperCase()}</h2>
              <p><strong>Estimated Wait Time:</strong> {dept.waitTime}</p>
              <p className="subtitle" style={{ marginTop: 6 }}>{dept.reason}</p>
            </div>
            {protocol
              ? <ProtocolCitation clause={protocol.clause} department={protocol.department} source={protocol.source} updated={protocol.updated} text={protocol.text} symptomCategory={protocol.symptomCategory} />
              : <div className="card" style={{ padding: 26 }}><p>No specific protocol clause matched.</p></div>}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-primary" onClick={() => { showToast('Case sent to staff dashboard.'); nav('/staff') }}>Send to Staff Dashboard</button>
            <button className="btn btn-ghost" onClick={() => nav('/patient/history')}>View My History</button>
          </div>
        </>
      )}
    </Shell>
  )
}
