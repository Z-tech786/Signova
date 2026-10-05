import React from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import MobileNav from './MobileNav.jsx'

export default function Shell({ title, subtitle, badge, children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Topbar title={title} subtitle={subtitle} badge={badge} />
        <main className="page">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}
