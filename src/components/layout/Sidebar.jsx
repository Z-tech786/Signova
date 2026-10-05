import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, MessageSquare, MessagesSquare, History, User, Settings, Activity, LogOut } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const items = [
  { to: '/patient', label: 'Home', icon: Home, end: true },
  { to: '/patient/communication', label: 'Communication', icon: Activity },
  { to: '/patient/chat', label: 'Chat', icon: MessagesSquare },
  { to: '/patient/history', label: 'History', icon: History },
  { to: '/patient/profile', label: 'Profile', icon: User },
  { to: '/patient/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const nav = useNavigate()
  const { showToast, resetSession } = useApp()
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon"><Activity size={18} color="#fff" /></span>
        <span className="brand-name">SIGNOVA</span>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
        <NavLink to="/staff" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={18} /> Staff Dashboard
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="nav-item" style={{ width: '100%' }} onClick={() => { resetSession(); showToast('Session reset.'); nav('/') }}>
          <LogOut size={18} /> Exit to Landing
        </button>
      </div>
    </aside>
  )
}
