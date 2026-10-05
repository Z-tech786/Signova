export const intakeScript = [
  {
    trigger: 'start',
    assistant: "Hello! 👋 I'm Signova, your hospital intake assistant. How can I help you today?",
  },
]

export const followUpFlow = {
  chest: [
    'I understand. When did the chest pain begin?',
    'Is the pain severe enough to affect your breathing or movement?',
    'Do you also have shortness of breath, dizziness, or nausea?',
  ],
  fever: [
    'I understand. How many days have you had the fever?',
    'Do you have any other symptoms, such as cough, headache, or nausea?',
  ],
  default: [
    'Thank you. Can you tell me when this started?',
    'How severe would you say this is — mild, moderate, or severe?',
  ],
}

export const staffCases = [
  { id: 'C-1042', patientNumber: 'Patient #1042', complaint: 'Fever + Headache', timeAgo: '2 min ago', urgency: 'Urgent', status: 'Pending' },
  { id: 'C-1043', patientNumber: 'Patient #1043', complaint: 'Chest Pain', timeAgo: '4 min ago', urgency: 'Critical', status: 'Pending' },
  { id: 'C-1044', patientNumber: 'Patient #1044', complaint: 'Cough + Fever', timeAgo: '7 min ago', urgency: 'Normal', status: 'Acknowledged' },
  { id: 'C-1045', patientNumber: 'Patient #1045', complaint: 'Follow-up Visit', timeAgo: '10 min ago', urgency: 'Normal', status: 'Pending' },
  { id: 'C-1046', patientNumber: 'Patient #1046', complaint: 'Knee Pain', timeAgo: '14 min ago', urgency: 'Moderate', status: 'Pending' },
]

export const caseDetails = {
  'C-1043': {
    patientName: 'Zain-ul-Abidin',
    patientId: 'P-1042',
    visitStatus: 'Awaiting Acknowledgement',
    chiefComplaint: 'Chest Pain',
    duration: 'Since yesterday (approx. 1 day)',
    severity: 'Moderate',
    urgency: 'HIGH',
    urgencyReason: 'Chest pain reported with shortness of breath.',
    department: 'Cardiology',
    waitTime: '12 mins',
    confidence: 92,
    protocolClause: 'C-102',
    protocolText: 'Patients presenting with chest pain accompanied by shortness of breath, dizziness, or sweating must be prioritized for cardiology assessment.',
    transcript: [
      { time: '09:41', type: 'SIGN', text: '"Chest pain"', confidence: 92 },
      { time: '09:42', type: 'ASSISTANT', text: 'How long have you had this pain?' },
      { time: '09:42', type: 'TEXT', text: '"Since yesterday."', confidence: 100 },
      { time: '09:43', type: 'ASSISTANT', text: 'Do you have difficulty breathing?' },
      { time: '09:43', type: 'SIGN', text: '"A little."', confidence: 85 },
      { time: '09:44', type: 'ASSISTANT', text: 'Thank you. I have enough information to prepare your intake summary.' },
    ],
  },
}
