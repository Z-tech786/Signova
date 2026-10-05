import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraOff } from 'lucide-react'

export default function CameraPanel({ active, demo }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function start() {
      if (demo || !active) return
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
      } catch {
        setError('Camera access is required for live sign recognition.')
      }
    }
    start()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [active, demo])

  if (demo) {
    return (
      <div className="camera-panel">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, #0D2852, #01081C)' }} />
        <Camera size={64} color="#28406E" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="scan-frame" /><div className="scan-line" />
        <div className="live-pill">LIVE · PSL MODE · DEMO</div>
      </div>
    )
  }

  return (
    <div className="camera-panel">
      {error ? (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 20, color: 'var(--text-secondary)' }}>
          <div>
            <CameraOff size={40} style={{ marginBottom: 10 }} />
            <p>{error}</p>
            <p style={{ fontSize: '.8rem', marginTop: 6 }}>You can still use Demo Mode below.</p>
          </div>
        </div>
      ) : (
        <video ref={videoRef} autoPlay playsInline muted />
      )}
      <div className="scan-frame" /><div className="scan-line" />
      <div className="live-pill">LIVE · PSL MODE</div>
    </div>
  )
}
