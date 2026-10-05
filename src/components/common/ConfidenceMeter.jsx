import React from 'react'

export default function ConfidenceMeter({ value }) {
  return <div className="meter" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin="0" aria-valuemax="100" aria-label="Recognition confidence"><div className="meter-fill" style={{ width: `${Math.round(value * 100)}%` }} /></div>
}
