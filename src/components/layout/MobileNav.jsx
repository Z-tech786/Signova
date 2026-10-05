import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MessagesSquare, History, User, Settings } from 'lucide-react'

const items = [
  { to: '/patient', label: 'Home', icon: Home, end: true },
  { to: '/patient/chat', label: 'Chat', icon: MessagesSquare },
  { to: '/patient/history', label: 'History', icon: History },
  { to: '/patient/profile', label: 'Profile', icon: User },
  { to: '/patient/settings', label: 'Settings', icon: Settings },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}>
          <Icon size={20} /> {label}
        </NavLink>
      ))}
    </nav>
  )
}
