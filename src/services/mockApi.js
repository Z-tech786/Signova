// Mock service layer — mirrors the future Python REST API contracts.
// Swap these implementations with real fetch() calls to the backend later.

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

let sessionCounter = 1

export const mockApi = {
  async startIntakeSession() {
    await delay(700)
    return { sessionId: `SES-${1000 + sessionCounter++}`, startedAt: new Date().toISOString() }
  },

  // POST /api/recognition/sign
  async recognizeSign() {
    await delay(1600)
    const roll = Math.random()
    if (roll < 0.55) return { gloss: 'CHEST_PAIN', text: 'Chest Pain', confidence: 0.92 }
    if (roll < 0.8) return { gloss: 'HOSPITAL', text: 'Hospital', confidence: 0.92 }
    return {
      gloss: 'UNKNOWN',
      confidence: 0.64,
      alternatives: [
        { text: 'Chest Pain', confidence: 0.64 },
        { text: 'Shortness of Breath', confidence: 0.22 },
      ],
    }
  },

  async recognizeSignDemo(step = 0) {
    await delay(1200)
    const seq = [
      { gloss: 'HOSPITAL', text: 'Hospital', confidence: 0.92 },
      { gloss: 'CHEST_PAIN', text: 'Chest Pain', confidence: 0.92 },
      {
        gloss: 'UNKNOWN', confidence: 0.64,
        alternatives: [
          { text: 'Chest Pain', confidence: 0.64 },
          { text: 'Heart Pain', confidence: 0.71 },
        ],
      },
    ]
    return seq[step % seq.length]
  },

  // POST /api/recognition/speech
  async recognizeSpeech(transcript) {
    await delay(900)
    return { text: transcript || 'Chest pain and shortness of breath.', confidence: 0.9 }
  },

  // POST /api/intake/message
  async sendMessage(text) {
    await delay(900)
    const lower = (text || '').toLowerCase()
    let context
    if (lower.includes('chest') || lower.includes('heart')) context = { complaint: 'Chest Pain', duration: '1 day', severity: 'Moderate' }
    else if (lower.includes('fever')) context = { complaint: 'Fever + Headache', duration: '2 days', severity: 'Mild' }
    else if (lower.includes('knee')) context = { complaint: 'Knee Pain', duration: '1 week', severity: 'Moderate' }
    else if (lower.includes('rash') || lower.includes('skin')) context = { complaint: 'Skin Rash', duration: '3 days', severity: 'Mild' }
    else context = { complaint: 'General Discomfort', duration: 'Not specified', severity: 'Mild' }
    return { reply: 'Thank you for sharing. I have noted your complaint and will prepare the appropriate intake summary.', context }
  },

  // GET /api/intake/routing/:id
  async getUrgency() {
    await delay(600)
    return { level: 'HIGH', reason: 'Chest pain reported with shortness of breath.' }
  },

  async getDepartmentRecommendation() {
    await delay(600)
    return { department: 'Cardiology', waitTime: '12 mins', reason: 'Based on the reported symptoms and retrieved hospital protocol.', clause: 'C-102' }
  },

  async getProtocolClause(clause) {
    await delay(400)
    const { protocols } = await import('../data/mockProtocols.js')
    return protocols.find((p) => p.clause === clause) || null
  },

  async getPatientProfile() {
    await delay(500)
    const { patients } = await import('../data/mockPatients.js')
    return patients[0]
  },

  async getPatientHistory() {
    await delay(500)
    const { visits } = await import('../data/mockVisits.js')
    return visits.filter((v) => v.patientId === 'P-1042')
  },

  async getCaseSummary() {
    await delay(500)
    const module = await import('../data/mockConversations.js')
    return module.caseDetails['C-1043']
  },

  async lookupPatient(id) {
    await delay(800)
    const { mockPatientLookup } = await import('../data/mockPatients.js')
    return mockPatientLookup[String(id).replace('#', '').trim()] || null
  },

  async getStaffCases() {
    await delay(500)
    const { staffCases } = await import('../data/mockConversations.js')
    return staffCases
  },

  async getCase(id) {
    await delay(400)
    const { caseDetails } = await import('../data/mockConversations.js')
    return caseDetails[id] || caseDetails['C-1043']
  },

  async acknowledgeCase(id) {
    await delay(500)
    return { id, status: 'Acknowledged' }
  },
}
