import React from 'react'

const MAP = { Normal: 'badge-normal', Normal2: 'badge-normal', Moderate: 'badge-moderate', Urgent: 'badge-urgent', High: 'badge-urgent', Critical: 'badge-critical', HIGH: 'badge-urgent', CRITICAL: 'badge-critical', LOW: 'badge-normal', MEDIUM: 'badge-moderate' }

export function Badge({ children, variant }) {
  return <span className={`badge ${variant || ''}`}>{children}</span>
}

export function UrgencyBadge({ level }) {
  const cls = level === 'CRITICAL' || level === 'Critical' ? 'badge-critical' : level === 'HIGH' || level === 'High' || level === 'Urgent' ? 'badge-urgent' : level === 'MEDIUM' || level === 'Moderate' ? 'badge-moderate' : 'badge-normal'
  return <span className={`badge ${cls}`}>{level}</span>
}

export function StatusBadge({ status }) {
  const cls = status === 'Acknowledged' ? 'badge-normal' : status === 'Pending' ? 'badge-urgent' : 'badge-moderate'
  return <span className={`badge ${cls}`} style={{ textTransform: 'none' }}>{status}</span>
}
