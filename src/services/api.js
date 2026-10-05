// API abstraction layer.
// Today: backed by mockApi. Tomorrow: replace internals with
// fetch('https://.../api/...') or WebSocket — components stay unchanged.
import { mockApi } from './mockApi.js'

export const api = {
  startSession: () => mockApi.startIntakeSession(),
  recognizeSign: () => mockApi.recognizeSign(),
  recognizeSignDemo: (step) => mockApi.recognizeSignDemo(step),
  recognizeSpeech: (t) => mockApi.recognizeSpeech(t),
  sendMessage: (text) => mockApi.sendMessage(text),
  getUrgency: () => mockApi.getUrgency(),
  getDepartmentRecommendation: () => mockApi.getDepartmentRecommendation(),
  getProtocolClause: (c) => mockApi.getProtocolClause(c),
  getPatientProfile: () => mockApi.getPatientProfile(),
  getPatientHistory: () => mockApi.getPatientHistory(),
  getCaseSummary: () => mockApi.getCaseSummary(),
  lookupPatient: (id) => mockApi.lookupPatient(id),
  getStaffCases: () => mockApi.getStaffCases(),
  getCase: (id) => mockApi.getCase(id),
  acknowledgeCase: (id) => mockApi.acknowledgeCase(id),
}
