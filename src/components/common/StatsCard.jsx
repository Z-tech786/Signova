import React from 'react'

export function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="card glow-card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="label">{label}</span>
        {Icon && <Icon size={20} color={accent || '#8A5CFF'} />}
      </div>
      <p className="stat-num" style={{ marginTop: 10, background: `linear-gradient(90deg, #fff, ${accent || '#A9BCFF'})`, WebkitBackgroundClip: 'text', color: 'transparent' }}>{value}</p>
    </div>
  )
}

export function LoadingState({ text = 'Loading…' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', padding: 24 }}>
      <div className="typing"><span /><span /><span /></div> {text}
    </div>
  )
}

export function EmptyState({ title, text }) {
  return (
    <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
      <h3 style={{ marginBottom: 8, color: 'var(--text-primary)' }}>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
