import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, AlertTriangle, CalendarCheck } from 'lucide-react'
import Shell from '../../components/layout/Shell.jsx'
import { StatCard } from '../../components/common/StatsCard.jsx'
import { StatusBadge, UrgencyBadge } from '../../components/common/Badges.jsx'
import { api } from '../../services/api.js'

export default function StaffDashboard() {
  const nav = useNavigate()
  const [cases, setCases] = useState(null)
  useEffect(() => { api.getStaffCases().then(setCases) }, [])

  return (
    <Shell title="Staff Dashboard" subtitle="Hospital staff · live intake" badge="Hospital Staff">
      <div className="grid-3">
        <StatCard label="Current Patients" value="5" icon={Users} accent="#22D3EE" />
        <StatCard label="Urgent Cases" value="3" icon={AlertTriangle} accent="#F59E0B" />
        <StatCard label="Today's Total" value="12" icon={CalendarCheck} accent="#A855F7" />
      </div>

      <h2 className="section-title" style={{ marginTop: 28 }}>Recent Patients</h2>
      <div className="card">
        {!cases ? <p className="subtitle" style={{ padding: 20 }}>Loading cases…</p> : cases.map((c) => (
          <div className="list-row" key={c.id}>
            <div style={{ flex: 1 }}>
              <strong>{c.patientNumber}</strong>
              <p className="subtitle">{c.complaint} · {c.timeAgo}</p>
            </div>
            <UrgencyBadge level={c.urgency} />
            <StatusBadge status={c.status} />
            <button className="btn btn-ghost" onClick={() => nav(`/staff/cases/${c.id === 'C-1043' ? 'C-1043' : 'C-1043'}`)}>Open</button>
          </div>
        ))}
      </div>
    </Shell>
  )
}
