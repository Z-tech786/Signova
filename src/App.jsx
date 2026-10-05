import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'

const Landing = lazy(() => import('./pages/Landing/Landing.jsx'))
const PatientHome = lazy(() => import('./pages/PatientHome/PatientHome.jsx'))
const SignRecognition = lazy(() => import('./pages/SignRecognition/SignRecognition.jsx'))
const TextMode = lazy(() => import('./pages/TextMode/TextMode.jsx'))
const SpeechMode = lazy(() => import('./pages/SpeechMode/SpeechMode.jsx'))
const Chat = lazy(() => import('./pages/Chat/Chat.jsx'))
const ClarificationPage = lazy(() => import('./pages/Clarification/ClarificationPage.jsx'))
const DepartmentRouting = lazy(() => import('./pages/DepartmentRouting/DepartmentRouting.jsx'))
const PatientHistory = lazy(() => import('./pages/PatientHistory/PatientHistory.jsx'))
const PatientProfile = lazy(() => import('./pages/Profile/PatientProfile.jsx'))
const Settings = lazy(() => import('./pages/Settings/Settings.jsx'))
const StaffDashboard = lazy(() => import('./pages/StaffDashboard/StaffDashboard.jsx'))
const CaseSummary = lazy(() => import('./pages/CaseSummary/CaseSummary.jsx'))

export default function App() {
  const { toast } = useApp()
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#94A3C5' }}>Loading Signova…</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Landing />} />

          <Route path="/patient" element={<PatientHome />} />
          <Route path="/patient/communication" element={<PatientHome />} />
          <Route path="/patient/sign" element={<SignRecognition />} />
          <Route path="/patient/text" element={<TextMode />} />
          <Route path="/patient/speech" element={<SpeechMode />} />
          <Route path="/patient/chat" element={<Chat />} />
          <Route path="/patient/clarification" element={<ClarificationPage />} />
          <Route path="/patient/routing" element={<DepartmentRouting />} />
          <Route path="/patient/history" element={<PatientHistory />} />
          <Route path="/patient/history/:id" element={<PatientHistory />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/settings" element={<Settings />} />

          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/cases" element={<StaffDashboard />} />
          <Route path="/staff/cases/:id" element={<CaseSummary />} />
          <Route path="/staff/cases/:id/transcript" element={<CaseSummary />} />
          <Route path="/staff/settings" element={<Settings />} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </Suspense>
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg,#536DFF,#8A5CFF)', color: '#fff', padding: '12px 22px', borderRadius: 12, boxShadow: '0 10px 30px rgba(91,124,255,.5)', zIndex: 200 }}>
          {toast}
        </div>
      )}
    </>
  )
}
