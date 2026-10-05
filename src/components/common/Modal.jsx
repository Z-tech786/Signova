import React from 'react'
import { X } from 'lucide-react'

export default function Modal({ title, children, onClose, wide }) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="card modal" style={wide ? { width: 'min(760px, 94vw)' } : undefined} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
